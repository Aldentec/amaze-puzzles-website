import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardMedia,
  Grid,
  Chip,
  Stack,
  Divider,
} from '@mui/material';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import VerifiedIcon from '@mui/icons-material/Verified';
import PaymentsIcon from '@mui/icons-material/Payments';
import useCart from './Utils/useCart';
import CompletedPuzzle from '../../assets/images/grey-completed-puzzle.jpg';
import '../../App.css';

const fadeUp = (d = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut', delay: d } },
});

const Products = () => {
  const { cart, addToCart } = useCart();
  const navigate = useNavigate();
  const [inCart, setInCart] = useState(false);

  const product = {
    id: 1,
    title: 'Braille Skills Puzzle',
    description:
      'A fun, engaging way for learners of all ages to familiarize themselves with Braille. Through hands-on, multi-sensory challenges, users can develop and retain essential skills in Braille.',
    price: 134.99,
    weightOz: 16,
    img: CompletedPuzzle,
  };

  useEffect(() => {
    setInCart(cart.some((item) => item.id === product.id));
  }, [cart, product.id]);

  const handleAddToCart = () => {
    addToCart(product);
    if (window.gtag) {
      window.gtag('event', 'add_to_cart', {
        event_category: 'Ecommerce',
        event_label: product.title,
        value: product.price,
      });
    }
  };

  const handleViewCart = () => {
    navigate('/cart');
    if (window.gtag) {
      window.gtag('event', 'view_cart', {
        event_category: 'Ecommerce',
        event_label: 'Cart View',
      });
    }
  };

  const viewDetails = () => {
    navigate('/product-detail');
    if (window.gtag) {
      window.gtag('event', 'view_item', {
        event_category: 'Ecommerce',
        event_label: product.title,
      });
    }
  };

  const priceLabel = `$${product.price.toFixed(2)}`;
  const weightLabel =
    product.weightOz >= 16 ? `${(product.weightOz / 16).toFixed(1)} lb` : `${product.weightOz} oz`;

  return (
    <Container disableGutters sx={{ maxWidth: '100% !important', p: 0 }}>
      <Helmet>
        <title>Products | Amaze Puzzles</title>
        <meta
          name="description"
          content="Discover the Braille Skills Puzzle — a modern, play-based tool designed to enhance Braille literacy."
        />
      </Helmet>

      {/* Product body */}
      <Container
        maxWidth="lg"
        sx={{ padding: '25px !important', px: { xs: 3, sm: 5, md: 6 }, py: { xs: 6, md: 10 } }}
      >
        {/* ONE unified card for image + content */}
        <Card
          component={motion.section}
          {...fadeUp(0.05)}
          aria-labelledby="product-title"
          sx={{
            borderRadius: 4,
            border: '1px solid rgba(148,163,184,0.35)',
            backgroundImage:
              'linear-gradient(135deg, rgba(147,51,234,0.06), rgba(37,99,235,0.06))',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 20px 35px -20px rgba(2,6,23,0.25)',
            p: { xs: 2, md: 3 },
          }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: { xs: 2, md: 4 },
              alignItems: 'center',
            }}
          >
            {/* Image */}
            <Box sx={{ p: { xs: 1, md: 2 } }}>
              <CardMedia
                component="img"
                alt={product.title}
                image={product.img}
                title={product.title}
                sx={{
                  width: '100%',
                  height: { xs: 360, md: 520 },
                  objectFit: 'contain',
                  borderRadius: 2,
                  backgroundColor: 'rgba(255,255,255,0.55)',
                }}
              />
            </Box>

            {/* Content */}
            <Box sx={{ p: { xs: 1, md: 1 } }}>
              <Typography
                id="product-title"
                variant="h4"
                sx={{ fontWeight: 800, color: '#0f172a', mb: 1 }}
              >
                {product.title}
              </Typography>

              <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap' }}>
                <Chip label="Play-based learning" size="small" />
                <Chip label="Accessible & tactile" size="small" />
                <Chip label="Durable build" size="small" />
              </Stack>

              <Typography variant="body1" sx={{ color: '#475569', lineHeight: 1.8, mb: 2 }}>
                {product.description}
              </Typography>

              <Typography variant="caption" sx={{ display: 'block', color: '#64748b', mb: 1 }}>
                Colors may vary.
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Stack direction="row" alignItems="baseline" spacing={2} sx={{ mb: 2 }}>
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a' }}>
                  {priceLabel}
                </Typography>
              </Stack>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mb: 2 }}>
                <Button
                  onClick={handleAddToCart}
                  variant="contained"
                  size="large"
                  sx={{
                    flex: 1,
                    borderRadius: 2,
                    py: 1.25,
                    background: 'linear-gradient(90deg, #2563eb, #9333ea)',
                    '&:hover': { filter: 'brightness(0.95)' },
                  }}
                  aria-label={inCart ? 'Item in cart, add more' : 'Add item to cart'}
                >
                  {inCart ? 'In Cart — Add Another' : 'Add to Cart'}
                </Button>

                {inCart && (
                  <Button
                    onClick={handleViewCart}
                    variant="contained"
                    size="large"
                    sx={{
                      flex: 1,
                      borderRadius: 2,
                      py: 1.25,
                      bgcolor: '#16a34a',
                      '&:hover': { bgcolor: '#15803d' },
                    }}
                    aria-label="View items in cart"
                  >
                    View Cart
                  </Button>
                )}

                <Button
                  onClick={viewDetails}
                  variant="outlined"
                  size="large"
                  sx={{
                    flex: 1,
                    borderRadius: 2,
                    py: 1.25,
                    borderColor: '#93c5fd',
                    color: '#1d4ed8',
                    '&:hover': { borderColor: '#60a5fa', background: 'rgba(59,130,246,0.06)' },
                  }}
                  aria-label="View product details"
                >
                  View Details
                </Button>
              </Stack>
            </Box>
          </Box>
        </Card>

        {/* Info stripes */}
        <Grid container spacing={{ xs: 3, md: 4 }} sx={{ mt: { xs: 6, md: 10 } }}>
          <Grid item xs={12} md={4}>
            <Card
              component={motion.div}
              {...fadeUp(0.15)}
              sx={{
                borderRadius: 3,
                p: 3,
                border: '1px solid rgba(148,163,184,0.35)',
                backgroundImage:
                  'linear-gradient(135deg, rgba(147,51,234,0.06), rgba(37,99,235,0.06))',
                backdropFilter: 'blur(8px)',
                height: '100%',
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                Why it works
              </Typography>
              <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.8 }}>
                Tactile, game-like practice turns repetition into motivation — helping learners build
                confidence and retain Braille skills longer.
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card
              component={motion.div}
              {...fadeUp(0.2)}
              sx={{
                borderRadius: 3,
                p: 3,
                border: '1px solid rgba(148,163,184,0.35)',
                backgroundImage:
                  'linear-gradient(135deg, rgba(147,51,234,0.06), rgba(37,99,235,0.06))',
                backdropFilter: 'blur(8px)',
                height: '100%',
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                Great for
              </Typography>
              <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.8 }}>
                Classrooms, resource rooms, and at-home practice. Designed for diverse learners and
                adaptable to different goals.
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card
              component={motion.div}
              {...fadeUp(0.25)}
              sx={{
                borderRadius: 3,
                p: 3,
                border: '1px solid rgba(148,163,184,0.35)',
                backgroundImage:
                  'linear-gradient(135deg, rgba(147,51,234,0.06), rgba(37,99,235,0.06))',
                backdropFilter: 'blur(8px)',
                height: '100%',
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                What’s inside
              </Typography>
              <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.8 }}>
                Puzzle board and tactile pieces, plus a quick-start guide. <em>(Contents and colors may vary.)</em>
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
};

export default Products;
