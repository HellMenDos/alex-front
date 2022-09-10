import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

interface FeaturedPostProps {
  post: {
    id: number
    date: string;
    description: string;
    image: string;
    imageLabel: string;
    title: string;
    
  };
  md?: number
}

export default function FeaturedPost(props: FeaturedPostProps) {
  const { post, md = 6 } = props;

  return (
    <Grid item xs={12} md={md} sx={{ mt: 1}}>
      <CardActionArea component="a" href={`questions/${props.post.id}`}>
        <Card sx={{ display: 'flex', borderRadius:'20px' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5" fontWeight="bold">
              {post.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" fontSize={13}>
              {post.date}
            </Typography>
            <Typography variant="subtitle1" paragraph fontWeight="light" fontSize={15}>
              {post.description}
            </Typography>
            <Typography variant="subtitle1" color="primary">
              Continue reading...
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            image={post.image}
            alt={post.imageLabel}
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
}