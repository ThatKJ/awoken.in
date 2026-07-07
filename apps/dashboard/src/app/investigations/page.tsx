import Topbar from '@/components/Topbar';
import Link from 'next/link';

// Using a mock server component for layout speed, 
// in reality this would fetch from /api/investigations
const MOCK_INVESTIGATIONS = [
  { id: '1', title: 'CRM Pricing Frustrations', description: 'Investigating high churn in SMB CRMs due to complex pricing tiers.', updated_at: '2 hrs ago', findings: 12 },
  { id: '2', title: 'PDF Parsing Workarounds', description: 'Manual data entry complaints in accounting workflows.', updated_at: '1 day ago', findings: 5 },
  { id: '3', title: 'DevOps Tooling Complexity', description: 'Complaints about YAML configuration overload in CI/CD.', updated_at: '3 days ago', findings: 24 }
];

export default function InvestigationsPage() {
  return (
    <>
      <Topbar />
      <div className="content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
          <div>
            <div className="page-eyebrow">
              <span className="material-symbols-outlined" style={{ fontSize: 14 }}>folder_open</span>
              Workspace
            </div>
            <h1 className="page-title">Investigations</h1>
            <p className="page-subtitle">Your saved research sessions and intelligence workspaces.</p>
          </div>
          <button className="btn btn-primary" style={{ padding: '8px 16px', fontSize: 13, display: 'flex', gap: 6, alignItems: 'center' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>add</span>
            New Investigation
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24 }}>
          {MOCK_INVESTIGATIONS.map(inv => (
            <Link key={inv.id} href={`/investigations/${inv.id}`} style={{ textDecoration: 'none' }}>
              <div className="section-card" style={{ padding: 24, cursor: 'pointer', height: '100%', transition: 'border 0.2s', border: '1px solid var(--color-outline-variant)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--color-on-surface)' }}>{inv.title}</h3>
                  <span className="material-symbols-outlined" style={{ color: 'var(--color-secondary)', fontSize: 18 }}>more_horiz</span>
                </div>
                <p style={{ fontSize: 13, color: 'var(--color-secondary)', lineHeight: 1.5, marginBottom: 24 }}>
                  {inv.description}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: 16, borderTop: '1px solid var(--color-outline-variant)' }}>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center', color: 'var(--color-secondary)' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 14 }}>push_pin</span>
                    <span style={{ fontSize: 12 }}>{inv.findings} Findings</span>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--color-secondary)' }}>
                    {inv.updated_at}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
