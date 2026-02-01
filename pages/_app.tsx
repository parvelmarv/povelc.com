import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React, { useEffect } from 'react';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  // Unregister any existing service workers that might be causing errors
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const registration of registrations) {
          registration.unregister().catch((err) => {
            console.warn('Error unregistering service worker:', err);
          });
        }
      });
    }
  }, []);

  return <Component {...pageProps} />;
};

export default MyApp; 