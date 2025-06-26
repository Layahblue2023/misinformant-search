import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import axios from "axios";
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
import Sidebar from "./components/Sidebar";
import ProfileModal from "./components/ProfileModal";

// ——— Main chat + floating avatar ——————————————————————————————————
function AppContent() {
  // Initial bot message
  const initialBot = {
    id: Date.now(),
    speaker: "bot",
    title: "Welcome to MisInformant!",
    text: "Want to know the truth?",
  };

  // State
  const [queryText, setQueryText] = useState("");
  const [claims, setClaims] = useState([]);
  const [chatHistory, setChatHistory] = useState([initialBot]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 800);
  const [showProfile, setShowProfile] = useState(false);

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
      if (e.key === "Escape") {
        if (isSidebarOpen && windowWidth <= 800) setIsSidebarOpen(false);
        if (showProfile) setShowProfile(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isSidebarOpen, showProfile, windowWidth]);

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

    // Show the user's text immediately
    setChatHistory((prev) => [...prev, userMsg]);

    axios
      .post(
        "http://127.0.0.1:5000/createClaim", // include the scheme!
        { claim: queryText },
        { timeout: 60_000 }
      )
      .then((res) => {
        console.log(res);
        // Whatever the API returns — adjust the path to suit your payload
        const botMsg = {
          id: Date.now() + 1,
          speaker: "bot",
          text: res.data.response, // e.g. { "message": "Claim queued!" }
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
          text: "Okay, let's tackle this. The user wants me to explain why the claim that 9/11 was faked is refuted, based on the given evidence. The key here is to look at the evidence sentences and their entailment scores. First, looking at the evidence, most of the sentences are labeled as contradictions with very high confidence (like 100%). These include things like 'Paper is made from wood pulp' and 'Fossil fuels are the main cause of climate change.' But how do these relate to the 9/11 claim? Wait, maybe the evidence provided is actually unrelated. The initial claim is about 9/11 being faked, but the evidence given seems to be about completely different topics like paper production, fossil fuels, and the Eiffel Tower. That's confusing. The only sentence that's an entailment is 'Airplanes fly by generating lift through their wings.'' That's a general fact, but does it relate to 9/11? Maybe the idea is that if airplanes actually work as described, then the planes used in 9/11 could have been real. But the other evidence is all contradictions. However, the contradictions here are about unrelated topics. For example, Fossil fuel combustion is inefficient being a contradiction doesn't directly address 9/11. Wait, perhaps the system used a model that's supposed to check for contradictions but the evidence provided here is not relevant. The user might be pointing out that the evidence is weak or contradictory. The task says if the evidence is weak or contradictory, say so. The evidence here seems to be unrelated, so the conclusion that the claim is refuted might be based on incorrect or irrelevant evidence. Therefore, the explanation should note that the evidence doesn't directly address the 9/11 claim and is therefore weak or contradictory. So, the answer should state that the evidence provided doesn't support the refutation of the 9/11 claim, as the sentences are about unrelated topics. The strongest evidence isn't actually related, so the conclusion might be based on flawed reasoning. </think> The claim that 9/11 was faked is refuted because the evidence provided consists of well-established scientific and factual statements and unrelated contradictions none of which directly address the authenticity of 9/11 events. The strongest supporting sentence is Airplanes fly by generating lift through their wings, as it confirms the plausibility of real aircraft being involved. However, the evidence is weak and largely irrelevant to the claim, making the refutation unconvincing.['Airplanes fly by generating lift through their wings.', 'Paper is made from wood pulp.', 'Oil and coal are nonrenewable resources.', 'Fossil fuel combustion is inefficient.', 'Some countries run on 100% renewable energy.', 'Fossil fuel plants release sulfur and nitrogen oxides.', 'Fossil fuels are the main cause of climate change.', 'Nuclear energy produces hazardous waste.', 'Nuclear energy is low-emission but not renewable.', 'The Eiffel Tower is located in Paris.",
        };
        setChatHistory((prev) => [...prev, botMsg]);
      })
      .finally(() => setQueryText(""));
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
      text: "Got it—your claim is queued! One moment while we process it…",
    };
    setChatHistory([initialBot, userMsg, botMsg]);
    setQueryText("");
    if (windowWidth <= 800) setIsSidebarOpen(false);
  };

  const handleGenericSidebarClick = () => {
    if (windowWidth <= 800) setIsSidebarOpen(false);
  };

  const openProfile = () => setShowProfile(true);
  const closeProfile = () => setShowProfile(false);

  return (
    <div className="App">
      {/* floating profile avatar */}
      <button
        className="profile-avatar-button"
        onClick={openProfile}
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
        onNavClick={handleGenericSidebarClick}
        onQueryClick={handleQueryClick}
      />

      {/* Main chat */}
      <div className="main">
        <div className="chats">
          {chatHistory.map((msg) => (
            <div key={msg.id} className={`chat ${msg.speaker}`}>
              <div className="message-content">
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

        {showProfile && <ProfileModal onClose={closeProfile}></ProfileModal>}
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
      </Routes>
    </BrowserRouter>
  );
}
