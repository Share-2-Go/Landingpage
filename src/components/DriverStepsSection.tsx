import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import requestStepImage from 'figma:asset/1af7ae61278ddec1cae8b2da899de80f6da3054a.png';
import driveStepImage from 'figma:asset/4e4577d63e5995658bae7ba1ebe676f0238293b0.png';

const searchImage = 'https://images.unsplash.com/photo-1771340184267-8cacc8afc2d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080';

const steps = [
  {
    number: '01',
    title: 'Cerca',
    description: 'Inserisci posizione, date e orari. I risultati mostrano le auto disponibili vicino a te, con prezzo trasparente gia inclusivo della commissione.',
    image: searchImage,
  },
  {
    number: '02',
    title: 'Prenota',
    description: 'Conferma istantanea — nessuna approvazione richiesta. Firmi digitalmente in-app con un codice SMS. La chat con il proprietario si apre in automatico.',
    image: requestStepImage,
  },
  {
    number: '03',
    title: 'Guida',
    description: '30 minuti prima si sblocca il check-in: il proprietario documenta lo stato dell\'auto con foto, tu verifichi e ritiri le chiavi. La copertura assicurativa e attiva.',
    image: driveStepImage,
  },
];

export function DriverStepsSection() {
  return (
    <section className="py-24 lg:py-40 bg-background font-sans border-t border-border">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-muted-foreground text-[10px] font-semibold tracking-[0.25em] uppercase mb-6 font-sans"
        >
          Come funziona
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-[clamp(2rem,5vw,4rem)] font-bold text-foreground leading-[1.05] tracking-tight mb-16 font-sans"
        >
          Tre passi
          <br />
          <span className="text-muted-foreground">per partire.</span>
        </motion.h2>

        <div className="space-y-16 lg:space-y-24">
          {steps.map((step, i) => (
            <StepItem key={i} step={step} index={i} reverse={i % 2 !== 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StepItem({ step, index, reverse }: { step: typeof steps[0]; index: number; reverse: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['5%', '-5%']);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`grid lg:grid-cols-2 gap-10 lg:gap-20 items-center ${reverse ? 'lg:direction-rtl' : ''}`}
    >
      <div className={`${reverse ? 'lg:order-2 lg:direction-ltr' : ''}`}>
        <span className="text-accent text-sm font-bold block mb-4 font-sans">{step.number}</span>
        <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight font-sans">{step.title}</h3>
        <p className="text-muted-foreground text-base leading-relaxed max-w-md font-sans">{step.description}</p>
      </div>

      <div className={`relative overflow-hidden rounded-xl aspect-[4/3] bg-muted ${reverse ? 'lg:order-1 lg:direction-ltr' : ''}`}>
        <motion.img
          src={step.image}
          alt={step.title}
          className="w-full h-full object-cover"
          style={{ y: imageY }}
        />
      </div>
    </motion.div>
  );
}
