import React from 'react';
import laSiciliaLogo from 'figma:asset/517672c4d98823176f5cf0771249a4a93bfacf09.png';

const partners = [
  { name: 'Amazon Supply Chain', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg', className: 'brightness-0 invert' },
  { name: 'La Sicilia', logo: laSiciliaLogo, className: 'brightness-0 invert' },
  { name: 'Develhope', logo: 'https://www.google.com/s2/favicons?domain=develhope.co&sz=128', className: 'grayscale brightness-200 contrast-200' },
  { name: 'StartupItalia', logo: 'https://www.google.com/s2/favicons?domain=startupitalia.eu&sz=128', className: 'grayscale brightness-200 contrast-200' },
  { name: 'Starting Finance', logo: 'https://logo.clearbit.com/startingfinance.com', className: 'brightness-0 invert' }
];

interface HeroTrustBarProps {
  className?: string;
}

export function HeroTrustBar({ className = "" }: HeroTrustBarProps) {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <span className="text-[10px] font-medium text-white/20 uppercase tracking-[0.2em]">
        Partner & Riconoscimenti
      </span>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        {partners.map((p) => (
          <div key={p.name} className="group flex items-center gap-2" title={p.name}>
            <img
              src={p.logo}
              alt={p.name}
              className={`h-3.5 w-auto object-contain opacity-40 group-hover:opacity-70 transition-all ${p.className}`}
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
