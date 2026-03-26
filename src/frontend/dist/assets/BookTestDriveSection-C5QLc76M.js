import { c as createLucideIcon, u as useAuth, r as reactExports, a as createActorWithConfig, j as jsxRuntimeExports, m as motion, A as AnimatePresence, X, b as AuthSplash } from "./index-CypPaStP.js";
import { C as CircleCheckBig } from "./circle-check-big-U2qzTPrW.js";
import { L as LoaderCircle } from "./loader-circle-0HnhOupG.js";
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
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const TriangleAlert = createLucideIcon("triangle-alert", __iconNode);
const inputStyle = {
  backgroundColor: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(0,191,255,0.2)",
  borderRadius: "10px",
  color: "#F2F5F7",
  padding: "12px 16px",
  width: "100%",
  fontSize: "14px",
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s"
};
const focusStyle = {
  borderColor: "#00BFFF",
  boxShadow: "0 0 0 2px rgba(0,191,255,0.18)"
};
const labelStyle = {
  color: "rgba(0,191,255,0.7)",
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.15em",
  textTransform: "uppercase"
};
function NeonInput({
  label,
  ...props
}) {
  const id = reactExports.useId();
  const [focused, setFocused] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: id, style: labelStyle, children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        id,
        ...props,
        style: { ...inputStyle, ...focused ? focusStyle : {} },
        onFocus: (e) => {
          var _a;
          setFocused(true);
          (_a = props.onFocus) == null ? void 0 : _a.call(props, e);
        },
        onBlur: (e) => {
          var _a;
          setFocused(false);
          (_a = props.onBlur) == null ? void 0 : _a.call(props, e);
        }
      }
    )
  ] });
}
function NeonTextarea({
  label,
  ...props
}) {
  const id = reactExports.useId();
  const [focused, setFocused] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: id, style: labelStyle, children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "textarea",
      {
        id,
        ...props,
        rows: 6,
        style: {
          ...inputStyle,
          ...focused ? focusStyle : {},
          resize: "vertical"
        },
        onFocus: (e) => {
          var _a;
          setFocused(true);
          (_a = props.onFocus) == null ? void 0 : _a.call(props, e);
        },
        onBlur: (e) => {
          var _a;
          setFocused(false);
          (_a = props.onBlur) == null ? void 0 : _a.call(props, e);
        }
      }
    )
  ] });
}
async function submitWithRetry(submitFn, maxAttempts = 3, baseDelayMs = 800) {
  let lastError;
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      const actor = await createActorWithConfig();
      await submitFn(actor);
      return;
    } catch (err) {
      lastError = err;
      console.error(`Booking attempt ${attempt + 1} failed:`, err);
      if (attempt < maxAttempts - 1) {
        await new Promise((r) => setTimeout(r, baseDelayMs * 2 ** attempt));
      }
    }
  }
  throw lastError;
}
function BookTestDriveSection({
  customizationSpec
}) {
  const { isLoggedIn } = useAuth();
  const warmActorRef = reactExports.useRef(null);
  const [form, setForm] = reactExports.useState({
    name: "",
    email: "",
    phone: "",
    preferredDate: "",
    preferredTime: "",
    configurationSpec: "",
    message: ""
  });
  const [loading, setLoading] = reactExports.useState(false);
  const [success, setSuccess] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const [showInlineAuth, setShowInlineAuth] = reactExports.useState(false);
  const [specBannerDismissed, setSpecBannerDismissed] = reactExports.useState(false);
  reactExports.useEffect(() => {
    createActorWithConfig().then((a) => {
      warmActorRef.current = a;
    }).catch(() => {
    });
  }, []);
  reactExports.useEffect(() => {
    if (customizationSpec) {
      setForm((prev) => ({ ...prev, configurationSpec: customizationSpec }));
      setSpecBannerDismissed(false);
    }
  }, [customizationSpec]);
  function handleChange(field) {
    return (e) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!isLoggedIn) {
      setShowInlineAuth(true);
      return;
    }
    setError("");
    setLoading(true);
    const combined = form.configurationSpec ? `${form.configurationSpec}

--- User Message ---
${form.message}` : form.message;
    try {
      await submitWithRetry(async (actor) => {
        await actor.submitBooking(
          form.name,
          form.email,
          form.phone,
          form.preferredDate,
          form.preferredTime,
          combined
        );
      });
      warmActorRef.current = null;
      setSuccess(true);
    } catch (err) {
      console.error("All booking attempts failed:", err);
      warmActorRef.current = null;
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(`Booking failed: ${message.slice(0, 120)}. Please try again.`);
    } finally {
      setLoading(false);
    }
  }
  function handleReset() {
    setSuccess(false);
    setError("");
    setForm({
      name: "",
      email: "",
      phone: "",
      preferredDate: "",
      preferredTime: "",
      configurationSpec: customizationSpec ?? "",
      message: ""
    });
  }
  const showSpecBanner = !!customizationSpec && !specBannerDismissed && !success;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      id: "book-test-drive",
      className: "relative py-28 overflow-hidden",
      style: { backgroundColor: "#07090D" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 flex items-center justify-center pointer-events-none select-none",
            style: { opacity: 0.025 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "font-black uppercase tracking-widest",
                style: { fontSize: "clamp(60px, 18vw, 200px)", color: "#00BFFF" },
                children: "BOOK"
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full pointer-events-none",
            style: {
              background: "radial-gradient(circle, rgba(0,191,255,0.05) 0%, transparent 70%)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 max-w-3xl mx-auto px-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 40 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true, amount: 0.3 },
              transition: { duration: 0.8, ease: "easeOut" },
              className: "text-center mb-12",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs font-semibold tracking-[0.4em] uppercase mb-3",
                    style: { color: "#00BFFF" },
                    children: "Ultimate M Performance"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h2",
                  {
                    className: "font-black uppercase leading-none",
                    style: {
                      fontSize: "clamp(2rem, 6vw, 4rem)",
                      background: "linear-gradient(135deg, #FFFFFF 0%, #00BFFF 60%, #FFFFFF 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text"
                    },
                    children: "Book Your Test Drive"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "mt-4 text-sm tracking-wide",
                    style: { color: "rgba(255,255,255,0.45)" },
                    children: "Experience the ultimate M performance firsthand"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "mx-auto mt-4 h-[2px] w-24 rounded-full",
                    style: {
                      background: "linear-gradient(90deg, transparent, #00BFFF, transparent)"
                    }
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 50 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true, amount: 0.2 },
              transition: { duration: 0.9, ease: "easeOut", delay: 0.1 },
              className: "relative rounded-2xl p-8 md:p-12",
              style: {
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(0,191,255,0.15)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                boxShadow: "0 0 60px rgba(0,191,255,0.08), 0 40px 80px rgba(0,0,0,0.5)"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: success ? (
                /* Success state */
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, scale: 0.85 },
                    animate: { opacity: 1, scale: 1 },
                    exit: { opacity: 0, scale: 0.85 },
                    transition: { duration: 0.5, ease: "easeOut" },
                    className: "flex flex-col items-center justify-center gap-6 py-8 text-center",
                    "data-ocid": "book.success_state",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        motion.div,
                        {
                          initial: { scale: 0 },
                          animate: { scale: 1 },
                          transition: { type: "spring", stiffness: 200, delay: 0.1 },
                          style: {
                            width: 88,
                            height: 88,
                            borderRadius: "50%",
                            background: "rgba(0,191,255,0.1)",
                            border: "2px solid rgba(0,191,255,0.5)",
                            boxShadow: "0 0 40px rgba(0,191,255,0.4)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                          },
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                            CircleCheckBig,
                            {
                              className: "w-10 h-10",
                              style: { color: "#00BFFF" }
                            }
                          )
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "h3",
                          {
                            className: "font-black uppercase text-2xl tracking-widest mb-2",
                            style: {
                              background: "linear-gradient(135deg, #FFFFFF 0%, #00BFFF 100%)",
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                              backgroundClip: "text"
                            },
                            children: "Booking Confirmed"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            style: { color: "rgba(255,255,255,0.5)", fontSize: "14px" },
                            children: "We'll contact you within 24 hours."
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: handleReset,
                          className: "mt-2 px-8 py-3 rounded-full text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300",
                          style: {
                            background: "rgba(0,191,255,0.1)",
                            border: "1px solid rgba(0,191,255,0.4)",
                            color: "#00BFFF"
                          },
                          "data-ocid": "book.secondary_button",
                          children: "Book Another"
                        }
                      )
                    ]
                  },
                  "success"
                )
              ) : (
                /* Form */
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.form,
                  {
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    exit: { opacity: 0 },
                    transition: { duration: 0.4 },
                    onSubmit: handleSubmit,
                    className: "flex flex-col gap-6",
                    "data-ocid": "book.modal",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showSpecBanner && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        motion.div,
                        {
                          initial: { opacity: 0, y: -10, height: 0 },
                          animate: { opacity: 1, y: 0, height: "auto" },
                          exit: { opacity: 0, y: -10, height: 0 },
                          transition: { duration: 0.35 },
                          className: "overflow-hidden",
                          "data-ocid": "book.success_state",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "div",
                            {
                              className: "flex items-center justify-between gap-3 rounded-xl px-4 py-3",
                              style: {
                                background: "rgba(0,191,255,0.08)",
                                border: "1px solid rgba(0,191,255,0.35)",
                                boxShadow: "0 0 20px rgba(0,191,255,0.1)"
                              },
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    CircleCheckBig,
                                    {
                                      className: "w-4 h-4 flex-shrink-0",
                                      style: { color: "#00BFFF" }
                                    }
                                  ),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    "p",
                                    {
                                      className: "text-xs font-semibold",
                                      style: { color: "#00BFFF" },
                                      children: "Your configuration has been applied — see the Configuration field below"
                                    }
                                  )
                                ] }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "button",
                                  {
                                    type: "button",
                                    onClick: () => setSpecBannerDismissed(true),
                                    className: "flex-shrink-0 p-0.5 rounded",
                                    style: { color: "rgba(0,191,255,0.5)" },
                                    "data-ocid": "book.close_button",
                                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
                                  }
                                )
                              ]
                            }
                          )
                        }
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          motion.div,
                          {
                            initial: { opacity: 0, x: -20 },
                            whileInView: { opacity: 1, x: 0 },
                            viewport: { once: true },
                            transition: { delay: 0.15 },
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                              NeonInput,
                              {
                                label: "Full Name",
                                type: "text",
                                placeholder: "John M. Smith",
                                required: true,
                                value: form.name,
                                onChange: handleChange("name"),
                                "data-ocid": "book.input"
                              }
                            )
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          motion.div,
                          {
                            initial: { opacity: 0, x: 20 },
                            whileInView: { opacity: 1, x: 0 },
                            viewport: { once: true },
                            transition: { delay: 0.2 },
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                              NeonInput,
                              {
                                label: "Email",
                                type: "email",
                                placeholder: "john@example.com",
                                required: true,
                                value: form.email,
                                onChange: handleChange("email"),
                                "data-ocid": "book.input"
                              }
                            )
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          motion.div,
                          {
                            initial: { opacity: 0, x: -20 },
                            whileInView: { opacity: 1, x: 0 },
                            viewport: { once: true },
                            transition: { delay: 0.25 },
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                              NeonInput,
                              {
                                label: "Phone",
                                type: "tel",
                                placeholder: "+1 (555) 000-0000",
                                required: true,
                                value: form.phone,
                                onChange: handleChange("phone"),
                                "data-ocid": "book.input"
                              }
                            )
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          motion.div,
                          {
                            initial: { opacity: 0, x: 20 },
                            whileInView: { opacity: 1, x: 0 },
                            viewport: { once: true },
                            transition: { delay: 0.3 },
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                              NeonInput,
                              {
                                label: "Preferred Date",
                                type: "date",
                                required: true,
                                value: form.preferredDate,
                                onChange: handleChange("preferredDate"),
                                "data-ocid": "book.input"
                              }
                            )
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          motion.div,
                          {
                            initial: { opacity: 0, x: -20 },
                            whileInView: { opacity: 1, x: 0 },
                            viewport: { once: true },
                            transition: { delay: 0.35 },
                            className: "md:col-span-2",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                              NeonInput,
                              {
                                label: "Preferred Time",
                                type: "time",
                                required: true,
                                value: form.preferredTime,
                                onChange: handleChange("preferredTime"),
                                "data-ocid": "book.input"
                              }
                            )
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        motion.div,
                        {
                          initial: { opacity: 0, y: 10 },
                          whileInView: { opacity: 1, y: 0 },
                          viewport: { once: true },
                          transition: { delay: 0.38 },
                          className: "flex flex-col gap-1.5",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: labelStyle, children: "Your Configuration" }),
                              form.configurationSpec && /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "span",
                                {
                                  className: "text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full",
                                  style: {
                                    background: "rgba(0,191,255,0.12)",
                                    color: "rgba(0,191,255,0.7)",
                                    border: "1px solid rgba(0,191,255,0.25)"
                                  },
                                  children: "✓ Applied"
                                }
                              )
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "textarea",
                              {
                                readOnly: true,
                                rows: 8,
                                value: form.configurationSpec,
                                placeholder: "Apply your configuration from the section above...",
                                style: {
                                  ...inputStyle,
                                  backgroundColor: "rgba(0,191,255,0.03)",
                                  border: form.configurationSpec ? "1px solid rgba(0,191,255,0.3)" : "1px solid rgba(255,255,255,0.07)",
                                  resize: "none",
                                  cursor: "default",
                                  fontFamily: "monospace",
                                  fontSize: "11px",
                                  lineHeight: 1.6,
                                  color: form.configurationSpec ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.25)"
                                },
                                "data-ocid": "book.textarea"
                              }
                            )
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        motion.div,
                        {
                          initial: { opacity: 0, y: 10 },
                          whileInView: { opacity: 1, y: 0 },
                          viewport: { once: true },
                          transition: { delay: 0.42 },
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                            NeonTextarea,
                            {
                              label: "Message (Optional)",
                              placeholder: "Any additional requests or notes...",
                              value: form.message,
                              onChange: handleChange("message"),
                              "data-ocid": "book.textarea"
                            }
                          )
                        }
                      ),
                      error && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        motion.p,
                        {
                          initial: { opacity: 0 },
                          animate: { opacity: 1 },
                          className: "text-sm text-center",
                          style: { color: "#FF4D4D" },
                          "data-ocid": "book.error_state",
                          children: error
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        motion.div,
                        {
                          initial: { opacity: 0, y: 10 },
                          whileInView: { opacity: 1, y: 0 },
                          viewport: { once: true },
                          transition: { delay: 0.45 },
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "button",
                            {
                              type: "submit",
                              disabled: loading,
                              className: "w-full py-4 rounded-full font-bold tracking-[0.2em] uppercase text-sm transition-all duration-300 flex items-center justify-center gap-2",
                              style: {
                                background: loading ? "rgba(0,191,255,0.2)" : "linear-gradient(135deg, rgba(0,191,255,0.3) 0%, rgba(0,191,255,0.15) 100%)",
                                border: "1px solid rgba(0,191,255,0.5)",
                                color: loading ? "rgba(0,191,255,0.6)" : "#00BFFF",
                                boxShadow: loading ? "none" : "0 0 30px rgba(0,191,255,0.25)",
                                cursor: loading ? "not-allowed" : "pointer"
                              },
                              "data-ocid": "book.submit_button",
                              children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
                                "Confirming..."
                              ] }) : "Confirm Test Drive"
                            }
                          )
                        }
                      )
                    ]
                  },
                  "form"
                )
              ) })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showInlineAuth && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AuthSplash, { onClose: () => setShowInlineAuth(false) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: 16 },
                transition: { duration: 0.4 },
                className: "relative rounded-2xl p-6 mt-4 mx-4",
                style: {
                  border: "1.5px solid rgba(255,80,60,0.6)",
                  background: "rgba(255,40,20,0.06)",
                  boxShadow: "0 0 40px rgba(255,80,40,0.18)"
                },
                "data-ocid": "book.modal",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setShowInlineAuth(false),
                      className: "absolute top-3 right-3 p-1 rounded-full transition-colors",
                      style: { color: "rgba(255,255,255,0.4)" },
                      "data-ocid": "book.close_button",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 mb-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      TriangleAlert,
                      {
                        className: "w-6 h-6 mt-0.5 flex-shrink-0",
                        style: { color: "#FF5030" }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "h4",
                        {
                          className: "font-black uppercase tracking-widest text-base mb-1",
                          style: { color: "#FF5030" },
                          children: "⚠️ Login Required"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-xs leading-relaxed",
                          style: { color: "rgba(255,255,255,0.5)" },
                          children: "You must be signed in to confirm your test drive booking. This step is mandatory."
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setShowInlineAuth(true),
                        className: "flex-1 py-2.5 rounded-full text-xs font-bold tracking-[0.15em] uppercase transition-all duration-300",
                        style: {
                          background: "linear-gradient(135deg, rgba(0,191,255,0.25) 0%, rgba(0,191,255,0.1) 100%)",
                          border: "1px solid rgba(0,191,255,0.5)",
                          color: "#00BFFF"
                        },
                        "data-ocid": "book.primary_button",
                        children: "Sign In"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setShowInlineAuth(true),
                        className: "flex-1 py-2.5 rounded-full text-xs font-bold tracking-[0.15em] uppercase transition-all duration-300",
                        style: {
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.15)",
                          color: "rgba(255,255,255,0.6)"
                        },
                        "data-ocid": "book.secondary_button",
                        children: "Create Account"
                      }
                    )
                  ] })
                ]
              }
            )
          ] }) })
        ] })
      ]
    }
  );
}
export {
  BookTestDriveSection as default
};
