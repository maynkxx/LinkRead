import { useEffect, useState } from "react";
import API_URL from "../api";
import { Link } from "react-router-dom";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/posts`)
      .then(res => res.json())
      .then(setPosts);
  }, []);

  return (
    <div>
      <h2>Latest Posts</h2>
      {posts.map(p => (
        <div key={p._id} style={{ borderBottom: "1px solid #ccc", padding: 10 }}>
          <Link to={`/post/${p._id}`}>
            <h3>{p.title}</h3>
          </Link>
          <p>By {p?.author?.username}</p>
        </div>
      ))}
    </div>
  );
}
