'use client';

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
    iconStyle: 'bg-error/10 text-error border-error/30',
  },
  {
    step: 'STEP 02',
    icon: Code2,
    title: 'Deterministic Defense Synthesis',
    description:
      'Compiles executable Python Pydantic schemas and zero-latency regex boundary shields directly into your runtime proxy with absolute mathematical guarantees.',
    tags: ['Sub-50ms Execution', 'Zero Hallucination', 'Strict Typings'],
    isHighlighted: false,
    iconStyle: 'bg-secondary/10 text-secondary border-secondary/30',
  },
  {
    step: 'STEP 03',
    icon: ShieldCheck,
    title: 'Cryptographic Proof & Ledger',
    description:
      'Replays attack vectors against synthesized shields to prove 100% deflection, notarized with immutable SHA-256 block hashes into Postgres.',
    tags: ['Neon PostgreSQL', 'Tamper-Proof Audit', 'Instant Verifiability'],
    isHighlighted: true,
    iconStyle: 'bg-primary/10 text-primary-glow border-primary/40',
  },
];

export default function SafetyTriad() {
  return (
    <section id="safety-triad" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-24">
      {/* Section Tag */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-outline bg-surface-low text-xs font-mono text-primary-glow mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          <span>[ THE DEFENSE ARCHITECTURE ]</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
          Closed-Loop Autonomous Protection: <br className="hidden sm:inline" />
          <span className="text-primary-glow">
            Attack ➔ Defend ➔ Prove
          </span>
        </h2>

        <p className="text-base sm:text-lg text-on-variant max-w-2xl mx-auto font-light leading-relaxed">
          A continuous, automated safety pipeline that discovers exploits, generates hard deterministic runtime code, and cryptographically proves mitigation.
        </p>
      </div>

      {/* 3 Step Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((s) => (
          <div
            key={s.title}
            className={`p-7 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
              s.isHighlighted
                ? 'bg-surface-low border-primary/60 shadow-[8px_8px_0_0_rgba(134,165,147,0.12)]'
                : 'bg-surface-low border-outline hover:border-outline/90'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs font-mono font-bold tracking-wider text-on-variant">
                  {s.step}
                </span>
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center border ${s.iconStyle}`}
                >
                  <s.icon className="w-4 h-4" />
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
              <p className="text-sm text-on-variant font-light leading-relaxed mb-8">
                {s.description}
              </p>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-outline/50 font-mono text-[11px]">
              {s.tags.map((tag) => (
                <span
                  key={tag}
                  className={`px-2.5 py-1 rounded-md border ${
                    s.isHighlighted
                      ? 'bg-primary/10 border-primary/30 text-primary-glow'
                      : 'bg-surface-lowest border-outline/50 text-on-variant'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
