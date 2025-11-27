import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createPost } from '../api/posts';
import MainLayout from '../layout/MainLayout';
import { Card, CardBody } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

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

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">Create New Post</h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">Share your thoughts with the community</p>
        </div>

        <Card>
          <CardBody>
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <Input
                label="Title"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Interesting title"
                required
                minLength={5}
                disabled={loading}
              />

              <div>
                <label htmlFor="content" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Content
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  className="block w-full rounded-md border border-neutral-300 px-3 py-2 text-neutral-900 placeholder-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 sm:text-sm transition-colors min-h-[150px] dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
                  placeholder="Share your thoughts..."
                  required
                  minLength={10}
                  disabled={loading}
                ></textarea>
              </div>

              <Input
                label="Image URL (Optional)"
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                disabled={loading}
              />

              <div className="flex justify-end gap-3 pt-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => navigate(`/threads/${threadId}`)}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  isLoading={loading}
                >
                  Create Post
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </MainLayout>
  );
};

export default CreatePost;
