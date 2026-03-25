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
type ForgotStep = "entry" | "newpassword" | "done";

// ---------- Recovery Key Modal ----------
function RecoveryKeyModal({
  recoveryKey,
  onDone,
}: {
  recoveryKey: string;
  onDone: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  function copy() {
    navigator.clipboard?.writeText(recoveryKey).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[400] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(16px)" }}
    >
      <motion.div
        initial={{ scale: 0.88, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-sm mx-4 rounded-2xl p-8 flex flex-col gap-5"
        style={{
          background: "rgba(10,14,20,0.97)",
          border: "1.5px solid rgba(255,200,0,0.45)",
          boxShadow:
            "0 0 60px rgba(255,200,0,0.18), 0 40px 80px rgba(0,0,0,0.8)",
        }}
      >
        {/* Warning icon */}
        <div className="flex flex-col items-center gap-2">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 220, delay: 0.15 }}
            className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{
              border: "2px solid rgba(255,200,0,0.7)",
              boxShadow: "0 0 30px rgba(255,200,0,0.3)",
              background: "rgba(255,200,0,0.06)",
            }}
          >
            <span className="text-2xl">🔑</span>
          </motion.div>
          <p
            className="text-sm font-black tracking-[0.2em] uppercase"
            style={{
              color: "rgba(255,200,0,0.9)",
              textShadow: "0 0 14px rgba(255,200,0,0.5)",
            }}
          >
            Save Your Recovery Key
          </p>
          <p
            className="text-xs text-center"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            This key is shown{" "}
            <strong style={{ color: "rgba(255,100,100,0.85)" }}>
              only once
            </strong>{" "}
            and cannot be recovered later. Keep it somewhere safe — you will
            need it to reset your password.
          </p>
        </div>

        {/* The key */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col items-center gap-2"
        >
          <button
            type="button"
            className="w-full px-5 py-4 rounded-xl flex items-center justify-center cursor-pointer select-all"
            style={{
              background: "rgba(255,200,0,0.06)",
              border: "1.5px solid rgba(255,200,0,0.5)",
              boxShadow:
                "0 0 30px rgba(255,200,0,0.15), inset 0 0 16px rgba(255,200,0,0.04)",
            }}
            onClick={copy}
            title="Click to copy"
          >
            <span
              className="font-black tracking-[0.25em] text-xl"
              style={{
                color: "#FFD700",
                textShadow:
                  "0 0 16px rgba(255,215,0,0.8), 0 0 32px rgba(255,215,0,0.4)",
                fontFamily: "'Courier New', monospace",
                letterSpacing: "0.2em",
              }}
            >
              {recoveryKey}
            </span>
          </button>
          <button
            type="button"
            onClick={copy}
            className="text-xs py-1.5 px-4 rounded-full transition-all duration-200"
            style={{
              background: copied
                ? "rgba(0,255,136,0.12)"
                : "rgba(255,200,0,0.1)",
              border: copied
                ? "1px solid rgba(0,255,136,0.5)"
                : "1px solid rgba(255,200,0,0.35)",
              color: copied ? "#00FF88" : "rgba(255,200,0,0.8)",
            }}
          >
            {copied ? "✓ Copied to clipboard" : "Copy to clipboard"}
          </button>
        </motion.div>

        {/* Confirm checkbox */}
        <label
          className="flex items-start gap-3 cursor-pointer"
          htmlFor="recovery-confirm"
        >
          <input
            id="recovery-confirm"
            type="checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
            className="mt-0.5 shrink-0"
            style={{
              accentColor: "#00FF88",
              width: 18,
              height: 18,
              cursor: "pointer",
            }}
          />
          <span
            className="text-xs leading-relaxed"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            I have saved my recovery key. I understand it will not be shown
            again.
          </span>
        </label>

        <button
          type="button"
          disabled={!confirmed}
          onClick={onDone}
          className="w-full py-3.5 rounded-full font-black tracking-[0.25em] uppercase text-sm transition-all duration-300"
          style={{
            background: confirmed
              ? "linear-gradient(135deg, rgba(0,255,136,0.25) 0%, rgba(0,191,255,0.12) 100%)"
              : "rgba(255,255,255,0.04)",
            border: confirmed
              ? "1.5px solid #00FF88"
              : "1.5px solid rgba(255,255,255,0.1)",
            color: confirmed ? "#00FF88" : "rgba(255,255,255,0.25)",
            boxShadow: confirmed ? "0 0 28px rgba(0,255,136,0.3)" : "none",
            cursor: confirmed ? "pointer" : "not-allowed",
          }}
        >
          I've Saved My Key — Continue
        </button>
      </motion.div>
    </motion.div>
  );
}

// ---------- Forgot Password ----------
type ForgotProps = { onBack: () => void };

function ForgotPassword({ onBack }: ForgotProps) {
  const { resetPassword } = useAuth();
  const [step, setStep] = useState<ForgotStep>("entry");
  const [email, setEmail] = useState("");
  const [key, setKey] = useState("");
  const [entryError, setEntryError] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwError, setPwError] = useState("");

  function handleEntrySubmit(e: React.FormEvent) {
    e.preventDefault();
    setEntryError("");
    if (!email.trim() || !key.trim()) {
      setEntryError("Please fill in both fields");
      return;
    }
    const result = resetPassword(
      email.trim(),
      key.trim().toUpperCase(),
      "",
      true,
    );
    if (!result.ok) {
      setEntryError(result.error ?? "Verification failed");
      return;
    }
    setStep("newpassword");
  }

  function handlePasswordReset(e: React.FormEvent) {
    e.preventDefault();
    setPwError("");
    if (!newPassword || !confirmPassword) {
      setPwError("Please fill in both fields");
      return;
    }
    if (newPassword.length < 6) {
      setPwError("Password must be at least 6 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPwError("Passwords do not match");
      return;
    }
    resetPassword(email.trim(), key.trim().toUpperCase(), newPassword, false);
    setStep("done");
  }

  return (
    <AnimatePresence mode="wait">
      {step === "entry" && (
        <motion.form
          key="fp-entry"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
          onSubmit={handleEntrySubmit}
          className="flex flex-col gap-4"
        >
          <div className="text-center mb-2">
            <div
              className="text-4xl mb-2"
              style={{ filter: "drop-shadow(0 0 10px rgba(255,200,0,0.6))" }}
            >
              🔑
            </div>
            <p
              className="text-xs tracking-widest uppercase font-bold mb-1"
              style={{ color: "rgba(255,200,0,0.85)" }}
            >
              Reset Password
            </p>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
              Enter your email and the recovery key you saved when creating your
              account.
            </p>
          </div>
          <NeonField
            label="Registered Email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEntryError("");
            }}
            autoFocus
          />
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="fp-recovery-key"
              style={{
                color: "rgba(255,200,0,0.75)",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              Recovery Key
            </label>
            <input
              id="fp-recovery-key"
              type="text"
              placeholder="XXXX-XXXX-XXXX-XXXX"
              value={key}
              onChange={(e) => {
                setKey(e.target.value.toUpperCase());
                setEntryError("");
              }}
              maxLength={19}
              style={{
                ...inputStyle,
                borderColor: "rgba(255,200,0,0.4)",
                fontFamily: "'Courier New', monospace",
                letterSpacing: "0.15em",
                fontWeight: 700,
              }}
            />
          </div>
          {entryError && (
            <p className="text-xs" style={{ color: "#FF5555" }}>
              {entryError}
            </p>
          )}
          <button
            type="submit"
            className="w-full py-3.5 rounded-full font-black tracking-[0.25em] uppercase text-sm transition-all duration-300"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,200,0,0.2) 0%, rgba(255,160,0,0.1) 100%)",
              border: "1.5px solid rgba(255,200,0,0.7)",
              color: "#FFD700",
              boxShadow: "0 0 30px rgba(255,200,0,0.2)",
            }}
          >
            Verify & Continue
          </button>
          <button
            type="button"
            onClick={onBack}
            className="text-xs text-center"
            style={{
              color: "rgba(255,255,255,0.35)",
              textDecoration: "underline",
            }}
          >
            Back to Sign In
          </button>
        </motion.form>
      )}

      {step === "newpassword" && (
        <motion.form
          key="fp-newpw"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
          onSubmit={handlePasswordReset}
          className="flex flex-col gap-4"
        >
          <div className="text-center mb-2">
            <div
              className="text-4xl mb-2"
              style={{ filter: "drop-shadow(0 0 10px rgba(0,255,136,0.6))" }}
            >
              ✅
            </div>
            <p
              className="text-xs tracking-widest uppercase font-bold mb-1"
              style={{ color: "#00FF88" }}
            >
              Identity Verified
            </p>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
              Set your new password below.
            </p>
          </div>
          <NeonField
            label="New Password"
            type="password"
            placeholder="Min. 6 characters"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
              setPwError("");
            }}
            autoFocus
            autoComplete="new-password"
          />
          <NeonField
            label="Confirm New Password"
            type="password"
            placeholder="Repeat new password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setPwError("");
            }}
            autoComplete="new-password"
          />
          {pwError && (
            <p className="text-xs" style={{ color: "#FF5555" }}>
              {pwError}
            </p>
          )}
          <button
            type="submit"
            className="w-full py-3.5 rounded-full font-black tracking-[0.25em] uppercase text-sm transition-all duration-300"
            style={{
              background:
                "linear-gradient(135deg, rgba(0,255,136,0.2) 0%, rgba(0,191,255,0.1) 100%)",
              border: "1.5px solid #00FF88",
              color: "#00FF88",
              boxShadow: "0 0 30px rgba(0,255,136,0.25)",
            }}
          >
            Reset Password
          </button>
        </motion.form>
      )}

      {step === "done" && (
        <motion.div
          key="fp-done"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, type: "spring" }}
          className="flex flex-col items-center gap-4 py-4"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{
              border: "2px solid #00FF88",
              boxShadow: "0 0 30px rgba(0,255,136,0.5)",
              background: "rgba(0,255,136,0.08)",
            }}
          >
            <span className="text-3xl">✓</span>
          </motion.div>
          <p
            className="text-sm font-black tracking-widest uppercase"
            style={{
              color: "#00FF88",
              textShadow: "0 0 14px rgba(0,255,136,0.6)",
            }}
          >
            Password Reset!
          </p>
          <p
            className="text-xs text-center"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            Your password has been updated. You can now sign in with your new
            password.
          </p>
          <button
            type="button"
            onClick={onBack}
            className="w-full py-3.5 rounded-full font-black tracking-[0.25em] uppercase text-sm transition-all duration-300"
            style={{
              background:
                "linear-gradient(135deg, rgba(0,191,255,0.25) 0%, rgba(32,224,230,0.12) 100%)",
              border: "1.5px solid #00BFFF",
              color: "#00BFFF",
              boxShadow: "0 0 30px rgba(0,191,255,0.3)",
            }}
          >
            Back to Sign In
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ---------- Main AuthSplash ----------
export default function AuthSplash({ onClose }: { onClose: () => void }) {
  const auth = useAuth();
  const { signIn, signUp, adminLogin } = auth;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const loginAfterSignup = (auth as any)._loginAfterSignup as (
    email: string,
  ) => void;

  const [tab, setTab] = useState<Tab>("signin");
  const [showForgot, setShowForgot] = useState(false);

  // Recovery key modal state
  const [recoveryKey, setRecoveryKey] = useState<string | null>(null);
  const [pendingEmail, setPendingEmail] = useState("");

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
      if (result.ok && result.recoveryKey) {
        // Show recovery key modal before logging in
        setRecoveryKey(result.recoveryKey);
        setPendingEmail(suEmail.trim().toLowerCase());
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

  function handleRecoveryKeyDone() {
    // Log the user in now that they've saved their key
    loginAfterSignup(pendingEmail);
    setRecoveryKey(null);
    setPendingEmail("");
    onClose();
  }

  const tabs: { key: Tab; label: string; color: string }[] = [
    { key: "signin", label: "Sign In", color: "#00BFFF" },
    { key: "signup", label: "Sign Up", color: "#20E0E6" },
    { key: "admin", label: "Admin", color: "#FF4444" },
  ];

  return (
    <>
      {/* Recovery Key Modal (above everything) */}
      <AnimatePresence>
        {recoveryKey && (
          <RecoveryKeyModal
            recoveryKey={recoveryKey}
            onDone={handleRecoveryKeyDone}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-[300] flex items-center justify-center"
        style={{
          background: "rgba(7,9,13,0.98)",
          backdropFilter: "blur(12px)",
        }}
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
                  background:
                    "linear-gradient(135deg, #FFFFFF 0%, #00BFFF 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Welcome to the M Experience
              </motion.h2>
            </div>

            <AnimatePresence mode="wait">
              {showForgot ? (
                <motion.div
                  key="forgot"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <ForgotPassword
                    onBack={() => {
                      setShowForgot(false);
                      setTab("signin");
                    }}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="tabs"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
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
                          color:
                            tab === t.key ? t.color : "rgba(255,255,255,0.35)",
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
                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={() => setShowForgot(true)}
                            className="text-xs"
                            style={{
                              color: "rgba(0,191,255,0.6)",
                              textDecoration: "underline",
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                            }}
                          >
                            Forgot Password?
                          </button>
                        </div>
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
                            style={{
                              color: "#00BFFF",
                              textDecoration: "underline",
                            }}
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
                            style={{
                              color: "#00BFFF",
                              textDecoration: "underline",
                            }}
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
                </motion.div>
              )}
            </AnimatePresence>

            {/* Skip login button */}
            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={onClose}
                className="text-xs tracking-widest uppercase transition-all duration-300 group"
                style={{ color: "rgba(255,255,255,0.3)" }}
                data-ocid="auth.secondary_button"
              >
                <span className="group-hover:text-gray-400 group-hover:underline underline-offset-4 transition-all duration-200">
                  Skip login for now →
                </span>
              </button>
            </div>
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
    </>
  );
}
