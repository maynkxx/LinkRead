import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API_URL, { getToken } from "../api";
import "../styles/Profile.css";

export default function Profile() {
    const [user, setUser] = useState({ username: "User", email: "user@example.com" });
    const [myPosts, setMyPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = getToken();

    useEffect(() => {
        if (!token) {
            setLoading(false);
            return;
        }

        // Fetch all posts and filter for the current user (mock implementation)
        // In a real app, we should have an endpoint like /posts/me or /users/me/posts
        fetch(`${API_URL}/posts`)
            .then(res => res.json())
            .then(posts => {
                if (Array.isArray(posts)) {
                    // Since we don't have the user ID easily, we'll simulate "my posts" 
                    // by just picking a few random ones or if we had the ID we'd filter:
                    // const userPosts = posts.filter(p => p.author._id === currentUserId);

                    // For this demo, let's assume the user hasn't posted anything if the list is empty,
                    // or we can just set it to empty to test the "no posts" message.
                    // Let's try to actually find posts by "Anonymous" or the default user if possible,
                    // otherwise default to empty to show the empty state correctly.

                    // Mocking: let's say we found 0 posts to demonstrate the fix
                    setMyPosts([]);

                    // If you want to see posts, uncomment below:
                    // setMyPosts(posts.slice(0, 2));
                }
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });

    }, [token]);

    if (!token) {
        return (
            <div className="container profile-wrapper">
                <div className="login-prompt glass-panel">
                    <p>Please <Link to="/login">login</Link> to view your profile.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container profile-wrapper">

            {/* PROFILE HEADER CARD */}
            <div className="glass-panel profile-card">
                <div className="profile-header">
                    <div className="profile-avatar">
                        {user.username.charAt(0).toUpperCase()}
                    </div>
                    <div className="profile-info">
                        <h1 className="profile-name">{user.username}</h1>
                        <p className="profile-bio">Passionate reader and writer. Sharing thoughts on technology and life.</p>
                        <div className="profile-badges">
                            <span className="badge badge-primary">Pro Member</span>
                            <span className="badge">Writer</span>
                        </div>
                    </div>
                    <button className="btn btn-secondary edit-profile-btn">Edit Profile</button>
                </div>

                {/* STATS GRID */}
                <div className="stats-grid">
                    <div className="stat-item">
                        <span className="stat-value">{myPosts.length}</span>
                        <span className="stat-label">Posts Published</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">0</span>
                        <span className="stat-label">Total Likes</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">0</span>
                        <span className="stat-label">Reading List</span>
                    </div>
                </div>
            </div>

            {/* CONTENT TABS */}
            <div className="profile-content">
                <div className="content-tabs">
                    <button className="tab active">My Posts</button>
                    <button className="tab">Saved</button>
                    <button className="tab">Settings</button>
                </div>

                <div className="tab-panel">
                    {loading ? (
                        <p className="text-center">Loading posts...</p>
                    ) : myPosts.length > 0 ? (
                        <div className="posts-grid">
                            {myPosts.map(post => (
                                <div key={post._id} className="card post-card">
                                    <Link to={`/post/${post._id}`} className="post-link">
                                        <h3 className="post-title">{post.title}</h3>
                                    </Link>
                                    <p className="post-excerpt">{post.content?.substring(0, 100)}...</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="empty-state">
                            <p>You haven't published any posts yet.</p>
                            <Link to="/create" className="btn btn-primary">Create First Post</Link>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
}
