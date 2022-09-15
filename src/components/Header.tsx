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
  sections: Array<any>;
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

  useEffect(() => {
    console.log(user)
  })


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
        <Button variant="contained" size="small" sx={{ background: "#e75357",  borderRadius: '10px', boxShadow:'none'}}>
          IT BOT
        </Button>
        <Typography
          component="h2"
          variant="h5"
          color="white"
          align="center"
          fontWeight="bold"
          noWrap
          sx={{ flex: 1, letterSpacing:'5px' }}
        >
          <Link sx={{ textDecoration:"none", color:"white" }} href='/'>
          {title}
          </Link>
        </Typography>

        {user?.id ? 
        <Button variant="contained" size="small"  href='/profile' sx={{background: "#1dc62e", borderRadius: '10px', boxShadow:'none'}}>
          {user?.name}
        </Button> :
        <Button variant="contained" size="small" href='/signin' sx={{background: "#1dc62e", borderRadius: '10px', boxShadow:'none'}}>
          Войти
        </Button>}
        {user?.id &&         
        <Button onClick={exit} variant="contained" size="small" sx={{background: "#1dc62e", borderRadius: '10px', boxShadow:'none'}}>
          Выйти
        </Button>}
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ 
          justifyContent: 'space-between',
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
               background: '#1315200d',
               borderRadius: '15px',
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
  title: "Привет"
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