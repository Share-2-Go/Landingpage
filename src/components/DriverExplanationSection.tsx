import React from 'react';
import { motion } from 'motion/react';
import { Home, Smartphone, ShieldCheck, MapPin, Car } from 'lucide-react';
import { lineRevealContainer, lineReveal, fadeUp, stagger } from '../utils/animations';

export function DriverExplanationSection() {
  return (
    <section className="py-24 lg:py-40 bg-background font-sans border-t border-border relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 relative">
        <div className="max-w-3xl mb-14">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="flex items-center gap-3 mb-8">
            <div className="h-px w-8 bg-muted-foreground" />
            <span className="text-muted-foreground text-[10px] font-semibold tracking-[0.25em] uppercase font-sans">Il carsharing tra privati</span>
          </motion.div>
          <motion.h2 variants={lineRevealContainer} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-[clamp(2.2rem,5.5vw,4.5rem)] font-extrabold text-foreground leading-[1] tracking-[-0.03em] mb-6 font-sans">
            <motion.span variants={lineReveal} className="block">Come Airbnb,</motion.span>
            <motion.span variants={lineReveal} className="block text-muted-foreground">ma per le auto.</motion.span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="text-muted-foreground text-lg leading-relaxed max-w-xl font-sans">
            Il tuo vicino ha una Fiat 500 ferma in garage 5 giorni su 7. Tu hai bisogno di un'auto per il weekend. Share2Go vi connette — in 2 minuti, senza intermediari.
          </motion.p>
        </div>

        <motion.div variants={stagger(0.2, 0.15)} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-3 gap-0 border-t border-border">
          <motion.div variants={fadeUp} whileHover={{ y: -4 }} className="py-10 md:py-14 md:pr-12 border-b md:border-b-0 md:border-r border-border group cursor-default">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center"><Home className="w-5 h-5 text-accent" /></div>
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.2em] font-sans">Il Proprietario</span>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center text-foreground/70 font-bold text-sm font-sans">M</div>
              <div><p className="font-bold text-foreground text-sm font-sans">Marco, 34</p><p className="text-muted-foreground text-xs flex items-center gap-1 font-sans"><MapPin className="w-3 h-3" />Navigli, Milano</p></div>
            </div>
            <div className="bg-muted border border-border rounded-lg p-4 mb-4">
              <p className="text-foreground font-bold text-sm font-sans">Fiat 500 · 2021</p>
              <p className="text-muted-foreground text-xs mt-1 font-sans">Ferma in garage dal lunedi al venerdi</p>
            </div>
            <div><p className="text-muted-foreground text-xs mb-1 font-sans">Guadagno mensile stimato</p><p className="text-2xl font-extrabold text-accent font-sans">+320 <span className="text-sm font-medium text-muted-foreground">/mese</span></p></div>
          </motion.div>

          <motion.div variants={fadeUp} whileHover={{ y: -4 }} className="py-10 md:py-14 md:px-12 border-b md:border-b-0 md:border-r border-border group cursor-default">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-muted border border-border flex items-center justify-center"><Smartphone className="w-5 h-5 text-muted-foreground" /></div>
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.2em] font-sans">La Piattaforma</span>
            </div>
            <p className="text-xl font-extrabold text-foreground mb-2 tracking-tight font-sans">Share2Go</p>
            <p className="text-muted-foreground text-sm mb-6 font-sans">Connette i due lati del mercato</p>
            <div className="space-y-3">
              {['Verifica l\'identita di tutti', 'Copertura Kasko inclusa', 'Pagamenti sicuri e automatici', 'Assistenza stradale 24/7'].map((text, i) => (
                <div key={i} className="flex items-center gap-2.5"><ShieldCheck className="w-4 h-4 text-accent shrink-0" /><span className="text-foreground/60 text-sm font-sans">{text}</span></div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-border"><p className="text-muted-foreground text-xs font-sans">Commissione trasparente, gia inclusa nel prezzo.</p></div>
          </motion.div>

          <motion.div variants={fadeUp} whileHover={{ y: -4 }} className="py-10 md:py-14 md:pl-12 group cursor-default">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-muted border border-border flex items-center justify-center"><Car className="w-5 h-5 text-muted-foreground" /></div>
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.2em] font-sans">Il Driver</span>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center text-foreground/70 font-bold text-sm font-sans">G</div>
              <div><p className="font-bold text-foreground text-sm font-sans">Giulia, 27</p><p className="text-muted-foreground text-xs flex items-center gap-1 font-sans"><MapPin className="w-3 h-3" />Porta Venezia, Milano</p></div>
            </div>
            <div className="bg-muted border border-border rounded-lg p-4 mb-4">
              <p className="text-foreground font-bold text-sm font-sans">Fiat 500 a 200m</p>
              <p className="text-muted-foreground text-xs mt-1 font-sans">Prenotata in 2 min dall'app</p>
            </div>
            <div><p className="text-muted-foreground text-xs mb-1 font-sans">Ha pagato (vs noleggio classico)</p>
              <div className="flex items-baseline gap-3">
                <p className="text-2xl font-extrabold text-accent font-sans">28€</p>
                <p className="text-sm text-muted-foreground line-through font-sans">55€</p>
                <span className="text-xs font-bold text-accent bg-accent/10 px-1.5 py-0.5 rounded-full font-sans">-49%</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
