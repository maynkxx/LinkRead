import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      {post.image && (
        <img 
          src={post.image} 
          alt={post.title}
          style={{
            width: '100%',
            height: '200px',
            objectFit: 'cover'
          }}
        />
      )}
      <div style={{ padding: '1.5rem' }}>
        <h3 className="text-xl font-bold mb-2 text-gray-900">
          {post.title}
        </h3>
        {post.category && (
          <span style={{
            display: 'inline-block',
            padding: '0.25rem 0.75rem',
            backgroundColor: 'var(--primary-100)',
            color: 'var(--primary-700)',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: '500',
            marginBottom: '0.75rem'
          }}>
            {post.category}
          </span>
        )}
        <Link 
          to={`/post/${post._id}`}
          className="text-primary font-medium hover:underline"
          style={{ display: 'block', marginTop: '0.5rem' }}
        >
          Read article →
        </Link>
      </div>
    </div>
  );
}
