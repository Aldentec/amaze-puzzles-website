import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { Helmet } from 'react-helmet';
import '../../App.css';

const Confirmation = () => {
  return (
    <Container className="confirmation-container">
      <Helmet>
        <title>Order Confirmation | Amaze Puzzles</title>
        <meta 
          name="description" 
          content="Thank you for your purchase at Amaze Puzzles. Your order has been successfully placed and is being processed."
        />
      </Helmet>
      <Box my={4} className="section">
        <Typography variant="h4" component="h1" sx={{ textAlign: 'center', color: 'var(--primary-color)' }} gutterBottom>
          Order Confirmation
        </Typography>
        <Typography variant="body1" sx={{ textAlign: 'center' }}>
          Thank you for your purchase! Your order has been successfully placed and is being processed.
        </Typography>
      </Box>
    </Container>
  );
};

export default Confirmation;
