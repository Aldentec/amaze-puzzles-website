// src/StripeContext.js
import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_live_51Pj9fYLsZ5NRR7jOiwB8G78rp2I9d1MRQLfNZtTQVMyT1ICBw3I6htY1MEBHQMN4nbeP82mgbTT9U0KXj3Ds9C9p00XsN4HceT');

const StripeContext = ({ children }) => (
  <Elements stripe={stripePromise}>
    {children}
  </Elements>
);

export default StripeContext;
