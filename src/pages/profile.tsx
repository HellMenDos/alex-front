import * as React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Pagination } from '@mui/material';

import FeaturedPost from '../components/FeaturedQuestion';
import { Input } from '../components/Input';
import SimpleDialogDemo from '../components/Popup';

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


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={theme}>
    <Grid container>
        <Grid item xs={12} style={{ padding: '15px'}} md={6}>
          <Typography component="h1" variant="h5" fontWeight="lighter" sx={{ mb: 1 }}>
            Изменить данные
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Input style={{ width:"100%" }} placeholder='E-mail'/>
              </Grid>
              <Grid item xs={12}>
                <Input style={{ width:"100%" }} placeholder='Имя'/>
              </Grid>
              <Grid item xs={12}>
                <Input style={{ width:"100%" }} placeholder='Телефон'/>
              </Grid>
              <Grid item xs={12}>
                <Input style={{ width:"100%" }} placeholder='Пароль'/>
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
        </Grid>
        <Grid item xs={12} style={{ padding: '15px'}} md={6}>
            <Typography component="h1" variant="h5" fontWeight="lighter">
              Ваши посты
            </Typography>
            <SimpleDialogDemo />
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