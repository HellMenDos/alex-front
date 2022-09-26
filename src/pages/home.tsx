import React, { useEffect, useState } from 'react';

import Grid from '@mui/material/Grid';
import FeaturedPost from '../components/FeaturedQuestion';
import MainFeaturedPost from '../components/MainFeaturedPost';
import Sidebar from '../components/Sidebar';
import Main from '../components/Main';
import { Mode, QuestionService } from '../services/QuestionService';
import { Question } from '../common/types';
import { mainFeaturedPost, sidebar } from '../data';


export default function Blog() {
  const [firstPost, setFirstPost] = useState<Question | undefined>()
  const [secondPost, setSecondPost] = useState<Question | undefined>()
  const [mainPost, setMainPost] = useState<Question | undefined>()

  useEffect(() => {
    QuestionService().get('','','',Mode.random).then((data) => setFirstPost(data as Question))
    QuestionService().get('','','',Mode.random).then((data) => setSecondPost(data as Question))
    QuestionService().get('','','',Mode.random).then((data) => setMainPost(data as Question))
  }, [])
  return (
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
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
        </main>
  );
}