import { NextResponse } from 'next/server';
import { spawn, ChildProcess } from 'child_process';
import path from 'path';
import fs from 'fs';

// Absolute paths — never depend on cwd() resolution at runtime
const PIPELINE_DIR = path.join('/Users/kirtan/Documents/awoken.in/apps/pipeline');
const UV_BIN = '/Users/kirtan/.local/bin/uv';

// Shared state across requests in the same Node.js process
declare global {
  var __pipelineProc: ChildProcess | null;
  var __pipelineLogs: string[];
  var __pipelineStartTime: number | null;
}
globalThis.__pipelineProc     = globalThis.__pipelineProc     ?? null;
globalThis.__pipelineLogs     = globalThis.__pipelineLogs     ?? [];
globalThis.__pipelineStartTime = globalThis.__pipelineStartTime ?? null;

function appendLog(data: Buffer) {
  const lines = data.toString().split('\n').filter(Boolean);
  globalThis.__pipelineLogs.push(...lines);
  if (globalThis.__pipelineLogs.length > 300) {
    globalThis.__pipelineLogs = globalThis.__pipelineLogs.slice(-300);
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  const { action } = body;

  // ── START ──────────────────────────────────────────────────────────────────
  if (action === 'start') {
    if (globalThis.__pipelineProc && !globalThis.__pipelineProc.killed) {
      return NextResponse.json({ ok: false, message: 'Pipeline already running.' });
    }

    // Validate directories / binary exist
    if (!fs.existsSync(PIPELINE_DIR)) {
      return NextResponse.json({ ok: false, message: `Pipeline dir not found: ${PIPELINE_DIR}` }, { status: 500 });
    }
    if (!fs.existsSync(UV_BIN)) {
      return NextResponse.json({ ok: false, message: `uv not found at ${UV_BIN}` }, { status: 500 });
    }

    globalThis.__pipelineLogs = ['--- Pipeline starting... ---'];
    globalThis.__pipelineStartTime = Date.now();

    const proc = spawn(UV_BIN, ['run', 'python', 'main.py'], {
      cwd: PIPELINE_DIR,
      stdio: ['ignore', 'pipe', 'pipe'],
      env: { ...process.env, PYTHONUNBUFFERED: '1' },
    });

    globalThis.__pipelineProc = proc;

    proc.stdout?.on('data', appendLog);
    proc.stderr?.on('data', appendLog);

    proc.on('close', (code) => {
      const elapsed = globalThis.__pipelineStartTime
        ? ((Date.now() - globalThis.__pipelineStartTime) / 1000).toFixed(1)
        : '?';
      globalThis.__pipelineLogs.push(`--- Pipeline finished (exit ${code}) in ${elapsed}s ---`);
      globalThis.__pipelineProc     = null;
      globalThis.__pipelineStartTime = null;
    });

    proc.on('error', (err) => {
      globalThis.__pipelineLogs.push(`--- Spawn error: ${err.message} ---`);
      globalThis.__pipelineProc     = null;
      globalThis.__pipelineStartTime = null;
    });

    return NextResponse.json({ ok: true, message: 'Pipeline started.' });
  }

  // ── STOP ───────────────────────────────────────────────────────────────────
  if (action === 'stop') {
    if (!globalThis.__pipelineProc || globalThis.__pipelineProc.killed) {
      return NextResponse.json({ ok: false, message: 'No pipeline running.' });
    }
    globalThis.__pipelineProc.kill('SIGTERM');
    globalThis.__pipelineLogs.push('--- Pipeline stopped by user ---');
    globalThis.__pipelineProc     = null;
    globalThis.__pipelineStartTime = null;
    return NextResponse.json({ ok: true, message: 'Pipeline stopped.' });
  }

  // ── STATUS ─────────────────────────────────────────────────────────────────
  if (action === 'status') {
    const running = !!(globalThis.__pipelineProc && !globalThis.__pipelineProc.killed);
    const elapsedMs = running && globalThis.__pipelineStartTime
      ? Date.now() - globalThis.__pipelineStartTime
      : null;
    return NextResponse.json({
      running,
      logs: globalThis.__pipelineLogs.slice(-100),
      elapsedMs,
    });
  }

  return NextResponse.json({ ok: false, message: 'Unknown action.' }, { status: 400 });
}
