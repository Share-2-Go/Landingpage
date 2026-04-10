import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus } from 'lucide-react';
import { lineRevealContainer, lineReveal } from '../utils/animations';

const faqs = [
  { q: 'Chi puo guidare la mia auto?', a: 'Solo driver verificati con patente valida da almeno 1 anno e un controllo identita superato. La sicurezza e la nostra priorita: monitoriamo ogni profilo e tu hai sempre l\'ultima parola su ogni richiesta di noleggio.' },
  { q: 'Cosa succede in caso di danni o furto?', a: 'Ogni viaggio e coperto dalla nostra assicurazione Kasko completa. Include danni, furto, incendio e atti vandalici. La tua polizza personale e la tua classe di merito non vengono intaccate.' },
  { q: 'Quanto posso guadagnare?', a: 'Dipende dal modello della tua auto, dalla tua citta e dalla disponibilita che offri. In media, i nostri host attivi guadagnano tra i 300 e i 600 euro al mese.' },
  { q: 'E le multe?', a: 'Se un driver prende la multa durante il noleggio, la responsabilita viene trasferita automaticamente a lui grazie al verbale di consegna digitale. Gestiamo noi la burocrazia.' },
  { q: 'Come e quando vengo pagato?', a: 'I guadagni vengono accreditati automaticamente sul tuo conto corrente tramite bonifico bancario. Effettuiamo i pagamenti ogni 15 giorni.' },
  { q: 'Posso scegliere chi guida la mia auto?', a: 'Assolutamente si. Puoi accettare o rifiutare ogni richiesta. Inoltre hai accesso allo storico completo del driver: recensioni, viaggi passati e punteggio di affidabilita.' },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-24 md:py-40 bg-background font-sans border-t border-border">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          <div className="lg:w-2/5">
            <div className="lg:sticky lg:top-28">
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="flex items-center gap-3 mb-8">
                <div className="h-px w-8 bg-muted-foreground" />
                <span className="text-muted-foreground text-[10px] font-semibold tracking-[0.25em] uppercase font-sans">FAQ</span>
              </motion.div>
              <motion.h2 variants={lineRevealContainer} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-[clamp(2rem,4vw,3.5rem)] font-extrabold text-foreground leading-[1.05] tracking-[-0.03em] mb-5 font-sans">
                <motion.span variants={lineReveal} className="block">Le domande</motion.span>
                <motion.span variants={lineReveal} className="block text-muted-foreground">che ci fanno tutti.</motion.span>
              </motion.h2>
              <p className="text-muted-foreground text-base leading-relaxed font-sans">Tutto quello che un proprietario vuole sapere prima di condividere.</p>
            </div>
          </div>
          <div className="lg:w-3/5">
            {faqs.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04, duration: 0.6 }} className="border-b border-border">
                <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between text-left py-6 group cursor-pointer" aria-expanded={open === i}>
                  <span className={`font-bold text-sm sm:text-[15px] leading-snug pr-6 transition-colors duration-300 font-sans ${open === i ? 'text-foreground' : 'text-foreground/45 group-hover:text-foreground/70'}`}>{faq.q}</span>
                  <motion.div animate={{ rotate: open === i ? 45 : 0 }} transition={{ type: 'spring', stiffness: 300, damping: 25 }} className="shrink-0 w-7 h-7 rounded-full border border-border flex items-center justify-center group-hover:border-foreground/20 transition-colors">
                    <Plus className={`w-3.5 h-3.5 transition-colors duration-300 ${open === i ? 'text-accent' : 'text-muted-foreground'}`} strokeWidth={2} />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }} className="overflow-hidden">
                      <p className="text-muted-foreground text-sm leading-relaxed pb-6 max-w-lg font-sans">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
