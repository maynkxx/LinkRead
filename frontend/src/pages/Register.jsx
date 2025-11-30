import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    <div className="container register-wrapper">

      <div className="register-card">
        <h1 className="register-title">Create an Account</h1>
        <p className="register-sub">Join the community and start sharing your thoughts.</p>

        <div className="register-form">

          <label>Username</label>
          <input 
            className="input"
            placeholder="Enter your username"
            onChange={e => setForm({ ...form, username: e.target.value })}
          />

          <label>Email</label>
          <input 
            className="input"
            placeholder="Enter your email"
            onChange={e => setForm({ ...form, email: e.target.value })}
          />

          <label>Password</label>
          <input 
            className="input"
            type="password"
            placeholder="Create a password"
            onChange={e => setForm({ ...form, password: e.target.value })}
          />

          <button className="btn btn-primary register-btn" onClick={submit}>
            Register
          </button>
        </div>
      </div>

    </div>
  );
}
