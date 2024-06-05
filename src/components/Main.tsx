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
  isMain?: boolean
}

function CommentForm({ id }: { id: string }) {
  const dispatch = useAppDispatch()
  const [comment, setCommet] = useState<string>('')

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await CommentsService().create({
      questionId: Number(id),
      date: new Date(),
      message: comment
    })

    dispatch(fetchAllComments(Number(id)))
  }

  return (
    <form onSubmit={onSubmit}>
      <Input style={{ width:"100%", marginTop: '20px' }} placeholder="Комментарий" value={comment} onChange={({ target }) => setCommet(target.value)} />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, borderRadius:'10px', background:"#292e3c" }}>
        Оставить комментарий
      </Button>
    </form>
  )
}

function CommentItem({ item }: { item: Comment}) {
  const datetime = (item.date as string)
  const date = datetime.split('T')[0]
  const time = datetime.split('T')[1].split('.')[0]

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent:'space-between',
      background: '#1315200d',
      padding: '10px',
      borderRadius: '10px',
      marginBottom: '10px'
    }}>
      <div style={{ fontWeight: 'bold' }}>{item.user?.name}</div>
      <div style={{ width: '50%' }}>{item.message}</div>
      <div style={{ fontWeight: 'lighter' }}>{date} {time}</div>
    </div>
  )
}

export default function Main({ question,isMain = false }: MainProps) {
  const comments = useAppSelector((state) => state.question)
  const userData = useAppSelector((state) => state.user.user) as User

  const dispatch = useAppDispatch()
  const params = useParams<{ id: string }>()

  const addToFavourite = async () => {
    await FavouritesService().create({
      date: new Date(),
      questionId: Number(params.id)
    })
    dispatch(fetchAllFavourite(Number(params.id)))
  }

  const deleteFromFavourite = async (id: number) => {
    await FavouritesService().delete(id)
    dispatch(fetchAllFavourite(Number(params.id)))
  }

  const isUserLikes = comments.favourites.find(({ user }) => user?.id == userData?.id)
  const questionPhoto = question.photo?.split('itbotinterview.ru')[1] ? `https://itbotinterview.ru${question.photo?.split('itbotinterview.ru')[1]}` : ''
  // const likeText = !userData?.id ? 'Чтобы поставить отметку авторизуйся' : 'Нравится'

  return (
    <Grid  item xs={12}md={8} sx={{ '& .markdown': { py: 3, }}}>
      <Typography variant="h6" gutterBottom fontWeight='bold'>
        {question.title}
      </Typography>
      {/* <div style={{ fontWeight:'lighter' }}>Нравится: {comments.favourites.length} пользователям</div> */}
      <Divider />
      {/* { !isMain && (isUserLikes?.id ? 
        <Button disabled={!userData?.id} onClick={() => deleteFromFavourite(isUserLikes?.id as number)}>Удалить нравится</Button> : 
        <Button disabled={!userData?.id} onClick={addToFavourite}>{likeText}</Button>)
      } */}
      <Divider />
      {questionPhoto && <CardMedia component="img" image={questionPhoto} />}
      <Markdown className="markdown">
        {question.describe}
      </Markdown>
      {isMain && (
        <Button type="submit" href={`/questions/${question?.id}`} fullWidth variant="contained" sx={{ mt: 3, mb: 2, borderRadius:'10px', background:"#292e3c"}}>
          Перейти к вопросу
        </Button>)
      }
      {/* {userData?.id ? (!isMain && <CommentForm id={params.id as string}/>) : <div style={{ fontWeight:'lighter' }}>Чтобы оставить комментарий авторизуйся</div>}
      {comments.comments.map(item => <CommentItem item={item} />)} */}
    </Grid>
  );
}


