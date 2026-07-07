"use client";

import { useState, useEffect, useRef } from 'react';

export default function PipelineControl() {
  const [running, setRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const logsEndRef = useRef<HTMLDivElement>(null);
  const pollRef = useRef<NodeJS.Timeout | null>(null);

  const callPipeline = async (action: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/pipeline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      });
      const data = await res.json();
      if (action === 'status') {
        setRunning(data.running);
        setLogs(data.logs || []);
      } else if (action === 'start') {
        if (data.ok) setRunning(true);
      } else if (action === 'stop') {
        if (data.ok) setRunning(false);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // Poll status every 2s when running
  useEffect(() => {
    callPipeline('status');
    pollRef.current = setInterval(() => callPipeline('status'), 2000);
    return () => { if (pollRef.current) clearInterval(pollRef.current); };
  }, []);

  // Auto-scroll logs
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const statusColor = running ? '#059669' : '#6b7280';
  const statusDot = running ? '#22c55e' : '#9ca3af';

  return (
    <div style={{
      position: 'fixed',
      bottom: 24,
      right: 24,
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: 8,
      fontFamily: 'system-ui, sans-serif',
    }}>
      {/* Log panel */}
      {expanded && (
        <div style={{
          width: 420,
          maxHeight: 280,
          backgroundColor: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: 8,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
        }}>
          <div style={{ padding: '8px 14px', borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f9fafb' }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Pipeline Logs
            </span>
            <span style={{ fontSize: 11, color: statusColor, fontWeight: 600 }}>
              {running ? '● RUNNING' : '○ IDLE'}
            </span>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '10px 14px', fontFamily: 'monospace', fontSize: 11, color: '#374151', lineHeight: 1.8, backgroundColor: '#ffffff' }}>
            {logs.length === 0 ? (
              <span style={{ color: '#9ca3af' }}>No logs yet. Start the pipeline to begin.</span>
            ) : (
              logs.map((line, i) => (
                <div key={i} style={{
                  color: line.includes('✓') ? '#059669' : line.includes('Error') || line.includes('failed') ? '#dc2626' : line.startsWith('---') ? '#9ca3af' : '#374151',
                  borderBottom: '1px solid #f9fafb',
                  paddingBottom: 2,
                }}>
                  {line}
                </div>
              ))
            )}
            <div ref={logsEndRef} />
          </div>
        </div>
      )}

      {/* Control dock */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        backgroundColor: '#ffffff',
        border: '1px solid #e5e7eb',
        borderRadius: 40,
        padding: '8px 16px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
      }}>
        {/* Status dot */}
        <div style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: statusDot,
          boxShadow: running ? `0 0 0 3px ${statusDot}33` : 'none',
        }} />
        <span style={{ fontSize: 12, fontWeight: 600, color: '#374151', minWidth: 90 }}>
          {running ? 'Scraping...' : 'Pipeline Idle'}
        </span>

        {/* Logs toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            fontSize: 11,
            padding: '4px 10px',
            borderRadius: 20,
            border: '1px solid #e5e7eb',
            background: expanded ? '#f3f4f6' : 'transparent',
            color: '#6b7280',
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          Logs
        </button>

        {/* Start button */}
        {!running && (
          <button
            onClick={() => callPipeline('start')}
            disabled={loading}
            style={{
              fontSize: 12,
              padding: '6px 16px',
              borderRadius: 20,
              border: 'none',
              background: '#fbbf24',
              color: '#000',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              opacity: loading ? 0.6 : 1,
            }}
          >
            ▶ Start Scraping
          </button>
        )}

        {/* Stop button */}
        {running && (
          <button
            onClick={() => callPipeline('stop')}
            disabled={loading}
            style={{
              fontSize: 12,
              padding: '6px 16px',
              borderRadius: 20,
              border: 'none',
              background: '#ef4444',
              color: '#fff',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              opacity: loading ? 0.6 : 1,
            }}
          >
            ■ Stop
          </button>
        )}
      </div>
    </div>
  );
}
