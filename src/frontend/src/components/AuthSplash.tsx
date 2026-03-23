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

export default function AuthSplash({ onClose }: { onClose: () => void }) {
  const { login, adminLogin } = useAuth();
  const [tab, setTab] = useState<"enter" | "admin">("enter");

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminError, setAdminError] = useState("");
  const [adminLoading, setAdminLoading] = useState(false);

  function handleEnter(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setNameError("Please enter your name");
      return;
    }
    login(name.trim());
    onClose();
  }

  function handleAdminLogin(e: React.FormEvent) {
    e.preventDefault();
    setAdminLoading(true);
    setAdminError("");
    setTimeout(() => {
      const ok = adminLogin(adminEmail.trim(), adminPassword);
      if (ok) {
        onClose();
      } else {
        setAdminError("Invalid credentials");
      }
      setAdminLoading(false);
    }, 600);
  }

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
          <div className="flex flex-col items-center mb-7">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
              className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
              style={{
                border: "2px solid #00BFFF",
                boxShadow:
                  "0 0 28px rgba(0,191,255,0.5), inset 0 0 14px rgba(0,191,255,0.08)",
                background: "rgba(0,191,255,0.06)",
              }}
            >
              <span
                className="text-2xl font-black tracking-tight"
                style={{
                  color: "#00BFFF",
                  textShadow: "0 0 14px #00BFFF",
                  fontFamily: "sans-serif",
                }}
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
              className="text-xl font-black uppercase tracking-widest text-center"
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
            className="flex gap-1 p-1 rounded-xl mb-6"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(0,191,255,0.1)",
            }}
          >
            {(["enter", "admin"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className="flex-1 py-2.5 rounded-lg text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300"
                style={{
                  background:
                    tab === t ? "rgba(0,191,255,0.15)" : "transparent",
                  color: tab === t ? "#00BFFF" : "rgba(255,255,255,0.35)",
                  boxShadow:
                    tab === t ? "0 0 12px rgba(0,191,255,0.2)" : "none",
                  border:
                    tab === t
                      ? "1px solid rgba(0,191,255,0.3)"
                      : "1px solid transparent",
                }}
                data-ocid="auth.tab"
              >
                {t === "enter" ? "Enter Site" : "Admin"}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {tab === "enter" ? (
              <motion.form
                key="enter"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleEnter}
                className="flex flex-col gap-5"
              >
                <NeonField
                  label="Full Name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setNameError("");
                  }}
                  autoFocus
                  data-ocid="auth.input"
                />
                {nameError && (
                  <p
                    className="text-xs"
                    style={{ color: "#FF5555" }}
                    data-ocid="auth.error_state"
                  >
                    {nameError}
                  </p>
                )}
                <button
                  type="submit"
                  className="w-full py-4 rounded-full font-black tracking-[0.25em] uppercase text-sm transition-all duration-300"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(0,191,255,0.25) 0%, rgba(32,224,230,0.12) 100%)",
                    border: "1.5px solid #00BFFF",
                    color: "#00BFFF",
                    boxShadow: "0 0 30px rgba(0,191,255,0.3)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 0 50px rgba(0,191,255,0.5)";
                    e.currentTarget.style.background =
                      "linear-gradient(135deg, rgba(0,191,255,0.35) 0%, rgba(32,224,230,0.2) 100%)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 0 30px rgba(0,191,255,0.3)";
                    e.currentTarget.style.background =
                      "linear-gradient(135deg, rgba(0,191,255,0.25) 0%, rgba(32,224,230,0.12) 100%)";
                  }}
                  data-ocid="auth.primary_button"
                >
                  Continue
                </button>
              </motion.form>
            ) : (
              <motion.form
                key="admin"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleAdminLogin}
                className="flex flex-col gap-5"
              >
                <NeonField
                  label="Admin Email"
                  type="text"
                  placeholder="Email address"
                  value={adminEmail}
                  onChange={(e) => {
                    setAdminEmail(e.target.value);
                    setAdminError("");
                  }}
                  autoFocus
                  data-ocid="auth.input"
                />
                <NeonField
                  label="Password"
                  type="password"
                  placeholder="Password"
                  value={adminPassword}
                  onChange={(e) => {
                    setAdminPassword(e.target.value);
                    setAdminError("");
                  }}
                  data-ocid="auth.input"
                />
                {adminError && (
                  <p
                    className="text-xs"
                    style={{ color: "#FF5555" }}
                    data-ocid="auth.error_state"
                  >
                    {adminError}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={adminLoading}
                  className="w-full py-4 rounded-full font-black tracking-[0.25em] uppercase text-sm transition-all duration-300 flex items-center justify-center gap-2"
                  style={{
                    background: adminLoading
                      ? "rgba(255,68,68,0.1)"
                      : "linear-gradient(135deg, rgba(255,68,68,0.25) 0%, rgba(255,100,60,0.12) 100%)",
                    border: "1.5px solid #FF4444",
                    color: "#FF4444",
                    boxShadow: adminLoading
                      ? "none"
                      : "0 0 24px rgba(255,68,68,0.3)",
                    cursor: adminLoading ? "not-allowed" : "pointer",
                  }}
                  data-ocid="auth.submit_button"
                >
                  {adminLoading ? "Verifying..." : "Login as Admin"}
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
