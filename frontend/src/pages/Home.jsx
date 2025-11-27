// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllThreads } from '../api/threads';
import Loader from '../components/common/Loader';

const Home = () => {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const { data } = await getAllThreads();
        setThreads(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load threads');
      } finally {
        setLoading(false);
      }
    };
    fetchThreads();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <header className="flex justify-between items-center" style={{ marginBottom: '2rem' }}>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Discussions</h1>
          <p className="text-secondary mt-1">Join the conversation</p>
        </div>
        <Link to="/create-thread" className="btn btn-primary">
          Create Thread
        </Link>
      </header>

      {error && (
        <div className="card" style={{ backgroundColor: 'var(--error)', color: 'white', marginBottom: '1rem' }}>
          {error}
        </div>
      )}

      <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
        {threads.map((thread) => (
          <Link
            key={thread._id}
            to={`/threads/${thread._id}`}
            className="card block hover:shadow-lg transition-shadow duration-300"
            style={{ textDecoration: 'none' }}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
              {thread.title}
            </h3>
            <p className="text-secondary mb-4 line-clamp-3">
              {thread.description}
            </p>
            <div className="flex items-center justify-between text-sm text-secondary">
              <span>{thread.postCount || 0} posts</span>
              <span>{new Date(thread.createdAt).toLocaleDateString()}</span>
            </div>
          </Link>
        ))}
      </div>

      {!loading && threads.length === 0 && (
        <div className="text-center py-10">
          <p className="text-secondary text-lg">No threads found yet.</p>
        </div>
      )}
    </div>
  );
};

export default Home;
