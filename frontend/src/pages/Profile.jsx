// src/pages/Profile.jsx
import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // TODO: fetch user profile from API
    setUser({ username: 'JohnDoe', email: 'john@example.com' });
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="page profile-page">
      <h1>My Profile</h1>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      {/* Additional profile details */}
    </div>
  );
};

export default Profile;
