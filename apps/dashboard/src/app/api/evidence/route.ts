import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get('page') || '1');
  const limit = parseInt(url.searchParams.get('limit') || '50');
  const offset = (page - 1) * limit;
  const clusterId = url.searchParams.get('cluster_id');

  try {
    const conditions = clusterId ? ['e.problem_cluster_id = $3'] : [];
    const params: (string | number)[] = [limit, offset];
    if (clusterId) params.push(clusterId);

    const where = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    const { rows } = await pool.query(`
      SELECT
        e.id,
        e.exact_quote,
        e.confidence,
        e.problem_cluster_id,
        e.created_at,
        rd.title as doc_title,
        rd.url as doc_url,
        rd.source,
        rd.author,
        rd.timestamp as doc_timestamp,
        COALESCE(
          json_agg(DISTINCT jsonb_build_object('signal_type', ps.signal_type))
          FILTER (WHERE ps.id IS NOT NULL), '[]'
        ) as pain_signals
      FROM evidences e
      JOIN raw_documents rd ON e.raw_document_id = rd.id
      LEFT JOIN pain_signals ps ON ps.evidence_id = e.id
      ${where}
      GROUP BY e.id, rd.title, rd.url, rd.source, rd.author, rd.timestamp
      ORDER BY e.created_at DESC
      LIMIT $1 OFFSET $2
    `, params);

    return NextResponse.json(rows);
  } catch (error) {
    console.error('GET /api/evidence error:', error);
    return NextResponse.json({ error: 'Failed to fetch evidence' }, { status: 500 });
  }
}
