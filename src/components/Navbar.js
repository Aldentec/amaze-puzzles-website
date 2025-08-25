import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  Badge,
  IconButton,
  Tooltip,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import logo from '../assets/images/amaze-logo-text.png';
import useCart from './Store/Utils/useCart';
import '../App.css';

const navLinks = [
  { to: '/', label: 'Home', title: 'Go to the Home Page' },
  { to: '/about', label: 'About Us', title: 'Learn more about Amaze Puzzles' },
  { to: '/products', label: 'Products', title: 'View our Braille puzzles' },
  { to: '/blog', label: 'Blog', title: 'Read our Blog' },
  { to: '/contact', label: 'Contact Us', title: 'Get in touch with us' },
];

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [iconState, setIconState] = useState('hamburger');
  const [elevated, setElevated] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { cart } = useCart();

  const handleDrawerToggle = () => {
    if (iconState === 'close') {
      setSpinning(true);
      setTimeout(() => {
        setDrawerOpen((v) => !v);
        setIconState((s) => (s === 'hamburger' ? 'close' : 'hamburger'));
        setSpinning(false);
      }, 500);
    } else {
      setDrawerOpen((v) => !v);
      setIconState((s) => (s === 'hamburger' ? 'close' : 'hamburger'));
    }
  };

  useEffect(() => {
    const onScroll = () => setElevated(window.scrollY > 6);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <AppBar
        position="fixed"
        elevation={elevated ? 6 : 0}
        sx={{
          background: 'linear-gradient(to right, #9333ea, #2563eb)', // purple → blue
          color: 'white',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255,255,255,0.25)',
          transition: 'background-color .25s ease, box-shadow .25s ease, border-color .25s ease',
        }}
      >
        <Toolbar sx={{ minHeight: { xs: 64, sm: 72 }, px: { xs: 1.5, sm: 3, md: 4 }, gap: 1 }}>
          {/* Brand (logo) */}
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              <img src={logo} alt="Amaze Puzzles Logo" style={{ height: 80, marginRight: 12, display: 'block' }} />
            </Link>

            {/* Desktop nav */}
            {!isMobile && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  ml: 1,
                  px: 1,
                  py: 0.75,
                  borderRadius: 9999,
                  border: '1px solid #e2e8f0',
                  backgroundColor: 'rgba(255,255,255,0.8)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                {navLinks.map(({ to, label, title }) => (
                  <Tooltip key={to} title={title}>
                    <Button
                      component={NavLink}
                      to={to}
                      // NavLink gives isActive; style based on it (no useLocation needed)
                      sx={({ isActive }) => ({
                        textTransform: 'none',
                        fontWeight: 700,
                        fontSize: '.9rem',
                        px: 1.5,
                        py: 0.75,
                        borderRadius: 9999,
                        color: isActive ? 'primary.main' : '#334155',
                        backgroundColor: isActive ? 'rgba(37,99,235,0.10)' : 'transparent',
                        '&:hover': {
                          backgroundColor: isActive ? 'rgba(37,99,235,0.18)' : '#eff6ff',
                          color: 'primary.main',
                        },
                      })}
                    >
                      {label}
                    </Button>
                  </Tooltip>
                ))}
              </Box>
            )}
          </Box>

          {/* Desktop cart */}
          {!isMobile && (
            <Tooltip title="View cart">
              <IconButton color="primary" component={Link} to="/cart" sx={{ ml: 1 }}>
                <Badge badgeContent={cart.length} color="error">
                  <ShoppingCartIcon sx={{ color: '#ffffff' }} />
                </Badge>
              </IconButton>
            </Tooltip>
          )}

          {/* Mobile toggle (your animated hamburger) */}
          {isMobile && (
            <div
              onClick={handleDrawerToggle}
              className={`${iconState === 'close' ? 'close-icon' : 'hamburger-icon'} ${spinning ? 'spin' : ''}`}
              aria-label="Toggle menu"
              aria-expanded={drawerOpen}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleDrawerToggle()}
            >
              <div></div>
              <div></div>
              <div></div>
            </div>
          )}
        </Toolbar>
      </AppBar>

      {/* Spacer so content isn't under the AppBar */}
      <Toolbar sx={{ minHeight: { xs: 64, sm: 72 } }} />

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        sx={{
          '& .MuiDrawer-paper': {
            width: '100%',
            height: '100%',
            backgroundColor: 'var(--background-color) !important',
          },
        }}
      >
        <List sx={{ mt: 4, px: 1 }}>
          {navLinks.map(({ to, label, title }) => (
            <ListItem
              key={to}
              button
              component={NavLink}
              to={to}
              onClick={handleDrawerToggle}
              // NavLink again gives isActive here (via MUI sx callback)
              sx={({ isActive }) => ({
                borderRadius: 8,
                mb: 0.5,
                backgroundColor: isActive ? 'rgba(37,99,235,0.12)' : 'transparent',
                '&:hover': {
                  backgroundColor: isActive ? 'rgba(37,99,235,0.18)' : 'rgba(239,246,255,1)',
                },
              })}
            >
              <Tooltip title={title}>
                <ListItemText primary={label} primaryTypographyProps={{ fontWeight: 700 }} />
              </Tooltip>
            </ListItem>
          ))}

          {/* Mobile cart */}
          <ListItem
            button
            component={NavLink}
            to="/cart"
            onClick={handleDrawerToggle}
            sx={{
              borderRadius: 8,
              mt: 1,
              '&:hover': { backgroundColor: 'rgba(239,246,255,1)' },
            }}
          >
            <Tooltip title="View cart">
              <ListItemText primary="Cart" primaryTypographyProps={{ fontWeight: 700 }} />
            </Tooltip>
            <Badge badgeContent={cart.length} color="error" sx={{ ml: 1 }}>
              <ShoppingCartIcon />
            </Badge>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
