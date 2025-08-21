import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const cfg = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "demo",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "localhost",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "demo",
  databaseURL:
    process.env.REACT_APP_FIREBASE_DATABASE_URL || "http://localhost",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "demo",
  messagingSenderId:
    process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "123",
};

let app, auth, db;
try {
  app = initializeApp(cfg);
  auth = getAuth(app);
  db = getDatabase(app);
} catch (err) {
  console.warn("Firebase not initialized (demo mode).", err);
  app = {};
  auth = {};
  db = {};
}

export { app, auth, db };
