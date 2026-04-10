import React from 'react';
import { motion } from 'motion/react';
import { Instagram, Facebook, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-secondary font-sans border-t border-white/[0.04]">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-20 md:py-24">
        <div className="grid md:grid-cols-[1fr_auto] gap-10 items-start">
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-extrabold text-secondary-foreground tracking-tight mb-3 font-sans"
            >
              Share2Go
            </motion.h3>
            <p className="text-secondary-foreground/15 text-sm leading-relaxed max-w-md font-sans">
              La piattaforma di car sharing peer-to-peer che trasforma la tua auto
              in una fonte di reddito. Sicura, semplice, italiana.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {[
              { href: 'https://www.instagram.com/share2go.it/', icon: Instagram },
              { href: 'https://www.facebook.com/groups/1322128052888784/', icon: Facebook },
              { href: 'https://www.linkedin.com/company/sharetogo', icon: Linkedin },
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full border border-white/[0.06] flex items-center justify-center text-secondary-foreground/15 hover:text-secondary-foreground/50 hover:border-white/15 transition-all duration-300"
              >
                <social.icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.03]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-6 flex justify-center">
          <p className="text-[10px] text-secondary-foreground/10 font-sans">&copy; 2026 Share2Go S.r.l. Tutti i diritti riservati.</p>
        </div>
      </div>
    </footer>
  );
}
