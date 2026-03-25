import { r as reactExports, j as jsxRuntimeExports, m as motion, A as AnimatePresence } from "./index-DNTSR8Y7.js";
const exteriorImages = [
  {
    src: "/assets/generated/bmw-exterior-side.dim_1200x800.jpg",
    title: "Carbon Fiber Aerodynamics",
    desc: "Every surface shaped by the wind. The M5 CS features the most aggressive aero package ever fitted to an M5."
  },
  {
    src: "/assets/generated/bmw-exterior-rear.dim_1200x800.jpg",
    title: "Quad Exhaust & Diffuser",
    desc: "Four M Performance exhaust tips frame the carbon diffuser, providing both visual drama and functional downforce."
  }
];
const interiorImages = [
  {
    src: "/assets/generated/bmw-interior-cockpit.dim_1200x800.jpg",
    title: "Digital M Cockpit",
    desc: '12.3" curved M-specific instrument cluster with real-time performance data and race-ready readouts.'
  },
  {
    src: "/assets/generated/bmw-interior-seats.dim_1200x800.jpg",
    title: "Full Merino Sport Seats",
    desc: "Lightweight carbon-backed bucket seats with exclusive Merino leather and M-color stitching."
  }
];
function ImageCard({ src, title, desc, index }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 40 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.7, delay: index * 0.15 },
      className: "group relative rounded-lg overflow-hidden cursor-pointer",
      style: { border: "1px solid rgba(32,224,230,0.1)" },
      whileHover: { scale: 1.02 },
      "data-ocid": `design.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden", style: { aspectRatio: "3/2" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src,
              alt: title,
              className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400",
              style: {
                background: "linear-gradient(0deg, rgba(11,15,20,0.95) 0%, rgba(11,15,20,0.25) 50%, transparent 100%)"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none",
              style: {
                boxShadow: "inset 0 0 0 1px rgba(32,224,230,0.6), inset 0 0 30px rgba(32,224,230,0.08)"
              }
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "p-5 relative",
            style: {
              backgroundColor: "rgba(12, 16, 22, 0.98)",
              borderTop: "1px solid rgba(32,224,230,0.08)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute left-0 top-0 bottom-0 w-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                  style: {
                    background: "linear-gradient(180deg, #20E0E6, rgba(32,224,230,0.2))",
                    boxShadow: "2px 0 12px rgba(32,224,230,0.4)"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h3",
                {
                  className: "font-rajdhani font-bold text-xl tracking-wider mb-2 pl-2",
                  style: { color: "#F2F5F7" },
                  children: title
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-sm leading-relaxed pl-2",
                  style: { color: "#7C8796" },
                  children: desc
                }
              )
            ]
          }
        )
      ]
    }
  );
}
function DesignShowcase() {
  const [activeTab, setActiveTab] = reactExports.useState(
    "exterior"
  );
  const images = activeTab === "exterior" ? exteriorImages : interiorImages;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      id: "design",
      className: "relative py-28 overflow-hidden",
      style: { backgroundColor: "#0B0F14" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute top-0 left-1/2 -translate-x-1/2 w-px opacity-20 pointer-events-none",
            style: {
              height: "100%",
              background: "linear-gradient(180deg, transparent 0%, #20E0E6 40%, #20E0E6 60%, transparent 100%)"
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
                fontSize: "20vw",
                top: "40%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                opacity: 0.025
              },
              children: "DESIGN"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 40 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.8 },
              className: "text-center mb-12",
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
                      children: "CRAFT"
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
                      "DESIGN ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "heading-gradient-cyan", children: "PHILOSOPHY" })
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "inline-flex rounded p-1",
              style: {
                backgroundColor: "rgba(16,22,30,0.9)",
                border: "1px solid rgba(32,224,230,0.12)",
                boxShadow: "inset 0 0 20px rgba(32,224,230,0.03)"
              },
              children: ["exterior", "interior"].map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setActiveTab(tab),
                  className: "relative px-8 py-2.5 text-sm font-bold tracking-[0.2em] rounded transition-all duration-300",
                  style: {
                    color: activeTab === tab ? "#20E0E6" : "#7C8796",
                    backgroundColor: activeTab === tab ? "rgba(32,224,230,0.08)" : "transparent",
                    textShadow: activeTab === tab ? "0 0 10px rgba(32,224,230,0.5)" : "none"
                  },
                  "data-ocid": "design.tab",
                  children: [
                    tab.toUpperCase(),
                    activeTab === tab && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.div,
                      {
                        layoutId: "tab-indicator",
                        className: "absolute bottom-0 left-4 right-4 h-px",
                        style: {
                          backgroundColor: "#20E0E6",
                          boxShadow: "0 0 6px #20E0E6, 0 0 12px rgba(32,224,230,0.4)"
                        }
                      }
                    )
                  ]
                },
                tab
              ))
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: -20 },
              transition: { duration: 0.4 },
              className: "grid md:grid-cols-2 gap-6",
              children: images.map((img, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ImageCard, { ...img, index: i }, img.src))
            },
            activeTab
          ) })
        ] })
      ]
    }
  );
}
export {
  DesignShowcase as default
};
