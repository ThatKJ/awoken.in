import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(req: Request, context: any) {
  try {
    const { id } = context.params;
    const body = await req.json();
    const { memory_type, content, confidence } = body;

    const { rows } = await pool.query(`
      INSERT INTO investigation_memories (investigation_id, memory_type, content, confidence)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `, [id, memory_type, content, confidence || null]);

    await pool.query(`
      INSERT INTO investigation_activities (investigation_id, event_type, details)
      VALUES ($1, $2, $3)
    `, [id, 'ADDED_MEMORY', JSON.stringify({ memory_type })]);

    return NextResponse.json({ ok: true, memory: rows[0] });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  }
}
