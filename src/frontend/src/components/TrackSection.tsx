import { Play, Volume2, VolumeX } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

export default function TrackSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [muted, setMuted] = useState(true);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true);
      },
      { threshold: 0.15 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // BMW M5 CS burnout / drift / drag racing highlight reel
  const VIDEO_ID = "ZIo0_4a8A4g";
  const src = `https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&loop=1&playlist=${VIDEO_ID}&controls=1&modestbranding=1&rel=0&mute=${muted ? 1 : 0}`;

  return (
    <section
      id="track"
      ref={ref}
      className="relative py-24 overflow-hidden"
      style={{ backgroundColor: "#07090D" }}
    >
      {/* Ghost watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{ opacity: 0.03 }}
      >
        <span
          className="font-black uppercase tracking-widest"
          style={{ fontSize: "clamp(80px, 20vw, 220px)", color: "#00BFFF" }}
        >
          TRACK
        </span>
      </div>

      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,191,255,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <p
            className="text-xs font-semibold tracking-[0.4em] uppercase mb-3"
            style={{ color: "#00BFFF" }}
          >
            Raw Power Unleashed
          </p>
          <h2
            className="font-black uppercase leading-none"
            style={{
              fontSize: "clamp(2.5rem, 7vw, 5rem)",
              background:
                "linear-gradient(135deg, #FFFFFF 0%, #00BFFF 50%, #FFFFFF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            On The Track
          </h2>
          <div
            className="mx-auto mt-4 h-[2px] w-24 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, #00BFFF, transparent)",
            }}
          />
        </motion.div>

        {/* Video container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="relative rounded-2xl overflow-hidden"
          style={{
            boxShadow:
              "0 0 0 1px rgba(0,191,255,0.15), 0 0 60px rgba(0,191,255,0.12), 0 30px 80px rgba(0,0,0,0.6)",
          }}
        >
          {/* 16:9 aspect ratio wrapper */}
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            {!started ? (
              /* Thumbnail / play gate */
              <button
                type="button"
                aria-label="Play BMW M5 CS burnout and drift reel"
                className="absolute inset-0 w-full h-full flex items-center justify-center cursor-pointer"
                style={{ backgroundColor: "#0B0F14" }}
                onClick={() => setStarted(true)}
              >
                {/* Gradient backgrounds */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(135deg, #0B0F14 0%, #111827 50%, #0B0F14 100%)",
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, rgba(0,191,255,0.08) 0%, transparent 70%)",
                  }}
                />
                {/* Play button */}
                <motion.div
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative z-10 flex items-center justify-center w-20 h-20 rounded-full"
                  style={{
                    background: "rgba(0,191,255,0.15)",
                    border: "2px solid rgba(0,191,255,0.5)",
                    boxShadow: "0 0 40px rgba(0,191,255,0.3)",
                  }}
                >
                  <Play className="w-8 h-8 ml-1" style={{ color: "#00BFFF" }} />
                </motion.div>
                <p
                  className="absolute bottom-8 left-1/2 -translate-x-1/2 text-sm font-semibold tracking-widest uppercase"
                  style={{ color: "rgba(0,191,255,0.7)" }}
                >
                  Play Burnout &amp; Drift Reel
                </p>
              </button>
            ) : (
              <iframe
                key={muted ? "muted" : "unmuted"}
                className="absolute inset-0 w-full h-full"
                src={src}
                title="BMW M5 CS Burnout Drift Drag Racing"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>

          {/* Sound toggle -- visible only after playback starts */}
          {started && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              onClick={() => setMuted((v) => !v)}
              className="absolute bottom-4 right-4 z-20 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase transition-all"
              style={{
                background: "rgba(0,0,0,0.6)",
                border: "1px solid rgba(0,191,255,0.4)",
                color: "#00BFFF",
                backdropFilter: "blur(8px)",
              }}
            >
              {muted ? (
                <>
                  <VolumeX className="w-4 h-4" /> Unmute
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4" /> Mute
                </>
              )}
            </motion.button>
          )}
        </motion.div>

        {/* Caption tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mt-8"
        >
          {["Burnout", "Drift", "Drag Racing", "0-100 in 3.0s", "627 HP"].map(
            (tag) => (
              <span
                key={tag}
                className="px-4 py-1 rounded-full text-xs font-semibold tracking-widest uppercase"
                style={{
                  background: "rgba(0,191,255,0.07)",
                  border: "1px solid rgba(0,191,255,0.2)",
                  color: "rgba(0,191,255,0.8)",
                }}
              >
                {tag}
              </span>
            ),
          )}
        </motion.div>
      </div>
    </section>
  );
}
