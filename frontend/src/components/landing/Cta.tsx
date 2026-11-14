'use client';

import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';

export default function Cta() {
  return (
    <section className="py-20 px-4 sm:px-6 max-w-5xl mx-auto">
      <div className="p-8 sm:p-14 rounded-3xl border border-surface-highest/80 bg-gradient-to-b from-surface-low to-surface-lowest shadow-2xl backdrop-blur-xl text-center relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-emerald-500/10 blur-[90px] -z-10 rounded-full pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-surface-highest bg-surface-low/80 backdrop-blur text-xs font-mono text-emerald-400 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>ENTERPRISE SEC-OPS READINESS</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
          Shield Your Production AI Today
        </h2>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-light mb-10 leading-relaxed">
          Connect your agent endpoints, launch autonomous red-team validation, and compile deterministic guardrails in under 5 minutes.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/app"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold shadow-[0_0_24px_rgba(16,185,129,0.4)] hover:shadow-[0_0_36px_rgba(16,185,129,0.6)] transition-all duration-200"
          >
            <span>Enter Security Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <a
            href="mailto:security@aegisx.defense"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-surface-highest hover:bg-surface-high/60 text-slate-300 hover:text-white font-medium transition-all"
          >
            <Calendar className="w-4 h-4 text-slate-400" />
            <span>Schedule Private SecOps Briefing</span>
          </a>
        </div>
      </div>
    </section>
  );
}
