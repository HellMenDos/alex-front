import React from 'react';
import {
  Routes,
  Route,
} from "react-router-dom";
import Layout from './layout';

import Home from './pages/home';
import Signin from './pages/signin';
import Signup from './pages/signup';
import Search from './pages/search';
import Questions from './pages/questions';
import Course from './pages/course';
import Profile from './pages/profile';
import Forget from './pages/forget';

import './style.css'

function App() {
  return (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="signin" element={<Signin />} />
            <Route path="forget" element={<Forget />} />
            <Route path="signup" element={<Signup />} />
            <Route path="search" element={<Search />} />
            <Route path="questions/:id" element={<Questions />} />
            <Route path="course" element={<Course />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
  )
}

export default App;
