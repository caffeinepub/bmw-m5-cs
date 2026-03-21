import { motion } from "motion/react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "PERFORMANCE", href: "#performance" },
  { label: "3D VIEW", href: "#viewer" },
  { label: "TRACK", href: "#track" },
  { label: "DESIGN", href: "#design" },
  { label: "TECH", href: "#tech" },
  { label: "GALLERY", href: "#gallery" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-[100]"
      style={{
        background: scrolled
          ? "rgba(11, 15, 20, 0.92)"
          : "rgba(11, 15, 20, 0.5)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: scrolled
          ? "1px solid rgba(32,224,230,0.15)"
          : "1px solid transparent",
        transition: "all 0.4s ease",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2"
          data-ocid="nav.link"
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-rajdhani"
            style={{ border: "1.5px solid #20E0E6", color: "#20E0E6" }}
          >
            M
          </div>
          <span
            className="font-rajdhani font-bold text-lg tracking-[0.15em]"
            style={{ color: "#F2F5F7" }}
          >
            BMW M5 CS
          </span>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              type="button"
              key={link.label}
              onClick={() => scrollTo(link.href)}
              className="text-xs font-semibold tracking-[0.15em] transition-colors duration-200 hover:text-white"
              style={{ color: "#7C8796" }}
              data-ocid="nav.link"
            >
              {link.label}
            </button>
          ))}

          {/* Book Test Drive CTA */}
          <button
            type="button"
            onClick={() => scrollTo("#book-test-drive")}
            className="flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold tracking-[0.15em] uppercase transition-all duration-300"
            style={{
              background: "rgba(0,191,255,0.08)",
              border: "1.5px solid #00BFFF",
              color: "#00BFFF",
              boxShadow: "0 0 18px rgba(0,191,255,0.25)",
            }}
            data-ocid="nav.primary_button"
          >
            BOOK TEST DRIVE
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          data-ocid="nav.toggle"
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-5 h-0.5"
              style={{ backgroundColor: "#20E0E6" }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden px-6 pb-6 flex flex-col gap-4"
          style={{ borderTop: "1px solid rgba(32,224,230,0.1)" }}
        >
          {navLinks.map((link) => (
            <button
              type="button"
              key={link.label}
              onClick={() => scrollTo(link.href)}
              className="text-sm font-semibold tracking-widest text-left py-2"
              style={{ color: "#7C8796" }}
              data-ocid="nav.link"
            >
              {link.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => scrollTo("#book-test-drive")}
            className="mt-2 px-5 py-2.5 rounded-full text-sm font-bold tracking-widest"
            style={{
              background: "rgba(0,191,255,0.08)",
              border: "1.5px solid #00BFFF",
              color: "#00BFFF",
            }}
            data-ocid="nav.primary_button"
          >
            BOOK TEST DRIVE
          </button>
        </div>
      )}
    </motion.nav>
  );
}
