// src/components/Store/PaymentForm.js
import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button, Box } from '@mui/material';

const PaymentForm = ({ totalAmount, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error(error);
    } else {
      console.log('Received Stripe PaymentMethod:', paymentMethod);
      // Call your backend to process the payment
      onPaymentSuccess(paymentMethod);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <CardElement />
      <Button
        variant="contained"
        type="submit"
        sx={{
          backgroundColor: 'var(--primary-color)',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#00509d',
          },
          marginTop: 2,
        }}
        disabled={!stripe}
      >
        Pay ${totalAmount}
      </Button>
    </Box>
  );
};

export default PaymentForm;
