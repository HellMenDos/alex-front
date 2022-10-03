import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme();

export default function NotFound() {
  return (
    <ThemeProvider theme={theme}>
        <Typography component="h1" variant="h5" align='center' style={{ marginTop:'30px'}}>
            Страница не найдена
        </Typography>
    </ThemeProvider>
  );
}