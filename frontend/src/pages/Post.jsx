// src/pages/Post.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Post = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // TODO: fetch post by postId from API
    setPost({ id: postId, author: 'Alice', content: 'Here is the post content...', createdAt: '2025-11-23' });
    // TODO: fetch comments for this post
    setComments([
      { id: 'c1', commenter: 'Bob', text: 'Nice post!' },
      { id: 'c2', commenter: 'Carol', text: 'Thanks for sharing.' },
    ]);
  }, [postId]);

  if (!post) return <div>Loading post...</div>;

  return (
    <div className="page post-page">
      <h1>Post by {post.author}</h1>
      <p>{post.content}</p>
      <p><small>Posted on {post.createdAt}</small></p>

      <h2>Comments</h2>
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <ul>
          {comments.map(c => (
            <li key={c.id}>
              <strong>{c.commenter}</strong>: {c.text}
            </li>
          ))}
        </ul>
      )}
      {/* TODO: Add comment form */}
    </div>
  );
};

export default Post;
