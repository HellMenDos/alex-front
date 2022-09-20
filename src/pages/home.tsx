import React, { useEffect, useState } from 'react';

import Grid from '@mui/material/Grid';
import FeaturedPost from '../components/FeaturedQuestion';
import MainFeaturedPost from '../components/MainFeaturedPost';
import Sidebar from '../components/Sidebar';
import Main from '../components/Main';
import { QuestionService } from '../services/QuestionService';
import { Question } from '../common/types';


const mainFeaturedPost = {
  title: 'Title of a longer featured blog post',
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: 'https://mobimg.b-cdn.net/v3/fetch/89/89b1452e43e738be92c573fdebfb1d22.jpeg',
  imageText: 'main image description',
  linkText: 'Continue reading…',
};

const featuredPosts = [
  {
    id: 1,
    title: 'Featured post',
    date: 'Nov 12',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://mobimg.b-cdn.net/v3/fetch/89/89b1452e43e738be92c573fdebfb1d22.jpeg',
    imageLabel: 'Image Text',
    
  },
  {
    id: 2,
    title: 'Post title',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://mobimg.b-cdn.net/v3/fetch/89/89b1452e43e738be92c573fdebfb1d22.jpeg',
    imageLabel: 'Image Text',
  },
];

const posts = ['sdfsdf','sdfsdf'];

const sidebar = {
  title: 'About',
  description:
    'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
  archives: [
    { title: 'March 2020', url: '#' },
    { title: 'February 2020', url: '#' },
    { title: 'January 2020', url: '#' },
    { title: 'November 1999', url: '#' },
    { title: 'October 1999', url: '#' },
    { title: 'September 1999', url: '#' },
    { title: 'August 1999', url: '#' },
    { title: 'July 1999', url: '#' },
    { title: 'June 1999', url: '#' },
    { title: 'May 1999', url: '#' },
    { title: 'April 1999', url: '#' },
  ],
  social: [
    { name: 'GitHub', icon: '' },
    { name: 'Twitter', icon: '' },
    { name: 'Facebook', icon: '' },
  ],
};


export default function Blog() {
  const [firstPost, setFirstPost] = useState<Question | undefined>()
  const [secondPost, setSecondPost] = useState<Question | undefined>()
  const [mainPost, setMainPost] = useState<Question | undefined>()

  useEffect(() => {
    QuestionService().get('','','','random').then((data) => setFirstPost(data as Question))
    QuestionService().get('','','','random').then((data) => setSecondPost(data as Question))
    QuestionService().get('','','','random').then((data) => setMainPost(data as Question))
  }, [])
  return (
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {firstPost && <FeaturedPost key={firstPost.title} question={firstPost} />}
            {secondPost && <FeaturedPost key={secondPost.title} question={secondPost} />}
          </Grid>
          <Grid container spacing={5} sx={{ mt: 3 }}>
            {mainPost && <Main question={mainPost} />}
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
            />
          </Grid>
        </main>
  );
}