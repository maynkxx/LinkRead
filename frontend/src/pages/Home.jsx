import { Link } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      // Fetch only the latest 6 posts for the homepage sections
      try {
        const res = await fetch('/api/post/getPosts?limit=6');
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
        }
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };
    fetchPosts();
  }, []);

  // Separate the very latest post for the featured hero section
  const featuredPost = posts[0];
  const recentPosts = posts.slice(1);

  return (
    <div className='bg-white dark:bg-gray-900 min-h-screen'>
      {/* 1. Modern Hero Section */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 md:pb-20'>
        <div className='grid lg:grid-cols-2 items-center gap-12'>
          <div className='flex flex-col gap-5'>
            <h1 className='text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white leading-tight'>
              Welcome to <span className='text-teal-500'>LinkRead</span>.
            </h1>
            <p className='text-xl text-gray-600 dark:text-gray-400 max-w-lg'>
              Your daily source for in-depth articles, cutting-edge tutorials, and best practices** in software engineering and web development.
            </p>
            <div className='mt-2'>
              <Link
                to='/search'
                className='inline-block px-8 py-3 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 transition duration-300 transform hover:scale-105'
              >
                Start Reading All Posts &rarr;
              </Link>
            </div>
          </div>

          {/* Featured Post Card (Optional: You'll need a way to style the single featured post) */}
          {featuredPost && (
            <div className='hidden lg:block bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-2xl hover:shadow-teal-500/30 transition duration-500'>
              <h2 className='text-xs font-bold uppercase tracking-wider text-teal-500 mb-2'>
                Featured Read
              </h2>
              <Link to={`/post/${featuredPost.slug}`}>
                <h3 className='text-3xl font-bold text-gray-900 dark:text-white hover:text-teal-500 transition duration-300'>
                  {featuredPost.title}
                </h3>
              </Link>
              <p className='text-gray-600 dark:text-gray-400 mt-3 line-clamp-3'>
                {/* Assuming your post object has a summary or excerpt */}
                {featuredPost.content.substring(0, 150)}...
              </p>
              <div className='mt-5'>
                <Link
                  to={`/post/${featuredPost.slug}`}
                  className='text-sm font-semibold text-teal-500 hover:underline'
                >
                  Continue reading &rarr;
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2. Key Topics/Categories Section */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-gray-50 dark:bg-gray-800 border-t border-b border-gray-200 dark:border-gray-700'>
        <h2 className='text-3xl font-bold text-center text-gray-900 dark:text-white mb-8'>
          Explore Our Key Topics
        </h2>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
          {['JavaScript', 'React', 'Tailwind CSS', 'DevOps'].map((topic) => (
            <Link
              key={topic}
              to={`/search?category=${topic.toLowerCase().replace(' ', '-')}`}
              className='text-center p-5 bg-white dark:bg-gray-900 rounded-lg shadow-lg hover:shadow-teal-500/20 transition duration-300 transform hover:-translate-y-1'
            >
              <h3 className='text-lg font-semibold text-gray-800 dark:text-white'>{topic}</h3>
              <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>
                {/* Short description based on topic */}
                {topic === 'React' ? 'State Management & Hooks' : topic === 'Tailwind CSS' ? 'Utility-First Styling' : 'Latest Articles'}
              </p>
            </Link>
          ))}
        </div>
      </div>
      
      {/* 3. Call To Action (Newsletter/Resource) */}
      <div className='max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8'>
        <div className='p-6 md:p-10 bg-amber-100 dark:bg-slate-700 rounded-xl shadow-lg'>
          <CallToAction />
        </div>
      </div>

      {/* 4. Recent Posts Grid */}
      {recentPosts && recentPosts.length > 0 && (
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10'>
          <div className='flex flex-col gap-10'>
            <h2 className='text-4xl font-bold text-center text-gray-900 dark:text-white'>
              Latest Articles
            </h2>
            <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-8'>
              {recentPosts.map((post) => (
                // Assuming PostCard is designed for grid layout
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={'/search'}
              className='mt-4 text-xl font-medium text-teal-600 dark:text-teal-400 hover:underline text-center'
            >
              Browse The Full Archive &rarr;
            </Link>
          </div>
        </div>
      )}

      {/* 5. Mission/Roadmap Section */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white dark:bg-gray-900'>
        <div className='text-center max-w-4xl mx-auto'>
          <h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>
            Our Mission: Your Roadmap to Mastery
          </h2>
          <p className='text-lg text-gray-600 dark:text-gray-400'>
            LinkRead is dedicated to providing **actionable, high-quality content**. We focus on practical application over theory, ensuring every article helps you solve a real-world coding problem.
          </p>
          <div className='mt-8 flex justify-center space-x-6'>
            <Link
              to='/about'
              className='text-base font-semibold text-teal-600 hover:text-teal-500 dark:text-teal-400 dark:hover:text-teal-300 hover:underline'
            >
              Learn More About Us
            </Link>
            <Link
              to='/contact'
              className='text-base font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:underline'
            >
              Suggest a Topic
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}