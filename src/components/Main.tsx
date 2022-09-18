import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { CardMedia } from '@mui/material';
import Button from '@mui/material/Button';

import Markdown from './Markdown';
import { Comment, Question, User } from '../common/types';
import { Input } from './Input';
import { CommentsService } from '../services/CommentsService';
import { FavouritesService } from '../services/FavouritesService';
import { useAppSelector } from '../store/hooks';
import { useAppDispatch } from '../store/hooks';
import { fetchAllComments, fetchAllFavourite } from '../store/slices/questionSlice';

interface MainProps {
  question: Question;
}

export default function Main({ question }: MainProps) {
  const comments = useAppSelector((state) => state.question)
  const userData = useAppSelector((state) => state.user.user) as User

  const dispatch = useAppDispatch()
  const [comment, setCommet] = useState<string>('')
  const params = useParams<{ id: string }>()

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await CommentsService().create({
      questionId: Number(params.id),
      date: new Date(),
      message: comment
    })

    dispatch(fetchAllComments(Number(params.id)))
  }

  const addToFavourite = async () => {
    await FavouritesService().create({
      date: new Date(),
      questionId: Number(params.id)
    })
  }

  const deleteFromFavourite = async (id: number) => {
    await FavouritesService().delete(id)
  }

  const isUserLikes = comments.favourites.find(({ user }) => user?.id == userData?.id)

  return (
    <Grid item xs={12}md={8} sx={{ '& .markdown': { py: 3, }}}>
      <Typography variant="h6" gutterBottom>
        {question.title} {comments.favourites.length}
      </Typography>
      <Divider />
      { isUserLikes?.id ? 
        <Button onClick={() => deleteFromFavourite(isUserLikes?.id as number)}>Delete</Button> : 
        <Button onClick={addToFavourite}>Add to Favoutite</Button>
      }
      <CardMedia 
        component="img"
        image={`https://itbotinterview.ru${question.photo?.split('8080')[1]}` || ''} />
      <Markdown className="markdown">
        {question.describe}
      </Markdown>
      <form onSubmit={onSubmit}>
      <Input style={{ width:"100%", marginTop: '20px' }} placeholder="Комментарий" value={comment} onChange={({ target }) => setCommet(target.value)} />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, borderRadius:'10px', background:"#0966aa" }}>
        Оставить комментарий
      </Button>
      </form>
      {comments.comments.map(item => <div>{item.message}</div>)}
    </Grid>
  );
}


