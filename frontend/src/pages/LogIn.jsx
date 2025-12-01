import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API_URL from "../api";
import "../styles/Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async () => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      navigate("/");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="glass-panel auth-card">
          <div className="auth-content">
            <h1 className="auth-title">Welcome Back</h1>
            <p className="auth-sub">Login to continue your journey.</p>

            <div className="auth-form">
              <div className="form-group">
                <label>Email</label>
                <input
                  className="input"
                  placeholder="Enter your email"
                  onChange={e => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  className="input"
                  placeholder="Enter your password"
                  type="password"
                  onChange={e => setPassword(e.target.value)}
                />
              </div>

              <button className="btn btn-primary auth-btn" onClick={submit}>
                Login
              </button>

              <p className="auth-footer">
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
          </div>
          <div className="auth-decoration">
            {/* Optional decorative element or image could go here */}
          </div>
        </div>
      </div>
    </div>
  );
}
