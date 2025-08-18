import React, { useState } from 'react';
import { Typography, Box, TextField, Button, Snackbar, Alert, FormControlLabel, Checkbox, Link } from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios';
import TermsOfService from '../TermsOfService';
import PrivacyPolicy from '../PrivacyPolicy';
import '../../App.css';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: '' });
  const [error, setError] = useState('');
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState('');
  const [openTos, setOpenTos] = useState(false);
  const [openPrivacy, setOpenPrivacy] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleConsentChange = (e) => {
    setConsent(e.target.checked);
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Email is required.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!consent) {
      setConsentError('You must agree to the terms to subscribe.');
      return;
    }

    setIsLoading(true);
    setError('');
    setConsentError('');
    try {
      const response = await axios.post(
        'https://4sr8xw2cgk.execute-api.us-west-2.amazonaws.com/prod/newsletter',
        { email },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status === 200) {
        console.log("Newsletter subscription with: " + email);
        setNotification({ open: true, message: 'Subscribed successfully!', severity: 'success' });
        setEmail('');
        setConsent(false);
      }
    } catch (error) {
      console.error('Error subscribing:', error);
      setNotification({ open: true, message: 'Failed to subscribe, please try again later.', severity: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setNotification({ ...notification, open: false });
  };

  const handleTosOpen = (event) => {
    event.preventDefault(); // Prevent the default action of the link
    setOpenTos(true);
  };

  const handleTosClose = () => {
    setOpenTos(false);
  };

  const handlePrivacyOpen = (event) => {
    event.preventDefault(); // Prevent the default action of the link
    setOpenPrivacy(true);
  };

  const handlePrivacyClose = () => {
    setOpenPrivacy(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 1, delay: 1.5 }}
    >
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity={notification.severity} sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
      <Box className="section newsletter">
        <Typography variant="h3" component="h2" gutterBottom className="text-shadow" sx={{ textAlign: 'center', color: 'var(--primary-color)' }}>
          Stay Updated
        </Typography>
        <Typography>Sign up for our newsletter to receive the latest updates on Amaze Puzzles&#8482;.</Typography>
        <Box component="form" mt={2} noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email*"
            type="email"
            margin="normal"
            value={email}
            onChange={handleChange}
            InputLabelProps={{
              style: { color: 'var(--text-color)' },
            }}
            inputProps={{
              'aria-required': 'true'
            }}
            sx={{
              '& .MuiInputBase-input': { color: 'var(--primary-color)' },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'var(--primary-color)',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'var(--primary-color)',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'var(--primary-color)',
              },
            }}
            error={!!error}
            helperText={error}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={consent}
                onChange={handleConsentChange}
                name="consent"
                color="primary"
                inputProps={{
                  'aria-required': 'true'
                }}
              />
            }
            label={
              <Typography>
                I agree to the <Link href="#" onClick={handleTosOpen} color="inherit" underline="hover" role="button">Terms of Service</Link> and <Link href="#" onClick={handlePrivacyOpen} color="inherit" underline="hover" role="button">Privacy Policy</Link>
              </Typography>
            }
          />
          {consentError && <Typography sx={{ color: 'red' }}>{consentError}</Typography>}
          <Box mt={2}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: 'var(--secondary-color) !important',
                '&:hover': {
                  backgroundColor: 'var(--accent-color) !important',
                },
                marginTop: 2,
              }}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </Box>
        </Box>
      </Box>

      <TermsOfService open={openTos} handleClose={handleTosClose} />
      <PrivacyPolicy open={openPrivacy} handleClose={handlePrivacyClose} />
    </motion.div>
  );
};

export default NewsletterSignup;
