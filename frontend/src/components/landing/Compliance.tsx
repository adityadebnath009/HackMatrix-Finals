'use client';

import { ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const frameworks = [
  {
    category: 'STATUTORY LAW',
    title: 'EU AI Act Article 15',
    description:
      'Continuous adversarial testing and cyber resilience verification required for high-risk autonomous AI systems.',
    highlight: 'Mandatory Robustness',
  },
  {
    category: 'US FRAMEWORK',
    title: 'NIST AI RMF 1.0',
    description:
      'Direct mapping to the Govern, Map, and Measure functions for proactive risk identification and runtime deflection.',
    highlight: 'Risk Governance',
  },
  {
    category: 'GLOBAL STANDARD',
    title: 'ISO/IEC 42001',
    description:
      'Operational management controls ensuring traceable, accountable guardrails across your entire AI lifecycle.',
    highlight: 'Certified Controls',
  },
  {
    category: 'THREAT TAXONOMY',
    title: 'MITRE ATLAS™ Matrix',
    description:
      'Zero-tolerance deflection mapped to real-world prompt injection, model evasion, and sensitive data exfiltration vectors.',
    highlight: 'Tactical Defense',
  },
];

export default function Compliance() {
  return (
    <section id="regulatory-compliance" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-24">
      {/* Section Tag */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-surface-highest bg-surface-low/80 backdrop-blur text-xs font-mono text-emerald-400 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>[ STATUTORY GOVERNANCE &amp; ASSURANCE ]</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
          Engineered for Global Regulatory Confidence
        </h2>

        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
          Give your risk, legal, and leadership teams clear proof that your autonomous AI meets the highest international safety benchmarks.
        </p>
      </div>

      {/* 4 Story-Driven Framework Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {frameworks.map((f) => (
          <div
            key={f.title}
            className="p-6 rounded-2xl border border-surface-highest/60 bg-surface-low/50 hover:bg-surface-low/80 backdrop-blur hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-400 uppercase">
                  {f.category}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {f.highlight}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-2.5">{f.title}</h3>
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                {f.description}
              </p>
            </div>

            <div className="flex items-center gap-1.5 pt-5 mt-4 border-t border-surface-highest/40 text-xs font-mono text-slate-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Verified Audit Mapping</span>
            </div>
          </div>
        ))}
      </div>

      {/* In-Context Reassurance Callout */}
      <div className="mt-10 p-5 rounded-xl border border-surface-highest/50 bg-surface-low/40 backdrop-blur flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">
              Deterministic evidence, not vague self-attestations.
            </p>
            <p className="text-xs text-slate-400 font-light">
              Every audit record is logged with reproducible inputs and deflection outcomes.
            </p>
          </div>
        </div>

        <Link
          href="/app"
          className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 hover:text-emerald-300 px-4 py-2 rounded-lg border border-emerald-500/30 hover:bg-emerald-500/10 transition-all flex-shrink-0"
        >
          <span>Open Audit Ledger in Workspace</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </section>
  );
}
