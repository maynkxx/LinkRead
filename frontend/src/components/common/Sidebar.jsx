// src/components/common/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="card" style={{ height: 'fit-content' }}>
      <h3 className="text-lg font-bold mb-4">Menu</h3>
      <ul className="flex flex-col gap-2">
        <li>
          <Link to="/" className="block p-2 rounded hover:bg-gray-100 text-secondary hover:text-primary">
            Home
          </Link>
        </li>
        <li>
          <Link to="/dashboard" className="block p-2 rounded hover:bg-gray-100 text-secondary hover:text-primary">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/profile" className="block p-2 rounded hover:bg-gray-100 text-secondary hover:text-primary">
            Profile
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
