import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Star, ThumbsUp } from 'lucide-react';

export function SocialProof() {
  const partners = [
    { name: "AutoMoto", opacity: "opacity-40" },
    { name: "UrbanMove", opacity: "opacity-50" },
    { name: "GreenDrive", opacity: "opacity-40" },
    { name: "CityLink", opacity: "opacity-60" },
    { name: "EcoCar", opacity: "opacity-40" }
  ];

  return (
    <section className="py-16 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">Hanno creduto in noi (o sono pazzi)</h2>
        </div>

        {/* Logos */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center items-center gap-8 md:gap-16 mb-16 grayscale"
        >
          {partners.map((partner, index) => (
            <div key={index} className={`text-2xl font-bold text-muted-foreground ${partner.opacity} hover:opacity-100 transition-opacity cursor-default`}>
              {partner.name}
            </div>
          ))}
        </motion.div>

        {/* Badges */}
        <div className="flex flex-wrap justify-center gap-6">
          <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full border border-green-100">
            <ShieldCheck className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-green-800">Certificato Anti-Fregatura™</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full border border-blue-100">
            <ThumbsUp className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Approvato da 1000+ Auto Felici</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-yellow-50 rounded-full border border-yellow-100">
            <Star className="w-5 h-5 text-yellow-600" />
            <span className="text-sm font-medium text-yellow-800">Garantito al Limone Zero</span>
          </div>
        </div>
      </div>
    </section>
  );
}
