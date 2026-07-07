from db import SessionLocal
from clustering import run_clustering
from scoring import run_scoring

def run_intelligence_engine():
    print("============================================================")
    print("Intelligence Engine — Starting")
    print("============================================================")
    
    db = SessionLocal()
    try:
        run_clustering(db)
        run_scoring(db)
        print("\n============================================================")
        print("Intelligence Engine — Finished Successfully")
        print("============================================================")
    except Exception as e:
        print(f"\nEngine failed: {e}")
        import traceback
        traceback.print_exc()
    finally:
        db.close()

if __name__ == "__main__":
    run_intelligence_engine()
