import React, { useEffect,useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import { Pagination } from '@mui/material';

import FeaturedQuestion from '../components/FeaturedQuestion';
import { Input } from '../components/Input';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchAllQuestions } from '../store/slices/questionSlice';
import { Question } from '../common/types';



export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const TOTAL_POST_PER_PAGE = 10
  const TOTAL_POSTS = TOTAL_POST_PER_PAGE * Number(searchParams.get('page'))
  const [search, setSearch] = useState<string>('')
  const params = useParams()
  const dispatch = useAppDispatch()
  const questions = useAppSelector((state) => state.question.questions)

  useEffect(() => {
    if(params) {
      dispatch(fetchAllQuestions({ 
        tech: params.tech ? params.tech : '',
        level: params.level ? params.level : '',
        lang: params.lang ? params.lang : ''
      }))
    }
  }, [params])

  const filterPosts = (post: Question) => post.title.includes(search as string) || post.describe.includes(search as string)
  
  const setPage = (pageNumber: string) => {
    setSearchParams({ 'page': String(Number(pageNumber) - 1) })
  }

  return (
        <main>
          <Input value={search} onChange={({ target }) => setSearch(target.value)} style={{ width:"100%", marginTop: '10px' }} placeholder='Поиск' />
          <Grid container spacing={4} style={{ marginTop:'1px' }}>
            {questions
            .filter((post) => filterPosts(post))
            .slice(TOTAL_POSTS, TOTAL_POSTS + 10)
            .map((post) => (
              <FeaturedQuestion key={post.id} question={post} />
            ))}
          </Grid>
          <div style={{width: "max-content", margin: "30px auto"}}> 
            <Pagination 
              count={Math.ceil(questions.length/TOTAL_POST_PER_PAGE)} 
              page={Number(searchParams.get('page')) + 1} 
              variant="outlined" 
              onChange={(e: any) => setPage(e.target.innerText)}
              hidePrevButton 
              hideNextButton
            />
          </div>
        </main>
  );
}