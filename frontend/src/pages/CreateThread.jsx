import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createThread } from '../api/threads';
import Loader from '../components/common/Loader';

const CreateThread = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Technology' // Default category
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const categories = ['Technology', 'Gaming', 'News', 'Sports', 'Entertainment', 'Science', 'Art', 'Music'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data } = await createThread(formData);
      navigate(`/threads/${data._id}`);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to create thread');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="container" style={{ maxWidth: '600px', margin: '2rem auto' }}>
      <div className="card">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Thread</h1>
        
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
              placeholder="What's on your mind?"
              required
              minLength={5}
            />
          </div>

          <div>
            <label htmlFor="category" className="label">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="input w-full"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="description" className="label">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="input w-full"
              rows="6"
              placeholder="Elaborate on your topic..."
              required
              minLength={10}
            ></textarea>
          </div>

          <div className="flex justify-end gap-4 mt-4">
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => navigate('/')}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Create Thread
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateThread;
