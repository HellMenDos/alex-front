import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Grid from '@mui/material/Grid';

import Sidebar from '../components/Sidebar';
import Main from '../components/Main';

import { QuestionService } from '../services/QuestionService';
import { Question, User } from '../common/types';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchAllComments, fetchAllFavourite } from '../store/slices/questionSlice';
import { sidebar } from '../data';


export default function Questions() {
  const params = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const [question, setQuestion] = useState<Question>()

  useEffect(() => {
    QuestionService().getOne(Number(params.id))
    .then((data) => setQuestion(data as Question))
    
    dispatch(fetchAllComments(Number(params.id)))
    dispatch(fetchAllFavourite(Number(params.id)))
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