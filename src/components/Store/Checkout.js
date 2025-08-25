import React, { useState, useEffect, useMemo } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  TextField,
  Grid,
  Card,
  CardContent,
  Stack,
  Chip,
  Divider,
  Alert,
} from '@mui/material';
import { Helmet } from 'react-helmet';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ShieldIcon from '@mui/icons-material/Shield';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useCart from './Utils/useCart';
import StripeContext from './Utils/StripeContext';
import CheckoutForm from './CheckoutForm';
import '../../App.css';

const fadeUp = (d = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut', delay: d } },
});

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [shippingDetails, setShippingDetails] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    email: '',
  });
  const [shippingCost, setShippingCost] = useState(0);
  const [clientSecret, setClientSecret] = useState(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [shippingCalculated, setShippingCalculated] = useState(false);

  const cartSubtotal = useMemo(
    () => cart.reduce((t, p) => t + p.price * p.quantity, 0),
    [cart]
  );
  const itemCount = useMemo(
    () => cart.reduce((t, p) => t + p.quantity, 0),
    [cart]
  );

  const validateForm = (details) => {
    const allFieldsFilled = Object.values(details).every((v) => v.trim() !== '');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailPattern.test(details.email);
    const isAddressValid =
      details.address.trim().length > 3 &&
      details.city.trim().length > 1 &&
      details.state.trim().length === 2 &&
      details.zip.trim().length >= 5 &&
      details.country.trim().length >= 2;

    return allFieldsFilled && isEmailValid && isAddressValid && shippingCalculated;
  };

  useEffect(() => {
    setIsFormValid(validateForm(shippingDetails));
  }, [shippingDetails, shippingCalculated]);

  const handleChange = (e) => {
    setShippingDetails({ ...shippingDetails, [e.target.name]: e.target.value });
  };

  const handleCalculateShipping = () => {
    const baseRate = 9.99;
    const additionalRate = 2.99;

    const numberOfPuzzles = cart.reduce((total, item) => total + item.quantity, 0);
    let calc = baseRate + Math.max(0, numberOfPuzzles - 1) * additionalRate;

    setShippingCost(calc);
    setShippingCalculated(true);
  };

  const calculateAmount = () => {
    const totalAmount = cartSubtotal + shippingCost;
    return Math.round(totalAmount * 100); // cents
  };

  const totalAmountLabel = (cartSubtotal + shippingCost).toFixed(2);

  const handleCheckout = async () => {
    if (!isFormValid) {
      alert(
        'Please ensure all fields are correctly filled out and shipping has been calculated before proceeding.'
      );
      return;
    }

    try {
      const response = await fetch(
        'https://szzub6lsxe.execute-api.us-west-2.amazonaws.com/prod/create-payment-intent',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: calculateAmount(),
            currency: 'usd',
            shippingDetails,
          }),
        }
      );

      const result = await response.json();
      if (!result.clientSecret) {
        throw new Error('Client secret is missing');
      }

      setClientSecret(result.clientSecret);
      setShowPaymentForm(true);

      if (window.gtag) {
        window.gtag('event', 'begin_payment', {
          event_category: 'Ecommerce',
          event_label: 'Proceed to Payment',
          value: calculateAmount() / 100,
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handlePaymentSuccess = async () => {
    clearCart();

    if (window.gtag) {
      window.gtag('event', 'purchase', {
        event_category: 'Ecommerce',
        event_label: 'Payment Successful',
        value: calculateAmount() / 100,
      });
    }

    try {
      const response = await fetch(
        'https://szzub6lsxe.execute-api.us-west-2.amazonaws.com/prod/payment-confirmation-email',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ shippingDetails }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to send shipping details');
      }

      navigate('/confirmation');
    } catch (error) {
      console.error('Error sending shipping details:', error);
    }
  };

  return (
    <Container disableGutters sx={{ maxWidth: '100% !important', p: 0 }}>
      <Helmet>
        <title>Checkout | Amaze Puzzles</title>
        <meta
          name="description"
          content="Complete your purchase at Amaze Puzzles. Review your cart items, provide shipping details, and proceed to payment."
        />
      </Helmet>

      {/* Body */}
      <Container
        maxWidth="lg"
        sx={{ padding: '25px !important', px: { xs: 3, sm: 5, md: 6 }, py: { xs: 6, md: 10 } }}
      >
        {cart.length === 0 ? (
          <Card
            sx={{
              borderRadius: 4,
              p: { xs: 3, md: 4 },
              textAlign: 'center',
              border: '1px solid rgba(148,163,184,0.35)',
              backgroundImage:
                'linear-gradient(135deg, rgba(147,51,234,0.06), rgba(37,99,235,0.06))',
              boxShadow: '0 20px 35px -20px rgba(2,6,23,0.25)',
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
              Your cart is empty
            </Typography>
            <Typography sx={{ color: '#475569', mb: 3 }}>
              Add the Braille Skills Puzzle to get started.
            </Typography>
            <Button
              component={RouterLink}
              to="/products"
              variant="contained"
              startIcon={<ArrowBackIcon />}
              sx={{
                borderRadius: 2,
                py: 1.25,
                px: 3,
                background: 'linear-gradient(90deg, #2563eb, #9333ea)',
                '&:hover': { filter: 'brightness(0.95)' },
              }}
            >
              Continue Shopping
            </Button>
          </Card>
        ) : (
          <Grid container spacing={{ xs: 3, md: 4 }}>
            {/* Left: Shipping + Payment */}
            <Grid item xs={12} md={8}>
              {/* Shipping card */}
              <Card
                component="section"
                aria-labelledby="shipping-title"
                sx={{
                  mb: 3,
                  borderRadius: 4,
                  border: '1px solid rgba(148,163,184,0.35)',
                  backgroundColor: 'rgba(255,255,255,0.82)',
                  backdropFilter: 'blur(8px)',
                  boxShadow: '0 20px 35px -20px rgba(2,6,23,0.25)',
                }}
              >
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                  <Typography id="shipping-title" variant="h5" sx={{ fontWeight: 800, mb: 2 }}>
                    Shipping Details
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        label="Full Name"
                        name="name"
                        fullWidth
                        value={shippingDetails.name}
                        onChange={handleChange}
                        autoComplete="name"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Address"
                        name="address"
                        fullWidth
                        value={shippingDetails.address}
                        onChange={handleChange}
                        autoComplete="address-line1"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="City"
                        name="city"
                        fullWidth
                        value={shippingDetails.city}
                        onChange={handleChange}
                        autoComplete="address-level2"
                      />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <TextField
                        label="State (e.g., CA)"
                        name="state"
                        fullWidth
                        value={shippingDetails.state}
                        onChange={handleChange}
                        inputProps={{ maxLength: 2 }}
                        autoComplete="address-level1"
                      />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <TextField
                        label="ZIP Code"
                        name="zip"
                        fullWidth
                        value={shippingDetails.zip}
                        onChange={handleChange}
                        autoComplete="postal-code"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Country"
                        name="country"
                        fullWidth
                        value={shippingDetails.country}
                        onChange={handleChange}
                        autoComplete="country-name"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Email"
                        name="email"
                        type="email"
                        fullWidth
                        value={shippingDetails.email}
                        onChange={handleChange}
                        autoComplete="email"
                      />
                    </Grid>
                  </Grid>

                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mt: 2 }}>
                    <Button
                      variant="contained"
                      onClick={handleCalculateShipping}
                      startIcon={<LocalShippingIcon />}
                      sx={{
                        borderRadius: 2,
                        py: 1.1,
                        background: 'linear-gradient(90deg, #2563eb, #9333ea)',
                        '&:hover': { filter: 'brightness(0.95)' },
                      }}
                    >
                      Calculate Shipping
                    </Button>

                    <Chip
                      label={`Shipping: $${shippingCost.toFixed(2)}`}
                      color="default"
                      sx={{
                        fontWeight: 700,
                        bgcolor: 'rgba(37,99,235,0.10)',
                        borderRadius: 2,
                        alignSelf: 'center',
                      }}
                    />
                  </Stack>

                  {!shippingCalculated && (
                    <Alert severity="info" sx={{ mt: 2 }}>
                      Please calculate shipping before proceeding to payment.
                    </Alert>
                  )}
                </CardContent>
              </Card>

              {/* Payment card */}
              <Card
                component="section"
                aria-labelledby="payment-title"
                sx={{
                  borderRadius: 4,
                  border: '1px solid rgba(148,163,184,0.35)',
                  backgroundColor: 'rgba(255,255,255,0.82)',
                  backdropFilter: 'blur(8px)',
                  boxShadow: '0 20px 35px -20px rgba(2,6,23,0.25)',
                }}
              >
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                  <Typography id="payment-title" variant="h5" sx={{ fontWeight: 800, mb: 2 }}>
                    Payment
                  </Typography>

                  {showPaymentForm ? (
                    <StripeContext>
                      <CheckoutForm
                        clientSecret={clientSecret}
                        onPaymentSuccess={handlePaymentSuccess}
                        shippingDetails={shippingDetails}
                      />
                    </StripeContext>
                  ) : (
                    <>
                      <Typography sx={{ color: '#475569', mb: 2 }}>
                        Review your details and proceed to secure payment.
                      </Typography>
                      <Button
                        variant="contained"
                        onClick={handleCheckout}
                        disabled={!isFormValid}
                        startIcon={<CreditScoreIcon />}
                        sx={{
                          borderRadius: 2,
                          py: 1.25,
                          background: 'linear-gradient(90deg, #2563eb, #9333ea)',
                          '&:hover': { filter: 'brightness(0.95)' },
                        }}
                      >
                        Proceed to Payment
                      </Button>

                      {!isFormValid && (
                        <Typography sx={{ mt: 1.5, color: '#ef4444' }}>
                          Complete all fields and calculate shipping to continue.
                        </Typography>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>

              <Stack direction="row" spacing={1.5} sx={{ mt: 3, flexWrap: 'wrap' }}>
                <Button
                  variant="outlined"
                  startIcon={<ArrowBackIcon />}
                  component={RouterLink}
                  to="/cart"
                  sx={{
                    borderRadius: 2,
                    borderColor: '#93c5fd',
                    color: '#1d4ed8',
                    '&:hover': { borderColor: '#60a5fa', background: 'rgba(59,130,246,0.06)' },
                  }}
                >
                  Back to Cart
                </Button>
              </Stack>
            </Grid>

            {/* Right: Order summary */}
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  position: { md: 'sticky' },
                  top: { md: 112 },
                  borderRadius: 4,
                  p: { xs: 2.5, md: 3 },
                  border: '1px solid rgba(148,163,184,0.35)',
                  backgroundImage:
                    'linear-gradient(135deg, rgba(147,51,234,0.06), rgba(37,99,235,0.06))',
                  boxShadow: '0 20px 35px -20px rgba(2,6,23,0.25)',
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
                  Order Summary
                </Typography>

                <Stack spacing={1.25} sx={{ mb: 2 }}>
                  {cart.map((product) => (
                    <Stack
                      key={product.id}
                      direction="row"
                      justifyContent="space-between"
                      sx={{ color: '#334155' }}
                    >
                      <Typography>
                        {product.title} × {product.quantity}
                      </Typography>
                      <Typography>${(product.price * product.quantity).toFixed(2)}</Typography>
                    </Stack>
                  ))}
                </Stack>

                <Divider sx={{ my: 2 }} />

                <Stack spacing={1.25}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography color="text.secondary">Items ({itemCount})</Typography>
                    <Typography>${cartSubtotal.toFixed(2)}</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography color="text.secondary">Shipping</Typography>
                    <Typography>${shippingCost.toFixed(2)}</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography sx={{ fontWeight: 800 }}>Total</Typography>
                    <Typography sx={{ fontWeight: 800 }}>${totalAmountLabel}</Typography>
                  </Stack>
                </Stack>

                <Typography variant="caption" sx={{ color: '#64748b', mt: 1.5, display: 'block' }}>
                  Taxes & shipping calculated at checkout where applicable.
                </Typography>
              </Card>
            </Grid>
          </Grid>
        )}
      </Container>
    </Container>
  );
};

export default Checkout;
