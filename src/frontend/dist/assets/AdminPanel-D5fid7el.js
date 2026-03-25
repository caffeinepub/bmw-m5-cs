import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, m as motion, S as ShieldCheck, X, A as AnimatePresence, C as ChevronDown } from "./index-DNTSR8Y7.js";
import { u as useActor, C as Calendar, a as Clock, E as Eye, M as Mail, L as Lock, b as CircleAlert } from "./useActor-DHO6rdr6.js";
import { L as LoaderCircle } from "./loader-circle-n7tkj6pL.js";
import { C as CircleCheckBig } from "./circle-check-big-BJXcDKG0.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$7 = [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
  ["path", { d: "M18 17V9", key: "2bz60n" }],
  ["path", { d: "M13 17V5", key: "1frdt8" }],
  ["path", { d: "M8 17v-3", key: "17ska0" }]
];
const ChartColumn = createLucideIcon("chart-column", __iconNode$7);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$6 = [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]];
const ChevronUp = createLucideIcon("chevron-up", __iconNode$6);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "M12 15V3", key: "m9g1x1" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
];
const Download = createLucideIcon("download", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z", key: "1lielz" }]
];
const MessageSquare = createLucideIcon("message-square", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
      key: "9njp5v"
    }
  ]
];
const Phone = createLucideIcon("phone", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
];
const RefreshCw = createLucideIcon("refresh-cw", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode);
const STATUS_CONFIG = {
  pending: {
    label: "Pending",
    color: "#F6AD55",
    bg: "rgba(246,173,85,0.12)",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 12 })
  },
  confirmed: {
    label: "Confirmed",
    color: "#48BB78",
    bg: "rgba(72,187,120,0.12)",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 12 })
  },
  rejected: {
    label: "Rejected",
    color: "#FC8181",
    bg: "rgba(252,129,129,0.12)",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { size: 12 })
  }
};
function getInitials(name) {
  return name.split(" ").map((p) => p[0]).join("").toUpperCase().slice(0, 2);
}
function parseBookingMessage(raw) {
  const SEPARATOR = "\n\n--- User Message ---\n";
  const idx = raw.indexOf(SEPARATOR);
  if (idx === -1) {
    if (raw.includes("BMW M5 CS — Custom Build") || raw.includes("SELECTED OPTIONS:")) {
      return { hasBuild: true, buildLines: raw.split("\n"), userMessage: "" };
    }
    return { hasBuild: false, buildLines: [], userMessage: raw };
  }
  const buildPart = raw.slice(0, idx);
  const msgPart = raw.slice(idx + SEPARATOR.length);
  return {
    hasBuild: true,
    buildLines: buildPart.split("\n"),
    userMessage: msgPart.trim()
  };
}
function BuildSpecCard({ lines }) {
  const optionLines = lines.filter(
    (l) => l.startsWith("•") && !l.startsWith("• Output") && !l.startsWith("• Torque") && !l.startsWith("• 0-60") && !l.startsWith("• Top Speed")
  );
  const perfLines = lines.filter(
    (l) => l.startsWith("• Output") || l.startsWith("• Torque") || l.startsWith("• 0-60") || l.startsWith("• Top Speed")
  );
  const totalLine = lines.find((l) => l.startsWith("Grand Total:"));
  const subtotalLine = lines.find(
    (l) => l.startsWith("Subtotal:") && !l.startsWith("Options")
  );
  const taxLine = lines.find((l) => l.startsWith("Tax"));
  const baseLine = lines.find((l) => l.startsWith("Base Price:"));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-xl overflow-hidden",
      style: {
        border: "1px solid rgba(0,180,255,0.2)",
        background: "rgba(0,180,255,0.03)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "px-4 py-2.5 flex items-center gap-2",
            style: {
              background: "rgba(0,180,255,0.08)",
              borderBottom: "1px solid rgba(0,180,255,0.15)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-1.5 h-1.5 rounded-full",
                  style: { background: "#00b4ff" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-[10px] uppercase tracking-[0.25em] font-bold",
                  style: { color: "#00b4ff" },
                  children: "BMW M5 CS — Custom Build"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          optionLines.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-[9px] uppercase tracking-[0.2em] mb-1",
                style: { color: "rgba(0,180,255,0.5)" },
                children: "Selected Options"
              }
            ),
            baseLine && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center justify-between text-[11px]",
                style: { color: "rgba(255,255,255,0.45)" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Base Price" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: baseLine.split(": ")[1] })
                ]
              }
            ),
            optionLines.map((line) => {
              const clean = line.slice(2);
              const lastParen = clean.lastIndexOf("(");
              const label = lastParen > -1 ? clean.slice(0, lastParen).trim() : clean;
              const priceMatch = clean.match(/\(([^)]+)\)$/);
              const price = priceMatch ? priceMatch[1] : "";
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center justify-between rounded-lg px-3 py-1.5",
                  style: {
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.05)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "text-[11px]",
                        style: { color: "rgba(255,255,255,0.75)" },
                        children: label
                      }
                    ),
                    price && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "text-[11px] font-semibold",
                        style: { color: "#00b4ff" },
                        children: price
                      }
                    )
                  ]
                },
                line
              );
            })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-[9px] uppercase tracking-[0.2em] mb-1",
                  style: { color: "rgba(0,180,255,0.5)" },
                  children: "Pricing Summary"
                }
              ),
              subtotalLine && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center justify-between text-[11px]",
                  style: { color: "rgba(255,255,255,0.5)" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Subtotal" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: subtotalLine.split(": ")[1] })
                  ]
                }
              ),
              taxLine && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center justify-between text-[11px]",
                  style: { color: "rgba(255,255,255,0.5)" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Tax (10%)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: taxLine.split(": ")[1] })
                  ]
                }
              ),
              totalLine && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center justify-between rounded-lg px-3 py-2 mt-1",
                  style: {
                    background: "rgba(0,180,255,0.1)",
                    border: "1px solid rgba(0,180,255,0.25)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "text-xs font-bold",
                        style: { color: "#00b4ff" },
                        children: "Grand Total"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-black", style: { color: "#fff" }, children: totalLine.split(": ")[1] })
                  ]
                }
              )
            ] }),
            perfLines.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-[9px] uppercase tracking-[0.2em] mb-1",
                  style: { color: "rgba(255,68,68,0.5)" },
                  children: "Projected Performance"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-1.5", children: perfLines.map((line) => {
                const clean = line.slice(2);
                const [label, value] = clean.split(": ");
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "rounded-lg px-3 py-2 text-center",
                    style: {
                      background: "rgba(255,68,68,0.06)",
                      border: "1px solid rgba(255,68,68,0.12)"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-[9px] uppercase tracking-[0.15em] mb-0.5",
                          style: { color: "rgba(255,68,68,0.6)" },
                          children: label == null ? void 0 : label.trim()
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-xs font-bold",
                          style: { color: "#fc8181" },
                          children: value == null ? void 0 : value.trim()
                        }
                      )
                    ]
                  },
                  line
                );
              }) })
            ] })
          ] })
        ] })
      ]
    }
  );
}
function StatCard({
  icon,
  label,
  value,
  accent,
  delay
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 24 },
      animate: { opacity: 1, y: 0 },
      transition: { delay, duration: 0.45 },
      className: "relative rounded-2xl p-5 overflow-hidden",
      style: {
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${accent}22`
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 pointer-events-none",
            style: {
              background: `radial-gradient(ellipse at 0% 0%, ${accent}14 0%, transparent 60%)`
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-start justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-xs uppercase tracking-[0.2em] mb-2",
                style: { color: `${accent}99` },
                children: label
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-3xl font-black",
                style: {
                  background: `linear-gradient(135deg, #fff 0%, ${accent} 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text"
                },
                children: value
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-10 h-10 rounded-xl flex items-center justify-center",
              style: { background: `${accent}18`, color: accent },
              children: icon
            }
          )
        ] })
      ]
    }
  );
}
function AdminPanel({ onClose }) {
  const { actor, isFetching } = useActor();
  const [tab, setTab] = reactExports.useState("dashboard");
  const [bookings, setBookings] = reactExports.useState([]);
  const [comments, setComments] = reactExports.useState([]);
  const [visitorCount, setVisitorCount] = reactExports.useState(0);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState("");
  const [refreshing, setRefreshing] = reactExports.useState(false);
  const [search, setSearch] = reactExports.useState("");
  const [sortField, setSortField] = reactExports.useState("date");
  const [sortDir, setSortDir] = reactExports.useState("desc");
  const [statusFilter, setStatusFilter] = reactExports.useState(
    "all"
  );
  const [expandedId, setExpandedId] = reactExports.useState(null);
  const [commentSearch, setCommentSearch] = reactExports.useState("");
  async function fetchAll(showRefresh = false) {
    if (!actor) return;
    if (showRefresh) setRefreshing(true);
    else setLoading(true);
    setError("");
    try {
      const [rawBookings, rawComments, visitors] = await Promise.all([
        actor.getAllBookings(),
        actor.getAllComments(),
        actor.getVisitorCount()
      ]);
      setBookings(
        rawBookings.map((b, i) => ({
          ...b,
          status: b.status || "pending",
          locked: b.locked ?? false,
          id: `${b.email}-${b.preferredDate}-${i}`,
          backendId: b.id
        }))
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
  reactExports.useEffect(() => {
    if (!actor || isFetching) return;
    fetchAll();
  }, [actor, isFetching]);
  async function cycleStatus(id) {
    const booking = bookings.find((b) => b.id === id);
    if (!booking || booking.locked) return;
    const next = {
      pending: "confirmed",
      confirmed: "rejected",
      rejected: "pending"
    };
    const newStatus = next[booking.status];
    setBookings(
      (prev) => prev.map((b) => b.id === id ? { ...b, status: newStatus } : b)
    );
    try {
      if (actor) await actor.updateBookingStatus(booking.backendId, newStatus);
    } catch (e) {
      console.error("Failed to persist status", e);
    }
  }
  async function setStatus(id, status) {
    const booking = bookings.find((b) => b.id === id);
    if (!booking || booking.locked) return;
    setBookings(
      (prev) => prev.map((b) => b.id === id ? { ...b, status } : b)
    );
    try {
      if (actor) await actor.updateBookingStatus(booking.backendId, status);
    } catch (e) {
      console.error("Failed to persist status", e);
    }
  }
  async function toggleLock(id) {
    const booking = bookings.find((b) => b.id === id);
    if (!booking) return;
    const newLocked = !booking.locked;
    setBookings(
      (prev) => prev.map((b) => b.id === id ? { ...b, locked: newLocked } : b)
    );
    try {
      if (actor) await actor.updateBookingLock(booking.backendId, newLocked);
    } catch (e) {
      console.error("Failed to persist lock", e);
    }
  }
  function exportCSV() {
    const header = [
      "Name",
      "Email",
      "Phone",
      "Date",
      "Time",
      "Message",
      "Status"
    ];
    const rows = filteredBookings.map((b) => [
      b.name,
      b.email,
      b.phone,
      b.preferredDate,
      b.preferredTime,
      b.message.replace(/,/g, " "),
      b.status
    ]);
    const csv = [header, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bmw-m5-bookings-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }
  const filteredBookings = reactExports.useMemo(() => {
    let list = [...bookings];
    if (statusFilter !== "all")
      list = list.filter((b) => b.status === statusFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (b) => b.name.toLowerCase().includes(q) || b.email.toLowerCase().includes(q) || b.phone.includes(q)
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
  const filteredComments = reactExports.useMemo(() => {
    if (!commentSearch.trim()) return comments;
    const q = commentSearch.toLowerCase();
    return comments.filter(
      (c) => c.name.toLowerCase().includes(q) || c.message.toLowerCase().includes(q)
    );
  }, [comments, commentSearch]);
  const statusCounts = reactExports.useMemo(
    () => ({
      all: bookings.length,
      pending: bookings.filter((b) => b.status === "pending").length,
      confirmed: bookings.filter((b) => b.status === "confirmed").length,
      rejected: bookings.filter((b) => b.status === "rejected").length
    }),
    [bookings]
  );
  const todayStr = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  const todayBookings = bookings.filter(
    (b) => b.preferredDate === todayStr
  ).length;
  function toggleSort(field) {
    if (sortField === field) setSortDir((d) => d === "asc" ? "desc" : "asc");
    else {
      setSortField(field);
      setSortDir("asc");
    }
  }
  const TABS = [
    { id: "dashboard", label: "Dashboard", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { size: 15 }) },
    {
      id: "bookings",
      label: "Bookings",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 15 }),
      count: bookings.length
    },
    {
      id: "comments",
      label: "Comments",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { size: 15 }),
      count: comments.length
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      className: "fixed inset-0 z-[200] flex flex-col",
      style: { background: "rgba(5,8,12,0.98)", backdropFilter: "blur(20px)" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 pointer-events-none",
            style: {
              background: "radial-gradient(ellipse at 10% 0%, rgba(255,68,68,0.08) 0%, transparent 45%), radial-gradient(ellipse at 90% 100%, rgba(0,191,255,0.05) 0%, transparent 45%), radial-gradient(ellipse at 50% 50%, rgba(255,68,68,0.02) 0%, transparent 70%)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "relative flex items-center justify-between px-6 py-4 shrink-0",
            style: {
              borderBottom: "1px solid rgba(255,68,68,0.18)",
              background: "rgba(8,11,16,0.9)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-9 h-9 rounded-xl flex items-center justify-center",
                    style: {
                      background: "linear-gradient(135deg, rgba(255,68,68,0.25), rgba(255,68,68,0.08))",
                      border: "1px solid rgba(255,68,68,0.35)"
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { size: 17, style: { color: "#FF4444" } })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-[10px] font-semibold tracking-[0.3em] uppercase",
                      style: { color: "rgba(255,68,68,0.65)" },
                      children: "BMW M5 CS"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h2",
                    {
                      className: "font-black uppercase tracking-widest text-sm leading-tight",
                      style: {
                        background: "linear-gradient(135deg, #FFFFFF 0%, #FF4444 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text"
                      },
                      children: "Admin Control Panel"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => fetchAll(true),
                    className: "p-2 rounded-lg transition-all duration-200",
                    style: {
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "rgba(255,255,255,0.45)",
                      background: "rgba(255,255,255,0.04)"
                    },
                    title: "Refresh data",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 15, className: refreshing ? "animate-spin" : "" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: onClose,
                    className: "p-2 rounded-lg transition-colors duration-200",
                    style: {
                      border: "1px solid rgba(255,68,68,0.3)",
                      color: "#FF4444",
                      background: "rgba(255,68,68,0.06)"
                    },
                    onMouseEnter: (e) => {
                      e.currentTarget.style.background = "rgba(255,68,68,0.16)";
                    },
                    onMouseLeave: (e) => {
                      e.currentTarget.style.background = "rgba(255,68,68,0.06)";
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 17 })
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex items-center gap-1 px-6 py-3 shrink-0",
            style: { borderBottom: "1px solid rgba(255,255,255,0.05)" },
            children: TABS.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setTab(t.id),
                className: "flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all duration-200",
                style: {
                  background: tab === t.id ? "rgba(255,68,68,0.14)" : "transparent",
                  border: tab === t.id ? "1px solid rgba(255,68,68,0.3)" : "1px solid transparent",
                  color: tab === t.id ? "#FF4444" : "rgba(255,255,255,0.35)"
                },
                children: [
                  t.icon,
                  t.label,
                  t.count !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "px-1.5 py-0.5 rounded-full text-[10px]",
                      style: {
                        background: tab === t.id ? "rgba(255,68,68,0.25)" : "rgba(255,255,255,0.08)",
                        color: tab === t.id ? "#FF4444" : "rgba(255,255,255,0.4)"
                      },
                      children: t.count
                    }
                  )
                ]
              },
              t.id
            ))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-auto", children: loading || isFetching ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center h-64 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            LoaderCircle,
            {
              className: "w-8 h-8 animate-spin",
              style: { color: "#FF4444" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-xs tracking-widest uppercase",
              style: { color: "rgba(255,255,255,0.3)" },
              children: "Loading data..."
            }
          )
        ] }) : error ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center h-64 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { size: 32, style: { color: "#FC8181" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", style: { color: "#FC8181" }, children: error }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => fetchAll(),
              className: "px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider",
              style: {
                background: "rgba(255,68,68,0.15)",
                border: "1px solid rgba(255,68,68,0.3)",
                color: "#FF4444"
              },
              children: "Retry"
            }
          )
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { mode: "wait", children: [
          tab === "dashboard" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: -20 },
              animate: { opacity: 1, x: 0 },
              exit: { opacity: 0, x: 20 },
              transition: { duration: 0.3 },
              className: "p-6 max-w-5xl mx-auto",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h3",
                    {
                      className: "text-lg font-black uppercase tracking-widest",
                      style: { color: "rgba(255,255,255,0.9)" },
                      children: "Overview"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-xs mt-1",
                      style: { color: "rgba(255,255,255,0.3)" },
                      children: "Real-time snapshot of all activity"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-8", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    StatCard,
                    {
                      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 18 }),
                      label: "Total Bookings",
                      value: bookings.length,
                      accent: "#FF4444",
                      delay: 0
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    StatCard,
                    {
                      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 18 }),
                      label: "Today's Bookings",
                      value: todayBookings,
                      accent: "#F6AD55",
                      delay: 0.05
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    StatCard,
                    {
                      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { size: 18 }),
                      label: "Comments",
                      value: comments.length,
                      accent: "#00BFFF",
                      delay: 0.1
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    StatCard,
                    {
                      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 18 }),
                      label: "Total Visitors",
                      value: visitorCount.toLocaleString(),
                      accent: "#48BB78",
                      delay: 0.15
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0 },
                    transition: { delay: 0.2 },
                    className: "rounded-2xl p-5 mb-6",
                    style: {
                      background: "rgba(255,255,255,0.025)",
                      border: "1px solid rgba(255,255,255,0.07)"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-xs uppercase tracking-[0.2em] mb-4",
                          style: { color: "rgba(255,255,255,0.35)" },
                          children: "Booking Status Breakdown"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", children: ["pending", "confirmed", "rejected"].map((s) => {
                        const cfg = STATUS_CONFIG[s];
                        const pct = bookings.length ? Math.round(statusCounts[s] / bookings.length * 100) : 0;
                        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: cfg.color }, children: cfg.icon }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "span",
                                {
                                  className: "text-xs uppercase tracking-wider",
                                  style: { color: cfg.color },
                                  children: cfg.label
                                }
                              )
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "span",
                              {
                                className: "text-xs",
                                style: { color: "rgba(255,255,255,0.4)" },
                                children: [
                                  statusCounts[s],
                                  " / ",
                                  bookings.length,
                                  " (",
                                  pct,
                                  "%)"
                                ]
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: "h-1.5 rounded-full overflow-hidden",
                              style: { background: "rgba(255,255,255,0.07)" },
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                                motion.div,
                                {
                                  initial: { width: 0 },
                                  animate: { width: `${pct}%` },
                                  transition: { duration: 0.8, delay: 0.3 },
                                  className: "h-full rounded-full",
                                  style: { background: cfg.color }
                                }
                              )
                            }
                          )
                        ] }, s);
                      }) })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0 },
                    transition: { delay: 0.25 },
                    className: "rounded-2xl overflow-hidden",
                    style: {
                      background: "rgba(255,255,255,0.025)",
                      border: "1px solid rgba(255,255,255,0.07)"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "flex items-center justify-between px-5 py-4",
                          style: { borderBottom: "1px solid rgba(255,255,255,0.06)" },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "p",
                              {
                                className: "text-xs uppercase tracking-[0.2em]",
                                style: { color: "rgba(255,255,255,0.35)" },
                                children: "Recent Submissions"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "button",
                              {
                                type: "button",
                                onClick: () => setTab("bookings"),
                                className: "text-[10px] uppercase tracking-widest",
                                style: { color: "#FF4444" },
                                children: "View all →"
                              }
                            )
                          ]
                        }
                      ),
                      bookings.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-10 flex flex-col items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Calendar,
                          {
                            size: 28,
                            style: { color: "rgba(255,255,255,0.12)" }
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: "text-xs",
                            style: { color: "rgba(255,255,255,0.25)" },
                            children: "No bookings yet"
                          }
                        )
                      ] }) : bookings.slice(0, 4).map((b, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "flex items-center gap-4 px-5 py-3",
                          style: {
                            borderBottom: i < Math.min(bookings.length - 1, 3) ? "1px solid rgba(255,255,255,0.04)" : "none"
                          },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                className: "w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0",
                                style: {
                                  background: "rgba(255,68,68,0.15)",
                                  color: "#FF4444"
                                },
                                children: getInitials(b.name)
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "p",
                                {
                                  className: "text-xs font-semibold truncate",
                                  style: { color: "rgba(255,255,255,0.85)" },
                                  children: b.name
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "p",
                                {
                                  className: "text-[11px] truncate",
                                  style: { color: "rgba(255,255,255,0.35)" },
                                  children: b.email
                                }
                              )
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "p",
                                {
                                  className: "text-[11px]",
                                  style: { color: "rgba(255,255,255,0.4)" },
                                  children: b.preferredDate
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                "div",
                                {
                                  className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold mt-0.5",
                                  style: {
                                    background: STATUS_CONFIG[b.status].bg,
                                    color: STATUS_CONFIG[b.status].color
                                  },
                                  children: [
                                    STATUS_CONFIG[b.status].icon,
                                    STATUS_CONFIG[b.status].label
                                  ]
                                }
                              )
                            ] })
                          ]
                        },
                        b.id
                      ))
                    ]
                  }
                ),
                comments.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0 },
                    transition: { delay: 0.3 },
                    className: "rounded-2xl overflow-hidden mt-4",
                    style: {
                      background: "rgba(255,255,255,0.025)",
                      border: "1px solid rgba(255,255,255,0.07)"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "flex items-center justify-between px-5 py-4",
                          style: {
                            borderBottom: "1px solid rgba(255,255,255,0.06)"
                          },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "p",
                              {
                                className: "text-xs uppercase tracking-[0.2em]",
                                style: { color: "rgba(255,255,255,0.35)" },
                                children: "Recent Comments"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "button",
                              {
                                type: "button",
                                onClick: () => setTab("comments"),
                                className: "text-[10px] uppercase tracking-widest",
                                style: { color: "#00BFFF" },
                                children: "View all →"
                              }
                            )
                          ]
                        }
                      ),
                      comments.slice(0, 3).map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "px-5 py-3",
                          style: {
                            borderBottom: i < Math.min(comments.length - 1, 2) ? "1px solid rgba(255,255,255,0.04)" : "none"
                          },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "div",
                                {
                                  className: "w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold",
                                  style: {
                                    background: "rgba(0,191,255,0.15)",
                                    color: "#00BFFF"
                                  },
                                  children: getInitials(c.name)
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "span",
                                {
                                  className: "text-xs font-semibold",
                                  style: { color: "rgba(255,255,255,0.75)" },
                                  children: c.name
                                }
                              )
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "p",
                              {
                                className: "text-xs pl-8",
                                style: { color: "rgba(255,255,255,0.4)" },
                                children: [
                                  c.message.slice(0, 80),
                                  c.message.length > 80 ? "..." : ""
                                ]
                              }
                            )
                          ]
                        },
                        `${c.name}-${i}`
                      ))
                    ]
                  }
                )
              ]
            },
            "dashboard"
          ),
          tab === "bookings" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: -20 },
              animate: { opacity: 1, x: 0 },
              exit: { opacity: 0, x: 20 },
              transition: { duration: 0.3 },
              className: "p-6 max-w-5xl mx-auto",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row gap-3 mb-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Search,
                      {
                        size: 14,
                        className: "absolute left-3 top-1/2 -translate-y-1/2",
                        style: { color: "rgba(255,255,255,0.3)" }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "text",
                        placeholder: "Search by name, email, phone...",
                        value: search,
                        onChange: (e) => setSearch(e.target.value),
                        className: "w-full pl-9 pr-4 py-2.5 rounded-xl text-xs outline-none",
                        style: {
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          color: "rgba(255,255,255,0.8)"
                        }
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 flex-wrap", children: ["all", "pending", "confirmed", "rejected"].map(
                    (s) => {
                      const isActive = statusFilter === s;
                      const cfg = s !== "all" ? STATUS_CONFIG[s] : {
                        color: "rgba(255,255,255,0.6)",
                        bg: "rgba(255,255,255,0.08)"
                      };
                      return /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => setStatusFilter(s),
                          className: "px-3 py-1.5 rounded-lg text-[10px] font-semibold uppercase tracking-wider transition-all",
                          style: {
                            background: isActive ? cfg.bg : "transparent",
                            border: `1px solid ${isActive ? `${cfg.color}66` : "rgba(255,255,255,0.1)"}`,
                            color: isActive ? cfg.color : "rgba(255,255,255,0.3)"
                          },
                          children: s === "all" ? `All (${statusCounts.all})` : `${s} (${statusCounts[s]})`
                        },
                        s
                      );
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: exportCSV,
                      className: "flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all shrink-0",
                      style: {
                        background: "rgba(72,187,120,0.12)",
                        border: "1px solid rgba(72,187,120,0.3)",
                        color: "#48BB78"
                      },
                      onMouseEnter: (e) => {
                        e.currentTarget.style.background = "rgba(72,187,120,0.22)";
                      },
                      onMouseLeave: (e) => {
                        e.currentTarget.style.background = "rgba(72,187,120,0.12)";
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 13 }),
                        " Export CSV"
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "hidden md:grid grid-cols-12 gap-3 px-4 py-2 mb-2",
                    style: { borderBottom: "1px solid rgba(255,255,255,0.06)" },
                    children: [
                      ["name", "email", "date"].map((f, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          onClick: () => toggleSort(f),
                          className: `flex items-center gap-1 text-[10px] uppercase tracking-[0.15em] font-semibold transition-colors ${idx === 0 ? "col-span-3" : idx === 1 ? "col-span-4" : "col-span-3"}`,
                          style: {
                            color: sortField === f ? "#FF4444" : "rgba(255,255,255,0.3)"
                          },
                          children: [
                            f,
                            sortField === f && (sortDir === "asc" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { size: 11 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { size: 11 }))
                          ]
                        },
                        f
                      )),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "col-span-2 text-[10px] uppercase tracking-[0.15em] text-right",
                          style: { color: "rgba(255,255,255,0.2)" },
                          children: "Status"
                        }
                      )
                    ]
                  }
                ),
                filteredBookings.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-20 gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Search,
                    {
                      size: 28,
                      style: { color: "rgba(255,255,255,0.12)" }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-xs",
                      style: { color: "rgba(255,255,255,0.25)" },
                      children: "No bookings match your filters"
                    }
                  )
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", children: filteredBookings.map((b, i) => {
                  const isExpanded = expandedId === b.id;
                  const cfg = STATUS_CONFIG[b.status];
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.div,
                    {
                      initial: { opacity: 0, y: 16 },
                      animate: { opacity: 1, y: 0 },
                      transition: { delay: i * 0.04 },
                      className: "rounded-xl overflow-hidden",
                      style: {
                        background: "rgba(255,255,255,0.03)",
                        border: `1px solid ${isExpanded ? "rgba(255,68,68,0.2)" : "rgba(255,255,255,0.07)"}`,
                        boxShadow: isExpanded ? "0 0 30px rgba(255,68,68,0.06)" : "none"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "div",
                          {
                            className: "grid grid-cols-1 md:grid-cols-12 gap-3 px-4 py-4 cursor-pointer",
                            onClick: () => setExpandedId(isExpanded ? null : b.id),
                            onKeyDown: (e) => e.key === "Enter" && setExpandedId(isExpanded ? null : b.id),
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-3 flex items-center gap-3", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "div",
                                  {
                                    className: "w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-black shrink-0",
                                    style: {
                                      background: "rgba(255,68,68,0.18)",
                                      color: "#FF4444"
                                    },
                                    children: getInitials(b.name)
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    "p",
                                    {
                                      className: "text-sm font-semibold truncate",
                                      style: { color: "rgba(255,255,255,0.9)" },
                                      children: b.name
                                    }
                                  ),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    "p",
                                    {
                                      className: "text-[11px] md:hidden truncate",
                                      style: { color: "rgba(255,255,255,0.35)" },
                                      children: b.email
                                    }
                                  )
                                ] })
                              ] }),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:flex md:col-span-4 items-center gap-2", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  Mail,
                                  {
                                    size: 12,
                                    style: {
                                      color: "rgba(255,255,255,0.2)",
                                      flexShrink: 0
                                    }
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "span",
                                  {
                                    className: "text-xs truncate",
                                    style: { color: "rgba(255,255,255,0.5)" },
                                    children: b.email
                                  }
                                )
                              ] }),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:flex md:col-span-3 items-center gap-2", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  Calendar,
                                  {
                                    size: 12,
                                    style: {
                                      color: "rgba(255,255,255,0.2)",
                                      flexShrink: 0
                                    }
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                  "span",
                                  {
                                    className: "text-xs",
                                    style: { color: "rgba(255,255,255,0.5)" },
                                    children: [
                                      b.preferredDate,
                                      " · ",
                                      b.preferredTime
                                    ]
                                  }
                                )
                              ] }),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2 flex items-center justify-between md:justify-end gap-2", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                  "button",
                                  {
                                    type: "button",
                                    onClick: (e) => {
                                      e.stopPropagation();
                                      if (!b.locked) cycleStatus(b.id);
                                    },
                                    disabled: b.locked,
                                    className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-70",
                                    style: {
                                      background: cfg.bg,
                                      color: cfg.color,
                                      border: `1px solid ${cfg.color}44`
                                    },
                                    title: b.locked ? "Booking is locked" : "Click to cycle status",
                                    children: [
                                      cfg.icon,
                                      " ",
                                      cfg.label
                                    ]
                                  }
                                ),
                                isExpanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  ChevronUp,
                                  {
                                    size: 14,
                                    style: { color: "rgba(255,255,255,0.3)" }
                                  }
                                ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  ChevronDown,
                                  {
                                    size: 14,
                                    style: { color: "rgba(255,255,255,0.3)" }
                                  }
                                )
                              ] })
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isExpanded && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          motion.div,
                          {
                            initial: { height: 0, opacity: 0 },
                            animate: { height: "auto", opacity: 1 },
                            exit: { height: 0, opacity: 0 },
                            transition: { duration: 0.25 },
                            className: "overflow-hidden",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "div",
                              {
                                className: "px-4 pb-4 grid grid-cols-1 md:grid-cols-3 gap-4",
                                style: {
                                  borderTop: "1px solid rgba(255,255,255,0.06)"
                                },
                                children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4 flex flex-col gap-1", children: [
                                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                                      "span",
                                      {
                                        className: "text-[10px] uppercase tracking-[0.2em]",
                                        style: { color: "rgba(255,68,68,0.6)" },
                                        children: "Phone"
                                      }
                                    ),
                                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                                        Phone,
                                        {
                                          size: 12,
                                          style: {
                                            color: "rgba(255,255,255,0.3)"
                                          }
                                        }
                                      ),
                                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                                        "span",
                                        {
                                          className: "text-xs",
                                          style: {
                                            color: "rgba(255,255,255,0.7)"
                                          },
                                          children: b.phone || "—"
                                        }
                                      )
                                    ] })
                                  ] }),
                                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4 flex flex-col gap-1", children: [
                                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                                      "span",
                                      {
                                        className: "text-[10px] uppercase tracking-[0.2em]",
                                        style: { color: "rgba(255,68,68,0.6)" },
                                        children: "Email"
                                      }
                                    ),
                                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                                        Mail,
                                        {
                                          size: 12,
                                          style: {
                                            color: "rgba(255,255,255,0.3)"
                                          }
                                        }
                                      ),
                                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                                        "span",
                                        {
                                          className: "text-xs",
                                          style: {
                                            color: "rgba(255,255,255,0.7)"
                                          },
                                          children: b.email
                                        }
                                      )
                                    ] })
                                  ] }),
                                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4 flex flex-col gap-1", children: [
                                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                                      "span",
                                      {
                                        className: "text-[10px] uppercase tracking-[0.2em]",
                                        style: { color: "rgba(255,68,68,0.6)" },
                                        children: "Scheduled"
                                      }
                                    ),
                                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                                        Clock,
                                        {
                                          size: 12,
                                          style: {
                                            color: "rgba(255,255,255,0.3)"
                                          }
                                        }
                                      ),
                                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                        "span",
                                        {
                                          className: "text-xs",
                                          style: {
                                            color: "rgba(255,255,255,0.7)"
                                          },
                                          children: [
                                            b.preferredDate,
                                            " at ",
                                            b.preferredTime
                                          ]
                                        }
                                      )
                                    ] })
                                  ] }),
                                  b.message && (() => {
                                    const parsed = parseBookingMessage(
                                      b.message
                                    );
                                    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                                      parsed.hasBuild && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-3 pt-2 flex flex-col gap-1.5", children: [
                                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                                          "span",
                                          {
                                            className: "text-[10px] uppercase tracking-[0.2em]",
                                            style: {
                                              color: "rgba(0,180,255,0.6)"
                                            },
                                            children: "Custom Build"
                                          }
                                        ),
                                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                                          BuildSpecCard,
                                          {
                                            lines: parsed.buildLines
                                          }
                                        )
                                      ] }),
                                      parsed.userMessage && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-3 pt-2 flex flex-col gap-1", children: [
                                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                                          "span",
                                          {
                                            className: "text-[10px] uppercase tracking-[0.2em]",
                                            style: {
                                              color: "rgba(255,68,68,0.6)"
                                            },
                                            children: "Message"
                                          }
                                        ),
                                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                                          "div",
                                          {
                                            className: "rounded-lg p-3 text-xs leading-relaxed",
                                            style: {
                                              background: "rgba(255,255,255,0.04)",
                                              color: "rgba(255,255,255,0.6)",
                                              border: "1px solid rgba(255,255,255,0.06)"
                                            },
                                            children: parsed.userMessage
                                          }
                                        )
                                      ] }),
                                      !parsed.hasBuild && !parsed.userMessage && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-3 pt-2 flex flex-col gap-1", children: [
                                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                                          "span",
                                          {
                                            className: "text-[10px] uppercase tracking-[0.2em]",
                                            style: {
                                              color: "rgba(255,68,68,0.6)"
                                            },
                                            children: "Message"
                                          }
                                        ),
                                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                                          "div",
                                          {
                                            className: "rounded-lg p-3 text-xs leading-relaxed",
                                            style: {
                                              background: "rgba(255,255,255,0.04)",
                                              color: "rgba(255,255,255,0.6)",
                                              border: "1px solid rgba(255,255,255,0.06)"
                                            },
                                            children: b.message
                                          }
                                        )
                                      ] })
                                    ] });
                                  })(),
                                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                    "div",
                                    {
                                      className: "md:col-span-3 pt-3 flex items-center gap-3 border-t flex-wrap",
                                      style: {
                                        borderColor: "rgba(255,255,255,0.06)"
                                      },
                                      children: [
                                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                                          "span",
                                          {
                                            className: "text-[10px] uppercase tracking-[0.2em] mr-auto",
                                            style: { color: "rgba(255,255,255,0.3)" },
                                            children: "Action"
                                          }
                                        ),
                                        b.locked && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                          "span",
                                          {
                                            className: "inline-flex items-center gap-1.5 text-[10px] px-3 py-1 rounded-full",
                                            style: {
                                              background: "rgba(251,191,36,0.1)",
                                              color: "#fbbf24",
                                              border: "1px solid rgba(251,191,36,0.3)"
                                            },
                                            children: [
                                              /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { size: 10 }),
                                              " Decision locked"
                                            ]
                                          }
                                        ),
                                        !b.locked && b.status !== "confirmed" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                          "button",
                                          {
                                            type: "button",
                                            onClick: (e) => {
                                              e.stopPropagation();
                                              setStatus(b.id, "confirmed");
                                            },
                                            className: "inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all hover:scale-105 active:scale-95",
                                            style: {
                                              background: "rgba(34,197,94,0.15)",
                                              color: "#4ade80",
                                              border: "1px solid rgba(34,197,94,0.35)"
                                            },
                                            children: [
                                              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 12 }),
                                              " Accept"
                                            ]
                                          }
                                        ),
                                        !b.locked && b.status !== "rejected" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                          "button",
                                          {
                                            type: "button",
                                            onClick: (e) => {
                                              e.stopPropagation();
                                              setStatus(b.id, "rejected");
                                            },
                                            className: "inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all hover:scale-105 active:scale-95",
                                            style: {
                                              background: "rgba(239,68,68,0.15)",
                                              color: "#f87171",
                                              border: "1px solid rgba(239,68,68,0.35)"
                                            },
                                            children: [
                                              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { size: 12 }),
                                              " Reject"
                                            ]
                                          }
                                        ),
                                        b.status === "pending" && !b.locked && /* @__PURE__ */ jsxRuntimeExports.jsx(
                                          "span",
                                          {
                                            className: "text-[10px]",
                                            style: {
                                              color: "rgba(255,255,255,0.2)"
                                            },
                                            children: "Awaiting decision"
                                          }
                                        ),
                                        (b.status === "confirmed" || b.status === "rejected") && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                          "button",
                                          {
                                            type: "button",
                                            onClick: (e) => {
                                              e.stopPropagation();
                                              toggleLock(b.id);
                                            },
                                            className: "inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all hover:scale-105 active:scale-95 ml-auto",
                                            style: {
                                              background: b.locked ? "rgba(251,191,36,0.18)" : "rgba(99,102,241,0.15)",
                                              color: b.locked ? "#fbbf24" : "#a5b4fc",
                                              border: b.locked ? "1px solid rgba(251,191,36,0.4)" : "1px solid rgba(99,102,241,0.35)"
                                            },
                                            children: [
                                              /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { size: 12 }),
                                              b.locked ? "Unlock" : "Lock"
                                            ]
                                          }
                                        )
                                      ]
                                    }
                                  )
                                ]
                              }
                            )
                          }
                        ) })
                      ]
                    },
                    b.id
                  );
                }) }),
                filteredBookings.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "p",
                  {
                    className: "text-center text-[11px] mt-6",
                    style: { color: "rgba(255,255,255,0.2)" },
                    children: [
                      "Showing ",
                      filteredBookings.length,
                      " of ",
                      bookings.length,
                      " ",
                      "submissions"
                    ]
                  }
                )
              ]
            },
            "bookings"
          ),
          tab === "comments" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: -20 },
              animate: { opacity: 1, x: 0 },
              exit: { opacity: 0, x: 20 },
              transition: { duration: 0.3 },
              className: "p-6 max-w-5xl mx-auto",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Search,
                    {
                      size: 14,
                      className: "absolute left-3 top-1/2 -translate-y-1/2",
                      style: { color: "rgba(255,255,255,0.3)" }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      type: "text",
                      placeholder: "Search comments...",
                      value: commentSearch,
                      onChange: (e) => setCommentSearch(e.target.value),
                      className: "w-full pl-9 pr-4 py-2.5 rounded-xl text-xs outline-none",
                      style: {
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "rgba(255,255,255,0.8)"
                      }
                    }
                  )
                ] }),
                filteredComments.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-20 gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    MessageSquare,
                    {
                      size: 28,
                      style: { color: "rgba(255,255,255,0.12)" }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-xs",
                      style: { color: "rgba(255,255,255,0.25)" },
                      children: comments.length === 0 ? "No comments yet" : "No comments match your search"
                    }
                  )
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "p",
                    {
                      className: "text-xs tracking-widest uppercase mb-1",
                      style: { color: "rgba(255,255,255,0.25)" },
                      children: [
                        filteredComments.length,
                        " comment",
                        filteredComments.length !== 1 ? "s" : ""
                      ]
                    }
                  ),
                  filteredComments.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      initial: { opacity: 0, y: 16 },
                      animate: { opacity: 1, y: 0 },
                      transition: { delay: i * 0.04 },
                      className: "rounded-xl p-5",
                      style: {
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(0,191,255,0.1)"
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "w-10 h-10 rounded-full flex items-center justify-center text-xs font-black shrink-0",
                            style: {
                              background: "rgba(0,191,255,0.15)",
                              color: "#00BFFF"
                            },
                            children: getInitials(c.name)
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 mb-2", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "p",
                              {
                                className: "text-sm font-semibold",
                                style: { color: "rgba(255,255,255,0.9)" },
                                children: c.name
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "span",
                              {
                                className: "text-[10px] px-2 py-0.5 rounded-full",
                                style: {
                                  background: "rgba(0,191,255,0.1)",
                                  color: "#00BFFF"
                                },
                                children: [
                                  "Comment #",
                                  i + 1
                                ]
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "p",
                            {
                              className: "text-xs leading-relaxed",
                              style: { color: "rgba(255,255,255,0.5)" },
                              children: c.message
                            }
                          )
                        ] })
                      ] })
                    },
                    `${c.name}-${i}`
                  ))
                ] })
              ]
            },
            "comments"
          )
        ] }) })
      ]
    }
  );
}
export {
  AdminPanel as default
};
