import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const { rows } = await pool.query(`
      SELECT * FROM investigations
      ORDER BY updated_at DESC
    `);
    return NextResponse.json({ ok: true, investigations: rows });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const title = body.title || 'New Investigation';
    const description = body.description || null;
    const state = body.state || { query: '', filters: {}, sort: 'relevance', layout: 'list', selected_tab: 'evidence' };
    
    const { rows } = await pool.query(`
      INSERT INTO investigations (title, description, state, owner_id, visibility)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `, [title, description, JSON.stringify(state), 'user_1', 'private']);
    
    // Log creation activity
    await pool.query(`
      INSERT INTO investigation_activities (investigation_id, event_type, details)
      VALUES ($1, $2, $3)
    `, [rows[0].id, 'CREATED', JSON.stringify({ title })]);

    return NextResponse.json({ ok: true, investigation: rows[0] });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  }
}
