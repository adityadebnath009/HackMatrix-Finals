'use client';

import { Shield } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-surface-highest/60 bg-surface-lowest/80 py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono text-slate-400">
        {/* Left: Brand & Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Shield className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-white tracking-wider">AEGISX</span>
          </div>
          <span className="text-[11px] text-slate-400">
            &copy; {new Date().getFullYear()} AEGISX DEFENSE SYSTEMS INC. CRYPTOGRAPHIC ZERO-TRUST SECURE FACILITY. ALL RIGHTS RESERVED.
          </span>
        </div>

        {/* Right: Security & Compliance links */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] text-slate-400">
          <a href="#safety-triad" className="hover:text-white transition-colors">
            Security Architecture
          </a>
          <span className="text-surface-highest">•</span>
          <a href="#regulatory-compliance" className="hover:text-white transition-colors">
            SOC2 Type II
          </a>
          <span className="text-surface-highest">•</span>
          <a href="#problems" className="hover:text-white transition-colors">
            Bug Bounty
          </a>
          <span className="text-surface-highest">•</span>
          <Link href="/app" className="hover:text-white transition-colors">
            Audit Logs
          </Link>
          <span className="text-surface-highest">•</span>
          <span className="text-emerald-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
            Telemetry: 100% Operational
          </span>
        </div>
      </div>
    </footer>
  );
}
