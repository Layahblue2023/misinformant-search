// src/App.js
import React, { useState, useEffect } from "react";
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

function App() {
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

  useEffect(() => {
    getClaims().then((data) => {
      // note: our mock returns ids, text, createdAt
      setClaims(data);
    });
  }, []);
  // Resize logic
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      setWindowWidth(w);
      setIsSidebarOpen(w > 800);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow =
      isSidebarOpen && windowWidth <= 800 ? "hidden" : "auto";
  }, [isSidebarOpen, windowWidth]);

  // Close on Escape (mobile)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && isSidebarOpen && windowWidth <= 800) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isSidebarOpen, windowWidth]);

  // New Chat
  const handleNewChat = () => {
    setChatHistory([initialBot]);
    setQueryText("");
    if (windowWidth <= 800) setIsSidebarOpen(false);
  };

  // Send Message + add claim
  const handleSend = () => {
    if (!queryText.trim()) return;
    const now = new Date().toISOString();
    const userMsg = {
      id: Date.now(),
      speaker: "user",
      text: queryText,
    };
    const botMsg = {
      id: Date.now() + 1,
      speaker: "bot",
      text: "Got it—your claim is queued! One moment while we process it…",
    };
    setChatHistory((p) => [...p, userMsg, botMsg]);
    setClaims((p) => [...p, { id: userMsg.id, title: queryText, date: now }]);
    setQueryText("");
  };

  // Predefined Query Click + add claim
  const handleQueryClick = (title) => {
    const now = new Date().toISOString();
    const userMsg = { id: Date.now(), speaker: "user", text: title };
    const botMsg = {
      id: Date.now() + 1,
      speaker: "bot",
      text: "Got it—your claim is queued! One moment while we process it…",
    };
    setChatHistory([initialBot, userMsg, botMsg]);

    setQueryText("");
    if (windowWidth <= 800) setIsSidebarOpen(false);
  };

  // Bottom nav
  const handleGenericSidebarClick = () => {
    if (windowWidth <= 800) setIsSidebarOpen(false);
    // navigate…
  };

  return (
    <div className="App">
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

      {/* Overlay */}
      {windowWidth <= 800 && isSidebarOpen && (
        <div
          className="overlay"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <div
        id="sidebar"
        className={`sideBar ${isSidebarOpen ? "open" : "closed"}`}
      >
        <div className="upperSide">
          <div className="upperSideTop">
            <img src={misinformantLogo} alt="Logo" className="logo" />
            <button type="button" className="midBtn" onClick={handleNewChat}>
              <img src={addBtn} alt="" className="addBtn" />
            </button>
          </div>

          <div className="upperSideBottom">
            {(claims.length === 0
              ? [
                  {
                    id: 1,
                    title: "Does bleach kill COVID-19?",
                    date: "2025-06-12T10:00:00Z",
                  },
                  {
                    id: 2,
                    title: "Who owns Greenland?",
                    date: "2025-05-26T14:30:00Z",
                  },
                ]
              : claims
            ).map((c) => (
              <button
                key={c.id}
                className="query"
                onClick={() => handleQueryClick(c.title)}
              >
                <div className="queryContent">
                  <img src={msgIcon} alt="" />
                  <span>{c.title}</span>
                </div>
                <span className="queryDate">
                  {new Date(c.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="lowerSide">
          <div className="listItems" onClick={handleGenericSidebarClick}>
            <img src={home} alt="" className="listitemImg" /> Home
          </div>
          <div className="listItems" onClick={handleGenericSidebarClick}>
            <img src={saved} alt="" className="listitemImg" /> Saved
          </div>
          <div className="listItems" onClick={handleGenericSidebarClick}>
            <img src={rocket} alt="" className="listitemImg" /> Upgrade to pro
          </div>
        </div>
      </div>

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
                  <h3 className="bot-heading">{msg.title}</h3>
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

export default App;
