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

client = OpenAI(
    base_url=OPENROUTER_BASE_URL,
    api_key=OPENROUTER_API_KEY or "DUMMY_KEY",
)


# ---------------------------------------------------------------------------
# JSON repair utilities
# ---------------------------------------------------------------------------

def _strip_markdown(content: str) -> str:
    """Remove markdown code fences that some models wrap around JSON."""
    content = content.strip()
    # Handle ```json ... ``` or ``` ... ```
    fence_match = re.match(r'^```(?:json)?\s*(.*?)\s*```$', content, re.DOTALL)
    if fence_match:
        return fence_match.group(1).strip()
    # Handle opening fence without closing
    if content.startswith("```json"):
        content = content[7:]
    elif content.startswith("```"):
        content = content[3:]
    if content.endswith("```"):
        content = content[:-3]
    return content.strip()


def _repair_json(content: str) -> str:
    """
    Attempt to repair common LLM JSON output issues:
    1. Missing outer braces: model outputs '"key": [...]' instead of '{"key": [...]}'
    2. Trailing text after valid JSON
    """
    # If it already parses, return as-is
    try:
        json.loads(content)
        return content
    except json.JSONDecodeError:
        pass

    # If it starts with a key (no opening brace), wrap it
    # e.g., '"evidences": [...]' -> '{"evidences": [...]}'
    stripped = content.strip()
    if stripped and stripped[0] in ('"', "'"):
        wrapped = "{" + stripped + "}"
        try:
            json.loads(wrapped)
            return wrapped
        except json.JSONDecodeError:
            pass

    # Try to find the first valid JSON object in the string
    for i, ch in enumerate(content):
        if ch == '{':
            # Try progressively shorter substrings from this opening brace
            for j in range(len(content), i, -1):
                try:
                    json.loads(content[i:j])
                    return content[i:j]
                except json.JSONDecodeError:
                    continue
            break

    return content  # Give up, return as-is and let the caller handle the error


# ---------------------------------------------------------------------------
# Public API
# ---------------------------------------------------------------------------

def extract_json(prompt: str, schema: type[BaseModel]) -> dict:
    """
    Calls the LLM with a structured extraction prompt and returns a parsed dict.

    The system prompt explicitly instructs the model to return a JSON object.
    Output is cleaned of markdown and repaired for common model output quirks.
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
    cleaned = _strip_markdown(raw)
    repaired = _repair_json(cleaned)

    try:
        parsed = json.loads(repaired)
        if not isinstance(parsed, dict):
            print(f"[llm] Parsed JSON is not a dictionary. Type: {type(parsed)}")
            return {}
        return parsed
    except json.JSONDecodeError as e:
        print(f"[llm] JSON parse failed after repair: {e}")
        print(f"[llm] Raw content (first 200 chars): {raw[:200]}")
        return {}


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
