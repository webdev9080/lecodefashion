"use client";
import { createContext, useState, useEffect, ReactNode, useContext, useRef } from "react";

export interface IUser {
  _id: string;
  username: string;
  email: string;
  role?: string;
  avatar?: string;
  phone?: string;
  updatedAt?: string; // 🔥 ajoute ça
}

interface IUserContext {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  loading: boolean;
  logout: () => void;
  fetchUser: () => Promise<void>;
}

const UserContext = createContext<IUserContext | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔥 évite les appels multiples
  const fetchingRef = useRef(false);

  const fetchUser = async () => {
    if (fetchingRef.current) return; // bloque les appels multiples
    fetchingRef.current = true;

    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      setLoading(false);
      fetchingRef.current = false;
      return;
    }

    try {
      const res = await fetch("/api/user/me", {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store", // 🔥 évite cache Next.js
      });

      if (!res.ok) throw new Error("Unauthorized");

      const data: IUser = await res.json();

      // 🔥 évite re-render inutile
      setUser(prev => {
        if (JSON.stringify(prev) === JSON.stringify(data)) return prev;
        return data;
      });

    } catch (err) {
      console.error(err);
      setUser(null);
    } finally {
      setLoading(false);
      fetchingRef.current = false;
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <UserContext.Provider value={{ user, setUser, loading, logout, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser doit être utilisé dans un UserProvider");
  return context;
}