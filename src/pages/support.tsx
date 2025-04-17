import React, { useState } from 'react';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Input,TextArea } from '../components/Input';
import { Alert, Snackbar } from '@mui/material';
import { UserService } from '../services/UserService';
import DocumentMeta from 'react-document-meta';

const theme = createTheme();

export default function Support() {
  const [ snackError, setSnackError ] = useState<boolean>(false)
  const [ snackSuccess, setSnackSuccess ] = useState<boolean>(false)
  const [ message, setMessage ] = useState<string>('')
  const meta = {
    title: 'Помощь',
    description: 'Задай вопрос и получи ответ',
    meta: {
      charset: 'utf-8',
      name: {
        keywords: 'react,meta,document,html,tags'
      }
    }
  };
  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackError(false);
    setSnackSuccess(false);
  };


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
        
    const support =  await UserService().support({
      email: data.get('email') as string,
      telegram: data.get('telegram') as string,
      phone: data.get('phone') as string,
      title: data.get('title') as string,
      describe: data.get('describe') as string
    }) as { data: any, error?: string }

    if(support.data) {
      setMessage('Письмо отправлено')
      setSnackSuccess(true)
    }else {
      setMessage(support?.error as string)
      setSnackError(true)
    }
  };

  return (
    <DocumentMeta {...meta}>
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5" fontWeight='bold'>
            Связаться с нами
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Input style={{ width:"100%" }} required type="email"  placeholder='E-mail' name='email'/>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input style={{ width:"100%" }} required type="phone" placeholder='Номер телефона' name='phone'/>
              </Grid>
              <Grid item xs={12}>
                <Input style={{ width:"100%" }} required type="name" placeholder='Оглавление' name='title'/>
              </Grid>
              <Grid item xs={12}>
                <TextArea style={{ width:"100%" }} required  placeholder='Описание' name='describe' />
              </Grid>
              <Grid item xs={12}>
                <Input style={{ width:"100%" }} required type="text" placeholder='Ваш телеграм' name='telegram'/>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 1, borderRadius:'10px', background:"#292e3c" }}
            >
                Отправить
            </Button>
          </Box>
        </Box>
        <Snackbar open={snackError} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>
        <Snackbar open={snackSuccess} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
    </DocumentMeta>
  );
}