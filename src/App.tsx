import React, { useEffect,useLayoutEffect,useState,lazy, Suspense } from 'react';
import {
  Routes,
  Route,
  useNavigate,
  Navigate
} from "react-router-dom";
import Layout from './layout';

import { fetchAllLangs } from './store/slices/langSlice';
import { useAppDispatch } from './store/hooks';
import { fetchAllTechs } from './store/slices/techSlice';
import { fetchAllLevels } from './store/slices/levelSlice';
import { fetchUser } from './store/slices/userSlice';

import { StorageService } from './services/StorageService';
import { useLocation } from 'react-router-dom';
import Support from './pages/support';
import NotFound from './pages/404';

function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()

  const isAuth = StorageService().get("tokens")?.access_token

  useEffect(() => {
    if(StorageService().get("tokens")?.access_token) {
      if(location.pathname == '/signin' || location.pathname == 'signup') {
        navigate('profile')
      }
    }else {
      if(location.pathname == '/profile') {
        navigate('signin')
      }
    }
  })

  useEffect(() => {
    dispatch(fetchAllLangs())
    dispatch(fetchAllTechs())
    dispatch(fetchAllLevels())
  }, [])

  useLayoutEffect(() => {
    if(StorageService().get('tokens')?.access_token) {
      dispatch(fetchUser())
    }
  })

  const Home = lazy(() => import('./pages/home'));
  const Signin = lazy(() => import('./pages/signin'));
  const Signup = lazy(() => import('./pages/signup'));
  const Search = lazy(() => import('./pages/search'));
  const Questions = lazy(() => import('./pages/questions'));
  const Profile = lazy(() => import('./pages/profile'));
  const Forget = lazy(() => import('./pages/forget'));


  return (
    <Suspense fallback={<p></p>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="signin" element={isAuth ? <Navigate replace to="/profile" /> : <Signin />} />
            <Route path="forget" element={isAuth ? <Navigate replace to="/profile" /> : <Forget />} />
            <Route path="signup" element={isAuth ? <Navigate replace to="/profile" /> : <Signup />} />
            <Route path="search/" element={<Search />} />
            <Route path="search/:lang" element={<Search />} />
            <Route path="search/:lang/:tech" element={<Search />} />
            <Route path="search/:lang/:tech/:level" element={<Search />} />
            <Route path="questions/:id" element={<Questions />} />
            <Route path="support" element={<Support />} />
            <Route path="profile" element={!isAuth ? <Navigate replace to="/signin" /> : <Profile />} />
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
    </Suspense>

  )
}

export default App;
