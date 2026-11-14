'use client';

import { useEffect, useState } from 'react';
import { api } from '@/services/api-adapter';
import { HealthStatus } from '@/contracts/api-contracts';
import { Activity, Database, Shield } from 'lucide-react';

interface AppHeaderProps {
  title: string;
  subtitle?: string;
}

export default function AppHeader({ title, subtitle }: AppHeaderProps) {
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

  return (
    <header className="h-16 px-6 border-b border-outline bg-background/90 backdrop-blur flex items-center justify-between sticky top-0 z-40 select-none">
      {/* Left: View Title & Subtitle */}
      <div className="flex items-center gap-3">
        <h1 className="text-sm font-semibold text-white tracking-wide">{title}</h1>
        {subtitle && (
          <>
            <span className="text-outline text-xs">/</span>
            <span className="text-xs text-on-variant font-light">{subtitle}</span>
          </>
        )}
      </div>

      {/* Right: Live Telemetry Badges */}
      <div className="flex items-center gap-3 font-mono text-[11px]">
        {/* Database Status */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded border border-outline bg-surface-low text-on-variant">
          <Database className="w-3 h-3 text-secondary" />
          <span>NEON POSTGRES: SINGAPORE</span>
        </div>

        {/* Backend Heartbeat */}
        <div className="flex items-center gap-2 px-2.5 py-1 rounded border border-primary/40 bg-primary/10 text-primary-glow">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span>
            {loading ? 'CONNECTING...' : `SYS_ONLINE: ${health?.status?.toUpperCase() || 'ONLINE'}`}
          </span>
        </div>
      </div>
    </header>
  );
}
