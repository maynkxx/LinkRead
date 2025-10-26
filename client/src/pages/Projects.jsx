import CallToAction from '../components/CallToAction';
import { Link } from 'react-router-dom'; // Import Link if you want the button to use react-router

export default function Projects() {
  return (
    // Applied dark background and ensured content is visible in dark mode
    <div className='min-h-screen bg-gray-900 dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-4xl mx-auto text-center'>
        
        {/* Header */}
        <p className='text-lg font-semibold text-teal-400 uppercase tracking-wider mb-3'>
          Mastery Through Practice
        </p>
        <h1 className='text-5xl md:text-6xl font-extrabold text-white leading-tight mb-8'>
          The LinkRead Project Hub
        </h1>

        <p className='text-xl text-gray-400 leading-relaxed mb-12 max-w-3xl mx-auto'>
          At LinkRead, we believe learning by building is the best way to grow.
          Our collection of hands-on web development projects helps you sharpen your skills
          and build a portfolio that stands out.
        </p>
        
        {/* Main Content Sections - Using a grid for better structure */}
        <div className='grid md:grid-cols-3 gap-8 text-left leading-relaxed mb-16'>
          
          <section className='bg-gray-800 p-6 rounded-lg shadow-xl border-t-4 border-teal-500'>
            <h2 className='text-2xl font-bold text-teal-400 mb-3'>
              Why Build?
            </h2>
            <p className='text-gray-300 text-base'>
              Projects transform theory into action. They let you test your ideas, face real coding
              challenges, and build confidence in your abilities. Every line of code adds to your portfolio.
            </p>
          </section>

          <section className='bg-gray-800 p-6 rounded-lg shadow-xl border-t-4 border-teal-500'>
            <h2 className='text-2xl font-bold text-teal-400 mb-3'>
              What You’ll Learn
            </h2>
            <ul className='list-none space-y-2 text-gray-300 text-base'>
              <li className='flex items-start'><span className='text-teal-500 mr-2'></span>Semantic HTML & CSS</li>
              <li className='flex items-start'><span className='text-teal-500 mr-2'></span>JavaScript Interactivity</li>
              <li className='flex items-start'><span className='text-teal-500 mr-2'></span>Debugging & Best Practices</li>
            </ul>
          </section>

          <section className='bg-gray-800 p-6 rounded-lg shadow-xl border-t-4 border-teal-500'>
            <h2 className='text-2xl font-bold text-teal-400 mb-3'>
              Start Now
            </h2>
            <p className='text-gray-300 text-base'>
              Your next big idea starts here. Begin with a beginner challenge and work your way up
              to complex applications. The only way to truly master web development is by building.
            </p>
          </section>
        </div>
        
        {/* Call to Action Button to View All Projects */}
        <Link
          to='/search?type=project' // Adjust this link to your actual projects list page
          className='inline-block px-10 py-4 bg-teal-600 text-white text-xl font-bold rounded-full shadow-lg hover:bg-teal-700 transition duration-300 transform hover:scale-105'
        >
          View All Code Challenges &rarr;
        </Link>

        {/* Call To Action Component */}
        <div className='mt-16'>
          {/* Re-styling CallToAction container to fit the dark theme */}
          <div className='p-6 md:p-10 bg-gray-800 rounded-xl shadow-2xl'> 
            <CallToAction />
          </div>
        </div>
        
      </div>
    </div>
  );
}