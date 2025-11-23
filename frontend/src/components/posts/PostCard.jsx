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
    <div className="w-full bg-gray-900 border border-gray-800 rounded-xl p-5 mb-5">
      {/* Post Header */}
      <div className="flex items-center justify-between mb-3">
        <Link to={`/profile/${post?.user?._id}`} className="flex items-center gap-3">
          <img
            src={post?.user?.avatar || "/default-avatar.png"}
            alt="avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="text-white font-semibold">{post?.user?.username}</p>
            <p className="text-xs text-gray-400">
              {new Date(post?.createdAt).toLocaleString()}
            </p>
          </div>
        </Link>

        {isOwner && (
          <button
            onClick={() => onDelete(post._id)}
            className="text-red-400 hover:text-red-300 text-sm"
          >
            Delete
          </button>
        )}
      </div>

      {/* Post Content */}
      <p className="text-gray-200 mb-3">{post?.content}</p>

      {/* Image/Media */}
      {post?.media && (
        <img
          src={post.media}
          alt=""
          className="rounded-lg w-full max-h-80 object-cover mb-3"
        />
      )}

      {/* Actions */}
      <div className="flex items-center gap-6 text-gray-400 text-sm">
        <button className="hover:text-white">❤️ {post?.likes?.length || 0}</button>
        <button className="hover:text-white" onClick={fetchComments}>
          💬 {post?.comments?.length || 0}
        </button>
        <button className="hover:text-white">🔗 Share</button>
      </div>

      {/* Comments */}
      {showComments && (
        <div className="mt-4 border-t border-gray-800 pt-4">
          {comments.length === 0 ? (
            <p className="text-gray-500 text-sm">No comments yet.</p>
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
