import React, { useMemo } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Divider,
  Stack,
  Chip,
  Grid,
} from '@mui/material';
import { Helmet } from 'react-helmet';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import useCart from './Utils/useCart';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import '../../App.css';

const Cart = () => {
  const { cart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useCart();
  const navigate = useNavigate();

  const subtotal = useMemo(
    () => cart.reduce((sum, p) => sum + p.price * (p.quantity ?? 1), 0),
    [cart]
  );
  const itemCount = useMemo(
    () => cart.reduce((sum, p) => sum + (p.quantity ?? 1), 0),
    [cart]
  );

  const handleCheckout = () => {
    if (window.gtag) {
      window.gtag('event', 'begin_checkout', {
        event_category: 'Ecommerce',
        event_label: 'Checkout Started',
        value: subtotal,
      });
    }
    navigate('/checkout');
  };

  const handleRemoveFromCart = (product) => {
    if (window.gtag) {
      window.gtag('event', 'remove_from_cart', {
        event_category: 'Ecommerce',
        event_label: product.title,
        value: product.price * (product.quantity ?? 1),
      });
    }
    removeFromCart(product.id);
  };

  const handleClearCart = () => {
    if (window.gtag) {
      window.gtag('event', 'clear_cart', {
        event_category: 'Ecommerce',
        event_label: 'Cart Cleared',
        value: subtotal,
      });
    }
    clearCart();
  };

  return (
    <Container disableGutters sx={{ maxWidth: '100% !important', p: 0 }}>
      <Helmet>
        <title>Your Cart | Amaze Puzzles</title>
        <meta
          name="description"
          content="Review the items in your cart and proceed to checkout. Amaze Puzzles offers a variety of engaging puzzles to enhance Braille literacy and support diverse learners."
        />
      </Helmet>

     
      {/* Cart body */}
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
            {/* Line items */}
            <Grid item xs={12} md={8}>
              <Stack spacing={2.5}>
                {cart.map((product) => {
                  const qty = product.quantity ?? 1;
                  const lineTotal = (product.price * qty).toFixed(2);
                  return (
                    <Card
                      key={product.id}
                      sx={{
                        borderRadius: 3,
                        overflow: 'hidden',
                        border: '1px solid rgba(148,163,184,0.35)',
                        backgroundColor: 'rgba(255,255,255,0.82)',
                        backdropFilter: 'blur(8px)',
                        boxShadow: '0 20px 35px -20px rgba(2,6,23,0.25)',
                      }}
                    >
                      <Stack direction="row" spacing={2} sx={{ p: { xs: 2, md: 2.5 } }}>
                        <CardMedia
                          component="img"
                          image={product.img}
                          alt={product.title}
                          sx={{
                            width: 112,
                            height: 112,
                            objectFit: 'contain',
                            borderRadius: 2,
                            border: '1px solid rgba(148,163,184,0.35)',
                            backgroundImage:
                              'linear-gradient(135deg, rgba(147,51,234,0.04), rgba(37,99,235,0.04))',
                          }}
                        />
                        <CardContent sx={{ p: 0, flex: 1 }}>
                          <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            justifyContent="space-between"
                            alignItems={{ xs: 'flex-start', sm: 'center' }}
                            spacing={1}
                          >
                            <Typography variant="h6" sx={{ fontWeight: 800 }}>
                              {product.title}
                            </Typography>
                            <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                              ${lineTotal}
                            </Typography>
                          </Stack>

                          <Typography sx={{ color: '#64748b', mt: 0.5 }}>
                            Price: ${product.price.toFixed(2)}
                          </Typography>

                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                            sx={{ mt: 1.25, flexWrap: 'wrap' }}
                          >
                            <IconButton
                              size="small"
                              aria-label="Decrease quantity"
                              onClick={() => decreaseQuantity(product.id)}
                            >
                              <RemoveIcon fontSize="small" />
                            </IconButton>
                            <Box
                              aria-live="polite"
                              aria-atomic="true"
                              sx={{
                                px: 1.25,
                                py: 0.5,
                                borderRadius: 1.25,
                                border: '1px solid #e2e8f0',
                                minWidth: 40,
                                textAlign: 'center',
                                fontWeight: 700,
                              }}
                            >
                              {qty}
                            </Box>
                            <IconButton
                              size="small"
                              aria-label="Increase quantity"
                              onClick={() => increaseQuantity(product.id)}
                            >
                              <AddIcon fontSize="small" />
                            </IconButton>

                            <Divider orientation="vertical" flexItem sx={{ mx: 1.5 }} />

                            <IconButton
                              aria-label={`Remove ${product.title}`}
                              onClick={() => handleRemoveFromCart(product)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Stack>
                        </CardContent>
                      </Stack>
                    </Card>
                  );
                })}
              </Stack>

              <Stack direction="row" spacing={1.5} sx={{ mt: 3, flexWrap: 'wrap' }}>
                <Button
                  variant="outlined"
                  startIcon={<ArrowBackIcon />}
                  component={RouterLink}
                  to="/products"
                  sx={{
                    borderRadius: 2,
                    borderColor: '#93c5fd',
                    color: '#1d4ed8',
                    '&:hover': { borderColor: '#60a5fa', background: 'rgba(59,130,246,0.06)' },
                  }}
                >
                  Continue shopping
                </Button>
                <Button
                  variant="text"
                  onClick={handleClearCart}
                  sx={{ color: '#ef4444', fontWeight: 700 }}
                >
                  Clear cart
                </Button>
              </Stack>
            </Grid>

            {/* Order summary (sticky on desktop) */}
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
                  <Stack direction="row" justifyContent="space-between">
                    <Typography color="text.secondary">Items</Typography>
                    <Typography>{itemCount}</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography color="text.secondary">Subtotal</Typography>
                    <Typography sx={{ fontWeight: 700 }}>
                      ${subtotal.toFixed(2)}
                    </Typography>
                  </Stack>
                </Stack>

                <Typography variant="caption" sx={{ color: '#64748b' }}>
                  Taxes & shipping calculated at checkout.
                </Typography>

                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<ShoppingCartCheckoutIcon />}
                  onClick={handleCheckout}
                  sx={{
                    mt: 2.5,
                    borderRadius: 2,
                    py: 1.25,
                    background: 'linear-gradient(90deg, #2563eb, #9333ea)',
                    '&:hover': { filter: 'brightness(0.95)' },
                  }}
                >
                  Proceed to Checkout
                </Button>
              </Card>
            </Grid>
          </Grid>
        )}
      </Container>
    </Container>
  );
};

export default Cart;
