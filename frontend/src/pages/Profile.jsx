// src/pages/Profile.jsx
import React, { useEffect, useState } from 'react';
import { getMe } from '../api/auth';
import Loader from '../components/common/Loader';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await getMe();
        setUser(data);
      } catch (err) {
        console.error('Failed to fetch profile', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) return <Loader />;
  if (!user) return <div className="text-center py-10">Please login to view profile</div>;

  return (
    <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="card" style={{ overflow: 'hidden', padding: 0 }}>
        <div style={{ backgroundColor: 'var(--primary-600)', height: '150px' }}></div>
        <div style={{ padding: '0 2rem 2rem 2rem' }}>
          <div className="flex justify-between items-end" style={{ marginTop: '-3rem', marginBottom: '1.5rem', position: 'relative' }}>
            <div style={{ 
              height: '6rem', 
              width: '6rem', 
              borderRadius: '50%', 
              backgroundColor: 'white', 
              padding: '0.25rem',
              boxShadow: 'var(--shadow-lg)'
            }}>
              <div style={{ 
                height: '100%', 
                width: '100%', 
                borderRadius: '50%', 
                backgroundColor: 'var(--neutral-200)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontSize: '2rem',
                fontWeight: 'bold',
                color: 'var(--neutral-500)'
              }}>
                {user.username?.[0]?.toUpperCase()}
              </div>
            </div>
            <button className="btn btn-secondary">
              Edit Profile
            </button>
          </div>

          <div className="text-center" style={{ textAlign: 'left' }}>
            <h1 className="text-2xl font-bold text-gray-900">{user.username}</h1>
            <p className="text-secondary">{user.email}</p>
            <p className="text-gray-700" style={{ marginTop: '1rem' }}>
              Member since {new Date(user.createdAt || Date.now()).toLocaleDateString()}
            </p>
          </div>

          <div style={{ marginTop: '2rem', borderTop: '1px solid var(--neutral-200)', paddingTop: '1.5rem' }}>
            <h2 className="text-lg font-bold text-gray-900 mb-4">Activity</h2>
            <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(3, 1fr)', textAlign: 'center' }}>
              <div style={{ padding: '1rem', backgroundColor: 'var(--neutral-50)', borderRadius: 'var(--radius-lg)' }}>
                <div className="text-2xl font-bold text-primary">0</div>
                <div className="text-sm text-secondary">Threads</div>
              </div>
              <div style={{ padding: '1rem', backgroundColor: 'var(--neutral-50)', borderRadius: 'var(--radius-lg)' }}>
                <div className="text-2xl font-bold text-primary">0</div>
                <div className="text-sm text-secondary">Posts</div>
              </div>
              <div style={{ padding: '1rem', backgroundColor: 'var(--neutral-50)', borderRadius: 'var(--radius-lg)' }}>
                <div className="text-2xl font-bold text-primary">0</div>
                <div className="text-sm text-secondary">Comments</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
