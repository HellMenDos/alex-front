import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { CardMedia } from '@mui/material';

import Markdown from './Markdown';
import { Question } from '../common/types';

interface MainProps {
  question: Question;
}

export default function Main({ question }: MainProps) {
  return (
    <Grid
      item
      xs={12}
      md={8}
      sx={{
        '& .markdown': {
          py: 3,
        },
      }}
    >
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
    </Grid>
  );
}