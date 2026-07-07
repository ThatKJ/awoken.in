"""investigation_workspace

Revision ID: 825808c3ecab
Revises: 68f39970ec67
Create Date: 2026-07-07 14:37:33.078388

"""
from typing import Sequence, Union
import uuid

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


# revision identifiers, used by Alembic.
revision: str = '825808c3ecab'
down_revision: Union[str, Sequence[str], None] = '68f39970ec67'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # 1. Investigations
    op.create_table(
        'investigations',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True, default=uuid.uuid4),
        sa.Column('title', sa.String(500), nullable=False, default="New Investigation"),
        sa.Column('description', sa.Text(), nullable=True),
        sa.Column('state', postgresql.JSONB, default={}), # Stores query, filters, sort, layout, selected_tab
        sa.Column('owner_id', sa.String(255), nullable=True),
        sa.Column('visibility', sa.String(50), default="private"),
        sa.Column('created_at', sa.DateTime(), default=sa.func.now()),
        sa.Column('updated_at', sa.DateTime(), default=sa.func.now(), onupdate=sa.func.now())
    )

    # 2. Investigation Findings (Mapping Table)
    op.create_table(
        'investigation_findings',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True, default=uuid.uuid4),
        sa.Column('investigation_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('investigations.id', ondelete="CASCADE"), nullable=False),
        sa.Column('finding_type', sa.String(50), nullable=False), # 'evidence', 'cluster', 'opportunity'
        sa.Column('evidence_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('evidences.id', ondelete="CASCADE"), nullable=True),
        sa.Column('cluster_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('problem_clusters.id', ondelete="CASCADE"), nullable=True),
        sa.Column('opportunity_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('opportunity_candidates.id', ondelete="CASCADE"), nullable=True),
        sa.Column('notes', sa.Text(), nullable=True),
        sa.Column('created_at', sa.DateTime(), default=sa.func.now())
    )

    # 3. Investigation Activities (Timeline)
    op.create_table(
        'investigation_activities',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True, default=uuid.uuid4),
        sa.Column('investigation_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('investigations.id', ondelete="CASCADE"), nullable=False),
        sa.Column('event_type', sa.String(100), nullable=False), # e.g., 'RAN_SEARCH', 'SAVED_FINDING'
        sa.Column('details', postgresql.JSONB, default={}),
        sa.Column('created_at', sa.DateTime(), default=sa.func.now())
    )

    # 4. Investigation Memories (Notebook)
    op.create_table(
        'investigation_memories',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True, default=uuid.uuid4),
        sa.Column('investigation_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('investigations.id', ondelete="CASCADE"), nullable=False),
        sa.Column('memory_type', sa.String(50), nullable=False), # 'OBSERVATION', 'HYPOTHESIS', 'QUESTION', 'CONCLUSION'
        sa.Column('content', sa.Text(), nullable=False),
        sa.Column('confidence', sa.String(50), nullable=True), # 'Low', 'Medium', 'High'
        sa.Column('created_at', sa.DateTime(), default=sa.func.now()),
        sa.Column('updated_at', sa.DateTime(), default=sa.func.now(), onupdate=sa.func.now())
    )

    # 5. Investigation Reports
    op.create_table(
        'investigation_reports',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True, default=uuid.uuid4),
        sa.Column('investigation_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('investigations.id', ondelete="CASCADE"), nullable=False),
        sa.Column('title', sa.String(500), nullable=False),
        sa.Column('summary', sa.Text(), nullable=True),
        sa.Column('markdown_content', sa.Text(), nullable=False),
        sa.Column('created_at', sa.DateTime(), default=sa.func.now())
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_table('investigation_reports')
    op.drop_table('investigation_memories')
    op.drop_table('investigation_activities')
    op.drop_table('investigation_findings')
    op.drop_table('investigations')
