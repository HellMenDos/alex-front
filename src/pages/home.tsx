import React, { useEffect, useState } from 'react';

import Grid from '@mui/material/Grid';
import FeaturedPost from '../components/FeaturedQuestion';
import MainFeaturedPost from '../components/MainFeaturedPost';
import Sidebar from '../components/Sidebar';
import Main from '../components/Main';
import { Mode, QuestionService } from '../services/QuestionService';
import { Question } from '../common/types';
import { mainFeaturedPost, sidebar } from '../data';
import DocumentMeta from 'react-document-meta';
import Link from '@mui/material/Link';


export default function Home() {
  const [firstPost, setFirstPost] = useState<Question | undefined>()
  const [secondPost, setSecondPost] = useState<Question | undefined>()
  const [mainPost, setMainPost] = useState<Question | undefined>()
  const meta = {
    title: 'Главная',
    description: 'Ищи ответы на вопросы на собеседовании по всем языка программирования.',
    meta: {
      charset: 'utf-8',
      name: {
        keywords: 'react,meta,document,html,tags'
      }
    }
  };

  useEffect(() => {
    QuestionService().get('','','',Mode.random).then((data) => setFirstPost(data as Question))
    QuestionService().get('','','',Mode.random).then((data) => setSecondPost(data as Question))
    QuestionService().get('','','',Mode.random).then((data) => setMainPost(data as Question))
  }, [])
  return (
        <DocumentMeta {...meta}>
          <MainFeaturedPost post={mainFeaturedPost} />
          <div className='ads'>
            <div className='textBlock'>
              <div className='ads_main_title'>Нужна помощь или собеседование ?</div>
              <div>Напиши мне и мы решим твою проблему</div>
            </div>
            <div className='buttonBlock'>
              <Link variant="subtitle1" href={'https://t.me/HelloMeanOfficial'} style={{ color: "#292e3c",background: 'white', padding: '15px 30px',fontSize:'20px', borderRadius: '10px',textDecoration: "none"}}>
                Напиши
              </Link>
            </div>
          </div>
          <Grid container spacing={4}>
            {firstPost && <FeaturedPost key={firstPost.title} question={firstPost} />}
            {secondPost && <FeaturedPost key={secondPost.title} question={secondPost} />}
          </Grid>
          <Grid container spacing={5} sx={{ mt: 3 }}>
            {mainPost && <Main isMain={true} question={mainPost} />}
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
            />
          </Grid>
        </DocumentMeta>
  );
}