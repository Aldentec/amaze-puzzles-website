import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';

const BlogList = () => {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    fetch('/blogPosts.json') // Fetch the JSON file from the public directory
      .then((response) => response.json())
      .then((data) => setBlogPosts(data));
  }, []);

  return (
    <Container>
      <Helmet>
        <title>Blog | Amaze Puzzles</title>
        <meta name="description" content="Explore our blog to learn more about Braille literacy, play-based learning, and the impact of puzzles on education." />
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Box my={4}>
          <Typography variant="h3" sx={{ textAlign: 'center', color: 'var(--primary-color)' }} gutterBottom>
            Blog
          </Typography>
          <Grid container spacing={4}>
            {blogPosts.map((post) => (
              <Grid item xs={12} sm={6} md={4} key={post.id}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
                >
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardMedia
                      component="img"
                      alt={post.title}
                      image={post.img}
                      sx={{ 
                        height: 300, 
                        objectFit: 'cover', 
                        objectPosition: 'top'  // Start the image at the top
                      }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h5" component="div">
                        {post.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {post.excerpt}
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to={`/blog/post/${post.filename}`}  // Link to the specific post by filename
                        sx={{ marginTop: 2 }}
                      >
                        Read More
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </motion.div>
    </Container>
  );
};

export default BlogList;
