'use client';

import Link from 'next/link';
import { ArrowRight, Shield } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-outline/70 bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-2.5"><span className="flex h-8 w-8 items-center justify-center border border-primary/60 text-primary-glow transition-colors group-hover:bg-primary/10"><Shield className="h-4 w-4" /></span><span className="text-base font-bold tracking-[0.14em] text-white">AEGISX</span></Link>
        <div className="hidden items-center gap-7 text-sm text-on-variant md:flex"><a href="#problems" className="transition-colors hover:text-white">Why now</a><a href="#safety-triad" className="transition-colors hover:text-white">Method</a><a href="#regulatory-compliance" className="transition-colors hover:text-white">Evidence</a><a href="#faq" className="transition-colors hover:text-white">Questions</a></div>
        <Link href="/app" className="group inline-flex min-h-10 items-center gap-2 border border-primary bg-primary px-4 text-xs font-semibold text-[#102019] transition-colors hover:bg-primary-glow">Open workspace<ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" /></Link>
      </div>
    </nav>
  );
}
