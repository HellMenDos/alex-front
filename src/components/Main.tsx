import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { CardMedia } from '@mui/material';
import Button from '@mui/material/Button';

import Markdown from './Markdown';
import { Question } from '../common/types';
import { Input } from './Input';
import { CommentsService } from '../services/CommentsService';

interface MainProps {
  question: Question;
}

export default function Main({ question }: MainProps) {
  const [comment, setCommet] = useState<string>('')
  
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await CommentsService().create({
      question: 2,
      date: new Date(),
      message: comment
    })
  }

  return (
    <Grid item xs={12}md={8} sx={{ '& .markdown': { py: 3, }}}>
      <Typography variant="h6" gutterBottom>
        {question.title}
      </Typography>
      <Divider />
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
    </Grid>
  );
}