import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Snackbar,
  Alert,
  FormControlLabel,
  Checkbox,
  Link,
  IconButton,
  Grid,
  Paper,
  Divider,
  CircularProgress,
} from '@mui/material';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Facebook, Instagram } from '@mui/icons-material';
import TermsOfService from './TermsOfService';
import PrivacyPolicy from './PrivacyPolicy';
import '../App.css';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', delay } },
});

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState('');
  const [openTos, setOpenTos] = useState(false);
  const [openPrivacy, setOpenPrivacy] = useState(false);

  const handleChange = (e) => {
    setErrors((prev) => ({ ...prev, [e.target.name]: '' })); // clear field error as user types
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleConsentChange = (e) => {
    setConsentError('');
    setConsent(e.target.checked);
  };

  const validateFields = () => {
    let valid = true;
    const temp = { name: '', email: '', message: '' };

    if (!formData.name.trim()) {
      temp.name = 'Name is required.';
      valid = false;
    }
    if (!formData.email.trim()) {
      temp.email = 'Email is required.';
      valid = false;
    } else {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(formData.email.trim())) {
        temp.email = 'Please enter a valid email address.';
        valid = false;
      }
    }
    if (!formData.message.trim()) {
      temp.message = 'Message is required.';
      valid = false;
    }

    setErrors(temp);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;
    if (!consent) {
      setConsentError('You must agree to the terms to submit.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        'https://4sr8xw2cgk.execute-api.us-west-2.amazonaws.com/prod/contact',
        formData,
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.status === 200) {
        setNotification({
          open: true,
          message: 'Message sent successfully! We will be in touch! 🙂',
          severity: 'success',
        });
        setFormData({ name: '', email: '', message: '' });
        setConsent(false);
      } else {
        throw new Error('Unexpected response');
      }
    } catch (err) {
      console.error('Error sending message:', err);
      setNotification({
        open: true,
        message: 'Failed to send message, please try again later.',
        severity: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => setNotification((n) => ({ ...n, open: false }));
  const handleTosOpen = (e) => { e.preventDefault(); setOpenTos(true); };
  const handlePrivacyOpen = (e) => { e.preventDefault(); setOpenPrivacy(true); };

  return (
    <Container sx={{ p: 0, maxWidth: '100% !important' }}>
      <Helmet>
        <title>Contact Us | Amaze Puzzles</title>
        <meta
          name="description"
          content="Get in touch with Amaze Puzzles. Send us your questions, comments, or feedback through our contact form. We are here to help and look forward to hearing from you."
        />
      </Helmet>

      {/* top gradient header */}
      <Box
        component={motion.section}
        {...fadeUp(0)}
        sx={{
          position: 'relative',
          py: { xs: 10, md: 14 },
          px: { xs: 2, sm: 4, md: 6 },
          background: 'linear-gradient(135deg, rgba(147,51,234,0.95), rgba(37,99,235,0.95))',
          color: 'white',
          overflow: 'hidden',
          textAlign: 'center',
        }}
      >
        <Box
          sx={{
            position: 'absolute', top: '12%', right: -80, width: 320, height: 320,
            bgcolor: 'rgba(255,255,255,0.12)', borderRadius: '50%', filter: 'blur(60px)',
          }}
        />
        <Box
          sx={{
            position: 'absolute', bottom: '12%', left: -90, width: 280, height: 280,
            bgcolor: 'rgba(255,255,255,0.1)', borderRadius: '50%', filter: 'blur(60px)',
          }}
        />
        <Box sx={{ position: 'relative', maxWidth: 1100, mx: 'auto' }}>
          <Typography variant="h2" sx={{ fontWeight: 800, lineHeight: 1.1 }}>
            Get in touch
          </Typography>
          <Typography variant="h6" sx={{ mt: 2, opacity: 0.95, maxWidth: 760, mx: 'auto' }}>
            Questions, feedback, partnerships—send us a note and we’ll get back to you.
          </Typography>
        </Box>
      </Box>

      {/* content area */}
      <Box
        component={motion.section}
        {...fadeUp(0.1)}
        sx={{
          maxWidth: 1200,
          mx: 'auto',
          px: { xs: 2, sm: 4 },
          mt: -6, // lift the cards into the header for depth
          pb: { xs: 8, md: 12 },
          position: 'relative',
        }}
      >
        <Grid container spacing={4}>
          {/* Form card */}
          <Grid item xs={12} md={7}>
            <Paper
              elevation={6}
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: 4,
                backdropFilter: 'blur(8px)',
                background: 'rgba(255,255,255,0.92)',
                border: '1px solid #e2e8f0',
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 800, mb: 1, color: '#0f172a' }}>
                Send us a message
              </Typography>
              <Typography sx={{ color: '#475569', mb: 2 }}>
                We usually reply within 1–2 business days.
              </Typography>

              <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Name"
                  required
                  margin="normal"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={!!errors.name}
                  helperText={errors.name}
                  inputProps={{ 'aria-required': 'true', autoComplete: 'name' }}
                />
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  required
                  margin="normal"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  inputProps={{ 'aria-required': 'true', autoComplete: 'email' }}
                />
                <TextField
                  fullWidth
                  label="Message"
                  required
                  multiline
                  rows={5}
                  margin="normal"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  error={!!errors.message}
                  helperText={errors.message}
                  inputProps={{ 'aria-required': 'true' }}
                />

                <FormControlLabel
                  sx={{ mt: 1 }}
                  control={
                    <Checkbox
                      checked={consent}
                      onChange={handleConsentChange}
                      name="consent"
                      color="primary"
                      inputProps={{ 'aria-required': 'true' }}
                    />
                  }
                  label={
                    <Typography component="span" sx={{ color: '#334155' }}>
                      I agree to the{' '}
                      <Link href="#" onClick={handleTosOpen} underline="hover" role="button" color="inherit">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link href="#" onClick={(e) => { e.preventDefault(); setOpenPrivacy(true); }} underline="hover" role="button" color="inherit">
                        Privacy Policy
                      </Link>
                      .
                    </Typography>
                  }
                />
                {consentError && (
                  <Typography role="alert" sx={{ color: '#dc2626', mt: 0.5, fontSize: '.9rem' }}>
                    {consentError}
                  </Typography>
                )}

                <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={isLoading}
                    sx={{
                      px: 3,
                      py: 1.25,
                      fontWeight: 800,
                      borderRadius: 3,
                      background: 'linear-gradient(90deg, #9333ea, #2563eb)',
                      '&:hover': { opacity: 0.95 },
                    }}
                    startIcon={isLoading ? <CircularProgress size={18} color="inherit" /> : null}
                  >
                    {isLoading ? 'Sending…' : 'Send message'}
                  </Button>
                  <Button
                    type="button"
                    variant="text"
                    onClick={() => {
                      setFormData({ name: '', email: '', message: '' });
                      setErrors({ name: '', email: '', message: '' });
                      setConsent(false);
                      setConsentError('');
                    }}
                    sx={{ fontWeight: 700 }}
                  >
                    Clear
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Info / socials card */}
          <Grid item xs={12} md={5}>
            <Paper
              component={motion.div}
              {...fadeUp(0.15)}
              elevation={4}
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: 4,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                border: '1px solid #e2e8f0',
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a' }}>
                Connect with us
              </Typography>
              <Typography sx={{ color: '#475569' }}>
                Follow along for updates, behind‑the‑scenes, and releases.
              </Typography>

              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton
                  href="https://www.facebook.com/profile.php?id=61563132061448"
                  target="_blank"
                  rel="noopener noreferrer"
                  color="primary"
                  title="Follow Amaze Puzzles on Facebook"
                  sx={{
                    bgcolor: 'rgba(37,99,235,0.08)',
                    '&:hover': { bgcolor: 'rgba(37,99,235,0.16)' },
                  }}
                >
                  <Facebook />
                </IconButton>
                <IconButton
                  href="https://www.instagram.com/amazepuzzles/"
                  target="_blank"
                  rel="noopener noreferrer"
                  color="primary"
                  title="Follow Amaze Puzzles on Instagram"
                  sx={{
                    bgcolor: 'rgba(147,51,234,0.08)',
                    '&:hover': { bgcolor: 'rgba(147,51,234,0.16)' },
                  }}
                >
                  <Instagram />
                </IconButton>
              </Box>

              <Divider sx={{ my: 1.5 }} />

              <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a' }}>
                Call us
              </Typography>
              <Typography sx={{ color: '#475569' }}>
                Phone:{' '}
                <Link href="tel:+12102141360" underline="hover">
                  (210) 214-1360
                </Link>
              </Typography>

              <Box
                sx={{
                  mt: 'auto',
                  p: 2,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, rgba(147,51,234,0.06), rgba(37,99,235,0.06))',
                  border: '1px solid #e2e8f0',
                }}
              >
                <Typography sx={{ color: '#334155' }}>
                  Prefer email? Reach us any time at{' '}
                  <Link href="mailto:hello@amazepuzzles.com" underline="hover">
                    hello@amazepuzzles.com
                  </Link>
                  .
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Toasts */}
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

      {/* Modals */}
      <TermsOfService open={openTos} handleClose={() => setOpenTos(false)} />
      <PrivacyPolicy open={openPrivacy} handleClose={() => setOpenPrivacy(false)} />
    </Container>
  );
};

export default ContactUs;
