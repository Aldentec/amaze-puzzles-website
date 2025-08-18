import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, Card, CardMedia, CardContent } from '@mui/material';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useCart from './Utils/useCart';
import CompletedPuzzle from '../../assets/images/grey-completed-puzzle.jpg';
import '../../App.css';

const Products = () => {
  const { cart, addToCart } = useCart();
  const navigate = useNavigate();
  const [inCart, setInCart] = useState(false);

  const product = {
    id: 1,
    title: 'Braille Skills Puzzle',
    description: 'This innovative puzzle offers a fun and engaging way for learners of all ages to familiarize themselves with Braille. Through hands-on activities and multi-sensory challenges, users can develop and retain essential skills in Braille.',
    price: 134.99,
    weight: 16, // Weight in ounces
    img: CompletedPuzzle,
  };

  useEffect(() => {
    const isInCart = cart.some((item) => item.id === product.id);
    setInCart(isInCart);
  }, [cart]);

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

  return (
    <Container className="products-container">
      <Helmet>
        <title>Products | Amaze Puzzles</title>
        <meta 
          name="description" 
          content="Discover our Braille Skills Puzzle, designed to enhance Braille literacy through fun and engaging activities. Perfect for learners of all ages."
        />
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Box my={4} className="section">
          <Card component="section" aria-labelledby="product-title">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <CardMedia
                component="img"
                alt={product.title}
                height="400"  // Increase the height to show more of the image
                image={product.img}
                title={product.title}
                sx={{ objectFit: 'contain' }}  // Change from 'cover' to 'contain' to fit the entire image within the given space
              />
            </motion.div>
            <CardContent>
              <Typography 
                id="product-title"
                variant="h4" 
                component="h1" 
                sx={{ textAlign: 'center', color: 'var(--primary-color)' }} 
                gutterBottom
              >
                <strong>{product.title}</strong>
              </Typography>
              <Typography variant="body1" paragraph>
                {product.description}
              </Typography>
              <Typography variant="caption" display="block" sx={{ fontStyle: 'italic', textAlign: 'center', marginTop: 1 }}>
                Colors may vary
              </Typography>
              <Typography 
                variant="h5" 
                component="p" 
                sx={{ textAlign: 'center', color: 'var(--primary-color)' }} 
                gutterBottom
              >
                ${product.price}
              </Typography>
              <Box 
                sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  gap: 2,
                  '@media (min-width:600px)': {
                    flexDirection: 'row', 
                    justifyContent: 'center', 
                    gap: 2,
                  } 
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: 'var(--primary-color)',
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: '#00509d',
                    },
                    width: '100%',
                    maxWidth: '200px',
                  }}
                  onClick={handleAddToCart}
                  aria-label={inCart ? 'Item in cart, add more' : 'Add item to cart'}
                >
                  {inCart ? 'In Cart' : 'Add to Cart'}
                </Button>
                {inCart && (
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: '#1B9710',
                      color: '#fff',
                      '&:hover': {
                        backgroundColor: '#158306',
                      },
                      width: '100%',
                      maxWidth: '200px',
                    }}
                    onClick={handleViewCart}
                    aria-label="View items in cart"
                  >
                    View Cart
                  </Button>
                )}
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: 'var(--primary-color)',
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: '#00509d',
                    },
                    width: '100%',
                    maxWidth: '200px',
                  }}
                  onClick={viewDetails}
                  aria-label="View product details"
                >
                  View Details
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </motion.div>
    </Container>
  );
};

export default Products;
