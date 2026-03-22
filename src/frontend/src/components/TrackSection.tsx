import { ChevronRight, ExternalLink, Play, Youtube } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const VIDEOS = [
  {
    id: "burnout",
    youtubeId: "obkLDeO58Wo",
    label: "Burnout & Drift",
    subtitle: "Raw Track Aggression",
    thumbnail: "/assets/generated/bmw-track-burnout.dim_1400x800.jpg",
    tags: ["Burnout", "Drift", "0–100 in 3.0s"],
    desc: "Witness the M5 CS unleash every one of its 627 horses in a tire-shredding display of pure mechanical fury.",
    accent: "#20E0E6",
  },
  {
    id: "drag",
    youtubeId: "AFtUpMTs4vI",
    label: "Drag Race",
    subtitle: "Maximum Straight-Line Fury",
    thumbnail: "/assets/generated/bmw-track-drag.dim_1400x800.jpg",
    tags: ["Drag Race", "Top Speed", "627 HP"],
    desc: "Arrowing to 305 km/h with the V8 biturbo at full song — the M5 CS erases straight-line records without mercy.",
    accent: "#E53935",
  },
  {
    id: "review",
    youtubeId: "VMRsEg9FZYs",
    label: "Full Review",
    subtitle: "The Complete M Experience",
    thumbnail: "/assets/generated/bmw-track-review.dim_1400x800.jpg",
    tags: ["Full Review", "M5 CS", "750 Nm"],
    desc: "The definitive walkthrough of the most driver-focused M5 ever produced — every detail examined, every system tested.",
    accent: "#20E0E6",
  },
  {
    id: "launch",
    youtubeId: "tHQUODmWlpE",
    label: "Launch Control",
    subtitle: "Zero to Savage in 3.0s",
    thumbnail: "/assets/generated/bmw-track-burnout.dim_1400x800.jpg",
    tags: ["Launch Control", "M5 CS", "305 km/h"],
    desc: "Launch control engaged. The M5 CS annihilates the quarter mile with surgical precision and savage acceleration.",
    accent: "#E53935",
  },
];

const BMW_CANADA_URL = "https://www.youtube.com/@bmwcanada";

export default function TrackSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [active, setActive] = useState(0);
  const [hoveredThumb, setHoveredThumb] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true);
      },
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const current = VIDEOS[active];

  const openVideo = (youtubeId: string) => {
    window.open(
      `https://www.youtube.com/watch?v=${youtubeId}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  const openChannel = () => {
    window.open(BMW_CANADA_URL, "_blank", "noopener,noreferrer");
  };

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

      {/* Ambient glow follows active accent */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full pointer-events-none transition-all duration-700"
        style={{
          background: `radial-gradient(ellipse, ${current.accent}09 0%, transparent 70%)`,
          filter: "blur(60px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p
            className="text-xs font-semibold tracking-[0.45em] uppercase mb-3"
            style={{ color: "#20E0E6" }}
          >
            Raw Power Unleashed
          </p>
          <h2
            className="font-black uppercase leading-none"
            style={{
              fontSize: "clamp(2.5rem, 7vw, 5rem)",
              background:
                "linear-gradient(135deg, #FFFFFF 0%, #20E0E6 50%, #FFFFFF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            On The Track
          </h2>
          <div
            className="mx-auto mt-4 h-px w-24 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, #20E0E6, transparent)",
            }}
          />
          {/* BMW Canada channel link */}
          <motion.button
            type="button"
            onClick={openChannel}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 mt-5 px-5 py-2 rounded-full text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300"
            style={{
              background: "rgba(255,0,0,0.08)",
              border: "1px solid rgba(255,0,0,0.3)",
              color: "#FF4444",
              boxShadow: "0 0 15px rgba(255,0,0,0.1)",
            }}
          >
            <Youtube size={14} />
            BMW Canada on YouTube
            <ExternalLink size={11} />
          </motion.button>
        </motion.div>

        {/* Main featured card */}
        <div className="grid lg:grid-cols-[1fr_340px] gap-6 items-start">
          {/* Featured video card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.4 }}
                className="relative rounded-2xl overflow-hidden group cursor-pointer"
                style={{
                  border: `1px solid ${current.accent}30`,
                  boxShadow: `0 0 0 1px ${current.accent}15, 0 0 60px ${current.accent}15, 0 30px 80px rgba(0,0,0,0.7)`,
                }}
                onClick={() => openVideo(current.youtubeId)}
              >
                {/* Thumbnail */}
                <div className="relative" style={{ aspectRatio: "16/9" }}>
                  <img
                    src={current.thumbnail}
                    alt={current.label}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Gradient overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(0deg, rgba(7,9,13,0.95) 0%, rgba(7,9,13,0.4) 40%, rgba(7,9,13,0.1) 100%)",
                    }}
                  />
                  {/* Hover overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(circle at center, ${current.accent}18 0%, transparent 70%)`,
                    }}
                  />

                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.12 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative flex items-center justify-center"
                    >
                      <div
                        className="absolute w-20 h-20 rounded-full animate-ping opacity-20"
                        style={{ backgroundColor: current.accent }}
                      />
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center"
                        style={{
                          backgroundColor: `${current.accent}25`,
                          border: `2px solid ${current.accent}`,
                          backdropFilter: "blur(8px)",
                          boxShadow: `0 0 30px ${current.accent}60, 0 0 80px ${current.accent}25`,
                        }}
                      >
                        <Play
                          size={22}
                          fill={current.accent}
                          style={{ color: current.accent, marginLeft: 2 }}
                        />
                      </div>
                    </motion.div>
                  </div>

                  {/* YouTube badge */}
                  <div
                    className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      backgroundColor: "rgba(0,0,0,0.8)",
                      border: `1px solid ${current.accent}40`,
                      color: current.accent,
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <ExternalLink size={11} />
                    WATCH ON YOUTUBE
                  </div>

                  {/* Bottom info */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div
                      className="text-xs tracking-[0.3em] mb-2 font-semibold"
                      style={{
                        color: current.accent,
                        textShadow: `0 0 8px ${current.accent}80`,
                      }}
                    >
                      {current.subtitle}
                    </div>
                    <h3
                      className="font-bold text-3xl md:text-4xl tracking-wider mb-2"
                      style={{ color: "#F2F5F7" }}
                    >
                      {current.label}
                    </h3>
                    <p
                      className="text-sm leading-relaxed max-w-lg"
                      style={{ color: "rgba(242,245,247,0.65)" }}
                    >
                      {current.desc}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {current.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase"
                          style={{
                            background: `${current.accent}12`,
                            border: `1px solid ${current.accent}30`,
                            color: `${current.accent}CC`,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Sidebar: video list */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="flex flex-col gap-3"
          >
            <p
              className="text-xs tracking-[0.3em] font-semibold mb-1"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              ALL VIDEOS
            </p>
            {VIDEOS.map((video, idx) => {
              const isActive = active === idx;
              const isHovered = hoveredThumb === idx;
              return (
                <motion.button
                  key={video.id}
                  type="button"
                  onClick={() => setActive(idx)}
                  onMouseEnter={() => setHoveredThumb(idx)}
                  onMouseLeave={() => setHoveredThumb(null)}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative rounded-xl overflow-hidden text-left transition-all duration-300"
                  style={{
                    border: isActive
                      ? `1px solid ${video.accent}60`
                      : "1px solid rgba(255,255,255,0.07)",
                    boxShadow: isActive ? `0 0 20px ${video.accent}20` : "none",
                    opacity: isActive ? 1 : isHovered ? 0.85 : 0.6,
                  }}
                >
                  <div className="relative" style={{ aspectRatio: "16/9" }}>
                    <img
                      src={video.thumbnail}
                      alt={video.label}
                      className="w-full h-full object-cover"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(0deg, rgba(7,9,13,0.85) 0%, rgba(7,9,13,0.3) 60%, transparent 100%)",
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{
                          backgroundColor: `${video.accent}30`,
                          border: `1.5px solid ${video.accent}`,
                        }}
                      >
                        <Play
                          size={12}
                          fill={video.accent}
                          style={{ color: video.accent, marginLeft: 1 }}
                        />
                      </div>
                    </div>
                    {isActive && (
                      <div
                        className="absolute top-2 left-2 px-2 py-0.5 rounded text-xs font-bold tracking-wider"
                        style={{
                          backgroundColor: `${video.accent}25`,
                          border: `1px solid ${video.accent}`,
                          color: video.accent,
                          fontSize: "10px",
                        }}
                      >
                        NOW VIEWING
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <div
                        className="text-xs font-bold tracking-widest"
                        style={{ color: "#F2F5F7" }}
                      >
                        {video.label}
                      </div>
                      <div
                        className="text-xs mt-0.5"
                        style={{ color: "rgba(255,255,255,0.45)" }}
                      >
                        {video.subtitle}
                      </div>
                    </div>
                  </div>
                </motion.button>
              );
            })}

            {/* Open current in YouTube */}
            <motion.button
              type="button"
              onClick={() => openVideo(current.youtubeId)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 mt-1"
              style={{
                background: `${current.accent}12`,
                border: `1px solid ${current.accent}40`,
                color: current.accent,
              }}
            >
              <ExternalLink size={13} />
              OPEN ON YOUTUBE
              <ChevronRight size={13} />
            </motion.button>

            {/* BMW Canada channel */}
            <motion.button
              type="button"
              onClick={openChannel}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold tracking-[0.15em] uppercase transition-all duration-300"
              style={{
                background: "rgba(255,0,0,0.06)",
                border: "1px solid rgba(255,0,0,0.25)",
                color: "#FF5555",
              }}
            >
              <Youtube size={13} />
              BMW CANADA CHANNEL
              <ExternalLink size={11} />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
