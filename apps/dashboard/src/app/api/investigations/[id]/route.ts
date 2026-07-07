import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(req: Request, context: any) {
  try {
    const { id } = context.params;
    
    // Fetch investigation
    const { rows: invRows } = await pool.query(`SELECT * FROM investigations WHERE id = $1`, [id]);
    if (invRows.length === 0) return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });
    const investigation = invRows[0];

    // Fetch findings
    const { rows: findings } = await pool.query(`
      SELECT f.*, 
             e.exact_quote as evidence_quote,
             c.theme_summary as cluster_theme,
             o.title as opportunity_title
      FROM investigation_findings f
      LEFT JOIN evidences e ON f.evidence_id = e.id
      LEFT JOIN problem_clusters c ON f.cluster_id = c.id
      LEFT JOIN opportunity_candidates o ON f.opportunity_id = o.id
      WHERE f.investigation_id = $1
      ORDER BY f.created_at DESC
    `, [id]);

    // Fetch activities
    const { rows: activities } = await pool.query(`SELECT * FROM investigation_activities WHERE investigation_id = $1 ORDER BY created_at DESC`, [id]);

    // Fetch memories
    const { rows: memories } = await pool.query(`SELECT * FROM investigation_memories WHERE investigation_id = $1 ORDER BY created_at DESC`, [id]);

    return NextResponse.json({
      ok: true,
      investigation,
      findings,
      activities,
      memories
    });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  }
}

export async function PATCH(req: Request, context: any) {
  try {
    const { id } = context.params;
    const body = await req.json();
    
    const updates: string[] = [];
    const values: any[] = [];
    let idx = 1;

    if (body.title !== undefined) {
      updates.push(`title = $${idx++}`);
      values.push(body.title);
    }
    if (body.description !== undefined) {
      updates.push(`description = $${idx++}`);
      values.push(body.description);
    }
    if (body.state !== undefined) {
      updates.push(`state = $${idx++}`);
      values.push(JSON.stringify(body.state));
    }

    if (updates.length === 0) return NextResponse.json({ ok: true });

    values.push(id);
    const { rows } = await pool.query(`
      UPDATE investigations 
      SET ${updates.join(', ')}, updated_at = NOW()
      WHERE id = $${idx}
      RETURNING *
    `, values);

    return NextResponse.json({ ok: true, investigation: rows[0] });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  }
}
