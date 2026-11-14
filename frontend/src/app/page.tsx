'use client';

import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import Problems from '@/components/landing/Problems';
import SafetyTriad from '@/components/landing/SafetyTriad';
import Compliance from '@/components/landing/Compliance';
import Faq from '@/components/landing/Faq';
import Cta from '@/components/landing/Cta';
import Footer from '@/components/landing/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-on-surface cyber-grid selection:bg-emerald-500 selection:text-slate-950 relative">
      <Navbar />
      <main>
        <Hero />
        <Problems />
        <SafetyTriad />
        <Compliance />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
