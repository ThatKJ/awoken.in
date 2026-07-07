import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    // Candidate + cluster info
    const candidateResult = await pool.query(`
      SELECT
        oc.*,
        pc.theme_summary,
        pc.number_of_mentions,
        pc.source_diversity,
        pc.first_seen,
        pc.last_seen,
        pc.growth_rate
      FROM opportunity_candidates oc
      JOIN problem_clusters pc ON oc.problem_cluster_id = pc.id
      WHERE oc.id = $1
    `, [id]);

    if (candidateResult.rows.length === 0) {
      return NextResponse.json({ error: 'Candidate not found' }, { status: 404 });
    }

    const candidate = candidateResult.rows[0];

    // Evidence with pain signals, observations, entities
    const evidenceResult = await pool.query(`
      SELECT
        e.id,
        e.exact_quote,
        e.confidence,
        e.created_at,
        rd.title as doc_title,
        rd.url as doc_url,
        rd.source,
        rd.author,
        rd.timestamp as doc_timestamp,
        COALESCE(
          json_agg(DISTINCT jsonb_build_object('signal_type', ps.signal_type)) 
          FILTER (WHERE ps.id IS NOT NULL), '[]'
        ) as pain_signals,
        COALESCE(
          json_agg(DISTINCT jsonb_build_object('fact', obs.fact))
          FILTER (WHERE obs.id IS NOT NULL), '[]'
        ) as observations,
        COALESCE(
          json_agg(DISTINCT jsonb_build_object('entity_type', ent.entity_type, 'name', ent.name))
          FILTER (WHERE ent.id IS NOT NULL), '[]'
        ) as entities
      FROM evidences e
      JOIN raw_documents rd ON e.raw_document_id = rd.id
      LEFT JOIN pain_signals ps ON ps.evidence_id = e.id
      LEFT JOIN observations obs ON obs.evidence_id = e.id
      LEFT JOIN entities ent ON ent.evidence_id = e.id
      WHERE e.problem_cluster_id = $1
      GROUP BY e.id, rd.title, rd.url, rd.source, rd.author, rd.timestamp
      ORDER BY e.created_at DESC
    `, [candidate.problem_cluster_id]);

    return NextResponse.json({
      ...candidate,
      evidences: evidenceResult.rows,
    });
  } catch (error) {
    console.error(`GET /api/candidates/${id} error:`, error);
    return NextResponse.json({ error: 'Failed to fetch candidate detail' }, { status: 500 });
  }
}
