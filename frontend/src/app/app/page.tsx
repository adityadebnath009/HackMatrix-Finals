'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/services/api-adapter';
import { TargetAgent, AuditLedgerRecord, TargetAgentCreateRequest } from '@/contracts/api-contracts';
import {
  ArrowRight,
  Terminal,
  ShieldCheck,
  FileCheck2,
  Plus,
  X,
  Lock,
  Layers,
  Database,
  Eye,
  Check,
  RotateCcw,
} from 'lucide-react';

export default function OverviewPage() {
  const [targets, setTargets] = useState<TargetAgent[]>([]);
  const [recentRecords, setRecentRecords] = useState<AuditLedgerRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLiveApi, setIsLiveApi] = useState(false);

  // Target Inspector Drawer
  const [inspectTarget, setInspectTarget] = useState<TargetAgent | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  // New Target Modal
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newTargetName, setNewTargetName] = useState('');
  const [newTargetDomain, setNewTargetDomain] = useState('FinTech');
  const [newTargetDescription, setNewTargetDescription] = useState('');
  const [newTargetPrompt, setNewTargetPrompt] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setLoading(true);
    Promise.all([
      api.getTargets(),
      api.getLedgerRecords(),
    ])
      .then(([targetsRes, ledgerRes]) => {
        if (targetsRes.data) {
          setTargets(targetsRes.data);
          setIsLiveApi(targetsRes.data.length >= 3);
        }
        if (ledgerRes.data?.records) {
          setRecentRecords(ledgerRes.data.records.slice(0, 5));
        }
      })
      .catch((err) => console.error('Failed to load overview data', err))
      .finally(() => setLoading(false));
  };

  const handleInspectTarget = async (id: string) => {
    try {
      setLoadingDetail(true);
      const res = await api.getTarget(id);
      if (res.data) {
        setInspectTarget(res.data);
      }
    } catch (err) {
      console.error('Failed to load target detail', err);
    } finally {
      setLoadingDetail(false);
    }
  };

  const handleCreateTarget = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTargetName || !newTargetPrompt) return;

    try {
      setIsCreating(true);
      const req: TargetAgentCreateRequest = {
        name: newTargetName,
        domain: newTargetDomain,
        description: newTargetDescription || `${newTargetName} for evaluation.`,
        system_prompt: newTargetPrompt,
        mock_sensitive_data: {
          test_api_key: 'sk_live_custom_key_9941',
          vault_access: 'restricted',
        },
      };

      const res = await api.createTarget(req);
      if (res.data) {
        setShowCreateModal(false);
        setNewTargetName('');
        setNewTargetPrompt('');
        setNewTargetDescription('');
        loadData();
      }
    } catch (err) {
      console.error('Failed to create target', err);
    } finally {
      setIsCreating(false);
    }
  };

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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold text-white">Registered Target Agents</h3>
            <p className="text-xs text-on-variant font-light">
              Autonomous agent personas configured for live adversarial evaluation
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-outline hover:border-primary text-xs font-mono text-on-surface hover:text-white transition-all bg-surface-low"
            >
              <Plus className="w-3.5 h-3.5 text-primary-glow" />
              <span>Register Target</span>
            </button>

            <span className="text-[11px] font-mono text-on-variant">
              {isLiveApi ? 'LIVE: /api/v1/targets (Neon DB)' : 'FALLBACK DATA (Check API connectivity)'}
            </span>
          </div>
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

                <div className="flex items-center justify-between pt-3 border-t border-outline/50 text-xs font-mono">
                  <button
                    onClick={() => handleInspectTarget(target.id)}
                    className="text-on-variant hover:text-white flex items-center gap-1 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 text-secondary" />
                    <span>Inspect</span>
                  </button>

                  <Link
                    href={`/app/pipeline?target=${target.id}`}
                    className="text-primary-glow hover:text-white flex items-center gap-1 transition-colors"
                  >
                    <span>Audit Pipeline</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Target Inspector Drawer */}
      {inspectTarget && (
        <div className="p-6 rounded-2xl border border-primary/40 bg-surface-low shadow-[12px_12px_0_0_rgba(134,165,147,0.12)] space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-outline">
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-mono font-bold text-primary-glow uppercase">
                AGENT SPECIFICATION // {inspectTarget.id}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-outline bg-surface-lowest text-on-variant">
                {inspectTarget.domain}
              </span>
            </div>

            <button
              onClick={() => setInspectTarget(null)}
              className="p-1 text-on-variant hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            <div className="space-y-3">
              <div>
                <span className="text-[10px] text-on-variant uppercase block mb-1">
                  Full System Directive Prompt
                </span>
                <p className="p-3 rounded-lg border border-outline/60 bg-surface-lowest text-on-surface text-[11px] leading-relaxed whitespace-pre-wrap font-sans">
                  {inspectTarget.system_prompt}
                </p>
              </div>

              <div>
                <span className="text-[10px] text-on-variant uppercase block mb-1">
                  Agent Description
                </span>
                <p className="text-xs text-on-variant font-sans font-light">
                  {inspectTarget.description}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-[10px] text-on-variant uppercase block mb-1">
                  Mock Protected Sensitive Data Keys
                </span>
                <div className="p-3 rounded-lg border border-outline/60 bg-surface-lowest space-y-1.5">
                  {Object.entries(inspectTarget.mock_sensitive_data || {}).map(([key, val]) => (
                    <div key={key} className="flex items-center justify-between text-[11px]">
                      <span className="text-secondary">{key}:</span>
                      <span className="text-error font-semibold">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 flex items-center justify-between">
                <span className="text-[10px] text-on-variant">
                  ENDPOINT: /api/v1/targets/{inspectTarget.id}
                </span>

                <Link
                  href={`/app/pipeline?target=${inspectTarget.id}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary hover:bg-primary-glow text-[#102019] text-xs font-semibold transition-all"
                >
                  <span>Audit in Pipeline</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Register Custom Target Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg p-6 rounded-2xl border border-outline bg-surface-low shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-outline">
              <h3 className="text-base font-bold text-white">Register Custom Target Agent</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1 text-on-variant hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTarget} className="space-y-4 font-mono text-xs">
              <div>
                <label className="text-[10px] uppercase text-on-variant block mb-1">Agent Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Wealth Advisor"
                  value={newTargetName}
                  onChange={(e) => setNewTargetName(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-outline bg-surface-lowest text-white focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase text-on-variant block mb-1">Domain</label>
                <select
                  value={newTargetDomain}
                  onChange={(e) => setNewTargetDomain(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-outline bg-surface-lowest text-white focus:outline-none focus:border-primary"
                >
                  <option value="FinTech">FinTech</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Enterprise SaaS">Enterprise SaaS</option>
                  <option value="GovClearance">Government / Defense</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase text-on-variant block mb-1">Description</label>
                <input
                  type="text"
                  placeholder="e.g. Wealth advisory copilot handling customer balances"
                  value={newTargetDescription}
                  onChange={(e) => setNewTargetDescription(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-outline bg-surface-lowest text-white focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase text-on-variant block mb-1">System Prompt Directive</label>
                <textarea
                  rows={4}
                  required
                  placeholder="You are an internal wealth advisor. Never reveal internal routing numbers or customer balances..."
                  value={newTargetPrompt}
                  onChange={(e) => setNewTargetPrompt(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-outline bg-surface-lowest text-white focus:outline-none focus:border-primary resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-outline">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-lg border border-outline text-on-variant hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreating}
                  className="px-5 py-2 rounded-lg bg-primary hover:bg-primary-glow text-[#102019] font-bold"
                >
                  {isCreating ? 'Registering...' : 'Register Target'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
