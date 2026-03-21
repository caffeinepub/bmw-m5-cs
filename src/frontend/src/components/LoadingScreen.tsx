import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const INIT_STEPS = [
  "LOADING M DIVISION SYSTEMS...",
  "CALIBRATING ENGINE PARAMETERS...",
  "INITIALIZING HOLOGRAPHIC ARRAY...",
  "RENDERING M5 CS DATA FEED...",
  "SYSTEMS ONLINE.",
];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [stepIdx, setStepIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 3.5 + 0.8;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setVisible(false);
            setTimeout(onComplete, 700);
          }, 350);
          return 100;
        }
        return next;
      });
    }, 45);
    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    const idx = Math.min(
      Math.floor((progress / 100) * INIT_STEPS.length),
      INIT_STEPS.length - 1,
    );
    setStepIdx(idx);
  }, [progress]);

  const clampedProgress = Math.min(progress, 100);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ backgroundColor: "#0B0F14" }}
        >
          {/* Scanline */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute left-0 right-0 h-px opacity-25"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #20E0E6, transparent)",
                animation: "scan-line 2s linear infinite",
              }}
            />
          </div>

          {/* Outer pulse ring */}
          <div className="relative mb-10">
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY }}
              style={{
                width: 160,
                height: 160,
                top: "50%",
                left: "50%",
                translate: "-50% -50%",
                border: "1px solid #20E0E6",
                borderRadius: "50%",
              }}
            />
            <motion.div
              className="absolute rounded-full"
              animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0, 0.25] }}
              transition={{
                duration: 2.5,
                delay: 0.4,
                repeat: Number.POSITIVE_INFINITY,
              }}
              style={{
                width: 180,
                height: 180,
                top: "50%",
                left: "50%",
                translate: "-50% -50%",
                border: "1px solid rgba(32,224,230,0.4)",
                borderRadius: "50%",
              }}
            />

            {/* Main M circle */}
            <motion.div
              initial={{ scale: 0, rotate: -180, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ duration: 0.9, ease: "backOut" }}
              className="relative flex items-center justify-center"
              style={{
                width: 110,
                height: 110,
                borderRadius: "50%",
                border: "2px solid #20E0E6",
                boxShadow:
                  "0 0 40px rgba(32,224,230,0.5), inset 0 0 30px rgba(32,224,230,0.06)",
                background: "rgba(11,15,20,0.9)",
              }}
            >
              <span
                className="text-4xl font-bold font-rajdhani"
                style={{
                  color: "#20E0E6",
                  letterSpacing: "0.05em",
                  textShadow: "0 0 20px rgba(32,224,230,0.8)",
                }}
              >
                M
              </span>
            </motion.div>

            {/* Orbiting dot */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 2.2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              className="absolute inset-0 flex items-start justify-center"
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor: "#E53935",
                  boxShadow: "0 0 12px #E53935, 0 0 24px rgba(229,57,53,0.5)",
                  marginTop: -5,
                }}
              />
            </motion.div>
          </div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-center mb-10"
          >
            <div
              className="text-sm font-semibold tracking-[0.5em] mb-1"
              style={{ color: "#7C8796" }}
            >
              BMW
            </div>
            <div
              className="font-rajdhani font-bold tracking-widest"
              style={{
                fontSize: "3.5rem",
                lineHeight: 1,
                color: "#F2F5F7",
                letterSpacing: "0.15em",
                textShadow: "0 0 30px rgba(32,224,230,0.15)",
              }}
            >
              M5 CS
            </div>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="h-px mt-3 mx-auto"
              style={{
                maxWidth: 200,
                background:
                  "linear-gradient(90deg, transparent, #20E0E6, transparent)",
              }}
            />
          </motion.div>

          {/* Progress bar */}
          <div className="w-72">
            <div className="flex justify-between mb-2">
              <motion.span
                key={stepIdx}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-xs font-mono"
                style={{ color: "#7C8796" }}
              >
                {INIT_STEPS[stepIdx]}
              </motion.span>
              <span className="text-xs font-mono" style={{ color: "#20E0E6" }}>
                {Math.round(clampedProgress)}%
              </span>
            </div>
            <div
              className="h-0.5 rounded-full overflow-hidden"
              style={{ backgroundColor: "rgba(32,224,230,0.12)" }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: `${clampedProgress}%`,
                  background: "linear-gradient(90deg, #20E0E6, #00a8ff)",
                  boxShadow: "0 0 8px #20E0E6",
                  transition: "width 0.045s linear",
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
