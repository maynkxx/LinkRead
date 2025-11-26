import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <Link to="/" className="logo-link">
          Threaddit
        </Link>

        {/* Desktop Menu */}
        <div className="nav-links">
          <Link to="/" className="">Home</Link>
          <Link to="/threads" className="">Threads</Link>
          <Link to="/messages" className="">Messages</Link>
          <Link to="/profile" className="">Profile</Link>

          <Link
            to="/login"
            className="btn-login"
          >
            Login
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <button
          className="mobile-menu-icon"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <Link to="/" onClick={() => setMenuOpen(false)} className="block">Home</Link>
          <Link to="/threads" onClick={() => setMenuOpen(false)} className="block">Threads</Link>
          <Link to="/messages" onClick={() => setMenuOpen(false)} className="block">Messages</Link>
          <Link to="/profile" onClick={() => setMenuOpen(false)} className="block">Profile</Link>

          <Link
            to="/login"
            onClick={() => setMenuOpen(false)}
            className="btn-login block text-center"
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}
