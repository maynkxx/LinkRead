import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL, { authHeaders } from "../api";
import "../styles/CreatePost.css";

export default function CreatePost() {
  const [post, setPost] = useState({ title: "", content: "", tags: [] });
  const navigate = useNavigate();

  const submit = async () => {
    const res = await fetch(`${API_URL}/posts`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(post)
    });

    const data = await res.json();

    if (res.ok) navigate(`/post/${data._id}`);
    else alert(data.message);
  };

  return (
    <div className="container create-wrapper">
      <div className="card create-card">
        <div className="create-header">
          <h1 className="create-title">Create New Post</h1>
          <p className="create-sub">Share your thoughts with the community.</p>
        </div>

        <div className="create-form">
          <div className="form-group">
            <label>Title</label>
            <input
              className="input title-input"
              placeholder="Enter an engaging title..."
              onChange={e => setPost({ ...post, title: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Tags</label>
            <input
              className="input"
              placeholder="e.g. React, Productivity, Life (comma separated)"
              onChange={e => setPost({ ...post, tags: e.target.value.split(",").map(t => t.trim()) })}
            />
          </div>

          <div className="form-group">
            <label>Content</label>
            <textarea
              className="textarea content-input"
              placeholder="Write your story here..."
              onChange={e => setPost({ ...post, content: e.target.value })}
            ></textarea>
          </div>

          <div className="form-actions">
            <button className="btn btn-secondary" onClick={() => navigate(-1)}>Cancel</button>
            <button className="btn btn-primary" onClick={submit}>Publish Post</button>
          </div>
        </div>
      </div>
    </div>
  );
}
