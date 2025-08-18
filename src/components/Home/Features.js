// src/components/Home/Features.js
import React from 'react';
import { Typography, Box, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const features = [
  {
    title: 'Accessibility',
    description: 'Ensuring that all users, regardless of ability, can easily engage with our puzzles.',
    whyItApplies: (
      <>
        Our products are designed with features like tactile feedback, making them accessible and usable for individuals with visual impairments, including those learning Braille. 
        Learn more on our <Link to="/products" style={{ color: 'inherit', textDecoration: 'underline' }}>products page</Link>.
      </>
    ),
  },
  {
    title: 'Engaging',
    description: 'Our puzzles are designed to capture and retain interest, making learning an enjoyable and captivating experience.',
    whyItApplies: (
      <>
        With interactive elements and challenging tasks, our puzzles keep learners engaged, boosting retention and making learning fun. 
        Learn more on our <Link to="/products" style={{ color: 'inherit', textDecoration: 'underline' }}>products page</Link>.
      </>
    ),
  },
  {
    title: 'Entertaining',
    description: 'Ensuring learning is not just educational but also fun, enhancing the overall experience.',
    whyItApplies: (
      <>
        We blend educational goals with playful design, ensuring that while learners gain skills, they are also entertained, making education enjoyable. 
        Learn more on our <Link to="/products" style={{ color: 'inherit', textDecoration: 'underline' }}>products page</Link>.
      </>
    ),
  },
  {
    title: 'Empowerment',
    description: 'Equipping learners with tools to succeed and gain independence through enhanced educational outcomes.',
    whyItApplies: (
      <>
        Our puzzles do more than entertain; they build confidence and critical life skills, empowering users to navigate the world more effectively. This includes learning essential skills like Braille.
        Learn more on our <Link to="/products" style={{ color: 'inherit', textDecoration: 'underline' }}>products page</Link>.
      </>
    ),
  },
  {
    title: 'Gamification',
    description: 'Transforming learning into an engaging challenge through puzzle-solving elements and tactile exploration.',
    whyItApplies: (
      <>
        Our puzzles incorporate game-like features 
        such as shape matching and spatial problem-solving. These 
        elements make learning an interactive adventure, motivating 
        users to improve their skills.
        Learn more on our <Link to="/products" style={{ color: 'inherit', textDecoration: 'underline' }}>products page</Link>.
      </>
    ),
  },
  {
    title: 'Inclusivity',
    description: 'Creating products that cater to a diverse range of learners, promoting equal learning opportunities.',
    whyItApplies: (
      <>
        Amaze Puzzles embraces differences, designing tools that adapt to various learning needs and abilities, helping every user feel included.
        Learn more <Link to="/about" style={{ color: 'inherit', textDecoration: 'underline' }}>about us</Link>.
      </>
    ),
  }
];

const Features = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 1 }}
    >
      <Box className="section">
        <Typography variant="h3" component="h2" gutterBottom sx={{ textAlign: 'center', color: 'var(--primary-color)'}} className="text-shadow">
        Key Features of Our Braille Puzzle
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {features.map((feature, index) => (
            <Grid item xs={12} sm={4} key={index} className="feature-item">
              <Typography variant="h6"><strong>{feature.title}</strong></Typography>
              <Typography>{feature.description}</Typography>
              <Typography variant="body2" sx={{ fontStyle: 'italic', marginTop: 1 }}>
                <strong>Why it applies:</strong> {feature.whyItApplies}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Box>
    </motion.div>
  );
};

export default Features;
