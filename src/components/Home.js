import React from 'react';
import Navbar from './Navbar'; // Import the Navbar component
import Hero from './Home/Hero'; // Import the Hero component
import Features from './Home/Features'; // Import the Features component
import Gallery from './Home/Gallery'; // Import the Gallery component
import NewsletterSignup from './Home/NewsletterSignup'; // Import the NewsletterSignup component
import Footer from './Footer'; // Import the Footer component (if you have one)

import './modern-styles.css'; // Import the CSS file

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Use the Navbar component */}
      <Navbar />

      {/* Use the Hero component */}
      <Hero />

      {/* Use the Features component */}
      <Features />

      {/* Use the Gallery component */}
      <Gallery />

      {/* Use the NewsletterSignup component */}
      <NewsletterSignup />

      {/* Use the Footer component */}
      <Footer />
    </div>
  );
};

export default HomePage;