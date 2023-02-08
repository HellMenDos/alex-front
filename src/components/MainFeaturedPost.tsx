import React, { useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface MainFeaturedPostProps {
  post: {
    description: string;
    image: string;
    imageText: string;
    linkText: string;
    linkURL: string
    title: string;
  };
}

export default function MainFeaturedPost(props: MainFeaturedPostProps) {
  const { post } = props;
  const control = useAnimation();
  const [ref, inView] = useInView();
  const boxVariant = {
    visible: { opacity: 1, translateX: 0, transition: { duration: 0.5 } },
    hidden: { opacity: 0, translateX: -100 }
  }

  useEffect(() => {
    if (inView) {
      control.start("visible");
    } else {
      control.start("hidden");
    }
  }, [control, inView]);

  return (
    <motion.div 
      variants={boxVariant} 
      animate={control}
      ref={ref}
      className="mainPostBlock"
    >
    <Paper
      sx={{
        position: 'relative',
        backgroundColor: 'grey.800',
        color: '#fff',
        mb: 4,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        borderRadius:'20px',
        width:'100%'
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: 'rgba(0,0,0,.3)',
          borderRadius:'20px',
          width:'100%'
        }}
      />
      <Grid container>
        <Grid item md={12}>
          <Box
            sx={{
              position: 'relative',
              p: { xs: 3, md: 12,  },
              pr: { md: 0, },
              display:'flex',
              width:'100%',
              justifyContent:'space-between',
            }}            
          >
            <div style={{ width: '100%'}}>
            <Typography 
              component="h1" 
              variant="h3" 
              color="inherit" 
              gutterBottom 
              sx={{ fontWeight:"bold" }}
              className="MainBoxContainerText">
              {post.title}
            </Typography>
            </div>
            <div style={{ width: '100%', marginTop: '15px'}}>
            <Typography 
              variant="h5" 
              color="inherit" 
              paragraph 
              sx={{ fontWeight:"lighter", fontSize:"20px" }}
              className="MainBoxContainerSubText">
              {post.description}
            </Typography>
            <Link variant="subtitle1" href={post.linkURL} style={{ color: "#292e3c",background: 'white', padding: '10px 20px', borderRadius: '15px',textDecoration: "none"}}>
              {post.linkText}
            </Link>
            </div>
          </Box>
        </Grid>
      </Grid>
    </Paper>
    </motion.div>
  );
}