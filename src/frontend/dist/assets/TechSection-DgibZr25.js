import { c as createLucideIcon, j as jsxRuntimeExports, m as motion } from "./index-CFGClM9r.js";
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
      d: "M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z",
      key: "l5xja"
    }
  ],
  [
    "path",
    {
      d: "M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z",
      key: "ep3f8r"
    }
  ],
  ["path", { d: "M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4", key: "1p4c4q" }],
  ["path", { d: "M17.599 6.5a3 3 0 0 0 .399-1.375", key: "tmeiqw" }],
  ["path", { d: "M6.003 5.125A3 3 0 0 0 6.401 6.5", key: "105sqy" }],
  ["path", { d: "M3.477 10.896a4 4 0 0 1 .585-.396", key: "ql3yin" }],
  ["path", { d: "M19.938 10.5a4 4 0 0 1 .585.396", key: "1qfode" }],
  ["path", { d: "M6 18a4 4 0 0 1-1.967-.516", key: "2e4loj" }],
  ["path", { d: "M19.967 17.484A4 4 0 0 1 18 18", key: "159ez6" }]
];
const Brain = createLucideIcon("brain", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "m12 14 4-4", key: "9kzdfg" }],
  ["path", { d: "M3.34 19a10 10 0 1 1 17.32 0", key: "19p75a" }]
];
const Gauge = createLucideIcon("gauge", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "20", height: "14", x: "2", y: "3", rx: "2", key: "48i651" }],
  ["line", { x1: "8", x2: "16", y1: "21", y2: "21", key: "1svkeh" }],
  ["line", { x1: "12", x2: "12", y1: "17", y2: "21", key: "vw1qmm" }]
];
const Monitor = createLucideIcon("monitor", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12.8 19.6A2 2 0 1 0 14 16H2", key: "148xed" }],
  ["path", { d: "M17.5 8a2.5 2.5 0 1 1 2 4H2", key: "1u4tom" }],
  ["path", { d: "M9.8 4.4A2 2 0 1 1 11 8H2", key: "75valh" }]
];
const Wind = createLucideIcon("wind", __iconNode);
const techCards = [
  {
    icon: Brain,
    title: "AI Driving Assist",
    desc: "Predictive M Drive logic adapts to your driving style in real-time, optimizing traction, throttle, and suspension response."
  },
  {
    icon: Monitor,
    title: "Digital Cockpit",
    desc: '12.3" curved display cluster with M-specific readouts, real-time performance metrics, and adaptive HUD projection.'
  },
  {
    icon: Gauge,
    title: "M Performance Tuning",
    desc: "Race-ready suspension with adjustable dampers, carbon ceramic brakes, and powertrain calibration across 3 drive modes."
  },
  {
    icon: Wind,
    title: "Carbon Aero Package",
    desc: "Full carbon fiber roof, hood vents, rear diffuser, and underbody aero kit — generating 40kg of downforce at 250 km/h."
  }
];
function TechSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      id: "tech",
      className: "relative py-28 overflow-hidden",
      style: { backgroundColor: "#0B0F14" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 opacity-[0.04] pointer-events-none",
            style: {
              backgroundImage: "linear-gradient(rgba(32,224,230,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(32,224,230,0.5) 1px, transparent 1px)",
              backgroundSize: "80px 80px"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none",
            style: {
              width: "800px",
              height: "400px",
              background: "radial-gradient(ellipse, rgba(32,224,230,0.04) 0%, transparent 70%)",
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
                fontSize: "16vw",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                opacity: 0.028
              },
              children: "M TECH"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 40 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.8 },
              className: "text-center mb-16",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-3 mb-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "h-px flex-1 max-w-16",
                      style: {
                        background: "linear-gradient(90deg, transparent, #20E0E6)"
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-xs tracking-[0.45em] font-bold eyebrow-dot eyebrow-dot-cyan",
                      style: { color: "#20E0E6" },
                      children: "INNOVATION"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "h-px flex-1 max-w-16",
                      style: {
                        background: "linear-gradient(90deg, #20E0E6, transparent)"
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
                      "M ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "heading-gradient-cyan", children: "TECHNOLOGY" })
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 xl:grid-cols-4 gap-6", children: techCards.map((card, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 60 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.7, delay: i * 0.12 },
              whileHover: { y: -8 },
              className: "tech-card group relative p-6 rounded-lg cursor-default",
              style: {
                background: "rgba(16, 22, 30, 0.7)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(32,224,230,0.1)"
              },
              "data-ocid": `tech.card.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-12 h-12 rounded-lg flex items-center justify-center mb-5 transition-all duration-300",
                    style: {
                      background: "rgba(32,224,230,0.07)",
                      border: "1px solid rgba(32,224,230,0.18)"
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      card.icon,
                      {
                        size: 22,
                        style: {
                          color: "#20E0E6",
                          filter: "drop-shadow(0 0 4px rgba(32,224,230,0.6))"
                        }
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h3",
                  {
                    className: "font-rajdhani font-bold text-xl tracking-wider mb-3",
                    style: { color: "#F2F5F7" },
                    children: card.title
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-sm leading-relaxed",
                    style: { color: "#7C8796" },
                    children: card.desc
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "absolute top-0 right-0 w-10 h-10",
                    style: {
                      background: "linear-gradient(225deg, rgba(32,224,230,0.18) 0%, transparent 60%)"
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "absolute bottom-0 left-4 right-4 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                    style: {
                      background: "linear-gradient(90deg, transparent, #20E0E6, transparent)",
                      boxShadow: "0 0 8px #20E0E6"
                    }
                  }
                )
              ]
            },
            card.title
          )) })
        ] })
      ]
    }
  );
}
export {
  TechSection as default
};
