import { ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import { useRef } from "react";

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  const scrollToPerf = () => {
    document
      .querySelector("#performance")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollDown = () => {
    document.querySelector("#viewer")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="BMW M5 CS – The Ultimate Driving Machine"
      itemScope
      itemType="https://schema.org/Car"
    >
      {/* Hidden SEO metadata for crawlers */}
      <meta itemProp="name" content="BMW M5 CS" />
      <meta itemProp="brand" content="BMW" />
      <meta itemProp="model" content="M5 CS" />
      <meta
        itemProp="description"
        content="BMW M5 CS – 627 HP, 750 Nm torque, 0–100 km/h in 3.0 seconds. The most powerful BMW M5 ever built. Book your BMW test drive today."
      />
      <meta
        itemProp="vehicleEngine"
        content="S63 4.4-litre V8 Twin-Turbo 627HP"
      />
      <meta
        itemProp="driveWheelConfiguration"
        content="AllWheelDriveConfiguration"
      />
      <meta itemProp="fuelType" content="Gasoline" />
      <meta itemProp="numberOfDoors" content="4" />

      {/* Background image + overlays */}
      <div className="absolute inset-0">
        <img
          src="/assets/generated/bmw-hero.dim_1920x1080.jpg"
          alt="BMW M5 CS – 627HP Ultimate BMW Performance Sedan. The most powerful BMW M5 ever built."
          className="w-full h-full object-cover"
          itemProp="image"
          fetchPriority="high"
          loading="eager"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(11,15,20,0.95) 0%, rgba(11,15,20,0.78) 45%, rgba(11,15,20,0.35) 100%)",
          }}
        />
        <div
          className="absolute top-[-10%] right-[-5%] pointer-events-none"
          style={{
            width: "700px",
            height: "700px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(32,224,230,0.08) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: "220px",
            background:
              "linear-gradient(to bottom, transparent 0%, #0B0F14 100%)",
          }}
        />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(32,224,230,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(32,224,230,0.6) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Ghost watermark */}
      <div
        className="ghost-text"
        style={{
          fontSize: "22vw",
          bottom: "-2vw",
          right: "-2vw",
          opacity: 0.025,
        }}
      >
        M5
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex items-center gap-3 mb-6"
          >
            <div
              className="h-px w-16"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #20E0E6, rgba(32,224,230,0.3))",
              }}
            />
            <span
              className="text-xs font-bold tracking-[0.45em] eyebrow-dot eyebrow-dot-cyan"
              style={{ color: "#20E0E6" }}
            >
              BMW M5 CS
            </span>
          </motion.div>

          {/* Main heading — h1 for SEO */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: "easeOut" }}
            className="font-rajdhani font-bold leading-none mb-6"
            style={{
              fontSize: "clamp(3rem, 8vw, 7rem)",
              color: "#F2F5F7",
              letterSpacing: "-0.01em",
              lineHeight: "0.92",
            }}
          >
            THE <span className="heading-gradient-cyan">ULTIMATE</span>
            <br />
            DRIVING
            <br />
            <span
              style={{
                color: "#F2F5F7",
                textShadow:
                  "0 0 40px rgba(32,224,230,0.15), 0 0 80px rgba(32,224,230,0.08)",
              }}
            >
              MACHINE
            </span>
          </motion.h1>

          {/* Spec pills – also read by crawlers as keyword content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex items-center gap-4 mb-10 flex-wrap"
            aria-label="BMW M5 CS key specifications"
          >
            {[
              { spec: "627 HP", itemProp: "enginePower" },
              { spec: "750 Nm", itemProp: "torque" },
              { spec: "0–100 in 3.0s", itemProp: "speed" },
            ].map(({ spec, itemProp }, i) => (
              <span key={spec}>
                <span
                  className="text-sm font-semibold tracking-widest"
                  style={{ color: "#F2F5F7" }}
                  itemProp={itemProp}
                >
                  {spec}
                </span>
                {i < 2 && (
                  <span
                    className="ml-4 text-base"
                    style={{ color: "#E53935", textShadow: "0 0 8px #E53935" }}
                  >
                    ·
                  </span>
                )}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="flex gap-4 flex-wrap"
          >
            <button
              type="button"
              onClick={scrollToPerf}
              className="px-8 py-3.5 text-sm font-bold tracking-[0.15em] rounded transition-all duration-300"
              style={{
                border: "1.5px solid #20E0E6",
                color: "#20E0E6",
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(32,224,230,0.1)";
                e.currentTarget.style.boxShadow =
                  "0 0 12px rgba(32,224,230,0.4), 0 0 30px rgba(32,224,230,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.boxShadow = "none";
              }}
              aria-label="Explore BMW M5 CS performance specifications"
              data-ocid="hero.primary_button"
            >
              EXPLORE NOW
            </button>
            <button
              type="button"
              onClick={scrollToPerf}
              className="px-8 py-3.5 text-sm font-bold tracking-[0.15em] rounded transition-all duration-300"
              style={{
                backgroundColor: "#E53935",
                color: "#fff",
                boxShadow:
                  "0 0 12px rgba(229,57,53,0.6), 0 0 30px rgba(229,57,53,0.25)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 0 20px rgba(229,57,53,0.8), 0 0 50px rgba(229,57,53,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 0 12px rgba(229,57,53,0.6), 0 0 30px rgba(229,57,53,0.25)";
              }}
              aria-label="Watch BMW M5 CS specifications and performance data"
              data-ocid="hero.secondary_button"
            >
              WATCH SPECS
            </button>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.button
        type="button"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        onClick={scrollDown}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: "#7C8796" }}
        aria-label="Scroll down to explore BMW M5 CS 3D viewer"
        data-ocid="hero.button"
      >
        <span className="text-xs tracking-[0.3em]">SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        >
          <ChevronDown
            size={20}
            style={{
              color: "#20E0E6",
              filter: "drop-shadow(0 0 4px rgba(32,224,230,0.8))",
            }}
          />
        </motion.div>
      </motion.button>

      {/* Right-side stat column */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.7 }}
        className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-6"
        aria-label="BMW M5 CS performance stats"
      >
        {[
          { value: "627", unit: "HP", label: "Power" },
          { value: "750", unit: "Nm", label: "Torque" },
          { value: "3.0s", unit: "", label: "0–100 km/h" },
        ].map((s) => (
          <div key={s.label} className="text-right">
            <div
              className="font-rajdhani font-bold text-2xl"
              style={{ color: "#F2F5F7" }}
            >
              {s.value}
              <span
                className="text-sm ml-1"
                style={{
                  color: "#20E0E6",
                  textShadow: "0 0 8px rgba(32,224,230,0.7)",
                }}
              >
                {s.unit}
              </span>
            </div>
            <div
              className="text-xs tracking-widest"
              style={{ color: "#7C8796" }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
