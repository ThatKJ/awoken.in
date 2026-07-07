import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(req: Request, context: any) {
  try {
    const { id } = context.params;
    const body = await req.json();
    const { finding_type, evidence_id, cluster_id, opportunity_id, notes } = body;

    const { rows } = await pool.query(`
      INSERT INTO investigation_findings (investigation_id, finding_type, evidence_id, cluster_id, opportunity_id, notes)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `, [id, finding_type, evidence_id || null, cluster_id || null, opportunity_id || null, notes || null]);

    await pool.query(`
      INSERT INTO investigation_activities (investigation_id, event_type, details)
      VALUES ($1, $2, $3)
    `, [id, 'SAVED_FINDING', JSON.stringify({ finding_type })]);

    return NextResponse.json({ ok: true, finding: rows[0] });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  }
}
