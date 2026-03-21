import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";

const galleryImages = [
  {
    src: "/assets/generated/bmw-gallery-drive.dim_1400x900.jpg",
    title: "Alpine Circuit",
    desc: "Perfecting every apex on the mountain pass",
  },
  {
    src: "/assets/generated/bmw-gallery-front.dim_1400x900.jpg",
    title: "Face of Aggression",
    desc: "M Carbon front fascia with adaptive LED matrix",
  },
  {
    src: "/assets/generated/bmw-gallery-brake.dim_1400x900.jpg",
    title: "Carbon Ceramic Brakes",
    desc: "Glowing under 305 km/h track-hard braking",
  },
  {
    src: "/assets/generated/bmw-exterior-side.dim_1200x800.jpg",
    title: "Pure Silhouette",
    desc: "Side profile engineered by the laws of physics",
  },
  {
    src: "/assets/generated/bmw-engine.dim_1200x800.jpg",
    title: "S63 M Engine",
    desc: "627 horses waiting for your command",
  },
];

export default function GallerySection() {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const goNext = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % galleryImages.length);
  };
  const goPrev = () => {
    setDirection(-1);
    setCurrent(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length,
    );
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional timer reset
  useEffect(() => {
    if (isPaused || lightbox) return;
    const id = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % galleryImages.length);
    }, 4500);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused, lightbox]);

  const img = galleryImages[current];

  return (
    <section
      id="gallery"
      className="relative py-28 overflow-hidden"
      style={{ backgroundColor: "#0B0F14" }}
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: "900px",
          height: "500px",
          background:
            "radial-gradient(ellipse, rgba(32,224,230,0.05) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
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
              GALLERY
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
            LEGEND <span className="heading-gradient-cyan">IN MOTION</span>
          </h2>
        </motion.div>

        <div
          className="relative rounded-xl overflow-hidden"
          style={{
            border: "1px solid rgba(32,224,230,0.18)",
            boxShadow:
              "0 0 0 1px rgba(32,224,230,0.06), 0 30px 80px rgba(0,0,0,0.7), 0 0 60px rgba(32,224,230,0.05)",
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative" style={{ aspectRatio: "16/9" }}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                initial={{ opacity: 0, x: direction * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -60 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(0deg, rgba(11,15,20,0.92) 0%, rgba(11,15,20,0.3) 35%, transparent 60%)",
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                  <div
                    className="text-xs tracking-[0.3em] mb-2 font-semibold"
                    style={{
                      color: "#20E0E6",
                      textShadow: "0 0 8px rgba(32,224,230,0.6)",
                    }}
                  >
                    {String(current + 1).padStart(2, "0")} /{" "}
                    {String(galleryImages.length).padStart(2, "0")}
                  </div>
                  <h3
                    className="font-rajdhani font-bold text-3xl md:text-4xl tracking-wider"
                    style={{ color: "#F2F5F7" }}
                  >
                    {img.title}
                  </h3>
                  <p className="text-sm mt-1" style={{ color: "#7C8796" }}>
                    {img.desc}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            <button
              type="button"
              onClick={() => setLightbox(true)}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200"
              style={{
                backgroundColor: "rgba(11,15,20,0.7)",
                border: "1px solid rgba(32,224,230,0.35)",
                color: "#20E0E6",
              }}
              data-ocid="gallery.open_modal_button"
            >
              <Expand size={16} />
            </button>

            {/* Auto-progress bar */}
            {!isPaused && (
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{ backgroundColor: "rgba(32,224,230,0.1)" }}
              >
                <motion.div
                  key={current}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 4.5, ease: "linear" }}
                  className="h-full"
                  style={{
                    background: "linear-gradient(90deg, #20E0E6, #00a8ff)",
                    boxShadow: "0 0 6px #20E0E6",
                  }}
                />
              </div>
            )}
          </div>

          <div
            className="flex items-center justify-between p-4"
            style={{
              borderTop: "1px solid rgba(32,224,230,0.1)",
              backgroundColor: "rgba(11,15,20,0.98)",
            }}
          >
            <button
              type="button"
              onClick={goPrev}
              className="flex items-center gap-2 px-4 py-2 rounded text-sm font-semibold tracking-wider transition-all duration-200"
              style={{
                color: "#20E0E6",
                border: "1px solid rgba(32,224,230,0.25)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(32,224,230,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
              data-ocid="gallery.pagination_prev"
            >
              <ChevronLeft size={16} /> PREV
            </button>

            {/* Thumbnail strip */}
            <div className="hidden md:flex gap-2">
              {galleryImages.map((gimg, i) => (
                <button
                  type="button"
                  key={gimg.title}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  className="relative rounded overflow-hidden transition-all duration-300"
                  style={{
                    width: i === current ? 72 : 48,
                    height: 32,
                    border:
                      i === current
                        ? "1px solid #20E0E6"
                        : "1px solid rgba(32,224,230,0.15)",
                    boxShadow:
                      i === current ? "0 0 8px rgba(32,224,230,0.4)" : "none",
                    opacity: i === current ? 1 : 0.5,
                  }}
                  data-ocid={`gallery.item.${i + 1}`}
                >
                  <img
                    src={gimg.src}
                    alt={gimg.title}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Dot strip for mobile */}
            <div className="flex md:hidden gap-2">
              {galleryImages.map((gimg, i) => (
                <button
                  type="button"
                  key={gimg.title}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  style={{
                    width: i === current ? "24px" : "6px",
                    height: "6px",
                    borderRadius: "3px",
                    backgroundColor:
                      i === current ? "#20E0E6" : "rgba(32,224,230,0.2)",
                    boxShadow: i === current ? "0 0 8px #20E0E6" : "none",
                    transition: "all 0.3s",
                  }}
                  data-ocid={`gallery.item.${i + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={goNext}
              className="flex items-center gap-2 px-4 py-2 rounded text-sm font-semibold tracking-wider transition-all duration-200"
              style={{
                color: "#20E0E6",
                border: "1px solid rgba(32,224,230,0.25)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(32,224,230,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
              data-ocid="gallery.pagination_next"
            >
              NEXT <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center"
            style={{ backgroundColor: "rgba(0,0,0,0.97)" }}
            onClick={() => setLightbox(false)}
            data-ocid="gallery.modal"
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="relative max-w-6xl w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={img.src}
                alt={img.title}
                className="w-full h-auto rounded-xl"
                style={{
                  boxShadow:
                    "0 0 0 1px rgba(32,224,230,0.2), 0 0 60px rgba(32,224,230,0.15), 0 40px 100px rgba(0,0,0,0.8)",
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                <h3
                  className="font-rajdhani font-bold text-2xl tracking-wider"
                  style={{ color: "#F2F5F7" }}
                >
                  {img.title}
                </h3>
                <p className="text-sm mt-1" style={{ color: "#7C8796" }}>
                  {img.desc}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setLightbox(false)}
                className="absolute -top-4 -right-4 w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: "#E53935",
                  color: "#fff",
                  boxShadow: "0 0 12px rgba(229,57,53,0.6)",
                }}
                data-ocid="gallery.close_button"
              >
                <X size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
