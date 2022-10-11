import React from 'react';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Sidebar from '../components/Sidebar';
import { sidebar } from '../data';
import { Paper } from '@mui/material';


const theme = createTheme();

export default function Contact() {
  return (
    <ThemeProvider theme={theme}>
        <Typography component="h1" variant="h5" align='center' fontWeight='bold' style={{ marginTop:'30px'}}>
            <Paper elevation={0} sx={{ p: 2, bgcolor: '#1315200d',borderRadius:'20px', mb:2 }}>
                <Typography variant="h6" gutterBottom fontWeight='bold'>
                    Email
                </Typography>
                <Typography fontWeight={'lighter'}>
                    <a href='mailto:itinterview@mail.ru'>alit@a-lit.ru</a>
                </Typography>
            </Paper>
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
            />
        </Typography>
    </ThemeProvider>
  );
}