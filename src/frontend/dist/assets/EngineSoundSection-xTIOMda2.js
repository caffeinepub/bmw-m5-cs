import { r as reactExports, j as jsxRuntimeExports, m as motion } from "./index-CFGClM9r.js";
const AUDIO_SRC = "/assets/uploads/bmw_m5_f90_stage_3_ib_performance_-_fire_exhaust_dyno_insane_-_horsepower_lovers_youtube-019d2a87-823b-7489-96db-dc6c64c07fb7-1.mp3";
const BAR_KEYS = ["b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7"];
function EngineSoundSection() {
  const [engineState, setEngineState] = reactExports.useState("stopped");
  const audioRef = reactExports.useRef(null);
  const fadeTimerRef = reactExports.useRef(null);
  const stopEngine = reactExports.useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (fadeTimerRef.current) clearInterval(fadeTimerRef.current);
    fadeTimerRef.current = setInterval(() => {
      if (!audioRef.current) return;
      if (audioRef.current.volume > 0.05) {
        audioRef.current.volume = Math.max(0, audioRef.current.volume - 0.08);
      } else {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current.volume = 1;
        if (fadeTimerRef.current) clearInterval(fadeTimerRef.current);
      }
    }, 50);
    setEngineState("stopped");
  }, []);
  const startEngine = reactExports.useCallback(async () => {
    setEngineState("starting");
    if (fadeTimerRef.current) clearInterval(fadeTimerRef.current);
    if (!audioRef.current) {
      audioRef.current = new Audio(AUDIO_SRC);
      audioRef.current.loop = true;
    }
    const audio = audioRef.current;
    audio.volume = 0;
    audio.currentTime = 0;
    try {
      await audio.play();
    } catch {
      setEngineState("stopped");
      return;
    }
    if (fadeTimerRef.current) clearInterval(fadeTimerRef.current);
    fadeTimerRef.current = setInterval(() => {
      if (!audioRef.current) return;
      if (audioRef.current.volume < 0.95) {
        audioRef.current.volume = Math.min(1, audioRef.current.volume + 0.06);
      } else {
        audioRef.current.volume = 1;
        if (fadeTimerRef.current) clearInterval(fadeTimerRef.current);
      }
    }, 50);
    setTimeout(() => setEngineState("running"), 800);
  }, []);
  const handleButtonClick = () => {
    if (engineState === "stopped") startEngine();
    else if (engineState === "running") stopEngine();
  };
  const isRunning = engineState === "running";
  const isStarting = engineState === "starting";
  const buttonLabel = engineState === "stopped" ? "START ENGINE" : engineState === "starting" ? "STARTING..." : "STOP ENGINE";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      className: `relative py-28 overflow-hidden ${isRunning ? "engine-running" : ""}`,
      style: { backgroundColor: "#0B0F14" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            animate: {
              opacity: isRunning ? [0.18, 0.35, 0.18] : 0.06,
              scale: isRunning ? [1, 1.12, 1] : 1
            },
            transition: {
              duration: 0.5,
              repeat: isRunning ? Number.POSITIVE_INFINITY : 0
            },
            className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none",
            style: {
              width: "700px",
              height: "700px",
              background: "radial-gradient(circle, #E53935 0%, transparent 65%)",
              filter: "blur(80px)"
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
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-6 text-center relative z-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 40 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.8 },
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
                      children: "EXPERIENCE"
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
                    className: "font-rajdhani font-bold text-5xl md:text-6xl tracking-wider mb-16",
                    style: { color: "#F2F5F7" },
                    children: [
                      "FEEL THE ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "heading-gradient-red", children: "POWER" })
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center justify-center mb-14", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "svg",
              {
                width: "260",
                height: "300",
                viewBox: "0 0 260 300",
                className: "absolute",
                "aria-label": "Engine hexagon visualization",
                role: "img",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Engine hexagon visualization" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "polygon",
                    {
                      points: "130,12 228,68 228,208 130,264 32,208 32,68",
                      fill: "none",
                      stroke: isRunning ? "#E53935" : "rgba(229,57,53,0.25)",
                      strokeWidth: isRunning ? "2" : "1",
                      style: {
                        filter: isRunning ? "drop-shadow(0 0 8px #E53935) drop-shadow(0 0 20px rgba(229,57,53,0.4))" : "none",
                        transition: "all 0.5s ease"
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "polygon",
                    {
                      points: "130,4 236,64 236,216 130,276 24,216 24,64",
                      fill: "none",
                      stroke: isRunning ? "rgba(229,57,53,0.35)" : "rgba(229,57,53,0.08)",
                      strokeWidth: "1",
                      style: { transition: "all 0.5s ease" }
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "relative z-10 flex flex-col items-center gap-4",
                style: { height: 300, justifyContent: "center" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "w-16 h-16 rounded-full flex items-center justify-center font-rajdhani font-bold text-lg",
                      style: {
                        border: `2px solid ${isRunning ? "#E53935" : "rgba(229,57,53,0.35)"}`,
                        color: isRunning ? "#E53935" : "rgba(229,57,53,0.5)",
                        boxShadow: isRunning ? "0 0 12px rgba(229,57,53,0.6), 0 0 30px rgba(229,57,53,0.2)" : "none",
                        transition: "all 0.5s ease"
                      },
                      children: "V8"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 items-end h-8", children: BAR_KEYS.map((key) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      className: "w-1 rounded-full",
                      animate: {
                        height: isRunning ? [8, 28, 8] : 4
                      },
                      transition: {
                        duration: 0.15,
                        repeat: isRunning ? Number.POSITIVE_INFINITY : 0,
                        repeatType: "reverse",
                        delay: Number(key.replace("b", "")) * 0.02
                      },
                      style: {
                        backgroundColor: isRunning ? "#E53935" : "rgba(229,57,53,0.25)",
                        boxShadow: isRunning ? "0 0 5px #E53935, 0 0 10px rgba(229,57,53,0.4)" : "none"
                      }
                    },
                    key
                  )) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "text-xs tracking-[0.3em] font-semibold",
                      style: {
                        color: isRunning ? "#E53935" : "#7C8796",
                        textShadow: isRunning ? "0 0 8px rgba(229,57,53,0.7)" : "none"
                      },
                      children: isRunning ? "ENGINE RUNNING" : "627 HP S63 V8"
                    }
                  )
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.button,
            {
              type: "button",
              onClick: handleButtonClick,
              disabled: isStarting,
              whileTap: { scale: 0.96 },
              className: "px-12 py-4 font-rajdhani font-bold text-lg tracking-[0.3em] rounded transition-all duration-300",
              style: {
                border: `2px solid ${isRunning ? "#E53935" : "rgba(229,57,53,0.5)"}`,
                color: isRunning ? "#fff" : "#E53935",
                backgroundColor: isRunning ? "rgba(229,57,53,0.15)" : "transparent",
                boxShadow: isRunning ? "0 0 20px rgba(229,57,53,0.5), 0 0 50px rgba(229,57,53,0.15), inset 0 0 20px rgba(229,57,53,0.05)" : "none",
                opacity: isStarting ? 0.7 : 1,
                cursor: isStarting ? "not-allowed" : "pointer"
              },
              "data-ocid": "engine.primary_button",
              children: buttonLabel
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "mt-4 text-xs tracking-widest",
              style: { color: "#7C8796" },
              children: isRunning ? "BMW M5 F90 Stage 3 · IB Performance · Live Audio" : "Click to hear the real S63 V8"
            }
          )
        ] })
      ]
    }
  );
}
export {
  EngineSoundSection as default
};
