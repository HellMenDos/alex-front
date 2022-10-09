import React, { useEffect,useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';

import { useAppSelector, useAppDispatch } from '../store/hooks';
import { Exit } from '../store/slices/userSlice'

import { StorageService } from '../services/StorageService';

import { User } from '../common/types';


function Header() {
  const params = useParams()
  const locate = useLocation()
  const navigate = useNavigate()
  const user = useAppSelector((state) => state.user.user) as User
  const [burger,setBurger] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  const control = useAnimation();
  const [ref, inView] = useInView();
  const boxVariant = {
    visible: { opacity: 1, translateY: 0, transition: { duration: 0.5 } },
    hidden: { opacity: 0, translateY: 150 }
  }

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

  const detectSize = () => {
    console.log(window.innerWidth)
    if(window.innerWidth > 900) {
      setBurger(false)
    }
  }

  useEffect(() => {
    window.addEventListener('resize', detectSize)

    return () => {
      window.removeEventListener('resize', detectSize)
    }
  }, [burger])
  
  useEffect(() => {
    if (inView) {
      control.start("visible");
    } else {
      control.start("hidden");
    }
  }, [control, inView]);
  
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
  const openBurger = () => setBurger(!burger)


  return (
    <React.Fragment>
      <div  className='header'>
        <div className='header_inner'>
          <div className='header_logo_container'>
            <a className="mainName" href='/'>
              <img  src='/app.png' height={40}/>
            </a>
          </div>   
          <div className='open_burger'>
            <img src='/burger.png' width={30} className="burgerLogo" onClick={openBurger} />
          </div>
          <div className='nav_block'>
            <div style={{ display: 'flex' }}>
              <a href='https://t.me/interviewITBot' className='header_link ml-10'>
                IT BOT
              </a>
              <a href='/support' className='header_link ml-10'>
                ПОМОЩЬ
              </a>
              <a href='/contact' className='header_link ml-10'>
                НАШИ КОНТАКТЫ
              </a>
            </div>

            <div style={{ display: 'flex' }}>
              {user?.id ? 
              <a href='/profile' className='header_link ml-10'>Профиль</a> :
              <a href='/signin' className='header_link ml-10'>Войти</a>}
              
              {user?.id && <a onClick={exit} className='header_link  ml-10'>Выйти</a>}
            </div>
          </div>
        </div>
        <div className='nav_block_burder' style={{ display: burger ? 'flex' : 'none' }}>
            <div style={{ display: 'flex',flexDirection:'column', alignItems:'center' }}>
              <a href='https://t.me/interviewITBot' className='header_link '>
                IT BOT
              </a>
              <a href='/support' className='header_link'>
                ПОМОЩЬ
              </a>
              <a href='/contact' className='header_link ml-10'>
                НАШИ КОНТАКТЫ
              </a>
            </div>

            <div style={{ display: 'flex', flexDirection:'column' }}>
              {user?.id ? 
              <a href='/profile' className='header_link'>Профиль</a> :
              <a href='/signin' className='header_link'>Войти</a>}
              
              {user?.id && <a onClick={exit} className='header_link  ml-10'>Выйти</a>}
            </div>
          </div>
      </div>
      <motion.div 
        variants={boxVariant} 
        animate={control}
        ref={ref}
      >
        <Toolbar
          component="nav"
          variant="dense"
          sx={{ 
            justifyContent:'center',
            overflowX: 'auto',
            paddingLeft: '120px',
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
      </motion.div>
    </React.Fragment>
  );
}


export default Header;