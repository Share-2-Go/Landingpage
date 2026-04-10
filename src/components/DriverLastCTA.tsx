import React, { useState } from 'react';
import { Loader2, Zap, CheckCircle2, Check } from 'lucide-react';
import { motion } from 'motion/react';
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

const benefits = ['10 euro di sconto sul primo noleggio', 'Accesso prioritario nella tua citta', 'Copertura Kasko inclusa', 'Prenotazione istantanea, zero file'];

export function DriverLastCTA() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const referral = getReferral();

    try {
      const res = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-3061b741/join-waitlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({
          name: '',
          lastname: '',
          email,
          phone: '',
          city: '',
          role: 'driver',
          vehicle_model: '',
          source: referral ? `ref:${referral}` : 'organic',
        })
      });

      if (res.ok) {
        setSuccess(true);
      } else {
        const data = await res.json().catch(() => ({}));
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

  const words = "Noleggia prima degli altri.".split(' ');

  return (
    <section className="py-24 md:py-40 bg-secondary font-sans relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 relative">
        {success ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md mx-auto">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }} className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6"><CheckCircle2 className="w-8 h-8 text-accent" /></motion.div>
            <h2 className="text-2xl font-bold text-secondary-foreground mb-3 font-sans">Ci sei!</h2>
            <p className="text-secondary-foreground/45 text-base font-sans">Ti avviseremo appena saremo live.</p>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div>
              <motion.h2 variants={wordRevealContainer} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-[clamp(2.2rem,5.5vw,4.5rem)] font-extrabold text-secondary-foreground leading-[0.95] tracking-[-0.03em] mb-2 font-sans" style={{ perspective: '800px' }}>
                {words.map((w, i) => <motion.span key={i} variants={wordReveal} className="inline-block mr-[0.25em]">{w}</motion.span>)}
              </motion.h2>
              <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="text-accent text-2xl md:text-3xl font-bold tracking-tight mb-8 font-sans">Con 10€ di sconto.</motion.p>
              <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="text-secondary-foreground/40 text-lg leading-relaxed mb-10 max-w-lg font-sans">Iscriviti alla lista d'attesa e ottieni accesso anticipato.</motion.p>
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.6 }} className="space-y-3">
                {benefits.map((b, i) => (
                  <motion.div key={i} whileHover={{ x: 4 }} className="flex items-center gap-3 group cursor-default">
                    <Check className="w-4 h-4 text-accent/50 shrink-0 group-hover:text-accent transition-colors" strokeWidth={2.5} />
                    <span className="text-secondary-foreground/50 text-sm group-hover:text-secondary-foreground/70 transition-colors font-sans">{b}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.3 }} className="relative border border-white/[0.1] rounded-2xl p-6 lg:p-8 overflow-hidden">
              <div className="relative">
                <h3 className="text-lg font-bold text-secondary-foreground mb-1 tracking-tight font-sans">Entra nella lista d'attesa</h3>
                <p className="text-secondary-foreground/40 text-[13px] mb-6 font-sans">Inserisci la tua email — e tutto cio che serve.</p>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="La tua email" className="w-full bg-white/[0.06] border border-white/[0.1] rounded-lg px-5 py-3.5 text-sm text-secondary-foreground placeholder:text-secondary-foreground/30 font-medium focus:border-accent focus:outline-none transition-all duration-300 font-sans" />
                  <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} className="w-full bg-white text-secondary font-bold py-3.5 rounded-lg text-sm cursor-pointer disabled:opacity-50 hover:bg-white/90 transition-colors font-sans">
                    <span className="flex items-center justify-center gap-2">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <><Zap className="w-4 h-4" />Avvisami al lancio</>}</span>
                  </motion.button>
                </form>
                {error && <p className="text-sm text-destructive text-center mt-3 font-sans">{error}</p>}
                <p className="text-[10px] text-secondary-foreground/20 mt-4 text-center font-sans">Zero spam, cancellazione in un click.</p>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}