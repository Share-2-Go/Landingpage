import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { TrendingUp, Wallet } from 'lucide-react';
import { EarningsCalculator } from './EarningsCalculator';
import { lineRevealContainer, lineReveal } from '../utils/animations';

interface EarnWithUsSectionProps { onSwitchToOwner?: () => void; }

export function EarnWithUsSection({ onSwitchToOwner }: EarnWithUsSectionProps) {
  return (
    <section id="earnings-calculator" className="bg-background font-sans">
      {/* Big number hero */}
      <div className="relative overflow-hidden py-24 md:py-32 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="text-center">
            <span className="text-accent text-[10px] font-semibold tracking-[0.3em] uppercase block mb-6 font-sans">Guadagno stimato</span>
            <p className="text-[clamp(3rem,8vw,7rem)] font-extrabold text-foreground leading-none tracking-[-0.04em] font-sans">300-600<span className="text-muted-foreground">€</span></p>
            <p className="text-muted-foreground text-base mt-3 font-sans">al mese, in media</p>
          </motion.div>
        </div>
      </div>

      <div className="py-24 md:py-40 max-w-[1200px] mx-auto px-6 lg:px-10 border-t border-border">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">
          <div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-accent" />
              <span className="text-accent text-[10px] font-semibold tracking-[0.25em] uppercase font-sans">Calcola il tuo guadagno</span>
            </motion.div>
            <motion.h2 variants={lineRevealContainer} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-[clamp(2rem,5vw,4rem)] font-extrabold text-foreground leading-[1.02] tracking-[-0.03em] mb-6 font-sans">
              <motion.span variants={lineReveal} className="block">Quanto guadagni</motion.span>
              <motion.span variants={lineReveal} className="block text-muted-foreground">con la tua auto?</motion.span>
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-lg font-sans">
              Inserisci marca e modello. Le stime sono basate sui dati ACI ufficiali 2024 e sulle tariffe medie di condivisione nella tua zona.
            </motion.p>
            <div className="lg:hidden mb-12"><EarningsCalculator onCtaClick={onSwitchToOwner} /></div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="space-y-0">
              {[
                { icon: TrendingUp, title: 'Dati ACI certificati', text: 'Stime basate su costi chilometrici reali, non su ipotesi.' },
                { icon: Wallet, title: 'Pagamenti sicuri', text: 'Bonifico diretto ogni 15 giorni sul tuo conto corrente.' },
              ].map((item, i) => (
                <motion.div key={i} whileHover={{ x: 4 }} transition={{ type: 'spring', stiffness: 300, damping: 25 }} className="flex items-start gap-4 py-6 border-b border-border last:border-b-0 group cursor-default">
                  <item.icon className="w-5 h-5 text-accent shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <div>
                    <h4 className="text-foreground font-bold text-[15px] mb-1 font-sans">{item.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed font-sans">{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.3 }} className="hidden lg:block sticky top-24">
            <EarningsCalculator onCtaClick={onSwitchToOwner} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
