import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Question } from '../common/types';

interface FeaturedQuestionProps {
  question: Question;
  md?: number
}

export default function FeaturedQuestion(props: FeaturedQuestionProps) {
  const { question, md = 6 } = props;

  return (
    <Grid item xs={12} md={md} sx={{ mt: 1}}>
      <CardActionArea component="a" href={`/questions/${question.id}`}>
        <Card sx={{ display: 'flex', borderRadius:'20px' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5" fontWeight="bold">
              {question.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" fontSize={13}>
              {question.points}
            </Typography>
            <Typography variant="subtitle1" paragraph fontWeight="light" fontSize={15}>
              {question.describe}
            </Typography>
            <Typography variant="subtitle1" color="primary">
              Continue reading...
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160 }}
            image={`https://itbotinterview.ru${question?.photo}`}
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
}