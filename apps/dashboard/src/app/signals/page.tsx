import pool from '@/lib/db';
import Topbar from '@/components/Topbar';

export const dynamic = 'force-dynamic';

export default async function SignalsPage() {
  // Pain signals now come from EvidenceAnnotation.pain_type (V2)
  const { rows: signals } = await pool.query(`
    SELECT
      a.pain_type as signal_type,
      COUNT(*) as count,
      COUNT(DISTINCT a.evidence_id) as evidence_count,
      COUNT(DISTINCT e.problem_cluster_id) as cluster_count,
      COALESCE(AVG(
        (SELECT AVG(val::float) FROM jsonb_each_text(a.field_confidences) AS kv(key, val))
      ), 1.0) as avg_confidence
    FROM evidence_annotations a
    JOIN evidences e ON a.evidence_id = e.id
    WHERE a.pain_type IS NOT NULL
    GROUP BY a.pain_type
    ORDER BY count DESC
  `);

  const { rows: recent } = await pool.query(`
    SELECT
      a.pain_type as signal_type,
      a.workaround as signal_text,
      a.id,
      e.exact_quote,
      rd.source,
      e.created_at
    FROM evidence_annotations a
    JOIN evidences e ON a.evidence_id = e.id
    JOIN raw_documents rd ON e.raw_document_id = rd.id
    WHERE a.pain_type IS NOT NULL
    ORDER BY e.created_at DESC
    LIMIT 30
  `);

  const { rows: [{ total }] } = await pool.query(`
    SELECT COUNT(*) as total FROM evidence_annotations WHERE pain_type IS NOT NULL
  `);

  const maxCount = Math.max(...signals.map((s: { count: string }) => Number(s.count)), 1);

  const typeColors: Record<string, string> = {
    TIME_WASTE: '#dc2626',
    MANUAL_WORK: '#c2410c',
    BUG: '#7c3aed',
    PRICING: '#0369a1',
    COMPLEXITY: '#0891b2',
    INTEGRATION: '#059669',
    PERFORMANCE: '#d97706',
    RELIABILITY: '#be123c',
    COLLABORATION: '#7e22ce',
    AUTOMATION: '#0f766e',
    REPORTING: '#4338ca',
    SEARCH: '#1d4ed8',
    ONBOARDING: '#15803d',
    FEATURE_GAP: '#a16207',
    OTHER: '#6b7280',
  };

  return (
    <>
      <Topbar />
      <div className="content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 28 }}>
          <div>
            <div className="page-eyebrow">
              <span className="material-symbols-outlined" style={{ fontSize: 14 }}>signal_cellular_alt</span>
              Behavioral Analysis
            </div>
            <h1 className="page-title">Pain Signals</h1>
            <p className="page-subtitle">
              Classified behavioral markers extracted from evidence annotations.
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 28 }}>
          <div className="stat-card" style={{ padding: 16 }}>
            <div className="stat-label">Total Signals</div>
            <div className="stat-value" style={{ fontSize: 22 }}>{total}</div>
          </div>
          <div className="stat-card" style={{ padding: 16 }}>
            <div className="stat-label">Signal Types</div>
            <div className="stat-value" style={{ fontSize: 22 }}>{signals.length}</div>
          </div>
          <div className="stat-card" style={{ padding: 16 }}>
            <div className="stat-label">Strongest Signal</div>
            <div className="stat-value" style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-primary)' }}>
              {signals[0]?.signal_type?.replace(/_/g, ' ') || '—'}
            </div>
          </div>
          <div className="stat-card" style={{ padding: 16 }}>
            <div className="stat-label">Avg Confidence</div>
            <div className="stat-value" style={{ fontSize: 22 }}>
              {signals.length
                ? (signals.reduce((acc: number, s: { avg_confidence: string }) => acc + Number(s.avg_confidence), 0) / signals.length).toFixed(2)
                : '—'}
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20 }}>
          {/* Signal breakdown */}
          <div className="section-card">
            <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--color-outline-variant)', marginBottom: 4 }}>
              <h3 style={{ fontSize: 16, fontWeight: 500 }}>Signal Distribution</h3>
            </div>

            {signals.length === 0 ? (
              <div className="empty-state">
                <span className="material-symbols-outlined empty-state-icon">signal_cellular_alt</span>
                <div className="empty-state-title">No pain signals extracted yet</div>
                <div className="empty-state-sub">Run the pipeline and intelligence engine to extract pain signals.</div>
              </div>
            ) : (
              <div>
                <div className="signal-row" style={{ fontWeight: 700, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-secondary)', background: 'var(--color-surface-container-low)', padding: '10px 16px' }}>
                  <span>Signal Type</span>
                  <span>Distribution</span>
                  <span style={{ textAlign: 'right' }}>Count</span>
                  <span style={{ textAlign: 'right' }}>Clusters</span>
                </div>

                {signals.map((s: {
                  signal_type: string;
                  count: string;
                  evidence_count: string;
                  cluster_count: string;
                  avg_confidence: string;
                }) => {
                  const count = Number(s.count);
                  const pct = Math.round((count / maxCount) * 100);
                  const color = typeColors[s.signal_type] || 'var(--color-secondary)';
                  return (
                    <div key={s.signal_type} className="signal-row" style={{ cursor: 'default' }}>
                      <div>
                        <div className="signal-name">{s.signal_type.replace(/_/g, ' ')}</div>
                        <div style={{ fontSize: 10, color: 'var(--color-secondary)', marginTop: 2 }}>
                          conf: {Number(s.avg_confidence).toFixed(2)}
                        </div>
                      </div>
                      <div className="signal-bar-wrap">
                        <div className="signal-bar-track">
                          <div
                            className="signal-bar-fill"
                            style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${color}, ${color}80)` }}
                          />
                        </div>
                      </div>
                      <div className="signal-count">{count}</div>
                      <div className="signal-clusters">{s.cluster_count} clusters</div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Recent signals feed */}
          <div className="section-card" style={{ maxHeight: 600, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-outline-variant)' }}>
              <h4 style={{ fontSize: 14, fontWeight: 600 }}>Recent Signals</h4>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '12px 20px', display: 'flex', flexDirection: 'column', gap: 14 }} className="custom-scrollbar">
              {recent.map((r: {
                id: string;
                signal_type: string;
                signal_text: string;
                exact_quote: string;
                source: string;
                created_at: string;
              }) => {
                const color = typeColors[r.signal_type] || 'var(--color-secondary)';
                return (
                  <div key={r.id} style={{ borderLeft: `2px solid ${color}`, paddingLeft: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color }}>
                        {r.signal_type.replace(/_/g, ' ')}
                      </span>
                      <span style={{ fontSize: 9, color: 'var(--color-secondary)', fontFamily: 'var(--font-mono)' }}>
                        {r.source}
                      </span>
                    </div>
                    {r.signal_text && (
                      <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-on-surface)', marginBottom: 4 }}>
                        {r.signal_text}
                      </p>
                    )}
                    {r.exact_quote && (
                      <p style={{ fontSize: 11, color: 'var(--color-secondary)', fontStyle: 'italic', lineHeight: 1.5 }}>
                        "{r.exact_quote.slice(0, 100)}…"
                      </p>
                    )}
                  </div>
                );
              })}
              {recent.length === 0 && (
                <div className="empty-state" style={{ padding: 24 }}>
                  <div className="empty-state-title">No recent signals</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
