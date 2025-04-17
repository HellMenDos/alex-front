import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

interface SidebarProps {
  archives: ReadonlyArray<{
    url: string;
    title: string;
  }>;
  description: string;
  title: string;
}

export default function Sidebar(props: SidebarProps) {
  const { archives, description, title } = props;

  return (
    <Grid item xs={12} md={4}>

      <Paper  elevation={0} sx={{ p: 2, bgcolor: '#1315200d',borderRadius:'20px' }}>
        <Typography variant="h6" gutterBottom fontWeight='bold'>
          {title}
        </Typography>
        <Typography fontWeight={'lighter'}>{description}</Typography>
      </Paper> 
      <Paper elevation={0} sx={{ padding: '10px', marginTop:'20px', bgcolor: '#1315200d',borderRadius:'20px' }}>
        <Typography variant="h6" gutterBottom fontWeight='bold'>
          Наши площадки
        </Typography>
        {archives.map((archive) => (
          <Link display="block" style={{ textDecoration:'none' }} variant="body1" fontWeight='lighter' href={`${archive.url}`} key={archive.title}>
            {archive.title}
          </Link>
        ))}
      </Paper>
    </Grid>
  );
}