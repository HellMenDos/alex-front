import React, { useState,useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import Grid from '@mui/material/Grid';

import Sidebar from '../components/Sidebar';
import Main from '../components/Main';

import { QuestionService } from '../services/QuestionService';
import { Question, User } from '../common/types';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchAllComments, fetchAllFavourite } from '../store/slices/questionSlice';
import { sidebar } from '../data';
import DocumentMeta from 'react-document-meta';


export default function Questions() {
  const params = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const [question, setQuestion] = useState<Question>()
  const meta = useRef<any>({
    title: 'Поиск',
    description: 'Найди интересующий тебя вопрос',
    meta: {
      charset: 'utf-8',
      name: {
        keywords: 'react,meta,document,html,tags'
      }
    }
  })

  useEffect(() => {
    QuestionService().getOne(Number(params.id))
    .then((data) => setQuestion(data as Question))
    
    dispatch(fetchAllComments(Number(params.id)))
    dispatch(fetchAllFavourite(Number(params.id)))
  }, [])

  useEffect(() => {
    meta.current.title = question?.title
    meta.current.description = question?.describe
  }, [question])

  return (
        <DocumentMeta {...(meta.current)}>
          <Grid container spacing={5} sx={{ mt: 3 }}>
            {question && <Main question={question as Question} />}
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
            />
          </Grid>
        </DocumentMeta>
  );
}