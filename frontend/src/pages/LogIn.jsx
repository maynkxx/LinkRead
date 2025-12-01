import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    <div className="container login-wrapper">

      <div className="login-card">
        <h1 className="login-title">Login to Your Account</h1>
        <p className="login-sub">Access your discussions and stay connected.</p>

        <div className="login-form">
          <label>Email</label>
          <input
            className="input"
            placeholder="Enter your email"
            onChange={e => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            className="input"
            placeholder="Enter your password"
            type="password"
            onChange={e => setPassword(e.target.value)}
          />

          <button className="btn btn-primary login-btn" onClick={submit}>
            Login
          </button>
        </div>
      </div>

    </div>
  );
}
