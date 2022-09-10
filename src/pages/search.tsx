import * as React from 'react';

import Grid from '@mui/material/Grid';
import FeaturedPost from '../components/FeaturedPost';
import TextField from '@mui/material/TextField';
import { Input } from '../components/Input';
import { Pagination } from '@mui/material';


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
    id:1,
    title: 'Post title',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageLabel: 'Image Text',
  },
  {
    id:1,
    title: 'Post title',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageLabel: 'Image Text',
  },
  {
    id:1,
    title: 'Post title',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageLabel: 'Image Text',
  },
];



export default function Search() {
  return (
        <main>
          <Input style={{ width:"100%", marginTop: '10px' }} placeholder='Hello' />
          <Grid container spacing={4} style={{ marginTop:'1px' }}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          <div style={{width: "max-content", margin: "30px auto"}}> 
            <Pagination count={10} variant="outlined" />
          </div>
        </main>
  );
}