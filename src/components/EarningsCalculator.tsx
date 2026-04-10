import React, { useState, useEffect } from 'react';
import { Loader2, Car, Banknote, ChevronDown } from "lucide-react";
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { motion } from 'motion/react';

interface CarModel { brand: string; models: string[]; }
interface EarningsResult { monthly: number; yearly: number; currency: string; vehicle?: { brand?: string; model: string; year: number; }; }

const inputClass = "w-full bg-input-background border border-border rounded-lg px-4 py-3.5 text-sm text-foreground focus:border-accent focus:outline-none transition-all duration-300 appearance-none cursor-pointer font-sans";

export function EarningsCalculator({ onCtaClick }: { onCtaClick?: () => void }) {
  const [brands, setBrands] = useState<CarModel[]>([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<EarningsResult | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`https://${projectId}.supabase.co/functions/v1/make-server-3061b741/car-models`, {
      headers: { 'Authorization': `Bearer ${publicAnonKey}` }
    }).then(res => res.json()).then(data => setBrands(data)).catch(err => console.error(err));
  }, []);

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBrand || !selectedModel) return;
    setLoading(true); setError('');
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-3061b741/calculate-earnings`, {
        method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${publicAnonKey}` },
        body: JSON.stringify({ brand: selectedBrand, model: selectedModel })
      });
      const data = await response.json();
      if (data.success) { setResult({ ...data.data, vehicle: { brand: selectedBrand, model: selectedModel, year: new Date().getFullYear() } }); }
      else { setError('Errore nel calcolo. Riprova.'); }
    } catch { setError('Si è verificato un errore.'); } finally { setLoading(false); }
  };

  const availableModels = brands.find(b => b.brand === selectedBrand)?.models || [];

  if (result) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative border border-border rounded-2xl p-8 text-center overflow-hidden">
        <div className="relative">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, delay: 0.2 }} className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Banknote className="w-7 h-7 text-accent" />
          </motion.div>
          <h3 className="text-lg font-bold text-foreground mb-1 font-sans">Potenziale di guadagno</h3>
          <p className="text-muted-foreground text-sm mb-8 font-sans">{result.vehicle?.brand} {result.vehicle?.model}</p>
          <div className="bg-input-background border border-border rounded-xl p-6 mb-4">
            <p className="text-muted-foreground text-[10px] font-semibold uppercase tracking-[0.2em] mb-2 font-sans">Mensile</p>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-5xl font-extrabold text-foreground tracking-[-0.03em] font-sans">{result.monthly}<span className="text-xl text-muted-foreground">{result.currency}</span></motion.p>
          </div>
          <p className="text-muted-foreground text-sm mb-8 font-sans">fino a <span className="text-foreground font-bold">{result.yearly}{result.currency}</span> all'anno</p>
          <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} onClick={onCtaClick} className="w-full bg-foreground text-background font-bold py-3.5 rounded-lg text-sm cursor-pointer mb-3 hover:opacity-90 transition-opacity font-sans">Iscriviti in lista d'attesa</motion.button>
          <button onClick={() => setResult(null)} className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer font-sans">Calcola per un'altra auto</button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="relative border border-border rounded-2xl p-6 lg:p-8 overflow-hidden">
      <div className="relative">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-11 h-11 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
            <Car className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground leading-tight tracking-tight font-sans">Quanto vale la tua auto?</h3>
            <p className="text-[11px] text-muted-foreground font-sans">Database ACI aggiornato</p>
          </div>
        </div>
        <form onSubmit={handleCalculate} className="space-y-4">
          <div>
            <label className="block text-[10px] font-semibold text-muted-foreground mb-2 uppercase tracking-[0.2em] font-sans">Marca</label>
            <div className="relative">
              <select value={selectedBrand} onChange={(e) => { setSelectedBrand(e.target.value); setSelectedModel(''); }} required className={inputClass}>
                <option value="">Seleziona Marca</option>
                {brands.map(b => <option key={b.brand} value={b.brand}>{b.brand}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-muted-foreground mb-2 uppercase tracking-[0.2em] font-sans">Modello</label>
            <div className="relative">
              <select value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)} disabled={!selectedBrand} required className={`${inputClass} disabled:opacity-20`}>
                <option value="">Seleziona Modello</option>
                {availableModels.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>
          {error && <p className="text-sm text-destructive text-center font-sans">{error}</p>}
          <motion.button type="submit" disabled={loading || !selectedBrand || !selectedModel} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} className="w-full bg-foreground text-background font-bold py-3.5 rounded-lg text-sm cursor-pointer disabled:opacity-20 mt-2 hover:opacity-90 transition-opacity font-sans">
            {loading ? <Loader2 className="mx-auto w-5 h-5 animate-spin" /> : "Calcola Guadagno"}
          </motion.button>
        </form>
        <p className="text-[10px] text-center text-muted-foreground mt-6 font-sans">*Stime basate su tabelle ACI 2024 e dati medi di condivisione.</p>
      </div>
    </div>
  );
}
