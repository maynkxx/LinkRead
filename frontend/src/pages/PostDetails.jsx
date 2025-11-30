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
      // Refresh post data to show updated votes
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
      alert("Report submitted successfully. Thank you for helping keep our community safe.");
    } else {
      alert("Failed to submit report.");
    }
  };

  if (!post) return <div className="container"><p>Loading...</p></div>;

  const score = (post.upvotes?.length || 0) - (post.downvotes?.length || 0);

  return (
    <div className="container post-wrapper">

      {/* POST DETAILS CARD */}
      <div className="post-details-card">
        <h1 className="post-title">{post.title}</h1>
        <p className="post-author">By {post?.author?.username}</p>
        <p className="post-content">{post.content}</p>

        {/* VOTING SECTION */}
        <div className="vote-section">
          <div className="vote-buttons">
            <button onClick={() => handleVote("upvote")} className="vote-btn">Upvote</button>
            <span className="vote-score">{score}</span>
            <button onClick={() => handleVote("downvote")} className="vote-btn">Downvote</button>
          </div>

          {token && (
            <button
              className="report-btn"
              onClick={() => handleReport(post._id, "Post")}
            >
              🚩 Report Post
            </button>
          )}
        </div>
      </div>

      {/* COMMENT INPUT */}
      {token ? (
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
      ) : (
        <div className="login-prompt">
          <p>Please <a href="/login">login</a> to comment or vote.</p>
        </div>
      )}

      {/* COMMENT LIST */}
      <div className="comments-section">
        <h2>Comments</h2>

        {(post.comments || []).map(c => (
          <div key={c._id} className="comment-item">
            <div className="comment-header">
              <p className="comment-author">{c.author.username}</p>
              {token && (
                <button
                  className="report-link"
                  onClick={() => handleReport(c._id, "Comment")}
                >
                  Report
                </button>
              )}
            </div>
            <p className="comment-text">{c.content}</p>
          </div>
        ))}
      </div>

    </div>
  );
}
