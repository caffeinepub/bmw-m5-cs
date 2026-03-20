import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setVisible(false);
            setTimeout(onComplete, 600);
          }, 300);
          return 100;
        }
        return prev + Math.random() * 4 + 1;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [onComplete]);

  const clampedProgress = Math.min(progress, 100);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ backgroundColor: "#0B0F14" }}
        >
          {/* Scan line effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute left-0 right-0 h-px opacity-20"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #20E0E6, transparent)",
                animation: "scan-line 2s linear infinite",
              }}
            />
          </div>

          {/* M Logo */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: "backOut" }}
            className="mb-8 relative"
          >
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center"
              style={{
                border: "2px solid #20E0E6",
                boxShadow:
                  "0 0 30px rgba(32,224,230,0.4), inset 0 0 20px rgba(32,224,230,0.05)",
              }}
            >
              <span
                className="text-3xl font-bold font-rajdhani"
                style={{ color: "#20E0E6", letterSpacing: "0.1em" }}
              >
                M
              </span>
            </div>
            {/* Orbiting ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              className="absolute inset-0"
            >
              <div
                className="absolute -top-2 left-1/2 w-3 h-3 rounded-full -translate-x-1/2"
                style={{
                  backgroundColor: "#E53935",
                  boxShadow: "0 0 10px #E53935",
                }}
              />
            </motion.div>
          </motion.div>

          {/* BMW M5 CS Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-center mb-12"
          >
            <div
              className="text-sm font-semibold tracking-[0.4em] mb-2"
              style={{ color: "#7C8796" }}
            >
              BMW
            </div>
            <div
              className="text-5xl font-bold font-rajdhani tracking-widest"
              style={{ color: "#F2F5F7", letterSpacing: "0.15em" }}
            >
              M5 CS
            </div>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="h-px mt-3"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #20E0E6, transparent)",
              }}
            />
          </motion.div>

          {/* Progress bar */}
          <div className="w-64">
            <div className="flex justify-between mb-2">
              <span className="text-xs" style={{ color: "#7C8796" }}>
                INITIALIZING SYSTEMS
              </span>
              <span className="text-xs font-mono" style={{ color: "#20E0E6" }}>
                {Math.round(clampedProgress)}%
              </span>
            </div>
            <div
              className="h-0.5 rounded-full overflow-hidden"
              style={{ backgroundColor: "rgba(32,224,230,0.15)" }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: `${clampedProgress}%`,
                  background: "linear-gradient(90deg, #20E0E6, #00a8ff)",
                  boxShadow: "0 0 8px #20E0E6",
                  transition: "width 0.05s linear",
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
