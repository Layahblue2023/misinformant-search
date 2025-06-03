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

function App() {
  // Initial bot message
  const initialBot = {
    id: Date.now(),
    speaker: "bot",
    text: "Welcome to MisInformant! We’re on a mission to combat misinformation and illuminate the truth in a world of noise. Please upload your claim to get started.",
  };

  // State for chat
  const [queryText, setQueryText] = useState("");
  const [claims, setClaims] = useState([]);
  const [chatHistory, setChatHistory] = useState([initialBot]);

  // Sidebar open/closed & track window width
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 800);

  // 1) Handle window resize: update width + auto-open on desktop
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      setWindowWidth(w);
      setIsSidebarOpen(w > 800);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 2) Prevent background scroll when sidebar is open on mobile
  useEffect(() => {
    if (isSidebarOpen && windowWidth <= 800) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isSidebarOpen, windowWidth]);

  // 3) Close sidebar on Escape key (only on mobile)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isSidebarOpen && windowWidth <= 800) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isSidebarOpen, windowWidth]);

  // Start a fresh chat, then close sidebar if on mobile
  const handleNewChat = () => {
    setChatHistory([initialBot]);
    setQueryText("");
    if (windowWidth <= 800) {
      setIsSidebarOpen(false);
    }
  };

  // Send a message + save as a new claim; close sidebar if on mobile
  const handleSend = () => {
    if (!queryText.trim()) return;

    const userMsg = { id: Date.now(), speaker: "user", text: queryText };
    const botMsg = {
      id: Date.now() + 1,
      speaker: "bot",
      text: "Got it—your claim is queued! One moment while we process it…",
    };

    setChatHistory((prev) => [...prev, userMsg, botMsg]);
    setClaims((prev) => [...prev, { id: userMsg.id, text: userMsg.text }]);
    setQueryText("");
  };

  // Click a predefined query—reset chat + close sidebar if on mobile
  const handleQueryClick = (text) => {
    const userMsg = { id: Date.now(), speaker: "user", text };
    const botMsg = {
      id: Date.now() + 1,
      speaker: "bot",
      text: "Got it—your claim is queued! One moment while we process it…",
    };

    setChatHistory([initialBot, userMsg, botMsg]);
    setQueryText("");

    if (windowWidth <= 800) {
      setIsSidebarOpen(false);
    }
  };

  // “Home”, “Saved”, or “Upgrade” items close sidebar on mobile
  const handleGenericSidebarClick = () => {
    if (windowWidth <= 800) {
      setIsSidebarOpen(false);
    }
    // Add any navigation logic here if desired
  };

  return (
    <div className="App">
      {/* Hamburger (only shows on mobile ≤ 800px) */}
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

      {/* Overlay (clicking it closes the sidebar on mobile) */}
      {windowWidth <= 800 && isSidebarOpen && (
        <div
          className="overlay"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar – always present, but “open”/“closed” classes control its transform */}
      <div
        id="sidebar"
        className={`sideBar ${isSidebarOpen ? "open" : "closed"}`}
      >
        <div className="upperSide">
          {/* upperSideTop = logo + “New Claim” */}
          <div className="upperSideTop">
            <img src={misinformantLogo} alt="Logo" className="logo" />

            <button type="button" className="midBtn" onClick={handleNewChat}>
              <img src={addBtn} alt="" className="addBtn" /> New Claim
            </button>
          </div>

          {/* upperSideBottom = previous queries (scrollable) */}
          <div className="upperSideBottom">
            {claims.length === 0 && (
              <>
                <button
                  className="query"
                  onClick={() => handleQueryClick("Does bleach kill COVID-19?")}
                >
                  <img src={msgIcon} alt="" />
                  Does bleach kill COVID-19?
                </button>
                <button
                  className="query"
                  onClick={() => handleQueryClick("Who owns Greenland?")}
                >
                  <img src={msgIcon} alt="" />
                  Who owns Greenland?
                </button>
              </>
            )}
            {claims.map((c) => (
              <button
                key={c.id}
                className="query"
                onClick={() => handleQueryClick(c.text)}
              >
                <img src={msgIcon} alt="" /> {c.text}
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

      {/* Main chat area */}
      <div className="main">
        <div className="chats">
          {chatHistory.map((msg) => (
            <div key={msg.id} className={`chat ${msg.speaker}`}>
              <img
                className="chatImg"
                src={msg.speaker === "bot" ? shield : userIcon}
                alt={msg.speaker}
              />
              <p className="txt">{msg.text}</p>
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
