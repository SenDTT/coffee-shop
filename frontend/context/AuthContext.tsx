"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  username: string;
  role: string;
  profileImage: string;
  subcribedEmail: number;
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  setAuth: (auth: {
    userData: User | null;
    accToken: string | null;
    refToken: string | null;
  }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('auth');
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser(parsed.user);
      setAccessToken(parsed.accessToken);
      setRefreshToken(parsed.refreshToken);
    }
  }, []);

  const setAuth = ({
    userData,
    accToken,
    refToken,
  }: {
    userData: User | null;
    accToken: string | null;
    refToken: string | null;
  }) => {
    setUser(userData);
    setAccessToken(accToken);
    setRefreshToken(refToken);

    if (accToken && userData) {
      localStorage.setItem(
        'auth',
        JSON.stringify({ user: userData, accessToken: accToken, refreshToken: refToken }) // ✅ use direct args
      );
    } else {
      localStorage.removeItem('auth');
    }
  };

  const logout = () => {
    setAuth({ userData: null, accToken: null, refToken: null });
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, refreshToken, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
