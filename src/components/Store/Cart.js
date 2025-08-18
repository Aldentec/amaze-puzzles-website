import React from 'react';
import { Container, Typography, Box, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, ListItemAvatar, Avatar, ButtonGroup } from '@mui/material';
import { Helmet } from 'react-helmet';
import DeleteIcon from '@mui/icons-material/Delete';
import useCart from './Utils/useCart';
import { useNavigate } from 'react-router-dom';
import '../../App.css';

const Cart = () => {
  const { cart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (window.gtag) {
      window.gtag('event', 'begin_checkout', {
        event_category: 'Ecommerce',
        event_label: 'Checkout Started',
        value: cart.reduce((total, product) => total + (product.price * product.quantity), 0),
      });
    }
    navigate('/checkout');
  };

  const handleRemoveFromCart = (product) => {
    if (window.gtag) {
      window.gtag('event', 'remove_from_cart', {
        event_category: 'Ecommerce',
        event_label: product.title,
        value: product.price * product.quantity,
      });
    }
    removeFromCart(product.id);
  };

  const handleClearCart = () => {
    if (window.gtag) {
      window.gtag('event', 'clear_cart', {
        event_category: 'Ecommerce',
        event_label: 'Cart Cleared',
        value: cart.reduce((total, product) => total + (product.price * product.quantity), 0),
      });
    }
    clearCart();
  };

  return (
    <Container className="cart-container">
      <Helmet>
        <title>Your Cart | Amaze Puzzles</title>
        <meta 
          name="description" 
          content="Review the items in your cart and proceed to checkout. Amaze Puzzles offers a variety of engaging puzzles to enhance Braille literacy and support diverse learners."
        />
      </Helmet>
      <Box my={4} className="section">
        <Typography variant="h4" component="h1" sx={{ textAlign: 'center', color: 'var(--primary-color)' }} gutterBottom>
          Your Cart
        </Typography>
        {cart.length === 0 ? (
          <Typography variant="body1" sx={{ textAlign: 'center' }}>
            Your cart is empty.
          </Typography>
        ) : (
          <List>
            {cart.map((product) => (
              <ListItem key={product.id} alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    alt={product.title}
                    src={product.img}
                    variant="square"
                    sx={{ width: 56, height: 56 }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={product.title}
                  secondary={`Price: $${product.price}`}
                  sx={{ paddingLeft: 2 }}
                />
                <ButtonGroup size="small" sx={{ marginLeft: 2 }}>
                  <Button onClick={() => decreaseQuantity(product.id)}>-</Button>
                  <Button disabled>{product.quantity}</Button>
                  <Button onClick={() => increaseQuantity(product.id)}>+</Button>
                </ButtonGroup>
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveFromCart(product)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        )}
        {cart.length > 0 && (
          <Box sx={{ textAlign: 'center', marginTop: 2 }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: 'var(--primary-color)',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#00509d',
                },
                marginRight: 2,
              }}
              onClick={handleClearCart}
            >
              Clear Cart
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: 'var(--primary-color)',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#00509d',
                },
              }}
              onClick={handleCheckout}
            >
              Checkout
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Cart;
