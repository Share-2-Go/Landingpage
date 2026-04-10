import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus } from 'lucide-react';
import { lineRevealContainer, lineReveal } from '../utils/animations';

const faqs = [
  { q: 'Chi puo noleggiare?', a: 'Chiunque abbia un account Share2Go con identita verificata e una patente di guida valida rilasciata da almeno 1 anno. Sono accettate patenti di tutti i paesi UE. Serve anche un metodo di pagamento valido.' },
  { q: 'Devo aspettare l\'approvazione del proprietario?', a: 'No. Tutte le prenotazioni su Share2Go sono a conferma istantanea. Scegli l\'auto, selezioni le date, confermi e la prenotazione è attiva subito.' },
  { q: 'Quando mi viene addebitato il pagamento?', a: 'Al momento della prenotazione la carta viene solo pre-autorizzata. Il pagamento effettivo avviene 24 ore prima dell\'inizio del noleggio.' },
  { q: 'Come funziona il ritiro dell\'auto?', a: '30 minuti prima si sblocca il check-in nell\'app. Il proprietario fotografa i 4 angoli dell\'auto, cruscotto con km e carburante. Tu verifichi e confermi la ricezione delle chiavi.' },
  { q: 'L\'assicurazione e inclusa?', a: 'Sì. Ogni noleggio include automaticamente una copertura assicurativa Kasko. Si attiva al check-in e rimane attiva fino al check-out.' },
  { q: 'Cosa succede se devo cancellare?', a: 'Puoi cancellare dalla sezione "I miei noleggi". Rimborso dipende dal timing: oltre 24h rimborso integrale, 24-12h 50%, 12-3h 30%, ultime 3h nessun rimborso.' },
  { q: 'Come funziona il carburante?', a: 'Ritiri con il serbatoio pieno e restituisci pieno. Il livello viene documentato con foto al check-in e check-out. Penale di 25 euro se restituisci con meno carburante.' },
  { q: 'Cosa succede in caso di multa?', a: 'La responsabilita e interamente a carico del conducente per qualsiasi infrazione durante il noleggio. Le multe vengono rinotificate direttamente al driver tramite l\'app.' },
];

export function DriverFAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-24 md:py-40 bg-background font-sans border-t border-border">
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
              <p className="text-muted-foreground text-base leading-relaxed font-sans">Tutto quello che un driver vuole sapere prima di prenotare.</p>
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
