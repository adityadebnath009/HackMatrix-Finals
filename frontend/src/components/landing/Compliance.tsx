'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Download, Printer, CheckCircle, ExternalLink, Lock } from 'lucide-react';
import { api } from '@/services/api-adapter';

const frameworks = [
  {
    category: 'REGULATORY',
    title: 'EU AI Act Article 15(1)',
    description: 'Statutory adversarial robustness and high-risk AI cyber resilience certification.',
  },
  {
    category: 'FRAMEWORK',
    title: 'NIST AI RMF 1.0 Sec 2.4',
    description: 'Continuous AI risk management, threat modeling, and vulnerability mitigation telemetry.',
  },
  {
    category: 'STANDARD',
    title: 'ISO/IEC 42001 Sec 8.4',
    description: 'AI Management Systems specification for operational controls and monitoring validation.',
  },
  {
    category: 'TAXONOMY',
    title: 'MITRE ATLAS™ Matrix',
    description: 'Exhaustive deflection mapping for AML.T0054, AML.T0048, AML.T0043, and AML.T0051.',
  },
];

export default function Compliance() {
  const [downloading, setDownloading] = useState(false);

  const handleExportJson = async () => {
    try {
      setDownloading(true);
      const res = await api.getComplianceReport('tx-aegis-101');
      const blob = new Blob([JSON.stringify(res.data, null, 2)], {
        type: 'application/json',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `AEGISX-Compliance-Report-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('Failed to export JSON report', e);
    } finally {
      setDownloading(false);
    }
  };

  const certificateUrl = api.getCertificateUrl('tx-aegis-101');

  return (
    <section id="regulatory-compliance" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-24">
      {/* Section Tag */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-surface-highest bg-surface-low/80 backdrop-blur text-xs font-mono text-emerald-400 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>[ STATUTORY GOVERNANCE &amp; AUDIT READY ]</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
          Engineered for Global Statutory Compliance
        </h2>

        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
          Equip your legal, risk, and SecOps teams with verifiable cryptographic evidence for major global AI frameworks.
        </p>
      </div>

      {/* 4 Framework Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {frameworks.map((f, idx) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: idx * 0.08 }}
            className="p-5 rounded-xl border border-surface-highest/60 bg-surface-low/50 backdrop-blur hover:border-surface-highest transition-all"
          >
            <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-400 block mb-2 uppercase">
              {f.category}
            </span>
            <h3 className="text-base font-bold text-white mb-2">{f.title}</h3>
            <p className="text-xs text-slate-300 font-light leading-relaxed">
              {f.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Certificate Artifact Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="p-6 md:p-8 rounded-2xl border border-emerald-500/40 bg-surface-lowest/90 shadow-[0_0_36px_rgba(16,185,129,0.12)] backdrop-blur-xl relative overflow-hidden"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-surface-highest/60">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block">
                NOTARIZED VERIFICATION ARTIFACT
              </span>
              <h3 className="text-lg md:text-xl font-bold text-white">
                AEGISX Cryptographic AI Safety Verification Certificate
              </h3>
            </div>
          </div>
          <div className="px-3 py-1 rounded bg-surface-high border border-surface-highest font-mono text-xs text-emerald-400 self-start sm:self-auto">
            CERT_ID: #AEGISX-2026-CERT-90412
          </div>
        </div>

        {/* 3 Telemetry Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 font-mono text-xs">
          <div className="p-3.5 rounded-xl bg-surface-low border border-surface-highest/40">
            <span className="text-[10px] uppercase text-slate-400 block mb-1">TARGET ENDPOINT</span>
            <span className="text-white font-medium">api.production.internal/v1/agent</span>
          </div>
          <div className="p-3.5 rounded-xl bg-surface-low border border-surface-highest/40">
            <span className="text-[10px] uppercase text-slate-400 block mb-1">MITIGATION TELEMETRY</span>
            <span className="text-emerald-400 font-bold">100% (42/42 vectors deflect)</span>
          </div>
          <div className="p-3.5 rounded-xl bg-surface-low border border-surface-highest/40">
            <span className="text-[10px] uppercase text-slate-400 block mb-1">EVALUATION STANDARD</span>
            <span className="text-slate-200">EU AI Act Art 15.1 + NIST RMF</span>
          </div>
        </div>

        {/* Merkle Hash Block */}
        <div className="p-4 rounded-xl bg-surface-low border border-surface-highest/40 mb-6 font-mono">
          <span className="text-[10px] uppercase tracking-wider text-slate-400 block mb-1.5">
            IMMUTABLE SHA-256 MERKLE ROOT HASH
          </span>
          <p className="text-xs text-emerald-300 break-all bg-black/50 p-2.5 rounded-lg border border-emerald-500/20">
            e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
          </p>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Digitally Signed by AEGISX Autonomous Defense Oracle</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportJson}
              disabled={downloading}
              className="inline-flex items-center gap-2 text-xs font-mono font-medium px-4 py-2 rounded-lg border border-surface-highest hover:bg-surface-high/60 text-slate-300 hover:text-white transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{downloading ? 'Exporting...' : 'Export JSON Manifest'}</span>
            </button>

            <a
              href={certificateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-[0_0_16px_rgba(16,185,129,0.35)] transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>View Printable Certificate</span>
              <ExternalLink className="w-3 h-3 ml-0.5" />
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
