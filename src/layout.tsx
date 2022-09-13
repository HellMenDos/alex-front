import { ThemeProvider } from '@emotion/react';
import { Container, createTheme, CssBaseline } from '@mui/material';
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import { fetchAllLangs } from './store/slices/langSlice';
import { useAppDispatch } from './store/hooks';
import { fetchAllTechs } from './store/slices/techSlice';
import { fetchAllLevels } from './store/slices/levelSlice';

const sections = [
  { title: 'Technology', url: 'search' },
  { title: 'Design', url: '#' },
  { title: 'Culture', url: '#' },
  { title: 'Business', url: '#' },
  { title: 'Politics', url: '#' },
  { title: 'Opinion', url: '#' },
  { title: 'Science', url: '#' },
  { title: 'Health', url: '#' },
  { title: 'Style', url: '#' },
  { title: 'Travel', url: '#' },
];

const theme = createTheme();


function Layout() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchAllLangs())
    dispatch(fetchAllTechs())
    dispatch(fetchAllLevels())
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
          <Header sections={sections} />
          <Outlet />
      </Container>
    </ThemeProvider>
    
  )
}

export default Layout;
