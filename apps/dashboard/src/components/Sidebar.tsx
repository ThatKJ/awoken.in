'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const workspaceItems = [
  { href: '/investigations', label: 'Investigations', icon: 'folder_open' },
];

const intelligenceItems = [
  { href: '/opportunities', label: 'Opportunities', icon: 'lightbulb' },
  { href: '/problems', label: 'Problems', icon: 'report_problem' },
  { href: '/evidence', label: 'Evidence', icon: 'verified' },
  { href: '/sources', label: 'Sources', icon: 'database' },
];

const systemItems = [
  { href: '/settings', label: 'Settings', icon: 'settings' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      {/* Brand */}
      <div className="sidebar-brand">
        <Image
          src="/logo-app-light.svg"
          alt="Awoken"
          width={32}
          height={32}
          className="rounded-lg flex-shrink-0"
          style={{ borderRadius: '6px' }}
        />
        <div>
          <div className="sidebar-title">Awoken</div>
          <div className="sidebar-sub">Founder Intelligence</div>
        </div>
      </div>

      {/* Workspace */}
      <nav className="sidebar-nav">
        {workspaceItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link${isActive ? ' active' : ''}`}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}

        <div className="sidebar-section">Global Intelligence</div>
        {intelligenceItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`nav-link${pathname.startsWith(item.href) ? ' active' : ''}`}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
              {item.icon}
            </span>
            {item.label}
          </Link>
        ))}

        <div className="sidebar-section">System</div>
        {systemItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`nav-link${pathname === item.href ? ' active' : ''}`}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
              {item.icon}
            </span>
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <button className="btn-new-brief">
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>add</span>
          New Investigation
        </button>
      </div>
    </aside>
  );
}
