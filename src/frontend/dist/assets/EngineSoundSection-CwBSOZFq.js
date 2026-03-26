import { r as reactExports, j as jsxRuntimeExports, m as motion } from "./index-CypPaStP.js";
const BAR_KEYS = ["b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7"];
function makeDistortionCurve(amount) {
  const n = 256;
  const buf = new ArrayBuffer(n * 4);
  const curve = new Float32Array(buf);
  for (let i = 0; i < n; i++) {
    const x = i * 2 / n - 1;
    if (x >= 0) {
      curve[i] = 1 - Math.exp(-amount * x);
    } else {
      curve[i] = -1 + Math.exp(amount * 0.7 * x);
    }
  }
  return curve;
}
function createNoiseBuffer(ctx, durationSec) {
  const sampleRate = ctx.sampleRate;
  const frameCount = Math.ceil(sampleRate * durationSec);
  const buffer = ctx.createBuffer(1, frameCount, sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < frameCount; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  return buffer;
}
function EngineSoundSection() {
  const [engineState, setEngineState] = reactExports.useState("stopped");
  const audioCtxRef = reactExports.useRef(null);
  const gainNodeRef = reactExports.useRef(null);
  const oscillatorsRef = reactExports.useRef([]);
  const noiseSourcesRef = reactExports.useRef([]);
  const stopTimerRef = reactExports.useRef(null);
  const stopEngine = reactExports.useCallback(() => {
    const ctx = audioCtxRef.current;
    const master = gainNodeRef.current;
    if (master && ctx) {
      for (const osc of oscillatorsRef.current) {
        try {
          osc.frequency.cancelScheduledValues(ctx.currentTime);
          osc.frequency.setValueAtTime(osc.frequency.value, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(20, ctx.currentTime + 1.2);
        } catch {
        }
      }
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
      master.gain.exponentialRampToValueAtTime(1e-3, ctx.currentTime + 1.2);
    }
    if (stopTimerRef.current) clearTimeout(stopTimerRef.current);
    stopTimerRef.current = setTimeout(() => {
      for (const osc of oscillatorsRef.current) {
        try {
          osc.stop();
        } catch {
        }
      }
      oscillatorsRef.current = [];
      for (const ns of noiseSourcesRef.current) {
        try {
          ns.stop();
        } catch {
        }
      }
      noiseSourcesRef.current = [];
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
    }, 1400);
    setEngineState("stopped");
  }, []);
  const startEngine = reactExports.useCallback(() => {
    setEngineState("starting");
    const ctx = new AudioContext();
    audioCtxRef.current = ctx;
    const t = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(1e-3, t);
    masterGain.connect(ctx.destination);
    gainNodeRef.current = masterGain;
    const waveshaper = ctx.createWaveShaper();
    waveshaper.curve = makeDistortionCurve(3.5);
    waveshaper.oversample = "4x";
    waveshaper.connect(masterGain);
    const lpFilter = ctx.createBiquadFilter();
    lpFilter.type = "lowpass";
    lpFilter.frequency.setValueAtTime(600, t);
    lpFilter.Q.value = 1.2;
    lpFilter.connect(waveshaper);
    const fundOsc = ctx.createOscillator();
    fundOsc.type = "sawtooth";
    fundOsc.frequency.setValueAtTime(8, t);
    const fundGain = ctx.createGain();
    fundGain.gain.setValueAtTime(1e-3, t);
    fundOsc.connect(fundGain);
    fundGain.connect(lpFilter);
    fundOsc.start(t);
    const harm2 = ctx.createOscillator();
    harm2.type = "sawtooth";
    harm2.frequency.setValueAtTime(16, t);
    harm2.detune.value = 3;
    const harm2Gain = ctx.createGain();
    harm2Gain.gain.setValueAtTime(1e-3, t);
    harm2.connect(harm2Gain);
    harm2Gain.connect(lpFilter);
    harm2.start(t);
    const harm4 = ctx.createOscillator();
    harm4.type = "sawtooth";
    harm4.frequency.setValueAtTime(32, t);
    harm4.detune.value = -3;
    const harm4Gain = ctx.createGain();
    harm4Gain.gain.setValueAtTime(1e-3, t);
    harm4.connect(harm4Gain);
    harm4Gain.connect(lpFilter);
    harm4.start(t);
    const exhaustOsc = ctx.createOscillator();
    exhaustOsc.type = "sine";
    exhaustOsc.frequency.setValueAtTime(20, t);
    exhaustOsc.detune.value = -5;
    const exhaustGain = ctx.createGain();
    exhaustGain.gain.setValueAtTime(1e-3, t);
    exhaustOsc.connect(exhaustGain);
    exhaustGain.connect(masterGain);
    exhaustOsc.start(t);
    const mechNoiseBuf = createNoiseBuffer(ctx, 12);
    const mechNoise = ctx.createBufferSource();
    mechNoise.buffer = mechNoiseBuf;
    mechNoise.loop = true;
    const mechBP = ctx.createBiquadFilter();
    mechBP.type = "bandpass";
    mechBP.frequency.setValueAtTime(120, t);
    mechBP.Q.value = 2;
    const mechNoiseGain = ctx.createGain();
    mechNoiseGain.gain.setValueAtTime(0, t);
    mechNoise.connect(mechBP);
    mechBP.connect(mechNoiseGain);
    mechNoiseGain.connect(masterGain);
    mechNoise.start(t);
    noiseSourcesRef.current.push(mechNoise);
    oscillatorsRef.current = [fundOsc, harm2, harm4, exhaustOsc];
    const setRpm = (rpm, when, rampDur) => {
      const firingFreq = rpm / 60 * 4;
      fundOsc.frequency.exponentialRampToValueAtTime(
        Math.max(firingFreq, 1),
        when + rampDur
      );
      harm2.frequency.exponentialRampToValueAtTime(
        Math.max(firingFreq * 2, 1),
        when + rampDur
      );
      harm4.frequency.exponentialRampToValueAtTime(
        Math.max(firingFreq * 4, 1),
        when + rampDur
      );
      exhaustOsc.frequency.exponentialRampToValueAtTime(
        Math.max(firingFreq * 3.2, 1),
        when + rampDur
      );
      lpFilter.frequency.exponentialRampToValueAtTime(
        Math.max(400 + rpm / 5500 * 3600, 1),
        when + rampDur
      );
    };
    masterGain.gain.exponentialRampToValueAtTime(0.18, t + 0.4);
    fundGain.gain.exponentialRampToValueAtTime(0.7, t + 0.15);
    harm2Gain.gain.exponentialRampToValueAtTime(0.4, t + 0.15);
    harm4Gain.gain.exponentialRampToValueAtTime(0.18, t + 0.15);
    exhaustGain.gain.exponentialRampToValueAtTime(0.12, t + 0.2);
    mechNoiseGain.gain.exponentialRampToValueAtTime(0.08, t + 0.15);
    (() => {
      const crankBuf = createNoiseBuffer(ctx, 0.5);
      const crankSrc = ctx.createBufferSource();
      crankSrc.buffer = crankBuf;
      const crankHP = ctx.createBiquadFilter();
      crankHP.type = "highpass";
      crankHP.frequency.value = 300;
      const crankGain = ctx.createGain();
      crankGain.gain.setValueAtTime(0.25, t);
      crankGain.gain.exponentialRampToValueAtTime(1e-3, t + 0.45);
      crankSrc.connect(crankHP);
      crankHP.connect(crankGain);
      crankGain.connect(masterGain);
      crankSrc.start(t);
      crankSrc.stop(t + 0.5);
      noiseSourcesRef.current.push(crankSrc);
    })();
    setRpm(300, t, 0.4);
    masterGain.gain.setValueAtTime(0.18, t + 0.4);
    masterGain.gain.exponentialRampToValueAtTime(0.42, t + 0.65);
    setRpm(2500, t + 0.4, 0.25);
    masterGain.gain.exponentialRampToValueAtTime(0.28, t + 2);
    setRpm(750, t + 0.8, 1.2);
    const burbleSteps = 6;
    for (let i = 0; i < burbleSteps; i++) {
      const when = t + 2 + i * (1.5 / burbleSteps);
      const rpm = 750 + (i % 2 === 0 ? 30 : -30);
      fundOsc.frequency.setValueAtTime(rpm / 60 * 4, when);
      harm2.frequency.setValueAtTime(rpm / 60 * 8, when);
      harm4.frequency.setValueAtTime(rpm / 60 * 16, when);
      exhaustOsc.frequency.setValueAtTime(rpm / 60 * 12.8, when);
    }
    masterGain.gain.setValueAtTime(0.28, t + 3.5);
    masterGain.gain.exponentialRampToValueAtTime(0.52, t + 5.2);
    setRpm(5500, t + 3.5, 2);
    lpFilter.frequency.exponentialRampToValueAtTime(4e3, t + 5.5);
    harm4Gain.gain.exponentialRampToValueAtTime(0.32, t + 5.2);
    mechNoiseGain.gain.exponentialRampToValueAtTime(0.14, t + 5);
    for (let i = 0; i < 4; i++) {
      const when = t + 5.5 + i * 0.25;
      const rpm = 5500 + (i % 2 === 0 ? 80 : -80);
      fundOsc.frequency.setValueAtTime(rpm / 60 * 4, when);
      harm2.frequency.setValueAtTime(rpm / 60 * 8, when);
      harm4.frequency.setValueAtTime(rpm / 60 * 16, when);
      exhaustOsc.frequency.setValueAtTime(rpm / 60 * 12.8, when);
    }
    masterGain.gain.setValueAtTime(0.52, t + 6.5);
    masterGain.gain.exponentialRampToValueAtTime(0.28, t + 8);
    setRpm(750, t + 6.5, 1.5);
    lpFilter.frequency.exponentialRampToValueAtTime(600, t + 8);
    harm4Gain.gain.exponentialRampToValueAtTime(0.18, t + 8);
    mechNoiseGain.gain.exponentialRampToValueAtTime(0.07, t + 8);
    const crackTimes = [6.5, 6.8, 7.1, 7.35, 7.6];
    for (const ct of crackTimes) {
      const popBuf = createNoiseBuffer(ctx, 0.08);
      const popSrc = ctx.createBufferSource();
      popSrc.buffer = popBuf;
      const popHP = ctx.createBiquadFilter();
      popHP.type = "highpass";
      popHP.frequency.value = 800;
      const popBP = ctx.createBiquadFilter();
      popBP.type = "peaking";
      popBP.frequency.value = 1800;
      popBP.gain.value = 8;
      const popGain = ctx.createGain();
      const popStart = t + ct;
      popGain.gain.setValueAtTime(0, popStart);
      popGain.gain.linearRampToValueAtTime(0.38, popStart + 0.01);
      popGain.gain.exponentialRampToValueAtTime(1e-3, popStart + 0.08);
      popSrc.connect(popHP);
      popHP.connect(popBP);
      popBP.connect(popGain);
      popGain.connect(masterGain);
      popSrc.start(popStart);
      popSrc.stop(popStart + 0.1);
      noiseSourcesRef.current.push(popSrc);
    }
    const scheduleIdleBurble = () => {
      if (!audioCtxRef.current) return;
      const now = audioCtxRef.current.currentTime;
      for (let i = 0; i < 8; i++) {
        const when = now + i * 0.18;
        const rpm = 750 + (Math.random() * 60 - 30);
        const ff = rpm / 60 * 4;
        fundOsc.frequency.setValueAtTime(Math.max(ff, 1), when);
        harm2.frequency.setValueAtTime(Math.max(ff * 2, 1), when);
        harm4.frequency.setValueAtTime(Math.max(ff * 4, 1), when);
        exhaustOsc.frequency.setValueAtTime(Math.max(ff * 3.2, 1), when);
      }
    };
    const burbleInterval = setInterval(() => {
      if (!audioCtxRef.current) {
        clearInterval(burbleInterval);
        return;
      }
      scheduleIdleBurble();
    }, 1200);
    setTimeout(() => scheduleIdleBurble(), (t + 8 - ctx.currentTime) * 1e3);
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
                        height: isRunning ? [8, 22, 8] : 4
                      },
                      transition: {
                        duration: 0.2,
                        repeat: isRunning ? Number.POSITIVE_INFINITY : 0,
                        repeatType: "reverse",
                        delay: Number(key.replace("b", "")) * 0.025
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
              children: isRunning ? "Web Audio API · Real-time synthesis" : "Click to experience the S63 V8 sound"
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
