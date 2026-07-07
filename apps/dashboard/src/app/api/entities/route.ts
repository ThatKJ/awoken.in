import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const { rows } = await pool.query(`
      SELECT
        ent.name,
        ent.entity_type,
        COUNT(*) as mention_count,
        COUNT(DISTINCT e.problem_cluster_id) as cluster_count,
        COUNT(DISTINCT e.raw_document_id) as doc_count,
        MIN(e.created_at) as first_seen,
        MAX(e.created_at) as last_seen
      FROM entities ent
      JOIN evidences e ON ent.evidence_id = e.id
      GROUP BY ent.name, ent.entity_type
      ORDER BY mention_count DESC
      LIMIT 100
    `);
    return NextResponse.json(rows);
  } catch (error) {
    console.error('GET /api/entities error:', error);
    return NextResponse.json({ error: 'Failed to fetch entities' }, { status: 500 });
  }
}
