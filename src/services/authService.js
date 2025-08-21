// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   sendPasswordResetEmail,
//   signOut,
//   updateProfile,
//   onAuthStateChanged,
//   getIdToken,
// } from "firebase/auth";
// import { ref, set, serverTimestamp, get, child } from "firebase/database";
// import { auth, db } from "./firebase";

// export const authService = {
//   // Sign in with email/password
//   login: async ({ email, password }) => {
//     const cred = await signInWithEmailAndPassword(auth, email, password);
//     return {
//       uid: cred.user.uid,
//       email: cred.user.email,
//       displayName: cred.user.displayName || null,
//     };
//   },

//   // Create account & seed profile in RTDB
//   register: async ({ name, email, password }) => {
//     const cred = await createUserWithEmailAndPassword(auth, email, password);
//     if (name) await updateProfile(cred.user, { displayName: name });

//     const uid = cred.user.uid;
//     await set(ref(db, `users/${uid}`), {
//       displayName: name || "",
//       email,
//       createdAt: serverTimestamp(),
//     });

//     return { uid, email, displayName: name || null };
//   },

//   // Fire-and-forget reset email
//   requestPasswordReset: async ({ email }) => {
//     await sendPasswordResetEmail(auth, email);
//     return { ok: true };
//   },

//   // Not used with Firebase's email link flow; keep for API parity
//   resetPassword: async () => {
//     throw new Error("Reset via email link.");
//   },

//   // Current user snapshot with profile hydrate from RTDB (optional)
//   me: async () => {
//     const u = auth.currentUser;
//     if (!u) return null;

//     let profile = { displayName: u.displayName, email: u.email, uid: u.uid };
//     try {
//       const snap = await get(child(ref(db), `users/${u.uid}`));
//       if (snap.exists()) profile = { ...profile, ...snap.val() };
//     } catch (_) {}
//     return profile;
//   },

//   // Sign out
//   logout: async () => {
//     await signOut(auth);
//     return { ok: true };
//   },

//   // Subscribe to auth state
//   subscribe: (cb) => onAuthStateChanged(auth, cb),

//   // Optional: get Firebase ID token for backend calls
//   getToken: () =>
//     auth.currentUser ? getIdToken(auth.currentUser, true) : null,
// };

export const authService = {
  login: async () => ({ uid: "demo", email: "demo@test.com" }),
  register: async () => ({ uid: "demo", email: "demo@test.com" }),
  requestPasswordReset: async () => ({ ok: true }),
  resetPassword: async () => ({ ok: true }),
  me: async () => ({ uid: "demo", email: "demo@test.com" }),
  logout: async () => ({ ok: true }),
  subscribe: (cb) => {
    cb(null);
    return () => {};
  },
  getToken: () => null,
};
