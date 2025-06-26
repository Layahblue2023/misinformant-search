import React from "react";
import ReactDOM from "react-dom";
import userIcon from "../assets/user-icon.png";

export default function ProfileModal({ onClose }) {
  // Placeholder user data
  const user = {
    name: "John Doe",
    email: "j.doe@example.com",
    phone: "+44 12345678",
    bio: "Curious researcher and avid reader.📚",
  };

  // Inline styles
  const backdropStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2000,
  };

  const modalStyle = {
    backgroundColor: "rgba(28, 30, 58, 1)",
    borderRadius: 8,
    width: "600px",
    maxWidth: "95%",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    overflow: "hidden",
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 24px",
    borderBottom: "1px solid #eee",
  };

  const titleStyle = {
    margin: 0,
    fontSize: "1.25rem",
    fontWeight: 600,
  };

  const closeBtnStyle = {
    background: "transparent",
    border: "none",
    fontSize: "1.5rem",
    cursor: "pointer",
    lineHeight: 1,
  };

  const bodyStyle = {
    display: "flex",
    padding: "24px",
    gap: "24px",
  };

  const avatarContainerStyle = {
    textAlign: "center",
    flexShrink: 0,
  };

  const avatarStyle = {
    width: 120,
    height: 120,
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: 12,
  };

  const editBtnStyle = {
    padding: "6px 12px",
    fontSize: "0.875rem",
    borderRadius: 4,
    border: "1px solid #ccc",
    backgroundColor: "#f9f9f9",
    cursor: "pointer",
  };

  const formStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  };

  const fieldStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  };

  const labelStyle = {
    fontSize: "0.875rem",
    fontWeight: 500,
    color: "#fff",
  };

  const inputStyle = {
    padding: "8px 12px",
    fontSize: "1rem",
    borderRadius: 4,
    border: "1px solid #ccc",
    outline: "none",
  };

  const actionsStyle = {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    marginTop: "12px",
  };

  const closeStyle = {
    padding: "8px 16px",
    fontSize: "0.875rem",
    borderRadius: 4,
    border: "1px solid #888",
    backgroundColor: "#fff",
    cursor: "pointer",
  };

  const saveStyle = {
    padding: "8px 16px",
    fontSize: "0.875rem",
    borderRadius: 4,
    border: "none",
    backgroundColor: "#4f46e5",
    color: "#fff",
    cursor: "pointer",
  };

  return ReactDOM.createPortal(
    <div style={backdropStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <div style={headerStyle}>
          <h2 style={titleStyle}>My profile</h2>
          <button style={closeBtnStyle} onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <div style={bodyStyle}>
          <div style={avatarContainerStyle}>
            <img src={userIcon} alt="User Avatar" style={avatarStyle} />
            <button style={editBtnStyle}>Edit</button>
          </div>
          <form style={formStyle} onSubmit={(e) => e.preventDefault()}>
            <div style={fieldStyle}>
              <label style={labelStyle}>Name</label>
              <input type="text" defaultValue={user.name} style={inputStyle} />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Email</label>
              <input
                type="email"
                defaultValue={user.email}
                style={inputStyle}
              />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Phone number (Main)</label>
              <input type="tel" defaultValue={user.phone} style={inputStyle} />
            </div>
            <div style={actionsStyle}>
              <button type="button" style={closeStyle} onClick={onClose}>
                Close
              </button>
              <button type="submit" style={saveStyle}>
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>,
    document.body
  );
}
