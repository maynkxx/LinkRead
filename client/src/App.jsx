import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn'; // Corrected: import path and component name
import SignUp from './pages/SignUp'; // Standardized
import Project from './pages/Projects'; // Standardized (assuming file is Projects.jsx)
import Dashboard from './pages/Dashboard'; // Standardized (assuming file is Dashboard.jsx)
import Header from './components/Header';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/signin' element={<SignIn />} /> {/* Corrected: component name */}
        <Route path='/signup' element={<SignUp />} /> {/* Standardized */}
        <Route path='/projects' element={<Project />} /> {/* Standardized */}
        <Route path='/dashboard' element={<Dashboard />} /> {/* Standardized */}
      </Routes>
    </BrowserRouter>
  );
}