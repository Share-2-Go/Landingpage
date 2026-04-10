import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { smoothScrollTo } from '../utils/smoothScroll';
import { DriverLeadForm } from './DriverLeadForm';
import { wordRevealContainer, wordReveal } from '../utils/animations';

interface DriverHeroProps { onSwitchToOwner?: () => void; }

export function DriverHero({ onSwitchToOwner }: DriverHeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 0.5], ['0%', '10%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const headlineWords = "Noleggia un'auto vicino a te.".split(' ');

  return (
    <div ref={ref} className="relative bg-background font-sans overflow-hidden">
      <div className="relative z-10 flex flex-col">
        <motion.div style={{ y: textY, opacity: textOpacity }} className="flex-1 flex flex-col justify-center max-w-[1200px] mx-auto w-full px-6 lg:px-10 pt-28 lg:pt-32 pb-16 lg:pb-24 lg:min-h-[100dvh]">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-20 items-center">
            <div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.2 }} className="flex items-center gap-3 mb-8">
                <motion.div initial={{ width: 0 }} animate={{ width: 32 }} transition={{ duration: 1, delay: 0.5 }} className="h-px bg-accent" />
                <span className="text-accent text-[11px] font-semibold tracking-[0.25em] uppercase font-sans">Carsharing P2P</span>
              </motion.div>
              <motion.h1 variants={wordRevealContainer} initial="hidden" animate="show" className="text-[clamp(2.8rem,7vw,5.5rem)] font-extrabold text-foreground leading-[0.92] tracking-[-0.04em] mb-8 font-sans" style={{ perspective: '800px' }}>
                {headlineWords.map((word, i) => <motion.span key={i} variants={wordReveal} className={`inline-block mr-[0.25em] ${i >= 3 ? 'text-muted-foreground' : ''}`}>{word}</motion.span>)}
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 30, filter: 'blur(4px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 1, delay: 0.6 }} className="text-muted-foreground text-lg lg:text-xl leading-relaxed max-w-lg mb-8 font-sans">
                Auto private condivise dai tuoi vicini. <span className="text-foreground font-medium">Prenoti in 2 minuti</span>, senza file — con Kasko inclusa.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.9 }} className="flex flex-wrap gap-x-6 gap-y-3">
                {['Conferma istantanea', 'Kasko inclusa', '49% meno caro'].map((label, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span className="text-xs font-medium text-muted-foreground font-sans">{label}</span>
                  </div>
                ))}
              </motion.div>
            </div>
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.5 }} id="driver-lead-form" className="w-full max-w-md mx-auto lg:ml-auto">
              <DriverLeadForm />
            </motion.div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="pb-10 justify-center hidden lg:flex">
          <motion.button onClick={() => smoothScrollTo('press-section', 800)} animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"><ArrowDown className="w-5 h-5" /></motion.button>
        </motion.div>
      </div>
    </div>
  );
}