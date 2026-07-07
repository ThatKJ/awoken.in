import { NextResponse } from 'next/server';
import { spawn } from 'child_process';
import path from 'path';

export async function POST() {
  return new Promise<NextResponse>((resolve) => {
    const pipelineDir = path.join(process.cwd(), '..', 'pipeline');
    
    const proc = spawn('uv', ['run', 'python', 'intelligence_engine.py'], {
      cwd: pipelineDir,
      stdio: ['ignore', 'pipe', 'pipe']
    });

    let output = '';
    proc.stdout.on('data', (d: Buffer) => { output += d.toString(); });
    proc.stderr.on('data', (d: Buffer) => { output += d.toString(); });

    proc.on('close', (code: number) => {
      if (code === 0) {
        resolve(NextResponse.json({ success: true, output }));
      } else {
        resolve(NextResponse.json({ success: false, output }, { status: 500 }));
      }
    });

    proc.on('error', (err: Error) => {
      resolve(NextResponse.json({ success: false, error: err.message }, { status: 500 }));
    });
  });
}
