import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
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
    if (!comment.trim()) return;

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

  const handleVote = async (type) => {
    if (!token) {
      alert("Please login to vote!");
      return;
    }

    const res = await fetch(`${API_URL}/posts/${id}/${type}`, {
      method: "PUT",
      headers: authHeaders()
    });

    if (res.ok) {
      const updatedPost = await fetch(`${API_URL}/posts/${id}`).then(res => res.json());
      setPost(updatedPost);
    }
  };

  const handleReport = async (targetId, targetModel) => {
    if (!token) {
      alert("Please login to report content.");
      return;
    }

    const reason = prompt("Please provide a reason for reporting this content:");
    if (!reason) return;

    const res = await fetch(`${API_URL}/reports`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({ targetId, targetModel, reason })
    });

    if (res.ok) {
      alert("Report submitted successfully.");
    } else {
      alert("Failed to submit report.");
    }
  };

  if (!post) return <div className="container loading"><p>Loading article...</p></div>;

  const score = (post.upvotes?.length || 0) - (post.downvotes?.length || 0);

  // Decode token to get current user ID
  const getCurrentUserId = () => {
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.id;
    } catch (e) {
      return null;
    }
  };

  const currentUserId = getCurrentUserId();
  const isAuthor = currentUserId && post.author?._id === currentUserId;

  return (
    <div className="container post-wrapper">

      {/* ARTICLE CARD */}
      <article className="card post-details-card">
        <header className="article-header">
          <div className="article-meta">
            <span className="badge badge-primary">{post.tags?.[0] || 'General'}</span>
            <span className="article-date">{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>

          <h1 className="article-title">{post.title}</h1>

          <div className="article-author">
            <div className="author-avatar">
              {post?.author?.username?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="author-info">
              <span className="author-name">{post?.author?.username}</span>
              <span className="author-role">Author</span>
            </div>
          </div>
        </header>

        <div className="article-content">
          {post.content}
        </div>

        <div className="article-footer">
          <div className="vote-section">
            <div className="vote-controls">
              <button onClick={() => handleVote("upvote")} className="vote-btn upvote" title="Upvote">
                ▲
              </button>
              <span className="vote-score">{score}</span>
              <button onClick={() => handleVote("downvote")} className="vote-btn downvote" title="Downvote">
                ▼
              </button>
            </div>

            {token && (
              <button className="btn-ghost btn-sm report-btn" onClick={() => handleReport(post._id, "Post")}>
                🚩 Report
              </button>
            )}
          </div>
        </div>
      </article>

      {/* COMMENTS SECTION */}
      <div className="comments-wrapper">
        <h3 className="comments-title">Discussion ({post.comments?.length || 0})</h3>

        {token ? (
          <div className="comment-form glass-panel">
            <textarea
              className="textarea comment-input"
              placeholder="What are your thoughts?"
              value={comment}
              onChange={e => setComment(e.target.value)}
            />
            <div className="comment-actions">
              <button className="btn btn-primary" onClick={submitComment}>Post Comment</button>
            </div>
          </div>
        ) : (
          <div className="login-prompt glass-panel">
            <p>Please <Link to="/login">login</Link> to join the discussion.</p>
          </div>
        )}

        <div className="comments-list">
          {(post.comments || []).map(c => (
            <div key={c._id} className="comment-item card">
              <div className="comment-header">
                <span className="comment-author">{c.author.username}</span>
                <span className="comment-date">{new Date(c.createdAt).toLocaleDateString()}</span>
              </div>
              <p className="comment-text">{c.content}</p>

              {token && (
                <button className="comment-report" onClick={() => handleReport(c._id, "Comment")}>
                  Report
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
