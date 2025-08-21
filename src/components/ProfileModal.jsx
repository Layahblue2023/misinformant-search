import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import userIcon from "../assets/user-icon.png";
import { useAuth } from "../context/AuthContext"; // ⬅️ import auth hook

export default function ProfileModal({ onClose }) {
  const dialogRef = useRef(null);
  const firstFieldRef = useRef(null);
  const { logout } = useAuth(); // ⬅️ access logout

  // Placeholder user data
  const user = {
    name: "John Doe",
    email: "j.doe@example.com",
    phone: "+44 12345678",
    bio: "Curious researcher and avid reader.📚",
  };

  // Focus management + ESC to close
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstFieldRef.current?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const stop = (e) => e.stopPropagation();

  const handleLogout = () => {
    logout();
    onClose(); // close modal after logging out
  };

  return ReactDOM.createPortal(
    <div className="modal" onClick={onClose} aria-hidden="false">
      <div
        className="modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="profile-title"
        onClick={stop}
        ref={dialogRef}
      >
        <header className="modal__header">
          <h2 id="profile-title" className="modal__title">
            My profile
          </h2>
          <button className="modal__close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </header>

        <div className="modal__body">
          <aside className="profile__aside">
            <img className="profile__avatar" src={userIcon} alt="User avatar" />
            <button type="button" className="profile__avatar-btn">
              Change photo
            </button>
          </aside>

          <form className="profile__form" onSubmit={(e) => e.preventDefault()}>
            <div className="profile__field">
              <label className="profile__label" htmlFor="pf-name">
                Name
              </label>
              <input
                id="pf-name"
                className="profile__input"
                type="text"
                defaultValue={user.name}
                ref={firstFieldRef}
              />
            </div>

            <div className="profile__field">
              <label className="profile__label" htmlFor="pf-email">
                Email
              </label>
              <input
                id="pf-email"
                className="profile__input"
                type="email"
                defaultValue={user.email}
              />
            </div>

            <div className="profile__field">
              <label className="profile__label" htmlFor="pf-phone">
                Phone number (Main)
              </label>
              <input
                id="pf-phone"
                className="profile__input"
                type="tel"
                defaultValue={user.phone}
              />
            </div>

            <div className="profile__actions">
              <button
                type="button"
                className="btn btn--danger"
                onClick={handleLogout}
              >
                Log out
              </button>
              <button type="submit" className="btn btn--primary">
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
