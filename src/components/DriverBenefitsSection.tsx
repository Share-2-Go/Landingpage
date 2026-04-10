import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Clock, Leaf, Smartphone } from 'lucide-react';
import { lineRevealContainer, lineReveal, fadeUp, stagger } from '../utils/animations';

const stats = [
  { value: 'Kasko', label: 'Copertura assicurativa', description: 'Ogni noleggio include automaticamente una polizza Kasko. Si attiva al check-in.', icon: ShieldCheck },
  { value: '2 min', label: 'Prenotazione istantanea', description: 'Nessuna approvazione richiesta. Scegli l\'auto, confermi, e il noleggio e subito attivo.', icon: Clock },
  { value: '0', label: 'Costi nascosti', description: 'Il prezzo mostrato al checkout e gia inclusivo della commissione. Nessun extra a sorpresa.', icon: Leaf },
  { value: '100%', label: 'Digitale', description: 'Firmi il contratto in-app con un codice SMS. Check-in e check-out con foto — tutto senza carta.', icon: Smartphone },
];

export function DriverBenefitsSection() {
  return (
    <section className="py-24 md:py-40 bg-background font-sans border-t border-border relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 relative">
        <div className="max-w-3xl mb-14">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="flex items-center gap-3 mb-8">
            <div className="h-px w-8 bg-accent" />
            <span className="text-accent text-[10px] font-semibold tracking-[0.25em] uppercase font-sans">Ogni noleggio</span>
          </motion.div>
          <motion.h2 variants={lineRevealContainer} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-[clamp(2rem,5vw,4rem)] font-extrabold text-foreground leading-[1.02] tracking-[-0.03em] font-sans">
            <motion.span variants={lineReveal} className="block">Perche Share2Go?</motion.span>
          </motion.h2>
        </div>

        <motion.div variants={stagger(0.2, 0.12)} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-border">
          {stats.map((stat, i) => (
            <motion.div key={i} variants={fadeUp} whileHover={{ y: -4 }} className="py-10 md:py-14 pr-8 border-b sm:border-b-0 sm:border-r last:border-r-0 last:border-b-0 border-border group cursor-default">
              <stat.icon className="w-5 h-5 text-accent/50 mb-6 group-hover:text-accent transition-colors" />
              <div className="text-[clamp(2rem,4vw,3rem)] font-extrabold text-foreground leading-none tracking-[-0.04em] mb-1 font-sans">{stat.value}</div>
              <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.2em] mb-5 font-sans">{stat.label}</div>
              <p className="text-muted-foreground text-sm leading-relaxed font-sans">{stat.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
