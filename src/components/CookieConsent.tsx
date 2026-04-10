import React, { useState, useEffect } from 'react';
import { Cookie, ChevronDown, ChevronUp } from 'lucide-react';

const COOKIE_KEY = 'share2go_cookie_consent';
type ConsentState = { necessary: boolean; analytics: boolean; marketing: boolean; };

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [consent, setConsent] = useState<ConsentState>({ necessary: true, analytics: false, marketing: false });

  useEffect(() => { const stored = localStorage.getItem(COOKIE_KEY); if (!stored) { const timer = setTimeout(() => setVisible(true), 800); return () => clearTimeout(timer); } }, []);

  const saveConsent = (state: ConsentState) => { localStorage.setItem(COOKIE_KEY, JSON.stringify({ ...state, timestamp: Date.now() })); setVisible(false); };
  const acceptAll = () => saveConsent({ necessary: true, analytics: true, marketing: true });
  const rejectOptional = () => saveConsent({ necessary: true, analytics: false, marketing: false });
  const savePreferences = () => saveConsent(consent);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-end justify-center pointer-events-none">
      <div className="absolute inset-0 bg-foreground/20 pointer-events-auto" />
      <div className="relative w-full max-w-xl mx-4 mb-6 pointer-events-auto animate-in slide-in-from-bottom duration-500">
        <div className="rounded-2xl border border-border bg-background shadow-2xl overflow-hidden">
          <div className="flex items-start gap-3 p-5 pb-3">
            <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
              <Cookie className="w-4 h-4 text-accent" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-foreground font-sans">Utilizziamo i cookie</h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed font-sans">Utilizziamo cookie per migliorare la tua esperienza, analizzare il traffico e personalizzare i contenuti.</p>
            </div>
          </div>
          <div className="px-5">
            <button onClick={() => setShowDetails(!showDetails)} className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer font-sans">
              {showDetails ? <>Nascondi <ChevronUp className="w-3.5 h-3.5" /></> : <>Gestisci preferenze <ChevronDown className="w-3.5 h-3.5" /></>}
            </button>
            {showDetails && (
              <div className="mt-3 space-y-2">
                {[
                  { key: 'necessary' as const, label: 'Cookie necessari', desc: 'Essenziali per il funzionamento', locked: true },
                  { key: 'analytics' as const, label: 'Cookie analitici', desc: 'Ci aiutano a capire come utilizzi il sito', locked: false },
                  { key: 'marketing' as const, label: 'Cookie di marketing', desc: 'Per contenuti personalizzati', locked: false },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-3 rounded-xl bg-muted">
                    <div>
                      <p className="text-xs font-medium text-foreground font-sans">{item.label}</p>
                      <p className="text-[11px] text-muted-foreground font-sans">{item.desc}</p>
                    </div>
                    <button onClick={() => !item.locked && setConsent(prev => ({ ...prev, [item.key]: !prev[item.key] }))} disabled={item.locked}
                      className={`w-10 h-[22px] rounded-full flex items-center px-0.5 transition-colors shrink-0 ml-4 ${consent[item.key] || item.locked ? 'bg-accent justify-end' : 'bg-switch-background justify-start'} ${item.locked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
                      <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 p-5 pt-4">
            {showDetails ? (
              <>
                <button onClick={savePreferences} className="flex-1 px-4 py-2.5 rounded-lg bg-foreground text-background text-xs font-bold hover:opacity-90 transition-opacity cursor-pointer font-sans">Salva preferenze</button>
                <button onClick={acceptAll} className="flex-1 px-4 py-2.5 rounded-lg border border-border text-muted-foreground text-xs font-medium hover:bg-muted transition-colors cursor-pointer font-sans">Accetta tutti</button>
              </>
            ) : (
              <>
                <button onClick={acceptAll} className="flex-1 px-4 py-2.5 rounded-lg bg-foreground text-background text-xs font-bold hover:opacity-90 transition-opacity cursor-pointer font-sans">Accetta tutti</button>
                <button onClick={rejectOptional} className="flex-1 px-4 py-2.5 rounded-lg border border-border text-muted-foreground text-xs font-medium hover:bg-muted transition-colors cursor-pointer font-sans">Solo necessari</button>
              </>
            )}
          </div>
          <div className="px-5 pb-4 -mt-1"><a href="#" className="text-[11px] text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2 font-sans">Privacy Policy</a></div>
        </div>
      </div>
    </div>
  );
}