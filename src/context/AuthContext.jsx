import React, { createContext, useContext, useEffect, useState } from "react";
import { authService } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [bootstrapping, setBootstrapping] = useState(true);

  useEffect(() => {
    const unsub = authService.subscribe(async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setBootstrapping(false);
        return;
      }
      const u = await authService.me();
      setUser(u);
      setBootstrapping(false);
    });
    return () => unsub();
  }, []);

  const login = async (creds) => {
    await authService.login(creds);
    const u = await authService.me();
    setUser(u);
  };

  const register = async (payload) => {
    await authService.register(payload);
    const u = await authService.me();
    setUser(u);
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, bootstrapping, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
