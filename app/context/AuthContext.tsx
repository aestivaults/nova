"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { User } from "../types/user";
import { api } from "../utils/api";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../lib/clientFunctions";

const url = process.env.NEXT_PUBLIC_API_URL as string;

type register = {
  name: string;
  username: string;
  email: string;
  password: string;
};

type login = {
  email: string;
  password: string;
};

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  register: ({
    name,
    username,
    email,
    password,
  }: register) => Promise<{ error: string; data: User }>;
  login: ({ email, password }: login) => Promise<{ error: string; data: User }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// ---------- COMPONENT ----------

export default function AuthProvider({
  children,
  serverUser,
}: {
  children: ReactNode;
  serverUser: User | null;
}) {
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = !!user;

  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    enabled: !!serverUser,
  });

  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [userData]);

  const login = async ({ email, password }: login) => {
    try {
      const res = await fetch(`${url}/auth/login`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      const response = await res.json();
      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem("token", response.token);
        setUser(response.data);
      }

      const error = !res.ok ? response.message : null;
      const data = response.data;

      return { data, error };
    } catch (error) {
      const errMessage =
        error instanceof Error ? error.message : "failed to register user";
      throw new Error(errMessage);
    }
  };

  const register = async ({ name, username, email, password }: register) => {
    try {
      const res = await fetch(`${url}/auth/register`, {
        method: "POST",
        body: JSON.stringify({ email, password, username, name }),
      });
      const response = await res.json();
      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem("token", response.token);
        setUser(response.data);
      }

      const error = response.message;
      const data = response.data;

      return { data, error };
    } catch (error) {
      const errMessage =
        error instanceof Error ? error.message : "failed to register user";
      throw new Error(errMessage);
    }
  };

  const logout = async () => {
    await api.get("/auth/logout");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    register,
    logout,
    login,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ---------- HOOK ----------

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
