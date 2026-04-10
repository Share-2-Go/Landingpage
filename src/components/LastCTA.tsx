import React, { useState, useRef } from 'react';
import { Loader2, Zap, CheckCircle2 } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { wordRevealContainer, wordReveal } from '../utils/animations';

// Legge il parametro ?ref= dall'URL corrente
function getReferral(): string {
  try {
    const params = new URLSearchParams(window.location.search);
    return params.get('ref') || '';
  } catch {
    return '';
  }
}

export function LastCTA() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const textY = useTransform(scrollYProgress, [0.3, 0.7], ['20px', '-20px']);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const referral = getReferral();

    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-3061b741/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({
          first_name: '',
          last_name: '',
          email,
          phone: '',
          city: '',
          source: referral ? `ref:${referral}` : 'organic',
        })
      });

      if (response.ok) {
        setSuccess(true);
      } else {
        const data = await response.json().catch(() => ({}));
        if (data.code === '23505' || data.message?.includes('duplicate key')) {
          setSuccess(true);
        } else {
          setError(data.error || data.message || 'Errore.');
        }
      }
    } catch {
      setError('Errore di connessione.');
    } finally {
      setLoading(false);
    }
  };

  const words = "La tua auto puo lavorare per te.".split(' ');

  return (
    <section ref={ref} className="relative py-24 md:py-40 overflow-hidden font-sans bg-secondary">
      <motion.div style={{ y: textY }} className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-10">
        {success ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md mx-auto">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }} className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6"><CheckCircle2 className="w-8 h-8 text-accent" /></motion.div>
            <h2 className="text-2xl font-bold text-secondary-foreground mb-3 font-sans">Perfetto, ci sei!</h2>
            <p className="text-secondary-foreground/45 text-base font-sans">Ti avviseremo appena saremo live.</p>
          </motion.div>
        ) : (
          <div className="max-w-3xl">
            <motion.h2 variants={wordRevealContainer} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-[clamp(2.5rem,7vw,5.5rem)] font-extrabold text-secondary-foreground leading-[0.95] tracking-[-0.03em] mb-6 font-sans" style={{ perspective: '800px' }}>
              {words.map((word, i) => (<motion.span key={i} variants={wordReveal} className={`inline-block mr-[0.25em] ${i >= 5 ? 'text-accent' : ''}`}>{word}</motion.span>))}
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="text-secondary-foreground/35 text-lg mb-10 max-w-md font-sans">Iscriviti adesso. In 10 secondi.</motion.p>
            <motion.form initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.6 }} onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="La tua email" className="flex-1 bg-white/[0.06] border border-white/[0.1] rounded-lg px-5 py-3.5 text-sm text-secondary-foreground placeholder:text-secondary-foreground/30 font-medium focus:border-accent focus:outline-none transition-all duration-300 font-sans" />
              <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="bg-white text-secondary font-bold px-7 py-3.5 rounded-lg text-sm cursor-pointer disabled:opacity-50 whitespace-nowrap hover:bg-white/90 transition-colors font-sans">
                <span className="flex items-center gap-2">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <><Zap className="w-4 h-4" />Avvisami</>}</span>
              </motion.button>
            </motion.form>
            {error && <p className="text-sm text-destructive mt-3 font-sans">{error}</p>}
            <p className="text-[10px] text-secondary-foreground/20 mt-4 font-sans">Zero spam. Solo l'avviso del lancio.</p>
          </div>
        )}
      </motion.div>
    </section>
  );
}