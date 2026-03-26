import {
  Activity,
  AlertCircle,
  Calendar,
  CheckCircle,
  Clock,
  Edit2,
  ExternalLink,
  Eye,
  EyeOff,
  Lock,
  LogOut,
  Mail,
  Save,
  ShieldCheck,
  User,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useState } from "react";
import type { Booking } from "../backend.d";
import { useAuth } from "../context/AuthContext";
import { useActor } from "../hooks/useActor";

interface ProfilePageProps {
  onClose: () => void;
  onOpenAdmin: () => void;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function formatDate(iso: string): string {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return "—";
  }
}

function formatDateTime(iso: string): string {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "—";
  }
}

function SectionCard({
  children,
  delay = 0,
}: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="rounded-2xl p-6"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(32,224,230,0.12)",
        backdropFilter: "blur(12px)",
      }}
    >
      {children}
    </motion.div>
  );
}

function SectionTitle({
  icon,
  title,
}: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2 mb-5">
      <span style={{ color: "#20E0E6" }}>{icon}</span>
      <h3
        className="text-sm font-bold tracking-[0.18em] uppercase"
        style={{ color: "#20E0E6" }}
      >
        {title}
      </h3>
    </div>
  );
}

function PasswordField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [show, setShow] = useState(false);
  const id = useId();
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={id}
        className="text-xs tracking-widest"
        style={{ color: "#7C8796" }}
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl text-sm outline-none pr-10 transition-all duration-200"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(32,224,230,0.2)",
            color: "#F2F5F7",
          }}
          onFocus={(e) => {
            e.currentTarget.style.border = "1px solid rgba(32,224,230,0.6)";
            e.currentTarget.style.boxShadow = "0 0 12px rgba(32,224,230,0.15)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.border = "1px solid rgba(32,224,230,0.2)";
            e.currentTarget.style.boxShadow = "none";
          }}
        />
        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors duration-200"
          style={{ color: "#7C8796" }}
          onClick={() => setShow(!show)}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#20E0E6";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#7C8796";
          }}
        >
          {show ? <EyeOff size={14} /> : <Eye size={14} />}
        </button>
      </div>
    </div>
  );
}

const STATS = [
  { label: "TOTAL BOOKINGS", color: "#FF4444", key: "bookings" },
  { label: "PENDING", color: "#F59E0B", key: "pending" },
  { label: "COMMENTS", color: "#20E0E6", key: "comments" },
] as const;

export default function ProfilePage({
  onClose,
  onOpenAdmin,
}: ProfilePageProps) {
  const {
    isAdmin,
    userName,
    userEmail,
    memberSince,
    adminLastLogin,
    changePassword,
    updateName,
    logout,
  } = useAuth();
  const { actor } = useActor();
  const nameInputId = useId();

  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [pwStatus, setPwStatus] = useState<{ ok: boolean; msg: string } | null>(
    null,
  );
  const [pwLoading, setPwLoading] = useState(false);

  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(userName);

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bookingCount, setBookingCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [dataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    if (!actor) return;
    setDataLoading(true);
    if (isAdmin) {
      Promise.all([actor.getAllBookings(), actor.getAllComments()])
        .then(([bk, cm]) => {
          setBookingCount(bk.length);
          setPendingCount(
            bk.filter((b: { status: string }) => b.status === "pending").length,
          );
          setCommentCount(cm.length);
        })
        .finally(() => setDataLoading(false));
    } else {
      actor
        .getAllBookings()
        .then((bk) => {
          const mine = bk.filter(
            (b) => b.email?.toLowerCase() === userEmail?.toLowerCase(),
          );
          setBookings(mine);
        })
        .finally(() => setDataLoading(false));
    }
  }, [actor, isAdmin, userEmail]);

  function handleChangePassword() {
    if (!newPw || newPw.length < 6) {
      setPwStatus({
        ok: false,
        msg: "New password must be at least 6 characters",
      });
      return;
    }
    if (newPw !== confirmPw) {
      setPwStatus({ ok: false, msg: "New passwords do not match" });
      return;
    }
    setPwLoading(true);
    const result = changePassword(currentPw, newPw);
    setTimeout(() => {
      setPwLoading(false);
      if (result.ok) {
        setPwStatus({ ok: true, msg: "Password changed successfully" });
        setCurrentPw("");
        setNewPw("");
        setConfirmPw("");
      } else {
        setPwStatus({
          ok: false,
          msg: result.error ?? "Failed to change password",
        });
      }
    }, 400);
  }

  function handleSaveName() {
    if (nameInput.trim()) {
      updateName(nameInput.trim());
    }
    setEditingName(false);
  }

  const statValues: Record<string, number> = {
    bookings: bookingCount,
    pending: pendingCount,
    comments: commentCount,
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto py-8 px-4"
      style={{ background: "rgba(7,10,15,0.92)", backdropFilter: "blur(20px)" }}
    >
      {/* Close backdrop */}
      <div
        className="absolute inset-0"
        role="button"
        tabIndex={0}
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        aria-label="Close profile"
      />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.97 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-2xl rounded-3xl overflow-hidden"
        style={{
          background: "rgba(11,15,20,0.98)",
          border: "1px solid rgba(32,224,230,0.18)",
          boxShadow:
            "0 0 80px rgba(32,224,230,0.08), 0 40px 80px rgba(0,0,0,0.6)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top glow bar */}
        <div
          className="h-px w-full"
          style={{
            background: isAdmin
              ? "linear-gradient(90deg, transparent, #FF4444 40%, #FF6B35 60%, transparent)"
              : "linear-gradient(90deg, transparent, #00BFFF 40%, #20E0E6 60%, transparent)",
          }}
        />

        {/* Close button */}
        <button
          type="button"
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 z-10"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#7C8796",
          }}
          onClick={onClose}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#F2F5F7";
            e.currentTarget.style.background = "rgba(255,255,255,0.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#7C8796";
            e.currentTarget.style.background = "rgba(255,255,255,0.05)";
          }}
          data-ocid="profile.close_button"
        >
          <X size={14} />
        </button>

        <div className="p-8 flex flex-col gap-6">
          {/* Avatar Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center gap-3 pb-4"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold tracking-wider"
              style={{
                background: isAdmin
                  ? "linear-gradient(135deg, rgba(255,68,68,0.15), rgba(255,107,53,0.15))"
                  : "linear-gradient(135deg, rgba(0,191,255,0.15), rgba(32,224,230,0.15))",
                border: isAdmin ? "2px solid #FF4444" : "2px solid #20E0E6",
                boxShadow: isAdmin
                  ? "0 0 30px rgba(255,68,68,0.3), inset 0 0 20px rgba(255,68,68,0.05)"
                  : "0 0 30px rgba(32,224,230,0.3), inset 0 0 20px rgba(32,224,230,0.05)",
                color: isAdmin ? "#FF4444" : "#20E0E6",
              }}
            >
              {getInitials(userName || "U")}
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2">
                <h2
                  className="text-xl font-bold tracking-wide"
                  style={{ color: "#F2F5F7" }}
                >
                  {userName}
                </h2>
                <span
                  className="text-xs font-bold tracking-widest px-2 py-0.5 rounded-full"
                  style={{
                    background: isAdmin
                      ? "rgba(255,68,68,0.12)"
                      : "rgba(0,191,255,0.12)",
                    border: isAdmin
                      ? "1px solid rgba(255,68,68,0.4)"
                      : "1px solid rgba(0,191,255,0.4)",
                    color: isAdmin ? "#FF4444" : "#00BFFF",
                  }}
                >
                  {isAdmin ? "ADMIN" : "MEMBER"}
                </span>
              </div>
              {!isAdmin && userEmail && (
                <p className="text-xs mt-1" style={{ color: "#7C8796" }}>
                  {userEmail}
                </p>
              )}
            </div>
          </motion.div>

          {/* Normal user sections */}
          {!isAdmin && (
            <>
              {/* Account Info */}
              <SectionCard delay={0.05}>
                <SectionTitle icon={<User size={15} />} title="Account Info" />
                <div className="flex flex-col gap-4">
                  {/* Name field with edit */}
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor={nameInputId}
                      className="text-xs tracking-widest"
                      style={{ color: "#7C8796" }}
                    >
                      DISPLAY NAME
                    </label>
                    {editingName ? (
                      <div className="flex gap-2">
                        <input
                          id={nameInputId}
                          type="text"
                          value={nameInput}
                          onChange={(e) => setNameInput(e.target.value)}
                          className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none transition-all duration-200"
                          style={{
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(32,224,230,0.4)",
                            color: "#F2F5F7",
                            boxShadow: "0 0 12px rgba(32,224,230,0.1)",
                          }}
                          data-ocid="profile.input"
                          onKeyDown={(e) =>
                            e.key === "Enter" && handleSaveName()
                          }
                        />
                        <button
                          type="button"
                          onClick={handleSaveName}
                          className="px-4 py-2 rounded-xl text-xs font-bold tracking-wider transition-all duration-200"
                          style={{
                            background: "rgba(32,224,230,0.12)",
                            border: "1px solid rgba(32,224,230,0.4)",
                            color: "#20E0E6",
                          }}
                          data-ocid="profile.save_button"
                        >
                          <Save size={13} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <span className="text-sm" style={{ color: "#F2F5F7" }}>
                          {userName}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setNameInput(userName);
                            setEditingName(true);
                          }}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium tracking-wider transition-all duration-200"
                          style={{
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            color: "#7C8796",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = "#20E0E6";
                            e.currentTarget.style.borderColor =
                              "rgba(32,224,230,0.3)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = "#7C8796";
                            e.currentTarget.style.borderColor =
                              "rgba(255,255,255,0.1)";
                          }}
                          data-ocid="profile.edit_button"
                        >
                          <Edit2 size={11} /> Edit
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Email */}
                  <div
                    className="flex items-center gap-3 rounded-xl px-4 py-3"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    <Mail size={14} style={{ color: "#20E0E6" }} />
                    <div>
                      <p className="text-xs" style={{ color: "#7C8796" }}>
                        EMAIL
                      </p>
                      <p className="text-sm" style={{ color: "#F2F5F7" }}>
                        {userEmail}
                      </p>
                    </div>
                  </div>

                  {/* Member since */}
                  <div
                    className="flex items-center gap-3 rounded-xl px-4 py-3"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    <Calendar size={14} style={{ color: "#20E0E6" }} />
                    <div>
                      <p className="text-xs" style={{ color: "#7C8796" }}>
                        MEMBER SINCE
                      </p>
                      <p className="text-sm" style={{ color: "#F2F5F7" }}>
                        {formatDate(memberSince)}
                      </p>
                    </div>
                  </div>
                </div>
              </SectionCard>

              {/* Change Password */}
              <SectionCard delay={0.1}>
                <SectionTitle
                  icon={<Lock size={15} />}
                  title="Change Password"
                />
                <div className="flex flex-col gap-4">
                  <PasswordField
                    label="CURRENT PASSWORD"
                    value={currentPw}
                    onChange={setCurrentPw}
                  />
                  <PasswordField
                    label="NEW PASSWORD (MIN 6 CHARS)"
                    value={newPw}
                    onChange={setNewPw}
                  />
                  <PasswordField
                    label="CONFIRM NEW PASSWORD"
                    value={confirmPw}
                    onChange={setConfirmPw}
                  />

                  <AnimatePresence mode="wait">
                    {pwStatus && (
                      <motion.div
                        key={pwStatus.msg}
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2 px-4 py-3 rounded-xl text-xs"
                        style={{
                          background: pwStatus.ok
                            ? "rgba(0,200,100,0.08)"
                            : "rgba(255,68,68,0.08)",
                          border: pwStatus.ok
                            ? "1px solid rgba(0,200,100,0.25)"
                            : "1px solid rgba(255,68,68,0.25)",
                          color: pwStatus.ok ? "#00C864" : "#FF4444",
                        }}
                        data-ocid={
                          pwStatus.ok
                            ? "profile.success_state"
                            : "profile.error_state"
                        }
                      >
                        {pwStatus.ok ? (
                          <CheckCircle size={13} />
                        ) : (
                          <AlertCircle size={13} />
                        )}
                        {pwStatus.msg}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    type="button"
                    onClick={handleChangePassword}
                    disabled={pwLoading}
                    className="w-full py-3 rounded-xl text-sm font-bold tracking-[0.15em] uppercase transition-all duration-300"
                    style={{
                      background: "rgba(0,191,255,0.1)",
                      border: "1.5px solid #00BFFF",
                      color: "#00BFFF",
                      boxShadow: "0 0 20px rgba(0,191,255,0.15)",
                      opacity: pwLoading ? 0.7 : 1,
                    }}
                    onMouseEnter={(e) => {
                      if (!pwLoading) {
                        e.currentTarget.style.boxShadow =
                          "0 0 30px rgba(0,191,255,0.35)";
                        e.currentTarget.style.background =
                          "rgba(0,191,255,0.18)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow =
                        "0 0 20px rgba(0,191,255,0.15)";
                      e.currentTarget.style.background = "rgba(0,191,255,0.1)";
                    }}
                    data-ocid="profile.submit_button"
                  >
                    {pwLoading ? "UPDATING..." : "UPDATE PASSWORD"}
                  </button>
                </div>
              </SectionCard>

              {/* Booking History */}
              <SectionCard delay={0.15}>
                <SectionTitle
                  icon={<Activity size={15} />}
                  title="Booking History"
                />
                {dataLoading ? (
                  <div
                    className="flex items-center gap-2 py-4"
                    style={{ color: "#7C8796" }}
                    data-ocid="profile.loading_state"
                  >
                    <div className="w-4 h-4 rounded-full border-t-2 border-cyan-400 animate-spin" />
                    <span className="text-xs">Loading bookings...</span>
                  </div>
                ) : bookings.length === 0 ? (
                  <div
                    className="text-center py-8 rounded-xl"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px dashed rgba(255,255,255,0.08)",
                    }}
                    data-ocid="profile.empty_state"
                  >
                    <Calendar
                      size={28}
                      style={{
                        color: "rgba(32,224,230,0.3)",
                        margin: "0 auto 8px",
                      }}
                    />
                    <p className="text-xs" style={{ color: "#7C8796" }}>
                      No test drive bookings yet
                    </p>
                    <p
                      className="text-xs mt-1"
                      style={{ color: "rgba(255,255,255,0.2)" }}
                    >
                      Book your first one below!
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {bookings.map((b, i) => (
                      <div
                        key={`${b.preferredDate}-${b.phone}-${i}`}
                        className="flex items-center justify-between px-4 py-3 rounded-xl"
                        style={{
                          background: "rgba(255,255,255,0.02)",
                          border: "1px solid rgba(32,224,230,0.08)",
                        }}
                        data-ocid={`profile.item.${i + 1}`}
                      >
                        <div>
                          <p
                            className="text-sm font-medium"
                            style={{ color: "#F2F5F7" }}
                          >
                            {b.preferredDate}
                          </p>
                          <p className="text-xs" style={{ color: "#7C8796" }}>
                            {b.preferredTime} • {b.phone}
                          </p>
                        </div>
                        <span
                          className="text-xs font-bold tracking-wider px-3 py-1 rounded-full"
                          style={{
                            background:
                              b.status === "confirmed"
                                ? "rgba(72,187,120,0.1)"
                                : b.status === "rejected"
                                  ? "rgba(252,129,129,0.1)"
                                  : "rgba(246,173,85,0.1)",
                            border:
                              b.status === "confirmed"
                                ? "1px solid rgba(72,187,120,0.4)"
                                : b.status === "rejected"
                                  ? "1px solid rgba(252,129,129,0.4)"
                                  : "1px solid rgba(246,173,85,0.4)",
                            color:
                              b.status === "confirmed"
                                ? "#48BB78"
                                : b.status === "rejected"
                                  ? "#FC8181"
                                  : "#F6AD55",
                          }}
                        >
                          {b.status ? b.status.toUpperCase() : "PENDING"}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </SectionCard>

              {/* Sign Out */}
              <SectionCard delay={0.2}>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    onClose();
                  }}
                  className="w-full py-3 rounded-xl text-sm font-bold tracking-[0.15em] uppercase flex items-center justify-center gap-2 transition-all duration-300"
                  style={{
                    background: "rgba(255,68,68,0.06)",
                    border: "1.5px solid rgba(255,68,68,0.5)",
                    color: "#FF4444",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,68,68,0.14)";
                    e.currentTarget.style.boxShadow =
                      "0 0 20px rgba(255,68,68,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,68,68,0.06)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                  data-ocid="profile.secondary_button"
                >
                  <LogOut size={14} /> SIGN OUT
                </button>
              </SectionCard>
            </>
          )}

          {/* Admin sections */}
          {isAdmin && (
            <>
              {/* Admin Info */}
              <SectionCard delay={0.05}>
                <SectionTitle
                  icon={<ShieldCheck size={15} />}
                  title="Admin Information"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    className="flex items-center gap-3 rounded-xl px-4 py-3"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    <User size={14} style={{ color: "#FF4444" }} />
                    <div>
                      <p className="text-xs" style={{ color: "#7C8796" }}>
                        USERNAME
                      </p>
                      <p
                        className="text-sm font-mono"
                        style={{ color: "#F2F5F7" }}
                      >
                        ishant_padole
                      </p>
                    </div>
                  </div>
                  <div
                    className="flex items-center gap-3 rounded-xl px-4 py-3"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    <ShieldCheck size={14} style={{ color: "#FF4444" }} />
                    <div>
                      <p className="text-xs" style={{ color: "#7C8796" }}>
                        ROLE
                      </p>
                      <p
                        className="text-sm"
                        style={{ color: "#FF4444", fontWeight: 700 }}
                      >
                        Administrator
                      </p>
                    </div>
                  </div>
                  <div
                    className="flex items-center gap-3 rounded-xl px-4 py-3 sm:col-span-2"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    <Clock size={14} style={{ color: "#FF4444" }} />
                    <div>
                      <p className="text-xs" style={{ color: "#7C8796" }}>
                        LAST LOGIN
                      </p>
                      <p className="text-sm" style={{ color: "#F2F5F7" }}>
                        {formatDateTime(adminLastLogin)}
                      </p>
                    </div>
                  </div>
                </div>
              </SectionCard>

              {/* Quick Stats */}
              <SectionCard delay={0.1}>
                <SectionTitle
                  icon={<Activity size={15} />}
                  title="Quick Stats"
                />
                {dataLoading ? (
                  <div
                    className="flex items-center gap-2 py-4"
                    style={{ color: "#7C8796" }}
                    data-ocid="profile.loading_state"
                  >
                    <div className="w-4 h-4 rounded-full border-t-2 border-red-400 animate-spin" />
                    <span className="text-xs">Fetching stats...</span>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-3">
                    {STATS.map((stat) => (
                      <div
                        key={stat.key}
                        className="rounded-xl p-4 text-center"
                        style={{
                          background: "rgba(255,255,255,0.02)",
                          border: `1px solid ${stat.color}22`,
                        }}
                      >
                        <p
                          className="text-2xl font-bold"
                          style={{ color: stat.color }}
                        >
                          {statValues[stat.key]}
                        </p>
                        <p
                          className="text-xs mt-1"
                          style={{ color: "#7C8796" }}
                        >
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </SectionCard>

              {/* Change Password */}
              <SectionCard delay={0.15}>
                <SectionTitle
                  icon={<Lock size={15} />}
                  title="Change Admin Password"
                />
                <div className="flex flex-col gap-4">
                  <PasswordField
                    label="CURRENT PASSWORD"
                    value={currentPw}
                    onChange={setCurrentPw}
                  />
                  <PasswordField
                    label="NEW PASSWORD (MIN 6 CHARS)"
                    value={newPw}
                    onChange={setNewPw}
                  />
                  <PasswordField
                    label="CONFIRM NEW PASSWORD"
                    value={confirmPw}
                    onChange={setConfirmPw}
                  />

                  <AnimatePresence mode="wait">
                    {pwStatus && (
                      <motion.div
                        key={pwStatus.msg}
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2 px-4 py-3 rounded-xl text-xs"
                        style={{
                          background: pwStatus.ok
                            ? "rgba(0,200,100,0.08)"
                            : "rgba(255,68,68,0.08)",
                          border: pwStatus.ok
                            ? "1px solid rgba(0,200,100,0.25)"
                            : "1px solid rgba(255,68,68,0.25)",
                          color: pwStatus.ok ? "#00C864" : "#FF4444",
                        }}
                        data-ocid={
                          pwStatus.ok
                            ? "profile.success_state"
                            : "profile.error_state"
                        }
                      >
                        {pwStatus.ok ? (
                          <CheckCircle size={13} />
                        ) : (
                          <AlertCircle size={13} />
                        )}
                        {pwStatus.msg}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    type="button"
                    onClick={handleChangePassword}
                    disabled={pwLoading}
                    className="w-full py-3 rounded-xl text-sm font-bold tracking-[0.15em] uppercase transition-all duration-300"
                    style={{
                      background: "rgba(255,68,68,0.1)",
                      border: "1.5px solid #FF4444",
                      color: "#FF4444",
                      boxShadow: "0 0 20px rgba(255,68,68,0.12)",
                      opacity: pwLoading ? 0.7 : 1,
                    }}
                    onMouseEnter={(e) => {
                      if (!pwLoading) {
                        e.currentTarget.style.boxShadow =
                          "0 0 30px rgba(255,68,68,0.3)";
                        e.currentTarget.style.background =
                          "rgba(255,68,68,0.18)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow =
                        "0 0 20px rgba(255,68,68,0.12)";
                      e.currentTarget.style.background = "rgba(255,68,68,0.1)";
                    }}
                    data-ocid="profile.submit_button"
                  >
                    {pwLoading ? "UPDATING..." : "UPDATE PASSWORD"}
                  </button>
                </div>
              </SectionCard>

              {/* Open Admin Panel */}
              <SectionCard delay={0.2}>
                <button
                  type="button"
                  onClick={onOpenAdmin}
                  className="w-full py-3 rounded-xl text-sm font-bold tracking-[0.15em] uppercase flex items-center justify-center gap-2 transition-all duration-300"
                  style={{
                    background: "rgba(255,68,68,0.08)",
                    border: "1.5px solid #FF4444",
                    color: "#FF4444",
                    boxShadow: "0 0 20px rgba(255,68,68,0.12)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,68,68,0.16)";
                    e.currentTarget.style.boxShadow =
                      "0 0 30px rgba(255,68,68,0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,68,68,0.08)";
                    e.currentTarget.style.boxShadow =
                      "0 0 20px rgba(255,68,68,0.12)";
                  }}
                  data-ocid="profile.primary_button"
                >
                  <ExternalLink size={14} /> OPEN ADMIN PANEL
                </button>
              </SectionCard>

              {/* Sign Out */}
              <SectionCard delay={0.25}>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    onClose();
                  }}
                  className="w-full py-3 rounded-xl text-sm font-bold tracking-[0.15em] uppercase flex items-center justify-center gap-2 transition-all duration-300"
                  style={{
                    background: "rgba(255,120,50,0.06)",
                    border: "1.5px solid rgba(255,120,50,0.5)",
                    color: "rgba(255,140,60,0.9)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,120,50,0.14)";
                    e.currentTarget.style.boxShadow =
                      "0 0 20px rgba(255,120,50,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,120,50,0.06)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                  data-ocid="profile.secondary_button"
                >
                  <LogOut size={14} /> SIGN OUT
                </button>
              </SectionCard>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
