from pydantic import BaseModel, Field
from typing import List, Optional, Generic, TypeVar

T = TypeVar('T')

class ExtractedField(BaseModel, Generic[T]):
    value: Optional[T] = Field(description="The extracted value, or null if not explicitly stated in the quote.")
    confidence: float = Field(description="Your confidence that this value is explicitly supported by the quote (0.0 to 1.0).")

class EvidenceAnnotationSchema(BaseModel):
    exact_quote: str = Field(description="The exact verbatim quote from the raw text acting as the single source of truth.")
    
    # Customer Context
    customer_role: ExtractedField[str] = Field(description="The role of the person speaking (e.g. Founder, Developer).")
    industry: ExtractedField[str] = Field(description="The industry mentioned.")
    company_size: ExtractedField[str] = Field(description="The size of the company mentioned.")
    geography: ExtractedField[str] = Field(description="The location of the speaker or company.")
    
    # Workflow
    workflow: ExtractedField[str] = Field(description="The specific task or workflow being attempted.")
    current_tool: ExtractedField[str] = Field(description="The tool currently being used.")
    competing_tool: ExtractedField[str] = Field(description="A competing tool evaluated but not used.")
    alternative_tool: ExtractedField[str] = Field(description="An alternative tool mentioned as a possible solution.")
    
    # Pain
    pain_type: ExtractedField[str] = Field(description="Must be exactly one of: TIME_WASTE, MANUAL_WORK, BUG, PRICING, COMPLEXITY, INTEGRATION, PERFORMANCE, RELIABILITY, COLLABORATION, AUTOMATION, REPORTING, SEARCH, ONBOARDING, FEATURE_GAP, OTHER")
    
    # Concrete Evidence
    time_lost: ExtractedField[str] = Field(description="Exact time lost (e.g. '2 hours a day'). Only if explicitly stated.")
    money_lost: ExtractedField[str] = Field(description="Exact money lost (e.g. '$10k/month'). Only if explicitly stated.")
    frequency: ExtractedField[str] = Field(description="How often this happens (e.g. 'every day', 'weekly').")
    workaround: ExtractedField[str] = Field(description="The hacky or manual workaround they are using.")
    feature_request: ExtractedField[str] = Field(description="What they explicitly wish existed.")
    switching_intent: ExtractedField[bool] = Field(description="True if they explicitly mention wanting to switch, buying, or paying for a solution.")

class ExtractionResultSchema(BaseModel):
    evidences: List[EvidenceAnnotationSchema] = Field(description="List of atomic evidence pieces extracted from the text. Empty if no evidence is found.")

# Note: ObservationSchema, EntitySchema are retained but deprecated for V2.
