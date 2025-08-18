// src/components/Home.js
import React from 'react';
import { Container } from '@mui/material';
import { Helmet } from 'react-helmet';
import Hero from './Home/Hero';
import Features from './Home/Features';
import Gallery from './Home/Gallery';
import NewsletterSignup from './Home/NewsletterSignup';
import '../App.css';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home | Amaze Puzzles</title>
        <meta 
          name="description" 
          content="Welcome to Amaze Puzzles, where we offer engaging and educational puzzles designed to enhance Braille literacy for learners of all ages. Explore our features, gallery, and sign up for our newsletter for the latest updates." 
        />
      </Helmet>
      <Container sx={{ padding: 0, margin: 0, maxWidth: '100% !important', paddingLeft: 0, paddingRight: 0 }}>
        <Hero />
        <Features />
        <Gallery />
        <NewsletterSignup />
      </Container>
    </>
  );
};

export default Home;
