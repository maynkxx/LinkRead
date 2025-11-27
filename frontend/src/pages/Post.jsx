// src/pages/Post.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPost, votePost } from '../api/posts';
import { getPostComments, addComment } from '../api/comments';
import Loader from '../components/common/Loader';

const Post = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postRes, commentsRes] = await Promise.all([
          getPost(postId),
          getPostComments(postId)
        ]);
        setPost(postRes.data);
        setComments(commentsRes.data);
      } catch (err) {
        console.error('Failed to load post data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [postId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setSubmitting(true);
    try {
      const { data } = await addComment({ postId, content: newComment });
      setComments([...comments, data]);
      setNewComment('');
    } catch (err) {
      console.error('Failed to post comment', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpvote = async () => {
    try {
      // Optimistic update
      setPost(prev => ({ ...prev, upvotes: (prev.upvotes || 0) + 1 }));
      
      // Call API (assuming votePost handles the toggle logic or just increments)
      // Based on controller, it just increments.
      await votePost(postId, 1);
    } catch (err) {
      console.error('Failed to upvote', err);
      // Revert on error
      setPost(prev => ({ ...prev, upvotes: (prev.upvotes || 0) - 1 }));
    }
  };

  if (loading) return <Loader />;
  if (!post) return <div className="text-center py-10">Post not found</div>;

  return (
    <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
      {/* Post Content */}
      <div className="card mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center font-bold text-primary" style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', backgroundColor: 'var(--primary-100)' }}>
              {post.author?.username?.[0]?.toUpperCase() || 'U'}
            </div>
            <div>
              <p className="font-bold text-gray-900">{post.author?.username || 'Unknown'}</p>
              <p className="text-sm text-secondary">{new Date(post.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{post.title}</h1>
        <div className="text-gray-800 mb-6" style={{ lineHeight: '1.8' }}>
          {post.content}
        </div>
        
        {post.image && (
          <img src={post.image} alt="Post attachment" style={{ borderRadius: '0.5rem', width: '100%', maxHeight: '400px', objectFit: 'cover', marginBottom: '1.5rem' }} />
        )}

        <div className="flex items-center gap-6 border-t pt-4 text-secondary">
           <button 
             onClick={handleUpvote}
             className="flex items-center gap-1 hover:text-primary transition-colors"
           >
             <span>⬆</span> <span>{post.upvotes || 0}</span>
           </button>
           <button className="flex items-center gap-1 hover:text-primary">
             <span>💬</span> <span>{comments.length} Comments</span>
           </button>
        </div>
      </div>

      {/* Comments Section */}
      <div className="card bg-gray-50">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Comments</h3>
        
        {/* Comment Form */}
        <form onSubmit={handleCommentSubmit} className="mb-8">
          <textarea
            className="input"
            rows="3"
            placeholder="What are your thoughts?"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            required
            style={{ resize: 'none', marginBottom: '0.5rem' }}
          ></textarea>
          <div className="flex justify-end">
            <button 
              type="submit" 
              disabled={submitting}
              className="btn btn-primary"
            >
              {submitting ? 'Posting...' : 'Post Comment'}
            </button>
          </div>
        </form>

        {/* Comments List */}
        <div className="flex flex-col gap-4">
          {comments.map(comment => (
            <div key={comment._id} className="card" style={{ padding: '1rem' }}>
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-gray-900">{comment.author?.username || 'User'}</span>
                <span className="text-sm text-secondary">{new Date(comment.createdAt).toLocaleDateString()}</span>
              </div>
              <p className="text-gray-700">{comment.content}</p>
            </div>
          ))}
          
          {comments.length === 0 && (
            <p className="text-center text-secondary py-4">No comments yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
