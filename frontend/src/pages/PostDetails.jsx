import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API_URL, { authHeaders, getToken } from "../api";

export default function PostDetails() {
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const token = getToken();

  useEffect(() => {
    fetch(`${API_URL}/posts/${id}`).then(res => res.json()).then(setPost);
  }, []);

  const submitComment = async () => {
    const res = await fetch(`${API_URL}/comments`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({ content: comment, postId: id })
    });
    const data = await res.json();
    setPost({ ...post, comments: [...(post.comments || []), data] });
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>By {post?.author?.username}</p>
      <p>{post.content}</p>

      {token && (
        <>
          <textarea onChange={e => setComment(e.target.value)} placeholder="write a comment..." />
          <button onClick={submitComment}>Comment</button>
        </>
      )}

      <h3>Comments</h3>
      {(post.comments || []).map(c => (
        <p key={c._id}><b>{c.author.username}:</b> {c.content}</p>
      ))}
    </div>
  );
}
