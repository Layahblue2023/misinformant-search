// src/App.js
import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import axios from "axios";

import "./App.css";
import "./auth.css";
import "./profile.css";

// Existing app pieces (keep your current paths)
import { getClaims } from "./services/claimServices";
import Sidebar from "./components/Sidebar";
import History from "./components/chat/History";
import Input from "./components/chat/Input";
import ProfileModal from "./components/ProfileModal";
import userIcon from "./assets/user-icon.png";

// Auth context + routes
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";

// Auth pages located directly under src/pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

// -------------------------
// Home (existing chat UI)
// -------------------------
function Home() {
  const initialBot = {
    id: Date.now(),
    speaker: "bot",
    markdown: `## Welcome to MisInformant!\n\n*Want to know the truth?*`,
  };

  const [claims, setClaims] = useState([]);
  const [chatHistory, setChatHistory] = useState([initialBot]);
  const [queryText, setQueryText] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 800);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    getClaims().then((data) => setClaims(data));
  }, []);

  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      setWindowWidth(w);
      setIsSidebarOpen(w > 800);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow =
      isSidebarOpen && windowWidth <= 800 ? "hidden" : "auto";
  }, [isSidebarOpen, windowWidth]);

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

  const handleNewChat = () => {
    setChatHistory([initialBot]);
    setQueryText("");
    if (windowWidth <= 800) setIsSidebarOpen(false);
  };

  const handleSend = () => {
    if (!queryText.trim()) return;

    const now = new Date().toISOString();
    const userMsg = {
      id: Date.now(),
      speaker: "user",
      text: queryText,
    };

    setChatHistory((prev) => [...prev, userMsg]);

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
      .catch(() => {
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

  const closeSidebarOnMobile = () => {
    if (windowWidth <= 800) setIsSidebarOpen(false);
  };

  return (
    <div className="App">
      {/* Profile */}
      <button
        className="profile-avatar-button"
        onClick={() => setShowProfile(true)}
        aria-label="Your profile"
      >
        <img src={userIcon} alt="Profile" className="profile-avatar" />
      </button>

      {/* Mobile hamburger + overlay */}
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

      {/* Main */}
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

// ---------------------------------
// App with Router + AuthProvider
// ---------------------------------
export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Default route → login */}
          <Route path="/" element={<Login />} />

          {/* Auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Protect Home (chat) behind login if you want */}
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
