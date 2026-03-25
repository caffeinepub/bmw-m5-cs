import { Check, ChevronDown, RotateCcw, Star, Zap } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

interface CarCustomizationSectionProps {
  onConfigChange: (spec: string, total: number) => void;
}

const BASE_PRICE = 142000;
const TAX_RATE = 0.1;

// ── Presets ──────────────────────────────────────────────────────────────────
const PRESETS = [
  {
    id: "gold",
    name: "Gold Package",
    tagline: "Opulence Redefined",
    price: 28500,
    accent: "#FFD700",
    glow: "rgba(255,215,0,0.35)",
    icon: "✦",
    selections: {
      color: "BMW Individual Grigio Telesto",
      engine: "Stock S58 4.4L V8 (627 hp)",
      wheels: 'Gold Floret 20" Forged',
      brakes: "Stock M Compound Brakes",
      exhaust: "Stock Exhaust",
      interior: "Full Merino Leather (Extended)",
      carbon: "None",
      tech: ["Driving Assistance Pro", "Bowers & Wilkins Diamond Sound"],
    },
  },
  {
    id: "diamond",
    name: "Diamond Package",
    tagline: "Peak of Perfection",
    price: 49900,
    accent: "#B9F2FF",
    glow: "rgba(185,242,255,0.35)",
    icon: "◆",
    selections: {
      color: "BMW Individual Frozen Black",
      engine: "Stage 2 Turbo Upgrade (780 hp)",
      wheels: "HRE Monoblock P101",
      brakes: "M Carbon Ceramic Brakes",
      exhaust: "Akrapovic Evolution Full Titanium",
      interior: "Nappa Leather Individual",
      carbon: "Full Carbon (Interior + Exterior)",
      tech: [
        "M Track Package",
        "Driving Assistance Pro",
        "Head-Up Display",
        "Bowers & Wilkins Diamond Sound",
        "Night Vision",
        "Wireless Charging + ConnectedDrive Pro",
      ],
    },
  },
  {
    id: "racing",
    name: "Racing Package",
    tagline: "Born on the Circuit",
    price: 38000,
    accent: "#FF2D55",
    glow: "rgba(255,45,85,0.35)",
    icon: "⚡",
    selections: {
      color: "Carbon Black Metallic",
      engine: "Stage 3 Full Build (900+ hp)",
      wheels: 'Carbon Black 21" Forged',
      brakes: "AP Racing Pro5000R Kit",
      exhaust: "Akrapovic Evolution Full Titanium",
      interior: "Alcantara Sport Package",
      carbon: "Exterior Carbon Aero Kit",
      tech: ["M Track Package", "Head-Up Display"],
    },
  },
  {
    id: "stealth",
    name: "Stealth Package",
    tagline: "Shadow Mode Activated",
    price: 21000,
    accent: "#888888",
    glow: "rgba(136,136,136,0.3)",
    icon: "▲",
    selections: {
      color: "BMW Individual Frozen Black",
      engine: "Stage 1 Tune (700 hp)",
      wheels: 'Carbon Black 21" Forged',
      brakes: "Stock M Compound Brakes",
      exhaust: "Akrapovic Slip-On",
      interior: "Standard Merino Leather",
      carbon: "Interior Carbon Trim",
      tech: ["M Track Package"],
    },
  },
  {
    id: "performance_unleashed",
    name: "Performance Unleashed",
    tagline: "Limits Are For Others",
    price: 75000,
    accent: "#FF6B00",
    glow: "rgba(255,107,0,0.35)",
    icon: "🔥",
    selections: {
      color: "BMW Individual Frozen Black",
      engine: "Stage 3 Full Build (900+ hp)",
      wheels: "HRE Monoblock P101",
      brakes: "AP Racing Pro5000R Kit",
      exhaust: "Akrapovic Evolution Full Titanium",
      interior: "Alcantara Sport Package",
      carbon: "Full Carbon (Interior + Exterior)",
      tech: [
        "M Track Package",
        "Driving Assistance Pro",
        "Head-Up Display",
        "Bowers & Wilkins Diamond Sound",
        "Night Vision",
        "Wireless Charging + ConnectedDrive Pro",
      ],
    },
  },
];

// ── Option Data ───────────────────────────────────────────────────────────────
const COLORS = [
  { name: "Alpine White", price: 0, swatch: "#F8F8F8" },
  { name: "Carbon Black Metallic", price: 950, swatch: "#1C1C1E" },
  { name: "Frozen Deep Green", price: 1200, swatch: "#1A3A2A" },
  { name: "Isle of Man Green", price: 1500, swatch: "#2D5A3D" },
  { name: "Dravit Grey Metallic", price: 950, swatch: "#5A5E6B" },
  { name: "Sapphire Black Metallic", price: 950, swatch: "#0D1B2A" },
  { name: "BMW Individual Grigio Telesto", price: 3200, swatch: "#8C7B6B" },
  { name: "BMW Individual Frozen Black", price: 4500, swatch: "#111111" },
];

const ENGINES = [
  { name: "Stock S58 4.4L V8 (627 hp)", price: 0 },
  { name: "Stage 1 Tune (700 hp)", price: 4500 },
  { name: "Stage 2 Turbo Upgrade (780 hp)", price: 11000 },
  { name: "Stage 3 Full Build (900+ hp)", price: 22000 },
];

const WHEELS = [
  { name: 'Stock M 20" Forged', price: 0 },
  { name: 'Carbon Black 21" Forged', price: 3800 },
  { name: 'Gold Floret 20" Forged', price: 5200 },
  { name: "HRE Monoblock P101", price: 9000 },
];

const BRAKES = [
  { name: "Stock M Compound Brakes", price: 0 },
  { name: "M Carbon Ceramic Brakes", price: 8500 },
  { name: "AP Racing Pro5000R Kit", price: 12000 },
];

const EXHAUSTS = [
  { name: "Stock Exhaust", price: 0 },
  { name: "Akrapovic Slip-On", price: 3200 },
  { name: "Akrapovic Evolution Full Titanium", price: 6800 },
  { name: "Capristo Valvetronic", price: 5500 },
];

const INTERIORS = [
  { name: "Standard Merino Leather", price: 0 },
  { name: "Full Merino Leather (Extended)", price: 2200 },
  { name: "Alcantara Sport Package", price: 3500 },
  { name: "Nappa Leather Individual", price: 5000 },
];

const CARBONS = [
  { name: "None", price: 0 },
  { name: "Interior Carbon Trim", price: 2800 },
  { name: "Exterior Carbon Aero Kit", price: 6500 },
  { name: "Full Carbon (Interior + Exterior)", price: 12000 },
];

const TECH_OPTIONS = [
  { name: "M Track Package", price: 1900 },
  { name: "Driving Assistance Pro", price: 1700 },
  { name: "Head-Up Display", price: 900 },
  { name: "Bowers & Wilkins Diamond Sound", price: 3400 },
  { name: "Night Vision", price: 2200 },
  { name: "Wireless Charging + ConnectedDrive Pro", price: 600 },
];

const CATEGORIES = [
  { id: "color", label: "Exterior Color", emoji: "🎨" },
  { id: "engine", label: "Engine / Turbo", emoji: "⚙️" },
  { id: "wheels", label: "Wheels", emoji: "🔵" },
  { id: "brakes", label: "Brake Package", emoji: "🛑" },
  { id: "exhaust", label: "Exhaust System", emoji: "💨" },
  { id: "interior", label: "Interior Trim", emoji: "🪑" },
  { id: "carbon", label: "Carbon Fiber", emoji: "🖤" },
  { id: "tech", label: "Driver Tech", emoji: "📡" },
];

function fmt(n: number) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

interface SelectionsState {
  color: string;
  engine: string;
  wheels: string;
  brakes: string;
  exhaust: string;
  interior: string;
  carbon: string;
  tech: string[];
}

interface PerformanceStats {
  hp: number;
  torque: number;
  zeroToSixty: number;
  topSpeed: number;
}

const DEFAULT_SELECTIONS: SelectionsState = {
  color: "Alpine White",
  engine: "Stock S58 4.4L V8 (627 hp)",
  wheels: 'Stock M 20" Forged',
  brakes: "Stock M Compound Brakes",
  exhaust: "Stock Exhaust",
  interior: "Standard Merino Leather",
  carbon: "None",
  tech: [],
};

function getPerformanceStats(
  engine: string,
  exhaust: string,
): PerformanceStats {
  const isEvolution = exhaust.includes("Evolution");
  const isSlipOn = exhaust.includes("Slip-On");
  const isCapristo = exhaust.includes("Capristo");

  if (engine.includes("Stage 3")) {
    if (isEvolution)
      return { hp: 950, torque: 870, zeroToSixty: 2.35, topSpeed: 228 };
    if (isCapristo)
      return { hp: 940, torque: 860, zeroToSixty: 2.38, topSpeed: 226 };
    return { hp: 920, torque: 840, zeroToSixty: 2.4, topSpeed: 225 };
  }
  if (engine.includes("Stage 2")) {
    if (isEvolution)
      return { hp: 800, torque: 720, zeroToSixty: 2.65, topSpeed: 212 };
    return { hp: 780, torque: 700, zeroToSixty: 2.7, topSpeed: 208 };
  }
  if (engine.includes("Stage 1")) {
    if (isSlipOn)
      return { hp: 715, torque: 630, zeroToSixty: 2.85, topSpeed: 199 };
    return { hp: 700, torque: 620, zeroToSixty: 2.9, topSpeed: 197 };
  }
  return { hp: 627, torque: 553, zeroToSixty: 3.1, topSpeed: 189 };
}

function calcOptionsTotal(sel: SelectionsState) {
  const colorPrice = COLORS.find((c) => c.name === sel.color)?.price ?? 0;
  const enginePrice = ENGINES.find((e) => e.name === sel.engine)?.price ?? 0;
  const wheelsPrice = WHEELS.find((w) => w.name === sel.wheels)?.price ?? 0;
  const brakesPrice = BRAKES.find((b) => b.name === sel.brakes)?.price ?? 0;
  const exhaustPrice = EXHAUSTS.find((e) => e.name === sel.exhaust)?.price ?? 0;
  const interiorPrice =
    INTERIORS.find((i) => i.name === sel.interior)?.price ?? 0;
  const carbonPrice = CARBONS.find((c) => c.name === sel.carbon)?.price ?? 0;
  const techPrice = sel.tech.reduce(
    (sum, t) => sum + (TECH_OPTIONS.find((o) => o.name === t)?.price ?? 0),
    0,
  );
  return (
    colorPrice +
    enginePrice +
    wheelsPrice +
    brakesPrice +
    exhaustPrice +
    interiorPrice +
    carbonPrice +
    techPrice
  );
}

function buildSpec(
  sel: SelectionsState,
  optionsTotal: number,
  perf: PerformanceStats,
) {
  const subtotal = BASE_PRICE + optionsTotal;
  const tax = subtotal * TAX_RATE;
  const grand = subtotal + tax;

  const lines: string[] = [
    "BMW M5 CS — Custom Build",
    "──────────────────────────",
    `Base Price: ${fmt(BASE_PRICE)}`,
    "",
    "SELECTED OPTIONS:",
  ];
  const addLine = (label: string, name: string, price: number) => {
    if (price > 0) lines.push(`• ${name} (${label}): ${fmt(price)}`);
  };
  addLine(
    "Exterior Color",
    sel.color,
    COLORS.find((c) => c.name === sel.color)?.price ?? 0,
  );
  addLine(
    "Engine",
    sel.engine,
    ENGINES.find((e) => e.name === sel.engine)?.price ?? 0,
  );
  addLine(
    "Wheels",
    sel.wheels,
    WHEELS.find((w) => w.name === sel.wheels)?.price ?? 0,
  );
  addLine(
    "Brakes",
    sel.brakes,
    BRAKES.find((b) => b.name === sel.brakes)?.price ?? 0,
  );
  addLine(
    "Exhaust",
    sel.exhaust,
    EXHAUSTS.find((e) => e.name === sel.exhaust)?.price ?? 0,
  );
  addLine(
    "Interior",
    sel.interior,
    INTERIORS.find((i) => i.name === sel.interior)?.price ?? 0,
  );
  addLine(
    "Carbon Fiber",
    sel.carbon,
    CARBONS.find((c) => c.name === sel.carbon)?.price ?? 0,
  );
  for (const t of sel.tech) {
    addLine("Tech", t, TECH_OPTIONS.find((o) => o.name === t)?.price ?? 0);
  }

  lines.push("");
  lines.push(`Options Subtotal: ${fmt(optionsTotal)}`);
  lines.push(`Subtotal: ${fmt(subtotal)}`);
  lines.push(`Tax (10%): ${fmt(tax)}`);
  lines.push(`Grand Total: ${fmt(grand)}`);
  lines.push("");
  lines.push("PROJECTED PERFORMANCE:");
  lines.push(`• Output: ${perf.hp} hp`);
  lines.push(`• Torque: ${perf.torque} lb-ft`);
  lines.push(`• 0-60 mph: ${perf.zeroToSixty}s`);
  lines.push(`• Top Speed: ${perf.topSpeed} mph`);
  return lines.join("\n");
}

// ── Animated number ───────────────────────────────────────────────────────────
function AnimatedPrice({ value }: { value: number }) {
  const [displayed, setDisplayed] = useState(value);
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional animation
  useEffect(() => {
    const start = displayed;
    const end = value;
    if (start === end) return;
    const duration = 450;
    const startTime = performance.now();
    let raf: number;
    function step(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setDisplayed(Math.round(start + (end - start) * eased));
      if (progress < 1) raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  return <span>{fmt(displayed)}</span>;
}

function AnimatedStat({
  value,
  decimals = 0,
}: { value: number; decimals?: number }) {
  const [displayed, setDisplayed] = useState(value);
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional animation
  useEffect(() => {
    const start = displayed;
    const end = value;
    if (start === end) return;
    const duration = 600;
    const startTime = performance.now();
    let raf: number;
    function step(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      const current = start + (end - start) * eased;
      setDisplayed(
        decimals > 0 ? Math.round(current * 100) / 100 : Math.round(current),
      );
      if (progress < 1) raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return <span>{decimals > 0 ? displayed.toFixed(decimals) : displayed}</span>;
}

// ── Option card ───────────────────────────────────────────────────────────────
function OptionCard({
  label,
  price,
  selected,
  onClick,
  swatch,
}: {
  label: string;
  price: number;
  selected: boolean;
  onClick: () => void;
  swatch?: string;
}) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.025, y: -2 }}
      whileTap={{ scale: 0.975 }}
      onClick={onClick}
      className="relative flex flex-col gap-2 rounded-xl p-4 text-left transition-all cursor-pointer"
      style={{
        background: selected ? "rgba(0,191,255,0.1)" : "rgba(255,255,255,0.03)",
        border: selected
          ? "1.5px solid rgba(0,191,255,0.7)"
          : "1px solid rgba(255,255,255,0.08)",
        boxShadow: selected
          ? "0 0 20px rgba(0,191,255,0.2), inset 0 0 12px rgba(0,191,255,0.05)"
          : "none",
      }}
      data-ocid="config.option.button"
    >
      {selected && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center"
          style={{ background: "#00BFFF" }}
        >
          <Check className="w-3 h-3 text-black" />
        </motion.span>
      )}
      <div className="flex items-center gap-2">
        {swatch && (
          <span
            className="w-5 h-5 rounded-full border border-white/20 flex-shrink-0"
            style={{ background: swatch }}
          />
        )}
        <span
          className="text-sm font-semibold"
          style={{ color: selected ? "#00BFFF" : "#E8ECF0" }}
        >
          {label}
        </span>
      </div>
      <span
        className="text-xs font-bold tracking-wide"
        style={{ color: price === 0 ? "rgba(255,255,255,0.35)" : "#FFD700" }}
      >
        {price === 0 ? "Included" : `+${fmt(price)}`}
      </span>
    </motion.button>
  );
}

// ── Tech checkbox card ────────────────────────────────────────────────────────
function TechCard({
  label,
  price,
  selected,
  onClick,
}: {
  label: string;
  price: number;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.025, y: -2 }}
      whileTap={{ scale: 0.975 }}
      onClick={onClick}
      className="relative flex items-center gap-3 rounded-xl p-4 text-left transition-all cursor-pointer"
      style={{
        background: selected
          ? "rgba(0,191,255,0.08)"
          : "rgba(255,255,255,0.03)",
        border: selected
          ? "1.5px solid rgba(0,191,255,0.6)"
          : "1px solid rgba(255,255,255,0.08)",
        boxShadow: selected ? "0 0 16px rgba(0,191,255,0.18)" : "none",
      }}
      data-ocid="config.tech.toggle"
    >
      <div
        className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0"
        style={{
          background: selected ? "#00BFFF" : "rgba(255,255,255,0.07)",
          border: selected ? "none" : "1px solid rgba(255,255,255,0.2)",
        }}
      >
        {selected && <Check className="w-3 h-3 text-black" />}
      </div>
      <div className="flex-1">
        <div
          className="text-sm font-semibold"
          style={{ color: selected ? "#00BFFF" : "#E8ECF0" }}
        >
          {label}
        </div>
        <div className="text-xs font-bold" style={{ color: "#FFD700" }}>
          +{fmt(price)}
        </div>
      </div>
    </motion.button>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function CarCustomizationSection({
  onConfigChange,
}: CarCustomizationSectionProps) {
  const [selections, setSelections] =
    useState<SelectionsState>(DEFAULT_SELECTIONS);
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("color");
  const [openAccordions, setOpenAccordions] = useState<Set<string>>(
    new Set(["color"]),
  );

  const optionsTotal = calcOptionsTotal(selections);
  const subtotal = BASE_PRICE + optionsTotal;
  const tax = subtotal * TAX_RATE;
  const grand = subtotal + tax;
  const perfStats = getPerformanceStats(selections.engine, selections.exhaust);
  const isUnleashed = activePreset === "performance_unleashed";
  const perfAccent = isUnleashed ? "#FF6B00" : "#00BFFF";
  const perfGlow = isUnleashed
    ? "rgba(255,107,0,0.25)"
    : "rgba(0,191,255,0.15)";

  // Emit changes upward
  useEffect(() => {
    const spec = buildSpec(selections, optionsTotal, perfStats);
    onConfigChange(spec, grand);
  }, [selections, optionsTotal, grand, onConfigChange, perfStats]);

  function applyPreset(preset: (typeof PRESETS)[0]) {
    if (activePreset === preset.id) {
      setActivePreset(null);
      setSelections(DEFAULT_SELECTIONS);
    } else {
      setActivePreset(preset.id);
      setSelections(preset.selections as SelectionsState);
    }
  }

  function setRadio(field: keyof Omit<SelectionsState, "tech">, value: string) {
    setActivePreset(null);
    setSelections((prev) => ({ ...prev, [field]: value }));
  }

  function toggleTech(name: string) {
    setActivePreset(null);
    setSelections((prev) => ({
      ...prev,
      tech: prev.tech.includes(name)
        ? prev.tech.filter((t) => t !== name)
        : [...prev.tech, name],
    }));
  }

  function toggleAccordion(id: string) {
    setOpenAccordions((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function scrollToBooking() {
    document
      .getElementById("book-test-drive")
      ?.scrollIntoView({ behavior: "smooth" });
  }

  function handleReset() {
    setSelections(DEFAULT_SELECTIONS);
    setActivePreset(null);
  }

  return (
    <section
      id="car-configurator"
      className="relative py-28 overflow-hidden"
      style={{ backgroundColor: "#0B0F14" }}
    >
      {/* Ghost watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        style={{ opacity: 0.022 }}
      >
        <span
          className="font-black uppercase tracking-widest whitespace-nowrap"
          style={{ fontSize: "clamp(50px, 14vw, 180px)", color: "#00BFFF" }}
        >
          CONFIGURE
        </span>
      </div>

      {/* Ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(0,191,255,0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <p
            className="text-xs font-semibold tracking-[0.45em] uppercase mb-3"
            style={{ color: "#00BFFF" }}
          >
            Personalize Your Legend
          </p>
          <h2
            className="font-black uppercase leading-none"
            style={{
              fontSize: "clamp(2rem, 6vw, 4rem)",
              background:
                "linear-gradient(135deg, #FFFFFF 0%, #00BFFF 55%, #FFFFFF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Configure Your M5 CS
          </h2>
          <p
            className="mt-4 text-sm tracking-wide"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            Build your perfect machine — every option, every detail
          </p>
          <div
            className="mx-auto mt-4 h-[2px] w-24 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, #00BFFF, transparent)",
            }}
          />
        </motion.div>

        {/* ── Preset Cards ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-16"
        >
          <p
            className="text-xs font-bold tracking-[0.35em] uppercase mb-6 flex items-center gap-2"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            <Star className="w-3.5 h-3.5" style={{ color: "#FFD700" }} />
            Special Packages
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {PRESETS.map((preset, i) => (
              <motion.button
                key={preset.id}
                type="button"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ scale: 1.03, y: -4 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => applyPreset(preset)}
                className="relative flex flex-col gap-3 rounded-2xl p-6 text-left cursor-pointer overflow-hidden"
                style={{
                  background:
                    activePreset === preset.id
                      ? "linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 100%)"
                      : "rgba(255,255,255,0.03)",
                  border:
                    activePreset === preset.id
                      ? `1.5px solid ${preset.accent}`
                      : "1px solid rgba(255,255,255,0.08)",
                  boxShadow:
                    activePreset === preset.id
                      ? `0 0 30px ${preset.glow}, 0 0 60px ${preset.glow.replace("0.35", "0.15")}`
                      : "none",
                  backdropFilter: "blur(20px)",
                }}
                data-ocid="config.preset.button"
              >
                {/* Glow bg */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at 50% 0%, ${preset.glow.replace("0.35", "0.12")} 0%, transparent 70%)`,
                  }}
                />

                {activePreset === preset.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ background: preset.accent }}
                  >
                    <Check className="w-3.5 h-3.5 text-black" />
                  </motion.div>
                )}

                <span
                  className="text-3xl leading-none"
                  style={{ color: preset.accent }}
                >
                  {preset.icon}
                </span>

                <div>
                  <div
                    className="font-black text-base uppercase tracking-wide"
                    style={{ color: preset.accent }}
                  >
                    {preset.name}
                  </div>
                  <div
                    className="text-xs mt-0.5"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  >
                    {preset.tagline}
                  </div>
                </div>

                <div
                  className="mt-auto pt-3 border-t"
                  style={{ borderColor: "rgba(255,255,255,0.08)" }}
                >
                  <div
                    className="text-xl font-black"
                    style={{ color: preset.accent }}
                  >
                    +{fmt(preset.price)}
                  </div>
                  <div
                    className="text-[10px] tracking-widest uppercase mt-0.5"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                  >
                    Package add-on
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* ── Main Config + Sticky Panel ── */}
        <div className="flex flex-col xl:flex-row gap-10 items-start">
          {/* Categories */}
          <div className="flex-1 min-w-0">
            {/* Desktop tab bar */}
            <div className="hidden md:flex flex-wrap gap-2 mb-8">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className="px-4 py-2 rounded-full text-xs font-bold tracking-wide uppercase transition-all"
                  style={{
                    background:
                      activeCategory === cat.id
                        ? "rgba(0,191,255,0.18)"
                        : "rgba(255,255,255,0.04)",
                    border:
                      activeCategory === cat.id
                        ? "1px solid rgba(0,191,255,0.6)"
                        : "1px solid rgba(255,255,255,0.08)",
                    color:
                      activeCategory === cat.id
                        ? "#00BFFF"
                        : "rgba(255,255,255,0.5)",
                    boxShadow:
                      activeCategory === cat.id
                        ? "0 0 16px rgba(0,191,255,0.2)"
                        : "none",
                  }}
                  data-ocid="config.category.tab"
                >
                  {cat.emoji} {cat.label}
                </button>
              ))}
            </div>

            {/* Desktop panels */}
            <div className="hidden md:block">
              <AnimatePresence mode="wait">
                <CategoryPanel
                  key={activeCategory}
                  categoryId={activeCategory}
                  selections={selections}
                  setRadio={setRadio}
                  toggleTech={toggleTech}
                />
              </AnimatePresence>
            </div>

            {/* Mobile accordion */}
            <div className="md:hidden flex flex-col gap-3">
              {CATEGORIES.map((cat) => (
                <div
                  key={cat.id}
                  className="rounded-xl overflow-hidden"
                  style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(cat.id)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left"
                    style={{ background: "rgba(255,255,255,0.03)" }}
                    data-ocid="config.accordion.button"
                  >
                    <span
                      className="text-sm font-bold tracking-wide"
                      style={{
                        color: openAccordions.has(cat.id)
                          ? "#00BFFF"
                          : "#E8ECF0",
                      }}
                    >
                      {cat.emoji} {cat.label}
                    </span>
                    <motion.span
                      animate={{ rotate: openAccordions.has(cat.id) ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <ChevronDown
                        className="w-4 h-4"
                        style={{ color: "rgba(255,255,255,0.5)" }}
                      />
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {openAccordions.has(cat.id) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4">
                          <CategoryPanel
                            categoryId={cat.id}
                            selections={selections}
                            setRadio={setRadio}
                            toggleTech={toggleTech}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* ── Sticky Pricing Panel ── */}
          <div className="xl:sticky xl:top-24 w-full xl:w-[360px] flex-shrink-0">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="rounded-2xl p-7"
              style={{
                background: "rgba(0,191,255,0.04)",
                border: "1px solid rgba(0,191,255,0.2)",
                backdropFilter: "blur(24px)",
                boxShadow:
                  "0 0 50px rgba(0,191,255,0.1), 0 30px 60px rgba(0,0,0,0.5)",
              }}
              data-ocid="config.panel"
            >
              <div className="flex items-center gap-2 mb-6">
                <Zap className="w-4 h-4" style={{ color: "#00BFFF" }} />
                <span
                  className="text-xs font-black uppercase tracking-[0.3em]"
                  style={{ color: "#00BFFF" }}
                >
                  Build Summary
                </span>
              </div>

              <div className="flex flex-col gap-3">
                <PriceLine label="Base Price" value={BASE_PRICE} dimColor />
                <PriceLine
                  label="Options Total"
                  value={optionsTotal}
                  highlight={optionsTotal > 0}
                />
                <div
                  className="h-px my-1"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(0,191,255,0.3), transparent)",
                  }}
                />
                <PriceLine label="Subtotal" value={subtotal} />
                <PriceLine label="Tax (10%)" value={tax} dimColor />
                <div
                  className="h-px my-1"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(0,191,255,0.5), transparent)",
                  }}
                />

                {/* Grand total */}
                <div className="flex items-end justify-between mt-1">
                  <span
                    className="text-xs font-black uppercase tracking-[0.25em]"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                  >
                    Grand Total
                  </span>
                  <span
                    className="text-2xl font-black"
                    style={{
                      background:
                        "linear-gradient(135deg, #FFFFFF 0%, #00BFFF 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    <AnimatedPrice value={grand} />
                  </span>
                </div>
              </div>

              {/* Selected options list */}
              {optionsTotal > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-5 pt-5 overflow-hidden"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <p
                    className="text-[10px] uppercase tracking-widest font-bold mb-3"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                  >
                    Selected Options
                  </p>
                  <div
                    className="flex flex-col gap-1.5 max-h-52 overflow-y-auto pr-1"
                    style={{
                      scrollbarWidth: "thin",
                      scrollbarColor: "rgba(0,191,255,0.3) transparent",
                    }}
                  >
                    {[
                      { label: "Color", name: selections.color, list: COLORS },
                      {
                        label: "Engine",
                        name: selections.engine,
                        list: ENGINES,
                      },
                      {
                        label: "Wheels",
                        name: selections.wheels,
                        list: WHEELS,
                      },
                      {
                        label: "Brakes",
                        name: selections.brakes,
                        list: BRAKES,
                      },
                      {
                        label: "Exhaust",
                        name: selections.exhaust,
                        list: EXHAUSTS,
                      },
                      {
                        label: "Interior",
                        name: selections.interior,
                        list: INTERIORS,
                      },
                      {
                        label: "Carbon",
                        name: selections.carbon,
                        list: CARBONS,
                      },
                    ].map((row) => {
                      const price =
                        row.list.find((i) => i.name === row.name)?.price ?? 0;
                      if (price === 0) return null;
                      return (
                        <div
                          key={row.label}
                          className="flex justify-between items-start gap-2"
                        >
                          <span
                            className="text-[11px] leading-tight"
                            style={{ color: "rgba(255,255,255,0.5)" }}
                          >
                            {row.name}
                          </span>
                          <span
                            className="text-[11px] font-bold whitespace-nowrap"
                            style={{ color: "#FFD700" }}
                          >
                            +{fmt(price)}
                          </span>
                        </div>
                      );
                    })}
                    {selections.tech.map((t) => {
                      const p =
                        TECH_OPTIONS.find((o) => o.name === t)?.price ?? 0;
                      return (
                        <div
                          key={t}
                          className="flex justify-between items-start gap-2"
                        >
                          <span
                            className="text-[11px] leading-tight"
                            style={{ color: "rgba(255,255,255,0.5)" }}
                          >
                            {t}
                          </span>
                          <span
                            className="text-[11px] font-bold whitespace-nowrap"
                            style={{ color: "#FFD700" }}
                          >
                            +{fmt(p)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* ── Performance Projection ── */}
              <motion.div
                layout
                className="mt-5 pt-5 rounded-xl p-4"
                style={{
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                  background: isUnleashed
                    ? "rgba(255,107,0,0.06)"
                    : "rgba(0,191,255,0.04)",
                  border: `1px solid ${isUnleashed ? "rgba(255,107,0,0.25)" : "rgba(0,191,255,0.15)"}`,
                  boxShadow: `0 0 20px ${perfGlow}`,
                }}
              >
                <p
                  className="text-[10px] uppercase tracking-widest font-bold mb-4 flex items-center gap-1.5"
                  style={{ color: perfAccent }}
                >
                  {isUnleashed ? "🔥" : "⚡"} Performance Projection
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <PerfStat
                    label="OUTPUT"
                    value={perfStats.hp}
                    unit="hp"
                    accent={perfAccent}
                    glow={perfGlow}
                  />
                  <PerfStat
                    label="TORQUE"
                    value={perfStats.torque}
                    unit="lb-ft"
                    accent={perfAccent}
                    glow={perfGlow}
                  />
                  <PerfStat
                    label="0-60 MPH"
                    value={perfStats.zeroToSixty}
                    unit="s"
                    accent={perfAccent}
                    glow={perfGlow}
                    decimals={2}
                  />
                  <PerfStat
                    label="TOP SPEED"
                    value={perfStats.topSpeed}
                    unit="mph"
                    accent={perfAccent}
                    glow={perfGlow}
                  />
                </div>
              </motion.div>

              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={scrollToBooking}
                className="mt-6 w-full py-4 rounded-full font-black text-sm tracking-[0.2em] uppercase transition-all"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(0,191,255,0.35) 0%, rgba(0,191,255,0.2) 100%)",
                  border: "1px solid rgba(0,191,255,0.6)",
                  color: "#00BFFF",
                  boxShadow: "0 0 30px rgba(0,191,255,0.3)",
                }}
                data-ocid="config.apply_button"
              >
                Apply to Booking ↓
              </motion.button>

              {/* Reset button */}
              <motion.button
                type="button"
                whileHover={{ scale: 1.01, opacity: 1 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleReset}
                className="mt-3 w-full py-3 rounded-full font-bold text-xs tracking-[0.2em] uppercase transition-all flex items-center justify-center gap-2"
                style={{
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "rgba(255,255,255,0.4)",
                  opacity: 0.85,
                }}
                data-ocid="config.secondary_button"
              >
                <RotateCcw className="w-3 h-3" />
                Reset Configuration
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Performance Stat Card ─────────────────────────────────────────────────────
function PerfStat({
  label,
  value,
  unit,
  accent,
  glow,
  decimals = 0,
}: {
  label: string;
  value: number;
  unit: string;
  accent: string;
  glow: string;
  decimals?: number;
}) {
  return (
    <div
      className="flex flex-col gap-1 rounded-lg p-3"
      style={{
        background: "rgba(0,0,0,0.3)",
        border: `1px solid ${accent}22`,
        boxShadow: `0 0 12px ${glow}`,
      }}
    >
      <span
        className="text-[9px] font-black uppercase tracking-widest"
        style={{ color: "rgba(255,255,255,0.35)" }}
      >
        {label}
      </span>
      <div className="flex items-baseline gap-1">
        <span
          className="text-xl font-black leading-none tabular-nums"
          style={{ color: accent }}
        >
          <AnimatedStat value={value} decimals={decimals} />
        </span>
        <span
          className="text-[10px] font-bold"
          style={{ color: `${accent}99` }}
        >
          {unit}
        </span>
      </div>
    </div>
  );
}

// ── Category Panel ────────────────────────────────────────────────────────────
function CategoryPanel({
  categoryId,
  selections,
  setRadio,
  toggleTech,
}: {
  categoryId: string;
  selections: SelectionsState;
  setRadio: (field: keyof Omit<SelectionsState, "tech">, value: string) => void;
  toggleTech: (name: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25 }}
    >
      {categoryId === "color" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {COLORS.map((c) => (
            <OptionCard
              key={c.name}
              label={c.name}
              price={c.price}
              selected={selections.color === c.name}
              onClick={() => setRadio("color", c.name)}
              swatch={c.swatch}
            />
          ))}
        </div>
      )}
      {categoryId === "engine" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {ENGINES.map((e) => (
            <OptionCard
              key={e.name}
              label={e.name}
              price={e.price}
              selected={selections.engine === e.name}
              onClick={() => setRadio("engine", e.name)}
            />
          ))}
        </div>
      )}
      {categoryId === "wheels" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {WHEELS.map((w) => (
            <OptionCard
              key={w.name}
              label={w.name}
              price={w.price}
              selected={selections.wheels === w.name}
              onClick={() => setRadio("wheels", w.name)}
            />
          ))}
        </div>
      )}
      {categoryId === "brakes" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {BRAKES.map((b) => (
            <OptionCard
              key={b.name}
              label={b.name}
              price={b.price}
              selected={selections.brakes === b.name}
              onClick={() => setRadio("brakes", b.name)}
            />
          ))}
        </div>
      )}
      {categoryId === "exhaust" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {EXHAUSTS.map((e) => (
            <OptionCard
              key={e.name}
              label={e.name}
              price={e.price}
              selected={selections.exhaust === e.name}
              onClick={() => setRadio("exhaust", e.name)}
            />
          ))}
        </div>
      )}
      {categoryId === "interior" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {INTERIORS.map((i) => (
            <OptionCard
              key={i.name}
              label={i.name}
              price={i.price}
              selected={selections.interior === i.name}
              onClick={() => setRadio("interior", i.name)}
            />
          ))}
        </div>
      )}
      {categoryId === "carbon" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {CARBONS.map((c) => (
            <OptionCard
              key={c.name}
              label={c.name}
              price={c.price}
              selected={selections.carbon === c.name}
              onClick={() => setRadio("carbon", c.name)}
            />
          ))}
        </div>
      )}
      {categoryId === "tech" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {TECH_OPTIONS.map((t) => (
            <TechCard
              key={t.name}
              label={t.name}
              price={t.price}
              selected={selections.tech.includes(t.name)}
              onClick={() => toggleTech(t.name)}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}

// ── Price line ────────────────────────────────────────────────────────────────
function PriceLine({
  label,
  value,
  dimColor,
  highlight,
}: {
  label: string;
  value: number;
  dimColor?: boolean;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span
        className="text-xs font-semibold uppercase tracking-wide"
        style={{
          color: dimColor ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.6)",
        }}
      >
        {label}
      </span>
      <span
        className="text-sm font-black"
        style={{
          color: highlight
            ? "#FFD700"
            : dimColor
              ? "rgba(255,255,255,0.4)"
              : "#E8ECF0",
        }}
      >
        <AnimatedPrice value={value} />
      </span>
    </div>
  );
}
