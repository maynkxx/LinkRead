import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">

        <div className="navbar-left">
          <Link to="/" className="navbar-logo">LinkRead</Link>
        </div>

        <div className="navbar-links">
          <Link to="/">Home</Link>

          {token ? (
            <>
              <Link to="/create">Create Post</Link>
              <Link to="/profile">Profile</Link>
              <button onClick={logout} className="navbar-logout">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>

      </div>
    </nav>
  );
}
