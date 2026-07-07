"""
connectors/base.py — Abstract base class for all Awoken data source connectors.

Every connector must:
  - Inherit from BaseConnector
  - Implement fetch() returning a list of RawDocumentData dicts
  - Never generate summaries, embeddings, or downstream intelligence
  - Never crash the pipeline (handle all errors internally)

The pipeline calls each connector's fetch() and saves the results
as RawDocuments. Connectors are completely decoupled from the
Evidence, Cluster, and Opportunity layers.
"""

from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from datetime import datetime
from typing import Optional
from sqlalchemy.orm import Session


@dataclass
class RawDocumentData:
    """
    Standardized output contract for every connector.
    Maps 1:1 to the RawDocument database model.
    """
    source: str                        # e.g. "github", "hackernews", "reddit"
    source_id: str                     # Unique ID within this source (used for dedup)
    url: str                           # Canonical URL to the original content
    title: str                         # Title or headline
    body: str                          # Full text content
    author: str                        # Username / handle
    created_at: Optional[datetime] = None
    language: Optional[str] = None     # ISO 639-1 if known, else None
    score: Optional[float] = None      # Engagement metric (upvotes, stars, etc.)
    metadata: dict = field(default_factory=dict)  # Source-specific extras


class BaseConnector(ABC):
    """
    Abstract base for all Awoken data connectors.

    Subclasses must implement:
      - source_name (class attribute)
      - fetch(db) -> list[RawDocumentData]
    """

    source_name: str = "unknown"

    @abstractmethod
    def fetch(self, db: Session) -> list[RawDocumentData]:
        """
        Fetch raw documents from the data source.

        Must:
        - Return a list of RawDocumentData objects
        - Deduplicate internally before returning (check source_id)
        - Never raise (catch all exceptions, log them, return partial results)
        - Log clearly: how many fetched, how many new, how many skipped
        """
        ...

    def save(self, db: Session, documents: list[RawDocumentData]) -> int:
        """
        Persists RawDocumentData objects to the database.
        Deduplicates by source_id. Returns count of newly saved docs.
        """
        from models import RawDocument

        saved = 0
        for doc in documents:
            if not doc.body or len(doc.body.strip()) < 40:
                continue
            exists = db.query(RawDocument).filter(
                RawDocument.source_id == doc.source_id
            ).first()
            if exists:
                continue

            record = RawDocument(
                source=doc.source,
                source_id=doc.source_id,
                url=doc.url,
                title=doc.title,
                body=doc.body,
                author=doc.author,
                timestamp=doc.created_at,
                metadata_json=doc.metadata,
            )
            db.add(record)
            saved += 1

        db.commit()
        return saved
