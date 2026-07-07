import json
from datetime import datetime
from sqlalchemy.orm import Session
from models import RawDocument, Evidence, EvidenceAnnotation, PainType
from schemas import ExtractionResultSchema
from llm import extract_json, generate_embedding

def process_raw_data(db: Session):
    """Processes unextracted RawDocuments into immutable Evidence and EvidenceAnnotations."""
    
    unprocessed = db.query(RawDocument).filter(RawDocument.extracted_at == None).limit(50).all()
    
    if not unprocessed:
        print("No new raw documents to process.")
        return

    print(f"Processing {len(unprocessed)} documents with Atomic Evidence Extractor V2...")

    for doc in unprocessed:
        prompt = f"""
        You are an atomic evidence extraction system. Your sole purpose is to extract strictly factual information from the text.
        
        HARD RULES:
        1. Never infer. Never estimate. Never rewrite.
        2. Extract ONLY if explicitly stated in the text.
        3. Missing information MUST be null.
        4. Do NOT summarize. Do NOT create problem statements.
        5. For every extracted field, you must provide a confidence score (0.0 to 1.0).
        6. The `exact_quote` is the single source of truth. Every other field you extract must be supported by this quote.
        7. IMPORTANT: If there is no genuine evidence, you MUST output EXACTLY: {{"evidences": []}}
        
        Text Title: {doc.title}
        Text Content: {doc.body}
        """
        
        try:
            result_dict = extract_json(prompt, ExtractionResultSchema)
            
            if not result_dict or "evidences" not in result_dict:
                doc.extracted_at = datetime.utcnow()
                db.commit()
                continue
                
            evidences_data = result_dict.get("evidences", [])
            
            for e_data in evidences_data:
                quote = e_data.get('exact_quote', '').strip()
                if not quote:
                    continue
                
                # 1. Generate embedding for the quote
                embedding = generate_embedding(quote)
                
                # Try to find character offsets
                body_text = doc.body or ""
                start_idx = body_text.find(quote)
                end_idx = start_idx + len(quote) if start_idx != -1 else -1
                
                # 2. Create Immutable Evidence
                evidence = Evidence(
                    raw_document_id=doc.id,
                    exact_quote=quote,
                    quote_start=start_idx if start_idx != -1 else None,
                    quote_end=end_idx if end_idx != -1 else None,
                    embedding=embedding
                )
                db.add(evidence)
                db.flush()
                
                # Helper to safely unpack ExtractedField dicts
                def unpack(field_key):
                    field_data = e_data.get(field_key, {})
                    if isinstance(field_data, dict):
                        return field_data.get('value'), field_data.get('confidence', 0.0)
                    return None, 0.0

                # 3. Create Evidence Annotation
                customer_role_val, conf_role = unpack('customer_role')
                industry_val, conf_ind = unpack('industry')
                company_size_val, conf_size = unpack('company_size')
                geography_val, conf_geo = unpack('geography')
                
                workflow_val, conf_wf = unpack('workflow')
                current_tool_val, conf_ct = unpack('current_tool')
                competing_tool_val, conf_comp = unpack('competing_tool')
                alternative_tool_val, conf_alt = unpack('alternative_tool')
                
                pain_type_val, conf_pt = unpack('pain_type')
                pain_enum = None
                if pain_type_val:
                    try:
                        pain_enum = PainType[pain_type_val.upper().replace(" ", "_")]
                    except KeyError:
                        pass
                
                time_lost_val, conf_tl = unpack('time_lost')
                money_lost_val, conf_ml = unpack('money_lost')
                frequency_val, conf_freq = unpack('frequency')
                workaround_val, conf_wa = unpack('workaround')
                feature_req_val, conf_fr = unpack('feature_request')
                switching_val, conf_si = unpack('switching_intent')

                field_confidences = {
                    "customer_role": conf_role,
                    "industry": conf_ind,
                    "company_size": conf_size,
                    "geography": conf_geo,
                    "workflow": conf_wf,
                    "current_tool": conf_ct,
                    "competing_tool": conf_comp,
                    "alternative_tool": conf_alt,
                    "pain_type": conf_pt,
                    "time_lost": conf_tl,
                    "money_lost": conf_ml,
                    "frequency": conf_freq,
                    "workaround": conf_wa,
                    "feature_request": conf_fr,
                    "switching_intent": conf_si
                }

                annotation = EvidenceAnnotation(
                    evidence_id=evidence.id,
                    customer_role=customer_role_val,
                    industry=industry_val,
                    company_size=company_size_val,
                    geography=geography_val,
                    workflow=workflow_val,
                    current_tool=current_tool_val,
                    competing_tool=competing_tool_val,
                    alternative_tool=alternative_tool_val,
                    pain_type=pain_enum,
                    time_lost=time_lost_val,
                    money_lost=money_lost_val,
                    frequency=frequency_val,
                    workaround=workaround_val,
                    feature_request=feature_req_val,
                    switching_intent=switching_val,
                    field_confidences=field_confidences,
                    extractor_version="v2.0",
                    model_name="meta-llama/llama-4-scout-17b-16e-instruct", # Note: ideally pull from llm.py
                    prompt_version="v2.0"
                )
                db.add(annotation)
                
        except Exception as e:
            print(f"Error processing doc ID {doc.id}: {e}")
            
        doc.extracted_at = datetime.utcnow()
        db.commit()

    print("Batch processing complete.")
