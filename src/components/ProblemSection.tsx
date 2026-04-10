import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useCounter } from '../utils/useAnimations';
import { lineRevealContainer, lineReveal } from '../utils/animations';

const stats = [
  { target: 4000, prefix: '', suffix: '€', unit: '/anno', description: 'Spese fisse tra assicurazione, bollo, revisione e manutenzione.' },
  { target: 95, prefix: '', suffix: '', unit: '%', description: 'Del tempo la tua auto resta ferma. Paghi il 100% per usarla il 5%.' },
  { target: 23, prefix: '-', suffix: '', unit: '%', description: 'Di svalutazione nei primi 12 mesi. Un capitale che si erode in silenzio.' },
];

function AnimatedStat({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const { count, ref } = useCounter(stat.target, 2000);
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.9, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }} className="py-12 md:py-16 md:pr-12 border-b md:border-b-0 md:border-r last:border-r-0 last:border-b-0 border-border">
      <div className="flex items-baseline gap-1 mb-5">
        <span className="text-[clamp(3.5rem,7vw,5.5rem)] font-extrabold text-foreground leading-none tracking-[-0.04em] tabular-nums font-sans">
          {stat.prefix}{count.toLocaleString('it-IT')}{stat.suffix}
        </span>
        <span className="text-xl md:text-2xl font-medium text-muted-foreground font-sans">{stat.unit}</span>
      </div>
      <p className="text-muted-foreground text-sm leading-relaxed max-w-xs font-sans">{stat.description}</p>
    </motion.div>
  );
}

export function ProblemSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'center center'] });
  const lineWidth = useTransform(scrollYProgress, [0, 0.8], ['0%', '100%']);

  return (
    <section ref={sectionRef} id="problem-section" className="py-24 md:py-40 bg-background font-sans relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <div className="max-w-4xl mb-16 md:mb-24">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="flex items-center gap-3 mb-8">
            <div className="h-px w-8 bg-accent" />
            <span className="text-accent text-[10px] font-semibold tracking-[0.25em] uppercase font-sans">Il problema</span>
          </motion.div>
          <motion.h2 variants={lineRevealContainer} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-[clamp(2.2rem,5.5vw,4.5rem)] font-extrabold text-foreground leading-[1] tracking-[-0.03em] font-sans">
            <motion.span variants={lineReveal} className="block">La tua auto ti costa,</motion.span>
            <motion.span variants={lineReveal} className="block text-muted-foreground">anche quando non la usi.</motion.span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-0 border-t border-border">
          {stats.map((stat, i) => <AnimatedStat key={i} stat={stat} index={i} />)}
        </div>

        <div className="mt-16 md:mt-24 pt-10 relative">
          <motion.div className="absolute top-0 left-0 h-px bg-accent" style={{ width: lineWidth }} />
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
            <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-snug max-w-3xl font-sans">
              E se potessi <span className="text-accent">azzerare queste spese</span>?
            </p>
            <p className="text-muted-foreground text-lg mt-5 max-w-xl leading-relaxed font-sans">Con Share2Go trasformi un costo fisso in una fonte di reddito. Reale, misurabile.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
