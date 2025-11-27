import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { StreakGraph } from '../components/ui/StreakGraph';

const Dashboard = () => {
  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">Dashboard</h1>
        <p className="text-neutral-600 dark:text-neutral-400 mt-1">Welcome back, here's your activity overview</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Streak Graph */}
          <Card>
            <CardHeader className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Activity Streak</h2>
              <select className="text-sm border-neutral-300 rounded-md text-neutral-600">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
              </select>
            </CardHeader>
            <CardBody>
              <div className="h-64 w-full">
                <StreakGraph />
              </div>
            </CardBody>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Recent Activity</h2>
            </CardHeader>
            <CardBody>
              <div className="text-center py-8 text-neutral-500 dark:text-neutral-400">
                <p>No recent activity to show.</p>
                <Button variant="ghost" size="sm" className="mt-2">View all history</Button>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Quick Actions</h2>
            </CardHeader>
            <CardBody className="flex flex-col gap-3">
              <Link to="/create-thread" className="w-full">
                <Button className="w-full">Start New Thread</Button>
              </Link>
              <Link to="/" className="w-full">
                <Button variant="secondary" className="w-full">Browse Discussions</Button>
              </Link>
              <Link to="/profile" className="w-full">
                <Button variant="outline" className="w-full">Edit Profile</Button>
              </Link>
            </CardBody>
          </Card>

          {/* Stats */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Your Stats</h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-600 dark:text-neutral-400">Total Posts</span>
                  <span className="font-bold text-neutral-900 dark:text-white">12</span>
                </div>
                <div className="h-px bg-neutral-100 dark:bg-neutral-800" />
                <div className="flex justify-between items-center">
                  <span className="text-neutral-600 dark:text-neutral-400">Total Comments</span>
                  <span className="font-bold text-neutral-900 dark:text-white">48</span>
                </div>
                <div className="h-px bg-neutral-100 dark:bg-neutral-800" />
                <div className="flex justify-between items-center">
                  <span className="text-neutral-600 dark:text-neutral-400">Reputation</span>
                  <span className="font-bold text-primary-600">850</span>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
