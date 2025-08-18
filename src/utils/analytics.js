// src/utils/analytics.js
export const initializeAnalytics = () => {
    if (typeof window !== 'undefined' && !window.gtag) {
      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=G-X2TN5HXQKB`;
      script.async = true;
      script.onload = () => {
        window.dataLayer = window.dataLayer || [];
        function gtag(){ window.dataLayer.push(arguments); }
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', 'G-X2TN5HXQKB');
      };
      document.head.appendChild(script);
    }
  };
  