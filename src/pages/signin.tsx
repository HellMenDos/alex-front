import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';

import { Input } from '../components/Input';
import { AuthService } from '../services/AuthService';
import { Alert, IconButton } from '@mui/material';
import DocumentMeta from 'react-document-meta';

const theme = createTheme();

export default function Signin() {
  const [ snack, setSnack ] = useState<boolean>(false)
  const [ error, setError ] = useState<string>('')

  const navigate = useNavigate()
  const meta = {
    title: 'Вход',
    description: 'Войди в свой аккаунт и создай свой вопрос на собеседование.',
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
    setSnack(false);
  };


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user = await AuthService().signin({
      email: data.get('email') as string,
      password: data.get('password') as string,
    }) as { data: any, error?: string }

    if(user.data) {
      navigate('/profile')
    }else {
      setError(user?.error as string)
      setSnack(true)
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
            Войти
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Input style={{ width:"100%" }} type="email" required name="email" placeholder='E-mail'/>
              </Grid>
              <Grid item xs={12}>
                <Input style={{ width:"100%" }} type="password" required name="password" placeholder='Пароль'/>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, borderRadius:'10px', background:"#292e3c" }}
            >
              Войти
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="signup" variant="body2">
                  Зарегистрироваться
                </Link>
                <Link href="forget" variant="body2" style={{ marginLeft: 5}}>
                  Забыли пароль ?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Snackbar open={snack} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
    </DocumentMeta>
  );
}