import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL, { authHeaders } from "../api";
import "../styles/CreatePost.css";

export default function CreatePost() {
  const [post, setPost] = useState({ title: "", content: "" });
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

      <div className="create-card">
        <h1 className="create-title">Create a New Post</h1>
        <p className="create-sub">Share your ideas with the community.</p>

        <div className="create-form">
          <label>Title</label>
          <input
            className="input"
            placeholder="Enter post title"
            onChange={e => setPost({ ...post, title: e.target.value })}
          />

          <label>Content</label>
          <textarea
            className="textarea"
            placeholder="Write your content..."
            onChange={e => setPost({ ...post, content: e.target.value })}
          ></textarea>

          <button className="btn btn-primary create-btn" onClick={submit}>
            Publish Post
          </button>
        </div>
      </div>

    </div>
  );
}
