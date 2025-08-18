import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../../assets/images/amaze-logo-blue.png';
import '../../App.css';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0, y: -50 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 1 }}
    >
      <Box className="hero" sx={{ textAlign: 'center' }}>
        <motion.img
          src={logo}
          alt="Amaze Puzzles Logo"
          style={{ height: '275px', marginBottom: '20px' }}
          initial={{ rotate: 0 }}
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: 0, ease: "easeInOut" }}
        />
        <Typography variant="h5" component="h1" gutterBottom>
          Through the power of puzzles & play-based learning, Amaze Puzzles&#8482; helps visually impaired and diverse learners develop essential life skills.
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          Enhance Braille literacy with our fun, engaging puzzles.
        </Typography>
        <br />
        <br />
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: 1.1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: 'var(--primary-color)',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#00509d',
              },
            }}
            onClick={() => navigate('/products')}
          >
            Learn More
          </Button>
        </motion.div>
      </Box>
    </motion.div>
  );
};

export default Hero;
