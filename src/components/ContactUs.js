import React, { useState } from 'react';
import { Container, Typography, Box, TextField, Button, Snackbar, Alert, FormControlLabel, Checkbox, Link, IconButton } from '@mui/material';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Facebook, Instagram } from '@mui/icons-material';
import TermsOfService from './TermsOfService';
import PrivacyPolicy from './PrivacyPolicy';
import '../App.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: '' });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState('');
  const [openTos, setOpenTos] = useState(false);
  const [openPrivacy, setOpenPrivacy] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleConsentChange = (e) => {
    setConsent(e.target.checked);
  };

  const validateFields = () => {
    let valid = true;
    let tempErrors = { name: '', email: '', message: '' };

    if (!formData.name) {
      tempErrors.name = 'Name is required.';
      valid = false;
    }
    if (!formData.email) {
      tempErrors.email = 'Email is required.';
      valid = false;
    } else {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(formData.email)) {
        tempErrors.email = 'Please enter a valid email address.';
        valid = false;
      }
    }
    if (!formData.message) {
      tempErrors.message = 'Message is required.';
      valid = false;
    }

    setErrors(tempErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) {
      return;
    }
    if (!consent) {
      setConsentError('You must agree to the terms to submit.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        'https://4sr8xw2cgk.execute-api.us-west-2.amazonaws.com/prod/contact',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status === 200) {
        console.log("Message sent with: " + JSON.stringify(formData));
        setNotification({ open: true, message: 'Message sent successfully! We will be in touch! :)', severity: 'success' });
        setFormData({ name: '', email: '', message: '' });
        setConsent(false);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setNotification({ open: true, message: 'Failed to send message, please try again later.', severity: 'error' });
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
    <Container className="contact-us-container" sx={{ textAlign: 'center', color: 'var(--primary-color)'}}>
      <Helmet>
        <title>Contact Us | Amaze Puzzles</title>
        <meta 
          name="description" 
          content="Get in touch with Amaze Puzzles. Send us your questions, comments, or feedback through our contact form. We are here to help and look forward to hearing from you." 
        />
      </Helmet>
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
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Box my={4} className="section">
          <Typography variant="h3" component="h1" gutterBottom className="text-shadow">
            Get in touch!
          </Typography>
          <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Name*"
              margin="normal"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              inputProps={{
                'aria-required': 'true'
              }}
            />
            <TextField
              fullWidth
              label="Email*"
              type="email"
              margin="normal"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              inputProps={{
                'aria-required': 'true'
              }}
            />
            <TextField
              fullWidth
              label="What's up?*"
              multiline
              rows={4}
              margin="normal"
              name="message"
              value={formData.message}
              onChange={handleChange}
              error={!!errors.message}
              helperText={errors.message}
              inputProps={{
                'aria-required': 'true'
              }}
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
                  backgroundColor: 'var(--primary-color)',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: '#00509d',
                  },
                }} 
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Submit'}
              </Button>
            </Box>
          </Box>

          <Box mt={4}>
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
              Call Us
            </Typography>
            <Typography variant="body2">
              Phone: (210) 214-1360
            </Typography>
          </Box>
        </Box>
      </motion.div>

      <TermsOfService open={openTos} handleClose={handleTosClose} />
      <PrivacyPolicy open={openPrivacy} handleClose={handlePrivacyClose} />
    </Container>
  );
};

export default ContactUs;
