import { NextResponse } from 'next/server';
import pool from '@/lib/db';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || "";
const OPENROUTER_MODEL = "meta-llama/llama-4-scout-17b-16e-instruct";

// Helper to generate embedding using OpenRouter
async function generateEmbedding(text: string): Promise<number[]> {
  const res = await fetch("https://openrouter.ai/api/v1/embeddings", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "text-embedding-3-small",
      input: text
    })
  });
  if (!res.ok) {
    throw new Error(`Embedding API failed: ${res.statusText}`);
  }
  const data = await res.json();
  return data.data[0].embedding;
}

// Helper to expand query using LLM
async function expandQuery(query: string): Promise<string[]> {
  const prompt = `You are a search query expansion assistant. The user searched for: "${query}".
Output exactly 3 alternative search queries (broad intent, adjacent category, root problem).
Output as a valid JSON array of 3 strings. Example: ["query 1", "query 2", "query 3"]`;

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: OPENROUTER_MODEL,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "You output JSON arrays." },
        { role: "user", content: prompt }
      ]
    })
  });

  if (!res.ok) {
    return [query, query, query];
  }
  
  try {
    const data = await res.json();
    const content = data.choices[0].message.content;
    const json = JSON.parse(content);
    if (Array.isArray(json)) return json.slice(0, 3);
    if (json.queries && Array.isArray(json.queries)) return json.queries.slice(0, 3);
    return [query, query, query];
  } catch (e) {
    return [query, query, query];
  }
}

function getSignalDensity(results: any[]): "high" | "medium" | "low" {
  if (!results || results.length === 0) return "low";
  const avgScore = results.reduce((acc, r) => acc + (Number(r.total_score) || 0), 0) / results.length;
  if (avgScore >= 40) return "high";
  if (avgScore >= 15) return "medium";
  return "low";
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { query } = body;

    if (!query) {
      return NextResponse.json({ mode_used: "error", results: [] }, { status: 400 });
    }

    const embedding = await generateEmbedding(query);
    const embStr = `[${embedding.join(',')}]`;

    // Common SQL fragments for Ranking & Filtering
    const filterCondition = `
      (
        a.switching_intent = true OR 
        (a.money_lost IS NOT NULL AND a.money_lost != '') OR 
        (a.workaround IS NOT NULL AND a.workaround != '') OR
        (a.frequency ILIKE '%daily%' OR a.frequency ILIKE '%often%' OR a.frequency ILIKE '%always%' OR a.frequency ILIKE '%every%')
      )
    `;

    const rawFilterCondition = `
      (
        a.switching_intent = true OR 
        (a.money_lost IS NOT NULL AND a.money_lost != '') OR 
        (a.workaround IS NOT NULL AND a.workaround != '')
      )
    `;

    const rankingLogic = `
      (CASE WHEN a.switching_intent = true THEN 40 ELSE 0 END) +
      (CASE WHEN a.money_lost IS NOT NULL AND a.money_lost != '' THEN 30 ELSE 0 END) +
      (CASE WHEN a.workaround IS NOT NULL AND a.workaround != '' THEN 10 ELSE 0 END) +
      (CASE WHEN a.feature_request IS NOT NULL AND a.feature_request != '' THEN 10 ELSE 0 END) +
      (CASE WHEN (a.frequency ILIKE '%daily%' OR a.frequency ILIKE '%often%' OR a.frequency ILIKE '%always%' OR a.frequency ILIKE '%every%') THEN 10 ELSE 0 END)
    `;

    // =========================================================================
    // Step 1: Strict Match
    // =========================================================================
    const strictQuery = `
      SELECT 
        oc.title,
        pc.theme_summary as summary,
        e.exact_quote,
        e.id as evidence_id,
        'Exact semantic match on core opportunity clusters.' as why_it_matters,
        COALESCE(a.field_confidences->>'pain_type', '1.0')::float as confidence,
        rd.url as source_url,
        (
          ${rankingLogic} + ((1 - (pc.embedding <=> $1::vector)) * 20)
        ) as total_score
      FROM problem_clusters pc
      JOIN opportunity_candidates oc ON oc.problem_cluster_id = pc.id
      JOIN evidences e ON e.problem_cluster_id = pc.id
      JOIN evidence_annotations a ON a.evidence_id = e.id
      JOIN raw_documents rd ON e.raw_document_id = rd.id
      WHERE ${filterCondition}
      ORDER BY total_score DESC
      LIMIT 10
    `;

    const strictRes = await pool.query(strictQuery, [embStr]);
    const uniqueStrict = Array.from(new Map(strictRes.rows.map((r: any) => [r.exact_quote, r])).values());

    if (uniqueStrict.length >= 3) {
      return NextResponse.json({
        mode_used: "strict",
        signal_density: getSignalDensity(uniqueStrict),
        explanation: "Strict match found sufficient high-signal opportunity clusters.",
        results: uniqueStrict.slice(0, 10).map((r: any) => ({
          title: r.title,
          summary: r.summary,
          exact_quote: r.exact_quote,
          why_it_matters: r.why_it_matters,
          confidence: r.confidence,
          source_url: r.source_url
        }))
      });
    }

    // =========================================================================
    // Step 2: Semantic Expansion
    // =========================================================================
    const expanded = await expandQuery(query);
    const expandedResults: any[] = [];

    for (const eq of expanded) {
      const eEmb = await generateEmbedding(eq);
      const eEmbStr = `[${eEmb.join(',')}]`;
      const expandQuerySql = `
        SELECT 
          oc.title,
          pc.theme_summary as summary,
          e.exact_quote,
          'Expanded search match for intent: ${eq.replace(/'/g, "''")}' as why_it_matters,
          COALESCE(a.field_confidences->>'pain_type', '0.8')::float as confidence,
          rd.url as source_url,
          (
            ${rankingLogic} + ((1 - (pc.embedding <=> $1::vector)) * 20)
          ) as total_score
        FROM problem_clusters pc
        JOIN opportunity_candidates oc ON oc.problem_cluster_id = pc.id
        JOIN evidences e ON e.problem_cluster_id = pc.id
        JOIN evidence_annotations a ON a.evidence_id = e.id
        JOIN raw_documents rd ON e.raw_document_id = rd.id
        WHERE ${filterCondition}
        ORDER BY total_score DESC
        LIMIT 5
      `;
      const res = await pool.query(expandQuerySql, [eEmbStr]);
      expandedResults.push(...res.rows);
    }

    // Sort globally by total_score
    expandedResults.sort((a, b) => Number(b.total_score) - Number(a.total_score));
    const uniqueExpanded = Array.from(new Map(expandedResults.map(r => [r.exact_quote, r])).values());

    if (uniqueExpanded.length >= 3) {
      return NextResponse.json({
        mode_used: "semantic",
        signal_density: getSignalDensity(uniqueExpanded),
        explanation: "Semantic expansion used to find broader related pain points.",
        results: uniqueExpanded.slice(0, 10).map((r: any) => ({
          title: r.title,
          summary: r.summary,
          exact_quote: r.exact_quote,
          why_it_matters: r.why_it_matters,
          confidence: r.confidence,
          source_url: r.source_url
        }))
      });
    }

    // =========================================================================
    // Step 3: Signal Fallback
    // =========================================================================
    // Ignore semantic vector entirely. Just grab highest global signals in DB.
    const signalQuery = `
      SELECT 
        COALESCE(pc.theme_summary, 'Strong Pain Signal Detected') as title,
        'Found evidence indicating money lost or high switching intent.' as summary,
        e.exact_quote,
        'Global signal fallback matched explicitly stated switching intent or financial loss.' as why_it_matters,
        0.9 as confidence,
        rd.url as source_url,
        (
          ${rankingLogic}
        ) as total_score
      FROM evidence_annotations a
      JOIN evidences e ON a.evidence_id = e.id
      JOIN raw_documents rd ON e.raw_document_id = rd.id
      LEFT JOIN problem_clusters pc ON e.problem_cluster_id = pc.id
      WHERE (a.switching_intent = true OR (a.money_lost IS NOT NULL AND a.money_lost != ''))
      ORDER BY total_score DESC
      LIMIT 10
    `;

    const signalRes = await pool.query(signalQuery);
    const uniqueSignal = Array.from(new Map(signalRes.rows.map((r: any) => [r.exact_quote, r])).values());

    if (uniqueSignal.length >= 3) {
      return NextResponse.json({
        mode_used: "signal_fallback",
        signal_density: getSignalDensity(uniqueSignal),
        explanation: "Ignored filters to retrieve strongest global pain signals.",
        results: uniqueSignal.slice(0, 10).map((r: any) => ({
          title: r.title,
          summary: r.summary,
          exact_quote: r.exact_quote,
          why_it_matters: r.why_it_matters,
          confidence: r.confidence,
          source_url: r.source_url
        }))
      });
    }

    // =========================================================================
    // Step 4: Raw Evidence Mode (Last Resort)
    // =========================================================================
    const rawQuery = `
      SELECT 
        'Recent Raw Evidence' as title,
        'Showing unstructured evidence matching core pain patterns.' as summary,
        e.exact_quote,
        'Raw evidence retrieved due to lack of clustered opportunities.' as why_it_matters,
        0.5 as confidence,
        rd.url as source_url,
        (
          ${rankingLogic}
        ) as total_score
      FROM evidences e
      JOIN evidence_annotations a ON a.evidence_id = e.id
      JOIN raw_documents rd ON e.raw_document_id = rd.id
      WHERE ${rawFilterCondition}
      ORDER BY total_score DESC, e.created_at DESC
      LIMIT 10
    `;

    const rawRes = await pool.query(rawQuery);
    const uniqueRaw = Array.from(new Map(rawRes.rows.map((r: any) => [r.exact_quote, r])).values());
    
    // In the extremely rare case even raw evidence returns 0, we still must return SOMETHING per product rules, 
    // but the prompt guarantees we just return the raw evidence rows.
    const fallbackResults = uniqueRaw.length > 0 ? uniqueRaw : [{
      title: "No Data Available",
      summary: "The intelligence database contains no actionable signals yet.",
      exact_quote: "Start the ingestion pipeline to discover new evidence.",
      why_it_matters: "Awaiting system initialization.",
      confidence: 1.0,
      source_url: "",
      total_score: 0
    }];

    return NextResponse.json({
      mode_used: "raw",
      signal_density: getSignalDensity(fallbackResults),
      explanation: "No strong semantic matches found; returning raw, high-signal evidence directly.",
      results: fallbackResults.slice(0, 10).map((r: any) => ({
        title: r.title,
        summary: r.summary,
        exact_quote: r.exact_quote,
        why_it_matters: r.why_it_matters,
        confidence: r.confidence,
        source_url: r.source_url
      }))
    });

  } catch (error: any) {
    console.error("Search error:", error);
    return NextResponse.json({
      mode_used: "error",
      signal_density: "low",
      explanation: "System encountered an unexpected internal error.",
      results: [{
        title: "Search Error",
        summary: "Internal error processing search.",
        exact_quote: error.message,
        why_it_matters: "System fault.",
        confidence: 0,
        source_url: ""
      }]
    }, { status: 500 });
  }
}
