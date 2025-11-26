import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      overflow: 'hidden',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)';
    }}
    >
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
        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: 'bold',
          marginBottom: '0.5rem',
          color: '#1F2937'
        }}>
          {post.title}
        </h3>
        {post.category && (
          <span style={{
            display: 'inline-block',
            padding: '0.25rem 0.75rem',
            backgroundColor: '#DBEAFE',
            color: '#1E40AF',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: '500',
            marginBottom: '0.75rem'
          }}>
            {post.category}
          </span>
        )}
        <Link 
          to={`/post/${post.slug}`}
          style={{
            display: 'inline-block',
            marginTop: '0.75rem',
            color: '#3B82F6',
            fontWeight: '600',
            fontSize: '0.875rem'
          }}
        >
          Read article →
        </Link>
      </div>
    </div>
  );
}
