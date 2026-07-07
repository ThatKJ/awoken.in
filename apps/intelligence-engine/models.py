import uuid
from datetime import datetime
from sqlalchemy import Column, String, Text, Float, Integer, DateTime, ForeignKey, Boolean, Enum
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import declarative_base, relationship
from pgvector.sqlalchemy import Vector
import enum

Base = declarative_base()

class PainType(enum.Enum):
    TIME_WASTE = "TIME_WASTE"
    MANUAL_WORK = "MANUAL_WORK"
    BUG = "BUG"
    PRICING = "PRICING"
    COMPLEXITY = "COMPLEXITY"
    INTEGRATION = "INTEGRATION"
    PERFORMANCE = "PERFORMANCE"
    RELIABILITY = "RELIABILITY"
    COLLABORATION = "COLLABORATION"
    AUTOMATION = "AUTOMATION"
    REPORTING = "REPORTING"
    SEARCH = "SEARCH"
    ONBOARDING = "ONBOARDING"
    FEATURE_GAP = "FEATURE_GAP"
    OTHER = "OTHER"

# Retained legacy enums for downstream models
class PainSignalType(enum.Enum):
    MANUAL_WORK = "Manual Work"
    TIME_WASTE = "Time Waste"
    MONEY_LOSS = "Money Loss"
    WORKFLOW_BREAKDOWN = "Workflow Breakdown"
    BUG = "Bug"
    POOR_UX = "Poor UX"
    PRICING_COMPLAINT = "Pricing Complaint"
    MISSING_FEATURE = "Missing Feature"
    RELIABILITY = "Reliability"
    INTEGRATION = "Integration"
    COMPLIANCE = "Compliance"
    SWITCHING_INTENT = "Switching Intent"
    VENDOR_LOCK_IN = "Vendor Lock-in"
    WORKAROUND = "Workaround"
    PRODUCT_ABANDONMENT = "Product Abandonment"
    LEARNING_CURVE = "Learning Curve"
    FALSE_PROMISE = "False Promise"

class EntityType(enum.Enum):
    COMPANY = "Company"
    PRODUCT = "Product"
    TECHNOLOGY = "Technology"
    WORKFLOW = "Workflow"
    ROLE = "Role"
    INDUSTRY = "Industry"
    COUNTRY = "Country"
    TEAM_SIZE = "Team Size"
    MARKET = "Market"
    COMPETITOR = "Competitor"

class RawDocument(Base):
    __tablename__ = 'raw_documents'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    source = Column(String(50), nullable=False)
    source_id = Column(String(255), unique=True, nullable=False)
    url = Column(String(2000))
    title = Column(String(1000))
    body = Column(Text, nullable=False)
    author = Column(String(255))
    metadata_json = Column(JSONB, default={})
    timestamp = Column(DateTime)
    ingestion_time = Column(DateTime, default=datetime.utcnow)
    extracted_at = Column(DateTime, nullable=True)

    evidences = relationship("Evidence", back_populates="raw_document", cascade="all, delete-orphan")

class ProblemCluster(Base):
    __tablename__ = 'problem_clusters'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    theme_summary = Column(Text, nullable=False)
    embedding = Column(Vector(1536))
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Pre-computed metrics for fast querying
    number_of_mentions = Column(Float, default=0)
    source_diversity = Column(Float, default=0)
    author_diversity = Column(Float, default=0)
    first_seen = Column(DateTime)
    last_seen = Column(DateTime)
    growth_rate = Column(Float, default=0.0)

    # Note: problem clusters link to Evidence in V1, preserved for V3+
    evidences = relationship("Evidence", back_populates="problem_cluster")
    opportunity_candidate = relationship("OpportunityCandidate", back_populates="problem_cluster", uselist=False)

class Evidence(Base):
    __tablename__ = 'evidences'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    raw_document_id = Column(UUID(as_uuid=True), ForeignKey('raw_documents.id'), nullable=False)
    problem_cluster_id = Column(UUID(as_uuid=True), ForeignKey('problem_clusters.id'), nullable=True)
    
    # Immutable Supporting Quote
    exact_quote = Column(Text, nullable=False)
    quote_start = Column(Integer, nullable=True)
    quote_end = Column(Integer, nullable=True)
    embedding = Column(Vector(1536))
    created_at = Column(DateTime, default=datetime.utcnow)

    raw_document = relationship("RawDocument", back_populates="evidences")
    problem_cluster = relationship("ProblemCluster", back_populates="evidences")
    
    # V2 Annotations
    annotations = relationship("EvidenceAnnotation", back_populates="evidence", cascade="all, delete-orphan")

    # V1 downstream references (preserved)
    observations = relationship("Observation", back_populates="evidence", cascade="all, delete-orphan")
    pain_signals = relationship("PainSignal", back_populates="evidence", cascade="all, delete-orphan")
    entities = relationship("Entity", back_populates="evidence", cascade="all, delete-orphan")

class EvidenceAnnotation(Base):
    __tablename__ = 'evidence_annotations'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    evidence_id = Column(UUID(as_uuid=True), ForeignKey('evidences.id'), nullable=False)

    # Customer Context
    customer_role = Column(String(255), nullable=True)
    industry = Column(String(255), nullable=True)
    company_size = Column(String(255), nullable=True)
    geography = Column(String(255), nullable=True)

    # Workflow
    workflow = Column(Text, nullable=True)
    current_tool = Column(String(255), nullable=True)
    competing_tool = Column(String(255), nullable=True)
    alternative_tool = Column(String(255), nullable=True)

    # Pain
    pain_type = Column(Enum(PainType), nullable=True)

    # Evidence
    time_lost = Column(String(255), nullable=True)
    money_lost = Column(String(255), nullable=True)
    frequency = Column(String(255), nullable=True)
    workaround = Column(Text, nullable=True)
    feature_request = Column(Text, nullable=True)
    switching_intent = Column(Boolean, nullable=True)

    # Confidence
    field_confidences = Column(JSONB, default={})

    # Provenance / Metadata
    extractor_version = Column(String(50), nullable=False)
    model_name = Column(String(100), nullable=False)
    prompt_version = Column(String(50), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    evidence = relationship("Evidence", back_populates="annotations")

# --- Retained Downstream Models ---

class Observation(Base):
    __tablename__ = 'observations'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    evidence_id = Column(UUID(as_uuid=True), ForeignKey('evidences.id'), nullable=False)
    fact = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    evidence = relationship("Evidence", back_populates="observations")

class PainSignal(Base):
    __tablename__ = 'pain_signals'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    evidence_id = Column(UUID(as_uuid=True), ForeignKey('evidences.id'), nullable=False)
    signal_type = Column(Enum(PainSignalType), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    evidence = relationship("Evidence", back_populates="pain_signals")

class Entity(Base):
    __tablename__ = 'entities'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    evidence_id = Column(UUID(as_uuid=True), ForeignKey('evidences.id'), nullable=False)
    entity_type = Column(Enum(EntityType), nullable=False)
    name = Column(String(255), nullable=False)
    embedding = Column(Vector(1536))
    created_at = Column(DateTime, default=datetime.utcnow)

    evidence = relationship("Evidence", back_populates="entities")

class OpportunityCandidate(Base):
    __tablename__ = 'opportunity_candidates'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    problem_cluster_id = Column(UUID(as_uuid=True), ForeignKey('problem_clusters.id'), nullable=False)
    
    title = Column(String(500), nullable=False)
    who_has_problem = Column(Text)
    what_workflow = Column(Text)
    current_solution = Column(Text)
    why_it_fails = Column(Text)
    why_now = Column(Text)
    competing_products = Column(JSONB)
    potential_ai_advantage = Column(Text)
    potential_saas_advantage = Column(Text)
    
    score_pain_severity = Column(Float, default=0.0)
    score_workflow_frequency = Column(Float, default=0.0)
    score_evidence_count = Column(Float, default=0.0)
    score_source_diversity = Column(Float, default=0.0)
    score_authority_weight = Column(Float, default=0.0)
    score_recency = Column(Float, default=0.0)
    score_switching_intent = Column(Float, default=0.0)
    score_money_lost = Column(Float, default=0.0)
    score_time_lost = Column(Float, default=0.0)
    score_competition_saturation = Column(Float, default=0.0)
    score_automation_potential = Column(Float, default=0.0)
    score_confidence = Column(Float, default=0.0)
    
    total_score = Column(Float, default=0.0)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    problem_cluster = relationship("ProblemCluster", back_populates="opportunity_candidate")
