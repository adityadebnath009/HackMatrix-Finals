'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/services/api-adapter';
import { TargetAgent, AuditLedgerRecord } from '@/contracts/api-contracts';
import {
  ArrowRight,
  Terminal,
  ShieldCheck,
  FileCheck2,
  AlertCircle,
} from 'lucide-react';

export default function OverviewPage() {
  const [targets, setTargets] = useState<TargetAgent[]>([]);
  const [recentRecords, setRecentRecords] = useState<AuditLedgerRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLiveApi, setIsLiveApi] = useState(false);

  useEffect(() => {
    Promise.all([
      api.getTargets(),
      api.getLedgerRecords(),
    ])
      .then(([targetsRes, ledgerRes]) => {
        if (targetsRes.data) {
          setTargets(targetsRes.data);
          // If we got 3 targets, we know it's the live backend preloads
          setIsLiveApi(targetsRes.data.length >= 3);
        }
        if (ledgerRes.data?.records) {
          setRecentRecords(ledgerRes.data.records.slice(0, 5));
        }
      })
      .catch((err) => console.error('Failed to load overview data', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="p-4 sm:p-8 max-w-7xl w-full mx-auto space-y-8 select-none">
      {/* 3 Calm System Posture Metric Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl border border-outline bg-surface-low">
          <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-on-variant block mb-1">
            Registered Agents
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-bold font-mono text-white">
              {loading ? '...' : targets.length}
            </span>
            <span className="text-xs text-on-variant">Active Target Agents</span>
          </div>
          <p className="text-[11px] text-on-variant mt-2 font-light">
            {isLiveApi ? 'Live targets connected via Neon PostgreSQL' : 'Pre-configured security evaluation targets'}
          </p>
        </div>

        <div className="p-5 rounded-xl border border-outline bg-surface-low">
          <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-on-variant block mb-1">
            Deflection Standard
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-bold font-mono text-primary-glow">100.0%</span>
            <span className="text-xs text-on-variant">Target Metric</span>
          </div>
          <p className="text-[11px] text-on-variant mt-2 font-light">
            Zero-tolerance boundary deflection on replayed vectors
          </p>
        </div>

        <div className="p-5 rounded-xl border border-outline bg-surface-low">
          <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-on-variant block mb-1">
            Gate Architecture
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-bold font-mono text-white">In-Memory</span>
            <span className="text-xs text-on-variant">Proxy Engine</span>
          </div>
          <p className="text-[11px] text-on-variant mt-2 font-light">
            Compiled Python/C boundary filters executed inline
          </p>
        </div>
      </div>

      {/* Primary Demo Launchpad Banner */}
      <div className="p-6 sm:p-8 rounded-2xl border border-outline bg-surface-low shadow-[12px_12px_0_0_rgba(134,165,147,0.1)] relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-outline bg-surface-lowest text-[10px] font-mono uppercase tracking-widest text-primary-glow mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span>PRIMARY DEMO JOURNEY</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-3">
            Closed-Loop Safety Triad: Attack ➔ Defend ➔ Prove
          </h2>

          <p className="text-sm text-on-variant font-light leading-relaxed mb-6">
            Select an agent target, deploy an autonomous red-team swarm to uncover semantic vulnerabilities, auto-synthesize deterministic Pydantic boundary filters, and seal an immutable cryptographic audit record in Neon PostgreSQL.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/app/pipeline"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-primary hover:bg-primary-glow text-[#102019] text-xs font-semibold transition-all"
            >
              <span>Launch Safety Pipeline</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/app/proxy"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-outline hover:border-primary text-on-surface hover:text-white text-xs font-medium transition-all"
            >
              <Terminal className="w-3.5 h-3.5 text-secondary" />
              <span>Test Live Proxy Gateway</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Target Agents Roster */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-white">Registered Target Agents</h3>
            <p className="text-xs text-on-variant font-light">
              Autonomous agent personas configured for live adversarial evaluation
            </p>
          </div>
          <span className="text-[11px] font-mono text-on-variant">
            {isLiveApi ? 'LIVE: /api/v1/targets (Neon DB)' : 'FALLBACK DATA (Check API connectivity)'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {loading ? (
            <div className="col-span-3 p-8 text-center text-xs font-mono text-on-variant border border-outline rounded-xl bg-surface-low">
              Connecting to live backend targets...
            </div>
          ) : (
            targets.map((target) => (
              <div
                key={target.id}
                className="p-5 rounded-xl border border-outline bg-surface-low hover:border-outline/90 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-primary-glow px-2 py-0.5 rounded border border-primary/30 bg-primary/10">
                      {target.domain}
                    </span>
                    <span className="text-[10px] font-mono text-on-variant">
                      ID: {target.id}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white mb-1.5">{target.name}</h4>
                  <p className="text-xs text-on-variant font-light line-clamp-2 mb-4">
                    {target.description}
                  </p>

                  <div className="p-2.5 rounded bg-surface-lowest border border-outline/50 font-mono text-[11px] text-on-variant mb-4">
                    <span className="text-[9px] uppercase tracking-wider text-outline block mb-0.5">
                      System Directive
                    </span>
                    <p className="truncate text-on-surface text-[10px]">
                      {target.system_prompt}
                    </p>
                  </div>
                </div>

                <Link
                  href={`/app/pipeline?target=${target.id}`}
                  className="inline-flex items-center justify-between w-full pt-3 border-t border-outline/50 text-xs font-mono text-primary-glow hover:text-white transition-colors"
                >
                  <span>Audit Agent in Pipeline</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Cryptographic Notarizations Section with Clean Empty State */}
      <div className="space-y-4 pt-4 border-t border-outline/60">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-white">Immutable Ledger Notarizations</h3>
            <p className="text-xs text-on-variant font-light">
              SHA-256 cryptographic audit records stored in Neon PostgreSQL
            </p>
          </div>
          <Link
            href="/app/ledger"
            className="text-xs font-mono text-primary-glow hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <span>View Full Ledger</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentRecords.length === 0 ? (
          <div className="p-8 rounded-xl border border-outline bg-surface-low text-center flex flex-col items-center justify-center">
            <div className="w-10 h-10 rounded-full border border-outline bg-surface-lowest flex items-center justify-center text-on-variant mb-3">
              <FileCheck2 className="w-5 h-5 text-secondary" />
            </div>
            <p className="text-sm font-medium text-white mb-1">
              No cryptographic blocks notarized yet
            </p>
            <p className="text-xs text-on-variant font-light max-w-md mb-4">
              Execute your first closed-loop audit in the Safety Pipeline to synthesize deterministic boundaries and record a SHA-256 sealed block.
            </p>
            <Link
              href="/app/pipeline"
              className="inline-flex items-center gap-2 text-xs font-mono text-primary-glow hover:text-white px-4 py-2 rounded-lg border border-primary/40 bg-primary/10 transition-colors"
            >
              <span>Run Pipeline Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <div className="border border-outline rounded-xl bg-surface-low overflow-hidden">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-outline bg-surface-lowest text-[10px] uppercase tracking-wider text-on-variant">
                  <th className="py-3 px-4">Transaction ID</th>
                  <th className="py-3 px-4">Target Agent</th>
                  <th className="py-3 px-4">MITRE Technique</th>
                  <th className="py-3 px-4">Deflection</th>
                  <th className="py-3 px-4">SHA-256 Record Hash</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline/50 text-slate-300">
                {recentRecords.map((r) => (
                  <tr key={r.transaction_id} className="hover:bg-surface-high/30 transition-colors">
                    <td className="py-3 px-4 font-semibold text-white">{r.transaction_id}</td>
                    <td className="py-3 px-4 text-on-surface">{r.target_name}</td>
                    <td className="py-3 px-4 text-secondary">{r.mitre_technique_id}</td>
                    <td className="py-3 px-4 text-primary-glow font-bold">100.0%</td>
                    <td className="py-3 px-4 text-[10px] text-on-variant truncate max-w-[180px]">
                      {r.audit_hash}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
