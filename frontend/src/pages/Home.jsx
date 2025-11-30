import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API_URL from "../api";
import "../styles/Home.css";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [popularPosts, setPopularPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  const fetchPosts = (query = "") => {
    let url = `${API_URL}/posts`;
    if (query) url += `?${query}`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setPosts(data);
      })
      .catch(err => console.error("Failed to fetch posts", err));
  };

  useEffect(() => {
    fetchPosts();

    fetch(`${API_URL}/posts/popular`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setPopularPosts(data);
      })
      .catch(err => console.error("Failed to fetch popular posts", err));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchPosts(`search=${search}`);
    setSelectedTag(""); // Clear tag when searching
  };

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
    setSearch(""); // Clear search when filtering by tag
    fetchPosts(`tag=${tag}`);
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedTag("");
    fetchPosts();
  };

  return (
    <div className="container">

      {/* HERO SECTION */}
      <div className="hero">
        <h1 className="hero-title">Latest Discussions</h1>
        <p className="hero-sub">Join the conversation and explore what's trending.</p>

        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-btn">Search</button>
        </form>

        {selectedTag && (
          <div className="active-filter">
            <span>Filtered by: <strong>{selectedTag}</strong></span>
            <button onClick={clearFilters} className="clear-btn">Clear</button>
          </div>
        )}
      </div>

      <div className="home-layout">
        <div className="main-feed">
          <h2>Latest Posts</h2>
          {posts.map(post => (
            <div key={post._id} className="post-card">
              <Link to={`/post/${post._id}`}>
                <h3>{post.title}</h3>
              </Link>
              <div className="post-tags">
                {post.tags?.map(tag => (
                  <span key={tag} className="tag-chip" onClick={() => handleTagClick(tag)}>#{tag}</span>
                ))}
              </div>
              <p>By {post?.author?.username}</p>
            </div>
          ))}
        </div>

        <div className="sidebar">
          <h2>Popular Posts 🔥</h2>
          {popularPosts.map(post => (
            <div key={post._id} className="popular-card">
              <Link to={`/post/${post._id}`}>
                <h4>{post.title}</h4>
              </Link>
              <p>Score: {(post.upvotes?.length || 0) - (post.downvotes?.length || 0)}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
