"""
promoter.py — Promotes ProblemClusters to OpportunityCandidates.

A cluster is promoted when it has accumulated sufficient evidence
from independent sources. The LLM synthesizes the explicitly stated
evidence into a structured opportunity profile. Scores are assigned
deterministically via scoring.py — never by LLM.
"""

from sqlalchemy.orm import Session
from models import ProblemCluster, OpportunityCandidate, Evidence
from llm import extract_json
from scoring import calculate_opportunity_score
from pydantic import BaseModel, Field

# ---------------------------------------------------------------------------
# Thresholds for promotion
# ---------------------------------------------------------------------------

MIN_MENTIONS = 2          # minimum evidence pieces in cluster
MIN_DISTINCT_SOURCES = 2  # minimum independent sources (or authors)


class CandidateProfileSchema(BaseModel):
    title: str = Field(
        description="Clear, 5-8 word title of the opportunity. E.g. 'CRM tool for small teams under $50/mo'"
    )
    who_has_problem: str = Field(
        description="Synthesis of target customer/role based ONLY on the evidence. E.g. '5-person agencies using Salesforce'"
    )
    what_workflow: str = Field(
        description="The specific workflow that is broken. E.g. 'Logging sales calls and tracking leads'"
    )
    current_solution: str = Field(
        description="Tools currently used, as stated in the evidence. E.g. 'Salesforce, Excel, HubSpot'"
    )
    why_it_fails: str = Field(
        description="Why those current solutions fail, as stated in the evidence. E.g. 'Too expensive, too complex for small teams'"
    )
    why_now: str = Field(
        description="Why this is urgent now based on evidence signals. E.g. 'Multiple teams actively switching away'"
    )
    potential_ai_advantage: str = Field(
        description="How AI could specifically address the stated pain. Only state this if the evidence suggests it."
    )
    potential_saas_advantage: str = Field(
        description="How a focused SaaS product could address the stated pain."
    )


def evaluate_and_promote(db: Session) -> None:
    """
    Evaluates all un-promoted ProblemClusters and promotes qualifying ones
    to OpportunityCandidates.

    Promotion criteria (deterministic, no LLM):
    1. cluster.number_of_mentions >= MIN_MENTIONS
    2. Distinct source_ids OR distinct authors >= MIN_DISTINCT_SOURCES

    After promotion criteria pass:
    - LLM synthesizes opportunity profile from raw quotes
    - scoring.py computes all sub-scores deterministically
    """
    clusters = db.query(ProblemCluster).filter(
        ProblemCluster.number_of_mentions >= MIN_MENTIONS,
        ~ProblemCluster.opportunity_candidate.has()
    ).all()

    if not clusters:
        print("[promoter] No clusters ready for promotion.")
        return

    print(f"[promoter] Evaluating {len(clusters)} cluster(s) for promotion...")

    for cluster in clusters:
        evidences = db.query(Evidence).filter(
            Evidence.problem_cluster_id == cluster.id
        ).all()

        # ── Gate: source diversity ─────────────────────────────────────────
        distinct_sources = len(set(
            e.raw_document.source_id
            for e in evidences
            if e.raw_document
        ))
        distinct_authors = len(set(
            e.raw_document.author
            for e in evidences
            if e.raw_document and e.raw_document.author
        ))

        if distinct_sources < MIN_DISTINCT_SOURCES and distinct_authors < MIN_DISTINCT_SOURCES:
            print(
                f"[promoter] Cluster {cluster.id} skipped: "
                f"only {distinct_sources} distinct sources, {distinct_authors} distinct authors"
            )
            continue

        print(f"[promoter] Promoting cluster {cluster.id} → OpportunityCandidate")

        # ── LLM synthesizes profile from quotes only ───────────────────────
        quotes = "\n".join(f"- {e.exact_quote}" for e in evidences)
        prompt = (
            "You are an opportunity synthesis engine.\n"
            "Based ONLY on the following exact quotes from real people, create a structured opportunity profile.\n"
            "Do NOT invent features, statistics, or problems not stated in the quotes.\n"
            "If something is not clear from the quotes, say 'Not stated in evidence'.\n\n"
            f"Quotes:\n{quotes}"
        )

        try:
            profile = extract_json(prompt, CandidateProfileSchema)
        except Exception as e:
            print(f"[promoter] LLM profile generation failed for cluster {cluster.id}: {e}")
            continue

        if not profile:
            print(f"[promoter] Empty profile for cluster {cluster.id}, skipping.")
            continue

        # ── Deterministic scoring ──────────────────────────────────────────
        scores = calculate_opportunity_score(cluster, evidences)

        candidate = OpportunityCandidate(
            problem_cluster_id=cluster.id,
            title=profile.get("title", "Unknown Opportunity"),
            who_has_problem=profile.get("who_has_problem", ""),
            what_workflow=profile.get("what_workflow", ""),
            current_solution=profile.get("current_solution", ""),
            why_it_fails=profile.get("why_it_fails", ""),
            why_now=profile.get("why_now", ""),
            competing_products=None,
            potential_ai_advantage=profile.get("potential_ai_advantage", ""),
            potential_saas_advantage=profile.get("potential_saas_advantage", ""),
            # All scores from deterministic scorer
            score_evidence_count=scores["score_evidence_count"],
            score_source_diversity=scores["score_source_diversity"],
            score_authority_weight=scores["score_author_diversity"],  # maps to author diversity
            score_recency=scores["score_recency"],
            score_switching_intent=10.0 if scores["has_switching_intent"] else 0.0,
            score_money_lost=10.0 if scores["has_money_loss"] else 0.0,
            score_pain_severity=scores["score_pain_severity"],
            score_automation_potential=0.0,  # Reserved for future signal
            score_confidence=round(
                min(scores["score_evidence_count"] + scores["score_source_diversity"], 20.0) / 20.0, 2
            ),
            total_score=scores["total_score"],
        )

        try:
            db.add(candidate)
            db.commit()
            print(
                f"[promoter] ✓ Created OpportunityCandidate: '{candidate.title}' "
                f"(score={candidate.total_score:.1f})"
            )
        except Exception as e:
            print(f"[promoter] DB commit failed for cluster {cluster.id}: {e}")
            db.rollback()
