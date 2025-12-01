import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isHome = location.pathname === "/";
  const isActive = (path) => location.pathname === path ? "active" : "";

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""} ${isHome && !scrolled ? "transparent" : "solid"}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          LinkRead
        </Link>

        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`hamburger ${mobileMenuOpen ? "open" : ""}`}></span>
        </button>

        <div className={`navbar-links ${mobileMenuOpen ? "mobile-open" : ""}`}>
          <Link
            to="/"
            className={`nav-link ${isActive("/")}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>

          {token ? (
            <>
              <Link
                to="/create"
                className={`nav-link ${isActive("/create")}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Create Post
              </Link>
              <Link
                to="/profile"
                className={`nav-link ${isActive("/profile")}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Profile
              </Link>
              <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="nav-link logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Optional About link could go here */}
              <Link
                to="/login"
                className={`nav-link ${isActive("/login")}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn btn-primary btn-sm nav-cta"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
