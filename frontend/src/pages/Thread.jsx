import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getThread } from '../api/threads';
import { getPostsByThread } from '../api/posts';
import MainLayout from '../layout/MainLayout';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
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
  if (error) return (
    <MainLayout>
      <div className="text-center py-10 text-red-600 dark:text-red-400">{error}</div>
    </MainLayout>
  );
  if (!thread) return (
    <MainLayout>
      <div className="text-center py-10 text-neutral-600 dark:text-neutral-400">Thread not found</div>
    </MainLayout>
  );

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8 border-l-4 border-l-primary-500">
          <CardBody>
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
              <div>
                <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">{thread.title}</h1>
                <p className="text-neutral-800 dark:text-neutral-200 text-lg leading-relaxed">{thread.description}</p>
                <div className="mt-6 text-sm text-neutral-500 dark:text-neutral-400">
                  Created on {new Date(thread.createdAt).toLocaleDateString()}
                </div>
              </div>
              <Link to={`/threads/${threadId}/create-post`}>
                <Button>Create Post</Button>
              </Link>
            </div>
          </CardBody>
        </Card>

        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-neutral-700 pb-2">Posts</h2>

          {posts.length === 0 ? (
            <div className="text-center py-16 bg-neutral-50 dark:bg-neutral-800 rounded-lg border border-dashed border-neutral-300 dark:border-neutral-600">
              <p className="text-neutral-500 dark:text-neutral-400 text-lg">No posts yet. Be the first to share!</p>
              <Link to={`/threads/${threadId}/create-post`} className="mt-4 inline-block">
                <Button variant="outline">Create Post</Button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {posts.map(post => (
                <Link
                  key={post._id}
                  to={`/post/${post._id}`}
                  className="block group"
                >
                  <Card className="hover:shadow-md transition-all duration-200 group-hover:border-primary-200 dark:group-hover:border-primary-800">
                    <CardBody>
                      <div className="flex justify-between items-start mb-3">
                        <span className="font-medium text-primary-600 dark:text-primary-400">{post.author?.username || 'Unknown User'}</span>
                        <span className="text-sm text-neutral-500 dark:text-neutral-400">{new Date(post.createdAt).toLocaleDateString()}</span>
                      </div>
                      <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{post.title}</h3>
                      <p className="text-neutral-600 dark:text-neutral-300 line-clamp-3">{post.content}</p>
                      <div className="mt-4 flex items-center text-sm text-neutral-500 dark:text-neutral-400 gap-6">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                          {post.commentCount || 0} comments
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path></svg>
                          {post.upvotes || 0} upvotes
                        </span>
                      </div>
                    </CardBody>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Thread;
