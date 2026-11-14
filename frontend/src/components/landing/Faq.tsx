'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    number: '01',
    question: 'Does the runtime shield add latency to user chats?',
    answer:
      'No. Unlike legacy LLM-as-a-judge evaluators that inject 800ms–2500ms of lag per turn, AEGISX pre-compiles defense boundaries into deterministic Python Pydantic validators and compiled regex boundaries. Inline runtime proxy validation executes in <0.05ms, resulting in zero perceivable user latency.',
  },
  {
    number: '02',
    question: 'Can I connect my own custom LLM endpoint or agent architecture?',
    answer:
      'Yes. Through our P2 External AI Connector API (/api/v1/connectors), you can register any OpenAI-compatible, Gemini, LangChain, or custom FastAPI agent endpoint. AEGISX handles custom auth headers, maps input/output schemas, and executes autonomous adversarial fuzzing against your live target.',
  },
  {
    number: '03',
    question: 'Does AEGISX claim official legal compliance?',
    answer:
      'AEGISX produces cryptographically notarized audit evidence mapped to statutory frameworks such as the EU AI Act (Article 15), NIST AI RMF 1.0, and ISO/IEC 42001. We provide objective mathematical proof that specific adversarial vectors were deflected, giving your legal and risk teams defensible audit documentation without substituting for legal counsel.',
  },
];

export default function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 px-4 sm:px-6 max-w-4xl mx-auto scroll-mt-24">
      {/* Section Tag */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-surface-highest bg-surface-low/80 backdrop-blur text-xs font-mono text-emerald-400 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>[ KNOWLEDGE BASE &amp; RUNTIME SPECS ]</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
          Enterprise Inquiries &amp; Technical Proof
        </h2>

        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
          Everything engineering leads and security architects need to know about the AEGISX closed-loop shield.
        </p>
      </div>

      {/* Accordion */}
      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={faq.number}
              className="rounded-xl border border-surface-highest/60 bg-surface-low/60 overflow-hidden backdrop-blur transition-all"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full flex items-center justify-between p-5 text-left font-medium text-white hover:text-emerald-400 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono text-emerald-400 font-semibold">
                    {faq.number}
                  </span>
                  <span className="text-base sm:text-lg font-medium">{faq.question}</span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 transition-transform duration-200 flex-shrink-0 ml-4 ${
                    isOpen ? 'rotate-180 text-emerald-400' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-5 pb-5 pt-1 text-sm text-slate-300 font-light leading-relaxed border-t border-surface-highest/30">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
