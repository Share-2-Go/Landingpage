import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import logoImage from "figma:asset/2043a41ed183501163b61bc7d8680b217233cbd7.png";

interface NavbarProps {
  userType?: 'driver' | 'owner';
  onSwitchUserType?: (type: 'driver' | 'owner') => void;
}

export function Navbar({ userType = 'owner', onSwitchUserType }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [mobileMenuOpen]);

  const handleNavClick = (type: 'driver' | 'owner') => {
    onSwitchUserType?.(type);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToForm = () => {
    setMobileMenuOpen(false);
    const id = userType === 'driver' ? 'driver-lead-form' : 'lead-form';
    const element = document.getElementById(id);
    if (element) {
      setTimeout(() => element.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled || mobileMenuOpen
            ? 'bg-background/95 backdrop-blur-xl border-b border-border'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-16 lg:h-[72px]">
            {/* Logo */}
            <motion.div
              className="flex items-center cursor-pointer z-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <img
                src={logoImage}
                alt="Share2Go"
                className="h-7 sm:h-8 w-auto object-contain brightness-0 opacity-90 hover:opacity-100 transition-opacity"
              />
            </motion.div>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-1">
              {[
                { type: 'driver' as const, label: 'Noleggia' },
                { type: 'owner' as const, label: 'Condividi' },
              ].map((item) => (
                <motion.button
                  key={item.type}
                  onClick={() => handleNavClick(item.type)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`relative px-4 py-2 text-[13px] font-medium tracking-wide transition-all duration-300 rounded-full cursor-pointer ${
                    userType === item.type
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {userType === item.type && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-muted rounded-full"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </motion.button>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center">
              <motion.button
                onClick={scrollToForm}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group flex items-center gap-2 text-[13px] font-semibold text-foreground bg-foreground/[0.06] hover:bg-foreground/[0.1] px-4 py-2 rounded-full transition-colors cursor-pointer"
              >
                Iscriviti
                <motion.div
                  className="w-5 h-5 rounded-full border border-border flex items-center justify-center transition-colors"
                  whileHover={{ scale: 1.1 }}
                >
                  <ArrowUpRight className="w-2.5 h-2.5" />
                </motion.div>
              </motion.button>
            </div>

            {/* Mobile Toggle */}
            <motion.button
              className="md:hidden z-50 p-2 -mr-2 cursor-pointer"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X className="w-5 h-5 text-foreground" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu className="w-5 h-5 text-muted-foreground" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-2xl pt-20 px-6 md:hidden flex flex-col"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-0 mt-8"
            >
              {[
                { type: 'driver' as const, label: 'Noleggia' },
                { type: 'owner' as const, label: 'Condividi la tua auto' },
              ].map((item, i) => (
                <motion.button
                  key={item.type}
                  onClick={() => handleNavClick(item.type)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.08 }}
                  className={`text-left text-3xl font-extrabold py-5 border-b border-border transition-colors cursor-pointer tracking-tight ${
                    userType === item.type ? 'text-foreground' : 'text-foreground/15'
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="mt-auto mb-10"
            >
              <button
                onClick={scrollToForm}
                className="w-full py-4 text-base font-bold text-background bg-foreground rounded-lg cursor-pointer"
              >
                Iscriviti alla waitlist
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}