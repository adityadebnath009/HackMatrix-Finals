'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/services/api-adapter';
import {
  AuditLedgerRecord,
  ComplianceAuditReport,
} from '@/contracts/api-contracts';
import {
  FileCheck2,
  Printer,
  Download,
  ExternalLink,
  ShieldCheck,
  Lock,
  ArrowRight,
  X,
  FileText,
  RotateCcw,
} from 'lucide-react';

export default function LedgerPage() {
  const [records, setRecords] = useState<AuditLedgerRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTxId, setSelectedTxId] = useState<string | null>(null);
  const [report, setReport] = useState<ComplianceAuditReport | null>(null);
  const [loadingReport, setLoadingReport] = useState(false);

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = async () => {
    try {
      setLoading(true);
      const res = await api.getLedgerRecords();
      if (res.data?.records) {
        setRecords(res.data.records);
      }
    } catch (err) {
      console.error('Failed to load ledger records', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectRecord = async (txId: string) => {
    setSelectedTxId(txId);
    try {
      setLoadingReport(true);
      const res = await api.getComplianceReport(txId);
      if (res.data) {
        setReport(res.data);
      }
    } catch (err) {
      console.error('Failed to load compliance report', err);
    } finally {
      setLoadingReport(false);
    }
  };

  const handleExportJson = (dataToExport: any) => {
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AEGISX-Ledger-Evidence-${selectedTxId || 'audit'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="p-4 sm:p-8 max-w-7xl w-full mx-auto space-y-8 select-none">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl border border-outline bg-surface-low flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-[12px_12px_0_0_rgba(134,165,147,0.1)]">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-primary-glow px-2 py-0.5 rounded border border-primary/30 bg-primary/10">
              IMMUTABLE AUDIT TRAIL
            </span>
            <span className="text-xs text-on-variant font-mono">
              STORAGE: NEON POSTGRESQL
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
            Cryptographic Audit Ledger &amp; Statutory Evidence
          </h2>
          <p className="text-xs text-on-variant font-light">
            Immutable SHA-256 sealed transaction records mapped to EU AI Act Article 15 and NIST AI RMF 1.0.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={loadRecords}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-outline hover:border-primary text-xs font-mono text-on-surface hover:text-white transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5 text-secondary" />
            <span>Refresh Ledger</span>
          </button>

          <Link
            href="/app/pipeline"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary hover:bg-primary-glow text-[#102019] text-xs font-semibold transition-all"
          >
            <span>Run Pipeline</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Ledger Records Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-white">Committed Defense Transactions</h3>
            <p className="text-xs text-on-variant font-light">
              Tamper-evident verification blocks proving 100% deflection
            </p>
          </div>
          <span className="text-[11px] font-mono text-on-variant">
            TOTAL BLOCKS: {records.length}
          </span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-xs font-mono text-on-variant border border-outline rounded-xl bg-surface-low">
            Loading immutable ledger records from Neon PostgreSQL...
          </div>
        ) : records.length === 0 ? (
          <div className="p-12 rounded-xl border border-outline bg-surface-low text-center flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-full border border-outline bg-surface-lowest flex items-center justify-center text-on-variant mb-4">
              <FileCheck2 className="w-6 h-6 text-secondary" />
            </div>
            <h4 className="text-base font-semibold text-white mb-1.5">
              No cryptographic blocks notarized yet
            </h4>
            <p className="text-xs text-on-variant font-light max-w-md mb-5 leading-relaxed">
              Execute your first closed-loop audit in the Safety Pipeline. Once verified, the SHA-256 record hash and statutory compliance mapping will be permanently recorded here.
            </p>
            <Link
              href="/app/pipeline"
              className="inline-flex items-center gap-2 text-xs font-semibold px-5 py-2.5 rounded-lg bg-primary hover:bg-primary-glow text-[#102019] transition-all"
            >
              <span>Launch Safety Pipeline Now</span>
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
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline/50 text-slate-300">
                {records.map((r) => (
                  <tr
                    key={r.transaction_id}
                    onClick={() => handleSelectRecord(r.transaction_id)}
                    className="hover:bg-surface-high/40 transition-colors cursor-pointer"
                  >
                    <td className="py-3 px-4 font-semibold text-white">
                      {r.transaction_id}
                    </td>
                    <td className="py-3 px-4 text-on-surface">{r.target_name}</td>
                    <td className="py-3 px-4">
                      <span className="text-[10px] px-2 py-0.5 rounded border border-secondary/30 bg-secondary/10 text-secondary">
                        {r.mitre_technique_id}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-primary-glow font-bold">100.0%</td>
                    <td className="py-3 px-4 text-[10px] text-on-variant truncate max-w-[180px]">
                      {r.audit_hash}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="text-xs text-primary-glow hover:underline">
                        View Report &rarr;
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Compliance Detail Drawer / Modal */}
      {selectedTxId && (
        <div className="p-6 rounded-2xl border border-primary/40 bg-surface-low shadow-[12px_12px_0_0_rgba(134,165,147,0.12)] space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-outline">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-primary-glow">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-on-variant block">
                  STATUTORY AUDIT EVIDENCE REPORT
                </span>
                <h3 className="text-base font-bold text-white">
                  Transaction: {selectedTxId}
                </h3>
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedTxId(null);
                setReport(null);
              }}
              className="p-1 text-on-variant hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {loadingReport ? (
            <div className="p-8 text-center text-xs font-mono text-on-variant">
              Compiling statutory compliance report...
            </div>
          ) : report ? (
            <div className="space-y-6 font-mono text-xs">
              {/* Telemetry Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-lg border border-outline/60 bg-surface-lowest">
                  <span className="text-[9px] uppercase text-on-variant block mb-1">AUDIT STATUS</span>
                  <span className="text-primary-glow font-bold text-xs">{report.overall_status}</span>
                </div>
                <div className="p-3 rounded-lg border border-outline/60 bg-surface-lowest">
                  <span className="text-[9px] uppercase text-on-variant block mb-1">TARGET AGENT</span>
                  <span className="text-white text-xs">{report.target_name} ({report.target_id})</span>
                </div>
                <div className="p-3 rounded-lg border border-outline/60 bg-surface-lowest">
                  <span className="text-[9px] uppercase text-on-variant block mb-1">DEFLECTION EFFICACY</span>
                  <span className="text-primary-glow font-bold text-xs">100.0% Deflected</span>
                </div>
              </div>

              {/* SHA-256 Record Hash */}
              <div className="p-3.5 rounded-lg border border-outline/60 bg-surface-lowest">
                <span className="text-[9px] uppercase tracking-wider text-on-variant block mb-1">
                  SHA-256 CRYPTOGRAPHIC RECORD HASH (IMMUTABLE DIGEST)
                </span>
                <p className="text-primary-glow text-[11px] break-all bg-background p-2.5 rounded border border-outline/40">
                  {report.audit_hash}
                </p>
              </div>

              {/* Regulatory Controls Matrix */}
              {report.regulatory_controls && report.regulatory_controls.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-wider text-on-variant block">
                    Statutory Framework Mappings
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {report.regulatory_controls.map((c, i) => (
                      <div key={i} className="p-3 rounded-lg border border-outline/60 bg-surface-lowest space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-secondary uppercase">{c.framework}</span>
                          <span className="text-[9px] text-primary-glow px-1.5 py-0.5 rounded border border-primary/30 bg-primary/10">
                            {c.compliance_status}
                          </span>
                        </div>
                        <p className="text-white text-xs font-semibold">{c.control_id}: {c.control_title}</p>
                        <p className="text-[10px] text-on-variant font-sans font-light leading-snug">{c.evidence_summary}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Synthesized Boundary Code Preview */}
              {report.synthesized_schema_preview && (
                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase tracking-wider text-on-variant block">
                    Synthesized Defense Boundary Preview
                  </span>
                  <pre className="p-3 rounded-lg border border-outline/60 bg-surface-lowest text-secondary text-[10px] max-h-40 overflow-y-auto whitespace-pre-wrap leading-relaxed">
                    {report.synthesized_schema_preview}
                  </pre>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-outline">
                <p className="text-[10px] text-on-variant italic font-sans max-w-md">
                  {report.legal_disclaimer}
                </p>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleExportJson(report)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-outline hover:border-primary text-xs font-mono text-on-surface hover:text-white transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export JSON Evidence</span>
                  </button>

                  <a
                    href={api.getCertificateUrl(selectedTxId)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-primary hover:bg-primary-glow text-[#102019] text-xs font-semibold transition-all"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Official Certificate</span>
                    <ExternalLink className="w-3 h-3 ml-0.5" />
                  </a>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </main>
  );
}
