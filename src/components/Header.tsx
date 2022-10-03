import React, { useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

import { useAppSelector, useAppDispatch } from '../store/hooks';
import { Exit } from '../store/slices/userSlice'

import { StorageService } from '../services/StorageService';

import { User } from '../common/types';

interface HeaderProps {
  title: string;
}

function Header(props: HeaderProps) {
  const { title } = props;
  const params = useParams()
  const locate = useLocation()
  const navigate = useNavigate()
  const user = useAppSelector((state) => state.user.user) as User
  const dispatch = useAppDispatch()
  
  const sections = useAppSelector((state) => {
    if(params.lang && !params.tech) {
      const currentLangId = state.lang.langs.find((item) => item.title == params.lang)?.id
      return state.tech.techs.filter((item) => item.lang == Number(currentLangId))
    }
    
    if(params.tech) {
      return state.level.levels
    }

    if(!params.lang && !params.tech) {
      return state.lang.langs
    }

    return []
  })

  const makeHref = (title: string) => {
    const limitCount = Object.values(params).length == 3 ? `${title}` : `${locate.pathname}/${title}`
    return params.lang || params.tech ? limitCount : `/search/${title}`
  }

  const exit = () => {
    dispatch(Exit())
    StorageService().remove('tokens')
    navigate('/signin')
  }

  const activeLink = (title: string) => params.level == title  ? '#1112154d' : '#1315200d'


  return (
    <React.Fragment>
      <Toolbar sx={{ 
        borderBottom: 1,
        borderColor: 'divider', 
        background:"#0966aa", 
        borderRadius:'20px',
        marginTop:'10px',
        position:'sticky',
        top:10,
        left: 0,
        zIndex:10
      }}>
        <Typography
          component="h2"
          variant="h5"
          color="white"
          fontWeight="bold"
          sx={{ flex: 1 }}
        >
          <Link sx={{ color:'white', textDecoration:'none', fontWeight: 'bold' }} href='/'>
          {title}
          </Link>
        </Typography>
        <Link href='https://t.me/interviewITBot' sx={{ color:'white', textDecoration:'none', marginLeft:'10px', fontWeight:'lighter' }}>
          IT BOT
        </Link>
        <Link href='/support' sx={{ color:'white', textDecoration:'none', marginLeft:'10px', fontWeight:'lighter' }}>
          ПОМОЩЬ
        </Link>
        {user?.id ? 
        <Link href='/profile' sx={{ color:'white', textDecoration:'none', marginLeft:'10px', fontWeight:'lighter' }}>
          {user?.name}
        </Link> :
        <Link href='/signin' sx={{ color:'white', textDecoration:'none', marginLeft:'10px', fontWeight:'lighter' }}>
          Войти
        </Link>}
        {user?.id &&         
        <Link onClick={exit} sx={{color:'white', textDecoration:'none', marginLeft:'10px', fontWeight:'lighter' }}>
          Выйти
        </Link>}
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ 
          justifyContent:'center',
          overflowX: 'auto',
          paddingLeft: '0px',
          paddingRight: '0px'
        }}
      >
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.id}
            variant="body2"
            href={makeHref(section.title)}
            sx={{
               flexShrink: 0,
               background: activeLink(section.title),
               borderRadius: '15px',
               marginLeft: '10px',
               marginRight: '10px',
               fontWeight: 'bold', 
               padding:'8px 15px', 
               textDecoration:"none"}}
          >
            {section?.title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}

Header.defaultProps = {
  title: "ALEXITINTER"
}

Header.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
  ),
  title: PropTypes.string.isRequired,
};

export default Header;