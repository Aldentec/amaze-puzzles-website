import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#424770',
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};

const CheckoutForm = ({ clientSecret, onPaymentSuccess, shippingDetails }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [succeeded, setSucceeded] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error } = await stripe.confirmCardPayment(clientSecret, {
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

    if (error) {
      setError(error.message);
    } else {
      setSucceeded(true);
      onPaymentSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          border: '1px solid #e0e0e0',
          borderRadius: '4px',
          padding: '10px',
          marginBottom: '20px',
          backgroundColor: '#fafafa',
        }}
      >
        <CardElement options={CARD_ELEMENT_OPTIONS} />
      </Box>
      {error && <Typography color="error">{error}</Typography>}
      {succeeded && <Typography color="success">Payment succeeded!</Typography>}
      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{
          backgroundColor: 'var(--primary-color)',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#00509d',
          },
          marginTop: 2,
        }}
        disabled={!stripe || succeeded}
      >
        Pay
      </Button>
    </form>
  );
};

export default CheckoutForm;
