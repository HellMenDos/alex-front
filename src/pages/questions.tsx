import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Grid from '@mui/material/Grid';

import Sidebar from '../components/Sidebar';
import Main from '../components/Main';

import { QuestionService } from '../services/QuestionService';
import { Question } from '../common/types';


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


export default function Questions() {
  const params = useParams<{ id: string }>()
  const [question, setQuestion] = useState<Question>()
  
  useEffect(() => {
    QuestionService().getOne(Number(params.id))
    .then((data) => setQuestion(data as Question))
  }, [])


  return (
        <main>
          <Grid container spacing={5} sx={{ mt: 3 }}>
            {question && <Main question={question as Question} />}
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
            />
          </Grid>
        </main>
  );
}