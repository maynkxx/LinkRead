import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API_URL, { authHeaders, getToken } from "../api";
import "../styles/Profile.css";

export default function Profile() {
    const [profile, setProfile] = useState(null);
    const [myPosts, setMyPosts] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({ bio: "", profilePic: "" });
    const token = getToken();

    useEffect(() => {
        if (!token) {
            window.location.href = "/login";
            return;
        }

        fetchProfile();
        fetchMyPosts();
    }, [token]);

    const fetchProfile = async () => {
        try {
            const res = await fetch(`${API_URL}/users/me`, {
                headers: authHeaders()
            });
            if (res.ok) {
                const data = await res.json();
                setProfile(data);
                setEditData({
                    bio: data.bio || "",
                    profilePic: data.profilePic || ""
                });
            }
        } catch (error) {
            console.error("Failed to fetch profile:", error);
        }
    };

    const fetchMyPosts = async () => {
        try {
            // We'll fetch all posts and filter client-side for simplicity
            // In production, you'd want a dedicated endpoint
            const res = await fetch(`${API_URL}/posts`);
            if (res.ok) {
                const allPosts = await res.json();
                // Filter to only show current user's posts
                if (profile) {
                    const userPosts = allPosts.filter(post => post.author._id === profile._id);
                    setMyPosts(userPosts);
                }
            }
        } catch (error) {
            console.error("Failed to fetch posts:", error);
        }
    };

    const handleUpdateProfile = async () => {
        try {
            const res = await fetch(`${API_URL}/users/profile`, {
                method: "PUT",
                headers: authHeaders(),
                body: JSON.stringify(editData)
            });

            if (res.ok) {
                alert("Profile updated successfully!");
                setIsEditing(false);
                fetchProfile();
            } else {
                const data = await res.json();
                alert(data.message || "Failed to update profile");
            }
        } catch (error) {
            alert("Failed to update profile");
        }
    };

    if (!profile) {
        return <div className="container"><p>Loading...</p></div>;
    }

    return (
        <div className="container profile-container">
            {/* PROFILE HEADER */}
            <div className="profile-header">
                <div className="profile-avatar-section">
                    <img
                        src={profile.profilePic || "https://api.dicebear.com/7.x/avataaars/svg?seed=default"}
                        alt={profile.username}
                        className="profile-avatar"
                    />
                    <div className="profile-info">
                        <h1>{profile.username}</h1>
                        <p className="profile-email">{profile.email}</p>
                    </div>
                </div>

                <button
                    className="btn btn-secondary"
                    onClick={() => setIsEditing(!isEditing)}
                >
                    {isEditing ? "Cancel" : "✏️ Edit Profile"}
                </button>
            </div>

            {/* EDIT PROFILE SECTION */}
            {isEditing && (
                <div className="edit-profile-section">
                    <h3>Edit Profile</h3>
                    <div className="edit-form">
                        <label>Bio</label>
                        <textarea
                            className="textarea"
                            placeholder="Tell us about yourself..."
                            value={editData.bio}
                            onChange={e => setEditData({ ...editData, bio: e.target.value })}
                            maxLength={500}
                        />
                        <small>{editData.bio.length}/500 characters</small>

                        <label>Avatar URL</label>
                        <input
                            className="input"
                            placeholder="https://example.com/avatar.jpg"
                            value={editData.profilePic}
                            onChange={e => setEditData({ ...editData, profilePic: e.target.value })}
                        />

                        <button
                            className="btn btn-primary"
                            onClick={handleUpdateProfile}
                        >
                            💾 Save Changes
                        </button>
                    </div>
                </div>
            )}

            {/* BIO SECTION */}
            {!isEditing && profile.bio && (
                <div className="bio-section">
                    <h3>About</h3>
                    <p>{profile.bio}</p>
                </div>
            )}

            {/* STATS SECTION */}
            <div className="stats-section">
                <div className="stat-card">
                    <div className="stat-icon">📝</div>
                    <div className="stat-info">
                        <h2>{profile.stats?.totalPosts || 0}</h2>
                        <p>Posts Published</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">👍</div>
                    <div className="stat-info">
                        <h2>{profile.stats?.totalUpvotes || 0}</h2>
                        <p>Total Upvotes</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">🔥</div>
                    <div className="stat-info">
                        <h2>{profile.stats?.streak || 0}</h2>
                        <p>Day Streak</p>
                    </div>
                </div>
            </div>

            {/* MY POSTS SECTION */}
            <div className="my-posts-section">
                <h2>My Posts</h2>
                {myPosts.length === 0 ? (
                    <div className="empty-state">
                        <p>You haven't published any posts yet.</p>
                        <Link to="/create" className="btn btn-primary">
                            Create Your First Post
                        </Link>
                    </div>
                ) : (
                    <div className="posts-grid">
                        {myPosts.map(post => (
                            <Link to={`/post/${post._id}`} key={post._id} className="post-card-link">
                                <div className="post-card-profile">
                                    <h3>{post.title}</h3>
                                    <div className="post-meta">
                                        <span>👍 {post.upvotes?.length || 0} upvotes</span>
                                        <span>📅 {new Date(post.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    {post.tags && post.tags.length > 0 && (
                                        <div className="post-tags-profile">
                                            {post.tags.slice(0, 3).map(tag => (
                                                <span key={tag} className="tag-chip-small">#{tag}</span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
