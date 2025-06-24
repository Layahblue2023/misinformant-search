import React from "react";

const Profile = () => {
  // Placeholder user data
  const user = {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    bio: "Curious researcher and avid reader.",
    avatar: "https://www.gravatar.com/avatar/?d=mp",
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "2rem auto",
        padding: 24,
        border: "1px solid #eee",
        borderRadius: 8,
      }}
    >
      <img
        src={user.avatar}
        alt="User Avatar"
        style={{
          width: 100,
          height: 100,
          borderRadius: "50%",
          marginBottom: 16,
        }}
      />
      <h2>{user.name}</h2>
      <p style={{ color: "#555" }}>{user.email}</p>
      <p>{user.bio}</p>
    </div>
  );
};

export default Profile;
