import pool from '@/lib/db';
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

export default async function EvidencePage() {
  const { rows: evidence } = await pool.query(`
    SELECT
      e.id,
      e.exact_quote,
      1.0 as confidence,
      e.created_at,
      e.problem_cluster_id,
      rd.title as doc_title,
      rd.url as doc_url,
      rd.source,
      rd.author,
      rd.timestamp as doc_ts,
      pc.theme_summary
    FROM evidences e
    JOIN raw_documents rd ON e.raw_document_id = rd.id
    LEFT JOIN problem_clusters pc ON e.problem_cluster_id = pc.id
    ORDER BY e.created_at DESC
    LIMIT 200
  `);

  const { rows: [{ total }] } = await pool.query(`SELECT COUNT(*) as total FROM evidences`);
  const { rows: [{ sources }] } = await pool.query(`SELECT COUNT(DISTINCT source) as sources FROM raw_documents`);
  const { rows: [{ today }] } = await pool.query(`
    SELECT COUNT(*) as today FROM evidences WHERE created_at > NOW() - INTERVAL '24 hours'
  `);

  const bySource: Record<string, number> = {};
  evidence.forEach((e: { source: string }) => {
    bySource[e.source] = (bySource[e.source] || 0) + 1;
  });

  return (
    <>
      <Topbar />
      <div className="content">
        {/* Page header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 28 }}>
          <div>
            <div className="page-eyebrow">
              <span className="material-symbols-outlined" style={{ fontSize: 14, fontVariationSettings: "'FILL' 1" }}>verified</span>
              Raw Intelligence
            </div>
            <h1 className="page-title">Evidence Feed</h1>
            <p className="page-subtitle">
              Every signal extracted from scraped content — the raw substrate of your intelligence network.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <select className="filter-select">
              <option>All sources</option>
              {Object.keys(bySource).map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <button className="btn btn-secondary">
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>filter_list</span>
              Filter
            </button>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 28 }}>
          <div className="stat-card" style={{ padding: 16 }}>
            <div className="stat-label">Total Evidence</div>
            <div className="stat-value" style={{ fontSize: 22 }}>{total}</div>
          </div>
          <div className="stat-card" style={{ padding: 16 }}>
            <div className="stat-label">Distinct Sources</div>
            <div className="stat-value" style={{ fontSize: 22 }}>{sources}</div>
          </div>
          <div className="stat-card" style={{ padding: 16 }}>
            <div className="stat-label">Added Today</div>
            <div className="stat-value" style={{ fontSize: 22, color: 'var(--color-primary)' }}>{today}</div>
          </div>
          <div className="stat-card" style={{ padding: 16 }}>
            <div className="stat-label">Showing</div>
            <div className="stat-value" style={{ fontSize: 22 }}>{evidence.length}</div>
          </div>
        </div>

        {/* Two-column layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 20 }}>
          {/* Evidence list */}
          <div className="section-card">
            {evidence.length === 0 ? (
              <div className="empty-state">
                <span className="material-symbols-outlined empty-state-icon">verified</span>
                <div className="empty-state-title">No evidence yet</div>
                <div className="empty-state-sub">Run the scraper and extractor pipeline to populate evidence signals.</div>
              </div>
            ) : (
              <div>
                {evidence.map((e: {
                  id: string;
                  exact_quote: string;
                  confidence: string;
                  created_at: string;
                  problem_cluster_id: string;
                  doc_title: string;
                  doc_url: string;
                  source: string;
                  author: string;
                  doc_ts: string;
                  theme_summary: string;
                }, i: number) => (
                  <div
                    key={e.id}
                    style={{
                      padding: '18px 24px',
                      borderBottom: i < evidence.length - 1 ? '1px solid var(--color-outline-variant)' : 'none',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        <span style={{
                          fontSize: 10, fontWeight: 700, padding: '2px 8px',
                          background: 'var(--color-surface-container-low)',
                          color: 'var(--color-secondary)',
                          borderRadius: 4, fontFamily: 'var(--font-mono)',
                          textTransform: 'uppercase',
                        }}>
                          {e.source}
                        </span>
                        {e.theme_summary && (
                          <span style={{
                            fontSize: 10, fontWeight: 700, padding: '2px 8px',
                            background: 'rgba(133,83,0,0.08)',
                            color: 'var(--color-primary)',
                            borderRadius: 4,
                          }}>
                            {e.theme_summary.slice(0, 30)}…
                          </span>
                        )}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        {e.confidence && (
                          <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--color-secondary)' }}>
                            conf: {Number(e.confidence).toFixed(2)}
                          </span>
                        )}
                        <span style={{ fontSize: 10, color: 'var(--color-secondary)' }}>{timeAgo(e.created_at)}</span>
                      </div>
                    </div>

                    <blockquote style={{
                      fontSize: 14, fontStyle: 'italic', lineHeight: 1.65,
                      color: 'var(--color-on-surface)',
                      borderLeft: '2px solid var(--color-primary)',
                      paddingLeft: 14, margin: '0 0 10px',
                    }}>
                      "{e.exact_quote}"
                    </blockquote>

                    <div style={{ display: 'flex', gap: 12, fontSize: 11, color: 'var(--color-secondary)' }}>
                      {e.author && <span>by {e.author}</span>}
                      {e.doc_title && <span>· {e.doc_title.slice(0, 50)}</span>}
                      {e.doc_url && (
                        <a
                          href={e.doc_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: 'var(--color-tertiary)', fontWeight: 600, textDecoration: 'none' }}
                        >
                          ↗ Source
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right sidebar — source breakdown */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="section-card" style={{ padding: 20 }}>
              <h4 style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-secondary)', marginBottom: 16 }}>
                Source Breakdown
              </h4>
              {Object.entries(bySource)
                .sort(([, a], [, b]) => b - a)
                .map(([source, count]) => {
                  const maxCount = Math.max(...Object.values(bySource));
                  const pct = Math.round((count / maxCount) * 100);
                  return (
                    <div key={source} className="industry-bar-row">
                      <div className="industry-bar-label">
                        <span style={{ textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700 }}>{source}</span>
                        <span>{count}</span>
                      </div>
                      <div className="industry-track">
                        <div className="industry-vol" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
            </div>

            <div className="section-card" style={{ padding: 20 }}>
              <h4 style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-secondary)', marginBottom: 14 }}>
                Quick Stats
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { label: 'Total collected', value: total },
                  { label: 'Sources tracked', value: sources },
                  { label: 'Added today', value: today },
                  { label: 'Showing', value: evidence.length },
                ].map((s) => (
                  <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 12, color: 'var(--color-secondary)' }}>{s.label}</span>
                    <span style={{ fontSize: 14, fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--color-primary)' }}>{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <footer className="page-footer">
          <div className="footer-status">
            <span>EVIDENCE: {total} TOTAL</span>
            <span>SOURCES: {sources}</span>
          </div>
          <div className="footer-links">
            <a href="#">Export</a>
            <a href="#">Documentation</a>
          </div>
        </footer>
      </div>
    </>
  );
}
