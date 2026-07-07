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

export default async function ProblemsPage() {
  const { rows: clusters } = await pool.query(`
    SELECT
      pc.*,
      COALESCE(COUNT(e.id), 0) as evidence_count,
      COALESCE(COUNT(DISTINCT e.raw_document_id), 0) as doc_count,
      (SELECT e2.exact_quote FROM evidences e2 WHERE e2.problem_cluster_id = pc.id ORDER BY e2.created_at DESC LIMIT 1) as top_quote,
      EXISTS(SELECT 1 FROM opportunity_candidates oc WHERE oc.problem_cluster_id = pc.id) as promoted
    FROM problem_clusters pc
    LEFT JOIN evidences e ON e.problem_cluster_id = pc.id
    GROUP BY pc.id
    ORDER BY pc.number_of_mentions DESC
  `);

  const maxMentions = Math.max(...clusters.map((c: { number_of_mentions: string }) => Number(c.number_of_mentions)), 1);

  return (
    <>
      <Topbar />
      <div className="content">
        {/* Page header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 28 }}>
          <div>
            <div className="page-eyebrow">
              <span className="material-symbols-outlined" style={{ fontSize: 14 }}>report_problem</span>
              Signal Intelligence
            </div>
            <h1 className="page-title">Problem Clusters</h1>
            <p className="page-subtitle">
              Recurring pain patterns grouped by semantic similarity. Higher mention counts = stronger signal.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-secondary">
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>filter_list</span>
              Filter
            </button>
            <select className="filter-select">
              <option>All clusters</option>
              <option>Promoted only</option>
              <option>High mentions</option>
            </select>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 28 }}>
          <div className="stat-card" style={{ padding: 16 }}>
            <div className="stat-label">Total Clusters</div>
            <div className="stat-value" style={{ fontSize: 22 }}>{clusters.length}</div>
          </div>
          <div className="stat-card" style={{ padding: 16 }}>
            <div className="stat-label">Promoted to Opportunity</div>
            <div className="stat-value" style={{ fontSize: 22, color: 'var(--color-primary)' }}>
              {clusters.filter((c: { promoted: boolean }) => c.promoted).length}
            </div>
          </div>
          <div className="stat-card" style={{ padding: 16 }}>
            <div className="stat-label">Total Evidence Signals</div>
            <div className="stat-value" style={{ fontSize: 22 }}>
              {clusters.reduce((acc: number, c: { number_of_mentions: string }) => acc + Number(c.number_of_mentions), 0)}
            </div>
          </div>
          <div className="stat-card" style={{ padding: 16 }}>
            <div className="stat-label">Highest Mention Count</div>
            <div className="stat-value" style={{ fontSize: 22 }}>{maxMentions}</div>
          </div>
        </div>

        {/* Table */}
        <div className="section-card">
          {clusters.length === 0 ? (
            <div className="empty-state">
              <span className="material-symbols-outlined empty-state-icon">report_problem</span>
              <div className="empty-state-title">No problem clusters yet</div>
              <div className="empty-state-sub">Run the pipeline to cluster evidence into recurring pain patterns.</div>
            </div>
          ) : (
            <table className="problems-table">
              <thead>
                <tr>
                  <th>Problem Theme</th>
                  <th>Signals</th>
                  <th>Coverage</th>
                  <th>Last Seen</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {clusters.map((c: {
                  id: string;
                  theme_summary: string;
                  number_of_mentions: string;
                  evidence_count: string;
                  top_quote: string;
                  last_seen: string;
                  promoted: boolean;
                  growth_rate: string;
                }) => {
                  const mentions = Number(c.number_of_mentions);
                  const pct = Math.round((mentions / maxMentions) * 100);
                  return (
                    <tr key={c.id}>
                      <td>
                        <div className="problem-title">{c.theme_summary}</div>
                        {c.top_quote && (
                          <div className="problem-sub">"{c.top_quote.slice(0, 80)}…"</div>
                        )}
                      </td>
                      <td>
                        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--color-primary)', fontSize: 14 }}>
                          {mentions}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 100 }}>
                          <div style={{ flex: 1, height: 5, background: 'var(--color-surface-container)', borderRadius: 99 }}>
                            <div style={{ height: '100%', background: 'var(--color-primary)', borderRadius: 99, width: `${pct}%` }} />
                          </div>
                          <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--color-secondary)' }}>
                            {pct}%
                          </span>
                        </div>
                      </td>
                      <td style={{ whiteSpace: 'nowrap' }}>{timeAgo(c.last_seen)}</td>
                      <td>
                        {c.promoted ? (
                          <span className="badge badge-high">
                            <span className="material-symbols-outlined" style={{ fontSize: 11, fontVariationSettings: "'FILL' 1" }}>verified</span>
                            Promoted
                          </span>
                        ) : (
                          <span className="badge badge-emerging">Clustering</span>
                        )}
                      </td>
                      <td>
                        <Link href="/opportunities" style={{ textDecoration: 'none' }}>
                          <button className="btn btn-ghost" style={{ fontSize: 11, padding: '4px 10px' }}>
                            View
                            <span className="material-symbols-outlined" style={{ fontSize: 12 }}>arrow_forward</span>
                          </button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        <footer className="page-footer">
          <div className="footer-status">
            <span>TOTAL CLUSTERS: {clusters.length}</span>
            <span>PROMOTED: {clusters.filter((c: { promoted: boolean }) => c.promoted).length}</span>
          </div>
          <div className="footer-links">
            <a href="#">Export CSV</a>
            <a href="#">API Reference</a>
          </div>
        </footer>
      </div>
    </>
  );
}
