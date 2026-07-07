"""
llm.py — LLM and embedding client for Awoken V2.

Uses OpenRouter as a provider-agnostic gateway.
All model configuration is via environment variables with sensible defaults.

Design constraints:
- LLMs are used ONLY for extraction, classification, normalization, and embedding.
- No LLM-generated scores, business logic, or invented conclusions.
- JSON parsing is robust: handles missing outer braces, markdown fences, and
  trailing content that some models emit despite json_object mode.
"""

import os
import re
import json
import pathlib
import datetime
from openai import OpenAI
from pydantic import BaseModel

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

OPENROUTER_API_KEY = os.environ.get(
    "OPENROUTER_API_KEY",
    ""
)
OPENROUTER_BASE_URL = os.environ.get("OPENROUTER_BASE_URL", "https://openrouter.ai/api/v1")
OPENROUTER_MODEL = os.environ.get("OPENROUTER_MODEL", "meta-llama/llama-4-scout-17b-16e-instruct")
OPENROUTER_EMBEDDING_MODEL = os.environ.get("OPENROUTER_EMBEDDING_MODEL", "text-embedding-3-small")

# Debug: save failed parses here
DEBUG_DIR = pathlib.Path(__file__).parent / "debug_responses"

client = OpenAI(
    base_url=OPENROUTER_BASE_URL,
    api_key=OPENROUTER_API_KEY or "DUMMY_KEY",
)


# ---------------------------------------------------------------------------
# JSON extraction utilities
# ---------------------------------------------------------------------------

def _extract_json_from_text(text: str) -> str:
    """
    Deterministically extract the first valid JSON object from arbitrary text.

    Strategy (in order):
      1. Strip markdown code fences (```json ... ``` or ``` ... ```)
      2. If text already parses → return as-is
      3. If text starts with a bare key (no opening brace) → wrap in {}
      4. Find the first '{' and scan for the matching '}' using a bracket counter
      5. Save failed responses to disk and return empty fallback
    """
    if not text or not text.strip():
        return '{"evidences": []}'

    # Step 0: Unescape any escaped newlines/tabs that some models emit
    text = text.replace('\\n', '\n').replace('\\t', '\t')

    # Step 1: Strip markdown code fences
    # Handles: ```json\n...\n``` or ```\n...\n```
    fence_match = re.search(r'```(?:json)?\s*([\s\S]*?)\s*```', text)
    if fence_match:
        text = fence_match.group(1).strip()

    # Also strip any remaining leading/trailing fence markers
    text = re.sub(r'^```(?:json)?\s*', '', text.strip())
    text = re.sub(r'\s*```$', '', text.strip())
    text = text.strip()

    # Step 2: Try direct parse
    try:
        json.loads(text)
        return text
    except json.JSONDecodeError:
        pass

    # Step 3: Bare key without opening brace → wrap it
    # e.g. '"evidences": [...]' → '{"evidences": [...]}'
    stripped = text.strip()
    if stripped and stripped[0] in ('"', "'"):
        wrapped = "{" + stripped + "}"
        try:
            json.loads(wrapped)
            return wrapped
        except json.JSONDecodeError:
            pass

    # Step 4: Find first '{' and balance brackets to extract the JSON object
    start = text.find('{')
    if start != -1:
        depth = 0
        in_string = False
        escape_next = False
        for i, ch in enumerate(text[start:], start=start):
            if escape_next:
                escape_next = False
                continue
            if ch == '\\' and in_string:
                escape_next = True
                continue
            if ch == '"' and not escape_next:
                in_string = not in_string
                continue
            if in_string:
                continue
            if ch == '{':
                depth += 1
            elif ch == '}':
                depth -= 1
                if depth == 0:
                    candidate = text[start:i+1]
                    try:
                        json.loads(candidate)
                        return candidate
                    except json.JSONDecodeError:
                        break

    # Step 5: All strategies failed — save debug file and return empty
    _save_debug(text)
    return '{"evidences": []}'


def _save_debug(raw: str) -> None:
    """Persist the raw failed LLM response to disk for inspection."""
    try:
        DEBUG_DIR.mkdir(exist_ok=True)
        ts = datetime.datetime.utcnow().strftime("%Y%m%d_%H%M%S_%f")
        debug_path = DEBUG_DIR / f"failed_parse_{ts}.txt"
        debug_path.write_text(raw, encoding="utf-8")
        print(f"[llm] ⚠ Parse failed — raw response saved to: {debug_path}")
    except Exception as e:
        print(f"[llm] Could not save debug file: {e}")


# ---------------------------------------------------------------------------
# Public API
# ---------------------------------------------------------------------------

def extract_json(prompt: str, schema: type[BaseModel]) -> dict:
    """
    Calls the LLM with a structured extraction prompt and returns a parsed dict.

    Logs the full raw response before any processing.
    Returns an empty dict on any failure (never raises).
    """
    system_msg = (
        "You are a precise data extraction system. "
        "You MUST output a single valid JSON object. "
        "Do NOT add commentary, markdown formatting, or text before/after the JSON. "
        "The JSON must match this schema exactly:\n"
        + json.dumps(schema.model_json_schema(), indent=2)
    )

    try:
        response = client.chat.completions.create(
            model=OPENROUTER_MODEL,
            messages=[
                {"role": "system", "content": system_msg},
                {"role": "user", "content": prompt},
            ],
            response_format={"type": "json_object"},
        )
    except Exception as e:
        print(f"[llm] API call failed: {e}")
        return {}

    raw = response.choices[0].message.content or ""

    # ── Full diagnostic logging ────────────────────────────────────────────
    print(f"[llm] === RAW RESPONSE ({len(raw)} chars) ===")
    print(raw[:500])  # First 500 chars — enough to diagnose most issues
    if len(raw) > 500:
        print(f"[llm] ... (truncated, full length={len(raw)})")
    print("[llm] === END RAW ===")

    # ── Extract JSON ───────────────────────────────────────────────────────
    extracted = _extract_json_from_text(raw)
    print(f"[llm] Extracted JSON ({len(extracted)} chars): {extracted[:200]}")

    try:
        parsed = json.loads(extracted)
    except json.JSONDecodeError as e:
        print(f"[llm] ✗ Final json.loads() failed: {e}")
        print(f"[llm] String passed to json.loads: {repr(extracted[:300])}")
        _save_debug(raw)
        return {}

    if not isinstance(parsed, dict):
        print(f"[llm] ✗ Parsed value is not a dict: {type(parsed)}")
        return {}

    return parsed


def generate_embedding(text: str) -> list[float]:
    """
    Generates a 1536-dimensional vector embedding for the given text.
    Uses text-embedding-3-small via OpenRouter (routed to OpenAI).
    Always returns a list[float], raises on API failure.
    """
    response = client.embeddings.create(
        model=OPENROUTER_EMBEDDING_MODEL,
        input=text,
    )
    return response.data[0].embedding
