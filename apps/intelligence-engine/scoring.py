from sqlalchemy.orm import Session
from models import ProblemCluster, OpportunityCandidate, EvidenceAnnotation, Evidence
from datetime import datetime

def run_scoring(db: Session):
    print("[intelligence-engine] Running Opportunity Scoring...")
    
    # We will score all problem clusters
    clusters = db.query(ProblemCluster).all()
    
    if not clusters:
        print("[intelligence-engine] No problem clusters found to score.")
        return
        
    for cluster in clusters:
        evidences = db.query(Evidence).filter(Evidence.problem_cluster_id == cluster.id).all()
        if not evidences:
            continue
            
        evidence_ids = [e.id for e in evidences]
        annotations = db.query(EvidenceAnnotation).filter(EvidenceAnnotation.evidence_id.in_(evidence_ids)).all()
        
        has_switching_intent = any(a.switching_intent == True for a in annotations)
        has_money_lost = any(bool(a.money_lost and a.money_lost.strip()) for a in annotations)
        has_workaround = any(bool(a.workaround and a.workaround.strip()) for a in annotations)
        has_feature_request = any(bool(a.feature_request and a.feature_request.strip()) for a in annotations)
        
        # High frequency check (heuristic string match)
        high_freq_keywords = ["daily", "every day", "always", "often", "frequently", "constant", "hours", "weekly"]
        has_high_freq = False
        for a in annotations:
            freq = a.frequency
            if freq and any(k in freq.lower() for k in high_freq_keywords):
                has_high_freq = True
                break
                
        score = 0.0
        if has_switching_intent:
            score += 40.0
        if has_money_lost:
            score += 30.0
        if has_high_freq:
            score += 10.0
        if has_workaround:
            score += 10.0
        if has_feature_request:
            score += 10.0
            
        # Get existing candidate or create new
        candidate = db.query(OpportunityCandidate).filter(OpportunityCandidate.problem_cluster_id == cluster.id).first()
        
        if not candidate:
            title = cluster.theme_summary or "Unknown Opportunity"
            candidate = OpportunityCandidate(
                problem_cluster_id=cluster.id,
                title=title,
                who_has_problem="Extracted from evidence",
                total_score=score
            )
            db.add(candidate)
        else:
            candidate.total_score = score
            candidate.updated_at = datetime.utcnow()
            db.add(candidate)
            
    db.commit()
    print("[intelligence-engine] Opportunity scoring complete.")
