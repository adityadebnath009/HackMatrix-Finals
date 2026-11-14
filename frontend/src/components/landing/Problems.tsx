'use client';

import { ShieldX, FileWarning, GitFork } from 'lucide-react';

const problems = [
  {
    icon: ShieldX,
    iconColor: 'text-error',
    iconBg: 'bg-error/10 border-error/30',
    badge: 'BYPASS < 500MS',
    badgeStyle: 'text-error bg-error/10 border-error/30',
    title: 'Fragile System Prompts',
    description:
      'Natural language rules collapse under adversarial authority framing, hypothetical roleplay, and delimiter escapes in under 500ms.',
    traceTitle: 'PROMPT INJECTION TRACE',
    traceBody: '[IGNORE_PREVIOUS_DIRECTIVES: OVERRIDE] => System accepted prompt root privilege.',
    traceColor: 'text-error',
  },
  {
    icon: FileWarning,
    iconColor: 'text-secondary',
    iconBg: 'bg-secondary/10 border-secondary/30',
    badge: 'ZERO ENFORCEMENT',
    badgeStyle: 'text-secondary bg-secondary/10 border-secondary/30',
    title: 'Passive Vulnerability Scanners',
    description:
      'Legacy security tools dump 50-page vulnerability PDFs but leave live runtime endpoints completely unprotected against dynamic exploitation.',
    traceTitle: 'STALE AUDIT REPORT',
    traceBody: 'Report Age: 14 Days Old | 0 Active Interceptors',
    traceColor: 'text-secondary',
  },
  {
    icon: GitFork,
    iconColor: 'text-secondary',
    iconBg: 'bg-secondary/10 border-secondary/30',
    badge: 'DRIFT RUNTIME FAIL',
    badgeStyle: 'text-secondary bg-secondary/10 border-secondary/30',
    title: 'Brittle Hand-Crafted YAML',
    description:
      'Manual guardrail rules break with every model release and fail to generalize against novel multi-turn zero-day semantic prompts.',
    traceTitle: 'SYNTAX DRIFT EXCEPTION',
    traceBody: 'GuardrailSyntaxError: Rule #412 unhandled token pattern in vLLM stream.',
    traceColor: 'text-secondary',
  },
];

export default function Problems() {
  return (
    <section id="problems" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-24">
      {/* Section Tag */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-outline bg-surface-low text-xs font-mono text-primary-glow mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          <span>[ SYSTEM VULNERABILITY AUDIT ]</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
          Why Today&apos;s Enterprise AI Guardrails Fail in Production
        </h2>

        <p className="text-base sm:text-lg text-on-variant max-w-2xl mx-auto font-light leading-relaxed">
          Static safety guardrails and legacy scanners leave agentic workflows exposed to novel adversarial jailbreaks.
        </p>
      </div>

      {/* 3 Bento Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {problems.map((p) => (
          <div
            key={p.title}
            className="p-6 rounded-2xl border border-outline bg-surface-low hover:border-outline/90 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <div
                  className={`w-10 h-10 rounded-xl border flex items-center justify-center ${p.iconBg} ${p.iconColor}`}
                >
                  <p.icon className="w-5 h-5" />
                </div>
                <span
                  className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold tracking-wider border ${p.badgeStyle}`}
                >
                  {p.badge}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2.5">{p.title}</h3>
              <p className="text-sm text-on-variant font-light leading-relaxed mb-6">
                {p.description}
              </p>
            </div>

            {/* Code / Trace Box */}
            <div className="p-3.5 rounded-xl bg-surface-lowest border border-outline/60 font-mono text-xs">
              <span className="text-[10px] uppercase tracking-wider text-on-variant block mb-1">
                {p.traceTitle}
              </span>
              <p className={`${p.traceColor} text-[11px] leading-snug break-all`}>
                {p.traceBody}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
