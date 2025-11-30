import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API_URL from "../api";
import "../styles/Home.css";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/posts`)
      .then(res => res.json())
      .then(setPosts);
  }, []);

  return (
    <div className="container">

      {/* HERO SECTION */}
      <div className="hero">
        <h1 className="hero-title">Latest Discussions</h1>
        <p className="hero-sub">Join the conversation and explore what's trending.</p>
      </div>

      {/* POSTS LIST */}
      {posts.map(post => (
        <div key={post._id} className="post-card">
          <Link to={`/post/${post._id}`}>
            <h3>{post.title}</h3>
          </Link>
          <p>By {post?.author?.username}</p>
        </div>
      ))}

    </div>
  );
}
