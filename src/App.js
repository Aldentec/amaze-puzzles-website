import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline, useMediaQuery } from '@mui/material';
import Navbar from './components/Navbar';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import Products from './components/Store/Products';
import ProductDetail from './components/Store/ProductDetails';
import Cart from './components/Store/Cart';
import Checkout from './components/Store/Checkout';
import Confirmation from './components/Store/Confirmation';
import ContactUs from './components/ContactUs';
import BlogList from './components/Blog/BlogList';
import BlogPost from './components/Blog/BlogPost';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';
import Cookies from 'js-cookie';
import { initializeAnalytics } from './utils/analytics';

import './components/modern-styles.css'; // Import the CSS file

const App = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  useEffect(() => {
    const consent = Cookies.get('cookieConsent');
    if (consent) {
      initializeAnalytics();
    }

    const trackVisitor = async () => {
      try {
        const response = await fetch('https://4sr8xw2cgk.execute-api.us-west-2.amazonaws.com/prod/track', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
        });

        if (!response.ok) {
          throw new Error('Failed to track visitor');
        }

        const data = await response.json();
        console.log('Visitor tracked successfully:', data);
      } catch (error) {
        console.error('Error tracking visitor:', error);
      }
    };

    trackVisitor();
  }, []);

  return (
    <Router>
      <CssBaseline />
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar handleDrawerToggle={handleDrawerToggle} drawerOpen={drawerOpen} />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product-detail" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/post/:filename" element={<BlogPost />} />
          </Routes>
        </main>
      </div>
      <Footer />
      <CookieConsent />
    </Router>
  );
};

export default App;
