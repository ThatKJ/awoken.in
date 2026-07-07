import pool from '@/lib/db';
import Link from 'next/link';
import Topbar from '@/components/Topbar';

export const dynamic = 'force-dynamic';

function timeAgo(date: string | Date | null): string {
  if (!date) return '—';
  const d = typeof date === 'string' ? new Date(date) : date;
  const seconds = Math.floor((Date.now() - d.getTime()) / 1000);
  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning.';
  if (h < 17) return 'Good afternoon.';
  return 'Good evening.';
}

export default async function EvidenceExplorerPage() {
  // Query raw evidence and its latest annotation
  const { rows: evidences } = await pool.query(`
    SELECT e.id, e.exact_quote, e.created_at, 
           rd.source, rd.url, 
           a.workflow, a.pain_type, a.current_tool, a.customer_role, a.feature_request, a.workaround, a.field_confidences
    FROM evidences e
    JOIN raw_documents rd ON e.raw_document_id = rd.id
    LEFT JOIN evidence_annotations a ON e.id = a.evidence_id
    ORDER BY e.created_at DESC
    LIMIT 50
  `);

  const { rows: stats } = await pool.query(`
    SELECT COUNT(*) as cnt FROM evidences
    WHERE created_at > NOW() - INTERVAL '24 hours'
  `);
  const newEvidenceToday = Number(stats[0]?.cnt || 0);

  return (
    <>
      <Topbar />
      <div className="content">
        <section style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 28 }}>
            <div>
              <h2 style={{ fontSize: 32, fontWeight: 600, letterSpacing: '-0.03em', lineHeight: '40px' }}>
                {getGreeting()}
              </h2>
              <p style={{ color: 'var(--color-secondary)', marginTop: 4 }}>
                Atomic Evidence Explorer (V2) - Pure, verifiable customer facts.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 16 }}>
              <div className="stat-badge positive" style={{ padding: '8px 16px', fontSize: 14 }}>
                +{newEvidenceToday} New Evidence Today
              </div>
            </div>
          </div>
        </section>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {evidences.length === 0 ? (
            <div className="empty-state">
              <span className="material-symbols-outlined empty-state-icon">verified</span>
              <div className="empty-state-title">No evidence found</div>
              <div className="empty-state-sub">Run the extraction pipeline to ingest atomic evidence.</div>
            </div>
          ) : (
            evidences.map((e) => {
              // Calculate average confidence
              const confs = e.field_confidences ? Object.values(e.field_confidences).filter(c => typeof c === 'number') as number[] : [];
              const avgConf = confs.length ? (confs.reduce((a,b) => a+b, 0) / confs.length * 100).toFixed(0) : 'N/A';
              
              return (
                <div key={e.id} className="section-card" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {/* Quote Header */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                      <span className="badge badge-emerging" style={{ textTransform: 'uppercase' }}>
                        {e.source}
                      </span>
                      <span style={{ fontSize: 12, color: 'var(--color-secondary)' }}>{timeAgo(e.created_at)}</span>
                    </div>
                    <blockquote style={{ fontSize: 18, fontStyle: 'italic', fontWeight: 500, color: 'var(--color-on-surface)', borderLeft: '3px solid var(--color-primary)', paddingLeft: 16, margin: 0 }}>
                      "{e.exact_quote}"
                    </blockquote>
                  </div>

                  {/* Attributes Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, background: 'var(--color-surface-container)', padding: 16, borderRadius: 8 }}>
                    <div>
                      <div style={{ fontSize: 11, color: 'var(--color-secondary)', textTransform: 'uppercase', fontWeight: 600, marginBottom: 4 }}>Pain Type</div>
                      <div style={{ fontSize: 14, fontWeight: 500 }}>{e.pain_type || '—'}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: 'var(--color-secondary)', textTransform: 'uppercase', fontWeight: 600, marginBottom: 4 }}>Role</div>
                      <div style={{ fontSize: 14 }}>{e.customer_role || '—'}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: 'var(--color-secondary)', textTransform: 'uppercase', fontWeight: 600, marginBottom: 4 }}>Workflow</div>
                      <div style={{ fontSize: 14 }}>{e.workflow || '—'}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: 'var(--color-secondary)', textTransform: 'uppercase', fontWeight: 600, marginBottom: 4 }}>Current Tool</div>
                      <div style={{ fontSize: 14 }}>{e.current_tool || '—'}</div>
                    </div>
                  </div>

                  {/* Feature & Workaround */}
                  {(e.feature_request || e.workaround) && (
                    <div style={{ display: 'flex', gap: 24, fontSize: 13, color: 'var(--color-secondary)' }}>
                      {e.feature_request && (
                        <div style={{ flex: 1 }}>
                          <strong style={{ color: 'var(--color-on-surface)' }}>Feature Request:</strong> {e.feature_request}
                        </div>
                      )}
                      {e.workaround && (
                        <div style={{ flex: 1 }}>
                          <strong style={{ color: 'var(--color-on-surface)' }}>Workaround:</strong> {e.workaround}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Footer Meta */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8, paddingTop: 16, borderTop: '1px solid var(--color-outline-variant)' }}>
                    <div style={{ fontSize: 12, display: 'flex', gap: 16 }}>
                      <span style={{ color: 'var(--color-secondary)' }}>
                        <strong style={{ color: 'var(--color-primary)' }}>{avgConf}%</strong> Avg Confidence
                      </span>
                    </div>
                    <a href={e.url} target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ fontSize: 12, padding: '4px 12px' }}>
                      View Source ↗
                    </a>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}
