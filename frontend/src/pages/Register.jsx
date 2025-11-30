import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../api";

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
    <div>
      <h2>Register</h2>
      <input placeholder="username" onChange={e => setForm({ ...form, username: e.target.value })} />
      <input placeholder="email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input placeholder="password" type="password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button onClick={submit}>Register</button>
    </div>
  );
}
