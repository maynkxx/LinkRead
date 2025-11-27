// src/components/common/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav style={{ backgroundColor: 'white', borderBottom: '1px solid var(--neutral-200)', padding: '1rem 0' }}>
      <div className="container flex justify-between items-center">
        <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary-600)' }}>
          Threaddit
        </Link>
        
        <div className="flex items-center gap-4">
          <Link to="/" className="text-secondary hover:text-primary">Home</Link>
          
          {user ? (
            <>
              <Link to="/dashboard" className="text-secondary hover:text-primary">Dashboard</Link>
              <Link to="/profile" className="text-secondary hover:text-primary">Profile</Link>
              <button 
                onClick={handleLogout} 
                className="btn btn-secondary"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary">Login</Link>
              <Link to="/register" className="btn btn-primary">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
