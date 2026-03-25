import { c as createLucideIcon, u as useAuth, r as reactExports, j as jsxRuntimeExports, m as motion, X, U as User, A as AnimatePresence, L as LogOut, S as ShieldCheck } from "./index-DNTSR8Y7.js";
import { u as useActor, M as Mail, C as Calendar, L as Lock, b as CircleAlert, a as Clock, E as Eye } from "./useActor-DHO6rdr6.js";
import { C as CircleCheckBig } from "./circle-check-big-BJXcDKG0.js";
import { E as ExternalLink } from "./external-link-BPdadISQ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    {
      d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
      key: "169zse"
    }
  ]
];
const Activity = createLucideIcon("activity", __iconNode$3);
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
      d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
      key: "ct8e1f"
    }
  ],
  ["path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242", key: "151rxh" }],
  [
    "path",
    {
      d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
      key: "13bj9a"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
];
const EyeOff = createLucideIcon("eye-off", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ]
];
const Pen = createLucideIcon("pen", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
const Save = createLucideIcon("save", __iconNode);
function getInitials(name) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}
function formatDate(iso) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  } catch {
    return "—";
  }
}
function formatDateTime(iso) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  } catch {
    return "—";
  }
}
function SectionCard({
  children,
  delay = 0
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { delay, duration: 0.4 },
      className: "rounded-2xl p-6",
      style: {
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(32,224,230,0.12)",
        backdropFilter: "blur(12px)"
      },
      children
    }
  );
}
function SectionTitle({
  icon,
  title
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#20E0E6" }, children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "h3",
      {
        className: "text-sm font-bold tracking-[0.18em] uppercase",
        style: { color: "#20E0E6" },
        children: title
      }
    )
  ] });
}
function PasswordField({
  label,
  value,
  onChange
}) {
  const [show, setShow] = reactExports.useState(false);
  const id = reactExports.useId();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "label",
      {
        htmlFor: id,
        className: "text-xs tracking-widest",
        style: { color: "#7C8796" },
        children: label
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          id,
          type: show ? "text" : "password",
          value,
          onChange: (e) => onChange(e.target.value),
          className: "w-full px-4 py-2.5 rounded-xl text-sm outline-none pr-10 transition-all duration-200",
          style: {
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(32,224,230,0.2)",
            color: "#F2F5F7"
          },
          onFocus: (e) => {
            e.currentTarget.style.border = "1px solid rgba(32,224,230,0.6)";
            e.currentTarget.style.boxShadow = "0 0 12px rgba(32,224,230,0.15)";
          },
          onBlur: (e) => {
            e.currentTarget.style.border = "1px solid rgba(32,224,230,0.2)";
            e.currentTarget.style.boxShadow = "none";
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          className: "absolute right-3 top-1/2 -translate-y-1/2 transition-colors duration-200",
          style: { color: "#7C8796" },
          onClick: () => setShow(!show),
          onMouseEnter: (e) => {
            e.currentTarget.style.color = "#20E0E6";
          },
          onMouseLeave: (e) => {
            e.currentTarget.style.color = "#7C8796";
          },
          children: show ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { size: 14 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 14 })
        }
      )
    ] })
  ] });
}
const STATS = [
  { label: "TOTAL BOOKINGS", color: "#FF4444", key: "bookings" },
  { label: "PENDING", color: "#F59E0B", key: "pending" },
  { label: "COMMENTS", color: "#20E0E6", key: "comments" }
];
function ProfilePage({
  onClose,
  onOpenAdmin
}) {
  const {
    isAdmin,
    userName,
    userEmail,
    memberSince,
    adminLastLogin,
    changePassword,
    updateName,
    logout
  } = useAuth();
  const { actor } = useActor();
  const nameInputId = reactExports.useId();
  const [currentPw, setCurrentPw] = reactExports.useState("");
  const [newPw, setNewPw] = reactExports.useState("");
  const [confirmPw, setConfirmPw] = reactExports.useState("");
  const [pwStatus, setPwStatus] = reactExports.useState(
    null
  );
  const [pwLoading, setPwLoading] = reactExports.useState(false);
  const [editingName, setEditingName] = reactExports.useState(false);
  const [nameInput, setNameInput] = reactExports.useState(userName);
  const [bookings, setBookings] = reactExports.useState([]);
  const [bookingCount, setBookingCount] = reactExports.useState(0);
  const [commentCount, setCommentCount] = reactExports.useState(0);
  const [dataLoading, setDataLoading] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!actor) return;
    setDataLoading(true);
    if (isAdmin) {
      Promise.all([actor.getAllBookings(), actor.getAllComments()]).then(([bk, cm]) => {
        setBookingCount(bk.length);
        setCommentCount(cm.length);
      }).finally(() => setDataLoading(false));
    } else {
      actor.getAllBookings().then((bk) => {
        const mine = bk.filter(
          (b) => {
            var _a;
            return ((_a = b.email) == null ? void 0 : _a.toLowerCase()) === (userEmail == null ? void 0 : userEmail.toLowerCase());
          }
        );
        setBookings(mine);
      }).finally(() => setDataLoading(false));
    }
  }, [actor, isAdmin, userEmail]);
  function handleChangePassword() {
    if (!newPw || newPw.length < 6) {
      setPwStatus({
        ok: false,
        msg: "New password must be at least 6 characters"
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
          msg: result.error ?? "Failed to change password"
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
  const statValues = {
    bookings: bookingCount,
    pending: bookingCount,
    comments: commentCount
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.3 },
      className: "fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto py-8 px-4",
      style: { background: "rgba(7,10,15,0.92)", backdropFilter: "blur(20px)" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0",
            role: "button",
            tabIndex: 0,
            onClick: onClose,
            onKeyDown: (e) => e.key === "Escape" && onClose(),
            "aria-label": "Close profile"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 40, scale: 0.97 },
            animate: { opacity: 1, y: 0, scale: 1 },
            exit: { opacity: 0, y: 40, scale: 0.97 },
            transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
            className: "relative w-full max-w-2xl rounded-3xl overflow-hidden",
            style: {
              background: "rgba(11,15,20,0.98)",
              border: "1px solid rgba(32,224,230,0.18)",
              boxShadow: "0 0 80px rgba(32,224,230,0.08), 0 40px 80px rgba(0,0,0,0.6)"
            },
            onClick: (e) => e.stopPropagation(),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-px w-full",
                  style: {
                    background: isAdmin ? "linear-gradient(90deg, transparent, #FF4444 40%, #FF6B35 60%, transparent)" : "linear-gradient(90deg, transparent, #00BFFF 40%, #20E0E6 60%, transparent)"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: "absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 z-10",
                  style: {
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#7C8796"
                  },
                  onClick: onClose,
                  onMouseEnter: (e) => {
                    e.currentTarget.style.color = "#F2F5F7";
                    e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                  },
                  onMouseLeave: (e) => {
                    e.currentTarget.style.color = "#7C8796";
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  },
                  "data-ocid": "profile.close_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 14 })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 flex flex-col gap-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, y: -10 },
                    animate: { opacity: 1, y: 0 },
                    transition: { duration: 0.4 },
                    className: "flex flex-col items-center gap-3 pb-4",
                    style: { borderBottom: "1px solid rgba(255,255,255,0.06)" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold tracking-wider",
                          style: {
                            background: isAdmin ? "linear-gradient(135deg, rgba(255,68,68,0.15), rgba(255,107,53,0.15))" : "linear-gradient(135deg, rgba(0,191,255,0.15), rgba(32,224,230,0.15))",
                            border: isAdmin ? "2px solid #FF4444" : "2px solid #20E0E6",
                            boxShadow: isAdmin ? "0 0 30px rgba(255,68,68,0.3), inset 0 0 20px rgba(255,68,68,0.05)" : "0 0 30px rgba(32,224,230,0.3), inset 0 0 20px rgba(32,224,230,0.05)",
                            color: isAdmin ? "#FF4444" : "#20E0E6"
                          },
                          children: getInitials(userName || "U")
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "h2",
                            {
                              className: "text-xl font-bold tracking-wide",
                              style: { color: "#F2F5F7" },
                              children: userName
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              className: "text-xs font-bold tracking-widest px-2 py-0.5 rounded-full",
                              style: {
                                background: isAdmin ? "rgba(255,68,68,0.12)" : "rgba(0,191,255,0.12)",
                                border: isAdmin ? "1px solid rgba(255,68,68,0.4)" : "1px solid rgba(0,191,255,0.4)",
                                color: isAdmin ? "#FF4444" : "#00BFFF"
                              },
                              children: isAdmin ? "ADMIN" : "MEMBER"
                            }
                          )
                        ] }),
                        !isAdmin && userEmail && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-1", style: { color: "#7C8796" }, children: userEmail })
                      ] })
                    ]
                  }
                ),
                !isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { delay: 0.05, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 15 }), title: "Account Info" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "label",
                          {
                            htmlFor: nameInputId,
                            className: "text-xs tracking-widest",
                            style: { color: "#7C8796" },
                            children: "DISPLAY NAME"
                          }
                        ),
                        editingName ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "input",
                            {
                              id: nameInputId,
                              type: "text",
                              value: nameInput,
                              onChange: (e) => setNameInput(e.target.value),
                              className: "flex-1 px-4 py-2.5 rounded-xl text-sm outline-none transition-all duration-200",
                              style: {
                                background: "rgba(255,255,255,0.04)",
                                border: "1px solid rgba(32,224,230,0.4)",
                                color: "#F2F5F7",
                                boxShadow: "0 0 12px rgba(32,224,230,0.1)"
                              },
                              "data-ocid": "profile.input",
                              onKeyDown: (e) => e.key === "Enter" && handleSaveName()
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "button",
                            {
                              type: "button",
                              onClick: handleSaveName,
                              className: "px-4 py-2 rounded-xl text-xs font-bold tracking-wider transition-all duration-200",
                              style: {
                                background: "rgba(32,224,230,0.12)",
                                border: "1px solid rgba(32,224,230,0.4)",
                                color: "#20E0E6"
                              },
                              "data-ocid": "profile.save_button",
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { size: 13 })
                            }
                          )
                        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", style: { color: "#F2F5F7" }, children: userName }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "button",
                            {
                              type: "button",
                              onClick: () => {
                                setNameInput(userName);
                                setEditingName(true);
                              },
                              className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium tracking-wider transition-all duration-200",
                              style: {
                                background: "rgba(255,255,255,0.04)",
                                border: "1px solid rgba(255,255,255,0.1)",
                                color: "#7C8796"
                              },
                              onMouseEnter: (e) => {
                                e.currentTarget.style.color = "#20E0E6";
                                e.currentTarget.style.borderColor = "rgba(32,224,230,0.3)";
                              },
                              onMouseLeave: (e) => {
                                e.currentTarget.style.color = "#7C8796";
                                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                              },
                              "data-ocid": "profile.edit_button",
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { size: 11 }),
                                " Edit"
                              ]
                            }
                          )
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "flex items-center gap-3 rounded-xl px-4 py-3",
                          style: {
                            background: "rgba(255,255,255,0.02)",
                            border: "1px solid rgba(255,255,255,0.05)"
                          },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 14, style: { color: "#20E0E6" } }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", style: { color: "#7C8796" }, children: "EMAIL" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", style: { color: "#F2F5F7" }, children: userEmail })
                            ] })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "flex items-center gap-3 rounded-xl px-4 py-3",
                          style: {
                            background: "rgba(255,255,255,0.02)",
                            border: "1px solid rgba(255,255,255,0.05)"
                          },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 14, style: { color: "#20E0E6" } }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", style: { color: "#7C8796" }, children: "MEMBER SINCE" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", style: { color: "#F2F5F7" }, children: formatDate(memberSince) })
                            ] })
                          ]
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { delay: 0.1, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      SectionTitle,
                      {
                        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { size: 15 }),
                        title: "Change Password"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        PasswordField,
                        {
                          label: "CURRENT PASSWORD",
                          value: currentPw,
                          onChange: setCurrentPw
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        PasswordField,
                        {
                          label: "NEW PASSWORD (MIN 6 CHARS)",
                          value: newPw,
                          onChange: setNewPw
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        PasswordField,
                        {
                          label: "CONFIRM NEW PASSWORD",
                          value: confirmPw,
                          onChange: setConfirmPw
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: pwStatus && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        motion.div,
                        {
                          initial: { opacity: 0, y: -4 },
                          animate: { opacity: 1, y: 0 },
                          exit: { opacity: 0 },
                          className: "flex items-center gap-2 px-4 py-3 rounded-xl text-xs",
                          style: {
                            background: pwStatus.ok ? "rgba(0,200,100,0.08)" : "rgba(255,68,68,0.08)",
                            border: pwStatus.ok ? "1px solid rgba(0,200,100,0.25)" : "1px solid rgba(255,68,68,0.25)",
                            color: pwStatus.ok ? "#00C864" : "#FF4444"
                          },
                          "data-ocid": pwStatus.ok ? "profile.success_state" : "profile.error_state",
                          children: [
                            pwStatus.ok ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 13 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 13 }),
                            pwStatus.msg
                          ]
                        },
                        pwStatus.msg
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: handleChangePassword,
                          disabled: pwLoading,
                          className: "w-full py-3 rounded-xl text-sm font-bold tracking-[0.15em] uppercase transition-all duration-300",
                          style: {
                            background: "rgba(0,191,255,0.1)",
                            border: "1.5px solid #00BFFF",
                            color: "#00BFFF",
                            boxShadow: "0 0 20px rgba(0,191,255,0.15)",
                            opacity: pwLoading ? 0.7 : 1
                          },
                          onMouseEnter: (e) => {
                            if (!pwLoading) {
                              e.currentTarget.style.boxShadow = "0 0 30px rgba(0,191,255,0.35)";
                              e.currentTarget.style.background = "rgba(0,191,255,0.18)";
                            }
                          },
                          onMouseLeave: (e) => {
                            e.currentTarget.style.boxShadow = "0 0 20px rgba(0,191,255,0.15)";
                            e.currentTarget.style.background = "rgba(0,191,255,0.1)";
                          },
                          "data-ocid": "profile.submit_button",
                          children: pwLoading ? "UPDATING..." : "UPDATE PASSWORD"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { delay: 0.15, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      SectionTitle,
                      {
                        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { size: 15 }),
                        title: "Booking History"
                      }
                    ),
                    dataLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "flex items-center gap-2 py-4",
                        style: { color: "#7C8796" },
                        "data-ocid": "profile.loading_state",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 rounded-full border-t-2 border-cyan-400 animate-spin" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: "Loading bookings..." })
                        ]
                      }
                    ) : bookings.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "text-center py-8 rounded-xl",
                        style: {
                          background: "rgba(255,255,255,0.02)",
                          border: "1px dashed rgba(255,255,255,0.08)"
                        },
                        "data-ocid": "profile.empty_state",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Calendar,
                            {
                              size: 28,
                              style: {
                                color: "rgba(32,224,230,0.3)",
                                margin: "0 auto 8px"
                              }
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", style: { color: "#7C8796" }, children: "No test drive bookings yet" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "p",
                            {
                              className: "text-xs mt-1",
                              style: { color: "rgba(255,255,255,0.2)" },
                              children: "Book your first one below!"
                            }
                          )
                        ]
                      }
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", children: bookings.map((b, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "flex items-center justify-between px-4 py-3 rounded-xl",
                        style: {
                          background: "rgba(255,255,255,0.02)",
                          border: "1px solid rgba(32,224,230,0.08)"
                        },
                        "data-ocid": `profile.item.${i + 1}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "p",
                              {
                                className: "text-sm font-medium",
                                style: { color: "#F2F5F7" },
                                children: b.preferredDate
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs", style: { color: "#7C8796" }, children: [
                              b.preferredTime,
                              " • ",
                              b.phone
                            ] })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              className: "text-xs font-bold tracking-wider px-3 py-1 rounded-full",
                              style: {
                                background: b.status === "confirmed" ? "rgba(72,187,120,0.1)" : b.status === "rejected" ? "rgba(252,129,129,0.1)" : "rgba(246,173,85,0.1)",
                                border: b.status === "confirmed" ? "1px solid rgba(72,187,120,0.4)" : b.status === "rejected" ? "1px solid rgba(252,129,129,0.4)" : "1px solid rgba(246,173,85,0.4)",
                                color: b.status === "confirmed" ? "#48BB78" : b.status === "rejected" ? "#FC8181" : "#F6AD55"
                              },
                              children: b.status ? b.status.toUpperCase() : "PENDING"
                            }
                          )
                        ]
                      },
                      `${b.preferredDate}-${b.phone}-${i}`
                    )) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SectionCard, { delay: 0.2, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => {
                        logout();
                        onClose();
                      },
                      className: "w-full py-3 rounded-xl text-sm font-bold tracking-[0.15em] uppercase flex items-center justify-center gap-2 transition-all duration-300",
                      style: {
                        background: "rgba(255,68,68,0.06)",
                        border: "1.5px solid rgba(255,68,68,0.5)",
                        color: "#FF4444"
                      },
                      onMouseEnter: (e) => {
                        e.currentTarget.style.background = "rgba(255,68,68,0.14)";
                        e.currentTarget.style.boxShadow = "0 0 20px rgba(255,68,68,0.2)";
                      },
                      onMouseLeave: (e) => {
                        e.currentTarget.style.background = "rgba(255,68,68,0.06)";
                        e.currentTarget.style.boxShadow = "none";
                      },
                      "data-ocid": "profile.secondary_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { size: 14 }),
                        " SIGN OUT"
                      ]
                    }
                  ) })
                ] }),
                isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { delay: 0.05, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      SectionTitle,
                      {
                        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { size: 15 }),
                        title: "Admin Information"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "flex items-center gap-3 rounded-xl px-4 py-3",
                          style: {
                            background: "rgba(255,255,255,0.02)",
                            border: "1px solid rgba(255,255,255,0.05)"
                          },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 14, style: { color: "#FF4444" } }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", style: { color: "#7C8796" }, children: "USERNAME" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "p",
                                {
                                  className: "text-sm font-mono",
                                  style: { color: "#F2F5F7" },
                                  children: "ishant_padole"
                                }
                              )
                            ] })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "flex items-center gap-3 rounded-xl px-4 py-3",
                          style: {
                            background: "rgba(255,255,255,0.02)",
                            border: "1px solid rgba(255,255,255,0.05)"
                          },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { size: 14, style: { color: "#FF4444" } }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", style: { color: "#7C8796" }, children: "ROLE" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "p",
                                {
                                  className: "text-sm",
                                  style: { color: "#FF4444", fontWeight: 700 },
                                  children: "Administrator"
                                }
                              )
                            ] })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "flex items-center gap-3 rounded-xl px-4 py-3 sm:col-span-2",
                          style: {
                            background: "rgba(255,255,255,0.02)",
                            border: "1px solid rgba(255,255,255,0.05)"
                          },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 14, style: { color: "#FF4444" } }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", style: { color: "#7C8796" }, children: "LAST LOGIN" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", style: { color: "#F2F5F7" }, children: formatDateTime(adminLastLogin) })
                            ] })
                          ]
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { delay: 0.1, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      SectionTitle,
                      {
                        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { size: 15 }),
                        title: "Quick Stats"
                      }
                    ),
                    dataLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "flex items-center gap-2 py-4",
                        style: { color: "#7C8796" },
                        "data-ocid": "profile.loading_state",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 rounded-full border-t-2 border-red-400 animate-spin" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: "Fetching stats..." })
                        ]
                      }
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3", children: STATS.map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "rounded-xl p-4 text-center",
                        style: {
                          background: "rgba(255,255,255,0.02)",
                          border: `1px solid ${stat.color}22`
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "p",
                            {
                              className: "text-2xl font-bold",
                              style: { color: stat.color },
                              children: statValues[stat.key]
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "p",
                            {
                              className: "text-xs mt-1",
                              style: { color: "#7C8796" },
                              children: stat.label
                            }
                          )
                        ]
                      },
                      stat.key
                    )) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { delay: 0.15, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      SectionTitle,
                      {
                        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { size: 15 }),
                        title: "Change Admin Password"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        PasswordField,
                        {
                          label: "CURRENT PASSWORD",
                          value: currentPw,
                          onChange: setCurrentPw
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        PasswordField,
                        {
                          label: "NEW PASSWORD (MIN 6 CHARS)",
                          value: newPw,
                          onChange: setNewPw
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        PasswordField,
                        {
                          label: "CONFIRM NEW PASSWORD",
                          value: confirmPw,
                          onChange: setConfirmPw
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: pwStatus && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        motion.div,
                        {
                          initial: { opacity: 0, y: -4 },
                          animate: { opacity: 1, y: 0 },
                          exit: { opacity: 0 },
                          className: "flex items-center gap-2 px-4 py-3 rounded-xl text-xs",
                          style: {
                            background: pwStatus.ok ? "rgba(0,200,100,0.08)" : "rgba(255,68,68,0.08)",
                            border: pwStatus.ok ? "1px solid rgba(0,200,100,0.25)" : "1px solid rgba(255,68,68,0.25)",
                            color: pwStatus.ok ? "#00C864" : "#FF4444"
                          },
                          "data-ocid": pwStatus.ok ? "profile.success_state" : "profile.error_state",
                          children: [
                            pwStatus.ok ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 13 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 13 }),
                            pwStatus.msg
                          ]
                        },
                        pwStatus.msg
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: handleChangePassword,
                          disabled: pwLoading,
                          className: "w-full py-3 rounded-xl text-sm font-bold tracking-[0.15em] uppercase transition-all duration-300",
                          style: {
                            background: "rgba(255,68,68,0.1)",
                            border: "1.5px solid #FF4444",
                            color: "#FF4444",
                            boxShadow: "0 0 20px rgba(255,68,68,0.12)",
                            opacity: pwLoading ? 0.7 : 1
                          },
                          onMouseEnter: (e) => {
                            if (!pwLoading) {
                              e.currentTarget.style.boxShadow = "0 0 30px rgba(255,68,68,0.3)";
                              e.currentTarget.style.background = "rgba(255,68,68,0.18)";
                            }
                          },
                          onMouseLeave: (e) => {
                            e.currentTarget.style.boxShadow = "0 0 20px rgba(255,68,68,0.12)";
                            e.currentTarget.style.background = "rgba(255,68,68,0.1)";
                          },
                          "data-ocid": "profile.submit_button",
                          children: pwLoading ? "UPDATING..." : "UPDATE PASSWORD"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SectionCard, { delay: 0.2, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: onOpenAdmin,
                      className: "w-full py-3 rounded-xl text-sm font-bold tracking-[0.15em] uppercase flex items-center justify-center gap-2 transition-all duration-300",
                      style: {
                        background: "rgba(255,68,68,0.08)",
                        border: "1.5px solid #FF4444",
                        color: "#FF4444",
                        boxShadow: "0 0 20px rgba(255,68,68,0.12)"
                      },
                      onMouseEnter: (e) => {
                        e.currentTarget.style.background = "rgba(255,68,68,0.16)";
                        e.currentTarget.style.boxShadow = "0 0 30px rgba(255,68,68,0.3)";
                      },
                      onMouseLeave: (e) => {
                        e.currentTarget.style.background = "rgba(255,68,68,0.08)";
                        e.currentTarget.style.boxShadow = "0 0 20px rgba(255,68,68,0.12)";
                      },
                      "data-ocid": "profile.primary_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { size: 14 }),
                        " OPEN ADMIN PANEL"
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SectionCard, { delay: 0.25, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => {
                        logout();
                        onClose();
                      },
                      className: "w-full py-3 rounded-xl text-sm font-bold tracking-[0.15em] uppercase flex items-center justify-center gap-2 transition-all duration-300",
                      style: {
                        background: "rgba(255,120,50,0.06)",
                        border: "1.5px solid rgba(255,120,50,0.5)",
                        color: "rgba(255,140,60,0.9)"
                      },
                      onMouseEnter: (e) => {
                        e.currentTarget.style.background = "rgba(255,120,50,0.14)";
                        e.currentTarget.style.boxShadow = "0 0 20px rgba(255,120,50,0.2)";
                      },
                      onMouseLeave: (e) => {
                        e.currentTarget.style.background = "rgba(255,120,50,0.06)";
                        e.currentTarget.style.boxShadow = "none";
                      },
                      "data-ocid": "profile.secondary_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { size: 14 }),
                        " SIGN OUT"
                      ]
                    }
                  ) })
                ] })
              ] })
            ]
          }
        )
      ]
    }
  );
}
export {
  ProfilePage as default
};
