import { useEffect, useState } from "react";
import API_URL, { authHeaders, getToken } from "../api";
import "../styles/Profile.css";

export default function Profile() {
    const [user, setUser] = useState(null);
    const [myPosts, setMyPosts] = useState([]);
    const token = getToken();

    useEffect(() => {
        if (!token) return;

        // Fetch user profile (assuming endpoint exists or we decode token)
        // Since we don't have a specific /me endpoint in the provided snippets, 
        // we might need to rely on what we have or add one.
        // For now, let's assume we can get user details or just show posts.
        // Actually, let's fetch all posts and filter by author (inefficient but works for now) 
        // OR better, let's assume we can get user info from local storage if we saved it, 
        // or we should add a /me endpoint. 
        // Given the constraints, let's try to fetch posts and filter for "my posts" if the backend supports it.
        // Wait, the backend `getAllPosts` populates author. 
        // But we don't have a "get my posts" endpoint.
        // Let's just create a simple placeholder profile for now as per plan.

        // Ideally we would have: fetch(`${API_URL}/users/me`, { headers: authHeaders() })

        // For this task, I'll just show a simple "Welcome" and maybe a list of posts if I can filter them.
        // Let's fetch all posts and filter client side for now (not ideal for prod but ok for this task).

        fetch(`${API_URL}/posts`)
            .then(res => res.json())
            .then(posts => {
                // We need the current user's ID to filter. 
                // We can decode the token if it's JWT, but we don't have a library here.
                // Let's just show a static profile for now or try to get user info.
            });

    }, [token]);

    return (
        <div className="container profile-container">
            <h1>My Profile</h1>
            <p>Welcome back!</p>
            {/* Future: Show user stats, bio, and their posts */}
        </div>
    );
}
