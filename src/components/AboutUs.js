import React from 'react';
import { Container, Typography, Box, Grid, CardMedia, Link as MuiLink } from '@mui/material';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import joshImage from '../assets/images/josh-simpson.jpg';
import dorianImage from '../assets/images/dorian-simpson.jpg';
import christopherImage from '../assets/images/chrisrtopher-animated.jpg';
import '../App.css';

const teamMembers = [
  { name: 'Josh', role: 'Main Guy', image: joshImage },
  { name: 'Dorian', role: 'Tech Dude', image: dorianImage },
  { name: 'Christopher', role: 'Wellness Guy', image: christopherImage },
];

const AboutUs = () => {
  return (
    <Container sx={{ padding: 0, margin: 0, maxWidth: '100% !important' }}>
      <Helmet>
        <title>About Us | Amaze Puzzles</title>
        <meta 
          name="description" 
          content="Learn about Amaze Puzzles, our mission, values, and the team dedicated to creating engaging and educational puzzles designed to enhance Braille literacy and support diverse learners." 
        />
      </Helmet>
      <MuiLink href="#main-content" sx={{ position: 'absolute', left: '-999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden', zIndex: '-1', '&:focus': { left: '0', width: 'auto', height: 'auto', padding: '1em', zIndex: '1000' } }}>
        Skip to main content
      </MuiLink>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* ABOUT US SECTION */}
        <Box my={4} id="main-content" className="section" sx={{ margin: '0px !important' }}>
          <Typography variant="h4" component="h2" gutterBottom className="text-shadow" sx={{ color: 'var(--primary-color)', marginBottom: '16px' }}>
            <strong>Mission Statement</strong>
          </Typography>
          <Typography variant="body1" paragraph sx={{ marginBottom: '16px' }}>
            Through the power of puzzles & play-based learning, Amaze Puzzles&#8482; aims to help diverse learners acquire & develop essential life skills.
          </Typography>

          <Typography variant="h4" component="h2" gutterBottom className="text-shadow" sx={{ color: 'var(--primary-color)', marginBottom: '16px' }}>
            <strong>Our Story</strong>
          </Typography>
          <Typography variant="body1" paragraph sx={{ marginBottom: '16px' }}>
            Amaze Puzzles&#8482; was founded with the vision to create engaging and educational puzzles that cater to the needs of diverse learners.
          </Typography>
          <Typography variant="body1" paragraph sx={{ marginBottom: '16px' }}>
            At the heart of it is a simple idea - to make learning fun and accessible for everyone.
          </Typography>
          <Typography variant="body1" paragraph sx={{ marginBottom: '16px' }}>
            Our journey begins with the patent-pending Braille Introduction and Skill Retention Puzzle, a groundbreaking tool designed to empower the visually impaired by introducing and retaining essential life skills.
          </Typography>
          <Typography variant="body1" paragraph sx={{ marginBottom: '16px' }}>
            This is just the start.
          </Typography>
          <Typography variant="body1" paragraph sx={{ marginBottom: '16px' }}>
            Our puzzles use play to not only educate but also engage and support those with diverse learning needs, including social communication challenges.
          </Typography>
          <Typography variant="body1" paragraph>
           <strong> Our mission: </strong> to create impactful solutions that make a real difference in people's lives.
          </Typography>
        </Box>

        {/* MEET THE TEAM SECTION */}
        <Box my={4} className="section">
          <Typography variant="h4" gutterBottom className="text-shadow" sx={{ color: 'var(--primary-color)' }}>
            <strong>Meet the Team</strong>
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {teamMembers.map((member, index) => (
              <Grid item xs={12} md={4} display="flex" flexDirection="column" alignItems="center" key={index}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <CardMedia
                    component="img"
                    height="300"
                    image={member.image}
                    alt={member.name}
                    sx={{ objectFit: 'cover', borderRadius: '50%', width: '300px', height: '300px' }}
                  />
                </motion.div>
                <Typography variant="h6" component="div" className="text-shadow" sx={{ color: 'var(--primary-color)', mt: 2 }}>
                  {member.name}
                </Typography>
                <Typography variant="body2" component="div">
                  {member.role}
                </Typography>
              </Grid>
            ))}
            <Grid item xs={12}>
              <Typography variant="body1" paragraph sx={{ mt: 2 }}>
                At Amaze Puzzles&#8482;, we are a small but incredibly dedicated group of individuals who are passionate about making a difference.
                We believe that everyone should have the opportunity to reach their full potential, and our diverse backgrounds empower us to create innovative and inclusive puzzles.
                Our commitment to accessibility and engagement drives us to develop products that inspire and educate, ensuring that learning is a fun and rewarding experience for all.
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </motion.div>
    </Container>
  );
};

export default AboutUs;
