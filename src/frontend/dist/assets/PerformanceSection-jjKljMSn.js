import { r as reactExports, j as jsxRuntimeExports, m as motion } from "./index-DNTSR8Y7.js";
const TICK_KEYS = [
  "t0",
  "t1",
  "t2",
  "t3",
  "t4",
  "t5",
  "t6",
  "t7",
  "t8",
  "t9",
  "t10"
];
function StatBar({
  label,
  value,
  unit,
  countDown,
  startFrom,
  color,
  isVisible
}) {
  const [count, setCount] = reactExports.useState(countDown ? startFrom ?? 0 : 0);
  const [barWidth, setBarWidth] = reactExports.useState(0);
  reactExports.useEffect(() => {
    if (!isVisible) return;
    const duration = 2e3;
    const steps = 60;
    const interval = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - (1 - progress) ** 3;
      if (countDown && startFrom !== void 0) {
        setCount(startFrom - eased * (startFrom - value));
      } else {
        setCount(eased * value);
      }
      setBarWidth(eased * 100);
      if (step >= steps) clearInterval(timer);
    }, interval);
    return () => clearInterval(timer);
  }, [isVisible, value, countDown, startFrom]);
  const displayVal = countDown ? count.toFixed(1) : Math.round(count);
  const barPercent = countDown ? ((startFrom ?? 0) - count) / ((startFrom ?? 0) - value) * 100 : barWidth;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "text-xs tracking-[0.25em] font-semibold",
          style: { color: "#7C8796" },
          children: label
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "font-rajdhani font-bold text-4xl",
          style: { color: "#F2F5F7" },
          children: [
            displayVal,
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-lg ml-1",
                style: {
                  color,
                  textShadow: `0 0 10px ${color}`
                },
                children: unit
              }
            )
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "h-px rounded-full overflow-hidden relative",
        style: { backgroundColor: "rgba(255,255,255,0.07)" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-full rounded-full",
            style: {
              width: `${Math.min(Math.max(barPercent, 0), 100)}%`,
              background: `linear-gradient(90deg, ${color}40, ${color})`,
              boxShadow: `0 0 8px ${color}, 0 0 20px ${color}40`,
              transition: "width 0.033s linear"
            }
          }
        )
      }
    )
  ] });
}
function PerformanceSection() {
  const [isVisible, setIsVisible] = reactExports.useState(false);
  const sectionRef = reactExports.useRef(null);
  const [speed, setSpeed] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);
  reactExports.useEffect(() => {
    if (!isVisible) return;
    const duration = 2500;
    const steps = 80;
    const interval = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const p = step / steps;
      const eased = 1 - (1 - p) ** 2;
      setSpeed(Math.round(eased * 305));
      if (step >= steps) clearInterval(timer);
    }, interval);
    return () => clearInterval(timer);
  }, [isVisible]);
  const radius = 120;
  const circumference = Math.PI * radius;
  const progress = speed / 305;
  const dashOffset = circumference * (1 - progress);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      ref: sectionRef,
      id: "performance",
      className: "relative py-28 overflow-hidden",
      style: { backgroundColor: "#0B0F14" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute left-0 top-1/3 -translate-y-1/2 pointer-events-none",
            style: {
              width: "500px",
              height: "500px",
              background: "radial-gradient(circle, rgba(32,224,230,0.06) 0%, transparent 70%)",
              filter: "blur(60px)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute bottom-0 right-0 pointer-events-none",
            style: {
              width: "450px",
              height: "450px",
              background: "radial-gradient(circle, rgba(229,57,53,0.07) 0%, transparent 70%)",
              filter: "blur(60px)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute top-0 left-0 right-0 pointer-events-none",
            style: {
              height: "100px",
              background: "linear-gradient(to bottom, #0B0F14, transparent)",
              zIndex: 1
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute bottom-0 left-0 right-0 pointer-events-none",
            style: {
              height: "120px",
              background: "linear-gradient(to bottom, transparent, #0B0F14)",
              zIndex: 1
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6 relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "ghost-text",
              style: {
                fontSize: "18vw",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                opacity: 0.025
              },
              children: "POWER"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 40 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.8 },
              className: "text-center mb-20",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-3 mb-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "h-px flex-1 max-w-16",
                      style: {
                        background: "linear-gradient(90deg, transparent, #E53935)"
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-xs tracking-[0.45em] font-bold eyebrow-dot eyebrow-dot-red",
                      style: { color: "#E53935" },
                      children: "M POWER"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "h-px flex-1 max-w-16",
                      style: {
                        background: "linear-gradient(90deg, #E53935, transparent)"
                      }
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "h2",
                  {
                    className: "font-rajdhani font-bold text-5xl md:text-6xl tracking-wider",
                    style: { color: "#F2F5F7" },
                    children: [
                      "PERFORMANCE ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "heading-gradient-red", children: "UNLEASHED" })
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-16 items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, x: -60 },
                whileInView: { opacity: 1, x: 0 },
                viewport: { once: true },
                transition: { duration: 0.9 },
                className: "flex flex-col items-center",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center justify-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "absolute",
                        style: {
                          width: "300px",
                          height: "300px",
                          borderRadius: "50%",
                          background: `radial-gradient(circle, rgba(229,57,53,${progress * 0.12}) 0%, transparent 70%)`,
                          filter: "blur(30px)",
                          transition: "background 0.1s linear"
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", style: { width: 280, height: 165 }, children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "svg",
                        {
                          width: "280",
                          height: "165",
                          viewBox: "0 0 280 165",
                          "aria-label": "Speedometer showing top speed",
                          role: "img",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Speedometer" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "M 20 150 A 120 120 0 0 1 260 150",
                                fill: "none",
                                stroke: "rgba(255,255,255,0.06)",
                                strokeWidth: "8",
                                strokeLinecap: "round"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "M 20 150 A 120 120 0 0 1 260 150",
                                fill: "none",
                                stroke: "#E53935",
                                strokeWidth: "8",
                                strokeLinecap: "round",
                                strokeDasharray: circumference,
                                strokeDashoffset: dashOffset,
                                style: {
                                  transition: "stroke-dashoffset 0.033s linear",
                                  filter: "drop-shadow(0 0 6px #E53935) drop-shadow(0 0 14px rgba(229,57,53,0.5))"
                                }
                              }
                            ),
                            TICK_KEYS.map((key, i) => {
                              const angle = -180 + i * 18;
                              const rad = angle * Math.PI / 180;
                              const cx = 140 + 120 * Math.cos(rad);
                              const cy = 150 + 120 * Math.sin(rad);
                              const cx2 = 140 + 108 * Math.cos(rad);
                              const cy2 = 150 + 108 * Math.sin(rad);
                              return /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "line",
                                {
                                  x1: cx,
                                  y1: cy,
                                  x2: cx2,
                                  y2: cy2,
                                  stroke: i <= Math.round(progress * 10) ? "#E53935" : "rgba(255,255,255,0.12)",
                                  strokeWidth: i % 5 === 0 ? 2.5 : 1,
                                  style: {
                                    filter: i <= Math.round(progress * 10) ? "drop-shadow(0 0 3px #E53935)" : "none"
                                  }
                                },
                                key
                              );
                            })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-end pb-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "font-rajdhani font-bold",
                            style: {
                              fontSize: "3.5rem",
                              color: "#F2F5F7",
                              lineHeight: 1,
                              textShadow: "0 0 20px rgba(229,57,53,0.3)"
                            },
                            children: speed
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "text-sm tracking-[0.3em] font-semibold",
                            style: {
                              color: "#E53935",
                              textShadow: "0 0 8px rgba(229,57,53,0.7)"
                            },
                            children: "KM/H"
                          }
                        )
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "mt-4 text-xs tracking-[0.3em]",
                      style: { color: "#7C8796" },
                      children: "TOP SPEED"
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, x: 60 },
                whileInView: { opacity: 1, x: 0 },
                viewport: { once: true },
                transition: { duration: 0.9 },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    StatBar,
                    {
                      label: "MAX POWER",
                      value: 627,
                      unit: "HP",
                      color: "#20E0E6",
                      isVisible
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    StatBar,
                    {
                      label: "MAX TORQUE",
                      value: 750,
                      unit: "Nm",
                      color: "#20E0E6",
                      isVisible
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    StatBar,
                    {
                      label: "0–100 KM/H",
                      value: 3,
                      unit: "s",
                      countDown: true,
                      startFrom: 5,
                      color: "#E53935",
                      isVisible
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "mt-10 p-6 rounded-lg grid grid-cols-2 gap-6",
                      style: {
                        border: "1px solid rgba(32,224,230,0.12)",
                        backgroundColor: "rgba(20,27,36,0.6)",
                        boxShadow: "inset 0 0 30px rgba(32,224,230,0.03)"
                      },
                      children: [
                        { label: "ENGINE", value: "S63 V8" },
                        { label: "CYLINDER", value: "8 / Twin Turbo" },
                        { label: "TRANSMISSION", value: "8-speed M DCT" },
                        { label: "WEIGHT", value: "1,510 kg" }
                      ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "text-xs tracking-widest mb-1",
                            style: { color: "#7C8796" },
                            children: s.label
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "font-rajdhani font-semibold",
                            style: { color: "#F2F5F7" },
                            children: s.value
                          }
                        )
                      ] }, s.label))
                    }
                  )
                ]
              }
            )
          ] })
        ] })
      ]
    }
  );
}
export {
  PerformanceSection as default
};
