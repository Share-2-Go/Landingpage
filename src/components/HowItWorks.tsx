import React from 'react';

export function HowItWorks() {
  const steps = [
    {
      number: '1',
      title: 'Analisi Trasparente',
      description: 'Valutiamo insieme il potenziale della tua auto, usando dati reali di mercato e della tua zona.',
      time: 'Istantaneo',
    },
    {
      number: '2',
      title: 'Verifica Semplificata',
      description: 'Ci assicuriamo che tutto sia in regola. Un nostro esperto ti guiderà passo dopo passo nell\'attivazione.',
      time: 'Entro 24h',
    },
    {
      number: '3',
      title: 'Entra nel Club',
      description: 'Come Founder, avrai accesso prioritario ai migliori driver e vantaggi esclusivi pensati per te.',
      time: 'Esclusivo',
    },
  ];

  return (
    <section id="how-it-works" className="py-12 md:py-24 px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-10 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl tracking-tight text-[#152037]">
            Semplice, chiaro, affidabile.
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Nessun asterisco nascosto. Ecco come trasformiamo la tua auto in una risorsa, insieme.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-[#004c7f] to-transparent" />
              )}

              <div className="relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow h-full">
                <div className="space-y-4">
                  {/* Number Badge */}
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-[#004c7f] text-white rounded-full font-compact text-xl shadow-lg shadow-blue-900/20">
                    {step.number}
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl text-[#152037] font-bold">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  <div className="pt-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 rounded-full">
                      <span className="text-sm font-medium text-[#004c7f]">{step.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
