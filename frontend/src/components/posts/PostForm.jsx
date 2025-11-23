import { useState } from "react";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";

const PostForm = ({ onPostCreated }) => {
  const api = useAxios();
  const { user } = useAuth();

  const [content, setContent] = useState("");
  const [media, setMedia] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() && !media) return;

    const formData = new FormData();
    formData.append("content", content);
    if (media) formData.append("media", media);

    try {
      setLoading(true);
      const res = await api.post("/posts/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setContent("");
      setMedia(null);

      if (onPostCreated) onPostCreated(res.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-gray-900 border border-gray-800 rounded-xl p-5 mb-5">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Input */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share something..."
          className="w-full bg-gray-800 text-gray-200 p-3 rounded-lg outline-none resize-none"
          rows={3}
        />

        {/* Media Upload */}
        <div className="flex items-center justify-between">
          <label className="cursor-pointer text-gray-400 hover:text-white">
            📎 Attach Media
            <input
              type="file"
              accept="image/*,video/*"
              className="hidden"
              onChange={(e) => setMedia(e.target.files[0])}
            />
          </label>

          {media && (
            <span className="text-gray-400 text-sm">
              {media.name}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <button
          disabled={!content.trim() && !media || loading}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 disabled:opacity-50"
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </form>
    </div>
  );
};

export default PostForm;
