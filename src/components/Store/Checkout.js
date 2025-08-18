import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, TextField, Grid } from '@mui/material';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import useCart from './Utils/useCart';
import StripeContext from './Utils/StripeContext'; 
import CheckoutForm from './CheckoutForm'; 

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

  const validateForm = (details) => {
    const allFieldsFilled = Object.values(details).every((value) => value.trim() !== '');

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailPattern.test(details.email);

    const isAddressValid = details.address.trim().length > 3 &&
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
    let shippingCost = baseRate;

    if (numberOfPuzzles > 1) {
      shippingCost += (numberOfPuzzles - 1) * additionalRate;
    }

    setShippingCost(shippingCost);
    setShippingCalculated(true);
  };

  const handleCheckout = async () => {
    if (!isFormValid) {
      alert("Please ensure all fields are correctly filled out and shipping has been calculated before proceeding.");
      return;
    }
  
    try {
      const response = await fetch('https://szzub6lsxe.execute-api.us-west-2.amazonaws.com/prod/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: calculateAmount(),
          currency: 'usd',
          shippingDetails, 
        }),
      });
  
      const result = await response.json();
  
      // If the result is already a JSON object
      if (!result.clientSecret) {
        throw new Error("Client secret is missing");
      }
  
      setClientSecret(result.clientSecret);
      setShowPaymentForm(true);
  
      if (window.gtag) {
        window.gtag('event', 'begin_payment', {
          event_category: 'Ecommerce',
          event_label: 'Proceed to Payment',
          value: calculateAmount() / 100, // Convert cents back to dollars
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
        value: calculateAmount() / 100,  // Convert from cents to dollars
      });
    }

    try {
      const response = await fetch('https://szzub6lsxe.execute-api.us-west-2.amazonaws.com/prod/payment-confirmation-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shippingDetails }),
      });

      if (!response.ok) {
        throw new Error('Failed to send shipping details');
      }

      navigate('/confirmation');
    } catch (error) {
      console.error('Error sending shipping details:', error);
    }
  };

  const calculateAmount = () => {
    const totalAmount = cart.reduce((total, product) => total + product.price * product.quantity, 0) + shippingCost;
    return Math.round(totalAmount * 100); // Convert dollars to cents and round to nearest integer
  };
  

  const totalAmount = (cart.reduce((total, product) => total + product.price * product.quantity, 0) + shippingCost).toFixed(2); // Format for display

  return (
    <Container className="checkout-container">
      <Helmet>
        <title>Checkout | Amaze Puzzles</title>
        <meta 
          name="description" 
          content="Complete your purchase at Amaze Puzzles. Review your cart items, provide shipping details, and proceed to payment."
        />
      </Helmet>
      <Box my={4} className="section">
        <Typography variant="h4" component="h1" sx={{ textAlign: 'center', color: 'var(--primary-color)' }} gutterBottom>
          Checkout
        </Typography>
        {cart.length === 0 ? (
          <Typography variant="body1" sx={{ textAlign: 'center' }}>
            Your cart is empty.
          </Typography>
        ) : (
          <Box>
            <Typography variant="h5" gutterBottom>Shipping Details</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Name"
                  name="name"
                  fullWidth
                  value={shippingDetails.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Address"
                  name="address"
                  fullWidth
                  value={shippingDetails.address}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="City"
                  name="city"
                  fullWidth
                  value={shippingDetails.city}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  label="State"
                  name="state"
                  fullWidth
                  value={shippingDetails.state}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  label="ZIP Code"
                  name="zip"
                  fullWidth
                  value={shippingDetails.zip}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Country"
                  name="country"
                  fullWidth
                  value={shippingDetails.country}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  fullWidth
                  value={shippingDetails.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: 'var(--primary-color)',
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: '#00509d',
                    },
                  }}
                  onClick={handleCalculateShipping}
                >
                  Calculate Shipping
                </Button>
              </Grid>
            </Grid>
            <Box mt={2}>
              <Typography variant="h6">Shipping Cost: ${shippingCost.toFixed(2)}</Typography>
            </Box>
            <Box mt={2}>
              <Typography variant="h5" gutterBottom>Order Summary</Typography>
              {cart.map((product) => (
                <Box key={product.id} sx={{ display: 'flex', justifyContent: 'space-between', padding: 1 }}>
                  <Typography>{product.title} (x{product.quantity})</Typography>
                  <Typography>${(product.price * product.quantity).toFixed(2)}</Typography>
                </Box>
              ))}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 1, borderTop: '1px solid #ccc' }}>
                <Typography><strong>Total</strong></Typography>
                <Typography><strong>${totalAmount}</strong></Typography>
              </Box>
            </Box>
            {showPaymentForm ? (
              <StripeContext> 
                <CheckoutForm clientSecret={clientSecret} onPaymentSuccess={handlePaymentSuccess} shippingDetails={shippingDetails} />
              </StripeContext>
            ) : (
              <Box sx={{ textAlign: 'center', marginTop: 2 }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: 'var(--primary-color)',
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: isFormValid ? '#00509d' : 'var(--primary-color)',
                    },
                    marginRight: 2,
                  }}
                  onClick={handleCheckout}
                  disabled={!isFormValid}
                >
                  Proceed to Payment
                </Button>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Checkout;
