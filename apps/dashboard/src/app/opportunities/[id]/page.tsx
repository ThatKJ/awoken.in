import pool from '@/lib/db';
import Link from 'next/link';
import Topbar from '@/components/Topbar';
import { notFound } from 'next/navigation';

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

function dateStr(date: string | Date | null): string {
  if (!date) return '—';
  return new Date(date instanceof Date ? date : date).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });
}

function painBars(score: number) {
  const filled = Math.round((score / 10) * 5);
  return Array.from({ length: 5 }, (_, i) => (
    <div key={i} className={`pain-bar${i < filled ? ' filled' : ' empty'}`} style={{ width: 6, height: 18 }} />
  ));
}

export default async function OpportunityDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { rows: cRows } = await pool.query(`
    SELECT
      oc.*,
      pc.theme_summary,
      pc.number_of_mentions,
      pc.source_diversity,
      pc.first_seen,
      pc.last_seen,
      pc.growth_rate
    FROM opportunity_candidates oc
    JOIN problem_clusters pc ON oc.problem_cluster_id = pc.id
    WHERE oc.id = $1
  `, [id]);

  if (!cRows.length) notFound();
  const c = cRows[0];

  const { rows: evidence } = await pool.query(`
    SELECT
      e.id, e.exact_quote, e.created_at,
      COALESCE(
        (SELECT AVG(val::float)
         FROM jsonb_each_text(a.field_confidences) AS kv(key, val)
         WHERE a.evidence_id = e.id
        ), 1.0
      ) as confidence,
      a.pain_type, a.workflow, a.customer_role, a.workaround, a.feature_request,
      rd.title as doc_title, rd.url as doc_url, rd.source, rd.author, rd.timestamp as doc_ts,
      COALESCE(
        json_agg(DISTINCT jsonb_build_object('type', ps.signal_type)) FILTER (WHERE ps.id IS NOT NULL), '[]'
      ) as pain_signals
    FROM evidences e
    JOIN raw_documents rd ON e.raw_document_id = rd.id
    LEFT JOIN evidence_annotations a ON a.evidence_id = e.id
    LEFT JOIN pain_signals ps ON ps.evidence_id = e.id
    WHERE e.problem_cluster_id = $1
    GROUP BY e.id, rd.title, rd.url, rd.source, rd.author, rd.timestamp, a.pain_type, a.workflow, a.customer_role, a.workaround, a.feature_request, a.field_confidences, a.evidence_id
    ORDER BY e.created_at DESC
  `, [c.problem_cluster_id]);

  const score = Number(c.total_score);
  const pct = Math.min(100, Math.round(score * 10));

  // Parse why_it_fails — it may be JSON array or a string
  let failReasons: Array<{ reason?: string; icon?: string }> = [];
  try {
    const raw = c.why_it_fails;
    if (typeof raw === 'string' && raw.startsWith('[')) {
      failReasons = JSON.parse(raw);
    } else if (Array.isArray(raw)) {
      failReasons = raw;
    } else if (raw) {
      failReasons = [{ reason: String(raw) }];
    }
  } catch {
    if (c.why_it_fails) failReasons = [{ reason: String(c.why_it_fails) }];
  }

  return (
    <>
      <Topbar />
      <div className="content">
        {/* Breadcrumb + actions */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
          <div className="breadcrumb">
            <Link href="/opportunities">Opportunities</Link>
            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>chevron_right</span>
            <span className="current">{c.title?.slice(0, 40)}{c.title?.length > 40 ? '…' : ''}</span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-secondary">
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>share</span>
              Share Brief
            </button>
            <button className="btn btn-primary">
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>add_task</span>
              Track Opportunity
            </button>
          </div>
        </div>

        {/* Two-column detail layout */}
        <div className="detail-grid">
          {/* Left column */}
          <div>
            {/* Problem summary */}
            <div className="detail-section">
              <h2 style={{ fontSize: 30, fontWeight: 600, letterSpacing: '-0.03em', lineHeight: '38px', marginBottom: 16 }}>
                {c.title}
              </h2>
              <p style={{ fontSize: 15, color: 'var(--color-secondary)', lineHeight: 1.7, marginBottom: 24 }}>
                {c.who_has_problem}
              </p>
              <div className="detail-2col">
                <div className="detail-info-box">
                  <div className="detail-info-label">Customer Segment</div>
                  <div className="detail-info-value" style={{ fontSize: 16 }}>{c.who_has_problem || '—'}</div>
                  <div className="detail-info-sub">Based on {c.number_of_mentions} evidence signals</div>
                </div>
                <div className="detail-info-box">
                  <div className="detail-info-label">Current Workflow</div>
                  <div className="detail-info-value" style={{ fontSize: 16 }}>{c.what_workflow || '—'}</div>
                  <div className="detail-info-sub">Identified from primary sources</div>
                </div>
              </div>
            </div>

            {/* Why existing solutions fail */}
            {failReasons.length > 0 && (
              <div className="detail-section">
                <h3 className="detail-section-title">
                  <span className="material-symbols-outlined" style={{ fontSize: 20, color: 'var(--color-error)' }}>warning</span>
                  Why Existing Solutions Fail
                </h3>
                <div className="fails-grid" style={{ gridTemplateColumns: `repeat(${Math.min(failReasons.length, 3)}, 1fr)` }}>
                  {failReasons.slice(0, 3).map((r, i) => {
                    const icons = ['history', 'cloud_off', 'face_retouching_off'];
                    const labels = ['Latency Gap', 'Walled Gardens', 'Integration Decay'];
                    return (
                      <div key={i} className="fail-card">
                        <div className="fail-icon">
                          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>{icons[i] || 'error'}</span>
                        </div>
                        <div className="fail-title">{labels[i] || `Reason ${i + 1}`}</div>
                        <div className="fail-desc">{r.reason || String(r)}</div>
                      </div>
                    );
                  })}
                  {failReasons.length === 0 && c.why_it_fails && (
                    <div className="fail-card" style={{ gridColumn: '1/-1' }}>
                      <div className="fail-icon">
                        <span className="material-symbols-outlined" style={{ fontSize: 18 }}>error_outline</span>
                      </div>
                      <div className="fail-title">Solution Gap</div>
                      <div className="fail-desc">{c.why_it_fails}</div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Evidence Timeline */}
            <div className="detail-section">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <h3 style={{ fontSize: 18, fontWeight: 500 }}>Evidence Timeline</h3>
                <span style={{
                  fontSize: 11, fontWeight: 700, padding: '3px 10px',
                  background: 'var(--color-tertiary-fixed)', color: 'var(--color-tertiary)',
                  borderRadius: 4,
                }}>
                  {evidence.length} Signal{evidence.length !== 1 ? 's' : ''} Total
                </span>
              </div>
              {evidence.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-state-title">No evidence linked yet</div>
                </div>
              ) : (
                <div className="timeline">
                  {evidence.map((e, i) => {
                    const dotClasses = ['primary', 'secondary', 'accent'];
                    return (
                      <div key={e.id} className="timeline-item">
                        <div className={`timeline-dot ${dotClasses[i % 3]}`} />
                        <div className="timeline-meta">
                          <span className="timeline-date">{dateStr(e.doc_ts || e.created_at)}</span>
                          <span style={{ fontSize: 11, color: 'var(--color-secondary)' }}>•</span>
                          <span className="timeline-source">{e.source?.toUpperCase()} {e.doc_title ? `— ${e.doc_title.slice(0, 50)}` : ''}</span>
                        </div>
                        <p className="timeline-quote">"{e.exact_quote}"</p>
                        <div className="timeline-tags">
                          {(e.pain_signals as Array<{ type: string }>).slice(0, 3).map((ps, j) => (
                            <span key={j} className="timeline-tag">{ps.type?.replace(/_/g, ' ')}</span>
                          ))}
                          {e.confidence && (
                            <span className="timeline-tag" style={{ color: 'var(--color-primary)', borderColor: 'rgba(133,83,0,0.3)' }}>
                              Confidence: {Number(e.confidence).toFixed(2)}
                            </span>
                          )}
                          {e.doc_url && (
                            <a href={e.doc_url} target="_blank" rel="noopener noreferrer" className="timeline-tag"
                               style={{ color: 'var(--color-tertiary)', borderColor: 'rgba(0,101,139,0.3)', textDecoration: 'none' }}>
                              ↗ Source
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Right column */}
          <div>
            {/* Score card */}
            <div className="score-card">
              <span className="material-symbols-outlined score-card-bg-icon">analytics</span>
              <div className="score-card-header">
                <span className="score-card-label">Build Score</span>
                <div className="score-confidence">
                  <span className="material-symbols-outlined" style={{ fontSize: 14, fontVariationSettings: "'FILL' 1" }}>verified</span>
                  {score >= 7 ? 'High Confidence' : score >= 4 ? 'Emerging' : 'Early Signal'}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 6 }}>
                <span className="score-number">{score.toFixed(1)}</span>
                <span className="score-denom">/ 10</span>
              </div>
              <div className="score-bar-full">
                <div className="score-bar-full-fill" style={{ width: `${pct}%` }} />
              </div>
              <p className="score-desc">
                Calculated based on {c.number_of_mentions} evidence signals across {Number(c.source_diversity).toFixed(0)} source types.
              </p>
            </div>

            {/* Growth vector */}
            <div className="metric-card">
              <div className="metric-card-label">Growth Vector</div>
              <div className="metric-row">
                <div className="metric-row-header">
                  <span className="metric-row-name">Evidence Count</span>
                  <span className="metric-row-value positive">{c.number_of_mentions} signals</span>
                </div>
                <div className="metric-bar-track">
                  <div className="metric-bar-fill" style={{ width: `${Math.min(100, Number(c.number_of_mentions) * 20)}%` }} />
                </div>
              </div>
              <div className="metric-row">
                <div className="metric-row-header">
                  <span className="metric-row-name">Source Diversity</span>
                  <span className="metric-row-value positive">{Number(c.source_diversity).toFixed(0)} sources</span>
                </div>
                <div className="metric-bar-track">
                  <div className="metric-bar-fill" style={{ width: `${Math.min(100, Number(c.source_diversity) * 25)}%` }} />
                </div>
              </div>
              <div className="metric-row">
                <div className="metric-row-header">
                  <span className="metric-row-name">Solution Gap Score</span>
                  <span className="metric-row-value neutral">{pct}%</span>
                </div>
                <div className="metric-bar-track">
                  <div className="metric-bar-fill" style={{ width: `${pct}%` }} />
                </div>
              </div>
            </div>

            {/* Top quotes */}
            {evidence.length > 0 && (
              <div className="quotes-card">
                <div className="quotes-card-label">Founder Consensus</div>
                {evidence.slice(0, 2).map((e) => (
                  <div key={e.id} className="quote-item">
                    <p className="quote-item-text">"{e.exact_quote?.slice(0, 180)}{e.exact_quote?.length > 180 ? '…' : ''}"</p>
                    <div className="quote-item-author">
                      <div className="quote-item-avatar" />
                      <span className="quote-item-name">{e.author || e.source || 'Anonymous'} · {e.source?.toUpperCase()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Evidence quality */}
            <div className="quality-card">
              <div className="quality-card-label">Evidence Quality</div>
              <div className="quality-item">
                <span className="material-symbols-outlined" style={{ fontSize: 18, color: 'var(--color-tertiary)' }}>check_circle</span>
                <div className="quality-item-text">
                  <p>{c.number_of_mentions} Evidence Signals</p>
                  <p>Extracted from raw documents via LLM pipeline</p>
                </div>
              </div>
              <div className="quality-item">
                <span className="material-symbols-outlined" style={{ fontSize: 18, color: 'var(--color-tertiary)' }}>check_circle</span>
                <div className="quality-item-text">
                  <p>{Number(c.source_diversity).toFixed(0)} Distinct Sources</p>
                  <p>Cross-validated across HN, Reddit, and community forums</p>
                </div>
              </div>
              <div className="quality-item">
                <span className="material-symbols-outlined" style={{ fontSize: 18, color: 'var(--color-secondary)', opacity: 0.4 }}>radio_button_unchecked</span>
                <div className="quality-item-text">
                  <p style={{ color: 'var(--color-secondary)' }}>Primary Interviews</p>
                  <p>Awaiting direct founder conversations</p>
                </div>
              </div>
              <Link href="/evidence" style={{ textDecoration: 'none' }}>
                <button className="btn btn-secondary" style={{ width: '100%', marginTop: 16, justifyContent: 'center', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  View Full Dossier
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
