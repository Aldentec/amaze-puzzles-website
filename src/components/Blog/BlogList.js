import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Stack,
  Skeleton,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', delay } },
});

const BlogList = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/blogPosts.json')
      .then((res) => res.json())
      .then((data) => {
        // Optional: sort newest first if you have `date`
        const sorted = [...data].sort((a, b) => {
          const ad = a.date ? new Date(a.date).getTime() : 0;
          const bd = b.date ? new Date(b.date).getTime() : 0;
          return bd - ad;
        });
        setBlogPosts(sorted);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container sx={{ p: 0, maxWidth: '100% !important' }}>
      <Helmet>
        <title>Blog | Amaze Puzzles</title>
        <meta
          name="description"
          content="Explore our blog to learn more about Braille literacy, play-based learning, and the impact of puzzles on education."
        />
      </Helmet>

      {/* Gradient header */}
      <Box
        component={motion.section}
        {...fadeUp(0)}
        sx={{
          py: { xs: 10, md: 14 },
          px: { xs: 2, sm: 4, md: 6 },
          background: 'linear-gradient(135deg, rgba(147,51,234,0.95), rgba(37,99,235,0.95))',
          color: 'white',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute', top: '15%', right: -80, width: 320, height: 320,
            bgcolor: 'rgba(255,255,255,0.12)', borderRadius: '50%', filter: 'blur(60px)',
          }}
        />
        <Box
          sx={{
            position: 'absolute', bottom: '12%', left: -90, width: 280, height: 280,
            bgcolor: 'rgba(255,255,255,0.1)', borderRadius: '50%', filter: 'blur(60px)',
          }}
        />
        <Typography variant="h2" sx={{ fontWeight: 800, lineHeight: 1.1, position: 'relative' }}>
          Blog
        </Typography>
        <Typography variant="h6" sx={{ mt: 2, opacity: 0.95, maxWidth: 820, mx: 'auto' }}>
          Insights on Braille literacy, inclusive design, and play-based learning.
        </Typography>
      </Box>

      {/* Blog grid */}
      <Box
        component={motion.section}
        {...fadeUp(0.1)}
        sx={{
          maxWidth: 1200,
          mx: 'auto',
          px: { xs: 2, sm: 4 },
          mt: -6,
          pb: { xs: 8, md: 12 },
          position: 'relative',
        }}
      >
        <Grid container spacing={3}>
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <Grid item xs={12} sm={6} md={4} key={`sk-${i}`}>
                  <Card sx={{ borderRadius: 3, overflow: 'hidden' }}>
                    <Skeleton variant="rectangular" height={220} />
                    <Box sx={{ p: 2 }}>
                      <Skeleton width="80%" height={34} />
                      <Skeleton width="60%" />
                      <Skeleton width="90%" />
                    </Box>
                  </Card>
                </Grid>
              ))
            : blogPosts.map((post, idx) => (
                <Grid item xs={12} sm={6} md={4} key={post.id ?? post.filename ?? idx}>
                  <Card
                    component={motion.div}
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.45, delay: (idx % 6) * 0.05 }}
                    elevation={4}
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 3,
                      overflow: 'hidden',
                      '&:hover': { boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)' },
                      border: '1px solid #e2e8f0',
                      background: 'white',
                    }}
                  >
                    {/* Image */}
                    <Box sx={{ position: 'relative' }}>
                      <CardMedia
                        component="img"
                        alt={post.title}
                        image={post.img}
                        sx={{
                          height: 220,
                          objectFit: 'cover',
                          objectPosition: 'center',
                        }}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          inset: 0,
                          background:
                            'linear-gradient(to top, rgba(0,0,0,0.28), rgba(0,0,0,0.0) 50%)',
                          pointerEvents: 'none',
                        }}
                      />
                      {(post.category || post.readTime) && (
                        <Stack
                          direction="row"
                          spacing={1}
                          sx={{ position: 'absolute', top: 10, left: 10 }}
                        >
                          {post.category && (
                            <Chip
                              size="small"
                              label={post.category}
                              sx={{
                                bgcolor: 'rgba(255,255,255,0.9)',
                                fontWeight: 700,
                              }}
                            />
                          )}
                          {post.readTime && (
                            <Chip
                              size="small"
                              label={`${post.readTime} min read`}
                              sx={{ bgcolor: 'rgba(255,255,255,0.9)' }}
                            />
                          )}
                        </Stack>
                      )}
                    </Box>

                    {/* Content */}
                    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a' }}>
                        {post.title}
                      </Typography>
                      {(post.author || post.date) && (
                        <Typography variant="caption" sx={{ color: '#64748b' }}>
                          {post.author ? `${post.author}` : ''}{post.author && post.date ? ' • ' : ''}
                          {post.date ? new Date(post.date).toLocaleDateString() : ''}
                        </Typography>
                      )}
                      <Typography sx={{ color: '#475569', mt: 0.5 }}>
                        {post.excerpt}
                      </Typography>
                      <Box sx={{ mt: 'auto' }}>
                        <Button
                          component={Link}
                          to={`/blog/post/${post.filename}`}
                          variant="contained"
                          sx={{
                            mt: 1.5,
                            fontWeight: 800,
                            borderRadius: 2,
                            textTransform: 'none',
                            background: 'linear-gradient(90deg, #9333ea, #2563eb)',
                            '&:hover': { opacity: 0.95 },
                          }}
                        >
                          Read more
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
        </Grid>

        {!loading && blogPosts.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 10, color: '#475569' }}>
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a' }}>
              No posts yet
            </Typography>
            <Typography>Check back soon for updates.</Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default BlogList;
