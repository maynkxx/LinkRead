import { Link } from 'react-router-dom';

export default function CallToAction() {
  return (
    <div style={{
      backgroundColor: '#F3F4F6',
      padding: '3rem 1rem',
      borderRadius: '0.5rem',
      margin: '2rem 0',
      textAlign: 'center'
    }}>
      <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        Ready to get started?
      </h2>
      <p style={{ fontSize: '1.125rem', color: '#6B7280', marginBottom: '2rem' }}>
        Join our community and start sharing your favorite links today!
      </p>
      <Link 
        to="/signup"
        style={{
          display: 'inline-block',
          padding: '0.75rem 2rem',
          backgroundColor: '#3B82F6',
          color: 'white',
          borderRadius: '0.375rem',
          fontSize: '1rem',
          fontWeight: '600',
          textDecoration: 'none'
        }}
      >
        Get Started
      </Link>
    </div>
  );
}
