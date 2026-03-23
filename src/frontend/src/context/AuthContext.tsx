import { createContext, useContext, useState } from "react";

const ADMIN_EMAIL = "ishantpadole96@gmail";
const ADMIN_PASSWORD = "1234567890";

interface AuthContextType {
  isLoggedIn: boolean;
  isAdmin: boolean;
  userName: string;
  login: (name: string) => void;
  adminLogin: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userName, setUserName] = useState("");

  function login(name: string) {
    setIsLoggedIn(true);
    setIsAdmin(false);
    setUserName(name);
  }

  function adminLogin(email: string, password: string): boolean {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      setIsAdmin(true);
      setUserName("Admin");
      return true;
    }
    return false;
  }

  function logout() {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUserName("");
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, isAdmin, userName, login, adminLogin, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
