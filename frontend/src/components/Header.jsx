import { Link } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check if dark mode is active
    const checkDarkMode = () => {
      const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
      setIsDark(isDarkMode);
    };

    checkDarkMode();
    
    // Listen for theme changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header style={{
      backgroundColor: isDark ? '#1F2937' : 'white',
      borderBottom: `1px solid ${isDark ? '#374151' : '#E5E7EB'}`,
      padding: '1rem 0',
      marginBottom: '2rem',
      transition: 'all 0.3s ease'
    }}>
      <nav className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link 
          to="/" 
          style={{ 
            fontSize: '1.5rem', 
            fontWeight: 'bold',
            color: isDark ? '#F9FAFB' : '#1F2937',
            transition: 'color 0.3s ease'
          }}
        >
          LinkRead
        </Link>
        
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link 
            to="/" 
            style={{ 
              color: isDark ? '#D1D5DB' : '#4B5563', 
              fontWeight: '500',
              transition: 'color 0.3s ease'
            }}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            style={{ 
              color: isDark ? '#D1D5DB' : '#4B5563', 
              fontWeight: '500',
              transition: 'color 0.3s ease'
            }}
          >
            About
          </Link>
          <Link 
            to="/projects" 
            style={{ 
              color: isDark ? '#D1D5DB' : '#4B5563', 
              fontWeight: '500',
              transition: 'color 0.3s ease'
            }}
          >
            Projects
          </Link>
          <DarkModeToggle />
          <Link 
            to="/signin"
            style={{
              padding: '0.5rem 1.5rem',
              backgroundColor: '#3B82F6',
              color: 'white',
              borderRadius: '0.375rem',
              fontWeight: '500'
            }}
          >
            Sign In
          </Link>
        </div>
      </nav>
    </header>
  );
}
