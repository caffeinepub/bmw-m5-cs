import { Brain, Gauge, Monitor, Wind } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion } from "motion/react";

interface TechCard {
  icon: LucideIcon;
  title: string;
  desc: string;
}

const techCards: TechCard[] = [
  {
    icon: Brain,
    title: "AI Driving Assist",
    desc: "Predictive M Drive logic adapts to your driving style in real-time, optimizing traction, throttle, and suspension response.",
  },
  {
    icon: Monitor,
    title: "Digital Cockpit",
    desc: '12.3" curved display cluster with M-specific readouts, real-time performance metrics, and adaptive HUD projection.',
  },
  {
    icon: Gauge,
    title: "M Performance Tuning",
    desc: "Race-ready suspension with adjustable dampers, carbon ceramic brakes, and powertrain calibration across 3 drive modes.",
  },
  {
    icon: Wind,
    title: "Carbon Aero Package",
    desc: "Full carbon fiber roof, hood vents, rear diffuser, and underbody aero kit — generating 40kg of downforce at 250 km/h.",
  },
];

export default function TechSection() {
  return (
    <section
      id="tech"
      className="relative py-28 overflow-hidden"
      style={{ backgroundColor: "#0B0F14" }}
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(32,224,230,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(32,224,230,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Ambient cyan orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: "800px",
          height: "400px",
          background:
            "radial-gradient(ellipse, rgba(32,224,230,0.04) 0%, transparent 70%)",
          filter: "blur(60px)",
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

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Ghost watermark */}
        <div
          className="ghost-text"
          style={{
            fontSize: "16vw",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            opacity: 0.028,
          }}
        >
          M TECH
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div
              className="h-px flex-1 max-w-16"
              style={{
                background: "linear-gradient(90deg, transparent, #20E0E6)",
              }}
            />
            <span
              className="text-xs tracking-[0.45em] font-bold eyebrow-dot eyebrow-dot-cyan"
              style={{ color: "#20E0E6" }}
            >
              INNOVATION
            </span>
            <div
              className="h-px flex-1 max-w-16"
              style={{
                background: "linear-gradient(90deg, #20E0E6, transparent)",
              }}
            />
          </div>
          <h2
            className="font-rajdhani font-bold text-5xl md:text-6xl tracking-wider"
            style={{ color: "#F2F5F7" }}
          >
            M <span className="heading-gradient-cyan">TECHNOLOGY</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {techCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              whileHover={{ y: -8 }}
              className="tech-card group relative p-6 rounded-lg cursor-default"
              style={{
                background: "rgba(16, 22, 30, 0.7)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(32,224,230,0.1)",
              }}
              data-ocid={`tech.card.${i + 1}`}
            >
              {/* Icon badge */}
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-5 transition-all duration-300"
                style={{
                  background: "rgba(32,224,230,0.07)",
                  border: "1px solid rgba(32,224,230,0.18)",
                }}
              >
                <card.icon
                  size={22}
                  style={{
                    color: "#20E0E6",
                    filter: "drop-shadow(0 0 4px rgba(32,224,230,0.6))",
                  }}
                />
              </div>
              <h3
                className="font-rajdhani font-bold text-xl tracking-wider mb-3"
                style={{ color: "#F2F5F7" }}
              >
                {card.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#7C8796" }}
              >
                {card.desc}
              </p>
              {/* Corner accent */}
              <div
                className="absolute top-0 right-0 w-10 h-10"
                style={{
                  background:
                    "linear-gradient(225deg, rgba(32,224,230,0.18) 0%, transparent 60%)",
                }}
              />
              {/* Bottom line reveal on hover */}
              <div
                className="absolute bottom-0 left-4 right-4 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #20E0E6, transparent)",
                  boxShadow: "0 0 8px #20E0E6",
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
