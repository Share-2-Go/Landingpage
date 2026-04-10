import React from 'react';
import { motion } from 'motion/react';
import { Shield, CheckCircle2, Smartphone, Lock, Clock, HeartHandshake } from 'lucide-react';
import { lineRevealContainer, lineReveal, fadeUp, stagger } from '../utils/animations';

const steps = [
  { num: '01', title: 'Registra la tua auto', text: 'Inserisci i dati del veicolo, le foto e la disponibilita. In 5 minuti sei operativo.', icon: Smartphone },
  { num: '02', title: 'Conosci il driver', text: 'Ricevi la richiesta con il profilo verificato del driver. Chat in-app per qualsiasi domanda.', icon: HeartHandshake },
  { num: '03', title: 'Guadagna, protetto', text: 'Al check-in si attiva la Kasko. Al check-out ricevi il pagamento. Semplice.', icon: Lock },
];

const guarantees = [
  { icon: Shield, title: 'Kasko Completa', text: 'Ogni viaggio include una polizza Kasko a carico del Driver. La tua classe di merito e intoccabile.', badge: 'INCLUSA' },
  { icon: Clock, title: 'Assistenza 24/7', text: 'Soccorso stradale incluso in tutta Europa. Gestiamo noi qualsiasi imprevisto, sempre.', badge: 'INCLUSA' },
  { icon: CheckCircle2, title: 'Supporto dedicato', text: 'Un team di esperti al tuo fianco 7/7 per risolvere qualsiasi dubbio in tempo reale.', badge: 'PREMIUM' },
];

export function ZeroRiskSection() {
  return (
    <section className="bg-background font-sans">
      {/* Steps */}
      <div className="py-24 md:py-40 max-w-[1200px] mx-auto px-6 lg:px-10 border-t border-border">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="flex items-center gap-3 mb-8">
          <div className="h-px w-8 bg-muted-foreground" />
          <span className="text-muted-foreground text-[10px] font-semibold tracking-[0.25em] uppercase font-sans">Come funziona</span>
        </motion.div>
        <motion.h2 variants={lineRevealContainer} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-[clamp(2rem,5vw,4rem)] font-extrabold text-foreground leading-[1.02] tracking-[-0.03em] mb-20 font-sans">
          <motion.span variants={lineReveal} className="block">Tre passi.</motion.span>
          <motion.span variants={lineReveal} className="block text-muted-foreground">Zero complicazioni.</motion.span>
        </motion.h2>

        <motion.div variants={stagger(0.2, 0.15)} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-3 gap-0 border-t border-border">
          {steps.map((step, i) => (
            <motion.div key={i} variants={fadeUp} whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300, damping: 25 }} className="py-10 md:py-14 md:pr-12 border-b md:border-b-0 md:border-r last:border-r-0 last:border-b-0 border-border group cursor-default">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-accent text-sm font-bold tabular-nums font-sans">{step.num}</span>
                <div className="h-px flex-1 bg-border" />
              </div>
              <div className="w-11 h-11 rounded-xl bg-muted border border-border flex items-center justify-center mb-5 group-hover:border-accent/30 transition-all duration-500">
                <step.icon className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors duration-500" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-3 tracking-tight font-sans">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed font-sans">{step.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Guarantees */}
      <div className="border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-24 md:py-40">
          <div className="max-w-3xl">
            <motion.h2 variants={lineRevealContainer} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold text-foreground leading-[1.05] tracking-[-0.03em] mb-6 font-sans">
              <motion.span variants={lineReveal} className="block">Condividere la tua auto</motion.span>
              <motion.span variants={lineReveal} className="block">senza rischi?</motion.span>
              <motion.span variants={lineReveal} className="block text-accent">Da oggi puoi.</motion.span>
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="text-muted-foreground text-lg leading-relaxed mb-14 max-w-lg font-sans">
              Abbiamo costruito un sistema di protezione a piu livelli pensato esclusivamente per te.
            </motion.p>

            <motion.div variants={stagger(0.4, 0.12)} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-0">
              {guarantees.map((g, i) => (
                <motion.div key={i} variants={fadeUp} whileHover={{ x: 6 }} transition={{ type: 'spring', stiffness: 300, damping: 25 }} className="flex items-start gap-4 py-6 border-b border-border last:border-b-0 group cursor-default">
                  <div className="shrink-0 w-11 h-11 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <g.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-foreground font-bold text-[15px] font-sans">{g.title}</h4>
                      <span className="text-[8px] font-bold text-accent bg-accent/10 px-1.5 py-0.5 rounded-full tracking-wider font-sans">{g.badge}</span>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed font-sans">{g.text}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
