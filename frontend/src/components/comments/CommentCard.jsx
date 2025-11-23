import { useState } from "react";

const CommentCard = ({ comment, currentUserId, onDelete }) => {
  const [showActions, setShowActions] = useState(false);

  const isOwner = currentUserId === comment?.user?._id;

  return (
    <div
      className="flex gap-3 p-3 border-b border-gray-800 hover:bg-gray-900 transition"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Avatar */}
      <img
        src={comment?.user?.avatar || "/default-avatar.png"}
        alt="avatar"
        className="w-10 h-10 rounded-full object-cover"
      />

      <div className="flex-1">
        {/* Username + Timestamp */}
        <div className="flex items-center justify-between">
          <p className="font-semibold text-white">
            {comment?.user?.username || "Unknown"}
          </p>

          {isOwner && showActions && (
            <button
              onClick={() => onDelete(comment._id)}
              className="text-red-400 text-sm hover:text-red-300"
            >
              Delete
            </button>
          )}
        </div>

        {/* Content */}
        <p className="text-gray-300 mt-1 text-sm">{comment?.content}</p>

        {/* Date */}
        <span className="text-gray-500 text-xs">
          {new Date(comment?.createdAt).toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default CommentCard;
