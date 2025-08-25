import React, { useState } from 'react';
import { Box, Button, Typography, Card, CardContent, Stack, Alert } from '@mui/material';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#0f172a',
      fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#94a3b8',
      },
    },
    invalid: {
      color: '#dc2626',
      iconColor: '#dc2626',
    },
  },
};

const CheckoutForm = ({ clientSecret, onPaymentSuccess, shippingDetails }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    if (!stripe || !elements) return;

    setProcessing(true);
    const { error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: shippingDetails.name,
          email: shippingDetails.email,
          address: {
            line1: shippingDetails.address,
            city: shippingDetails.city,
            state: shippingDetails.state,
            postal_code: shippingDetails.zip,
            country: shippingDetails.country,
          },
        },
      },
    });
    setProcessing(false);

    if (stripeError) {
      setError(stripeError.message);
    } else {
      setSucceeded(true);
      onPaymentSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card
        sx={{
          borderRadius: 3,
          border: '1px solid rgba(148,163,184,0.35)',
          backgroundColor: 'rgba(255,255,255,0.82)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1 }}>
            Card Details
          </Typography>

          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              border: '1px solid rgba(148,163,184,0.35)',
              backgroundImage:
                'linear-gradient(135deg, rgba(147,51,234,0.04), rgba(37,99,235,0.04))',
            }}
          >
            <CardElement options={CARD_ELEMENT_OPTIONS} />
          </Box>

          <Stack spacing={1.25} sx={{ mt: 2 }}>
            {error && <Alert severity="error">{error}</Alert>}
            {succeeded && <Alert severity="success">Payment succeeded!</Alert>}
          </Stack>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={!stripe || succeeded || processing}
            sx={{
              mt: 2.5,
              borderRadius: 2,
              py: 1.2,
              background: 'linear-gradient(90deg, #2563eb, #9333ea)',
              '&:hover': { filter: 'brightness(0.95)' },
            }}
          >
            {processing ? 'Processing…' : 'Pay'}
          </Button>
        </CardContent>
      </Card>
    </form>
  );
};

export default CheckoutForm;
