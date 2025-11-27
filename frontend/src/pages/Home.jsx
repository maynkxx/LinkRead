import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllThreads } from '../api/threads';
import MainLayout from '../layout/MainLayout';
import { Button } from '../components/ui/Button';
import { Card, CardBody, CardFooter } from '../components/ui/Card';
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
    <MainLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">Discussions</h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">Join the conversation and share your thoughts</p>
        </div>
        <Link to="/create-thread">
          <Button>Create Thread</Button>
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {threads.map((thread) => (
          <Link
            key={thread._id}
            to={`/threads/${thread._id}`}
            className="block group h-full"
          >
            <Card className="h-full hover:shadow-md hover:border-primary-200 dark:hover:border-primary-800 transition-all duration-300 group-hover:-translate-y-1">
              <CardBody>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {thread.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 line-clamp-3 mb-4">
                  {thread.description}
                </p>
              </CardBody>
              <CardFooter className="flex items-center justify-between text-sm text-neutral-500 dark:text-neutral-500">
                <span>{thread.postCount || 0} posts</span>
                <span>{new Date(thread.createdAt).toLocaleDateString()}</span>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>

      {!loading && threads.length === 0 && (
        <div className="text-center py-16 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 border-dashed">
          <p className="text-neutral-500 dark:text-neutral-400 text-lg">No threads found yet.</p>
          <Link to="/create-thread" className="mt-4 inline-block">
            <Button variant="outline">Start a discussion</Button>
          </Link>
        </div>
      )}
    </MainLayout>
  );
};

export default Home;
