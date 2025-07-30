# 🔎 Misinformant Search Website

Welcome to the **Misinformant Website Version**, a responsive web application designed to help users identify and combat misinformation. Built using React, this app provides a user-friendly interface to upload, analyze, and receive feedback on questionable claims.

## 🚀 Overview

- **App.js**: The core of the app. Manages state (claims, chat history, sidebar open/close). Fetches and creates claims.
- **claimsService.js**: Data access layer. Defines functions to retrieve existing claims and submit new ones to the backend.
- **Sidebar.jsx**: User navigation panel. Displays the history of claims newest to oldest.
- **History.jsx**: Message renderer. Iterates through the chat history and displays each message in order, deciding if it is a user vs bot msg.
- **BotMessage.jsx**: Bot response renderer. Converts markdown-formatted verdicts into styled HTML elements within a chat bubble.
- **UserMessage.jsx**: User message renderer. Presents plain text exactly what the user typed.

## 📁 File Structure

```
src/
├─ services/
│  └─ claimsService.js   # Gets mock claims
├─ components/
│  ├─ Sidebar.jsx        # Displays past claims
│  ├─ History.jsx        # Renders chat log
│  ├─ BotMessage.jsx     # Renders bot replies in Markdown
│  └─ UserMessage.jsx    # Renders user messages
└─ App.js                # Main app with chat logic and layout
```

## 🛠️ Run Locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the app:

   ```bash
   npm start
   ```

3. Make sure your backend is running at [http://localhost:3000](http://localhost:3000).

---
