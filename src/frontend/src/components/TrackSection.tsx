import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const VIDEOS = [
  {
    youtubeId: "WfSE9tSlnps",
    label: "Burnout & Drift",
    tags: ["Burnout", "Drift", "0-100 in 3.0s"],
  },
  {
    youtubeId: "_-iKvn8eiaM",
    label: "Drag Race",
    tags: ["Drag Race", "Top Speed", "627 HP"],
  },
  {
    youtubeId: "QHSRNwBHE04",
    label: "Full Review",
    tags: ["Full Review", "M5 CS", "750 Nm"],
  },
];

export default function TrackSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

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

  const currentVideo = VIDEOS[activeTab];

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
          className="text-center mb-10"
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

        {/* Tab switcher */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="flex justify-center gap-2 mb-8 flex-wrap"
          data-ocid="track.tab"
        >
          {VIDEOS.map((video, idx) => {
            const isActive = activeTab === idx;
            return (
              <button
                key={video.youtubeId}
                type="button"
                onClick={() => setActiveTab(idx)}
                className="px-5 py-2 rounded-full text-sm font-semibold tracking-widest uppercase transition-all duration-300"
                style={{
                  background: isActive
                    ? "rgba(0,191,255,0.18)"
                    : "rgba(255,255,255,0.04)",
                  border: isActive
                    ? "1px solid #00BFFF"
                    : "1px solid rgba(255,255,255,0.12)",
                  color: isActive ? "#00BFFF" : "rgba(255,255,255,0.55)",
                  boxShadow: isActive
                    ? "0 0 18px rgba(0,191,255,0.35), 0 0 6px rgba(0,191,255,0.2)"
                    : "none",
                }}
              >
                {video.label}
              </button>
            );
          })}
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
            <iframe
              key={currentVideo.youtubeId}
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube-nocookie.com/embed/${currentVideo.youtubeId}?rel=0&modestbranding=1&autoplay=0`}
              title={currentVideo.label}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ border: "none" }}
            />
          </div>
        </motion.div>

        {/* Caption tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mt-8"
        >
          {currentVideo.tags.map((tag) => (
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
          ))}
        </motion.div>
      </div>
    </section>
  );
}
