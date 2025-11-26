export default function SignIn() {
  return (
    <div className="container">
      <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem', textAlign: 'center' }}>Sign In</h1>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Email</label>
            <input 
              type="email" 
              placeholder="Enter your email"
              style={{ 
                width: '100%', 
                padding: '0.75rem', 
                border: '1px solid #D1D5DB', 
                borderRadius: '0.375rem',
                fontSize: '1rem'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Password</label>
            <input 
              type="password" 
              placeholder="Enter your password"
              style={{ 
                width: '100%', 
                padding: '0.75rem', 
                border: '1px solid #D1D5DB', 
                borderRadius: '0.375rem',
                fontSize: '1rem'
              }}
            />
          </div>
          <button 
            type="submit"
            style={{
              padding: '0.75rem',
              backgroundColor: '#3B82F6',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              fontSize: '1rem',
              fontWeight: '600',
              marginTop: '0.5rem'
            }}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
