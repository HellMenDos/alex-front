import React, { useState } from 'react';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Input } from '../components/Input';

import { AuthService } from '../services/AuthService';
import { Alert, Snackbar } from '@mui/material';
import DocumentMeta from 'react-document-meta';

const theme = createTheme();

export default function Forget() {
  const [ snackError, setSnackError ] = useState<boolean>(false)
  const [ snackSuccess, setSnackSuccess ] = useState<boolean>(false)
  const [ message, setMessage ] = useState<string>('')
  const meta = {
    title: 'Забыли пароль ?',
    description: 'Восстанови свой пароль тут',
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
    const user = await AuthService().forget({ email: data.get('email') as string }) as { data: any, error?: string };
    
    if(user.data) {
      setMessage('Новый пароль отправлен на почту')
      setSnackSuccess(true)
    }else {
      setMessage(user?.error as string)
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
            Забыли пароль ?
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Input style={{ width:"100%" }} required placeholder='E-mail' name='email' type='email' />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, borderRadius:'10px', background:"#292e3c" }}>
              Отправить
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/#/signup" variant="body2">
                  Зарегистрироваться
                </Link>
                <Link href="/#/signin" variant="body2" style={{ marginLeft: 5}}>
                  Войти
                </Link>
              </Grid>
            </Grid>
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