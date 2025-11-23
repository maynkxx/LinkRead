import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-blue-600">
          Threaddit
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="hover:text-blue-600 transition">Home</Link>
          <Link to="/threads" className="hover:text-blue-600 transition">Threads</Link>
          <Link to="/messages" className="hover:text-blue-600 transition">Messages</Link>
          <Link to="/profile" className="hover:text-blue-600 transition">Profile</Link>

          <Link
            to="/login"
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Login
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 p-4 space-y-4">
          <Link to="/" onClick={() => setMenuOpen(false)} className="block">Home</Link>
          <Link to="/threads" onClick={() => setMenuOpen(false)} className="block">Threads</Link>
          <Link to="/messages" onClick={() => setMenuOpen(false)} className="block">Messages</Link>
          <Link to="/profile" onClick={() => setMenuOpen(false)} className="block">Profile</Link>

          <Link
            to="/login"
            onClick={() => setMenuOpen(false)}
            className="block px-4 py-2 rounded-md bg-blue-600 text-white text-center hover:bg-blue-700"
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}
