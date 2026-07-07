import pool from '@/lib/db';
import Link from 'next/link';
import Topbar from '@/components/Topbar';

export const dynamic = 'force-dynamic';

function scoreClass(score: number) {
  if (score >= 7) return 'badge-high';
  if (score >= 4) return 'badge-emerging';
  return 'badge-urgent';
}

function scoreLabel(score: number) {
  if (score >= 7) return 'High Confidence';
  if (score >= 4) return 'Emerging';
  return 'Urgent Pain';
}

function painBars(score: number) {
  const filled = Math.round((score / 10) * 5);
  return Array.from({ length: 5 }, (_, i) => (
    <div key={i} className={`pain-bar${i < filled ? ' filled' : ' empty'}`} />
  ));
}

export default async function OpportunitiesPage() {
  const { rows: candidates } = await pool.query(`
    SELECT
      oc.*,
      pc.theme_summary,
      pc.number_of_mentions,
      pc.source_diversity,
      (SELECT e.exact_quote FROM evidences e WHERE e.problem_cluster_id = pc.id ORDER BY e.created_at DESC LIMIT 1) as top_quote
    FROM opportunity_candidates oc
    JOIN problem_clusters pc ON oc.problem_cluster_id = pc.id
    ORDER BY oc.total_score DESC
  `);

  const totalEvidence = candidates.reduce((acc: number, c: { number_of_mentions: string | number }) => acc + Number(c.number_of_mentions), 0);

  return (
    <>
      <Topbar />
      <div className="content">
        {/* Page header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 28 }}>
          <div>
            <div className="page-eyebrow">
              <span className="material-symbols-outlined" style={{ fontSize: 14, fontVariationSettings: "'FILL' 1" }}>stars</span>
              Strategic Intelligence
            </div>
            <h1 className="page-title">Opportunities Explorer</h1>
            <p className="page-subtitle">
              Vetted market gaps identified through proprietary founder sentiment analysis and pain signal clustering.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-secondary">
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>filter_list</span>
              Filter
            </button>
            <button className="btn btn-secondary">
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>sort</span>
              Relevance
            </button>
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 28 }}>
          <div className="stat-card" style={{ padding: 16 }}>
            <div className="stat-label">High Confidence</div>
            <div className="stat-value" style={{ fontSize: 20 }}>{candidates.filter((c: { total_score: number }) => Number(c.total_score) >= 7).length} Gaps</div>
          </div>
          <div className="stat-card" style={{ padding: 16 }}>
            <div className="stat-label">Average Pain Level</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 }}>
              {painBars(candidates.length ? candidates.reduce((acc: number, c: { total_score: number }) => acc + Number(c.total_score), 0) / candidates.length : 0)}
              <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', marginLeft: 4 }}>
                {candidates.length ? (candidates.reduce((acc: number, c: { total_score: number }) => acc + Number(c.total_score), 0) / candidates.length).toFixed(1) : '—'}
              </span>
            </div>
          </div>
          <div className="stat-card" style={{ padding: 16 }}>
            <div className="stat-label">Evidence Sources</div>
            <div className="stat-value" style={{ fontSize: 20 }}>{totalEvidence}</div>
          </div>
          <div className="stat-card" style={{ padding: 16, background: 'rgba(133,83,0,0.05)', borderColor: 'rgba(133,83,0,0.2)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div className="stat-label" style={{ color: 'var(--color-primary)', fontWeight: 700 }}>Total Opportunities</div>
              <div className="stat-value" style={{ fontSize: 20, color: 'var(--color-on-primary-fixed-variant)' }}>{candidates.length}</div>
            </div>
            <span className="material-symbols-outlined" style={{ position: 'absolute', right: -16, bottom: -16, fontSize: 70, opacity: 0.08, color: 'var(--color-primary)' }}>trending_up</span>
          </div>
        </div>

        {/* Cards grid */}
        {candidates.length === 0 ? (
          <div className="section-card">
            <div className="empty-state">
              <span className="material-symbols-outlined empty-state-icon">lightbulb</span>
              <div className="empty-state-title">No opportunities promoted yet</div>
              <div className="empty-state-sub">Run the pipeline with enough evidence to promote clusters into opportunities. Threshold: 2+ mentions.</div>
            </div>
          </div>
        ) : (
          <div className="opp-cards-grid">
            {candidates.map((c: {
              id: string;
              title: string;
              who_has_problem: string;
              what_workflow: string;
              why_it_fails: string;
              total_score: number;
              number_of_mentions: number;
              source_diversity: number;
              top_quote: string;
              theme_summary: string;
            }) => {
              const score = Number(c.total_score);
              const pct = Math.min(100, Math.round(score * 10));
              const mentions = Number(c.number_of_mentions);
              return (
                <Link key={c.id} href={`/opportunities/${c.id}`} className="opp-card">
                  <div className="opp-card-body">
                    <div className="opp-card-tags">
                      <span className="tag-category">
                        {c.what_workflow ? c.what_workflow.split(' ').slice(0, 2).join(' ') : 'Intelligence'}
                      </span>
                      <span className={`badge ${scoreClass(score)}`}>
                        {score >= 7 && <span className="material-symbols-outlined" style={{ fontSize: 12, fontVariationSettings: "'FILL' 1" }}>verified</span>}
                        {scoreLabel(score)}
                      </span>
                    </div>
                    <h3 className="opp-card-title">{c.title}</h3>
                    <p className="opp-card-desc">{c.who_has_problem || c.theme_summary}</p>

                    {/* Score bar */}
                    <div className="score-section">
                      <div className="score-row">
                        <span className="score-row-label">Build Score</span>
                        <span className="score-row-value">{pct}%</span>
                      </div>
                      <div className="score-bar-track">
                        <div className="score-bar-fill" style={{ width: `${pct}%` }} />
                      </div>
                    </div>

                    {/* Stats row */}
                    <div className="opp-stats-row">
                      <div className="opp-stat">
                        <div className="opp-stat-label">Evidence</div>
                        <div className="opp-stat-value">{mentions}</div>
                      </div>
                      <div className="opp-stat">
                        <div className="opp-stat-label">Pain Level</div>
                        <div className="pain-bars">{painBars(score)}</div>
                      </div>
                      <div className="opp-stat">
                        <div className="opp-stat-label">Sources</div>
                        <div style={{ fontSize: 13, fontWeight: 700 }}>{Number(c.source_diversity).toFixed(0)}</div>
                      </div>
                    </div>

                    {/* Top quote */}
                    {c.top_quote && (
                      <div className="evidence-quote-block">
                        <span className="material-symbols-outlined quote-icon">format_quote</span>
                        "{c.top_quote.slice(0, 140)}{c.top_quote.length > 140 ? '…' : ''}"
                      </div>
                    )}
                  </div>

                  <div className="opp-card-footer">
                    <div style={{ fontSize: 11, color: 'var(--color-secondary)' }}>
                      Score: {score.toFixed(1)} / 10
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button className="btn btn-ghost" style={{ fontSize: 11 }}>Compare</button>
                      <button className="btn btn-primary" style={{ fontSize: 11, padding: '5px 12px' }}>
                        Deep Dive
                        <span className="material-symbols-outlined" style={{ fontSize: 12 }}>arrow_forward</span>
                      </button>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        <footer className="page-footer">
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', fontSize: 12, color: 'var(--color-secondary)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-primary)', display: 'inline-block' }} />
              Pipeline Active
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-on-background)', display: 'inline-block' }} />
              {candidates.length} opportunities indexed
            </span>
          </div>
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">API Documentation</a>
          </div>
        </footer>
      </div>
    </>
  );
}
