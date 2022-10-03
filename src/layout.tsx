import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { ThemeProvider } from '@emotion/react';
import { Container, createTheme, CssBaseline } from '@mui/material';

import Header from './components/Header';
import './styles/style.css'

const theme = createTheme();


function Layout() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
          <Header />
          <Outlet />
      </Container>
    </ThemeProvider>
    
  )
}

export default Layout;
