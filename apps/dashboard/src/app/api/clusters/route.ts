import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const { rows } = await pool.query(`
      SELECT
        pc.id,
        pc.theme_summary,
        pc.number_of_mentions,
        pc.source_diversity,
        pc.author_diversity,
        pc.first_seen,
        pc.last_seen,
        pc.growth_rate,
        pc.created_at,
        pc.updated_at,
        CASE WHEN oc.id IS NOT NULL THEN true ELSE false END as has_candidate,
        oc.id as candidate_id,
        oc.title as candidate_title,
        oc.total_score as candidate_score
      FROM problem_clusters pc
      LEFT JOIN opportunity_candidates oc ON oc.problem_cluster_id = pc.id
      ORDER BY pc.number_of_mentions DESC
    `);
    return NextResponse.json(rows);
  } catch (error) {
    console.error('GET /api/clusters error:', error);
    return NextResponse.json({ error: 'Failed to fetch clusters' }, { status: 500 });
  }
}
