// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";

import misinformantLogo from "./assets/Misinformant.svg";
import addBtn from "./assets/add-30.png";
import msgIcon from "./assets/message.svg";
import home from "./assets/home.svg";
import saved from "./assets/bookmark.svg";
import rocket from "./assets/rocket.svg";
import sendBtn from "./assets/send.svg";
import userIcon from "./assets/user-icon.png";
import shield from "./assets/logoShield.png";

import { getClaims } from "./services/claimServices";
import Profile from "./profile";

// ——— Sidebar component —————————————————————————————————————————
function Sidebar({ isOpen, claims, onNewChat, onQueryClick, onNavClick }) {
  const navigate = useNavigate();

  const defaultQueries = [
    {
      id: 1,
      title: "Does bleach kill COVID-19?",
      date: "2025-06-12T10:00:00Z",
    },
    { id: 2, title: "Who owns Greenland?", date: "2025-05-26T14:30:00Z" },
  ];
  const items = claims.length ? claims : defaultQueries;

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
          {items.map((c) => (
            <button
              key={c.id}
              className="sidebar__query"
              onClick={() => onQueryClick(c.title)}
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
        {/* Profile removed here; avatar now top-right */}
      </footer>
    </aside>
  );
}

// ——— Main chat + floating avatar ——————————————————————————————————
function AppContent() {
  const navigate = useNavigate();

  // Initial bot message
  const initialBot = {
    id: Date.now(),
    speaker: "bot",
    title: "Welcome to MisInformant!",
    text: " We’re on a mission to combat misinformation and illuminate the truth in a world of noise. Please upload your claim to get started.",
  };

  // State
  const [queryText, setQueryText] = useState("");
  const [claims, setClaims] = useState([]);
  const [chatHistory, setChatHistory] = useState([initialBot]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 800);

  // Fetch initial claims
  useEffect(() => {
    getClaims().then((data) => setClaims(data));
  }, []);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      setWindowWidth(w);
      setIsSidebarOpen(w > 800);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when mobile sidebar open
  useEffect(() => {
    document.body.style.overflow =
      isSidebarOpen && windowWidth <= 800 ? "hidden" : "auto";
  }, [isSidebarOpen, windowWidth]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && isSidebarOpen && windowWidth <= 800) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isSidebarOpen, windowWidth]);

  // Handlers
  const handleNewChat = () => {
    setChatHistory([initialBot]);
    setQueryText("");
    if (windowWidth <= 800) setIsSidebarOpen(false);
  };

  const handleSend = () => {
    if (!queryText.trim()) return;
    const now = new Date().toISOString();
    const userMsg = { id: Date.now(), speaker: "user", text: queryText };
    const botMsg = {
      id: Date.now() + 1,
      speaker: "bot",
      text: "Got it—your claim is queued! One moment while we process it…",
    };
    setChatHistory((p) => [...p, userMsg, botMsg]);
    setClaims((p) => [...p, { id: userMsg.id, title: queryText, date: now }]);
    setQueryText("");
  };

  const handleQueryClick = (title) => {
    const now = new Date().toISOString();
    const userMsg = { id: Date.now(), speaker: "user", text: title };
    const botMsg = {
      id: Date.now() + 1,
      speaker: "bot",
      text: "Got it—your claim is queued! One moment while we process it…",
    };
    setChatHistory([initialBot, userMsg, botMsg]);
    setClaims((p) => [...p, { id: userMsg.id, title, date: now }]);
    setQueryText("");
    if (windowWidth <= 800) setIsSidebarOpen(false);
  };

  const handleGenericSidebarClick = () => {
    if (windowWidth <= 800) setIsSidebarOpen(false);
  };

  return (
    <div className="App">
      {/* floating profile avatar */}
      <button
        className="profile-avatar-button"
        onClick={() => navigate("/profile")}
        aria-label="Your profile"
      >
        <img src={userIcon} alt="Profile" className="profile-avatar" />
      </button>

      {/* Hamburger */}
      {windowWidth <= 800 && (
        <button
          className="hamburger"
          aria-label="Toggle menu"
          aria-expanded={isSidebarOpen}
          aria-controls="sidebar"
          onClick={() => setIsSidebarOpen((o) => !o)}
        >
          ☰
        </button>
      )}
      {windowWidth <= 800 && isSidebarOpen && (
        <div
          className="overlay"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        claims={claims}
        onNewChat={handleNewChat}
        onQueryClick={handleQueryClick}
        onNavClick={handleGenericSidebarClick}
      />

      {/* Main chat */}
      <div className="main">
        <div className="chats">
          {chatHistory.map((msg) => (
            <div key={msg.id} className={`chat ${msg.speaker}`}>
              <img
                className="chatImg"
                src={msg.speaker === "bot" ? shield : userIcon}
                alt={msg.speaker}
              />
              <div className="message-content">
                {msg.speaker === "bot" && msg.title && (
                  <h3 className="txt">{msg.title}</h3>
                )}
                <p className="txt">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="chatFooter">
          <div className="inp">
            <input
              type="text"
              placeholder="Send Message"
              value={queryText}
              onChange={(e) => setQueryText(e.target.value)}
            />
            <button className="send" onClick={handleSend}>
              <img src={sendBtn} alt="Send" />
            </button>
          </div>
        </div>

        <p>MisInformant may produce incorrect information</p>
      </div>
    </div>
  );
}

// ——— App root with routing ——————————————————————————————————————
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppContent />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}
