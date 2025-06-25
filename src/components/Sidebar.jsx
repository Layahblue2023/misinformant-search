// src/components/Sidebar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

import misinformantLogo from "../assets/Misinformant.svg";
import msgIcon from "../assets/message.svg";
import home from "../assets/home.svg";
import saved from "../assets/bookmark.svg";
import rocket from "../assets/rocket.svg";

export default function Sidebar({
  isOpen,
  claims,
  onNewChat,
  onQueryClick,
  onNavClick,
}) {
  const navigate = useNavigate();

  const defaultQueries = [
    {
      id: 1,
      title: "Does bleach kill COVID-19?",
      date: "2025-06-12T10:00:00Z",
    },
    { id: 2, title: "Who owns Greenland?", date: "2025-05-26T14:30:00Z" },
  ];

  // choose either fetched claims or defaults
  const items = claims.length ? claims : defaultQueries;

  // sort descending by date (newest first)
  const sortedItems = [...items].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const handleNav = (path) => {
    navigate(path);
    onNavClick();
  };

  return (
    <aside
      id="sidebar"
      className={`sidebar ${isOpen ? "sidebar--open" : ""}`}
      role="complementary"
    >
      <div className="sidebar__content">
        <header className="sidebar__header">
          <img
            src={misinformantLogo}
            alt="MisInformant logo"
            className="sidebar__logo"
          />
          <button
            type="button"
            className="midBtn"
            onClick={onNewChat}
            aria-label="Start a new chat"
          >
            <img src={msgIcon} alt="" />
            <span>New chat</span>
          </button>
        </header>

        <nav className="sidebar__queries" aria-label="Previous queries">
          {sortedItems.map((c) => (
            <button
              key={c.id}
              className="sidebar__query"
              onClick={() => onQueryClick(c)}
            >
              <div className="sidebar__query-content">
                <span>{c.title}</span>
              </div>
              <time className="sidebar__query-date" dateTime={c.date}>
                {new Date(c.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            </button>
          ))}
        </nav>
      </div>

      <footer className="sidebar__footer">
        <button
          type="button"
          className="sidebar__nav-item"
          onClick={() => handleNav("/")}
        >
          <img src={home} alt="" />
          <span>Home</span>
        </button>
        <button
          type="button"
          className="sidebar__nav-item"
          onClick={() => handleNav("/saved")}
        >
          <img src={saved} alt="" />
          <span>Saved</span>
        </button>
        <button
          type="button"
          className="sidebar__nav-item"
          onClick={() => handleNav("/upgrade")}
        >
          <img src={rocket} alt="" />
          <span>Upgrade to Pro</span>
        </button>
      </footer>
    </aside>
  );
}
