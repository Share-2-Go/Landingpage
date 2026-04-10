import React from 'react';
import { Shield, Lock, UserCheck, CheckCircle2 } from 'lucide-react';

export function TrustSafety() {
  const features = [
    {
      icon: Shield,
      title: 'Copertura Assicurativa Kasko',
      description: 'Ogni singolo viaggio è protetto da una polizza Kasko completa. La tua auto è al sicuro, sempre.',
    },
    {
      icon: UserCheck,
      title: 'Driver Verificati',
      description: 'Controllo rigoroso di identità e patente. Accettiamo solo driver con storico impeccabile.',
    },
    {
      icon: Lock,
      title: 'Nessun Impatto sulla Tua Polizza',
      description: 'L\'assicurazione Share2Go opera separatamente. Il tuo bonus/malus personale non viene mai toccato.',
    },
  ];

  return (
    <section id="trust" className="py-12 md:py-24 px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-10 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full border border-green-100">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-700">La tua tranquillità prima di tutto</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl tracking-tight text-[#152037]">
            Fiducia costruita sulla sicurezza.
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Condividere l'auto è un atto di fiducia. Noi lo proteggiamo con le garanzie più solide sul mercato.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:border-[#004c7f]/20 hover:shadow-lg transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-white rounded-xl shadow-sm text-[#004c7f]">
                    <Icon className="w-7 h-7" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-[#152037]">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Stats Bar */}
        <div className="mt-16 bg-[#152037] rounded-3xl p-8 lg:p-12 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-[#004c7f] rounded-full blur-3xl opacity-20"></div>
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-[#004c7f] rounded-full blur-3xl opacity-20"></div>
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="px-4 py-2">
              <div className="text-3xl lg:text-4xl font-bold mb-1">100%</div>
              <div className="text-white/60 text-sm uppercase tracking-wider">Copertura Kasko</div>
            </div>
            <div className="px-4 py-2">
              <div className="text-3xl lg:text-4xl font-bold mb-1">ZERO</div>
              <div className="text-white/60 text-sm uppercase tracking-wider">Franchigia a tuo carico</div>
            </div>
            <div className="px-4 py-2">
              <div className="text-3xl lg:text-4xl font-bold mb-1">24/7</div>
              <div className="text-white/60 text-sm uppercase tracking-wider">Supporto Partner</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
