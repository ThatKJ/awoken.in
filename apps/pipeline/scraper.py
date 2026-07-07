"""
scraper.py — Data ingestion for Awoken V2.

Sources:
  - fetch_hn_ask_stories(): "Ask HN" posts — long-form complaints, questions, frustrations
  - fetch_hn_comments(): comments on a story — often where raw pain is expressed
  - fetch_hn_top_stories(): top stories with body text (Ask HN posts with high scores)

Each function returns the count of new RawDocuments added.
All functions are idempotent: already-seen source_ids are skipped.
"""

import requests
from datetime import datetime, timezone
from sqlalchemy.orm import Session
from models import RawDocument

HN_ITEM_URL = "https://hacker-news.firebaseio.com/v0/item/{}.json"
HN_TOP_URL = "https://hacker-news.firebaseio.com/v0/topstories.json"
HN_NEW_URL = "https://hacker-news.firebaseio.com/v0/newstories.json"
HN_ASK_URL = "https://hacker-news.firebaseio.com/v0/askstories.json"

MIN_CONTENT_LENGTH = 40  # minimum characters to consider a document worth processing


def _fetch_item(item_id: int) -> dict | None:
    """Fetches a single HN item. Returns None on failure."""
    try:
        res = requests.get(HN_ITEM_URL.format(item_id), timeout=10)
        if res.status_code == 200:
            return res.json()
    except requests.RequestException:
        pass
    return None


def _save_document(db: Session, source_id: str, source: str, item: dict, body: str) -> bool:
    """
    Saves a RawDocument if it doesn't already exist.
    Returns True if saved, False if already existed or body is too short.
    """
    if len(body.strip()) < MIN_CONTENT_LENGTH:
        return False

    existing = db.query(RawDocument).filter(RawDocument.source_id == source_id).first()
    if existing:
        return False

    timestamp = None
    if item.get("time"):
        timestamp = datetime.fromtimestamp(item["time"], tz=timezone.utc)

    doc = RawDocument(
        source=source,
        source_id=source_id,
        url=item.get("url") or f"https://news.ycombinator.com/item?id={item.get('id', '')}",
        title=item.get("title", ""),
        body=body,
        author=item.get("by", "unknown"),
        timestamp=timestamp,
        metadata_json={
            "score": item.get("score"),
            "descendants": item.get("descendants"),
            "type": item.get("type"),
        },
    )
    db.add(doc)
    return True


def fetch_hn_ask_stories(db: Session, limit: int = 30) -> int:
    """
    Fetches "Ask HN" posts from the HN Ask Stories feed.
    These contain long-form questions and complaints — high signal for pain.

    Returns: count of new documents added.
    """
    print(f"[scraper] Fetching up to {limit} Ask HN stories...")

    try:
        res = requests.get(HN_ASK_URL, timeout=10)
        if res.status_code != 200:
            print("[scraper] Failed to fetch Ask HN stories list")
            return 0
        story_ids = res.json()[:limit]
    except requests.RequestException as e:
        print(f"[scraper] Ask HN request failed: {e}")
        return 0

    added = 0
    for story_id in story_ids:
        item = _fetch_item(story_id)
        if not item or item.get("type") != "story":
            continue

        title = item.get("title", "")
        text = item.get("text", "") or ""
        body = f"{title}\n\n{text}".strip()

        if _save_document(db, f"hn_ask_{story_id}", "hackernews_ask", item, body):
            added += 1

    db.commit()
    print(f"[scraper] Added {added} new Ask HN stories.")
    return added


def fetch_hn_comments(db: Session, story_ids: list[int], max_comments_per_story: int = 10) -> int:
    """
    Fetches top-level comments for the given story IDs.
    Comments are where users express raw frustrations and workarounds.

    Returns: count of new documents added.
    """
    if not story_ids:
        return 0

    print(f"[scraper] Fetching comments for {len(story_ids)} stories...")
    added = 0

    for story_id in story_ids:
        story = _fetch_item(story_id)
        if not story:
            continue

        comment_ids = (story.get("kids") or [])[:max_comments_per_story]
        for comment_id in comment_ids:
            comment = _fetch_item(comment_id)
            if not comment or comment.get("type") != "comment":
                continue
            if comment.get("deleted") or comment.get("dead"):
                continue

            text = comment.get("text", "") or ""
            # Comments have no title; use story title as context
            story_title = story.get("title", "")
            body = f"[Re: {story_title}]\n\n{text}".strip()

            if _save_document(db, f"hn_comment_{comment_id}", "hackernews_comment", comment, body):
                added += 1

    db.commit()
    print(f"[scraper] Added {added} new comments.")
    return added


def fetch_hn_top_stories(db: Session, limit: int = 30) -> int:
    """
    Fetches top HN stories that contain substantial body text.
    Filters to stories with text (Ask HN style) or score > 200.

    Returns: count of new documents added.
    """
    print(f"[scraper] Fetching top {limit} HN stories...")

    try:
        res = requests.get(HN_TOP_URL, timeout=10)
        if res.status_code != 200:
            print("[scraper] Failed to fetch top stories list")
            return 0
        story_ids = res.json()[:limit]
    except requests.RequestException as e:
        print(f"[scraper] Top stories request failed: {e}")
        return 0

    added = 0
    for story_id in story_ids:
        item = _fetch_item(story_id)
        if not item or item.get("type") != "story":
            continue

        title = item.get("title", "")
        text = item.get("text", "") or ""

        # Only include if it has body text (Ask HN) or very high score
        if not text and (item.get("score") or 0) < 200:
            continue

        body = f"{title}\n\n{text}".strip()

        if _save_document(db, f"hn_{story_id}", "hackernews", item, body):
            added += 1

    db.commit()
    print(f"[scraper] Added {added} new top stories.")
    return added


def fetch_twitter_search(db: Session, query: str = "(why OR hate OR suck OR hard) (startup OR founder OR tool OR saas) -is:retweet lang:en", limit: int = 50) -> int:
    """
    Fetches tweets matching a specific pain-oriented search query using the official Twitter API V2.
    Requires TWITTER_BEARER_TOKEN environment variable.

    Returns: count of new documents added.
    """
    import os
    import tweepy

    bearer_token = os.environ.get("TWITTER_BEARER_TOKEN")
    if not bearer_token:
        print("[scraper] WARNING: TWITTER_BEARER_TOKEN not set. Skipping Twitter scrape.")
        return 0

    print(f"[scraper] Fetching up to {limit} Twitter posts for pain signals...")
    
    try:
        client = tweepy.Client(bearer_token=bearer_token)
        # Search recent tweets (last 7 days for essential tier)
        response = client.search_recent_tweets(
            query=query,
            max_results=limit,
            tweet_fields=["created_at", "author_id", "public_metrics"],
            expansions=["author_id"],
            user_fields=["username", "description", "public_metrics"]
        )

        if not response.data:
            print("[scraper] No tweets found for the given query.")
            return 0
            
        users = {u["id"]: u for u in response.includes["users"]} if "users" in response.includes else {}
        
        added = 0
        for tweet in response.data:
            tweet_id = str(tweet.id)
            author = users.get(tweet.author_id)
            username = author.username if author else "unknown"
            
            # Simple heuristic: ignore low-engagement tweets to increase signal-to-noise
            metrics = tweet.public_metrics or {}
            engagement = metrics.get("like_count", 0) + metrics.get("reply_count", 0) + metrics.get("repost_count", 0)
            
            # Save the tweet as a document
            if _save_document(
                db=db,
                source_id=f"twitter_{tweet_id}",
                source="twitter",
                item={"time": tweet.created_at.timestamp() if tweet.created_at else None},
                body=tweet.text
            ):
                # We need to manually update the author and url since _save_document is HN-oriented
                doc = db.query(RawDocument).filter(RawDocument.source_id == f"twitter_{tweet_id}").first()
                if doc:
                    doc.author = f"@{username}"
                    doc.url = f"https://twitter.com/{username}/status/{tweet_id}"
                    doc.title = f"Tweet by @{username}"
                    doc.metadata_json = {"engagement": engagement, "metrics": metrics}
                added += 1

        db.commit()
        print(f"[scraper] Added {added} new tweets.")
        return added

    except Exception as e:
        print(f"[scraper] Twitter request failed: {e}")
        return 0

