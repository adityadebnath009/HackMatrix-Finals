'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Shield,
  LayoutDashboard,
  GitFork,
  Terminal,
  FileCheck2,
  ExternalLink,
  ArrowLeft,
  X,
} from 'lucide-react';

const navItems = [
  {
    name: 'Overview',
    href: '/app',
    icon: LayoutDashboard,
    exact: true,
  },
  {
    name: 'Safety Pipeline',
    href: '/app/pipeline',
    icon: GitFork,
    badge: 'CORE TRIAD',
  },
  {
    name: 'Live Proxy Gateway',
    href: '/app/proxy',
    icon: Terminal,
    badge: '<0.05ms',
  },
  {
    name: 'Audit Ledger',
    href: '/app/ledger',
    icon: FileCheck2,
  },
];

interface AppSidebarProps {
  mobileOpen?: boolean;
  onClose?: () => void;
}

export default function AppSidebar({ mobileOpen = false, onClose }: AppSidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed md:sticky top-0 z-50 md:z-auto h-screen w-64 border-r border-outline bg-surface-lowest flex flex-col justify-between flex-shrink-0 select-none transition-transform duration-200 ease-in-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Top: Brand Header */}
        <div>
          <div className="h-16 px-5 border-b border-outline flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 group">
              <span className="flex h-7 w-7 items-center justify-center border border-primary/60 text-primary-glow group-hover:bg-primary/10 transition-colors">
                <Shield className="h-4 w-4" />
              </span>
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-[0.14em] text-white">AEGISX</span>
                <span className="text-[9px] font-mono uppercase tracking-widest text-on-variant">
                  CONSOLE // V2.4
                </span>
              </div>
            </Link>

            {/* Mobile Close Button */}
            <button
              onClick={onClose}
              className="md:hidden p-1 text-on-variant hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="p-3 space-y-1">
            <p className="px-3 pt-3 pb-2 text-[10px] font-mono uppercase tracking-[0.18em] text-on-variant">
              Security Operations
            </p>
            {navItems.map((item) => {
              const active = isActive(item.href, item.exact);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    active
                      ? 'bg-surface-low text-white border border-outline'
                      : 'text-on-variant hover:text-white hover:bg-surface-low/60 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <item.icon
                      className={`w-4 h-4 ${active ? 'text-primary-glow' : 'text-on-variant'}`}
                    />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${
                        active
                          ? 'border-primary/40 bg-primary/10 text-primary-glow'
                          : 'border-outline/50 bg-surface-lowest text-on-variant'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Bottom: Environment & Meta */}
        <div className="p-3 border-t border-outline space-y-1">
          <a
            href="http://localhost:8000/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3 py-2 text-xs text-on-variant hover:text-white transition-colors rounded-lg hover:bg-surface-low"
          >
            <span className="font-mono text-[11px]">API Schema (/docs)</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 text-xs text-on-variant hover:text-white transition-colors rounded-lg hover:bg-surface-low"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Exit to Landing Page</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
