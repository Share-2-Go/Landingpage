import React from 'react';
import { Hero } from './Hero';
import { PressSection } from './PressSection';
import { ProblemSection } from './ProblemSection';
import { NasceShare2GoSection } from './NasceShare2GoSection';
import { EarnWithUsSection } from './EarnWithUsSection';
import { ZeroRiskSection } from './ZeroRiskSection';
import { FAQSection } from './FAQSection';
import { LeadMagnetSection } from './LeadMagnetSection';
import { LastCTA } from './LastCTA';
import { Footer } from './Footer';
import { smoothScrollTo } from '../utils/smoothScroll';

export function OwnerLandingPage() {
  const scrollToForm = () => {
    smoothScrollTo('lead-form', 1500);
  };

  return (
    <div className="bg-background font-sans text-foreground">
      <Hero />
      <PressSection />
      <ProblemSection />
      <NasceShare2GoSection />
      <EarnWithUsSection onSwitchToOwner={scrollToForm} />
      <ZeroRiskSection />
      <FAQSection />
      <LeadMagnetSection />
      <LastCTA />
      <Footer />
    </div>
  );
}
