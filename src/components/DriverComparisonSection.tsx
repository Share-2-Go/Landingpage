import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, X, ChevronDown, ChevronUp } from 'lucide-react';
import { lineRevealContainer, lineReveal } from '../utils/animations';

const rows = [
  { label: 'Dove ritiri l\'auto', share2go: 'Vicino a casa tua', traditional: 'In aeroporto o fuori citta' },
  { label: 'Conferma prenotazione', share2go: 'Istantanea — zero approvazioni', traditional: 'Fila al bancone (15-45 min)' },
  { label: 'Contratto', share2go: 'Firma digitale via SMS in-app', traditional: 'Documenti cartacei, firme multiple' },
  { label: 'Trasparenza del prezzo', share2go: 'Prezzo tutto incluso', traditional: 'Extra nascosti' },
  { label: 'Assicurazione', share2go: 'Kasko inclusa automaticamente', traditional: 'Spesso un extra separato' },
  { label: 'Impatto ambientale', share2go: 'Auto esistenti riutilizzate', traditional: 'Flotte nuove prodotte ad hoc' },
];

export function DriverComparisonSection() {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? rows : rows.slice(0, 4);

  return (
    <section className="py-24 md:py-40 bg-background font-sans border-t border-border">
      <div className="max-w-[1000px] mx-auto px-6 lg:px-10">
        <div className="max-w-xl mb-12">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="flex items-center gap-3 mb-8">
            <div className="h-px w-8 bg-muted-foreground" />
            <span className="text-muted-foreground text-[10px] font-semibold tracking-[0.25em] uppercase font-sans">Perche e diverso</span>
          </motion.div>
          <motion.h2 variants={lineRevealContainer} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-[clamp(2rem,4vw,3rem)] font-extrabold text-foreground leading-[1.05] tracking-[-0.03em] font-sans">
            <motion.span variants={lineReveal} className="block">Carsharing tra privati</motion.span>
            <motion.span variants={lineReveal} className="block text-muted-foreground">vs noleggio classico.</motion.span>
          </motion.h2>
        </div>

        <div className="border-t border-border">
          <div className="hidden md:grid grid-cols-3 border-b border-border">
            <div className="py-4" />
            <div className="py-4 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-sm font-bold text-foreground font-sans">Share2Go</span>
            </div>
            <div className="py-4">
              <span className="text-sm font-medium text-muted-foreground font-sans">Noleggio Classico</span>
            </div>
          </div>

          {visible.map((row, i) => (
            <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}>
              <div className="hidden md:grid grid-cols-3 border-b border-border py-5">
                <div className="text-sm font-medium text-foreground/50 font-sans">{row.label}</div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span className="text-sm text-foreground/60 font-sans">{row.share2go}</span>
                </div>
                <div className="flex items-start gap-2">
                  <X className="w-4 h-4 text-foreground/15 shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span className="text-sm text-foreground/25 font-sans">{row.traditional}</span>
                </div>
              </div>
              <div className="md:hidden border-b border-border py-5">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.2em] mb-3 font-sans">{row.label}</p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" strokeWidth={2.5} />
                    <span className="text-sm font-medium text-foreground/60 font-sans">{row.share2go}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <X className="w-4 h-4 text-foreground/15 shrink-0 mt-0.5" strokeWidth={2.5} />
                    <span className="text-sm text-foreground/25 font-sans">{row.traditional}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          <div className="py-4 flex justify-center border-b border-border">
            <button onClick={() => setExpanded(!expanded)} className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer font-sans">
              {expanded ? <><ChevronUp className="w-4 h-4" />Mostra meno</> : <><ChevronDown className="w-4 h-4" />Mostra tutte</>}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
