import React, { useState } from 'react';
import { Loader2, CheckCircle2, ChevronDown, Users, Zap, Star, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { useCounter } from '../utils/useAnimations';
import { lineRevealContainer, lineReveal } from '../utils/animations';

const ITALIAN_PROVINCES = ["Agrigento","Alessandria","Ancona","Aosta","Arezzo","Ascoli Piceno","Asti","Avellino","Bari","Barletta-Andria-Trani","Belluno","Benevento","Bergamo","Biella","Bologna","Bolzano","Brescia","Brindisi","Cagliari","Caltanissetta","Campobasso","Carbonia-Iglesias","Caserta","Catania","Catanzaro","Chieti","Como","Cosenza","Cremona","Crotone","Cuneo","Enna","Fermo","Ferrara","Firenze","Foggia","Forlì-Cesena","Frosinone","Genova","Gorizia","Grosseto","Imperia","Isernia","La Spezia","L'Aquila","Latina","Lecce","Lecco","Livorno","Lodi","Lucca","Macerata","Mantova","Massa-Carrara","Matera","Medio Campidano","Messina","Milano","Modena","Monza e della Brianza","Napoli","Novara","Nuoro","Oristano","Padova","Palermo","Parma","Pavia","Perugia","Pesaro e Urbino","Pescara","Piacenza","Pisa","Pistoia","Pordenone","Potenza","Prato","Ragusa","Ravenna","Reggio Calabria","Reggio Emilia","Rieti","Rimini","Roma","Rovigo","Salerno","Sassari","Savona","Siena","Siracusa","Sondrio","Taranto","Teramo","Terni","Torino","Trapani","Trento","Treviso","Trieste","Udine","Varese","Venezia","Verbano-Cusio-Ossola","Vercelli","Verona","Vibo Valentia","Vicenza","Viterbo"];

const inputClass = "w-full bg-input-background border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground font-medium focus:border-accent focus:outline-none transition-all duration-300 font-sans";

function getReferral(): string {
  try {
    const params = new URLSearchParams(window.location.search);
    return params.get('ref') || '';
  } catch {
    return '';
  }
}

export function LeadMagnetSection() {
  const [formData, setFormData] = useState({ first_name: '', last_name: '', email: '', city: '', car_model: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const { count, ref: counterRef } = useCounter(1247, 2500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const key = e.target.id.replace('lead_', '');
    setFormData(prev => ({ ...prev, [key]: e.target.value }));
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

  if (success) {
    return (
      <section id="lead-form" className="py-28 md:py-44 bg-background border-t border-border">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md mx-auto px-6 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }} className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6"><CheckCircle2 className="w-8 h-8 text-accent" /></motion.div>
          <h2 className="text-2xl font-bold text-foreground mb-3 font-sans">Sei nella lista.</h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-6 font-sans">Ti avviseremo con anticipo prima del lancio. Controlla la tua inbox.</p>
          <button onClick={() => window.location.reload()} className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer font-sans">Torna alla Home</button>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="lead-form" className="py-24 md:py-40 bg-background font-sans border-t border-border relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 relative">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">
          <div>
            <motion.h2 variants={lineRevealContainer} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-[clamp(2rem,5vw,4rem)] font-extrabold text-foreground leading-[1.02] tracking-[-0.03em] mb-6 font-sans">
              <motion.span variants={lineReveal} className="block">Non perdere il lancio</motion.span>
              <motion.span variants={lineReveal} className="block text-muted-foreground">nella tua citta.</motion.span>
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-lg font-sans">Stiamo arrivando in tutta Italia. I primi 100 owner per citta ricevono bonus esclusivi.</motion.p>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="space-y-4">
              {[
                { icon: Star, text: 'Accesso Prioritario alla piattaforma' },
                { icon: ShieldCheck, text: 'Assistenza Premium dedicata per 3 mesi' },
              ].map((item, i) => (
                <motion.div key={i} whileHover={{ x: 4 }} className="flex items-center gap-4 group cursor-default">
                  <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <item.icon className="w-4 h-4 text-accent" />
                  </div>
                  <span className="text-foreground/60 text-sm font-medium group-hover:text-foreground transition-colors font-sans">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }}>
            <div ref={counterRef} className="relative border border-border rounded-2xl p-6 lg:p-8 overflow-hidden">
              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" /><span className="relative inline-flex rounded-full h-2 w-2 bg-accent" /></span>
                    <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest font-sans">Waitlist aperta</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Users className="w-3 h-3" />
                    <span className="text-[10px] font-medium font-sans"><span className="text-foreground tabular-nums">{count.toLocaleString('it-IT')}</span> iscritti</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-1 tracking-tight font-sans">Unisciti alla Waiting List</h3>
                <p className="text-[13px] text-muted-foreground mb-6 font-sans">Meno di 1 minuto. Bonus garantito.</p>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input id="lead_first_name" value={formData.first_name} onChange={handleChange} placeholder="Nome" required className={inputClass} />
                    <input id="lead_last_name" value={formData.last_name} onChange={handleChange} placeholder="Cognome" required className={inputClass} />
                  </div>
                  <input id="lead_email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" required className={inputClass} />
                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative">
                      <select id="lead_city" value={formData.city} onChange={handleChange} required className={`${inputClass} appearance-none cursor-pointer`}>
                        <option value="" disabled>Provincia</option>
                        {ITALIAN_PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    </div>
                    <input id="lead_car_model" value={formData.car_model} onChange={handleChange} placeholder="Es. Fiat 500" required className={inputClass} />
                  </div>
                  {error && <p className="text-sm text-destructive text-center font-sans">{error}</p>}
                  <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} className="w-full bg-foreground text-background font-bold py-3.5 rounded-lg text-sm cursor-pointer disabled:opacity-50 mt-1 hover:opacity-90 transition-opacity font-sans">
                    <span className="flex items-center justify-center gap-2">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <><Zap className="w-4 h-4" />Iscriviti alla waitlist</>}</span>
                  </motion.button>
                </form>
                <p className="text-[10px] text-muted-foreground text-center mt-4 font-sans">Zero spam. Cancellazione in un click.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}