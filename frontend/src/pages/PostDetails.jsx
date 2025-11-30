import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API_URL, { authHeaders, getToken } from "../api";
import "../styles/PostDetails.css";

export default function PostDetails() {
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const token = getToken();

  useEffect(() => {
    fetch(`${API_URL}/posts/${id}`)
      .then(res => res.json())
      .then(setPost);
  }, [id]);

  const submitComment = async () => {
    const res = await fetch(`${API_URL}/comments`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({ content: comment, postId: id })
    });

    const data = await res.json();

    setPost(prev => ({
      ...prev,
      comments: [...(prev.comments || []), data]
    }));

    setComment("");
  };

  if (!post) return <div className="container"><p>Loading...</p></div>;

  return (
    <div className="container post-wrapper">

      {/* POST DETAILS CARD */}
      <div className="post-details-card">
        <h1 className="post-title">{post.title}</h1>
        <p className="post-author">By {post?.author?.username}</p>
        <p className="post-content">{post.content}</p>
      </div>

      {/* COMMENT INPUT */}
      {token && (
        <div className="comment-card">
          <h2>Add a Comment</h2>

          <textarea
            className="textarea"
            placeholder="Write a comment..."
            value={comment}
            onChange={e => setComment(e.target.value)}
          />

          <button className="btn btn-primary comment-btn" onClick={submitComment}>
            Comment
          </button>
        </div>
      )}

      {/* COMMENT LIST */}
      <div className="comments-section">
        <h2>Comments</h2>

        {(post.comments || []).map(c => (
          <div key={c._id} className="comment-item">
            <p className="comment-author">{c.author.username}</p>
            <p className="comment-text">{c.content}</p>
          </div>
        ))}
      </div>

    </div>
  );
}
