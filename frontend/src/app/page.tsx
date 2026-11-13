'use client';

import { useEffect, useState } from 'react';
import { api } from '@/services/api-adapter';
import { HealthStatus } from '@/contracts/api-contracts';
import { Sparkles, Terminal, Activity, ArrowRight } from 'lucide-react';

export default function Home() {
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getHealth().then((res) => {
      setHealth(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <main className="min-h-screen flex flex-col justify-between p-8 md:p-16 max-w-6xl mx-auto">
      {/* Top Header / Metadata Tag */}
      <header className="flex justify-between items-center border-b border-zinc-800 pb-6">
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
            [HACKMATRIX-V2]
          </span>
        </div>
        <div className="flex items-center gap-3 font-mono text-xs text-zinc-500">
          <span>RUN: NEXT.JS 15</span>
          <span>•</span>
          <span>FASTAPI CSR</span>
        </div>
      </header>

      {/* Hero Section: Editorial Anti-Slop (One Section Per Viewport) */}
      <section className="my-auto py-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 text-xs font-mono text-zinc-400 mb-8">
          <Sparkles className="w-3.5 h-3.5 text-zinc-200" />
          <span>EDITORIAL HIGH-TASTE STANDARD</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white max-w-3xl leading-[1.08] mb-6">
          The AI Is A Witness. <br />
          <span className="text-zinc-500">Not The Judge.</span>
        </h1>

        <p className="text-lg md:text-xl text-zinc-400 max-w-xl font-light mb-10 leading-relaxed">
          Clean, contract-first architecture. Sub-second inference. Built with zero slop for the HackMatrix Finals.
        </p>

        {/* Live System Status Pill */}
        <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/40 max-w-md backdrop-blur">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
            <span className="flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              BACKEND STATUS
            </span>
            <span>{loading ? 'CONNECTING...' : health?.status?.toUpperCase()}</span>
          </div>

          <div className="font-mono text-xs text-zinc-500 space-y-1">
            <p>App: <span className="text-zinc-300">{health?.app || 'FastAPI'}</span></p>
            <p>Database: <span className="text-zinc-300">{health?.database || 'Neon Postgres'}</span></p>
            <p>Environment: <span className="text-zinc-300">{health?.environment || 'development'}</span></p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 pt-6 flex justify-between items-center text-xs font-mono text-zinc-500">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5" />
          <span>READY FOR ROUND 2</span>
        </div>
        <span>TOP 30 TEAMS</span>
      </footer>
    </main>
  );
}
