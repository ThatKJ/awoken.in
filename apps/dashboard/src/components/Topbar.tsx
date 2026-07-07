'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export default function Topbar({ title, subtitle }: { title?: string; subtitle?: string }) {
  const [search, setSearch] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="topbar">
      <div className="topbar-search-wrap">
        <span className="material-symbols-outlined topbar-search-icon">search</span>
        <input
          className="topbar-search"
          type="text"
          placeholder="Search signals, problems, or companies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="topbar-actions">
        <div style={{ position: 'relative' }} ref={notifRef}>
          <button 
            className="topbar-icon-btn" 
            title="Notifications"
            onClick={() => setShowNotifications(!showNotifications)}
            style={{ position: 'relative' }}
          >
            <span className="material-symbols-outlined">notifications</span>
            <span style={{ position: 'absolute', top: 6, right: 6, width: 8, height: 8, backgroundColor: 'var(--color-error)', borderRadius: '50%', border: '2px solid white' }}></span>
          </button>
          
          {showNotifications && (
            <div style={{ 
              position: 'absolute', 
              top: '100%', 
              right: 0, 
              marginTop: 8, 
              width: 320, 
              backgroundColor: 'white', 
              border: '1px solid var(--color-outline-variant)', 
              borderRadius: 12, 
              boxShadow: '0 12px 32px rgba(0,0,0,0.1)', 
              zIndex: 100 
            }}>
              <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--color-outline-variant)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: 14, fontWeight: 600 }}>Notifications</h3>
                <button style={{ fontSize: 11, color: 'var(--color-primary)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Mark all read</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--color-outline-variant)', display: 'flex', gap: 12, backgroundColor: '#f0fdf4' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#16a34a', marginTop: 6, flexShrink: 0 }}></div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-on-surface)' }}>Pipeline Finished</div>
                    <div style={{ fontSize: 12, color: 'var(--color-secondary)', marginTop: 2 }}>Extracted 32 new Opportunity Candidates from HackerNews and GitHub.</div>
                    <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 4 }}>10 minutes ago</div>
                  </div>
                </div>
                <div style={{ padding: '12px 16px', display: 'flex', gap: 12 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#d1d5db', marginTop: 6, flexShrink: 0 }}></div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-on-surface)' }}>High Confidence Signal</div>
                    <div style={{ fontSize: 12, color: 'var(--color-secondary)', marginTop: 2 }}>Found strong evidence of switching intent for "Manual PDF parsing".</div>
                    <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 4 }}>2 hours ago</div>
                  </div>
                </div>
              </div>
              <div style={{ padding: '12px', borderTop: '1px solid var(--color-outline-variant)', textAlign: 'center' }}>
                <Link href="/signals" style={{ fontSize: 12, color: 'var(--color-secondary)', textDecoration: 'none', fontWeight: 500 }}>View all activity</Link>
              </div>
            </div>
          )}
        </div>
        
        <Link href="/help" className="topbar-icon-btn" title="Help" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span className="material-symbols-outlined">help_outline</span>
        </Link>
        <div className="topbar-divider" />
        <div className="topbar-user">
          <div style={{ textAlign: 'right' }}>
            <div className="topbar-user-name">Kirtan</div>
            <div className="topbar-user-role">PRO FOUNDER</div>
          </div>
          <div className="topbar-avatar">K</div>
        </div>
      </div>
    </header>
  );
}
