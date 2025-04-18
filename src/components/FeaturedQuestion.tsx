import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Question } from '../common/types';
import { placeholderImageUrl } from '../data';
import { QUESTIONS_DOMAIN } from '../services/api';

interface FeaturedQuestionProps {
  question: Question;
  md?: number
}

export default function FeaturedQuestion(props: FeaturedQuestionProps) {
  const { question, md = 6 } = props;
  const imageUrl = question?.photo ? `${QUESTIONS_DOMAIN}${question?.photo}` : placeholderImageUrl

  return (
    <Grid item xs={12} md={md} sx={{ mt: 1 }}>
      <CardActionArea component="a" href={`/#/questions/${question.id}`}>
        <Card className='cardblock' sx={{ display: 'flex', borderRadius:'20px' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5" fontWeight="bold" className="MainBoxContainerText">
              {question.title}
            </Typography>
            <Typography variant="subtitle1" sx={{ display: 'flex', flexWrap: 'wrap'}} color="text.secondary" fontSize={13}>
              <span className='back-black' style={{ marginTop: '5px'}}>
                {question.lang.title}
              </span>
              <span className='back-black'  style={{ marginTop: '5px'}}>
                {question.level.title}
              </span>
              <span className='back-black'  style={{ marginTop: '5px'}}>
                {question.tech.title}
              </span>
            </Typography>
            <Typography variant="subtitle1" paragraph fontWeight="light" fontSize={15} className="MainBoxContainerSubText">
              {question.describe.slice(0,150)}...
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160 }}
            image={imageUrl}
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
}