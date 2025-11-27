// src/pages/Thread.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getThread } from '../api/threads';
import { getPostsByThread } from '../api/posts';
import Loader from '../components/common/Loader';

const Thread = () => {
  const { threadId } = useParams();
  const [thread, setThread] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [threadRes, postsRes] = await Promise.all([
          getThread(threadId).catch(() => null),
          getPostsByThread(threadId)
        ]);

        if (threadRes) setThread(threadRes.data);
        if (postsRes) setPosts(postsRes.data);
        
      } catch (err) {
        setError('Failed to load thread data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [threadId]);

  if (loading) return <Loader />;
  if (error) return <div className="text-center py-10 text-error">{error}</div>;
  if (!thread) return <div className="text-center py-10">Thread not found</div>;

  return (
    <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="card mb-8" style={{ borderLeft: '4px solid var(--primary-500)' }}>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{thread.title}</h1>
            <p className="text-gray-800 text-lg leading-relaxed">{thread.description}</p>
            <div className="mt-6 text-sm text-secondary">
              Created on {new Date(thread.createdAt).toLocaleDateString()}
            </div>
          </div>
          <Link to={`/threads/${threadId}/create-post`} className="btn btn-primary">
            Create Post
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-gray-900" style={{ borderBottom: '1px solid var(--neutral-200)', paddingBottom: '0.5rem' }}>Posts</h2>
        
        {posts.length === 0 ? (
          <div className="text-center py-10 bg-gray-50 rounded-lg" style={{ border: '1px dashed var(--neutral-300)' }}>
            <p className="text-secondary">No posts yet. Be the first to share!</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {posts.map(post => (
              <Link 
                key={post._id} 
                to={`/post/${post._id}`}
                className="card block hover:shadow-md transition-shadow"
                style={{ textDecoration: 'none' }}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium text-primary">{post.author?.username || 'Unknown User'}</span>
                  <span className="text-sm text-secondary">{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{post.title}</h3>
                <p className="text-gray-600 line-clamp-3">{post.content}</p>
                <div className="mt-4 flex items-center text-sm text-secondary gap-4">
                   <span>{post.commentCount || 0} comments</span>
                   <span>{post.upvotes || 0} upvotes</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Thread;
