import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import API_URL, { authHeaders } from "../api";
import "../styles/CreatePost.css";

export default function CreatePost() {
  const [post, setPost] = useState({
    title: "",
    content: "",
    tags: [],
    isDraft: false
  });
  const [tagInput, setTagInput] = useState("");
  const [drafts, setDrafts] = useState([]);
  const [selectedDraft, setSelectedDraft] = useState(null);
  const [autoSaveStatus, setAutoSaveStatus] = useState("");
  const [aiLoading, setAiLoading] = useState({ titles: false, grammar: false, tags: false });
  const [titleSuggestions, setTitleSuggestions] = useState([]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const autoSaveTimer = useRef(null);

  // Rich text editor modules configuration
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'color': [] }, { 'background': [] }],
      ['blockquote', 'code-block'],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'color', 'background',
    'blockquote', 'code-block',
    'link', 'image'
  ];

  // Fetch user's drafts on mount
  useEffect(() => {
    fetchDrafts();

    // Load draft if draftId is in URL
    const draftId = searchParams.get('draftId');
    if (draftId) {
      loadDraft(draftId);
    }
  }, []);

  // Auto-save functionality
  useEffect(() => {
    if (post.title || post.content) {
      // Clear existing timer
      if (autoSaveTimer.current) {
        clearTimeout(autoSaveTimer.current);
      }

      // Set new timer for auto-save (30 seconds)
      autoSaveTimer.current = setTimeout(() => {
        autoSaveDraft();
      }, 30000);
    }

    return () => {
      if (autoSaveTimer.current) {
        clearTimeout(autoSaveTimer.current);
      }
    };
  }, [post.title, post.content]);

  const fetchDrafts = async () => {
    try {
      const res = await fetch(`${API_URL}/posts/drafts/me`, {
        headers: authHeaders()
      });
      if (res.ok) {
        const data = await res.json();
        setDrafts(data);
      }
    } catch (error) {
      console.error("Failed to fetch drafts:", error);
    }
  };

  const loadDraft = async (draftId) => {
    try {
      const res = await fetch(`${API_URL}/posts/${draftId}`);
      if (res.ok) {
        const data = await res.json();
        setPost({
          title: data.title,
          content: data.content,
          tags: data.tags || [],
          isDraft: true
        });
        setSelectedDraft(draftId);
        setTagInput(data.tags?.join(", ") || "");
      }
    } catch (error) {
      console.error("Failed to load draft:", error);
    }
  };

  const autoSaveDraft = async () => {
    if (!post.title && !post.content) return;

    setAutoSaveStatus("Saving...");

    try {
      const draftData = {
        ...post,
        tags: tagInput.split(",").map(t => t.trim()).filter(t => t),
        isDraft: true
      };

      let res;
      if (selectedDraft) {
        // Update existing draft
        res = await fetch(`${API_URL}/posts/${selectedDraft}`, {
          method: "PUT",
          headers: authHeaders(),
          body: JSON.stringify(draftData)
        });
      } else {
        // Create new draft
        res = await fetch(`${API_URL}/posts`, {
          method: "POST",
          headers: authHeaders(),
          body: JSON.stringify(draftData)
        });
      }

      if (res.ok) {
        const data = await res.json();
        if (!selectedDraft) {
          setSelectedDraft(data._id);
        }
        setAutoSaveStatus("✓ Saved");
        setTimeout(() => setAutoSaveStatus(""), 2000);
      }
    } catch (error) {
      setAutoSaveStatus("Failed to save");
      setTimeout(() => setAutoSaveStatus(""), 2000);
    }
  };

  const saveDraft = async () => {
    const draftData = {
      ...post,
      tags: tagInput.split(",").map(t => t.trim()).filter(t => t),
      isDraft: true
    };

    try {
      let res;
      if (selectedDraft) {
        res = await fetch(`${API_URL}/posts/${selectedDraft}`, {
          method: "PUT",
          headers: authHeaders(),
          body: JSON.stringify(draftData)
        });
      } else {
        res = await fetch(`${API_URL}/posts`, {
          method: "POST",
          headers: authHeaders(),
          body: JSON.stringify(draftData)
        });
      }

      const data = await res.json();

      if (res.ok) {
        alert("Draft saved successfully!");
        setSelectedDraft(data._id);
        fetchDrafts();
      } else {
        alert(data.message || "Failed to save draft");
      }
    } catch (error) {
      alert("Failed to save draft");
    }
  };

  const publishPost = async () => {
    if (!post.title || !post.content) {
      alert("Title and content are required!");
      return;
    }

    const publishData = {
      ...post,
      tags: tagInput.split(",").map(t => t.trim()).filter(t => t),
      isDraft: false
    };

    try {
      let res;
      if (selectedDraft) {
        // Update existing draft to published
        res = await fetch(`${API_URL}/posts/${selectedDraft}`, {
          method: "PUT",
          headers: authHeaders(),
          body: JSON.stringify(publishData)
        });
      } else {
        // Create new published post
        res = await fetch(`${API_URL}/posts`, {
          method: "POST",
          headers: authHeaders(),
          body: JSON.stringify(publishData)
        });
      }

      const data = await res.json();

      if (res.ok) {
        alert("Post published successfully!");
        navigate(`/post/${data._id}`);
      } else {
        alert(data.message || "Failed to publish post");
      }
    } catch (error) {
      alert("Failed to publish post");
    }
  };

  // AI Helper Functions
  const handleGenerateTitles = async () => {
    if (!post.content) {
      alert("Please write some content first!");
      return;
    }

    setAiLoading({ ...aiLoading, titles: true });
    try {
      const res = await fetch(`${API_URL}/ai/generate-titles`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ content: post.content })
      });

      const data = await res.json();

      if (res.ok) {
        setTitleSuggestions(data.titles);
      } else {
        alert(data.message || "AI feature not available. Please add OPENAI_API_KEY to your .env file.");
      }
    } catch (error) {
      alert("Failed to generate titles. AI feature may not be configured.");
    } finally {
      setAiLoading({ ...aiLoading, titles: false });
    }
  };

  const handleImproveGrammar = async () => {
    if (!post.content) {
      alert("Please write some content first!");
      return;
    }

    setAiLoading({ ...aiLoading, grammar: true });
    try {
      const res = await fetch(`${API_URL}/ai/improve-text`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ text: post.content })
      });

      const data = await res.json();

      if (res.ok) {
        if (window.confirm("Replace current content with improved version?")) {
          setPost({ ...post, content: data.improvedText });
        }
      } else {
        alert(data.message || "AI feature not available. Please add OPENAI_API_KEY to your .env file.");
      }
    } catch (error) {
      alert("Failed to improve text. AI feature may not be configured.");
    } finally {
      setAiLoading({ ...aiLoading, grammar: false });
    }
  };

  const handleSuggestTags = async () => {
    if (!post.content) {
      alert("Please write some content first!");
      return;
    }

    setAiLoading({ ...aiLoading, tags: true });
    try {
      const res = await fetch(`${API_URL}/ai/suggest-tags`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ content: post.content })
      });

      const data = await res.json();

      if (res.ok) {
        setTagInput(data.tags.join(", "));
      } else {
        alert(data.message || "AI feature not available. Please add OPENAI_API_KEY to your .env file.");
      }
    } catch (error) {
      alert("Failed to suggest tags. AI feature may not be configured.");
    } finally {
      setAiLoading({ ...aiLoading, tags: false });
    }
  };

  return (
    <div className="container create-wrapper">
      <div className="create-card">
        <h1 className="create-title">Create a New Post</h1>
        <p className="create-sub">Share your ideas with the community.</p>

        {autoSaveStatus && (
          <div className="auto-save-indicator">
            {autoSaveStatus}
          </div>
        )}

        {drafts.length > 0 && !selectedDraft && (
          <div className="drafts-section">
            <h3>Your Drafts</h3>
            <div className="drafts-list">
              {drafts.map(draft => (
                <div
                  key={draft._id}
                  className="draft-item"
                  onClick={() => loadDraft(draft._id)}
                >
                  <h4>{draft.title || "Untitled Draft"}</h4>
                  <small>Last saved: {new Date(draft.lastSavedAt).toLocaleString()}</small>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="create-form">
          <label>Title</label>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <input
              className="input"
              placeholder="Enter post title"
              value={post.title}
              onChange={e => setPost({ ...post, title: e.target.value })}
              style={{ flex: 1 }}
            />
            <button
              className="btn-ai"
              onClick={handleGenerateTitles}
              disabled={aiLoading.titles}
              type="button"
            >
              {aiLoading.titles ? "⏳" : "✨"} Suggest Titles
            </button>
          </div>

          {titleSuggestions.length > 0 && (
            <div className="ai-suggestions">
              <p><strong>AI Title Suggestions:</strong></p>
              {titleSuggestions.map((title, idx) => (
                <div
                  key={idx}
                  className="suggestion-item"
                  onClick={() => {
                    setPost({ ...post, title });
                    setTitleSuggestions([]);
                  }}
                >
                  {title}
                </div>
              ))}
            </div>
          )}

          <label>Content</label>
          <div style={{ marginBottom: '0.5rem' }}>
            <button
              className="btn-ai"
              onClick={handleImproveGrammar}
              disabled={aiLoading.grammar}
              type="button"
              style={{ marginRight: '0.5rem' }}
            >
              {aiLoading.grammar ? "⏳ Improving..." : "✨ Improve Grammar"}
            </button>
          </div>
          <ReactQuill
            theme="snow"
            value={post.content}
            onChange={(content) => setPost({ ...post, content })}
            modules={modules}
            formats={formats}
            placeholder="Write your content..."
            className="rich-text-editor"
          />

          <label>Tags (comma separated)</label>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <input
              className="input"
              placeholder="e.g. React, Tech, Life"
              value={tagInput}
              onChange={e => setTagInput(e.target.value)}
              style={{ flex: 1 }}
            />
            <button
              className="btn-ai"
              onClick={handleSuggestTags}
              disabled={aiLoading.tags}
              type="button"
            >
              {aiLoading.tags ? "⏳" : "✨"} Suggest Tags
            </button>
          </div>

          <div className="button-group">
            <button
              className="btn btn-secondary"
              onClick={saveDraft}
            >
              💾 Save as Draft
            </button>
            <button
              className="btn btn-primary create-btn"
              onClick={publishPost}
            >
              📝 Publish Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
