'use client';

import Link from 'next/link';
import { ArrowRight, ShieldCheck } from 'lucide-react';

const proofSteps = [
  { number: '01', label: 'Challenge', detail: 'Semantic exploit enters the boundary', tone: 'border-[#b55d4c]/45 bg-[#b55d4c]/10 text-[#e2a397]' },
  { number: '02', label: 'Constrain', detail: 'Deterministic rules stop unsafe action', tone: 'border-[#b69a72]/45 bg-[#b69a72]/10 text-[#dbc49f]' },
  { number: '03', label: 'Prove', detail: 'A signed record preserves the result', tone: 'border-primary/50 bg-primary/10 text-primary-glow' },
];

export default function Hero() {
  return (
    <section className="relative mx-auto grid min-h-[calc(100svh-2rem)] max-w-7xl items-center gap-12 px-4 pb-16 pt-32 sm:px-6 lg:grid-cols-[1.02fr_.98fr] lg:gap-20 lg:pb-20 lg:pt-28">
      <div className="max-w-2xl text-left">
        <p className="mb-8 flex items-center gap-3 text-[11px] font-mono font-semibold uppercase tracking-[0.2em] text-primary-glow"><span className="h-px w-8 bg-primary" />Closed-loop AI assurance</p>
        <h1 className="max-w-xl text-5xl font-semibold leading-[0.98] tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl">
          Find the break.<span className="mt-2 block font-serif text-primary-glow italic">Build the boundary.</span><span className="mt-2 block">Keep the proof.</span>
        </h1>
        <p className="mt-8 max-w-xl text-base leading-7 text-on-variant sm:text-lg">AEGISX stress-tests AI agents, turns discovered failures into deterministic controls, and leaves an audit trail your team can inspect.</p>
        <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <Link href="/app" className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-[#102019] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-primary-glow active:translate-y-0">Open the workspace<ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" /></Link>
          <a href="#safety-triad" className="group inline-flex min-h-12 items-center gap-2 border-b border-outline pb-1 text-sm font-medium text-on-surface transition-colors hover:border-primary hover:text-primary-glow">See how it works<ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" /></a>
        </div>
        <dl className="mt-14 grid max-w-lg grid-cols-3 border-t border-outline/70 pt-5 text-left">
          <div><dt className="text-[10px] font-mono uppercase tracking-wider text-on-variant">Red team</dt><dd className="mt-1 text-sm font-semibold text-white">Adversarial</dd></div>
          <div className="border-l border-outline/70 pl-5"><dt className="text-[10px] font-mono uppercase tracking-wider text-on-variant">Controls</dt><dd className="mt-1 text-sm font-semibold text-white">Deterministic</dd></div>
          <div className="border-l border-outline/70 pl-5"><dt className="text-[10px] font-mono uppercase tracking-wider text-on-variant">Evidence</dt><dd className="mt-1 text-sm font-semibold text-white">Traceable</dd></div>
        </dl>
      </div>
      <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
        <div className="absolute -left-4 top-10 h-[calc(100%-5rem)] w-px bg-outline/60" />
        <div className="border border-outline bg-surface-low p-5 shadow-[12px_12px_0_0_rgba(134,165,147,0.14)] sm:p-7">
          <div className="flex items-center justify-between border-b border-outline/70 pb-4"><div><p className="text-[10px] font-mono uppercase tracking-[0.18em] text-on-variant">AEGISX / proof path</p><p className="mt-1 text-sm font-medium text-white">A defensible control loop</p></div><ShieldCheck className="h-5 w-5 text-primary-glow" aria-hidden="true" /></div>
          <div className="relative mt-7 space-y-3"><div className="absolute left-[1.05rem] top-7 h-[calc(100%-3.5rem)] w-px bg-outline/80" />
            {proofSteps.map((step) => <div key={step.number} className="relative grid grid-cols-[2.1rem_1fr] gap-4"><span className={`z-10 flex h-[2.1rem] w-[2.1rem] items-center justify-center rounded-full border text-[10px] font-mono font-semibold ${step.tone}`}>{step.number}</span><div className="border border-outline/70 bg-surface-lowest px-4 py-4"><p className="text-sm font-semibold text-white">{step.label}</p><p className="mt-1 text-sm leading-5 text-on-variant">{step.detail}</p></div></div>)}
          </div>
          <div className="mt-6 flex items-center justify-between border-t border-outline/70 pt-4 font-mono text-[10px] uppercase tracking-wider text-on-variant"><span>Static preview</span><span className="text-primary-glow">Animation slot ready</span></div>
        </div>
      </div>
    </section>
  );
}
