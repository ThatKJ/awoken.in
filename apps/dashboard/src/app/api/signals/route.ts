import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const { rows } = await pool.query(`
      SELECT
        ps.signal_type,
        COUNT(*) as count,
        COUNT(DISTINCT e.problem_cluster_id) as cluster_count,
        COUNT(DISTINCT e.raw_document_id) as doc_count
      FROM pain_signals ps
      JOIN evidences e ON ps.evidence_id = e.id
      GROUP BY ps.signal_type
      ORDER BY count DESC
    `);
    return NextResponse.json(rows);
  } catch (error) {
    console.error('GET /api/signals error:', error);
    return NextResponse.json({ error: 'Failed to fetch signals' }, { status: 500 });
  }
}
