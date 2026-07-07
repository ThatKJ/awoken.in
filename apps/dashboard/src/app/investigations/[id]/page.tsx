'use client';

import { useState } from 'react';
import Topbar from '@/components/Topbar';

export default function InvestigationWorkspace() {
  const [activeSidebarTab, setActiveSidebarTab] = useState<'findings' | 'memory' | 'timeline'>('findings');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <Topbar />
      
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Main Area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-background)', borderRight: '1px solid var(--color-outline-variant)' }}>
          {/* Header */}
          <div style={{ padding: '24px 32px', borderBottom: '1px solid var(--color-outline-variant)', backgroundColor: 'white' }}>
            <div className="page-eyebrow">Workspace</div>
            <h1 style={{ fontSize: 24, fontWeight: 700, margin: '4px 0 8px 0', color: 'var(--color-on-surface)' }}>CRM Pricing Frustrations</h1>
            <p style={{ fontSize: 14, color: 'var(--color-secondary)' }}>Investigating high churn in SMB CRMs due to complex pricing tiers.</p>
          </div>

          {/* Ask Awoken */}
          <div style={{ padding: '24px 32px', borderBottom: '1px solid var(--color-outline-variant)' }}>
            <div style={{ position: 'relative' }}>
              <span className="material-symbols-outlined" style={{ position: 'absolute', left: 16, top: 14, color: 'var(--color-secondary)' }}>search</span>
              <input 
                type="text" 
                placeholder="Ask Awoken (e.g. What are the specific complaints about Salesforce billing?)" 
                style={{ width: '100%', padding: '14px 16px 14px 48px', borderRadius: 12, border: '1px solid var(--color-outline)', fontSize: 15, outline: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="btn btn-primary" style={{ position: 'absolute', right: 8, top: 8, padding: '6px 12px', fontSize: 13 }}>Search</button>
            </div>
            
            <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-secondary)', display: 'flex', alignItems: 'center' }}>Filters:</span>
              <span className="data-tag">Source: GitHub, Reddit</span>
              <span className="data-tag">Pain: Pricing</span>
              <button style={{ background: 'none', border: '1px dashed var(--color-outline-variant)', borderRadius: 16, padding: '2px 8px', fontSize: 11, color: 'var(--color-secondary)', cursor: 'pointer' }}>+ Add Filter</button>
            </div>
          </div>

          {/* Results Area */}
          <div style={{ flex: 1, padding: '24px 32px', overflowY: 'auto' }}>
            <div style={{ display: 'flex', gap: 24, borderBottom: '1px solid var(--color-outline-variant)', marginBottom: 24 }}>
              <button style={{ paddingBottom: 12, borderBottom: '2px solid var(--color-primary)', background: 'none', fontWeight: 600, fontSize: 14, color: 'var(--color-primary)', cursor: 'pointer' }}>Evidence (142)</button>
              <button style={{ paddingBottom: 12, borderBottom: '2px solid transparent', background: 'none', fontWeight: 500, fontSize: 14, color: 'var(--color-secondary)', cursor: 'pointer' }}>Clusters (12)</button>
              <button style={{ paddingBottom: 12, borderBottom: '2px solid transparent', background: 'none', fontWeight: 500, fontSize: 14, color: 'var(--color-secondary)', cursor: 'pointer' }}>Opportunities (3)</button>
            </div>

            <div className="section-card" style={{ padding: 24, marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12 }}>
                  <span className="data-tag" style={{ backgroundColor: '#fee2e2', color: '#b91c1c' }}>High Confidence</span>
                  <span className="data-tag">Reddit</span>
                </div>
                <button className="btn" style={{ padding: '4px 8px', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}><span className="material-symbols-outlined" style={{ fontSize: 14 }}>push_pin</span> Pin</button>
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--color-on-surface)', fontStyle: 'italic', borderLeft: '3px solid var(--color-outline-variant)', paddingLeft: 16 }}>
                "We literally hired a full-time person just to reconcile the Salesforce CPQ invoices. The pricing logic is so opaque we lose money every month because reps quote incorrectly."
              </p>
            </div>
            
             <div className="section-card" style={{ padding: 24, marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12 }}>
                  <span className="data-tag">HackerNews</span>
                </div>
                <button className="btn" style={{ padding: '4px 8px', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}><span className="material-symbols-outlined" style={{ fontSize: 14 }}>push_pin</span> Pin</button>
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--color-on-surface)', fontStyle: 'italic', borderLeft: '3px solid var(--color-outline-variant)', paddingLeft: 16 }}>
                "HubSpot is great until you need custom objects. Then the price jumps from $800/mo to $3,200/mo overnight. It's a massive cliff."
              </p>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div style={{ width: 400, backgroundColor: 'white', display: 'flex', flexDirection: 'column' }}>
          {/* Tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid var(--color-outline-variant)' }}>
            <button 
              onClick={() => setActiveSidebarTab('findings')}
              style={{ flex: 1, padding: '16px 0', borderBottom: activeSidebarTab === 'findings' ? '2px solid var(--color-primary)' : '2px solid transparent', background: 'none', fontWeight: 600, fontSize: 13, color: activeSidebarTab === 'findings' ? 'var(--color-primary)' : 'var(--color-secondary)', cursor: 'pointer' }}>
              Findings
            </button>
            <button 
              onClick={() => setActiveSidebarTab('memory')}
              style={{ flex: 1, padding: '16px 0', borderBottom: activeSidebarTab === 'memory' ? '2px solid var(--color-primary)' : '2px solid transparent', background: 'none', fontWeight: 600, fontSize: 13, color: activeSidebarTab === 'memory' ? 'var(--color-primary)' : 'var(--color-secondary)', cursor: 'pointer' }}>
              Memory
            </button>
            <button 
              onClick={() => setActiveSidebarTab('timeline')}
              style={{ flex: 1, padding: '16px 0', borderBottom: activeSidebarTab === 'timeline' ? '2px solid var(--color-primary)' : '2px solid transparent', background: 'none', fontWeight: 600, fontSize: 13, color: activeSidebarTab === 'timeline' ? 'var(--color-primary)' : 'var(--color-secondary)', cursor: 'pointer' }}>
              Timeline
            </button>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: 24, backgroundColor: '#f9fafb' }}>
            
            {activeSidebarTab === 'findings' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Pinned Evidence (2)</div>
                
                <div style={{ backgroundColor: 'white', border: '1px solid var(--color-outline-variant)', padding: 12, borderRadius: 8, fontSize: 13, boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                  <div style={{ fontWeight: 600, marginBottom: 4 }}>Salesforce Invoice Complexity</div>
                  <div style={{ color: 'var(--color-secondary)', fontStyle: 'italic', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    "We literally hired a full-time person just to reconcile the Salesforce CPQ invoices..."
                  </div>
                </div>

                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: 16 }}>Pinned Opportunities (1)</div>
                
                <div style={{ backgroundColor: 'white', border: '1px solid var(--color-outline-variant)', padding: 12, borderRadius: 8, fontSize: 13, boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 4 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 14, color: '#f59e0b' }}>emoji_events</span>
                    <span style={{ fontWeight: 600 }}>CPQ Reconciler for SMBs</span>
                  </div>
                  <div style={{ color: 'var(--color-secondary)' }}>
                    High confidence opportunity based on 42 evidence signals indicating money lost.
                  </div>
                </div>
              </div>
            )}

            {activeSidebarTab === 'memory' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <button className="btn" style={{ width: '100%', padding: '8px', fontSize: 13, display: 'flex', justifyContent: 'center', gap: 6 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>add</span>
                  Record Observation
                </button>
                
                <div style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', padding: 16, borderRadius: 8 }}>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 8 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 14, color: '#2563eb' }}>visibility</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#1e3a8a', textTransform: 'uppercase' }}>Observation</span>
                  </div>
                  <div style={{ fontSize: 13, color: '#1e3a8a', lineHeight: 1.5 }}>
                    Users complain more about the unpredictability of usage-based pricing than the actual cost itself. They want predictable budgeting.
                  </div>
                </div>

                <div style={{ backgroundColor: '#fdf4ff', border: '1px solid #fbcfe8', padding: 16, borderRadius: 8 }}>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 8 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 14, color: '#c026d3' }}>lightbulb</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#86198f', textTransform: 'uppercase' }}>Hypothesis</span>
                  </div>
                  <div style={{ fontSize: 13, color: '#86198f', lineHeight: 1.5 }}>
                    A CRM that offers flat-rate pricing but caps features rather than seats would see high adoption among agencies.
                  </div>
                </div>
              </div>
            )}

            {activeSidebarTab === 'timeline' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24, paddingLeft: 8, borderLeft: '2px solid var(--color-outline-variant)', marginLeft: 8 }}>
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: -14, top: 2, width: 10, height: 10, borderRadius: '50%', backgroundColor: 'var(--color-primary)', border: '2px solid #f9fafb' }}></div>
                  <div style={{ fontSize: 12, color: 'var(--color-secondary)' }}>10 mins ago</div>
                  <div style={{ fontSize: 13, fontWeight: 500, marginTop: 2 }}>Recorded a new Hypothesis</div>
                </div>
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: -14, top: 2, width: 10, height: 10, borderRadius: '50%', backgroundColor: '#94a3b8', border: '2px solid #f9fafb' }}></div>
                  <div style={{ fontSize: 12, color: 'var(--color-secondary)' }}>1 hr ago</div>
                  <div style={{ fontSize: 13, fontWeight: 500, marginTop: 2 }}>Pinned Evidence from HackerNews</div>
                </div>
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: -14, top: 2, width: 10, height: 10, borderRadius: '50%', backgroundColor: '#94a3b8', border: '2px solid #f9fafb' }}></div>
                  <div style={{ fontSize: 12, color: 'var(--color-secondary)' }}>2 hrs ago</div>
                  <div style={{ fontSize: 13, fontWeight: 500, marginTop: 2 }}>Ran search query: "Salesforce CPQ complaints"</div>
                </div>
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: -14, top: 2, width: 10, height: 10, borderRadius: '50%', backgroundColor: '#94a3b8', border: '2px solid #f9fafb' }}></div>
                  <div style={{ fontSize: 12, color: 'var(--color-secondary)' }}>Yesterday</div>
                  <div style={{ fontSize: 13, fontWeight: 500, marginTop: 2 }}>Created Investigation</div>
                </div>
              </div>
            )}
          </div>

          <div style={{ padding: 16, borderTop: '1px solid var(--color-outline-variant)', backgroundColor: 'white' }}>
            <button className="btn btn-primary" style={{ width: '100%', padding: '10px', fontSize: 13, display: 'flex', justifyContent: 'center', gap: 6, backgroundColor: '#0f172a' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>description</span>
              Export Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
