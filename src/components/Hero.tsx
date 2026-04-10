import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Loader2, CheckCircle2, Users, Zap, ArrowDown } from 'lucide-react';
import { smoothScrollTo } from '../utils/smoothScroll';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { useCounter } from '../utils/useAnimations';
import { wordRevealContainer, wordReveal } from '../utils/animations';

const ITALIAN_PROVINCES = [
  "Agrigento","Alessandria","Ancona","Aosta","Arezzo","Ascoli Piceno","Asti","Avellino","Bari","Barletta-Andria-Trani","Belluno","Benevento","Bergamo","Biella","Bologna","Bolzano","Brescia","Brindisi","Cagliari","Caltanissetta","Campobasso","Carbonia-Iglesias","Caserta","Catania","Catanzaro","Chieti","Como","Cosenza","Cremona","Crotone","Cuneo","Enna","Fermo","Ferrara","Firenze","Foggia","Forlì-Cesena","Frosinone","Genova","Gorizia","Grosseto","Imperia","Isernia","La Spezia","L'Aquila","Latina","Lecce","Lecco","Livorno","Lodi","Lucca","Macerata","Mantova","Massa-Carrara","Matera","Medio Campidano","Messina","Milano","Modena","Monza e della Brianza","Napoli","Novara","Nuoro","Oristano","Padova","Palermo","Parma","Pavia","Perugia","Pesaro e Urbino","Pescara","Piacenza","Pisa","Pistoia","Pordenone","Potenza","Prato","Ragusa","Ravenna","Reggio Calabria","Reggio Emilia","Rieti","Rimini","Roma","Rovigo","Salerno","Sassari","Savona","Siena","Siracusa","Sondrio","Taranto","Teramo","Terni","Torino","Trapani","Trento","Treviso","Trieste","Udine","Varese","Venezia","Verbano-Cusio-Ossola","Vercelli","Verona","Vibo Valentia","Vicenza","Viterbo"
];

const inputClass = "w-full bg-input-background border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground font-medium focus:border-accent focus:outline-none transition-all duration-300 font-sans";

function getReferral(): string {
  try {
    const params = new URLSearchParams(window.location.search);
    return params.get('ref') || '';
  } catch {
    return '';
  }
}

export function Hero() {
  const [formData, setFormData] = useState({ first_name: '', last_name: '', email: '', city: '', car_model: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const { count, ref: counterRef } = useCounter(1247, 2500);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 0.5], ['0%', '10%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const referral = getReferral();
    const source = referral ? `ref:${referral}` : 'organic';

    try {
      const submitData = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        phone: '',
        city: `${formData.city} (Auto: ${formData.car_model})`,
        source,
      };

      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-3061b741/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${publicAnonKey}` },
        body: JSON.stringify(submitData),
      });

      if (response.ok) {
        setSuccess(true);
      } else {
        const data = await response.json().catch(() => ({}));
        if (data.code === '23505' || data.message?.includes('duplicate key')) {
          setSuccess(true);
        } else {
          setError(data.error || data.message || 'Si è verificato un errore.');
        }
      }
    } catch {
      setError('Errore di connessione.');
    } finally {
      setLoading(false);
    }
  };

  const headlineWords = "La tua auto, una risorsa.".split(' ');

  return (
    <div ref={containerRef} className="relative bg-background font-sans overflow-hidden">
      <div className="relative z-10 flex flex-col">
        <div className="flex-1 flex flex-col justify-center max-w-[1200px] mx-auto w-full px-6 lg:px-10 pt-28 lg:pt-32 pb-16 lg:pb-24 lg:min-h-[100dvh]">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-20 items-center">
            <motion.div style={{ y: textY, opacity: textOpacity }}>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.2 }} className="flex items-center gap-3 mb-8">
                <motion.div initial={{ width: 0 }} animate={{ width: 32 }} transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }} className="h-px bg-accent" />
                <span className="text-accent text-[11px] font-semibold tracking-[0.25em] uppercase font-sans">Peer-to-peer carsharing</span>
              </motion.div>
              <motion.h1 variants={wordRevealContainer} initial="hidden" animate="show" className="text-[clamp(2.8rem,7vw,5.5rem)] font-extrabold text-foreground leading-[0.92] tracking-[-0.04em] mb-8 font-sans" style={{ perspective: '800px' }}>
                {headlineWords.map((word, i) => (
                  <motion.span key={i} variants={wordReveal} className={`inline-block mr-[0.25em] ${i >= 4 ? 'text-muted-foreground' : ''}`}>{word}</motion.span>
                ))}
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 30, filter: 'blur(4px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }} className="text-muted-foreground text-lg lg:text-xl leading-relaxed max-w-lg mb-10 font-sans">
                Condividila quando non la usi. <span className="text-foreground font-medium">Guadagna fino a 600€/mese</span>, con copertura Kasko su ogni viaggio.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.9 }} className="flex flex-wrap gap-x-6 gap-y-3 mb-10">
                {[{ label: 'Kasko inclusa' }, { label: 'Pagamenti ogni 15gg' }, { label: 'Classe di merito protetta' }].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span className="text-xs font-medium text-muted-foreground font-sans">{item.label}</span>
                  </div>
                ))}
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.1 }}>
                <motion.button onClick={() => smoothScrollTo('earnings-calculator', 1200)} className="group relative overflow-hidden px-7 py-3.5 rounded-full border border-border hover:border-foreground/20 transition-colors cursor-pointer">
                  <span className="relative flex items-center gap-3 text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors font-sans">
                    Scopri quanto puoi guadagnare
                    <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
                  </span>
                </motion.button>
              </motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }} className="w-full max-w-md mx-auto lg:ml-auto">
              {success ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="border border-border rounded-2xl p-8 text-center">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }} className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8 text-accent" />
                  </motion.div>
                  <h2 className="text-2xl font-bold text-foreground mb-3 font-sans">Sei nella lista.</h2>
                  <p className="text-muted-foreground mb-6 text-sm leading-relaxed font-sans">Ti avviseremo con anticipo prima del lancio nella tua zona.</p>
                  <button onClick={() => window.location.reload()} className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer font-sans">Torna alla Home</button>
                </motion.div>
              ) : (
                <div ref={counterRef} className="relative border border-border rounded-2xl p-6 lg:p-8 overflow-hidden">
                  <div className="relative">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                        </span>
                        <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest font-sans">Waitlist aperta</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Users className="w-3 h-3" />
                        <span className="text-[10px] font-medium font-sans"><span className="text-foreground tabular-nums">{count.toLocaleString('it-IT')}</span> iscritti</span>
                      </div>
                    </div>
                    <h2 className="text-lg font-bold text-foreground mb-1 tracking-tight font-sans">Inizia a guadagnare.</h2>
                    <p className="text-[13px] text-muted-foreground mb-6 font-sans">Bonus esclusivi per i primi 100 owner della tua citta.</p>
                    <form className="space-y-3" onSubmit={handleSubmit}>
                      <div className="grid grid-cols-2 gap-3">
                        <input id="first_name" value={formData.first_name} onChange={handleChange} required placeholder="Nome" className={inputClass} />
                        <input id="last_name" value={formData.last_name} onChange={handleChange} required placeholder="Cognome" className={inputClass} />
                      </div>
                      <input type="email" id="email" value={formData.email} onChange={handleChange} required placeholder="Email" className={inputClass} />
                      <div className="grid grid-cols-2 gap-3">
                        <select id="city" value={formData.city} onChange={handleChange} required className={`${inputClass} appearance-none cursor-pointer`}>
                          <option value="" disabled>Provincia</option>
                          {ITALIAN_PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                        <input id="car_model" value={formData.car_model} onChange={handleChange} required placeholder="Es. Fiat 500" className={inputClass} />
                      </div>
                      {error && <p className="text-sm text-destructive text-center font-sans">{error}</p>}
                      <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} className="w-full bg-foreground text-background font-bold py-3.5 rounded-lg text-sm cursor-pointer disabled:opacity-50 mt-1 hover:opacity-90 transition-opacity font-sans">
                        <span className="flex items-center justify-center gap-2">
                          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <><Zap className="w-4 h-4" />Iscriviti alla waitlist</>}
                        </span>
                      </motion.button>
                    </form>
                    <p className="text-[10px] text-muted-foreground text-center mt-4 font-sans">Zero spam. Cancellazione in un click.</p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="pb-10 flex justify-center hidden lg:flex">
          <motion.button onClick={() => smoothScrollTo('press-section', 800)} animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
            <ArrowDown className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}