import numpy as np
from sqlalchemy.orm import Session
from sqlalchemy import text
from datetime import datetime, timezone
from models import Evidence, ProblemCluster

SIMILARITY_THRESHOLD = 0.40  # cosine distance

def run_clustering(db: Session):
    print("[intelligence-engine] Running Problem Clustering...")
    
    # Get all evidences that have NOT been clustered yet
    unclustered = db.query(Evidence).filter(Evidence.problem_cluster_id == None).all()
    
    if not unclustered:
        print("[intelligence-engine] No new evidence to cluster.")
        return
        
    print(f"[intelligence-engine] Found {len(unclustered)} unclustered evidence items.")
    now = datetime.now(timezone.utc)
    
    for evidence in unclustered:
        if not evidence.embedding:
            continue
            
        emb = evidence.embedding
        if hasattr(emb, "tolist"):
            emb = emb.tolist()
        else:
            emb = list(emb)
        evidence.embedding = emb
        
        # Find closest cluster
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
            current_emb = np.array(closest_cluster.embedding, dtype=np.float32)
            new_emb = np.array(emb, dtype=np.float32)
            updated_emb = (current_emb * n + new_emb) / (n + 1)
            closest_cluster.embedding = updated_emb.tolist()
            
            closest_cluster.number_of_mentions = n + 1
            closest_cluster.last_seen = now
            if closest_cluster.first_seen is None:
                closest_cluster.first_seen = now
                
            db.add(closest_cluster)
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
            
        db.add(evidence)
        db.commit()

    print("[intelligence-engine] Clustering complete.")
