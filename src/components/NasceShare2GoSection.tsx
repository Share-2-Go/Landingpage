import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import phoneAppImg from "figma:asset/c1d8769b7af4de099fc34d52ef9908495b7fa6dd.png";
import { lineRevealContainer, lineReveal, fadeUp, stagger } from '../utils/animations';

const features = [
  { num: '01', title: 'Tecnologia Keyless', text: 'Il driver apre l\'auto dall\'app. Il proprietario monitora tutto da remoto.' },
  { num: '02', title: 'Sicurezza certificata', text: 'Copertura Kasko inclusa su ogni viaggio. La tua classe di merito resta intoccata.' },
  { num: '03', title: 'Controllo totale', text: 'Chat, dashboard guadagni, stato del veicolo in tempo reale. Tutto in una app.' },
];

export function NasceShare2GoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const phoneY = useTransform(scrollYProgress, [0, 1], ['8%', '-8%']);
  const phoneScale = useTransform(scrollYProgress, [0, 0.5], [0.92, 1]);

  return (
    <section ref={sectionRef} className="py-24 md:py-40 bg-background font-sans overflow-hidden relative border-t border-border">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 relative">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-accent" />
              <span className="text-accent text-[10px] font-semibold tracking-[0.25em] uppercase font-sans">La piattaforma</span>
            </motion.div>
            <motion.h2 variants={lineRevealContainer} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-[clamp(2.2rem,5.5vw,4.5rem)] font-extrabold text-foreground leading-[1] tracking-[-0.03em] mb-6 font-sans">
              <motion.span variants={lineReveal} className="block">Nasce</motion.span>
              <motion.span variants={lineReveal} className="block text-accent">Share2Go.</motion.span>
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.8 }} className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-lg font-sans">
              Connettiamo chi ha un'auto ferma a chi ne ha bisogno. Non e solo un car-sharing: e una nuova forma di mobilita dove <span className="text-foreground">tutti ci guadagnano</span>.
            </motion.p>
            <motion.div variants={stagger(0.4, 0.12)} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-0">
              {features.map((f, i) => (
                <motion.div key={i} variants={fadeUp} whileHover={{ x: 8, transition: { type: 'spring', stiffness: 300, damping: 25 } }} className="group flex gap-6 p-5 -mx-5 rounded-xl hover:bg-muted transition-all duration-500 cursor-default relative">
                  <div className="relative shrink-0 w-12 h-12 rounded-xl border border-border flex items-center justify-center transition-all duration-500 group-hover:border-accent/30">
                    <span className="text-accent font-extrabold text-base font-sans">{f.num}</span>
                  </div>
                  <div className="relative pt-1">
                    <h3 className="text-foreground font-bold text-base mb-1.5 font-sans group-hover:text-accent transition-colors duration-500">{f.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed font-sans">{f.text}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.2 }} className="flex justify-center lg:justify-end">
            <motion.div style={{ y: phoneY, scale: phoneScale }} className="relative w-full max-w-[420px]">
              <ImageWithFallback src={phoneAppImg} alt="Share2Go App" className="relative w-full h-auto object-contain drop-shadow-2xl mt-16" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}