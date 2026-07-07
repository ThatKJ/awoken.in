"""
main.py — Awoken pipeline entry point.

Stages (in order, never skip):
  1. Scrape: fetch raw documents from all configured sources
  2. Extract: extract Evidence + EvidenceAnnotation (atomic, immutable)

Intelligence (Clustering + Promotion) runs separately via intelligence_engine.py.

Run with: uv run python main.py
"""

import os
import time
from dotenv import load_dotenv

# Load .env before anything else reads environment variables
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), ".env"))

from database import SessionLocal
from scraper import fetch_hn_ask_stories, fetch_hn_comments, fetch_hn_top_stories, fetch_twitter_search
from extractor import process_raw_data
from connectors.github import GitHubConnector


def run_pipeline() -> None:
    print("=" * 60)
    print("Awoken Intelligence Pipeline — Starting")
    print("=" * 60)

    if not os.environ.get("OPENROUTER_API_KEY"):
        print("WARNING: OPENROUTER_API_KEY not set.")

    db = SessionLocal()
    total_new = 0

    try:
        # ── Stage 1: Scrape ──────────────────────────────────────────────────
        print("\n[Stage 1] Scraping sources...")

        # HackerNews
        ask_count  = fetch_hn_ask_stories(db, limit=30)
        top_count  = fetch_hn_top_stories(db, limit=30)

        from models import RawDocument
        recent_ask_ids = [
            int(doc.source_id.replace("hn_ask_", ""))
            for doc in db.query(RawDocument)
            .filter(RawDocument.source.like("hackernews_ask"))
            .limit(10)
            .all()
            if doc.source_id.startswith("hn_ask_")
        ]
        comment_count  = fetch_hn_comments(db, recent_ask_ids, max_comments_per_story=5)
        twitter_count  = fetch_twitter_search(db, limit=30)

        hn_total = ask_count + top_count + comment_count + twitter_count
        print(f"  ✓ HackerNews .................. {hn_total} new documents")

        # GitHub
        github = GitHubConnector()
        github_docs = github.fetch(db)
        github_count = github.save(db, github_docs)
        if os.environ.get("GITHUB_TOKEN"):
            print(f"  ✓ GitHub ...................... {github_count} new documents")
        else:
            print(f"  ⚠ GitHub ...................... skipped (no token)")

        total_new = hn_total + github_count
        print(f"\n[Stage 1] Total new documents: {total_new}")

        # ── Stage 2: Extract Evidence ────────────────────────────────────────
        print("\n[Stage 2] Extracting atomic evidence (V2)...")
        process_raw_data(db)

        # ── Stage 3+4: Intelligence (runs separately) ───────────────────────
        print("\n[Stage 3+4] Run intelligence_engine.py to cluster and score.")

        print("\n" + "=" * 60)
        print("Pipeline finished successfully.")
        print("=" * 60)

    except Exception as e:
        print(f"\nPipeline failed: {e}")
        import traceback
        traceback.print_exc()
    finally:
        db.close()


if __name__ == "__main__":
    run_pipeline()
