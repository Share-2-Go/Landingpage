import React from 'react';
import { DriverHero } from './DriverHero';
import { PressSection } from './PressSection';
import { DriverExplanationSection } from './DriverExplanationSection';
import { DriverComparisonSection } from './DriverComparisonSection';
import { DriverStepsSection } from './DriverStepsSection';
import { DriverBenefitsSection } from './DriverBenefitsSection';
import { DriverTrustSection } from './DriverTrustSection';
import { DriverTestimonialsSection } from './DriverTestimonialsSection';
import { DriverFAQSection } from './DriverFAQSection';
import { DriverLastCTA } from './DriverLastCTA';
import { Footer } from './Footer';

interface DriverLandingPageProps {
  onSwitchToOwner?: () => void;
}

export function DriverLandingPage({ onSwitchToOwner }: DriverLandingPageProps) {
  return (
    <div className="bg-background font-sans text-foreground">
      <DriverHero onSwitchToOwner={onSwitchToOwner} />
      <PressSection />
      <DriverExplanationSection />
      <DriverStepsSection />
      <DriverBenefitsSection />
      <DriverTrustSection />
      <DriverTestimonialsSection />
      <DriverComparisonSection />
      <DriverFAQSection />
      <DriverLastCTA />
      <Footer />
    </div>
  );
}
