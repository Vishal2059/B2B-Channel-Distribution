"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { api } from "@/lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { _id, name, email, role }
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Page refresh par saved login wapas lao
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const saved = localStorage.getItem("auth");
    if (saved) {
      const parsed = JSON.parse(saved);
      setUser(parsed.user);
      setToken(parsed.token);
    }
    setLoading(false);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  const save = (data) => {
    const { token, ...user } = data; // backend: _id, name, email, role, token
    setUser(user);
    setToken(token);
    localStorage.setItem("auth", JSON.stringify({ user, token }));
  };

  const login = async (email, password) => {
    save(await api("/api/auth/login", { method: "POST", body: { email, password } }));
  };

  const signup = async (form) => {
    // form = { name, email, password, role }
    save(await api("/api/auth/signup", { method: "POST", body: form }));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);