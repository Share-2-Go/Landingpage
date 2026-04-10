import React from 'react';
import { motion } from 'motion/react';
import { UserCheck, ShieldCheck, MessageSquareHeart } from 'lucide-react';
import { lineRevealContainer, lineReveal, fadeUp, stagger } from '../utils/animations';

const features = [
  { icon: UserCheck, title: 'Identita verificate', description: 'Ogni utente e sottoposto a una verifica rigorosa dei documenti prima di accedere alla piattaforma.', badge: 'KYC' },
  { icon: ShieldCheck, title: 'Assistenza Stradale 24/7', description: 'In caso di guasto o incidente, il nostro team e sempre al tuo fianco per gestire l\'emergenza.', badge: 'ACI' },
  { icon: MessageSquareHeart, title: 'Community reale', description: 'Profili verificati, storico noleggi visibile e un sistema di feedback che mantiene gli standard alti.', badge: 'P2P' },
];

export function DriverTrustSection() {
  return (
    <section className="py-24 lg:py-40 bg-background font-sans border-t border-border">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <div className="max-w-3xl mb-14">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="flex items-center gap-3 mb-8">
            <div className="h-px w-8 bg-accent" />
            <span className="text-accent text-[10px] font-semibold tracking-[0.25em] uppercase font-sans">Sicurezza</span>
          </motion.div>
          <motion.h2 variants={lineRevealContainer} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-[clamp(2rem,5vw,4rem)] font-extrabold text-foreground leading-[1.02] tracking-[-0.03em] font-sans">
            <motion.span variants={lineReveal} className="block">Viaggia senza pensieri.</motion.span>
            <motion.span variants={lineReveal} className="block text-muted-foreground">Sei protetto.</motion.span>
          </motion.h2>
        </div>
        <motion.div variants={stagger(0.2, 0.15)} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-3 gap-0 border-t border-border">
          {features.map((f, i) => (
            <motion.div key={i} variants={fadeUp} whileHover={{ y: -4 }} className="py-10 md:py-14 md:pr-12 border-b md:border-b-0 md:border-r last:border-r-0 last:border-b-0 border-border group cursor-default">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:scale-105 transition-transform"><f.icon className="w-5 h-5 text-accent" /></div>
                <span className="text-[8px] font-bold text-accent bg-accent/10 px-1.5 py-0.5 rounded-full tracking-wider uppercase font-sans">{f.badge}</span>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-3 tracking-tight font-sans">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed font-sans">{f.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
