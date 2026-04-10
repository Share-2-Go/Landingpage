import React from 'react';
import { ShieldCheck, UserCheck, Banknote, Clock } from 'lucide-react';
import exampleImage from 'figma:asset/a21175b01497de691acabd577079630c34be8c6f.png';

export function TrustSection() {
  const trustImage = exampleImage;
  
  return (
    <section id="trust-section" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Asymmetric Image with Floating Badge */}
          <div className="relative">
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[4/5] md:aspect-square lg:aspect-[4/5]">
              <img 
                src={trustImage} 
                alt="Happy driver" 
                className="w-full aspect-[4/5] object-cover hover:scale-105 transition-transform duration-700"
              />
              {/* Gradient Overlay for text contrast if needed */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
            </div>

            {/* Floating Badge */}
            <div className="absolute bottom-8 right-8 md:-right-8 bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-slate-100 max-w-xs animate-in slide-in-from-bottom-4 duration-1000 px-[26px] py-[17px] mx-[-21px] my-[0px]">
              <div className="flex items-center gap-4 mb-2">
                <div className="bg-green-100 p-2 rounded-full">
                  <ShieldCheck className="w-6 h-6 text-green-600" />
                </div>
                <span className="font-bold text-slate-900 text-lg">Copertura Totale</span>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ogni singolo chilometro è protetto dalla nostra assicurazione Kasko Premium inclusa.
              </p>
            </div>
          </div>

          {/* Right: Content */}
          <div className="lg:pl-8">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8 tracking-tight leading-tight">
              La sicurezza prima di tutto. <br/>
              <span className="text-[#004c7f]">Davvero.</span>
            </h2>
            <p className="text-lg text-slate-600 mb-12 leading-relaxed">
              Abbiamo costruito Share2Go per darti la tranquillità che meriti. Tu metti l'auto, noi pensiamo a proteggerla.
            </p>

            <div className="space-y-8">
              {/* Benefit 1 */}
              <div className="flex gap-6">
                <div className="shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center">
                    <UserCheck className="w-7 h-7 text-[#004c7f]" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Solo Driver Verificati</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Controlliamo patente e identità di ogni guidatore. Accetti solo chi ti ispira fiducia grazie alle recensioni della community.
                  </p>
                </div>
              </div>

              {/* Benefit 2 */}
              <div className="flex gap-6">
                <div className="shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center">
                    <Banknote className="w-7 h-7 text-[#004c7f]" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Pagamenti Garantiti</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Nessuna rincorsa ai pagamenti. Incassi automaticamente ogni 15 giorni direttamente sul tuo conto bancario.
                  </p>
                </div>
              </div>

              {/* Benefit 3 */}
              <div className="flex gap-6">
                <div className="shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center">
                    <Clock className="w-7 h-7 text-[#004c7f]" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Supporto H24</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Un team dedicato è sempre pronto ad assisterti per qualsiasi evenienza, 7 giorni su 7.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}