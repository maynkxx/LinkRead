import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import { useState } from "react";

const ThreadCard = ({ thread, onDelete }) => {
  const { user } = useAuth();
  const api = useAxios();
  const [loading, setLoading] = useState(false);

  const isOwner = user?._id === thread?.user?._id;

  const handleDelete = async () => {
    if (!window.confirm("Delete this thread?")) return;
    try {
      setLoading(true);
      await api.delete(`/threads/${thread._id}`);
      if (onDelete) onDelete(thread._id);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-gray-900 border border-gray-800 rounded-xl p-5 mb-5 hover:bg-gray-800/60 transition">
      {/* Header: Title + Delete */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white mb-1">
            {thread?.title}
          </h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            {thread?.description}
          </p>
        </div>

        {isOwner && (
          <button
            disabled={loading}
            onClick={handleDelete}
            className="text-red-400 hover:text-red-300 text-sm"
          >
            {loading ? "Deleting…" : "Delete"}
          </button>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-5 text-sm text-gray-400">
        {/* Author */}
        <Link
          to={`/profile/${thread?.user?._id}`}
          className="flex items-center gap-2 hover:text-white"
        >
          <img
            src={thread?.user?.avatar || "/default-avatar.png"}
            alt=""
            className="w-8 h-8 rounded-full object-cover"
          />
          <span>@{thread?.user?.username}</span>
        </Link>

        {/* Counts */}
        <span>{thread?.postCount || 0} posts</span>

        {/* Open thread */}
        <Link
          to={`/thread/${thread?._id}`}
          className="px-3 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-500"
        >
          View Thread
        </Link>
      </div>
    </div>
  );
};

export default ThreadCard;
