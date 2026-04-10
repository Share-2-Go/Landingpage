import React, { useState } from 'react';
import { Loader2, CheckCircle2, ChevronDown, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

const ITALIAN_PROVINCES = ["Agrigento","Alessandria","Ancona","Aosta","Arezzo","Ascoli Piceno","Asti","Avellino","Bari","Barletta-Andria-Trani","Belluno","Benevento","Bergamo","Biella","Bologna","Bolzano","Brescia","Brindisi","Cagliari","Caltanissetta","Campobasso","Carbonia-Iglesias","Caserta","Catania","Catanzaro","Chieti","Como","Cosenza","Cremona","Crotone","Cuneo","Enna","Fermo","Ferrara","Firenze","Foggia","Forlì-Cesena","Frosinone","Genova","Gorizia","Grosseto","Imperia","Isernia","La Spezia","L'Aquila","Latina","Lecce","Lecco","Livorno","Lodi","Lucca","Macerata","Mantova","Massa-Carrara","Matera","Medio Campidano","Messina","Milano","Modena","Monza e della Brianza","Napoli","Novara","Nuoro","Oristano","Padova","Palermo","Parma","Pavia","Perugia","Pesaro e Urbino","Pescara","Piacenza","Pisa","Pistoia","Pordenone","Potenza","Prato","Ragusa","Ravenna","Reggio Calabria","Reggio Emilia","Rieti","Rimini","Roma","Rovigo","Salerno","Sassari","Savona","Siena","Siracusa","Sondrio","Taranto","Teramo","Terni","Torino","Trapani","Trento","Treviso","Trieste","Udine","Varese","Venezia","Verbano-Cusio-Ossola","Vercelli","Verona","Vibo Valentia","Vicenza","Viterbo"];

const inputClass = "w-full bg-input-background border border-border rounded-lg px-4 py-3.5 text-sm text-foreground focus:border-accent focus:outline-none transition-all duration-300 appearance-none cursor-pointer font-sans";

function getReferral(): string {
  try {
    const params = new URLSearchParams(window.location.search);
    return params.get('ref') || '';
  } catch {
    return '';
  }
}

export function DriverLeadForm() {
  const [formData, setFormData] = useState({ first_name: '', last_name: '', email: '', city: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

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
      const res = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-3061b741/join-waitlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${publicAnonKey}` },
        body: JSON.stringify({
          name: formData.first_name,
          lastname: formData.last_name,
          email: formData.email,
          phone: '',
          city: formData.city,
          role: 'driver',
          vehicle_model: '',
          source,
        }),
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

  if (success) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="border border-border rounded-2xl p-8 text-center min-h-[300px] flex flex-col items-center justify-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }} className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-5"><CheckCircle2 className="w-8 h-8 text-accent" /></motion.div>
        <h2 className="text-xl font-bold text-foreground mb-2 font-sans">Ci sei!</h2>
        <p className="text-muted-foreground text-sm leading-relaxed max-w-xs font-sans">Ti avviseremo appena Share2Go è attivo nella tua zona.</p>
      </motion.div>
    );
  }

  return (
    <div className="relative border border-border rounded-2xl p-6 lg:p-8 overflow-hidden">
      <div className="relative">
        <h2 className="text-lg font-bold text-foreground mb-1 tracking-tight font-sans">Avvisami al lancio.</h2>
        <p className="text-[13px] text-muted-foreground mb-6 font-sans">Ottieni accesso prioritario nella tua citta.</p>
        <form className="space-y-3" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-3">
            <input id="first_name" value={formData.first_name} onChange={handleChange} required placeholder="Nome" className={inputClass} />
            <input id="last_name" value={formData.last_name} onChange={handleChange} required placeholder="Cognome" className={inputClass} />
          </div>
          <input type="email" id="email" value={formData.email} onChange={handleChange} required placeholder="Email" className={inputClass} />
          <div className="relative">
            <select id="city" value={formData.city} onChange={handleChange} required className={`${inputClass} appearance-none cursor-pointer`}>
              <option value="" disabled>Provincia</option>
              {ITALIAN_PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
          {error && <p className="text-sm text-destructive text-center font-sans">{error}</p>}
          <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} className="w-full bg-foreground text-background font-bold py-3.5 rounded-lg text-sm cursor-pointer disabled:opacity-50 mt-1 hover:opacity-90 transition-opacity font-sans">
            <span className="flex items-center justify-center gap-2">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <><Zap className="w-4 h-4" />Avvisami al lancio</>}</span>
          </motion.button>
        </form>
        <p className="text-[10px] text-muted-foreground text-center mt-4 font-sans">Zero spam, cancellazione in un click.</p>
      </div>
    </div>
  );
}