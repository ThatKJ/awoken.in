"""
intelligence_engine.py — Standalone intelligence computation.
Runs AFTER the ingestion pipeline. Reads Evidence + EvidenceAnnotation,
clusters into ProblemClusters, and scores OpportunityCandidates.
Safe to re-run at any time (idempotent).
"""
import sys
import os
sys.path.insert(0, os.path.dirname(__file__))

import numpy as np
from datetime import datetime, timezone
from sqlalchemy import text
from database import SessionLocal
from models import Evidence, EvidenceAnnotation, ProblemCluster, OpportunityCandidate

SIMILARITY_THRESHOLD = 0.40   # cosine distance — lower = stricter


def run_clustering(db):
    """Group unclustered Evidence by embedding similarity into ProblemClusters."""
    unclustered = db.query(Evidence).filter(Evidence.problem_cluster_id == None).all()

    if not unclustered:
        print(f"[clustering] ✓ No new evidence to cluster (all already assigned).")
        return

    print(f"[clustering] Processing {len(unclustered)} unclustered evidences...")
    now = datetime.now(timezone.utc)
    created, joined = 0, 0

    for evidence in unclustered:
        if evidence.embedding is None:
            continue

        emb = evidence.embedding
        if hasattr(emb, "tolist"):
            emb = emb.tolist()
        else:
            emb = list(emb)
        evidence.embedding = emb

        # Find closest existing cluster
        closest_cluster = (
            db.query(ProblemCluster)
            .filter(ProblemCluster.embedding.isnot(None))
            .order_by(ProblemCluster.embedding.cosine_distance(emb))
            .first()
        )

        distance = None
        if closest_cluster is not None:
            distance_row = db.execute(
                text(
                    "SELECT embedding <=> CAST(:emb AS vector) AS dist "
                    "FROM problem_clusters WHERE id = :cid"
                ),
                {"emb": str(emb), "cid": str(closest_cluster.id)},
            ).fetchone()
            distance = distance_row.dist if distance_row else None

        if distance is not None and distance < SIMILARITY_THRESHOLD:
            # Join existing cluster
            evidence.problem_cluster_id = closest_cluster.id
            n = closest_cluster.number_of_mentions or 0
            cur_emb = np.array(closest_cluster.embedding, dtype=np.float32)
            new_emb = np.array(emb, dtype=np.float32)
            closest_cluster.embedding = ((cur_emb * n + new_emb) / (n + 1)).tolist()
            closest_cluster.number_of_mentions = n + 1
            closest_cluster.last_seen = now
            if closest_cluster.first_seen is None:
                closest_cluster.first_seen = now
            db.add(closest_cluster)
            joined += 1
        else:
            # Create new cluster
            summary = evidence.exact_quote[:120]
            if len(evidence.exact_quote) > 120:
                summary += "..."
            new_cluster = ProblemCluster(
                theme_summary=summary,
                embedding=emb,
                number_of_mentions=1,
                source_diversity=1.0,
                first_seen=now,
                last_seen=now,
            )
            db.add(new_cluster)
            db.flush()
            evidence.problem_cluster_id = new_cluster.id
            created += 1

        db.add(evidence)
        db.commit()

    print(f"[clustering] ✓ Done — {created} new clusters created, {joined} evidences joined existing clusters.")


def run_scoring(db):
    """Score all ProblemClusters and upsert OpportunityCandidates."""
    clusters = db.query(ProblemCluster).all()

    if not clusters:
        print("[scoring]   No problem clusters to score.")
        return

    print(f"[scoring]   Scoring {len(clusters)} clusters...")
    created, updated = 0, 0

    HIGH_FREQ_KEYWORDS = ["daily", "every day", "always", "often", "frequently", "constant", "hours", "weekly"]

    for cluster in clusters:
        evidences = db.query(Evidence).filter(Evidence.problem_cluster_id == cluster.id).all()
        if not evidences:
            continue

        evidence_ids = [e.id for e in evidences]
        annotations = db.query(EvidenceAnnotation).filter(
            EvidenceAnnotation.evidence_id.in_(evidence_ids)
        ).all()

        has_switching = any(a.switching_intent is True for a in annotations)
        has_money = any(bool(a.money_lost and str(a.money_lost).strip()) for a in annotations)
        has_workaround = any(bool(a.workaround and str(a.workaround).strip()) for a in annotations)
        has_feature_req = any(bool(a.feature_request and str(a.feature_request).strip()) for a in annotations)
        has_high_freq = any(
            a.frequency and any(k in str(a.frequency).lower() for k in HIGH_FREQ_KEYWORDS)
            for a in annotations
        )

        score = 0.0
        if has_switching:   score += 40.0
        if has_money:       score += 30.0
        if has_high_freq:   score += 10.0
        if has_workaround:  score += 10.0
        if has_feature_req: score += 10.0

        # Get most representative quote (highest sum-confidence annotation)
        best_annotation = max(
            annotations,
            key=lambda a: sum(v for v in (a.field_confidences or {}).values() if isinstance(v, (int, float))),
            default=None
        )
        top_quote = evidences[0].exact_quote if evidences else ""
        if best_annotation:
            matching_ev = next((e for e in evidences if e.id == best_annotation.evidence_id), None)
            if matching_ev:
                top_quote = matching_ev.exact_quote

        candidate = db.query(OpportunityCandidate).filter(
            OpportunityCandidate.problem_cluster_id == cluster.id
        ).first()

        if not candidate:
            candidate = OpportunityCandidate(
                problem_cluster_id=cluster.id,
                title=cluster.theme_summary or "Unthemed Signal",
                who_has_problem=best_annotation.customer_role if best_annotation and best_annotation.customer_role else "Unknown",
                what_workflow=best_annotation.workflow if best_annotation and best_annotation.workflow else "Not stated",
                current_solution=best_annotation.current_tool if best_annotation and best_annotation.current_tool else "Not stated",
                why_it_fails=top_quote[:300],
                why_now="Evidence detected in live intelligence stream.",
                potential_ai_advantage="Not inferred from evidence.",
                potential_saas_advantage="Not inferred from evidence.",
                score_switching_intent=40.0 if has_switching else 0.0,
                score_money_lost=30.0 if has_money else 0.0,
                score_evidence_count=min(len(evidences) * 2.0, 20.0),
                total_score=score,
            )
            db.add(candidate)
            created += 1
        else:
            candidate.total_score = score
            candidate.title = cluster.theme_summary or candidate.title
            candidate.updated_at = datetime.utcnow()
            db.add(candidate)
            updated += 1

    db.commit()
    print(f"[scoring]   ✓ Done — {created} candidates created, {updated} updated.")


def run_intelligence_engine():
    print("=" * 60)
    print("Intelligence Engine — Starting")
    print("=" * 60)

    db = SessionLocal()
    try:
        run_clustering(db)
        run_scoring(db)

        # Final summary
        from sqlalchemy import text as sq_text
        with db.bind.connect() as conn:
            clusters = conn.execute(sq_text("SELECT COUNT(*) FROM problem_clusters")).scalar()
            opps = conn.execute(sq_text("SELECT COUNT(*) FROM opportunity_candidates")).scalar()

        print()
        print(f"✓ Clustered into {clusters} Problems")
        print(f"✓ Promoted {opps} Opportunities")
        print()
        print("=" * 60)
        print("Intelligence Engine — Finished Successfully")
        print("=" * 60)

    except Exception as e:
        print(f"\nEngine failed: {e}")
        import traceback
        traceback.print_exc()
    finally:
        db.close()


if __name__ == "__main__":
    run_intelligence_engine()
