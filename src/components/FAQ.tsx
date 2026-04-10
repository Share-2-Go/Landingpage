import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Quanto posso guadagnare?',
      answer: 'Dipende dal tipo di auto e dalla frequenza con cui la condividi. In media, i proprietari guadagnano tra €300 e €800 al mese. Con il nostro calcolatore puoi fare una stima personalizzata.',
    },
    {
      question: 'La mia auto è assicurata?',
      answer: 'Sì, ogni noleggio è coperto da assicurazione completa con massimale fino a €1M. La tua assicurazione personale non viene toccata. Copriamo danni, furto e responsabilità civile.',
    },
    {
      question: 'Chi può noleggiare la mia auto?',
      answer: 'Solo conducenti verificati con patente valida, documento d\'identità controllato e recensioni positive. Tu puoi vedere il profilo di ogni conducente prima di accettare.',
    },
    {
      question: 'Come funzionano i pagamenti?',
      answer: 'Ricevi i pagamenti automaticamente sul tuo conto bancario 24 ore dopo la fine di ogni noleggio. Nessuna commissione nascosta: vedi esattamente quanto guadagni.',
    },
    {
      question: 'Posso cancellare quando voglio?',
      answer: 'Assolutamente sì. Non ci sono vincoli contrattuali. Puoi bloccare il calendario quando vuoi e riattivare la tua auto in qualsiasi momento.',
    },
    {
      question: 'Cosa succede in caso di danni?',
      answer: 'L\'assicurazione copre tutti i danni. Il conducente paga una franchigia di €500, tu non paghi nulla. Gestiamo noi tutta la pratica con l\'assicurazione.',
    },
  ];

  return (
    <section id="faq" className="py-24 px-6 lg:px-8 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl lg:text-5xl tracking-tight text-[#152037]">
            Domande frequenti
          </h2>
          <p className="text-xl text-gray-600">
            Tutto quello che devi sapere per iniziare
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-lg text-[#152037] pr-8">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Altre domande?</p>
          <button className="text-[#004c7f] hover:text-[#1b2c4b] transition-colors">
            Contatta il supporto →
          </button>
        </div>
      </div>
    </section>
  );
}
