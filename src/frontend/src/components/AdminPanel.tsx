import {
  Activity,
  AlertCircle,
  BarChart3,
  BookOpen,
  Calendar,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  Download,
  Eye,
  Loader2,
  Mail,
  MessageSquare,
  Phone,
  RefreshCw,
  Search,
  ShieldCheck,
  TrendingUp,
  User,
  Users,
  X,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import type { Booking, Comment } from "../backend.d";
import { useActor } from "../hooks/useActor";

type TabId = "dashboard" | "bookings" | "comments";
type SortField = "name" | "date" | "email";
type SortDir = "asc" | "desc";
type BookingStatus = "pending" | "confirmed" | "rejected";

interface BookingWithStatus extends Booking {
  status: BookingStatus;
  id: string;
}

const STATUS_CONFIG: Record<
  BookingStatus,
  { label: string; color: string; bg: string; icon: React.ReactNode }
> = {
  pending: {
    label: "Pending",
    color: "#F6AD55",
    bg: "rgba(246,173,85,0.12)",
    icon: <AlertCircle size={12} />,
  },
  confirmed: {
    label: "Confirmed",
    color: "#48BB78",
    bg: "rgba(72,187,120,0.12)",
    icon: <CheckCircle size={12} />,
  },
  rejected: {
    label: "Rejected",
    color: "#FC8181",
    bg: "rgba(252,129,129,0.12)",
    icon: <XCircle size={12} />,
  },
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function StatCard({
  icon,
  label,
  value,
  accent,
  delay,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  accent: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.45 }}
      className="relative rounded-2xl p-5 overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${accent}22`,
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 0% 0%, ${accent}14 0%, transparent 60%)`,
        }}
      />
      <div className="relative flex items-start justify-between">
        <div>
          <p
            className="text-xs uppercase tracking-[0.2em] mb-2"
            style={{ color: `${accent}99` }}
          >
            {label}
          </p>
          <p
            className="text-3xl font-black"
            style={{
              background: `linear-gradient(135deg, #fff 0%, ${accent} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {value}
          </p>
        </div>
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: `${accent}18`, color: accent }}
        >
          {icon}
        </div>
      </div>
    </motion.div>
  );
}

export default function AdminPanel({ onClose }: { onClose: () => void }) {
  const { actor, isFetching } = useActor();
  const [tab, setTab] = useState<TabId>("dashboard");
  const [bookings, setBookings] = useState<BookingWithStatus[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [visitorCount, setVisitorCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  // Bookings filters
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [statusFilter, setStatusFilter] = useState<BookingStatus | "all">(
    "all",
  );
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Comments filters
  const [commentSearch, setCommentSearch] = useState("");

  async function fetchAll(showRefresh = false) {
    if (!actor) return;
    if (showRefresh) setRefreshing(true);
    else setLoading(true);
    setError("");
    try {
      const [rawBookings, rawComments, visitors] = await Promise.all([
        actor.getAllBookings(),
        actor.getAllComments(),
        actor.getVisitorCount(),
      ]);
      setBookings(
        rawBookings.map((b, i) => ({
          ...b,
          status: "pending" as BookingStatus,
          id: `${b.email}-${b.preferredDate}-${i}`,
        })),
      );
      setComments(rawComments);
      setVisitorCount(Number(visitors));
    } catch {
      setError("Failed to load data. Please try again.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: fetchAll is stable
  useEffect(() => {
    if (!actor || isFetching) return;
    fetchAll();
  }, [actor, isFetching]);

  function cycleStatus(id: string) {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== id) return b;
        const next: Record<BookingStatus, BookingStatus> = {
          pending: "confirmed",
          confirmed: "rejected",
          rejected: "pending",
        };
        return { ...b, status: next[b.status] };
      }),
    );
  }

  function exportCSV() {
    const header = [
      "Name",
      "Email",
      "Phone",
      "Date",
      "Time",
      "Message",
      "Status",
    ];
    const rows = filteredBookings.map((b) => [
      b.name,
      b.email,
      b.phone,
      b.preferredDate,
      b.preferredTime,
      b.message.replace(/,/g, " "),
      b.status,
    ]);
    const csv = [header, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bmw-m5-bookings-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const filteredBookings = useMemo(() => {
    let list = [...bookings];
    if (statusFilter !== "all")
      list = list.filter((b) => b.status === statusFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (b) =>
          b.name.toLowerCase().includes(q) ||
          b.email.toLowerCase().includes(q) ||
          b.phone.includes(q),
      );
    }
    list.sort((a, b) => {
      let av = "";
      let bv = "";
      if (sortField === "name") {
        av = a.name;
        bv = b.name;
      } else if (sortField === "email") {
        av = a.email;
        bv = b.email;
      } else {
        av = a.preferredDate;
        bv = b.preferredDate;
      }
      return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
    });
    return list;
  }, [bookings, search, sortField, sortDir, statusFilter]);

  const filteredComments = useMemo(() => {
    if (!commentSearch.trim()) return comments;
    const q = commentSearch.toLowerCase();
    return comments.filter(
      (c) =>
        c.name.toLowerCase().includes(q) || c.message.toLowerCase().includes(q),
    );
  }, [comments, commentSearch]);

  const statusCounts = useMemo(
    () => ({
      all: bookings.length,
      pending: bookings.filter((b) => b.status === "pending").length,
      confirmed: bookings.filter((b) => b.status === "confirmed").length,
      rejected: bookings.filter((b) => b.status === "rejected").length,
    }),
    [bookings],
  );

  // Get today's bookings
  const todayStr = new Date().toISOString().slice(0, 10);
  const todayBookings = bookings.filter(
    (b) => b.preferredDate === todayStr,
  ).length;

  function toggleSort(field: SortField) {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortField(field);
      setSortDir("asc");
    }
  }

  const TABS: {
    id: TabId;
    label: string;
    icon: React.ReactNode;
    count?: number;
  }[] = [
    { id: "dashboard", label: "Dashboard", icon: <BarChart3 size={15} /> },
    {
      id: "bookings",
      label: "Bookings",
      icon: <Calendar size={15} />,
      count: bookings.length,
    },
    {
      id: "comments",
      label: "Comments",
      icon: <MessageSquare size={15} />,
      count: comments.length,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex flex-col"
      style={{ background: "rgba(5,8,12,0.98)", backdropFilter: "blur(20px)" }}
    >
      {/* Ambient BG */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 10% 0%, rgba(255,68,68,0.08) 0%, transparent 45%), radial-gradient(ellipse at 90% 100%, rgba(0,191,255,0.05) 0%, transparent 45%), radial-gradient(ellipse at 50% 50%, rgba(255,68,68,0.02) 0%, transparent 70%)",
        }}
      />

      {/* ── HEADER ── */}
      <div
        className="relative flex items-center justify-between px-6 py-4 shrink-0"
        style={{
          borderBottom: "1px solid rgba(255,68,68,0.18)",
          background: "rgba(8,11,16,0.9)",
        }}
      >
        <div className="flex items-center gap-4">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,68,68,0.25), rgba(255,68,68,0.08))",
              border: "1px solid rgba(255,68,68,0.35)",
            }}
          >
            <ShieldCheck size={17} style={{ color: "#FF4444" }} />
          </div>
          <div>
            <p
              className="text-[10px] font-semibold tracking-[0.3em] uppercase"
              style={{ color: "rgba(255,68,68,0.65)" }}
            >
              BMW M5 CS
            </p>
            <h2
              className="font-black uppercase tracking-widest text-sm leading-tight"
              style={{
                background: "linear-gradient(135deg, #FFFFFF 0%, #FF4444 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Admin Control Panel
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => fetchAll(true)}
            className="p-2 rounded-lg transition-all duration-200"
            style={{
              border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.45)",
              background: "rgba(255,255,255,0.04)",
            }}
            title="Refresh data"
          >
            <RefreshCw size={15} className={refreshing ? "animate-spin" : ""} />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg transition-colors duration-200"
            style={{
              border: "1px solid rgba(255,68,68,0.3)",
              color: "#FF4444",
              background: "rgba(255,68,68,0.06)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,68,68,0.16)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,68,68,0.06)";
            }}
          >
            <X size={17} />
          </button>
        </div>
      </div>

      {/* ── TAB BAR ── */}
      <div
        className="flex items-center gap-1 px-6 py-3 shrink-0"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all duration-200"
            style={{
              background: tab === t.id ? "rgba(255,68,68,0.14)" : "transparent",
              border:
                tab === t.id
                  ? "1px solid rgba(255,68,68,0.3)"
                  : "1px solid transparent",
              color: tab === t.id ? "#FF4444" : "rgba(255,255,255,0.35)",
            }}
          >
            {t.icon}
            {t.label}
            {t.count !== undefined && (
              <span
                className="px-1.5 py-0.5 rounded-full text-[10px]"
                style={{
                  background:
                    tab === t.id
                      ? "rgba(255,68,68,0.25)"
                      : "rgba(255,255,255,0.08)",
                  color: tab === t.id ? "#FF4444" : "rgba(255,255,255,0.4)",
                }}
              >
                {t.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ── BODY ── */}
      <div className="flex-1 overflow-auto">
        {loading || isFetching ? (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <Loader2
              className="w-8 h-8 animate-spin"
              style={{ color: "#FF4444" }}
            />
            <p
              className="text-xs tracking-widest uppercase"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              Loading data...
            </p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <XCircle size={32} style={{ color: "#FC8181" }} />
            <p className="text-sm" style={{ color: "#FC8181" }}>
              {error}
            </p>
            <button
              type="button"
              onClick={() => fetchAll()}
              className="px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider"
              style={{
                background: "rgba(255,68,68,0.15)",
                border: "1px solid rgba(255,68,68,0.3)",
                color: "#FF4444",
              }}
            >
              Retry
            </button>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {/* ── DASHBOARD TAB ── */}
            {tab === "dashboard" && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="p-6 max-w-5xl mx-auto"
              >
                <div className="mb-6">
                  <h3
                    className="text-lg font-black uppercase tracking-widest"
                    style={{ color: "rgba(255,255,255,0.9)" }}
                  >
                    Overview
                  </h3>
                  <p
                    className="text-xs mt-1"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                  >
                    Real-time snapshot of all activity
                  </p>
                </div>

                {/* Stat Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <StatCard
                    icon={<Calendar size={18} />}
                    label="Total Bookings"
                    value={bookings.length}
                    accent="#FF4444"
                    delay={0}
                  />
                  <StatCard
                    icon={<Clock size={18} />}
                    label="Today's Bookings"
                    value={todayBookings}
                    accent="#F6AD55"
                    delay={0.05}
                  />
                  <StatCard
                    icon={<MessageSquare size={18} />}
                    label="Comments"
                    value={comments.length}
                    accent="#00BFFF"
                    delay={0.1}
                  />
                  <StatCard
                    icon={<Eye size={18} />}
                    label="Total Visitors"
                    value={visitorCount.toLocaleString()}
                    accent="#48BB78"
                    delay={0.15}
                  />
                </div>

                {/* Status breakdown */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="rounded-2xl p-5 mb-6"
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <p
                    className="text-xs uppercase tracking-[0.2em] mb-4"
                    style={{ color: "rgba(255,255,255,0.35)" }}
                  >
                    Booking Status Breakdown
                  </p>
                  <div className="flex flex-col gap-3">
                    {(
                      ["pending", "confirmed", "rejected"] as BookingStatus[]
                    ).map((s) => {
                      const cfg = STATUS_CONFIG[s];
                      const pct = bookings.length
                        ? Math.round((statusCounts[s] / bookings.length) * 100)
                        : 0;
                      return (
                        <div key={s}>
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <span style={{ color: cfg.color }}>
                                {cfg.icon}
                              </span>
                              <span
                                className="text-xs uppercase tracking-wider"
                                style={{ color: cfg.color }}
                              >
                                {cfg.label}
                              </span>
                            </div>
                            <span
                              className="text-xs"
                              style={{ color: "rgba(255,255,255,0.4)" }}
                            >
                              {statusCounts[s]} / {bookings.length} ({pct}%)
                            </span>
                          </div>
                          <div
                            className="h-1.5 rounded-full overflow-hidden"
                            style={{ background: "rgba(255,255,255,0.07)" }}
                          >
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${pct}%` }}
                              transition={{ duration: 0.8, delay: 0.3 }}
                              className="h-full rounded-full"
                              style={{ background: cfg.color }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>

                {/* Recent bookings preview */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="rounded-2xl overflow-hidden"
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <div
                    className="flex items-center justify-between px-5 py-4"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <p
                      className="text-xs uppercase tracking-[0.2em]"
                      style={{ color: "rgba(255,255,255,0.35)" }}
                    >
                      Recent Submissions
                    </p>
                    <button
                      type="button"
                      onClick={() => setTab("bookings")}
                      className="text-[10px] uppercase tracking-widest"
                      style={{ color: "#FF4444" }}
                    >
                      View all →
                    </button>
                  </div>
                  {bookings.length === 0 ? (
                    <div className="py-10 flex flex-col items-center gap-2">
                      <Calendar
                        size={28}
                        style={{ color: "rgba(255,255,255,0.12)" }}
                      />
                      <p
                        className="text-xs"
                        style={{ color: "rgba(255,255,255,0.25)" }}
                      >
                        No bookings yet
                      </p>
                    </div>
                  ) : (
                    bookings.slice(0, 4).map((b, i) => (
                      <div
                        key={b.id}
                        className="flex items-center gap-4 px-5 py-3"
                        style={{
                          borderBottom:
                            i < Math.min(bookings.length - 1, 3)
                              ? "1px solid rgba(255,255,255,0.04)"
                              : "none",
                        }}
                      >
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0"
                          style={{
                            background: "rgba(255,68,68,0.15)",
                            color: "#FF4444",
                          }}
                        >
                          {getInitials(b.name)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p
                            className="text-xs font-semibold truncate"
                            style={{ color: "rgba(255,255,255,0.85)" }}
                          >
                            {b.name}
                          </p>
                          <p
                            className="text-[11px] truncate"
                            style={{ color: "rgba(255,255,255,0.35)" }}
                          >
                            {b.email}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <p
                            className="text-[11px]"
                            style={{ color: "rgba(255,255,255,0.4)" }}
                          >
                            {b.preferredDate}
                          </p>
                          <div
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold mt-0.5"
                            style={{
                              background: STATUS_CONFIG[b.status].bg,
                              color: STATUS_CONFIG[b.status].color,
                            }}
                          >
                            {STATUS_CONFIG[b.status].icon}
                            {STATUS_CONFIG[b.status].label}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </motion.div>

                {/* Recent comments preview */}
                {comments.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="rounded-2xl overflow-hidden mt-4"
                    style={{
                      background: "rgba(255,255,255,0.025)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <div
                      className="flex items-center justify-between px-5 py-4"
                      style={{
                        borderBottom: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <p
                        className="text-xs uppercase tracking-[0.2em]"
                        style={{ color: "rgba(255,255,255,0.35)" }}
                      >
                        Recent Comments
                      </p>
                      <button
                        type="button"
                        onClick={() => setTab("comments")}
                        className="text-[10px] uppercase tracking-widest"
                        style={{ color: "#00BFFF" }}
                      >
                        View all →
                      </button>
                    </div>
                    {comments.slice(0, 3).map((c, i) => (
                      <div
                        key={`${c.name}-${i}`}
                        className="px-5 py-3"
                        style={{
                          borderBottom:
                            i < Math.min(comments.length - 1, 2)
                              ? "1px solid rgba(255,255,255,0.04)"
                              : "none",
                        }}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <div
                            className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold"
                            style={{
                              background: "rgba(0,191,255,0.15)",
                              color: "#00BFFF",
                            }}
                          >
                            {getInitials(c.name)}
                          </div>
                          <span
                            className="text-xs font-semibold"
                            style={{ color: "rgba(255,255,255,0.75)" }}
                          >
                            {c.name}
                          </span>
                        </div>
                        <p
                          className="text-xs pl-8"
                          style={{ color: "rgba(255,255,255,0.4)" }}
                        >
                          {c.message.slice(0, 80)}
                          {c.message.length > 80 ? "..." : ""}
                        </p>
                      </div>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* ── BOOKINGS TAB ── */}
            {tab === "bookings" && (
              <motion.div
                key="bookings"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="p-6 max-w-5xl mx-auto"
              >
                {/* Toolbar */}
                <div className="flex flex-col md:flex-row gap-3 mb-6">
                  {/* Search */}
                  <div className="relative flex-1">
                    <Search
                      size={14}
                      className="absolute left-3 top-1/2 -translate-y-1/2"
                      style={{ color: "rgba(255,255,255,0.3)" }}
                    />
                    <input
                      type="text"
                      placeholder="Search by name, email, phone..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl text-xs outline-none"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "rgba(255,255,255,0.8)",
                      }}
                    />
                  </div>

                  {/* Status filter pills */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {(["all", "pending", "confirmed", "rejected"] as const).map(
                      (s) => {
                        const isActive = statusFilter === s;
                        const cfg =
                          s !== "all"
                            ? STATUS_CONFIG[s]
                            : {
                                color: "rgba(255,255,255,0.6)",
                                bg: "rgba(255,255,255,0.08)",
                              };
                        return (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setStatusFilter(s)}
                            className="px-3 py-1.5 rounded-lg text-[10px] font-semibold uppercase tracking-wider transition-all"
                            style={{
                              background: isActive ? cfg.bg : "transparent",
                              border: `1px solid ${isActive ? `${cfg.color}66` : "rgba(255,255,255,0.1)"}`,
                              color: isActive
                                ? cfg.color
                                : "rgba(255,255,255,0.3)",
                            }}
                          >
                            {s === "all"
                              ? `All (${statusCounts.all})`
                              : `${s} (${statusCounts[s]})`}
                          </button>
                        );
                      },
                    )}
                  </div>

                  {/* Export */}
                  <button
                    type="button"
                    onClick={exportCSV}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all shrink-0"
                    style={{
                      background: "rgba(72,187,120,0.12)",
                      border: "1px solid rgba(72,187,120,0.3)",
                      color: "#48BB78",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        "rgba(72,187,120,0.22)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "rgba(72,187,120,0.12)";
                    }}
                  >
                    <Download size={13} /> Export CSV
                  </button>
                </div>

                {/* Sort header */}
                <div
                  className="hidden md:grid grid-cols-12 gap-3 px-4 py-2 mb-2"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                >
                  {(["name", "email", "date"] as SortField[]).map((f, idx) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => toggleSort(f)}
                      className={`flex items-center gap-1 text-[10px] uppercase tracking-[0.15em] font-semibold transition-colors ${
                        idx === 0
                          ? "col-span-3"
                          : idx === 1
                            ? "col-span-4"
                            : "col-span-3"
                      }`}
                      style={{
                        color:
                          sortField === f ? "#FF4444" : "rgba(255,255,255,0.3)",
                      }}
                    >
                      {f}
                      {sortField === f &&
                        (sortDir === "asc" ? (
                          <ChevronUp size={11} />
                        ) : (
                          <ChevronDown size={11} />
                        ))}
                    </button>
                  ))}
                  <div
                    className="col-span-2 text-[10px] uppercase tracking-[0.15em] text-right"
                    style={{ color: "rgba(255,255,255,0.2)" }}
                  >
                    Status
                  </div>
                </div>

                {filteredBookings.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 gap-3">
                    <Search
                      size={28}
                      style={{ color: "rgba(255,255,255,0.12)" }}
                    />
                    <p
                      className="text-xs"
                      style={{ color: "rgba(255,255,255,0.25)" }}
                    >
                      No bookings match your filters
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {filteredBookings.map((b, i) => {
                      const isExpanded = expandedId === b.id;
                      const cfg = STATUS_CONFIG[b.status];
                      return (
                        <motion.div
                          key={b.id}
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.04 }}
                          className="rounded-xl overflow-hidden"
                          style={{
                            background: "rgba(255,255,255,0.03)",
                            border: `1px solid ${isExpanded ? "rgba(255,68,68,0.2)" : "rgba(255,255,255,0.07)"}`,
                            boxShadow: isExpanded
                              ? "0 0 30px rgba(255,68,68,0.06)"
                              : "none",
                          }}
                        >
                          {/* Main row */}
                          <div
                            className="grid grid-cols-1 md:grid-cols-12 gap-3 px-4 py-4 cursor-pointer"
                            onClick={() =>
                              setExpandedId(isExpanded ? null : b.id)
                            }
                            onKeyDown={(e) =>
                              e.key === "Enter" &&
                              setExpandedId(isExpanded ? null : b.id)
                            }
                          >
                            {/* Avatar + Name */}
                            <div className="md:col-span-3 flex items-center gap-3">
                              <div
                                className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-black shrink-0"
                                style={{
                                  background: "rgba(255,68,68,0.18)",
                                  color: "#FF4444",
                                }}
                              >
                                {getInitials(b.name)}
                              </div>
                              <div className="min-w-0">
                                <p
                                  className="text-sm font-semibold truncate"
                                  style={{ color: "rgba(255,255,255,0.9)" }}
                                >
                                  {b.name}
                                </p>
                                <p
                                  className="text-[11px] md:hidden truncate"
                                  style={{ color: "rgba(255,255,255,0.35)" }}
                                >
                                  {b.email}
                                </p>
                              </div>
                            </div>

                            {/* Email */}
                            <div className="hidden md:flex md:col-span-4 items-center gap-2">
                              <Mail
                                size={12}
                                style={{
                                  color: "rgba(255,255,255,0.2)",
                                  flexShrink: 0,
                                }}
                              />
                              <span
                                className="text-xs truncate"
                                style={{ color: "rgba(255,255,255,0.5)" }}
                              >
                                {b.email}
                              </span>
                            </div>

                            {/* Date */}
                            <div className="hidden md:flex md:col-span-3 items-center gap-2">
                              <Calendar
                                size={12}
                                style={{
                                  color: "rgba(255,255,255,0.2)",
                                  flexShrink: 0,
                                }}
                              />
                              <span
                                className="text-xs"
                                style={{ color: "rgba(255,255,255,0.5)" }}
                              >
                                {b.preferredDate} · {b.preferredTime}
                              </span>
                            </div>

                            {/* Status + expand */}
                            <div className="md:col-span-2 flex items-center justify-between md:justify-end gap-2">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  cycleStatus(b.id);
                                }}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold transition-all"
                                style={{
                                  background: cfg.bg,
                                  color: cfg.color,
                                  border: `1px solid ${cfg.color}44`,
                                }}
                                title="Click to cycle status"
                              >
                                {cfg.icon} {cfg.label}
                              </button>
                              {isExpanded ? (
                                <ChevronUp
                                  size={14}
                                  style={{ color: "rgba(255,255,255,0.3)" }}
                                />
                              ) : (
                                <ChevronDown
                                  size={14}
                                  style={{ color: "rgba(255,255,255,0.3)" }}
                                />
                              )}
                            </div>
                          </div>

                          {/* Expanded detail */}
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className="overflow-hidden"
                              >
                                <div
                                  className="px-4 pb-4 grid grid-cols-1 md:grid-cols-3 gap-4"
                                  style={{
                                    borderTop:
                                      "1px solid rgba(255,255,255,0.06)",
                                  }}
                                >
                                  <div className="pt-4 flex flex-col gap-1">
                                    <span
                                      className="text-[10px] uppercase tracking-[0.2em]"
                                      style={{ color: "rgba(255,68,68,0.6)" }}
                                    >
                                      Phone
                                    </span>
                                    <div className="flex items-center gap-2">
                                      <Phone
                                        size={12}
                                        style={{
                                          color: "rgba(255,255,255,0.3)",
                                        }}
                                      />
                                      <span
                                        className="text-xs"
                                        style={{
                                          color: "rgba(255,255,255,0.7)",
                                        }}
                                      >
                                        {b.phone || "—"}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="pt-4 flex flex-col gap-1">
                                    <span
                                      className="text-[10px] uppercase tracking-[0.2em]"
                                      style={{ color: "rgba(255,68,68,0.6)" }}
                                    >
                                      Email
                                    </span>
                                    <div className="flex items-center gap-2">
                                      <Mail
                                        size={12}
                                        style={{
                                          color: "rgba(255,255,255,0.3)",
                                        }}
                                      />
                                      <span
                                        className="text-xs"
                                        style={{
                                          color: "rgba(255,255,255,0.7)",
                                        }}
                                      >
                                        {b.email}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="pt-4 flex flex-col gap-1">
                                    <span
                                      className="text-[10px] uppercase tracking-[0.2em]"
                                      style={{ color: "rgba(255,68,68,0.6)" }}
                                    >
                                      Scheduled
                                    </span>
                                    <div className="flex items-center gap-2">
                                      <Clock
                                        size={12}
                                        style={{
                                          color: "rgba(255,255,255,0.3)",
                                        }}
                                      />
                                      <span
                                        className="text-xs"
                                        style={{
                                          color: "rgba(255,255,255,0.7)",
                                        }}
                                      >
                                        {b.preferredDate} at {b.preferredTime}
                                      </span>
                                    </div>
                                  </div>
                                  {b.message && (
                                    <div className="md:col-span-3 pt-2 flex flex-col gap-1">
                                      <span
                                        className="text-[10px] uppercase tracking-[0.2em]"
                                        style={{ color: "rgba(255,68,68,0.6)" }}
                                      >
                                        Message
                                      </span>
                                      <div
                                        className="rounded-lg p-3 text-xs leading-relaxed"
                                        style={{
                                          background: "rgba(255,255,255,0.04)",
                                          color: "rgba(255,255,255,0.6)",
                                          border:
                                            "1px solid rgba(255,255,255,0.06)",
                                        }}
                                      >
                                        {b.message}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    })}
                  </div>
                )}

                {filteredBookings.length > 0 && (
                  <p
                    className="text-center text-[11px] mt-6"
                    style={{ color: "rgba(255,255,255,0.2)" }}
                  >
                    Showing {filteredBookings.length} of {bookings.length}{" "}
                    submissions
                  </p>
                )}
              </motion.div>
            )}

            {/* ── COMMENTS TAB ── */}
            {tab === "comments" && (
              <motion.div
                key="comments"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="p-6 max-w-5xl mx-auto"
              >
                {/* Search */}
                <div className="relative mb-6">
                  <Search
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                  />
                  <input
                    type="text"
                    placeholder="Search comments..."
                    value={commentSearch}
                    onChange={(e) => setCommentSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl text-xs outline-none"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "rgba(255,255,255,0.8)",
                    }}
                  />
                </div>

                {filteredComments.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 gap-3">
                    <MessageSquare
                      size={28}
                      style={{ color: "rgba(255,255,255,0.12)" }}
                    />
                    <p
                      className="text-xs"
                      style={{ color: "rgba(255,255,255,0.25)" }}
                    >
                      {comments.length === 0
                        ? "No comments yet"
                        : "No comments match your search"}
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <p
                      className="text-xs tracking-widest uppercase mb-1"
                      style={{ color: "rgba(255,255,255,0.25)" }}
                    >
                      {filteredComments.length} comment
                      {filteredComments.length !== 1 ? "s" : ""}
                    </p>
                    {filteredComments.map((c, i) => (
                      <motion.div
                        key={`${c.name}-${i}`}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.04 }}
                        className="rounded-xl p-5"
                        style={{
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(0,191,255,0.1)",
                        }}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-black shrink-0"
                            style={{
                              background: "rgba(0,191,255,0.15)",
                              color: "#00BFFF",
                            }}
                          >
                            {getInitials(c.name)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <p
                                className="text-sm font-semibold"
                                style={{ color: "rgba(255,255,255,0.9)" }}
                              >
                                {c.name}
                              </p>
                              <span
                                className="text-[10px] px-2 py-0.5 rounded-full"
                                style={{
                                  background: "rgba(0,191,255,0.1)",
                                  color: "#00BFFF",
                                }}
                              >
                                Comment #{i + 1}
                              </span>
                            </div>
                            <p
                              className="text-xs leading-relaxed"
                              style={{ color: "rgba(255,255,255,0.5)" }}
                            >
                              {c.message}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
}
