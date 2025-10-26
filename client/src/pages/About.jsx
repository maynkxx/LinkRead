import CallToAction from '../components/CallToAction';

export default function About() {
  return (
    // Applied dark background and ensured content is centered vertically and horizontally
    <div className="min-h-screen bg-gray-900 dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        
        {/* Header Section */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-4">
          The Story of <span className='text-teal-500'>LinkRead</span>
        </h1>
        <p className='text-xl text-teal-400 font-medium mb-12'>
          Connecting Ideas, Sharing Knowledge, Building Community.
        </p>

        {/* Content Section - Structured for better reading flow */}
        <div className="text-lg text-gray-300 flex flex-col gap-10 leading-relaxed bg-gray-800 p-8 md:p-12 rounded-xl shadow-2xl">
          
          {/* Mission Paragraph */}
          <section className='border-l-4 border-teal-500 pl-4'>
            <h2 className='text-2xl font-bold text-white mb-3'>
              Our Vision: Clarity in the Noise
            </h2>
            <p>
              LinkRead is more than just a blogging website — it’s a vision to connect writers, thinkers, and readers through the power of words.
              We believe that every story, every idea, and every experience deserves to be shared, and LinkRead is the bridge that makes that happen.
            </p>
          </section>

          {/* Platform Purpose Paragraph */}
          <section>
            <h2 className='text-2xl font-bold text-white mb-3'>
              What We Offer
            </h2>
            <p>
              In a world full of content, LinkRead was built to create clarity. We provide a clean, beautiful platform for you to publish your ideas, whether you're an aspiring writer, a tech enthusiast, or someone with unique insights. Reach an audience that truly listens and engages.
            </p>
          </section>

          {/* Community & Diversity Paragraph */}
          <section>
            <h2 className='text-2xl font-bold text-white mb-3'>
              A Diverse Community
            </h2>
            <p>
              Our platform allows you to write, discover, and engage with blogs from creators across the globe. From technology and software engineering to lifestyle, creativity, and personal reflections — LinkRead brings diverse voices together in one dynamic community, enriching the conversation for everyone.
            </p>
          </section>
        </div>

        {/* Closing & Call to Action */}
        <p className="mt-12 text-xl text-gray-400">
            We’re building LinkRead because we believe in the future of storytelling. Welcome to LinkRead, where every read creates a new connection.
        </p>

        <div className="mt-12">
          {/* Container for CallToAction is styled to match the dark theme */}
          <div className='p-6 md:p-10 bg-gray-800 rounded-xl shadow-2xl'> 
            <CallToAction />
          </div>
        </div>
      </div>
    </div>
  );
}