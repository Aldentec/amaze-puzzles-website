import React from 'react';
import Hero from './Home/Hero';
import Features from './Home/Features';
import Gallery from './Home/Gallery';
import Testimonials from './Home/Testimonials'; // ⬅️ add this
import NewsletterSignup from './Home/NewsletterSignup';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Features />
      <Gallery />

      {/* New testimonials section */}
      <Testimonials />

      <NewsletterSignup />
    </div>
  );
};

export default HomePage;
