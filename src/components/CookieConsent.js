// src/components/CookieConsent.js
import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Link } from '@mui/material';
import Cookies from 'js-cookie';
import { initializeAnalytics } from '../utils/analytics';
import TermsOfService from './TermsOfService';

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);
  const [openTos, setOpenTos] = useState(false);

  useEffect(() => {
    const consent = Cookies.get('cookieConsent');
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    Cookies.set('cookieConsent', 'true', { expires: 365 });
    initializeAnalytics();  // Initialize Google Analytics after accepting cookies
    setVisible(false);
  };

  const handleReject = () => {
    Cookies.set('cookieConsent', 'false', { expires: 365 });
    setVisible(false);
  };

  const handleTosOpen = (event) => {
    event.preventDefault(); // Prevent the default action of the link
    setOpenTos(true);
  };

  const handleTosClose = () => {
    setOpenTos(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          color: '#fff',
          padding: '10px',
          textAlign: 'center',
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="body2" sx={{ marginRight: '10px' }}>
          We use cookies to ensure you get the best experience on our website.{' '}
          <Link href="#" onClick={handleTosOpen} style={{ color: '#fff', textDecoration: 'underline' }}>
            Learn more
          </Link>.
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#4aa4ff',
            '&:hover': {
              backgroundColor: '#007bb5',
            },
            marginRight: '10px'
          }}
          onClick={handleAccept}
        >
          Accept
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#ff4a4a',
            '&:hover': {
              backgroundColor: '#b50000',
            },
          }}
          onClick={handleReject}
        >
          Reject
        </Button>
      </Box>

      <TermsOfService open={openTos} handleClose={handleTosClose} />
    </>
  );
};

export default CookieConsent;
