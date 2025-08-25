import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Link as MuiLink,
  Stack,
  Divider,
  Button,
} from '@mui/material';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SchoolIcon from '@mui/icons-material/School';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import PublicIcon from '@mui/icons-material/Public';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';

import joshImage from '../assets/images/josh-simpson.jpg';
import dorianImage from '../assets/images/dorian-simpson.jpg';
import christopherImage from '../assets/images/chrisrtopher-animated.jpg';
import '../App.css';

const teamMembers = [
  { name: 'Josh', role: 'Main Guy', image: joshImage },
  { name: 'Dorian', role: 'Tech Dude', image: dorianImage },
  { name: 'Christopher', role: 'Wellness Guy', image: christopherImage },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', delay } },
});

const AboutUs = () => {
  return (
    <Container sx={{ p: 0, maxWidth: '100% !important' }}>
      <Helmet>
        <title>About Us | Amaze Puzzles</title>
        <meta
          name="description"
          content="Learn about Amaze Puzzles, our mission, values, and the team dedicated to creating engaging and educational puzzles designed to enhance Braille literacy and support diverse learners."
        />
      </Helmet>

      {/* Skip link for a11y */}
      <MuiLink
        href="#main-content"
        sx={{
          position: 'absolute',
          left: '-999px',
          top: 'auto',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
          zIndex: -1,
          '&:focus': { left: 0, width: 'auto', height: 'auto', p: 2, zIndex: 1000, bgcolor: 'white' },
        }}
      >
        Skip to main content
      </MuiLink>

      {/* Header / hero stripe */}
      <Box
        component={motion.section}
        {...fadeUp(0)}
        sx={{
          position: 'relative',
          py: { xs: 10, md: 14 },
          px: { xs: 2, sm: 4, md: 6 },
          background: 'linear-gradient(135deg, rgba(147,51,234,0.95), rgba(37,99,235,0.95))',
          color: 'white',
          overflow: 'hidden',
        }}
      >
        {/* Soft blobs */}
        <Box
          sx={{
            position: 'absolute',
            top: '15%',
            right: -80,
            width: 320,
            height: 320,
            bgcolor: 'rgba(255,255,255,0.15)',
            borderRadius: '50%',
            filter: 'blur(60px)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '10%',
            left: -80,
            width: 280,
            height: 280,
            bgcolor: 'rgba(255,255,255,0.12)',
            borderRadius: '50%',
            filter: 'blur(60px)',
          }}
        />

        <Box id="main-content" sx={{ maxWidth: 1200, mx: 'auto', textAlign: 'center', position: 'relative' }}>
          <Typography variant="h2" sx={{ fontWeight: 800, lineHeight: 1.1 }}>
            About Amaze Puzzles
          </Typography>
          <Typography variant="h6" sx={{ mt: 2, opacity: 0.95, maxWidth: 820, mx: 'auto' }}>
            Puzzles & play-based learning that make essential skills accessible—and fun—for visually
            impaired and diverse learners.
          </Typography>
        </Box>
      </Box>

      {/* Mission card */}
      <Box
        component={motion.section}
        {...fadeUp(0.1)}
        sx={{ maxWidth: 1100, mx: 'auto', px: { xs: 2, sm: 4 }, mt: -6, position: 'relative' }}
      >
        <Card
          elevation={6}
          sx={{
            borderRadius: 4,
            p: { xs: 3, md: 4 },
            backdropFilter: 'blur(8px)',
            background: 'rgba(255,255,255,0.9)',
            border: '1px solid #e2e8f0',
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, color: '#0f172a' }}>
            Mission Statement
          </Typography>
          <Typography sx={{ color: '#475569', fontSize: '1.125rem' }}>
            Through the power of puzzles & play-based learning, Amaze Puzzles™ aims to help diverse learners acquire
            and develop essential life skills.
          </Typography>
        </Card>
      </Box>

      {/* Our story */}
      <Box component={motion.section} {...fadeUp(0.2)} sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, sm: 4 }, py: { xs: 8, md: 10 } }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 2, color: '#0f172a' }}>
              Our Story
            </Typography>
            <Stack spacing={2} sx={{ color: '#475569', fontSize: '1.05rem' }}>
              <Typography>
                Amaze Puzzles™ was founded to create engaging, educational puzzles that meet the needs of diverse learners.
              </Typography>
              <Typography>
                Our patent‑pending Braille Introduction & Skill Retention Puzzle empowers visually impaired learners to
                build and retain essential life skills—through play.
              </Typography>
              <Typography>
                This is just the start. We’re building a playful ecosystem that supports different learning styles and
                social communication needs, making learning both accessible and joyful.
              </Typography>
              <Typography sx={{ fontWeight: 700, color: '#0f172a' }}>
                Our mission: create impactful solutions that make a real difference.
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card
              elevation={4}
              sx={{
                p: 3,
                borderRadius: 4,
                background: 'linear-gradient(135deg, rgba(147,51,234,0.08), rgba(37,99,235,0.08))',
                border: '1px solid #e2e8f0',
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, color: '#334155' }}>
                What guides us
              </Typography>
              <Typography sx={{ color: '#475569' }}>
                We design with learners first, test with educators and families, and ship improvements quickly. Play is
                our medium; inclusion is our measure.
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                <Chip icon={<AccessibilityNewIcon />} label="Accessibility‑first" />
                <Chip icon={<SchoolIcon />} label="Learning outcomes" />
                <Chip icon={<PsychologyIcon />} label="Evidence‑informed" />
                <Chip icon={<FavoriteIcon />} label="Joyful by design" />
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Meet the team */}
      <Box component={motion.section} {...fadeUp(0.2)} sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, sm: 4 }, pb: { xs: 8, md: 10 } }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 3, color: '#0f172a', textAlign: 'center' }}>
          Meet the Team
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {teamMembers.map((m, i) => (
            <Grid item xs={12} sm={6} md={4} key={m.name}>
              <Card
                component={motion.div}
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                elevation={3}
                sx={{
                  borderRadius: 4,
                  overflow: 'hidden',
                  '&:hover': { boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)' },
                }}
                aria-label={`${m.name} – ${m.role}`}
              >
                <Box sx={{ position: 'relative', pt: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CardMedia
                      component="img"
                      image={m.image}
                      alt={m.name}
                      sx={{
                        width: 160,
                        height: 160,
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '4px solid white',
                        boxShadow: '0 10px 25px -8px rgba(0,0,0,.25)',
                      }}
                    />
                  </Box>
                </Box>
                <CardContent sx={{ textAlign: 'center', pt: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a' }}>
                    {m.name}
                  </Typography>
                  <Typography sx={{ color: '#475569', mb: 1 }}>{m.role}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Typography sx={{ mt: 4, color: '#475569', maxWidth: 900, mx: 'auto', textAlign: 'center' }}>
          We’re a small, dedicated team passionate about making learning accessible. Our varied backgrounds help us build
          inclusive, engaging puzzles that inspire and educate—so every learner can reach their potential.
        </Typography>
      </Box>

      {/* CTA footer strip */}
      <Box
        component={motion.section}
        {...fadeUp(0.1)}
        sx={{
          py: { xs: 8, md: 10 },
          px: { xs: 2, sm: 4 },
          background: 'linear-gradient(90deg, rgba(147,51,234,0.9), rgba(37,99,235,0.9))',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>
          Ready to see our puzzles in action?
        </Typography>
        <Typography sx={{ opacity: 0.95, mb: 3, maxWidth: 820, mx: 'auto' }}>
          Explore our Braille‑focused kits and activities designed with inclusion and joy at the core.
        </Typography>
        <Button
          component="a"
          href="/products"
          size="large"
          sx={{
            px: 4,
            py: 1.25,
            fontWeight: 800,
            borderRadius: 3,
            bgcolor: 'white',
            color: '#1e293b',
            '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
          }}
        >
          Browse Products
        </Button>
      </Box>
    </Container>
  );
};

export default AboutUs;
