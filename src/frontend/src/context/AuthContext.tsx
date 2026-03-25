import { createContext, useContext, useState } from "react";

const ADMIN_USERNAME = "ishant_padole";
const ADMIN_PW_KEY = "bmw_m5cs_admin_pw";
const USERS_STORAGE_KEY = "bmw_m5cs_users";
const SESSION_STORAGE_KEY = "bmw_m5cs_session";
const ADMIN_LAST_LOGIN_KEY = "bmw_m5cs_admin_last_login";

function getAdminPassword(): string {
  return localStorage.getItem(ADMIN_PW_KEY) ?? "41236";
}

interface UserAccount {
  name: string;
  email: string;
  passwordHash: string;
  memberSince: string;
}

interface Session {
  email: string;
  name: string;
  isAdmin: boolean;
  memberSince: string;
  adminLastLogin: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  isAdmin: boolean;
  userName: string;
  userEmail: string;
  memberSince: string;
  adminLastLogin: string;
  signUp: (
    name: string,
    email: string,
    password: string,
  ) => { ok: boolean; error?: string };
  signIn: (email: string, password: string) => { ok: boolean; error?: string };
  adminLogin: (username: string, password: string) => boolean;
  logout: () => void;
  changePassword: (
    currentPassword: string,
    newPassword: string,
  ) => { ok: boolean; error?: string };
  updateName: (newName: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

function hashPassword(password: string): string {
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
  const [memberSince, setMemberSince] = useState(
    savedSession?.memberSince ?? "",
  );
  const [adminLastLogin, setAdminLastLogin] = useState(
    savedSession?.adminLastLogin ?? "",
  );

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
    const ms = new Date().toISOString();
    const newUser: UserAccount = {
      name,
      email: email.toLowerCase(),
      passwordHash: hashPassword(password),
      memberSince: ms,
    };
    saveUsers([...users, newUser]);
    const session: Session = {
      email: email.toLowerCase(),
      name,
      isAdmin: false,
      memberSince: ms,
      adminLastLogin: "",
    };
    saveSession(session);
    setIsLoggedIn(true);
    setIsAdmin(false);
    setUserName(name);
    setUserEmail(email.toLowerCase());
    setMemberSince(ms);
    setAdminLastLogin("");
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
    const ms = user.memberSince ?? new Date().toISOString();
    const session: Session = {
      email: user.email,
      name: user.name,
      isAdmin: false,
      memberSince: ms,
      adminLastLogin: "",
    };
    saveSession(session);
    setIsLoggedIn(true);
    setIsAdmin(false);
    setUserName(user.name);
    setUserEmail(user.email);
    setMemberSince(ms);
    setAdminLastLogin("");
    return { ok: true };
  }

  function adminLogin(username: string, password: string): boolean {
    if (username === ADMIN_USERNAME && password === getAdminPassword()) {
      const now = new Date().toISOString();
      localStorage.setItem(ADMIN_LAST_LOGIN_KEY, now);
      const session: Session = {
        email: "",
        name: "Admin",
        isAdmin: true,
        memberSince: "",
        adminLastLogin: now,
      };
      saveSession(session);
      setIsLoggedIn(true);
      setIsAdmin(true);
      setUserName("Admin");
      setUserEmail("");
      setMemberSince("");
      setAdminLastLogin(now);
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
    setMemberSince("");
    setAdminLastLogin("");
  }

  function changePassword(
    currentPassword: string,
    newPassword: string,
  ): { ok: boolean; error?: string } {
    if (isAdmin) {
      const storedAdminPw = getAdminPassword();
      if (currentPassword !== storedAdminPw)
        return { ok: false, error: "Current password is incorrect" };
      localStorage.setItem(ADMIN_PW_KEY, newPassword);
      return { ok: true };
    }
    const users = getUsers();
    const idx = users.findIndex((u) => u.email === userEmail);
    if (idx === -1) return { ok: false, error: "Account not found" };
    if (users[idx].passwordHash !== hashPassword(currentPassword))
      return { ok: false, error: "Current password is incorrect" };
    users[idx].passwordHash = hashPassword(newPassword);
    saveUsers(users);
    return { ok: true };
  }

  function updateName(newName: string): void {
    const users = getUsers();
    const idx = users.findIndex((u) => u.email === userEmail);
    if (idx !== -1) {
      users[idx].name = newName;
      saveUsers(users);
    }
    const session = getSession();
    if (session) {
      session.name = newName;
      saveSession(session);
    }
    setUserName(newName);
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isAdmin,
        userName,
        userEmail,
        memberSince,
        adminLastLogin,
        signUp,
        signIn,
        adminLogin,
        logout,
        changePassword,
        updateName,
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
