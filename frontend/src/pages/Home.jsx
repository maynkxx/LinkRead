// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="page home-page">
      <h1>Welcome to Threaddit</h1>
      <p>Browse threads, posts, join the discussion!</p>
      <Link to="/threads">Go to Threads</Link>
    </div>
  );
};

export default Home;
