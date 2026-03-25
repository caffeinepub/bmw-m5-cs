import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";
import { useAuth } from "../context/AuthContext";

const inputStyle: React.CSSProperties = {
  backgroundColor: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(0,191,255,0.3)",
  borderRadius: "10px",
  color: "#F2F5F7",
  padding: "13px 16px",
  width: "100%",
  fontSize: "14px",
  outline: "none",
  transition: "border-color 0.25s, box-shadow 0.25s",
};

const inputFocusStyle: React.CSSProperties = {
  borderColor: "#00BFFF",
  boxShadow: "0 0 0 2px rgba(0,191,255,0.2), 0 0 14px rgba(0,191,255,0.3)",
};

function NeonField({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  const id = useId();
  const [focused, setFocused] = useState(false);
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        style={{
          color: "rgba(0,191,255,0.7)",
          fontSize: "10px",
          fontWeight: 700,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </label>
      <input
        id={id}
        {...props}
        style={{ ...inputStyle, ...(focused ? inputFocusStyle : {}) }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  );
}

const CORNERS = [
  {
    pos: "top-0 left-0",
    br: "6px 0 0 0",
    bt: true,
    bb: false,
    bl: true,
    br2: false,
  },
  {
    pos: "top-0 right-0",
    br: "0 6px 0 0",
    bt: true,
    bb: false,
    bl: false,
    br2: true,
  },
  {
    pos: "bottom-0 left-0",
    br: "0 0 0 6px",
    bt: false,
    bb: true,
    bl: true,
    br2: false,
  },
  {
    pos: "bottom-0 right-0",
    br: "0 0 6px 0",
    bt: false,
    bb: true,
    bl: false,
    br2: true,
  },
];

type Tab = "signin" | "signup" | "admin";

export default function AuthSplash({ onClose }: { onClose: () => void }) {
  const { signIn, signUp, adminLogin } = useAuth();
  const [tab, setTab] = useState<Tab>("signin");

  // Sign In state
  const [siEmail, setSiEmail] = useState("");
  const [siPassword, setSiPassword] = useState("");
  const [siError, setSiError] = useState("");
  const [siLoading, setSiLoading] = useState(false);

  // Sign Up state
  const [suName, setSuName] = useState("");
  const [suEmail, setSuEmail] = useState("");
  const [suPassword, setSuPassword] = useState("");
  const [suConfirm, setSuConfirm] = useState("");
  const [suError, setSuError] = useState("");
  const [suLoading, setSuLoading] = useState(false);

  // Admin state
  const [adUser, setAdUser] = useState("");
  const [adPassword, setAdPassword] = useState("");
  const [adError, setAdError] = useState("");
  const [adLoading, setAdLoading] = useState(false);

  function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setSiError("");
    if (!siEmail.trim() || !siPassword) {
      setSiError("Please fill in all fields");
      return;
    }
    setSiLoading(true);
    setTimeout(() => {
      const result = signIn(siEmail.trim(), siPassword);
      if (result.ok) {
        onClose();
      } else {
        setSiError(result.error ?? "Sign in failed");
      }
      setSiLoading(false);
    }, 400);
  }

  function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setSuError("");
    if (!suName.trim() || !suEmail.trim() || !suPassword || !suConfirm) {
      setSuError("Please fill in all fields");
      return;
    }
    if (suPassword.length < 6) {
      setSuError("Password must be at least 6 characters");
      return;
    }
    if (suPassword !== suConfirm) {
      setSuError("Passwords do not match");
      return;
    }
    setSuLoading(true);
    setTimeout(() => {
      const result = signUp(suName.trim(), suEmail.trim(), suPassword);
      if (result.ok) {
        onClose();
      } else {
        setSuError(result.error ?? "Sign up failed");
      }
      setSuLoading(false);
    }, 400);
  }

  function handleAdminLogin(e: React.FormEvent) {
    e.preventDefault();
    setAdError("");
    setAdLoading(true);
    setTimeout(() => {
      const ok = adminLogin(adUser.trim(), adPassword);
      if (ok) {
        onClose();
      } else {
        setAdError("Invalid credentials");
      }
      setAdLoading(false);
    }, 600);
  }

  const tabs: { key: Tab; label: string; color: string }[] = [
    { key: "signin", label: "Sign In", color: "#00BFFF" },
    { key: "signup", label: "Sign Up", color: "#20E0E6" },
    { key: "admin", label: "Admin", color: "#FF4444" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[300] flex items-center justify-center"
      style={{ background: "rgba(7,9,13,0.98)", backdropFilter: "blur(12px)" }}
      data-ocid="auth.modal"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(0,191,255,0.06) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,191,255,0.015) 2px, rgba(0,191,255,0.015) 4px)",
          opacity: 0.4,
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="relative w-full max-w-md mx-4"
      >
        <div
          className="rounded-2xl p-8"
          style={{
            background: "rgba(11,15,20,0.9)",
            border: "1px solid rgba(0,191,255,0.2)",
            boxShadow:
              "0 0 0 1px rgba(0,191,255,0.06), 0 0 80px rgba(0,191,255,0.12), 0 40px 80px rgba(0,0,0,0.7)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
          }}
        >
          {/* M Logo */}
          <div className="flex flex-col items-center mb-6">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
              className="w-14 h-14 rounded-full flex items-center justify-center mb-3"
              style={{
                border: "2px solid #00BFFF",
                boxShadow:
                  "0 0 28px rgba(0,191,255,0.5), inset 0 0 14px rgba(0,191,255,0.08)",
                background: "rgba(0,191,255,0.06)",
              }}
            >
              <span
                className="text-2xl font-black tracking-tight"
                style={{ color: "#00BFFF", textShadow: "0 0 14px #00BFFF" }}
              >
                M
              </span>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="text-xs font-semibold tracking-[0.35em] uppercase mb-1"
              style={{ color: "rgba(0,191,255,0.7)" }}
            >
              BMW M5 CS
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg font-black uppercase tracking-widest text-center"
              style={{
                background: "linear-gradient(135deg, #FFFFFF 0%, #00BFFF 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Welcome to the M Experience
            </motion.h2>
          </div>

          {/* Tabs */}
          <div
            className="flex gap-1 p-1 rounded-xl mb-5"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(0,191,255,0.1)",
            }}
          >
            {tabs.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setTab(t.key)}
                className="flex-1 py-2 rounded-lg text-xs font-bold tracking-[0.15em] uppercase transition-all duration-300"
                style={{
                  background:
                    tab === t.key
                      ? `rgba(${t.key === "admin" ? "255,68,68" : "0,191,255"},0.15)`
                      : "transparent",
                  color: tab === t.key ? t.color : "rgba(255,255,255,0.35)",
                  boxShadow:
                    tab === t.key
                      ? `0 0 12px rgba(${t.key === "admin" ? "255,68,68" : "0,191,255"},0.2)`
                      : "none",
                  border:
                    tab === t.key
                      ? `1px solid rgba(${t.key === "admin" ? "255,68,68" : "0,191,255"},0.3)`
                      : "1px solid transparent",
                }}
                data-ocid="auth.tab"
              >
                {t.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {tab === "signin" && (
              <motion.form
                key="signin"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSignIn}
                className="flex flex-col gap-4"
              >
                <NeonField
                  label="Email"
                  type="email"
                  placeholder="your@email.com"
                  value={siEmail}
                  onChange={(e) => {
                    setSiEmail(e.target.value);
                    setSiError("");
                  }}
                  autoFocus
                  autoComplete="email"
                  data-ocid="auth.input"
                />
                <NeonField
                  label="Password"
                  type="password"
                  placeholder="Your password"
                  value={siPassword}
                  onChange={(e) => {
                    setSiPassword(e.target.value);
                    setSiError("");
                  }}
                  autoComplete="current-password"
                  data-ocid="auth.input"
                />
                {siError && (
                  <p
                    className="text-xs"
                    style={{ color: "#FF5555" }}
                    data-ocid="auth.error_state"
                  >
                    {siError}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={siLoading}
                  className="w-full py-3.5 rounded-full font-black tracking-[0.25em] uppercase text-sm transition-all duration-300"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(0,191,255,0.25) 0%, rgba(32,224,230,0.12) 100%)",
                    border: "1.5px solid #00BFFF",
                    color: "#00BFFF",
                    boxShadow: "0 0 30px rgba(0,191,255,0.3)",
                    cursor: siLoading ? "not-allowed" : "pointer",
                    opacity: siLoading ? 0.7 : 1,
                  }}
                  data-ocid="auth.submit_button"
                >
                  {siLoading ? "Signing In..." : "Sign In"}
                </button>
                <p
                  className="text-center text-xs"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  No account?{" "}
                  <button
                    type="button"
                    onClick={() => setTab("signup")}
                    style={{ color: "#00BFFF", textDecoration: "underline" }}
                  >
                    Create one
                  </button>
                </p>
              </motion.form>
            )}

            {tab === "signup" && (
              <motion.form
                key="signup"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSignUp}
                className="flex flex-col gap-4"
              >
                <NeonField
                  label="Full Name"
                  type="text"
                  placeholder="Your full name"
                  value={suName}
                  onChange={(e) => {
                    setSuName(e.target.value);
                    setSuError("");
                  }}
                  autoFocus
                  autoComplete="name"
                  data-ocid="auth.input"
                />
                <NeonField
                  label="Email"
                  type="email"
                  placeholder="your@email.com"
                  value={suEmail}
                  onChange={(e) => {
                    setSuEmail(e.target.value);
                    setSuError("");
                  }}
                  autoComplete="email"
                  data-ocid="auth.input"
                />
                <NeonField
                  label="Password"
                  type="password"
                  placeholder="Min. 6 characters"
                  value={suPassword}
                  onChange={(e) => {
                    setSuPassword(e.target.value);
                    setSuError("");
                  }}
                  autoComplete="new-password"
                  data-ocid="auth.input"
                />
                <NeonField
                  label="Confirm Password"
                  type="password"
                  placeholder="Repeat your password"
                  value={suConfirm}
                  onChange={(e) => {
                    setSuConfirm(e.target.value);
                    setSuError("");
                  }}
                  autoComplete="new-password"
                  data-ocid="auth.input"
                />
                {suError && (
                  <p
                    className="text-xs"
                    style={{ color: "#FF5555" }}
                    data-ocid="auth.error_state"
                  >
                    {suError}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={suLoading}
                  className="w-full py-3.5 rounded-full font-black tracking-[0.25em] uppercase text-sm transition-all duration-300"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(32,224,230,0.25) 0%, rgba(0,191,255,0.12) 100%)",
                    border: "1.5px solid #20E0E6",
                    color: "#20E0E6",
                    boxShadow: "0 0 30px rgba(32,224,230,0.3)",
                    cursor: suLoading ? "not-allowed" : "pointer",
                    opacity: suLoading ? 0.7 : 1,
                  }}
                  data-ocid="auth.primary_button"
                >
                  {suLoading ? "Creating Account..." : "Create Account"}
                </button>
                <p
                  className="text-center text-xs"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setTab("signin")}
                    style={{ color: "#00BFFF", textDecoration: "underline" }}
                  >
                    Sign in
                  </button>
                </p>
              </motion.form>
            )}

            {tab === "admin" && (
              <motion.form
                key="admin"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleAdminLogin}
                className="flex flex-col gap-4"
              >
                <NeonField
                  label="Admin Username"
                  type="text"
                  placeholder="Username"
                  value={adUser}
                  onChange={(e) => {
                    setAdUser(e.target.value);
                    setAdError("");
                  }}
                  autoFocus
                  data-ocid="auth.input"
                />
                <NeonField
                  label="Password"
                  type="password"
                  placeholder="Admin password"
                  value={adPassword}
                  onChange={(e) => {
                    setAdPassword(e.target.value);
                    setAdError("");
                  }}
                  data-ocid="auth.input"
                />
                {adError && (
                  <p
                    className="text-xs"
                    style={{ color: "#FF5555" }}
                    data-ocid="auth.error_state"
                  >
                    {adError}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={adLoading}
                  className="w-full py-3.5 rounded-full font-black tracking-[0.25em] uppercase text-sm transition-all duration-300 flex items-center justify-center gap-2"
                  style={{
                    background: adLoading
                      ? "rgba(255,68,68,0.1)"
                      : "linear-gradient(135deg, rgba(255,68,68,0.25) 0%, rgba(255,100,60,0.12) 100%)",
                    border: "1.5px solid #FF4444",
                    color: "#FF4444",
                    boxShadow: adLoading
                      ? "none"
                      : "0 0 24px rgba(255,68,68,0.3)",
                    cursor: adLoading ? "not-allowed" : "pointer",
                  }}
                  data-ocid="auth.submit_button"
                >
                  {adLoading ? "Verifying..." : "Login as Admin"}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* Corner brackets */}
        {CORNERS.map((c) => (
          <div
            key={c.pos}
            className={`absolute ${c.pos} w-5 h-5 pointer-events-none`}
            style={{
              borderTop: c.bt ? "2px solid rgba(0,191,255,0.5)" : "none",
              borderBottom: c.bb ? "2px solid rgba(0,191,255,0.5)" : "none",
              borderLeft: c.bl ? "2px solid rgba(0,191,255,0.5)" : "none",
              borderRight: c.br2 ? "2px solid rgba(0,191,255,0.5)" : "none",
              borderRadius: c.br,
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
