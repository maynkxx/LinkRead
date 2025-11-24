import { useState } from "react";
import { Link } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import CommentCard from "../comments/CommentCard";

const PostCard = ({ post, onDelete }) => {
  const api = useAxios();
  const { user } = useAuth();
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  const isOwner = user?._id === post?.user?._id;

  const fetchComments = async () => {
    if (!showComments) {
      const res = await api.get(`/comments/post/${post._id}`);
      setComments(res.data);
    }
    setShowComments(!showComments);
  };

  return (
    <div className="post-card">
      {/* Post Header */}
      <div className="post-card-header">
        <Link to={`/profile/${post?.user?._id}`} className="post-card-profile-link">
          <img
            src={post?.user?.avatar || "/default-avatar.png"}
            alt="avatar"
            className="post-card-avatar"
          />
          <div>
            <p className="post-card-username">{post?.user?.username}</p>
            <p className="post-card-date">
              {new Date(post?.createdAt).toLocaleString()}
            </p>
          </div>
        </Link>

        {isOwner && (
          <button
            onClick={() => onDelete(post._id)}
            className="post-card-delete-btn"
          >
            Delete
          </button>
        )}
      </div>

      {/* Post Content */}
      <p className="post-card-content">{post?.content}</p>

      {/* Image/Media */}
      {post?.media && (
        <img
          src={post.media}
          alt=""
          className="post-card-image"
        />
      )}

      {/* Actions */}
      <div className="post-card-actions">
        <button>❤️ {post?.likes?.length || 0}</button>
        <button onClick={fetchComments}>💬 {post?.comments?.length || 0}</button>
        <button>🔗 Share</button>
      </div>

      {/* Comments */}
      {showComments && (
        <div className="post-card-comments">
          {comments.length === 0 ? (
            <p className="post-card-no-comments">No comments yet.</p>
          ) : (
            comments.map((c) => (
              <CommentCard
                key={c._id}
                comment={c}
                currentUserId={user?._id}
                onDelete={() => console.log("delete comment")}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default PostCard;
