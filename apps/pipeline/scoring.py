"""
scoring.py — Deterministic opportunity scoring for Awoken V2.

All scores are computed from structured data only. No LLM involvement.
Every sub-score is documented, bounded, and configurable via SCORE_WEIGHTS.
"""

from datetime import datetime, timezone
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from models import ProblemCluster, Evidence

# ---------------------------------------------------------------------------
# Configuration — adjust weights without touching logic
# ---------------------------------------------------------------------------

SCORE_WEIGHTS = {
    # How much each dimension contributes to the 0-100 total
    "evidence_count":    20.0,   # Raw volume of independent quotes
    "source_diversity":  20.0,   # Distinct sources (prevents echo chamber)
    "author_diversity":  10.0,   # Distinct authors
    "pain_severity":     20.0,   # Weighted pain signal types
    "recency":           15.0,   # How fresh is the evidence
    "growth_rate":       15.0,   # Rate of new mentions (reserved, currently estimated)
}

# Pain signal type weights for severity scoring (must all sum ≤ 1.0 per evidence)
PAIN_SIGNAL_WEIGHTS = {
    "MONEY_LOSS":           5.0,
    "SWITCHING_INTENT":     5.0,
    "WORKFLOW_BREAKDOWN":   3.0,
    "MANUAL_WORK":          2.0,
    "TIME_WASTE":           2.0,
    "VENDOR_LOCK_IN":       3.0,
    "PRODUCT_ABANDONMENT":  4.0,
    "MISSING_FEATURE":      1.0,
    "PRICING_COMPLAINT":    2.0,
    "RELIABILITY":          2.0,
    "INTEGRATION":          1.5,
    "COMPLIANCE":           2.5,
    "POOR_UX":              1.0,
    "WORKAROUND":           2.0,
    "BUG":                  1.0,
    "LEARNING_CURVE":       0.5,
    "FALSE_PROMISE":        1.5,
}

# Recency decay thresholds in days
RECENCY_TIERS = [
    (7,   15.0),   # < 7 days  → full score
    (30,  10.0),   # < 30 days → 10 pts
    (90,   5.0),   # < 90 days → 5 pts
    (365,  2.0),   # < 1 year  → 2 pts
]


# ---------------------------------------------------------------------------
# Core Scoring Function
# ---------------------------------------------------------------------------

def calculate_opportunity_score(
    cluster: "ProblemCluster",
    evidences: list["Evidence"],
) -> dict:
    """
    Deterministically scores an opportunity cluster.

    Returns a dict with:
      - all sub-scores (floats, bounded to their weight max)
      - 'total_score' (float, 0-100)
      - 'breakdown' (dict[str, str]) — human-readable explanation per dimension
    """
    breakdown: dict[str, str] = {}

    # ── 1. Evidence Count (0–20) ────────────────────────────────────────────
    count = len(evidences)
    # 2 pts per piece of evidence, capped at weight
    score_evidence_count = min(count * 2.0, SCORE_WEIGHTS["evidence_count"])
    breakdown["evidence_count"] = f"{count} quotes × 2 pts = {score_evidence_count:.1f} (cap {SCORE_WEIGHTS['evidence_count']})"

    # ── 2. Source Diversity (0–20) ──────────────────────────────────────────
    distinct_sources = len(set(
        e.raw_document.source_id
        for e in evidences
        if e.raw_document
    ))
    score_source_diversity = min(distinct_sources * 5.0, SCORE_WEIGHTS["source_diversity"])
    breakdown["source_diversity"] = f"{distinct_sources} distinct sources × 5 pts = {score_source_diversity:.1f} (cap {SCORE_WEIGHTS['source_diversity']})"

    # ── 3. Author Diversity (0–10) ──────────────────────────────────────────
    distinct_authors = len(set(
        e.raw_document.author
        for e in evidences
        if e.raw_document and e.raw_document.author
    ))
    score_author_diversity = min(distinct_authors * 2.0, SCORE_WEIGHTS["author_diversity"])
    breakdown["author_diversity"] = f"{distinct_authors} distinct authors × 2 pts = {score_author_diversity:.1f} (cap {SCORE_WEIGHTS['author_diversity']})"

    # ── 4. Pain Severity (0–20) ─────────────────────────────────────────────
    total_pain_points = 0.0
    pain_signal_counts: dict[str, int] = {}
    for evidence in evidences:
        for ps in evidence.pain_signals:
            signal_name = ps.signal_type.name  # enum name, e.g. "MONEY_LOSS"
            weight = PAIN_SIGNAL_WEIGHTS.get(signal_name, 0.5)
            total_pain_points += weight
            pain_signal_counts[signal_name] = pain_signal_counts.get(signal_name, 0) + 1

    # Normalize: 20 pts = 40 pain signal points across all evidence
    score_pain_severity = min((total_pain_points / 40.0) * SCORE_WEIGHTS["pain_severity"], SCORE_WEIGHTS["pain_severity"])
    top_signals = sorted(pain_signal_counts.items(), key=lambda x: -x[1])[:3]
    breakdown["pain_severity"] = f"{total_pain_points:.1f} raw pain pts → {score_pain_severity:.1f} (top signals: {', '.join(f'{k}×{v}' for k,v in top_signals)})"

    # ── 5. Recency (0–15) ───────────────────────────────────────────────────
    now = datetime.now(timezone.utc)
    last_seen = cluster.last_seen
    score_recency = 0.0
    if last_seen:
        if last_seen.tzinfo is None:
            last_seen = last_seen.replace(tzinfo=timezone.utc)
        days_old = (now - last_seen).days
        for threshold, pts in RECENCY_TIERS:
            if days_old < threshold:
                score_recency = pts
                break
        breakdown["recency"] = f"Last seen {days_old}d ago → {score_recency:.1f} pts"
    else:
        breakdown["recency"] = "No last_seen date → 0 pts"

    # ── 6. Growth Rate (0–15) ───────────────────────────────────────────────
    # growth_rate field on cluster is managed by the pipeline.
    # For now: if cluster is growing (rate > 0), we give proportional score.
    raw_growth = cluster.growth_rate or 0.0
    score_growth_rate = min(raw_growth * SCORE_WEIGHTS["growth_rate"], SCORE_WEIGHTS["growth_rate"])
    breakdown["growth_rate"] = f"growth_rate={raw_growth:.3f} → {score_growth_rate:.1f} pts"

    # ── Total ────────────────────────────────────────────────────────────────
    total = (
        score_evidence_count
        + score_source_diversity
        + score_author_diversity
        + score_pain_severity
        + score_recency
        + score_growth_rate
    )
    total = round(min(max(total, 0.0), 100.0), 2)

    return {
        "score_evidence_count":    round(score_evidence_count, 2),
        "score_source_diversity":  round(score_source_diversity, 2),
        "score_author_diversity":  round(score_author_diversity, 2),
        "score_pain_severity":     round(score_pain_severity, 2),
        "score_recency":           round(score_recency, 2),
        "score_growth_rate":       round(score_growth_rate, 2),
        "total_score":             total,
        "breakdown":               breakdown,
        # Metadata useful for debugging / display
        "evidence_count":          count,
        "distinct_sources":        distinct_sources,
        "distinct_authors":        distinct_authors,
        "has_switching_intent":    "SWITCHING_INTENT" in pain_signal_counts,
        "has_money_loss":          "MONEY_LOSS" in pain_signal_counts,
    }
