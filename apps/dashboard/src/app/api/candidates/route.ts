import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const { rows } = await pool.query(`
      SELECT
        oc.id,
        oc.title,
        oc.who_has_problem,
        oc.what_workflow,
        oc.current_solution,
        oc.why_it_fails,
        oc.why_now,
        oc.potential_ai_advantage,
        oc.potential_saas_advantage,
        oc.score_evidence_count,
        oc.score_source_diversity,
        oc.score_authority_weight,
        oc.score_recency,
        oc.score_switching_intent,
        oc.score_money_lost,
        oc.score_pain_severity,
        oc.score_confidence,
        oc.total_score,
        oc.created_at,
        oc.updated_at,
        pc.theme_summary,
        pc.number_of_mentions,
        pc.source_diversity,
        pc.first_seen,
        pc.last_seen,
        pc.growth_rate
      FROM opportunity_candidates oc
      JOIN problem_clusters pc ON oc.problem_cluster_id = pc.id
      ORDER BY oc.total_score DESC
    `);
    return NextResponse.json(rows);
  } catch (error) {
    console.error('GET /api/candidates error:', error);
    return NextResponse.json({ error: 'Failed to fetch candidates' }, { status: 500 });
  }
}
