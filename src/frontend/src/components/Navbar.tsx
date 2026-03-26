import { LogOut, Menu, ShieldCheck, User, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const navLinks = [
  { label: "PERFORMANCE", href: "#performance" },
  { label: "3D VIEW", href: "#viewer" },
  { label: "TRACK", href: "#track" },
  { label: "DESIGN", href: "#design" },
  { label: "TECH", href: "#tech" },
  { label: "GALLERY", href: "#gallery" },
];

const SECTION_IDS = [
  "hero",
  "viewer",
  "performance",
  "track",
  "design",
  "tech",
  "gallery",
  "book-test-drive",
];

interface NavbarProps {
  onOpenAuth?: () => void;
  onOpenAdmin?: () => void;
  onSignOut?: () => void;
  onOpenProfile?: () => void;
}

export default function Navbar({
  onOpenAdmin,
  onSignOut,
  onOpenProfile,
  onOpenAuth,
}: NavbarProps) {
  const { isLoggedIn, isAdmin, userName } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (!el) continue;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.3 },
      );
      obs.observe(el);
      observers.push(obs);
    }
    return () => {
      for (const o of observers) o.disconnect();
    };
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const isActive = (href: string) => activeSection === href.replace("#", "");

  const profileColor = isAdmin ? "#FF6B35" : "#20E0E6";
  const profileBg = isAdmin ? "rgba(255,107,53,0.08)" : "rgba(32,224,230,0.08)";
  const profileBgHover = isAdmin
    ? "rgba(255,107,53,0.16)"
    : "rgba(32,224,230,0.16)";
  const profileGlow = isAdmin ? "rgba(255,107,53,0.2)" : "rgba(32,224,230,0.2)";
  const profileGlowHover = isAdmin
    ? "rgba(255,107,53,0.4)"
    : "rgba(32,224,230,0.4)";

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-[100]"
      style={{
        background: scrolled
          ? "rgba(11, 15, 20, 0.94)"
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
          className="flex items-center gap-2 group"
          data-ocid="nav.link"
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 group-hover:scale-110"
            style={{
              border: "1.5px solid #20E0E6",
              color: "#20E0E6",
              boxShadow: "0 0 10px rgba(32,224,230,0.3)",
            }}
          >
            M
          </div>
          <span
            className="font-bold text-lg tracking-[0.15em]"
            style={{ color: "#F2F5F7" }}
          >
            BMW M5 CS
          </span>
        </button>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-4">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <button
                type="button"
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="relative text-xs font-semibold tracking-[0.15em] transition-all duration-200"
                style={{ color: active ? "#20E0E6" : "#7C8796" }}
                data-ocid="nav.link"
              >
                {link.label}
                {active && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-px"
                    style={{
                      background: "#20E0E6",
                      boxShadow: "0 0 6px #20E0E6",
                    }}
                  />
                )}
              </button>
            );
          })}

          {/* User name */}
          {isLoggedIn && userName && (
            <span
              className="text-xs font-medium tracking-wide hidden lg:block"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              {userName}
            </span>
          )}

          {/* Profile button */}
          {isLoggedIn && (
            <button
              type="button"
              onClick={onOpenProfile}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold tracking-[0.12em] uppercase transition-all duration-300"
              style={{
                background: profileBg,
                border: `1.5px solid ${profileColor}`,
                color: profileColor,
                boxShadow: `0 0 16px ${profileGlow}`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 0 28px ${profileGlowHover}`;
                e.currentTarget.style.background = profileBgHover;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = `0 0 16px ${profileGlow}`;
                e.currentTarget.style.background = profileBg;
              }}
              data-ocid="nav.secondary_button"
            >
              <User size={13} />
              PROFILE
            </button>
          )}

          {/* Admin Panel button */}
          {isAdmin && (
            <button
              type="button"
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold tracking-[0.12em] uppercase transition-all duration-300"
              style={{
                background: "rgba(255,68,68,0.08)",
                border: "1.5px solid #FF4444",
                color: "#FF4444",
                boxShadow: "0 0 16px rgba(255,68,68,0.2)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 0 28px rgba(255,68,68,0.4)";
                e.currentTarget.style.background = "rgba(255,68,68,0.16)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 0 16px rgba(255,68,68,0.2)";
                e.currentTarget.style.background = "rgba(255,68,68,0.08)";
              }}
              data-ocid="nav.secondary_button"
            >
              <ShieldCheck size={13} />
              ADMIN
            </button>
          )}

          {/* Book Test Drive / Sign Out */}
          {!isLoggedIn ? (
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
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 0 28px rgba(0,191,255,0.5)";
                e.currentTarget.style.background = "rgba(0,191,255,0.14)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 0 18px rgba(0,191,255,0.25)";
                e.currentTarget.style.background = "rgba(0,191,255,0.08)";
              }}
              data-ocid="nav.primary_button"
            >
              BOOK TEST DRIVE
            </button>
          ) : (
            <>
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
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 0 28px rgba(0,191,255,0.5)";
                  e.currentTarget.style.background = "rgba(0,191,255,0.14)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 0 18px rgba(0,191,255,0.25)";
                  e.currentTarget.style.background = "rgba(0,191,255,0.08)";
                }}
                data-ocid="nav.primary_button"
              >
                BOOK TEST DRIVE
              </button>
              <button
                type="button"
                onClick={onSignOut}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold tracking-[0.12em] uppercase transition-all duration-300"
                style={{
                  background: "rgba(255,120,50,0.08)",
                  border: "1.5px solid rgba(255,120,50,0.6)",
                  color: "rgba(255,140,60,0.9)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,120,50,0.16)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,120,50,0.08)";
                }}
                data-ocid="nav.secondary_button"
              >
                <LogOut size={13} />
                SIGN OUT
              </button>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="lg:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          data-ocid="nav.toggle"
        >
          <AnimatePresence mode="wait">
            {mobileOpen ? (
              <motion.div
                key="x"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={22} style={{ color: "#20E0E6" }} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={22} style={{ color: "#20E0E6" }} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden px-6 pb-6 flex flex-col gap-4"
            style={{ borderTop: "1px solid rgba(32,224,230,0.1)" }}
          >
            {isLoggedIn && userName && (
              <p
                className="text-xs pt-3"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                Signed in as {userName}
              </p>
            )}
            {navLinks.map((link, i) => (
              <motion.button
                key={link.label}
                type="button"
                onClick={() => scrollTo(link.href)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="text-sm font-semibold tracking-widest text-left py-2 flex items-center gap-2"
                style={{ color: isActive(link.href) ? "#20E0E6" : "#7C8796" }}
                data-ocid="nav.link"
              >
                {isActive(link.href) && (
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      backgroundColor: "#20E0E6",
                      boxShadow: "0 0 6px #20E0E6",
                    }}
                  />
                )}
                {link.label}
              </motion.button>
            ))}
            <motion.button
              type="button"
              onClick={() => scrollTo("#book-test-drive")}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: navLinks.length * 0.05 }}
              className="mt-2 px-5 py-2.5 rounded-full text-sm font-bold tracking-widest"
              style={{
                background: "rgba(0,191,255,0.08)",
                border: "1.5px solid #00BFFF",
                color: "#00BFFF",
              }}
              data-ocid="nav.primary_button"
            >
              BOOK TEST DRIVE
            </motion.button>
            {!isLoggedIn && (
              <motion.button
                type="button"
                onClick={() => {
                  onOpenAuth?.();
                  setMobileOpen(false);
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (navLinks.length + 0.3) * 0.05 }}
                className="mt-2 px-5 py-2.5 rounded-full text-sm font-bold tracking-widest flex items-center gap-2"
                style={{
                  background: "rgba(32,224,230,0.08)",
                  border: "1.5px solid #20E0E6",
                  color: "#20E0E6",
                }}
                data-ocid="nav.secondary_button"
              >
                SIGN IN
              </motion.button>
            )}
            {isLoggedIn && (
              <motion.button
                type="button"
                onClick={() => {
                  onOpenProfile?.();
                  setMobileOpen(false);
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (navLinks.length + 0.5) * 0.05 }}
                className="px-5 py-2.5 rounded-full text-sm font-bold tracking-widest flex items-center gap-2"
                style={{
                  background: profileBg,
                  border: `1.5px solid ${profileColor}`,
                  color: profileColor,
                }}
                data-ocid="nav.secondary_button"
              >
                <User size={14} />
                PROFILE
              </motion.button>
            )}
            {isAdmin && (
              <motion.button
                type="button"
                onClick={() => {
                  onOpenAdmin?.();
                  setMobileOpen(false);
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (navLinks.length + 1) * 0.05 }}
                className="px-5 py-2.5 rounded-full text-sm font-bold tracking-widest flex items-center gap-2"
                style={{
                  background: "rgba(255,68,68,0.08)",
                  border: "1.5px solid #FF4444",
                  color: "#FF4444",
                }}
                data-ocid="nav.secondary_button"
              >
                <ShieldCheck size={14} />
                ADMIN PANEL
              </motion.button>
            )}
            {isLoggedIn && (
              <motion.button
                type="button"
                onClick={() => {
                  onSignOut?.();
                  setMobileOpen(false);
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (navLinks.length + 2) * 0.05 }}
                className="px-5 py-2.5 rounded-full text-sm font-bold tracking-widest flex items-center gap-2"
                style={{
                  background: "rgba(255,120,50,0.08)",
                  border: "1.5px solid rgba(255,120,50,0.5)",
                  color: "rgba(255,140,60,0.9)",
                }}
                data-ocid="nav.secondary_button"
              >
                <LogOut size={14} />
                SIGN OUT
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
