import { createContext, useContext, useEffect, useState } from "react";

const ADMIN_USERNAME = "ishant_padole";
const ADMIN_PASSWORD = "41236";
const USERS_STORAGE_KEY = "bmw_m5cs_users";
const SESSION_STORAGE_KEY = "bmw_m5cs_session";

interface UserAccount {
  name: string;
  email: string;
  passwordHash: string;
}

interface Session {
  email: string;
  name: string;
  isAdmin: boolean;
}

interface AuthContextType {
  isLoggedIn: boolean;
  isAdmin: boolean;
  userName: string;
  userEmail: string;
  signUp: (
    name: string,
    email: string,
    password: string,
  ) => { ok: boolean; error?: string };
  signIn: (email: string, password: string) => { ok: boolean; error?: string };
  adminLogin: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

function hashPassword(password: string): string {
  // Simple deterministic hash for client-side password storage
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash.toString(36);
}

function getUsers(): UserAccount[] {
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveUsers(users: UserAccount[]) {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

function getSession(): Session | null {
  try {
    const raw = sessionStorage.getItem(SESSION_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveSession(session: Session) {
  sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
}

function clearSession() {
  sessionStorage.removeItem(SESSION_STORAGE_KEY);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const savedSession = getSession();
  const [isLoggedIn, setIsLoggedIn] = useState(!!savedSession);
  const [isAdmin, setIsAdmin] = useState(savedSession?.isAdmin ?? false);
  const [userName, setUserName] = useState(savedSession?.name ?? "");
  const [userEmail, setUserEmail] = useState(savedSession?.email ?? "");

  function signUp(
    name: string,
    email: string,
    password: string,
  ): { ok: boolean; error?: string } {
    const users = getUsers();
    const exists = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase(),
    );
    if (exists)
      return { ok: false, error: "An account with this email already exists" };
    const newUser: UserAccount = {
      name,
      email: email.toLowerCase(),
      passwordHash: hashPassword(password),
    };
    saveUsers([...users, newUser]);
    const session: Session = {
      email: email.toLowerCase(),
      name,
      isAdmin: false,
    };
    saveSession(session);
    setIsLoggedIn(true);
    setIsAdmin(false);
    setUserName(name);
    setUserEmail(email.toLowerCase());
    return { ok: true };
  }

  function signIn(
    email: string,
    password: string,
  ): { ok: boolean; error?: string } {
    const users = getUsers();
    const user = users.find((u) => u.email === email.toLowerCase());
    if (!user) return { ok: false, error: "No account found with this email" };
    if (user.passwordHash !== hashPassword(password))
      return { ok: false, error: "Incorrect password" };
    const session: Session = {
      email: user.email,
      name: user.name,
      isAdmin: false,
    };
    saveSession(session);
    setIsLoggedIn(true);
    setIsAdmin(false);
    setUserName(user.name);
    setUserEmail(user.email);
    return { ok: true };
  }

  function adminLogin(username: string, password: string): boolean {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const session: Session = { email: "", name: "Admin", isAdmin: true };
      saveSession(session);
      setIsLoggedIn(true);
      setIsAdmin(true);
      setUserName("Admin");
      setUserEmail("");
      return true;
    }
    return false;
  }

  function logout() {
    clearSession();
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUserName("");
    setUserEmail("");
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isAdmin,
        userName,
        userEmail,
        signUp,
        signIn,
        adminLogin,
        logout,
      }}
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
