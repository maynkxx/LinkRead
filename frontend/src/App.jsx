import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIN';
import SignUp from './pages/SignUp'; 
import Project from './pages/Projects'; 
import Dashboard from './pages/Dashboard';
import Header from './components/Header';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/signin' element={<SignIn />} /> 
        <Route path='/signup' element={<SignUp />} /> 
        <Route path='/projects' element={<Project />} /> 
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}