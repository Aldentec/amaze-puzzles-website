import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import StripeContext from './components/Store/Utils/StripeContext';
import theme from './theme';
import queryClient from './queryClient'; // Import the query client
import './index.css';

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <StripeContext>
        <CssBaseline />
        <App />
      </StripeContext>
    </ThemeProvider>
  </QueryClientProvider>,
  document.getElementById('root')
);
