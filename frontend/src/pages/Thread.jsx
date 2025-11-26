// src/pages/Thread.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const Thread = () => {
  const { threadId } = useParams();
  const [thread, setThread] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // TODO: fetch thread info by threadId from API
    setThread({ id: threadId, title: 'Example Thread Title', description: 'Thread description...' });
    // TODO: fetch posts in that thread
    setPosts([
      { id: 'p1', author: 'Alice', content: 'First post in thread' },
      { id: 'p2', author: 'Bob', content: 'Second post in thread' },
    ]);
  }, [threadId]);

  if (!thread) return <div>Loading thread...</div>;

  return (
    <div className="page thread-page">
      <h1>{thread.title}</h1>
      <p>{thread.description}</p>

      <h2>Posts</h2>
      {posts.length === 0 ? (
        <p>No posts yet. Be the first to post!</p>
      ) : (
        <ul>
          {posts.map(post => (
            <li key={post.id}>
              <Link to={`/post/${post.id}`}>
                <strong>{post.author}</strong>: {post.content}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Thread;
