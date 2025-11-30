import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav style={{ padding: "15px", background: "#eee" }}>
      <Link to="/">Home</Link> | <Link to="/create">Create Post</Link>
      {!token ? (
        <>
          {" "} | <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
        </>
      ) : (
        <>
          {" "} | <button onClick={logout}>Logout</button>
        </>
      )}
    </nav>
  );
}
