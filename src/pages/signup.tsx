import React, { useState } from 'react';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
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

export default function Signup() {
  const [ snackError, setSnackError ] = useState<boolean>(false)
  const [ snackSuccess, setSnackSuccess ] = useState<boolean>(false)
  const [ message, setMessage ] = useState<string>('')
  const meta = {
    title: 'Зарегистрируйся ',
    description: 'Зарегистрируйся и создай свой вопрос на собеседование.',
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
    
    if(data.get('password') !== data.get('confirm_password')) {
      setMessage("Пароли не совпадают")
      setSnackError(true)
      return;
    }

    if((data.get('password') as string).length < 6) {
      setMessage("Пароль должен быть больше 6 символов")
      setSnackError(true)
      return;
    }
    
    if(String(data.get('password')).length < 6) {
      setMessage("Пароли должен быть больше 6 символов")
      setSnackError(true)
      return;
    }
    
    const user =  await AuthService().signup({
      email: data.get('email') as string,
      password: data.get('password') as string,
      phone: data.get('phone') as string,
      name: data.get('name') as string
    }) as { data: any, error?: string }

    if(user.data) {
      setMessage('Подтверждение регистрации отправлено на почту')
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
            Зарегистрироваться
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Input style={{ width:"100%" }} required type="name" placeholder='Имя' name='name'/>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input style={{ width:"100%" }} required type="phone" placeholder='Номер' name='phone'/>

              </Grid>
              <Grid item xs={12}>
                <Input style={{ width:"100%" }} required type="email"  placeholder='E-mail' name='email'/>
              </Grid>
              <Grid item xs={12}>
                <Input style={{ width:"100%" }} required type="password" placeholder='Пароль' name='password'/>
              </Grid>
              <Grid item xs={12}>
                <Input style={{ width:"100%" }} required type="password"  placeholder='Подтвердить пароль' name='confirm_password'/>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 1, borderRadius:'10px', background:"#0966aa" }}
            >
            Зарегистрироваться
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="signin" variant="body2">
                  Войти
                </Link>
                <Link href="forget" variant="body2" style={{ marginLeft: 5}}>
                  Забыли пароль ?
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