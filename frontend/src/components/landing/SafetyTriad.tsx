'use client';

import { motion } from 'framer-motion';
import { Bug, Code2, ShieldCheck } from 'lucide-react';

const steps = [
  {
    step: 'STEP 01',
    icon: Bug,
    title: 'Autonomous Red-Team Swarm',
    description:
      'Generates multi-vector semantic exploits: persona jailbreaks, delimiter smuggling, PII exfiltration, and tool-calling hijacking using adversarial LLMs.',
    tags: ['Adaptive LLM Fuzzing', 'MITRE ATLAS Mapped', 'Sub-second Iteration'],
    isHighlighted: false,
  },
  {
    step: 'STEP 02',
    icon: Code2,
    title: 'Deterministic Defense Synthesis',
    description:
      'Compiles executable Python Pydantic schemas and zero-latency regex boundary shields directly into your runtime proxy with absolute mathematical guarantees.',
    tags: ['Sub-50ms Execution', 'Zero Hallucination', 'Strict Typings'],
    isHighlighted: false,
  },
  {
    step: 'STEP 03',
    icon: ShieldCheck,
    title: 'Cryptographic Proof & Ledger',
    description:
      'Replays attack vectors against synthesized shields to prove 100% deflection, notarized with immutable SHA-256 block hashes into Postgres.',
    tags: ['Neon PostgreSQL', 'Tamper-Proof Audit', 'Instant Verifiability'],
    isHighlighted: true,
  },
];

export default function SafetyTriad() {
  return (
    <section id="safety-triad" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-24">
      {/* Section Tag */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-surface-highest bg-surface-low/80 backdrop-blur text-xs font-mono text-emerald-400 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>[ THE DEFENSE ARCHITECTURE ]</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
          Closed-Loop Autonomous Protection: <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
            Attack ➔ Defend ➔ Prove
          </span>
        </h2>

        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
          A continuous, automated safety pipeline that discovers exploits, generates hard deterministic runtime code, and cryptographically proves mitigation.
        </p>
      </div>

      {/* 3 Step Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((s, idx) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className={`p-7 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
              s.isHighlighted
                ? 'bg-surface-low/90 border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/30'
                : 'bg-surface-low/60 border-surface-highest/60 hover:bg-surface-low/80'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs font-mono font-bold tracking-wider text-slate-400">
                  {s.step}
                </span>
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                    s.isHighlighted
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-surface-high text-cyan-400 border border-surface-highest'
                  }`}
                >
                  <s.icon className="w-4 h-4" />
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
              <p className="text-sm text-slate-300 font-light leading-relaxed mb-8">
                {s.description}
              </p>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-surface-highest/40 font-mono text-[11px]">
              {s.tags.map((tag) => (
                <span
                  key={tag}
                  className={`px-2.5 py-1 rounded-md border ${
                    s.isHighlighted
                      ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300'
                      : 'bg-surface-lowest border-surface-highest/50 text-slate-400'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
