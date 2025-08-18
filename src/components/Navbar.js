import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box, Drawer, List, ListItem, ListItemText, useMediaQuery, Badge, IconButton, Tooltip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import logo from '../assets/images/amaze-logo-text.png';
import useCart from './Store/Utils/useCart';
import '../App.css';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [iconState, setIconState] = useState('hamburger');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { cart } = useCart();

  const handleDrawerToggle = () => {
    if (iconState === 'close') {
      setSpinning(true);
      setTimeout(() => {
        setDrawerOpen(!drawerOpen);
        setIconState(iconState === 'hamburger' ? 'close' : 'hamburger');
        setSpinning(false);
      }, 500);
    } else {
      setDrawerOpen(!drawerOpen);
      setIconState(iconState === 'hamburger' ? 'close' : 'hamburger');
    }
  };

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: 'var(--primary-color) !important' }}>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              <img src={logo} alt="Amaze Puzzles Logo" style={{ height: '50px', marginRight: '16px' }} />
            </Link>
            {!isMobile && (
              <>
                <Tooltip title="Go to the Home Page">
                  <Button
                    color="inherit"
                    component={Link}
                    to="/"
                    sx={{ fontSize: '0.875rem' }}
                  >
                    Home
                  </Button>
                </Tooltip>
                <Tooltip title="Learn more about Amaze Puzzles">
                  <Button
                    color="inherit"
                    component={Link}
                    to="/about"
                    sx={{ fontSize: '0.875rem' }}
                  >
                    About Us
                  </Button>
                </Tooltip>
                <Tooltip title="View our Braille puzzles">
                  <Button
                    color="inherit"
                    component={Link}
                    to="/products"
                    sx={{ fontSize: '0.875rem' }}
                  >
                    Products
                  </Button>
                </Tooltip>
                <Tooltip title="Read our Blog">
                  <Button
                    color="inherit"
                    component={Link}
                    to="/blog"
                    sx={{ fontSize: '0.875rem' }}
                  >
                    Blog
                  </Button>
                </Tooltip>
                <Tooltip title="Get in touch with us">
                  <Button
                    color="inherit"
                    component={Link}
                    to="/contact"
                    sx={{ fontSize: '0.875rem' }}
                  >
                    Contact Us
                  </Button>
                </Tooltip>
              </>
            )}
          </Box>
          {!isMobile && (
            <Tooltip title="View cart">
              <IconButton
                color="inherit"
                component={Link}
                to="/cart"
              >
                <Badge badgeContent={cart.length} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Tooltip>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
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
        <List sx={{ mt: 4 }}>
          <ListItem button component={Link} to="/" onClick={handleDrawerToggle}>
            <Tooltip title="Go to the Home Page">
              <ListItemText primary="Home" />
            </Tooltip>
          </ListItem>
          <ListItem button component={Link} to="/about" onClick={handleDrawerToggle}>
            <Tooltip title="Learn more about Amaze Puzzles">
              <ListItemText primary="About Us" />
            </Tooltip>
          </ListItem>
          <ListItem button component={Link} to="/products" onClick={handleDrawerToggle}>
            <Tooltip title="View our Braille puzzles">
              <ListItemText primary="Products" />
            </Tooltip>
          </ListItem>
          <ListItem button component={Link} to="/blog" onClick={handleDrawerToggle}>
            <Tooltip title="Read our Blog">
              <ListItemText primary="Blog" />
            </Tooltip>
          </ListItem>
          <ListItem button component={Link} to="/contact" onClick={handleDrawerToggle}>
            <Tooltip title="Get in touch with us">
              <ListItemText primary="Contact Us" />
            </Tooltip>
          </ListItem>
          {isMobile && (
            <ListItem button component={Link} to="/cart" onClick={handleDrawerToggle}>
              <Tooltip title="View cart">
                <ListItemText primary="Cart" />
              </Tooltip>
              <Badge badgeContent={cart.length} color="error">
                <ShoppingCartIcon />
              </Badge>
            </ListItem>
          )}
        </List>
      </Drawer>
      {isMobile && (
        <div
          onClick={handleDrawerToggle}
          className={`${iconState === 'close' ? 'close-icon' : 'hamburger-icon'} ${spinning ? 'spin' : ''}`}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
    </>
  );
};

export default Navbar;
