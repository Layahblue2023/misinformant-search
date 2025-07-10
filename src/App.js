// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

import "./App.css";
import { getClaims } from "./services/claimServices";

import Sidebar from "./components/Sidebar";
import History from "./components/chat/History";
import Input from "./components/chat/Input";
import ProfileModal from "./components/ProfileModal";

import userIcon from "./assets/user-icon.png";

function AppContent() {
  // Initial bot message, now using markdown
  const initialBot = {
    id: Date.now(),
    speaker: "bot",
    markdown: `
## Welcome to MisInformant!

*Want to know the truth?*`,
  };

  // State
  const [claims, setClaims] = useState([]);
  const [chatHistory, setChatHistory] = useState([initialBot]);
  const [queryText, setQueryText] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 800);
  const [showProfile, setShowProfile] = useState(false);

  // Load mockClaims (with markdown) from claimServices
  useEffect(() => {
    getClaims().then((data) => setClaims(data));
  }, []);

  // Handle window resize → auto‐open/close sidebar
  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      setWindowWidth(w);
      setIsSidebarOpen(w > 800);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    document.body.style.overflow =
      isSidebarOpen && windowWidth <= 800 ? "hidden" : "auto";
  }, [isSidebarOpen, windowWidth]);

  // Close sidebar or modal on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        if (isSidebarOpen && windowWidth <= 800) setIsSidebarOpen(false);
        if (showProfile) setShowProfile(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isSidebarOpen, showProfile, windowWidth]);

  // Start a new chat (reset to initial message)
  const handleNewChat = () => {
    setChatHistory([initialBot]);
    setQueryText("");
    if (windowWidth <= 800) setIsSidebarOpen(false);
  };

  // Send a user message and (optionally) call API
  const handleSend = () => {
    if (!queryText.trim()) return;

    const userMsg = {
      id: Date.now(),
      speaker: "user",
      text: queryText,
    };
    setChatHistory((prev) => [...prev, userMsg]);

    // Example stubbed response — replace with axios.post when ready
    const fakeBotReply = {
      id: Date.now() + 1,
      speaker: "bot",
      markdown: `
### Echo

You said: "${queryText}"

- This is a mock reply.
- Replace with \`res.data.markdown\` from your API.
`,
    };
    setTimeout(() => {
      setChatHistory((prev) => [...prev, fakeBotReply]);
      setQueryText("");
    }, 500);
  };

  // User clicks a past claim in the sidebar
  const handleQueryClick = (claim) => {
    const userMsg = {
      id: claim.id,
      speaker: "user",
      text: claim.title,
    };
    const botMsg = {
      id: claim.id + 1,
      speaker: "bot",
      markdown: claim.markdown, // use markdown from mockClaims
    };
    setChatHistory([initialBot, userMsg, botMsg]);
    setQueryText("");
    if (windowWidth <= 800) setIsSidebarOpen(false);
  };

  // Close sidebar on mobile after nav
  const closeSidebarOnMobile = () => {
    if (windowWidth <= 800) setIsSidebarOpen(false);
  };

  return (
    <div className="App">
      {/* Profile Avatar */}
      <button
        className="profile-avatar-button"
        onClick={() => setShowProfile(true)}
        aria-label="Your profile"
      >
        <img src={userIcon} alt="Profile" className="profile-avatar" />
      </button>

      {/* Hamburger & Overlay for mobile */}
      {windowWidth <= 800 && (
        <>
          <button
            className="hamburger"
            onClick={() => setIsSidebarOpen((o) => !o)}
            aria-label="Toggle sidebar"
          >
            ☰
          </button>
          {isSidebarOpen && (
            <div
              className="overlay"
              onClick={() => setIsSidebarOpen(false)}
              aria-hidden="true"
            />
          )}
        </>
      )}

      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        claims={claims}
        onNewChat={handleNewChat}
        onQueryClick={handleQueryClick}
        onNavClick={closeSidebarOnMobile}
      />

      {/* Main Chat Area */}
      <main className="main">
        <History messages={chatHistory} />
        <Input
          value={queryText}
          onChange={(e) => setQueryText(e.target.value)}
          onSend={handleSend}
        />
        <p className="disclaimer">
          MisInformant may produce incorrect information
        </p>
        {showProfile && <ProfileModal onClose={() => setShowProfile(false)} />}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppContent />} />
      </Routes>
    </BrowserRouter>
  );
}
