'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { api } from '@/services/api-adapter';
import { HealthStatus } from '@/contracts/api-contracts';
import { Database, Menu } from 'lucide-react';

interface AppHeaderProps {
  onToggleMobileMenu?: () => void;
}

const titles: Record<string, { title: string; subtitle: string }> = {
  '/app': { title: 'Overview', subtitle: 'Security Posture Launchpad' },
  '/app/pipeline': { title: 'Safety Pipeline', subtitle: 'Closed-Loop Triad Console' },
  '/app/proxy': { title: 'Live Proxy Gateway', subtitle: 'Inline Runtime Testing' },
  '/app/ledger': { title: 'Audit Ledger', subtitle: 'Cryptographic Proof & Compliance' },
};

export default function AppHeader({ onToggleMobileMenu }: AppHeaderProps) {
  const pathname = usePathname();
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getHealth()
      .then((res) => {
        setHealth(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const currentView = titles[pathname] || { title: 'Security Console', subtitle: 'AEGISX Workspace' };

  return (
    <header className="h-16 px-4 sm:px-6 border-b border-outline bg-background/95 backdrop-blur flex items-center justify-between sticky top-0 z-30 select-none">
      {/* Left: Hamburger (mobile) + View Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileMenu}
          className="md:hidden p-1.5 -ml-1 text-on-variant hover:text-white rounded-lg hover:bg-surface-low"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5">
          <h1 className="text-sm font-semibold text-white tracking-wide">{currentView.title}</h1>
          <span className="text-outline text-xs hidden sm:inline">/</span>
          <span className="text-xs text-on-variant font-light hidden sm:inline">{currentView.subtitle}</span>
        </div>
      </div>

      {/* Right: Live Telemetry Badges */}
      <div className="flex items-center gap-2.5 font-mono text-[11px]">
        {/* Database Status from API */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded border border-outline bg-surface-low text-on-variant">
          <Database className="w-3 h-3 text-secondary" />
          <span>
            {loading ? 'DB: CHECKING...' : `DB: ${(health?.database || 'UNCONFIGURED').toUpperCase()}`}
          </span>
        </div>

        {/* Backend Heartbeat */}
        <div
          className={`flex items-center gap-2 px-2.5 py-1 rounded border ${
            health?.status === 'healthy'
              ? 'border-primary/40 bg-primary/10 text-primary-glow'
              : 'border-outline bg-surface-low text-on-variant'
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              health?.status === 'healthy' ? 'bg-primary animate-pulse' : 'bg-outline'
            }`}
          />
          <span>
            {loading ? 'CONNECTING...' : `API: ${(health?.status || 'OFFLINE').toUpperCase()}`}
          </span>
        </div>
      </div>
    </header>
  );
}
