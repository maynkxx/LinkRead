// src/pages/Dashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
      
      <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        {/* Quick Actions */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
          <div className="flex flex-col gap-3">
            <Link to="/" className="btn" style={{ backgroundColor: 'var(--primary-50)', color: 'var(--primary-700)', width: '100%' }}>
              Browse Threads
            </Link>
            <Link to="/profile" className="btn btn-secondary" style={{ width: '100%' }}>
              View Profile
            </Link>
          </div>
        </div>

        {/* Stats Placeholder */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Your Stats</h2>
          <div className="flex flex-col gap-2 text-secondary">
            <div className="flex justify-between">
              <span>Total Posts</span>
              <span className="font-bold text-gray-900">0</span>
            </div>
            <div className="flex justify-between">
              <span>Total Comments</span>
              <span className="font-bold text-gray-900">0</span>
            </div>
            <div className="flex justify-between">
              <span>Reputation</span>
              <span className="font-bold text-gray-900">0</span>
            </div>
          </div>
        </div>

        {/* Recent Activity Placeholder */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
          <p className="text-secondary text-sm">No recent activity to show.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
