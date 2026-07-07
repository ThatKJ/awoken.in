"""
connectors/github.py — GitHub Issues connector for Awoken.

Searches public GitHub Issues for user pain signals using the GitHub Search API.
Stores results as RawDocuments for downstream Evidence extraction.

Auth:
  Reads GITHUB_TOKEN from environment. If missing, skips gracefully.

API:
  GET https://api.github.com/search/issues
  Accept: application/vnd.github+json
  Authorization: Bearer <token>
"""

import os
import time
import httpx
from datetime import datetime, timezone
from sqlalchemy.orm import Session
from connectors.base import BaseConnector, RawDocumentData

# Search queries that target genuine user pain
SEARCH_QUERIES = [
    ("Feature Request",  'is:issue "feature request"'),
    ("Too Expensive",    'is:issue "too expensive"'),
    ("Pricing",          'is:issue "pricing"'),
    ("Manual Workflow",  'is:issue "manual"'),
    ("Workflow",         'is:issue "workflow"'),
    ("Slow",             'is:issue "slow"'),
    ("Wish",             'is:issue "wish"'),
    ("Need",             'is:issue "need"'),
    ("Frustrating",      'is:issue "frustrating"'),
    ("Bug",              'is:issue "bug"'),
    ("Can't",            "is:issue \"can't\""),
    ("Doesn't Work",     "is:issue \"doesn't\""),
]

RESULTS_PER_QUERY = 25
GITHUB_SEARCH_URL = "https://api.github.com/search/issues"
MIN_BODY_LENGTH = 60  # skip trivially short issues


class GitHubConnector(BaseConnector):
    """
    Fetches GitHub Issues matching user-pain search queries.
    Each issue becomes one RawDocument.
    """

    source_name = "github"

    def __init__(self):
        self.token = os.environ.get("GITHUB_TOKEN", "").strip()
        if not self.token:
            print("[GitHub] ⚠  GITHUB_TOKEN not set — GitHub ingestion will be skipped.")

    def fetch(self, db: Session) -> list[RawDocumentData]:
        if not self.token:
            return []

        headers = {
            "Authorization": f"Bearer {self.token}",
            "Accept": "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
        }

        all_docs: dict[str, RawDocumentData] = {}  # keyed by source_id for dedup
        total_fetched = 0
        duplicates = 0

        print(f"\n[GitHub] Running {len(SEARCH_QUERIES)} searches...")
        col_width = max(len(label) for label, _ in SEARCH_QUERIES) + 4
        start_time = time.time()

        with httpx.Client(headers=headers, timeout=20) as client:
            for label, query in SEARCH_QUERIES:
                try:
                    resp = client.get(
                        GITHUB_SEARCH_URL,
                        params={
                            "q": query,
                            "per_page": RESULTS_PER_QUERY,
                            "sort": "reactions",
                            "order": "desc",
                        },
                    )

                    # Respect rate limits
                    if resp.status_code == 403:
                        reset_ts = int(resp.headers.get("X-RateLimit-Reset", time.time() + 60))
                        wait = max(reset_ts - int(time.time()), 5)
                        print(f"[GitHub] Rate limited — waiting {wait}s...")
                        time.sleep(wait)
                        resp = client.get(
                            GITHUB_SEARCH_URL,
                            params={
                                "q": query,
                                "per_page": RESULTS_PER_QUERY,
                                "sort": "reactions",
                                "order": "desc",
                            },
                        )

                    if resp.status_code != 200:
                        print(f"[GitHub] {label} — HTTP {resp.status_code}, skipping.")
                        continue

                    items = resp.json().get("items", [])
                    count = 0

                    for issue in items:
                        body = (issue.get("body") or "").strip()
                        if len(body) < MIN_BODY_LENGTH:
                            continue

                        source_id = f"gh_issue_{issue['id']}"
                        total_fetched += 1

                        if source_id in all_docs:
                            duplicates += 1
                            continue

                        # Parse repo from repository_url
                        repo_url = issue.get("repository_url", "")
                        repo_name = "/".join(repo_url.split("/")[-2:]) if repo_url else "unknown"

                        created_at = None
                        raw_ts = issue.get("created_at")
                        if raw_ts:
                            try:
                                created_at = datetime.fromisoformat(raw_ts.replace("Z", "+00:00"))
                            except ValueError:
                                pass

                        labels = [lb.get("name", "") for lb in issue.get("labels", [])]
                        reactions = issue.get("reactions", {})

                        doc = RawDocumentData(
                            source="github",
                            source_id=source_id,
                            url=issue.get("html_url", ""),
                            title=issue.get("title", ""),
                            body=body,
                            author=issue.get("user", {}).get("login", "unknown"),
                            created_at=created_at,
                            language=None,
                            score=float(issue.get("comments", 0)),
                            metadata={
                                "repository": repo_name,
                                "issue_number": issue.get("number"),
                                "state": issue.get("state"),
                                "labels": labels,
                                "comments_count": issue.get("comments", 0),
                                "reactions_total": reactions.get("total_count", 0),
                                "reactions_plus1": reactions.get("+1", 0),
                                "search_query": query,
                            },
                        )
                        all_docs[source_id] = doc
                        count += 1

                    # Sleep briefly to stay well under rate limits
                    time.sleep(0.5)

                    dots = "." * max(1, col_width - len(label))
                    print(f"[GitHub]   {label} {dots} {count}")

                except httpx.RequestError as e:
                    print(f"[GitHub] ✗ Network error for '{label}': {e}")
                except Exception as e:
                    print(f"[GitHub] ✗ Unexpected error for '{label}': {e}")

        elapsed = time.time() - start_time
        docs_list = list(all_docs.values())

        print(f"\n[GitHub]   Total fetched  ......... {total_fetched}")
        print(f"[GitHub]   Duplicates     ......... {duplicates}")
        print(f"[GitHub]   Unique docs    ......... {len(docs_list)}")
        print(f"[GitHub]   Completed in {elapsed:.1f}s")

        return docs_list
