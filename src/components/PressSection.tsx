import React from 'react';
import { motion } from 'motion/react';

const pressLogos = [
  { name: 'Amazon', display: 'Amazon' },
  { name: 'StartupItalia', display: 'StartupItalia' },
  { name: 'EconomyUp', display: 'EconomyUp' },
  { name: 'Arena Digitale', display: 'Arena Digitale' },
  { name: 'La Sicilia', display: 'La Sicilia' },
  { name: 'Il Mediterraneo', display: 'Il Mediterraneo 24' },
  { name: 'Starting Finance', display: 'Starting Finance' },
];

function LogoMarquee({ reverse = false }: { reverse?: boolean }) {
  const items = [...pressLogos, ...pressLogos, ...pressLogos, ...pressLogos];
  return (
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <motion.div
        className="flex items-center gap-16 whitespace-nowrap"
        animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        {items.map((logo, i) => (
          <span
            key={i}
            className="shrink-0 text-[clamp(0.75rem,1.2vw,0.875rem)] font-bold uppercase tracking-[0.2em] text-foreground/[0.08] select-none hover:text-accent/30 transition-colors duration-700 font-sans"
          >
            {logo.display}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function PressSection() {
  return (
    <section
      id="press-section"
      className="py-8 md:py-10 bg-background font-sans border-t border-b border-border relative overflow-hidden"
    >
      <div className="relative space-y-4">
        <LogoMarquee />
        <LogoMarquee reverse />
      </div>
    </section>
  );
}
