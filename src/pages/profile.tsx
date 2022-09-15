import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert, Pagination, Snackbar } from '@mui/material';

import FeaturedPost from '../components/FeaturedQuestion';
import { Input } from '../components/Input';
import CreateDialogPop from '../components/Popup';
import { useAppSelector } from '../store/hooks';
import { User } from '../common/types';
import { AuthService } from '../services/AuthService';
import { UserService } from '../services/UserService';

const theme = createTheme();


const featuredPosts = [
    {
      id:1,
      title: 'Featured post',
      date: 'Nov 12',
      description:
        'This is a wider card with supporting text below as a natural lead-in to additional content.',
      image: 'https://source.unsplash.com/random',
      imageLabel: 'Image Text',
      
    },
    {
      id:2,
      title: 'Post title',
      date: 'Nov 11',
      description:
        'This is a wider card with supporting text below as a natural lead-in to additional content.',
      image: 'https://source.unsplash.com/random',
      imageLabel: 'Image Text',
    },
  ];

export default function Profile() {
  const user = useAppSelector((state) => state.user.user) as User
  const [ snackError, setSnackError ] = useState<boolean>(false)
  const [ snackSuccess, setSnackSuccess ] = useState<boolean>(false)
  const [ message, setMessage ] = useState<string>('')

  const [name,setName] = useState<string>('')
  const [email,setEmail] = useState<string>('')
  const [phone,setPhone] = useState<string>('')

  useEffect(() => {
    setName(user?.name)
    setEmail(user?.email)
    setPhone(user?.phone)
  }, [user])

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
    const updateUser = await UserService().update({
      email: data.get('email') as string,
      password: data.get('password') as string,
      name: data.get('name') as string,
      phone: data.get('phone') as string
    }) as { data: any, error?: string };

    if(updateUser.data) {
      setMessage('Пользователь обновлен')
      setSnackSuccess(true)
    }else {
      setMessage(updateUser?.error as string)
      setSnackError(true)
    }
  };

  const resetPassword = async () => {
    const usData = await AuthService().forget({ email: user.email as string }) as { data: any, error?: string };
    
    if(usData.data) {
      setMessage('Новый пароль отправлен на почту')
      setSnackSuccess(true)
    }else {
      setMessage(usData?.error as string)
      setSnackError(true)
    }
  }

  return (
    <ThemeProvider theme={theme}>
    <Grid container>
        <Grid item xs={12} style={{ padding: '15px'}} md={6}>
          <Typography component="h1" variant="h5" fontWeight="lighter" sx={{ mb: 1 }}>
            Изменить данные
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Input style={{ width:"100%" }} 
                  required 
                  placeholder='E-mail' 
                  name='email' 
                  value={email} 
                  onChange={({ target }) => setEmail(target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Input 
                  style={{ width:"100%" }} 
                  required  
                  placeholder='Имя' 
                  name='name' 
                  value={name}
                  onChange={({ target }) => setName(target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Input 
                  style={{ width:"100%" }} 
                  required 
                  placeholder='Телефон' 
                  name='phone'
                  value={phone}
                  onChange={({ target }) => setPhone(target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Input style={{ width:"100%" }} required name="password" type="password"  placeholder='Пароль'/>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, borderRadius:'10px', background:"#0966aa" }}
            >
              Отправить
            </Button>
          </Box>
          <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={resetPassword}
              sx={{ borderRadius:'10px', background:"#0966aa" }}
            >
              Восстановить пароль
            </Button>
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
        </Grid>
        <Grid item xs={12} style={{ padding: '15px'}} md={6}>
            <Typography component="h1" variant="h5" fontWeight="lighter">
              Ваши посты
            </Typography>
            <CreateDialogPop />
            {/* {featuredPosts.map((post) => (
              <FeaturedPost md={12} key={post.title} post={post} />
            ))} */}
            <div style={{width: "max-content", margin: "30px auto"}}> 
              <Pagination count={10} variant="outlined" />
            </div>
        </Grid>
    </Grid>
    </ThemeProvider>
  );
}