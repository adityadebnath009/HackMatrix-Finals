'use client';

import Link from 'next/link';
import { Shield, Activity, ArrowRight, Lock } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-7xl rounded-xl bg-surface-low/85 backdrop-blur-md border border-surface-highest/60 shadow-[0px_12px_32px_-4px_rgba(0,0,0,0.7)] z-50 transition-all duration-200">
      <div className="flex justify-between items-center px-6 py-3.5 w-full">
        {/* Left: Brand & Telemetry */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:border-emerald-400 group-hover:shadow-[0_0_12px_rgba(16,185,129,0.3)] transition-all duration-200">
            <Shield className="w-4 h-4 fill-emerald-500/20" />
          </div>
          <span className="font-bold tracking-wider text-white text-lg">AEGISX</span>
          <div className="hidden sm:flex items-center gap-1.5 ml-2 px-2.5 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/10">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[10px] font-semibold text-emerald-400 uppercase tracking-widest">
              SYS_ONLINE: 99.999%
            </span>
          </div>
        </Link>

        {/* Center: Anchor Links */}
        <div className="hidden md:flex items-center space-x-7 text-xs font-mono tracking-wider">
          <a
            href="#problems"
            className="text-slate-400 hover:text-white transition-colors"
          >
            Problems
          </a>
          <a
            href="#safety-triad"
            className="text-emerald-400 hover:text-emerald-300 transition-colors border-b border-emerald-400/50 pb-0.5"
          >
            Safety Triad
          </a>
          <a
            href="#regulatory-compliance"
            className="text-slate-400 hover:text-white transition-colors"
          >
            Regulatory Compliance
          </a>
          <a
            href="#faq"
            className="text-slate-400 hover:text-white transition-colors"
          >
            FAQ
          </a>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <a
            href="#regulatory-compliance"
            className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-slate-300 hover:text-white px-3 py-1.5 rounded-lg border border-surface-highest hover:bg-surface-high/50 transition-all"
          >
            <Lock className="w-3.5 h-3.5 text-secondary" />
            <span>Audit Ledger</span>
          </a>

          <Link
            href="/app"
            className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-[0_0_16px_rgba(16,185,129,0.35)] hover:shadow-[0_0_24px_rgba(16,185,129,0.55)] transition-all duration-200"
          >
            <span>Deploy Shield</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
