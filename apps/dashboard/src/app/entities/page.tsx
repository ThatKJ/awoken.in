import pool from '@/lib/db';
import Topbar from '@/components/Topbar';

export const dynamic = 'force-dynamic';

const TYPE_COLORS: Record<string, string> = {
  company: 'entity-type-company',
  product: 'entity-type-product',
  technology: 'entity-type-technology',
  workflow: 'entity-type-workflow',
  role: 'entity-type-role',
  market: 'entity-type-market',
  competitor: 'entity-type-competitor',
  industry: 'entity-type-industry',
};

export default async function EntitiesPage() {
  const { rows: entities } = await pool.query(`
    SELECT
      en.id,
      en.name,
      en.entity_type,
      0 as mention_count,
      en.created_at,
      en.created_at as first_seen,
      en.created_at as last_seen,
      COALESCE(COUNT(DISTINCT e.id), 0) as evidence_count,
      COALESCE(COUNT(DISTINCT e.problem_cluster_id), 0) as cluster_count
    FROM entities en
    LEFT JOIN evidences e ON en.evidence_id = e.id
    GROUP BY en.id
    ORDER BY evidence_count DESC, en.created_at DESC
    LIMIT 200
  `);

  const { rows: [{ total }] } = await pool.query(`SELECT COUNT(*) as total FROM entities`);

  const byType: Record<string, number> = {};
  entities.forEach((e: { entity_type: string }) => {
    byType[e.entity_type] = (byType[e.entity_type] || 0) + 1;
  });

  const maxMentions = Math.max(...entities.map((e: { mention_count: string }) => Number(e.mention_count)), 1);

  return (
    <>
      <Topbar />
      <div className="content">
        {/* Page header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 28 }}>
          <div>
            <div className="page-eyebrow">
              <span className="material-symbols-outlined" style={{ fontSize: 14 }}>category</span>
              Knowledge Graph
            </div>
            <h1 className="page-title">Entity Explorer</h1>
            <p className="page-subtitle">
              Named entities extracted from evidence — companies, roles, products, technologies and market segments.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <select className="filter-select">
              <option value="">All types</option>
              {Object.keys(byType).map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <button className="btn btn-secondary">
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>sort</span>
              By mentions
            </button>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 28 }}>
          <div className="stat-card" style={{ padding: 16 }}>
            <div className="stat-label">Total Entities</div>
            <div className="stat-value" style={{ fontSize: 22 }}>{total}</div>
          </div>
          <div className="stat-card" style={{ padding: 16 }}>
            <div className="stat-label">Entity Types</div>
            <div className="stat-value" style={{ fontSize: 22 }}>{Object.keys(byType).length}</div>
          </div>
          <div className="stat-card" style={{ padding: 16 }}>
            <div className="stat-label">Most Mentioned</div>
            <div className="stat-value" style={{ fontSize: 15, color: 'var(--color-primary)', lineHeight: 1.3 }}>
              {entities[0]?.name || '—'}
            </div>
          </div>
          <div className="stat-card" style={{ padding: 16 }}>
            <div className="stat-label">Showing</div>
            <div className="stat-value" style={{ fontSize: 22 }}>{entities.length}</div>
          </div>
        </div>

        {/* Type chips */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-secondary)', alignSelf: 'center' }}>Filter:</span>
          {Object.entries(byType).map(([type, count]) => (
            <span key={type} className={`entity-type-badge ${TYPE_COLORS[type] || 'badge-emerging'}`}
              style={{ padding: '4px 10px', fontSize: 11, cursor: 'pointer' }}>
              {type} ({count})
            </span>
          ))}
        </div>

        {/* Entity table */}
        <div className="section-card">
          {entities.length === 0 ? (
            <div className="empty-state">
              <span className="material-symbols-outlined empty-state-icon">category</span>
              <div className="empty-state-title">No entities extracted yet</div>
              <div className="empty-state-sub">Run the LLM extraction pipeline to populate entities from evidence.</div>
            </div>
          ) : (
            <table className="problems-table">
              <thead>
                <tr>
                  <th>Entity Name</th>
                  <th>Type</th>
                  <th>Mentions</th>
                  <th>Coverage</th>
                  <th>Evidence</th>
                  <th>Clusters</th>
                  <th>Last Seen</th>
                </tr>
              </thead>
              <tbody>
                {entities.map((e: {
                  id: string;
                  name: string;
                  entity_type: string;
                  mention_count: string;
                  evidence_count: string;
                  cluster_count: string;
                  last_seen: string;
                }) => {
                  const mentions = Number(e.mention_count);
                  const pct = Math.round((mentions / maxMentions) * 100);
                  const lastSeen = e.last_seen ? new Date(e.last_seen) : null;
                  const daysAgo = lastSeen
                    ? Math.floor((Date.now() - lastSeen.getTime()) / 86400000)
                    : null;
                  return (
                    <tr key={e.id}>
                      <td>
                        <div className="problem-title">{e.name}</div>
                      </td>
                      <td>
                        <span className={`entity-type-badge ${TYPE_COLORS[e.entity_type] || ''}`}>
                          {e.entity_type}
                        </span>
                      </td>
                      <td>
                        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--color-primary)' }}>
                          {mentions}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 80 }}>
                          <div style={{ flex: 1, height: 4, background: 'var(--color-surface-container)', borderRadius: 99 }}>
                            <div style={{ height: '100%', background: 'var(--color-primary)', borderRadius: 99, width: `${pct}%` }} />
                          </div>
                        </div>
                      </td>
                      <td style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>{e.evidence_count}</td>
                      <td style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>{e.cluster_count}</td>
                      <td style={{ fontSize: 11, color: 'var(--color-secondary)' }}>
                        {daysAgo === 0 ? 'Today' : daysAgo === 1 ? 'Yesterday' : daysAgo ? `${daysAgo}d ago` : '—'}
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
            <span>ENTITIES: {total}</span>
            <span>TYPES: {Object.keys(byType).length}</span>
          </div>
          <div className="footer-links">
            <a href="#">Export JSON</a>
            <a href="#">Graph View</a>
          </div>
        </footer>
      </div>
    </>
  );
}
