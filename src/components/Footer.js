import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import { Facebook, Instagram } from '@mui/icons-material';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <Box
        sx={{
          backgroundColor: 'var(--primary-color)',
          color: '#fff',
          padding: '20px 0',
          boxShadow: '0 -4px 5px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Container>
          <Grid container spacing={4}>
            {/* Logo and Description */}
            <Grid item xs={12} md={3}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Amaze Puzzles
              </Typography>
              <Typography variant="body2">
                Amaze Puzzles&#8482; offers engaging and educational puzzles designed to enhance Braille literacy for all ages. Our puzzles make learning Braille fun and accessible, supporting both beginners and those looking to improve their skills.
              </Typography>
            </Grid>

            {/* Navigation Links */}
            <Grid item xs={12} md={3}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Navigation
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Link href="/" color="inherit" underline="hover">Home</Link>
                <Link href="/about" color="inherit" underline="hover">About Us</Link>
                <Link href="/products" color="inherit" underline="hover">Products</Link>
                <Link href="/blog" color="inherit" underline="hover">Blog</Link>  {/* Added Blog Link */}
                <Link href="/contact" color="inherit" underline="hover">Contact Us</Link>
              </Box>
            </Grid>

            {/* Helpful Resources */}
            <Grid item xs={12} md={3}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Helpful Resources
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Link
                  href="https://www.brailleinstitute.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  color="inherit"
                  underline="hover"
                  title="Visit the Braille Institute website"
                >
                  Braille Institute
                </Link>
                <Link
                  href="https://www.afb.org/blindness-and-low-vision/braille"
                  target="_blank"
                  rel="noopener noreferrer"
                  color="inherit"
                  underline="hover"
                  title="Visit the American Foundation for the Blind website"
                >
                  American Foundation for the Blind
                </Link>
                <Link
                  href="https://nfb.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  color="inherit"
                  underline="hover"
                  title="Visit the National Federation of the Blind website"
                >
                  National Federation of the Blind
                </Link>
                <Link
                  href="https://www.perkins.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  color="inherit"
                  underline="hover"
                  title="Visit the Perkins School for the Blind website"
                >
                  Perkins School for the Blind
                </Link>
                <Link
                  href="https://www.pharmabraille.com/pharmaceutical-braille/the-braille-alphabet/"
                  target="_blank"
                  rel="noopener noreferrer"
                  color="inherit"
                  underline="hover"
                  title="Visit a comprehensive Braille alphabet guide"
                >
                  Braille Alphabet Reference
                </Link>
              </Box>
            </Grid>

            {/* Social Media Links */}
            <Grid item xs={12} md={3}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Follow Us
              </Typography>
              <Box>
                <IconButton href="https://www.facebook.com/profile.php?id=61563132061448" target="_blank" rel="noopener noreferrer" color="inherit" title="Follow Amaze Puzzles on Facebook">
                  <Facebook />
                </IconButton>
                <IconButton href="https://www.instagram.com/amazepuzzles/" target="_blank" rel="noopener noreferrer" color="inherit" title="Follow Amaze Puzzles on Instagram">
                  <Instagram />
                </IconButton>
              </Box>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', marginTop: '16px' }}>
                Contact Us
              </Typography>
              <Typography variant="body2">
                Phone: (210) 214-1360
              </Typography>
            </Grid>
          </Grid>
          <Box textAlign="center" mt={4}>
            <Typography variant="body2" color="inherit">
              &copy; {new Date().getFullYear()} Amaze Puzzles&#8482;. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </motion.div>
  );
};

export default Footer;
