import React from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Stack,
  Button,
  Chip,
  Divider,
  Link,
} from '@mui/material';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import ShieldRoundedIcon from '@mui/icons-material/ShieldRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ShoppingBagRoundedIcon from '@mui/icons-material/ShoppingBagRounded';
import PrintRoundedIcon from '@mui/icons-material/PrintRounded';
import '../../App.css';

const fadeUp = (d = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut', delay: d } },
});

const Confirmation = () => {
  return (
    <Container disableGutters sx={{ maxWidth: '100% !important', p: 0 }}>
      <Helmet>
        <title>Order Confirmation | Amaze Puzzles</title>
        <meta
          name="description"
          content="Thank you for your purchase at Amaze Puzzles. Your order has been successfully placed and is being processed."
        />
      </Helmet>

      {/* Gradient header */}
      <Box
        component={motion.header}
        {...fadeUp(0)}
        sx={{
          position: 'relative',
          color: 'white',
          textAlign: 'center',
          overflow: 'hidden',
          pt: { xs: 6, md: 9 },
          pb: { xs: 6, md: 9 },
          background: 'linear-gradient(135deg, rgba(147,51,234,0.95), rgba(37,99,235,0.95))',
        }}
      >
        {/* soft blobs */}
        <Box sx={{
          position: 'absolute', top: '12%', right: -90, width: 320, height: 320,
          bgcolor: 'rgba(255,255,255,0.12)', borderRadius: '50%', filter: 'blur(60px)',
        }} />
        <Box sx={{
          position: 'absolute', bottom: '12%', left: -110, width: 300, height: 300,
          bgcolor: 'rgba(255,255,255,0.12)', borderRadius: '50%', filter: 'blur(60px)',
        }} />

        <Container maxWidth="lg" sx={{ position: 'relative', px: { xs: 3, sm: 5, md: 6 } }}>
          <Stack alignItems="center" spacing={2}>
            <CheckCircleRoundedIcon sx={{ fontSize: 56 }} />
            <Typography variant="h2" sx={{ fontWeight: 800, lineHeight: 1.1 }}>
              Thank you! Your order is confirmed.
            </Typography>
            <Typography sx={{ opacity: 0.95 }}>
              We’re processing it now. You’ll receive an email receipt and shipping updates shortly.
            </Typography>

            <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap' }} justifyContent="center">
              <Chip
                icon={<EmailRoundedIcon sx={{ color: 'inherit !important' }} />}
                label="Receipt sent to your email"
                sx={{ bgcolor: 'rgba(255,255,255,.18)', color: 'white', fontWeight: 700 }}
              />
              <Chip
                icon={<ShieldRoundedIcon sx={{ color: 'inherit !important' }} />}
                label="Secure purchase"
                sx={{ bgcolor: 'rgba(255,255,255,.18)', color: 'white', fontWeight: 700 }}
              />
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* Body */}
      <Container
        maxWidth="lg"
        sx={{ padding: '25px !important', px: { xs: 3, sm: 5, md: 6 }, py: { xs: 6, md: 10 } }}
      >
        <Card
          component={motion.section}
          {...fadeUp(0.05)}
          sx={{
            borderRadius: 4,
            border: '1px solid rgba(148,163,184,0.35)',
            backgroundColor: 'rgba(255,255,255,0.82)',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 20px 35px -20px rgba(2,6,23,0.25)',
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
              What happens next
            </Typography>
            <Typography sx={{ color: '#475569', mb: 2 }}>
              We’ll email your receipt and shipping details to the address you provided at checkout.
              If you don’t see it, please check your spam or promotions folder.
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Stack spacing={1.5} sx={{ color: '#334155' }}>
              <Typography>
                • <strong>Processing:</strong> Your order is being prepared for shipment.
              </Typography>
              <Typography>
                • <strong>Questions?</strong> Reach us any time on our <Link component={RouterLink} to="/contact" underline="hover">Contact</Link> page.
              </Typography>
            </Stack>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={1.5}
              sx={{ mt: 3 }}
              justifyContent="center"
            >
              <Button
                component={RouterLink}
                to="/"
                startIcon={<HomeRoundedIcon />}
                variant="outlined"
                sx={{
                  borderRadius: 2,
                  borderColor: '#93c5fd',
                  color: '#1d4ed8',
                  '&:hover': { borderColor: '#60a5fa', background: 'rgba(59,130,246,0.06)' },
                }}
              >
                Go to Home
              </Button>
              <Button
                component={RouterLink}
                to="/products"
                startIcon={<ShoppingBagRoundedIcon />}
                variant="contained"
                sx={{
                  borderRadius: 2,
                  py: 1.1,
                  background: 'linear-gradient(90deg, #2563eb, #9333ea)',
                  '&:hover': { filter: 'brightness(0.95)' },
                }}
              >
                Continue Shopping
              </Button>
              <Button
                onClick={() => window.print()}
                startIcon={<PrintRoundedIcon />}
                variant="text"
                sx={{ color: '#475569' }}
              >
                Print this page
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Container>
  );
};

export default Confirmation;
