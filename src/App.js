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

  // ========================
  // **App State Management**
  // 1. Stores the list of fetched mock claims from src/services/claimServices.js
  // 2. Tracks the full conversation between the user and bot
  // 3. Stores the current user input in the chat text field
  // 4. Keeps track of the current window width
  // 5. Controls whether the sidebar is visible
  // 6. Controls whether the user profile modal is visible
  // ========================
  const [claims, setClaims] = useState([]);
  const [chatHistory, setChatHistory] = useState([initialBot]);
  const [queryText, setQueryText] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 800);
  const [showProfile, setShowProfile] = useState(false);

  // ========================
  // **useEffects**
  // ========================
  useEffect(() => {
    getClaims().then((data) => setClaims(data));
  }, []);

  // auto‐open/close sidebar
  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      setWindowWidth(w);
      setIsSidebarOpen(w > 800);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // disable sidebar scroll on mobile
  useEffect(() => {
    document.body.style.overflow =
      isSidebarOpen && windowWidth <= 800 ? "hidden" : "auto";
  }, [isSidebarOpen, windowWidth]);

  // close sidebar or modal on Escape
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

  // ========================
  // **UI Handlers: user actions (clicking, typing, closing)**
  // ========================

  // Starts a new chat session.
  const handleNewChat = () => {
    setChatHistory([initialBot]);
    setQueryText("");
    if (windowWidth <= 800) setIsSidebarOpen(false);
  };

  // Sends user query to backend and displays bot response
  const handleSend = () => {
    if (!queryText.trim()) return;

    const now = new Date().toISOString();
    const userMsg = {
      id: Date.now(),
      speaker: "user",
      text: queryText,
    };

    // Add user's message to chat history immediately
    setChatHistory((prev) => [...prev, userMsg]);

    // Wally's backend call to create a claim
    axios
      .post(
        "http://127.0.0.1:5000/createClaim",
        { claim: queryText },
        { timeout: 60000 }
      )
      .then((res) => {
        const botMsg = {
          id: Date.now() + 1,
          speaker: "bot",
          markdown: res.data.response || "✅ Claim received!",
        };

        setChatHistory((prev) => [...prev, botMsg]);

        setClaims((prev) => [
          ...prev,
          { id: userMsg.id, title: queryText, date: now },
        ]);
      })
      .catch((err) => {
        console.error(err);
        const botMsg = {
          id: Date.now() + 1,
          speaker: "bot",
          markdown: "⚠️ Sorry, something went wrong.",
        };
        setChatHistory((prev) => [...prev, botMsg]);
      })
      .finally(() => {
        setQueryText("");
      });
  };

  // Handles clicking on a previous query in the sidebar
  const handleQueryClick = (claim) => {
    const userMsg = {
      id: claim.id,
      speaker: "user",
      text: claim.title,
    };
    const botMsg = {
      id: claim.id + 1,
      speaker: "bot",
      markdown: claim.markdown,
    };
    setChatHistory([initialBot, userMsg, botMsg]);
    setQueryText("");
    if (windowWidth <= 800) setIsSidebarOpen(false);
  };

  // Closes sidebar on mobile
  const closeSidebarOnMobile = () => {
    if (windowWidth <= 800) setIsSidebarOpen(false);
  };

  // ========================
  //  **UI Rendering**
  // ========================
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

      {/* Hamburger menu & Overlay for mobile */}
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

// ========================================
//  **App Component with Router**
// ========================================
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppContent />} />
      </Routes>
    </BrowserRouter>
  );
}
