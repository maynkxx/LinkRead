import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createPost } from '../api/posts';
import Loader from '../components/common/Loader';

const CreatePost = () => {
  const { threadId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('content', formData.content);
      data.append('threadId', threadId);
      if (formData.image) {
        data.append('image', formData.image);
      }

      await createPost(data);
      
      navigate(`/threads/${threadId}`);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="container" style={{ maxWidth: '600px', margin: '2rem auto' }}>
      <div className="card">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Post</h1>
        
        {error && (
          <div className="card mb-4" style={{ backgroundColor: 'var(--error)', color: 'white', padding: '0.75rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="title" className="label">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="input w-full"
              placeholder="Interesting title"
              required
              minLength={5}
            />
          </div>

          <div>
            <label htmlFor="content" className="label">Content</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              className="input w-full"
              rows="6"
              placeholder="Share your thoughts..."
              required
              minLength={10}
            ></textarea>
          </div>

          <div>
            <label htmlFor="image" className="label">Image URL (Optional)</label>
            <input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="input w-full"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="flex justify-end gap-4 mt-4">
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => navigate(`/threads/${threadId}`)}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Create Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
