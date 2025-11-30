import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL, { authHeaders } from "../api";

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
    <div>
      <h2>Create Post</h2>
      <input placeholder="title" onChange={e => setPost({ ...post, title: e.target.value })} />
      <textarea placeholder="content" onChange={e => setPost({ ...post, content: e.target.value })} />
      <button onClick={submit}>Create</button>
    </div>
  );
}
