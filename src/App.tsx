import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { OwnerLandingPage } from './components/OwnerLandingPage';
import { DriverLandingPage } from './components/DriverLandingPage';
import { CookieConsent } from './components/CookieConsent';
import { StickyMobileCTA } from './components/StickyMobileCTA';

// Google Analytics
function useGoogleAnalytics() {
  useEffect(() => {
    // Avoid duplicate injection
    if (document.querySelector('script[src*="googletagmanager.com/gtag/js?id=G-6NZH5683JW"]')) return;

    // Load gtag.js script
    const script = document.createElement('script');
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-6NZH5683JW';
    script.async = true;
    document.head.appendChild(script);

    // Initialize dataLayer and gtag exactly as Google specifies
    const w = window as any;
    w.dataLayer = w.dataLayer || [];
    w.gtag = function () {
      w.dataLayer.push(arguments);
    };
    w.gtag('js', new Date());
    w.gtag('config', 'G-6NZH5683JW');
  }, []);
}

export default function App() {
  useGoogleAnalytics();
  const [userType, setUserType] = useState<'driver' | 'owner'>('owner');

  const handleSwitchToOwner = () => {
    setUserType('owner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Navbar userType={userType} onSwitchUserType={setUserType} />
      {userType === 'owner' ? (
        <OwnerLandingPage />
      ) : (
        <>
          <DriverLandingPage onSwitchToOwner={handleSwitchToOwner} />
          <StickyMobileCTA />
        </>
      )}
      <CookieConsent />
    </div>
  );
}
