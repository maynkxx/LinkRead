import { useState } from "react";
import useAxios from "../../hooks/useAxios";

const ThreadForm = ({ onThreadCreated }) => {
  const api = useAxios();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    try {
      setLoading(true);
      const res = await api.post("/threads/create", {
        title,
        description,
      });

      setTitle("");
      setDescription("");

      if (onThreadCreated) onThreadCreated(res.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-gray-900 border border-gray-800 rounded-xl p-5 mb-5">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        {/* Title */}
        <input
          type="text"
          placeholder="Thread Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-gray-800 text-gray-200 p-3 rounded-lg outline-none"
        />

        {/* Description */}
        <textarea
          rows={3}
          placeholder="What's this thread about?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full bg-gray-800 text-gray-200 p-3 rounded-lg outline-none resize-none"
        ></textarea>

        {/* Submit */}
        <button
          disabled={!title.trim() || !description.trim() || loading}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 disabled:opacity-50"
        >
          {loading ? "Creating…" : "Create Thread"}
        </button>
      </form>
    </div>
  );
};

export default ThreadForm;
