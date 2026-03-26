import { motion } from "motion/react";
import { useCallback, useRef, useState } from "react";

type EngineState = "stopped" | "starting" | "running";

const BAR_KEYS = ["b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7"];

// Build a waveshaper curve for asymmetric harmonic distortion (engine grunt)
function makeDistortionCurve(amount: number): Float32Array {
  const n = 256;
  const buf = new ArrayBuffer(n * 4);
  const curve = new Float32Array(buf);
  for (let i = 0; i < n; i++) {
    const x = (i * 2) / n - 1;
    // Asymmetric soft-clip: more saturation on positive half (like a piston)
    if (x >= 0) {
      curve[i] = 1 - Math.exp(-amount * x);
    } else {
      curve[i] = -1 + Math.exp(amount * 0.7 * x);
    }
  }
  return curve;
}

// Create a burst of white noise (for crankle pops and mechanical texture)
function createNoiseBuffer(
  ctx: AudioContext,
  durationSec: number,
): AudioBuffer {
  const sampleRate = ctx.sampleRate;
  const frameCount = Math.ceil(sampleRate * durationSec);
  const buffer = ctx.createBuffer(1, frameCount, sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < frameCount; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  return buffer;
}

export default function EngineSoundSection() {
  const [engineState, setEngineState] = useState<EngineState>("stopped");
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const noiseSourcesRef = useRef<AudioBufferSourceNode[]>([]);
  const stopTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stopEngine = useCallback(() => {
    const ctx = audioCtxRef.current;
    const master = gainNodeRef.current;
    if (master && ctx) {
      // Brief frequency sag then fade — engine shutdown feel
      for (const osc of oscillatorsRef.current) {
        try {
          osc.frequency.cancelScheduledValues(ctx.currentTime);
          osc.frequency.setValueAtTime(osc.frequency.value, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(20, ctx.currentTime + 1.2);
        } catch {}
      }
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
      master.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
    }
    if (stopTimerRef.current) clearTimeout(stopTimerRef.current);
    stopTimerRef.current = setTimeout(() => {
      for (const osc of oscillatorsRef.current) {
        try {
          osc.stop();
        } catch {}
      }
      oscillatorsRef.current = [];
      for (const ns of noiseSourcesRef.current) {
        try {
          ns.stop();
        } catch {}
      }
      noiseSourcesRef.current = [];
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
    }, 1400);
    setEngineState("stopped");
  }, []);

  const startEngine = useCallback(() => {
    setEngineState("starting");

    const ctx = new AudioContext();
    audioCtxRef.current = ctx;
    const t = ctx.currentTime;

    // ─── Master gain ────────────────────────────────────────────────────────
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.001, t);
    masterGain.connect(ctx.destination);
    gainNodeRef.current = masterGain;

    // ─── Waveshaper distortion (engine grunt / grit) ─────────────────────────
    const waveshaper = ctx.createWaveShaper();
    waveshaper.curve = makeDistortionCurve(3.5) as Float32Array<ArrayBuffer>;
    waveshaper.oversample = "4x";
    waveshaper.connect(masterGain);

    // ─── Low-pass filter for V8 chug ─────────────────────────────────────────
    const lpFilter = ctx.createBiquadFilter();
    lpFilter.type = "lowpass";
    lpFilter.frequency.setValueAtTime(600, t);
    lpFilter.Q.value = 1.2;
    lpFilter.connect(waveshaper);

    // ─── Fundamental V8 firing oscillator ────────────────────────────────────
    // V8 fires 4x per rev; idle 750 RPM → 750/60*4 = 50 Hz
    const fundOsc = ctx.createOscillator();
    fundOsc.type = "sawtooth";
    fundOsc.frequency.setValueAtTime(8, t);
    const fundGain = ctx.createGain();
    fundGain.gain.setValueAtTime(0.001, t);
    fundOsc.connect(fundGain);
    fundGain.connect(lpFilter);
    fundOsc.start(t);

    // ─── 2nd harmonic ────────────────────────────────────────────────────────
    const harm2 = ctx.createOscillator();
    harm2.type = "sawtooth";
    harm2.frequency.setValueAtTime(16, t);
    harm2.detune.value = 3;
    const harm2Gain = ctx.createGain();
    harm2Gain.gain.setValueAtTime(0.001, t);
    harm2.connect(harm2Gain);
    harm2Gain.connect(lpFilter);
    harm2.start(t);

    // ─── 4th harmonic ────────────────────────────────────────────────────────
    const harm4 = ctx.createOscillator();
    harm4.type = "sawtooth";
    harm4.frequency.setValueAtTime(32, t);
    harm4.detune.value = -3;
    const harm4Gain = ctx.createGain();
    harm4Gain.gain.setValueAtTime(0.001, t);
    harm4.connect(harm4Gain);
    harm4Gain.connect(lpFilter);
    harm4.start(t);

    // ─── Exhaust resonance oscillator (~160 Hz at idle) ───────────────────────
    const exhaustOsc = ctx.createOscillator();
    exhaustOsc.type = "sine";
    exhaustOsc.frequency.setValueAtTime(20, t);
    exhaustOsc.detune.value = -5;
    const exhaustGain = ctx.createGain();
    exhaustGain.gain.setValueAtTime(0.001, t);
    exhaustOsc.connect(exhaustGain);
    exhaustGain.connect(masterGain);
    exhaustOsc.start(t);

    // ─── Mechanical noise layer (bandpass ~120 Hz, continuous) ────────────────
    const mechNoiseBuf = createNoiseBuffer(ctx, 12);
    const mechNoise = ctx.createBufferSource();
    mechNoise.buffer = mechNoiseBuf;
    mechNoise.loop = true;
    const mechBP = ctx.createBiquadFilter();
    mechBP.type = "bandpass";
    mechBP.frequency.setValueAtTime(120, t);
    mechBP.Q.value = 2;
    const mechNoiseGain = ctx.createGain();
    mechNoiseGain.gain.setValueAtTime(0.0, t);
    mechNoise.connect(mechBP);
    mechBP.connect(mechNoiseGain);
    mechNoiseGain.connect(masterGain);
    mechNoise.start(t);
    noiseSourcesRef.current.push(mechNoise);

    // Store oscillators for cleanup
    oscillatorsRef.current = [fundOsc, harm2, harm4, exhaustOsc];

    // Helper: set all osc frequencies scaled by RPM
    const setRpm = (rpm: number, when: number, rampDur: number) => {
      const firingFreq = (rpm / 60) * 4;
      fundOsc.frequency.exponentialRampToValueAtTime(
        Math.max(firingFreq, 1),
        when + rampDur,
      );
      harm2.frequency.exponentialRampToValueAtTime(
        Math.max(firingFreq * 2, 1),
        when + rampDur,
      );
      harm4.frequency.exponentialRampToValueAtTime(
        Math.max(firingFreq * 4, 1),
        when + rampDur,
      );
      exhaustOsc.frequency.exponentialRampToValueAtTime(
        Math.max(firingFreq * 3.2, 1),
        when + rampDur,
      );
      lpFilter.frequency.exponentialRampToValueAtTime(
        Math.max(400 + (rpm / 5500) * 3600, 1),
        when + rampDur,
      );
    };

    // ── Phase 1 (0 – 0.4s): Crank burst ──────────────────────────────────────
    masterGain.gain.exponentialRampToValueAtTime(0.18, t + 0.4);
    fundGain.gain.exponentialRampToValueAtTime(0.7, t + 0.15);
    harm2Gain.gain.exponentialRampToValueAtTime(0.4, t + 0.15);
    harm4Gain.gain.exponentialRampToValueAtTime(0.18, t + 0.15);
    exhaustGain.gain.exponentialRampToValueAtTime(0.12, t + 0.2);
    mechNoiseGain.gain.exponentialRampToValueAtTime(0.08, t + 0.15);
    // crank spin-up noise burst
    (() => {
      const crankBuf = createNoiseBuffer(ctx, 0.5);
      const crankSrc = ctx.createBufferSource();
      crankSrc.buffer = crankBuf;
      const crankHP = ctx.createBiquadFilter();
      crankHP.type = "highpass";
      crankHP.frequency.value = 300;
      const crankGain = ctx.createGain();
      crankGain.gain.setValueAtTime(0.25, t);
      crankGain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);
      crankSrc.connect(crankHP);
      crankHP.connect(crankGain);
      crankGain.connect(masterGain);
      crankSrc.start(t);
      crankSrc.stop(t + 0.5);
      noiseSourcesRef.current.push(crankSrc);
    })();
    setRpm(300, t, 0.4);

    // ── Phase 2 (0.4 – 0.8s): Ignition catch — spike to 2500 RPM ─────────────
    masterGain.gain.setValueAtTime(0.18, t + 0.4);
    masterGain.gain.exponentialRampToValueAtTime(0.42, t + 0.65);
    setRpm(2500, t + 0.4, 0.25);

    // ── Phase 3 (0.8 – 2.0s): Settle to idle 750 RPM ─────────────────────────
    masterGain.gain.exponentialRampToValueAtTime(0.28, t + 2.0);
    setRpm(750, t + 0.8, 1.2);

    // ── Phase 4 (2.0 – 3.5s): Hold idle with lumpy V8 burble ─────────────────
    const burbleSteps = 6;
    for (let i = 0; i < burbleSteps; i++) {
      const when = t + 2.0 + i * (1.5 / burbleSteps);
      const rpm = 750 + (i % 2 === 0 ? 30 : -30);
      fundOsc.frequency.setValueAtTime((rpm / 60) * 4, when);
      harm2.frequency.setValueAtTime((rpm / 60) * 8, when);
      harm4.frequency.setValueAtTime((rpm / 60) * 16, when);
      exhaustOsc.frequency.setValueAtTime((rpm / 60) * 12.8, when);
    }
    masterGain.gain.setValueAtTime(0.28, t + 3.5);

    // ── Phase 5 (3.5 – 5.5s): Aggressive rev-up to 5500 RPM ──────────────────
    masterGain.gain.exponentialRampToValueAtTime(0.52, t + 5.2);
    setRpm(5500, t + 3.5, 2.0);
    lpFilter.frequency.exponentialRampToValueAtTime(4000, t + 5.5);
    harm4Gain.gain.exponentialRampToValueAtTime(0.32, t + 5.2);
    mechNoiseGain.gain.exponentialRampToValueAtTime(0.14, t + 5.0);

    // ── Phase 6 (5.5 – 6.5s): Hold at high RPM ───────────────────────────────
    for (let i = 0; i < 4; i++) {
      const when = t + 5.5 + i * 0.25;
      const rpm = 5500 + (i % 2 === 0 ? 80 : -80);
      fundOsc.frequency.setValueAtTime((rpm / 60) * 4, when);
      harm2.frequency.setValueAtTime((rpm / 60) * 8, when);
      harm4.frequency.setValueAtTime((rpm / 60) * 16, when);
      exhaustOsc.frequency.setValueAtTime((rpm / 60) * 12.8, when);
    }
    masterGain.gain.setValueAtTime(0.52, t + 6.5);

    // ── Phase 7 (6.5 – 8.0s): Rev drop back to idle ──────────────────────────
    masterGain.gain.exponentialRampToValueAtTime(0.28, t + 8.0);
    setRpm(750, t + 6.5, 1.5);
    lpFilter.frequency.exponentialRampToValueAtTime(600, t + 8.0);
    harm4Gain.gain.exponentialRampToValueAtTime(0.18, t + 8.0);
    mechNoiseGain.gain.exponentialRampToValueAtTime(0.07, t + 8.0);

    // ── Exhaust crackle pops at rev drop (6.5 – 7.5s) ────────────────────────
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
      popGain.gain.setValueAtTime(0.0, popStart);
      popGain.gain.linearRampToValueAtTime(0.38, popStart + 0.01);
      popGain.gain.exponentialRampToValueAtTime(0.001, popStart + 0.08);
      popSrc.connect(popHP);
      popHP.connect(popBP);
      popBP.connect(popGain);
      popGain.connect(masterGain);
      popSrc.start(popStart);
      popSrc.stop(popStart + 0.1);
      noiseSourcesRef.current.push(popSrc);
    }

    // ── Phase 8 (8.0+): Continuous idle burble until STOP ────────────────────
    const scheduleIdleBurble = () => {
      if (!audioCtxRef.current) return;
      const now = audioCtxRef.current.currentTime;
      for (let i = 0; i < 8; i++) {
        const when = now + i * 0.18;
        const rpm = 750 + (Math.random() * 60 - 30);
        const ff = (rpm / 60) * 4;
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
    setTimeout(() => scheduleIdleBurble(), (t + 8.0 - ctx.currentTime) * 1000);

    setTimeout(() => setEngineState("running"), 800);
  }, []);

  const handleButtonClick = () => {
    if (engineState === "stopped") startEngine();
    else if (engineState === "running") stopEngine();
  };

  const isRunning = engineState === "running";
  const isStarting = engineState === "starting";
  const buttonLabel =
    engineState === "stopped"
      ? "START ENGINE"
      : engineState === "starting"
        ? "STARTING..."
        : "STOP ENGINE";

  return (
    <section
      className={`relative py-28 overflow-hidden ${isRunning ? "engine-running" : ""}`}
      style={{ backgroundColor: "#0B0F14" }}
    >
      {/* Pulsing red radial glow */}
      <motion.div
        animate={{
          opacity: isRunning ? [0.18, 0.35, 0.18] : 0.06,
          scale: isRunning ? [1, 1.12, 1] : 1,
        }}
        transition={{
          duration: 0.5,
          repeat: isRunning ? Number.POSITIVE_INFINITY : 0,
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          width: "700px",
          height: "700px",
          background: "radial-gradient(circle, #E53935 0%, transparent 65%)",
          filter: "blur(80px)",
        }}
      />

      {/* Top bleed */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: "100px",
          background: "linear-gradient(to bottom, #0B0F14, transparent)",
          zIndex: 1,
        }}
      />
      {/* Bottom bleed */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: "120px",
          background: "linear-gradient(to bottom, transparent, #0B0F14)",
          zIndex: 1,
        }}
      />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div
              className="h-px flex-1 max-w-16"
              style={{
                background: "linear-gradient(90deg, transparent, #E53935)",
              }}
            />
            <span
              className="text-xs tracking-[0.45em] font-bold eyebrow-dot eyebrow-dot-red"
              style={{ color: "#E53935" }}
            >
              EXPERIENCE
            </span>
            <div
              className="h-px flex-1 max-w-16"
              style={{
                background: "linear-gradient(90deg, #E53935, transparent)",
              }}
            />
          </div>
          <h2
            className="font-rajdhani font-bold text-5xl md:text-6xl tracking-wider mb-16"
            style={{ color: "#F2F5F7" }}
          >
            FEEL THE <span className="heading-gradient-red">POWER</span>
          </h2>
        </motion.div>

        {/* Hexagon */}
        <div className="relative flex items-center justify-center mb-14">
          <svg
            width="260"
            height="300"
            viewBox="0 0 260 300"
            className="absolute"
            aria-label="Engine hexagon visualization"
            role="img"
          >
            <title>Engine hexagon visualization</title>
            <polygon
              points="130,12 228,68 228,208 130,264 32,208 32,68"
              fill="none"
              stroke={isRunning ? "#E53935" : "rgba(229,57,53,0.25)"}
              strokeWidth={isRunning ? "2" : "1"}
              style={{
                filter: isRunning
                  ? "drop-shadow(0 0 8px #E53935) drop-shadow(0 0 20px rgba(229,57,53,0.4))"
                  : "none",
                transition: "all 0.5s ease",
              }}
            />
            <polygon
              points="130,4 236,64 236,216 130,276 24,216 24,64"
              fill="none"
              stroke={
                isRunning ? "rgba(229,57,53,0.35)" : "rgba(229,57,53,0.08)"
              }
              strokeWidth="1"
              style={{ transition: "all 0.5s ease" }}
            />
          </svg>

          <div
            className="relative z-10 flex flex-col items-center gap-4"
            style={{ height: 300, justifyContent: "center" }}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center font-rajdhani font-bold text-lg"
              style={{
                border: `2px solid ${
                  isRunning ? "#E53935" : "rgba(229,57,53,0.35)"
                }`,
                color: isRunning ? "#E53935" : "rgba(229,57,53,0.5)",
                boxShadow: isRunning
                  ? "0 0 12px rgba(229,57,53,0.6), 0 0 30px rgba(229,57,53,0.2)"
                  : "none",
                transition: "all 0.5s ease",
              }}
            >
              V8
            </div>

            <div className="flex gap-1 items-end h-8">
              {BAR_KEYS.map((key) => (
                <motion.div
                  key={key}
                  className="w-1 rounded-full"
                  animate={{
                    height: isRunning ? [8, 22, 8] : 4,
                  }}
                  transition={{
                    duration: 0.2,
                    repeat: isRunning ? Number.POSITIVE_INFINITY : 0,
                    repeatType: "reverse",
                    delay: Number(key.replace("b", "")) * 0.025,
                  }}
                  style={{
                    backgroundColor: isRunning
                      ? "#E53935"
                      : "rgba(229,57,53,0.25)",
                    boxShadow: isRunning
                      ? "0 0 5px #E53935, 0 0 10px rgba(229,57,53,0.4)"
                      : "none",
                  }}
                />
              ))}
            </div>

            <div
              className="text-xs tracking-[0.3em] font-semibold"
              style={{
                color: isRunning ? "#E53935" : "#7C8796",
                textShadow: isRunning ? "0 0 8px rgba(229,57,53,0.7)" : "none",
              }}
            >
              {isRunning ? "ENGINE RUNNING" : "627 HP S63 V8"}
            </div>
          </div>
        </div>

        <motion.button
          type="button"
          onClick={handleButtonClick}
          disabled={isStarting}
          whileTap={{ scale: 0.96 }}
          className="px-12 py-4 font-rajdhani font-bold text-lg tracking-[0.3em] rounded transition-all duration-300"
          style={{
            border: `2px solid ${
              isRunning ? "#E53935" : "rgba(229,57,53,0.5)"
            }`,
            color: isRunning ? "#fff" : "#E53935",
            backgroundColor: isRunning ? "rgba(229,57,53,0.15)" : "transparent",
            boxShadow: isRunning
              ? "0 0 20px rgba(229,57,53,0.5), 0 0 50px rgba(229,57,53,0.15), inset 0 0 20px rgba(229,57,53,0.05)"
              : "none",
            opacity: isStarting ? 0.7 : 1,
            cursor: isStarting ? "not-allowed" : "pointer",
          }}
          data-ocid="engine.primary_button"
        >
          {buttonLabel}
        </motion.button>

        <p
          className="mt-4 text-xs tracking-widest"
          style={{ color: "#7C8796" }}
        >
          {isRunning
            ? "Web Audio API · Real-time synthesis"
            : "Click to experience the S63 V8 sound"}
        </p>
      </div>
    </section>
  );
}
