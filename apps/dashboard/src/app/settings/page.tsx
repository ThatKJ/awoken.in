import Topbar from '@/components/Topbar';

export default function SettingsPage() {
  return (
    <>
      <Topbar />
      <div className="content">
        <div className="page-eyebrow">
          <span className="material-symbols-outlined" style={{ fontSize: 14 }}>settings</span>
          Configuration
        </div>
        <h1 className="page-title">Settings</h1>
        <p className="page-subtitle">Configure your Awoken intelligence system — pipeline sources, scraping schedules, and LLM providers.</p>

        <div style={{ display: 'grid', gap: 24, marginTop: 40, maxWidth: 800 }}>
          
          {/* Data Sources */}
          <div className="section-card" style={{ padding: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)' }}>database</span>
              Data Sources
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 16, borderBottom: '1px solid var(--color-outline-variant)' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>Hacker News</div>
                  <div style={{ fontSize: 12, color: 'var(--color-secondary)' }}>Scrape Ask HN, Top Stories, and Comments</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 11, color: '#059669', fontWeight: 600, backgroundColor: '#d1fae5', padding: '2px 8px', borderRadius: 12 }}>ACTIVE</span>
                  <div style={{ width: 40, height: 20, backgroundColor: 'var(--color-primary)', borderRadius: 10, position: 'relative' }}>
                    <div style={{ position: 'absolute', right: 2, top: 2, width: 16, height: 16, backgroundColor: 'white', borderRadius: '50%' }}></div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 16, borderBottom: '1px solid var(--color-outline-variant)' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>GitHub Issues</div>
                  <div style={{ fontSize: 12, color: 'var(--color-secondary)' }}>Scrape public repositories for feature requests and bugs</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 11, color: '#059669', fontWeight: 600, backgroundColor: '#d1fae5', padding: '2px 8px', borderRadius: 12 }}>ACTIVE</span>
                  <div style={{ width: 40, height: 20, backgroundColor: 'var(--color-primary)', borderRadius: 10, position: 'relative' }}>
                    <div style={{ position: 'absolute', right: 2, top: 2, width: 16, height: 16, backgroundColor: 'white', borderRadius: '50%' }}></div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>Twitter / X</div>
                  <div style={{ fontSize: 12, color: 'var(--color-secondary)' }}>Monitor founder complaints and product mentions</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 11, color: '#6b7280', fontWeight: 600, backgroundColor: '#f3f4f6', padding: '2px 8px', borderRadius: 12 }}>INACTIVE</span>
                  <div style={{ width: 40, height: 20, backgroundColor: '#e5e7eb', borderRadius: 10, position: 'relative' }}>
                    <div style={{ position: 'absolute', left: 2, top: 2, width: 16, height: 16, backgroundColor: 'white', borderRadius: '50%', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Providers */}
          <div className="section-card" style={{ padding: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="material-symbols-outlined" style={{ color: 'var(--color-tertiary)' }}>smart_toy</span>
              AI Configuration
            </h3>
            
            <div style={{ display: 'grid', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--color-secondary)', marginBottom: 6 }}>Provider</label>
                <select style={{ width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid var(--color-outline-variant)', fontSize: 14, outline: 'none' }}>
                  <option>OpenRouter</option>
                  <option>OpenAI</option>
                  <option>Anthropic</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--color-secondary)', marginBottom: 6 }}>Extraction Model</label>
                <select style={{ width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid var(--color-outline-variant)', fontSize: 14, outline: 'none' }}>
                  <option>meta-llama/llama-4-scout-17b-16e-instruct</option>
                  <option>anthropic/claude-3.5-sonnet</option>
                  <option>openai/gpt-4o-mini</option>
                </select>
                <p style={{ fontSize: 11, color: 'var(--color-secondary)', marginTop: 4 }}>Used for atomic evidence extraction and JSON generation.</p>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--color-secondary)', marginBottom: 6 }}>Embedding Model</label>
                <select style={{ width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid var(--color-outline-variant)', fontSize: 14, outline: 'none' }}>
                  <option>text-embedding-3-small</option>
                  <option>nomic-embed-text</option>
                </select>
                <p style={{ fontSize: 11, color: 'var(--color-secondary)', marginTop: 4 }}>Used for semantic clustering and similarity matching.</p>
              </div>
            </div>
            
            <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" style={{ padding: '8px 16px', fontSize: 13 }}>Save Settings</button>
            </div>
          </div>

          {/* Pipeline Automation */}
          <div className="section-card" style={{ padding: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="material-symbols-outlined" style={{ color: 'var(--color-error)' }}>cycle</span>
              Pipeline Automation
            </h3>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>Scheduled Ingestion</div>
                <div style={{ fontSize: 12, color: 'var(--color-secondary)', maxWidth: 400 }}>Automatically run the scraping and intelligence pipeline at set intervals. Requires a background worker.</div>
              </div>
              <select style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid var(--color-outline-variant)', fontSize: 13, outline: 'none' }}>
                <option>Off (Manual Only)</option>
                <option>Every 6 Hours</option>
                <option>Every 12 Hours</option>
                <option>Daily</option>
              </select>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
