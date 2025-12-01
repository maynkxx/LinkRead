import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API_URL from "../api";
import "../styles/Register.css";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const submit = async () => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
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
            <h1 className="auth-title">Create Account</h1>
            <p className="auth-sub">Join our community today.</p>

            <div className="auth-form">
              <div className="form-group">
                <label>Username</label>
                <input
                  className="input"
                  placeholder="Enter your username"
                  onChange={e => setForm({ ...form, username: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  className="input"
                  placeholder="Enter your email"
                  onChange={e => setForm({ ...form, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  className="input"
                  type="password"
                  placeholder="Create a password"
                  onChange={e => setForm({ ...form, password: e.target.value })}
                />
              </div>

              <button className="btn btn-primary auth-btn" onClick={submit}>
                Register
              </button>

              <p className="auth-footer">
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
