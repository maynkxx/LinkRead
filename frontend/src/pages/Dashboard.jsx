// src/pages/Dashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="page dashboard-page">
      <h1>Dashboard</h1>
      <ul>
        <li><Link to="/profile">My Profile</Link></li>
        <li><Link to="/projects">Projects</Link></li>
        <li><Link to="/messages">Messages</Link></li>
        <li><Link to="/threads">Threads</Link></li>
      </ul>
    </div>
  );
};

export default Dashboard;
