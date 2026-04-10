import React from 'react';
import { motion } from 'motion/react';
import { Star } from 'lucide-react';
import { lineRevealContainer, lineReveal, fadeUp, stagger } from '../utils/animations';

const testimonials = [
  { name: 'Sara M.', city: 'Milano', role: 'Freelance designer', avatar: 'https://images.unsplash.com/photo-1712863132626-60bb701a6f4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200', text: 'Non credevo fosse cosi semplice. Ho trovato un\'auto a 200 metri da casa, ho prenotato in 2 minuti dall\'app e ho risparmiato quasi 40 euro rispetto al solito noleggio.' },
  { name: 'Marco T.', city: 'Roma', role: 'Consulente IT', avatar: 'https://images.unsplash.com/photo-1762807627815-caff3a9f81cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200', text: 'Ero scettico sull\'idea di usare l\'auto di uno sconosciuto. Ma sapere che ogni utente e verificato e che c\'e la Kasko inclusa mi ha dato subito fiducia.' },
  { name: 'Giulia R.', city: 'Torino', role: 'Studentessa', avatar: 'https://images.unsplash.com/photo-1581977325979-80749e97b0c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200', text: 'Uso Share2Go ogni sabato per le commissioni. Prendo l\'auto vicino a casa, la tengo 3-4 ore e la restituisco. Non sento piu il bisogno di comprarne una.' },
];

export function DriverTestimonialsSection() {
  return (
    <section className="py-24 md:py-40 bg-background font-sans border-t border-border relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 relative">
        <div className="max-w-3xl mb-12">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="flex items-center gap-3 mb-8">
            <div className="h-px w-8 bg-accent" />
            <span className="text-accent text-[10px] font-semibold tracking-[0.25em] uppercase font-sans">Testimonianze</span>
          </motion.div>
          <motion.h2 variants={lineRevealContainer} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-[clamp(2rem,5vw,4rem)] font-extrabold text-foreground leading-[1.02] tracking-[-0.03em] font-sans">
            <motion.span variants={lineReveal} className="block">Chi l'ha provato</motion.span>
            <motion.span variants={lineReveal} className="block text-muted-foreground">non torna indietro.</motion.span>
          </motion.h2>
        </div>

        <motion.div variants={stagger(0.2, 0.15)} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-3 gap-0 border-t border-border">
          {testimonials.map((t, i) => (
            <motion.div key={i} variants={fadeUp} whileHover={{ y: -4 }} className="py-10 md:py-14 md:pr-12 border-b md:border-b-0 md:border-r last:border-r-0 last:border-b-0 border-border flex flex-col cursor-default group">
              <div className="flex gap-0.5 mb-6">{Array.from({ length: 5 }).map((_, j) => <Star key={j} className="w-3 h-3 fill-accent/60 text-accent/60" />)}</div>
              <p className="text-foreground/55 text-sm leading-relaxed flex-1 mb-8 group-hover:text-foreground/80 transition-colors duration-500 font-sans">"{t.text}"</p>
              <div className="flex items-center gap-3 pt-6 border-t border-border">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover object-top grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" />
                <div><p className="font-bold text-foreground/70 text-sm font-sans">{t.name}</p><p className="text-[11px] text-muted-foreground font-sans">{t.role} · {t.city}</p></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-12 flex items-center gap-4">
          <div className="flex gap-0.5">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-3 h-3 fill-accent/60 text-accent/60" />)}</div>
          <span className="text-sm text-muted-foreground font-sans"><span className="font-bold text-foreground/50">4.9/5</span> — beta tester in 8 citta italiane</span>
        </motion.div>
      </div>
    </section>
  );
}
