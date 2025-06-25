import React from "react";
import ReactDOM from "react-dom";
import userIcon from "../assets/user-icon.png";

export default function ProfileModal({ onClose }) {
  // Placeholder user data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "Curious researcher and avid reader. 📚",
  };

  return ReactDOM.createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content"
        onClick={
          (e) => e.stopPropagation() /* keep clicks inside from closing */
        }
      >
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ×
        </button>
        <div
          style={{
            maxWidth: 600,
            margin: "2rem auto",
            padding: 24,
            border: "1px solid #eee",
            borderRadius: 8,
            textAlign: "center",
          }}
        >
          <img
            src={userIcon}
            alt="User Avatar"
            style={{
              width: 200,
              height: 200,
              borderRadius: "50%",
              marginBottom: 16,
            }}
          />
          <h2>{user.name}</h2>
          <p style={{ color: "#fff" }}>{user.email}</p>
          <p>{user.bio}</p>
        </div>
      </div>
    </div>,
    document.body
  );
}
