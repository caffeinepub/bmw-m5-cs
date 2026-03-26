import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, m as motion, A as AnimatePresence, C as ChevronDown } from "./index-CFGClM9r.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]];
const Check = createLucideIcon("check", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
];
const RotateCcw = createLucideIcon("rotate-ccw", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s"
    }
  ]
];
const Star = createLucideIcon("star", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
];
const Zap = createLucideIcon("zap", __iconNode);
const BASE_PRICE = 142e3;
const TAX_RATE = 0.1;
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
      tech: ["Driving Assistance Pro", "Bowers & Wilkins Diamond Sound"]
    }
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
        "Wireless Charging + ConnectedDrive Pro"
      ]
    }
  },
  {
    id: "racing",
    name: "Racing Package",
    tagline: "Born on the Circuit",
    price: 38e3,
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
      tech: ["M Track Package", "Head-Up Display"]
    }
  },
  {
    id: "stealth",
    name: "Stealth Package",
    tagline: "Shadow Mode Activated",
    price: 21e3,
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
      tech: ["M Track Package"]
    }
  },
  {
    id: "performance_unleashed",
    name: "Performance Unleashed",
    tagline: "Limits Are For Others",
    price: 75e3,
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
        "Wireless Charging + ConnectedDrive Pro"
      ]
    }
  }
];
const COLORS = [
  { name: "Alpine White", price: 0, swatch: "#F8F8F8" },
  { name: "Carbon Black Metallic", price: 950, swatch: "#1C1C1E" },
  { name: "Frozen Deep Green", price: 1200, swatch: "#1A3A2A" },
  { name: "Isle of Man Green", price: 1500, swatch: "#2D5A3D" },
  { name: "Dravit Grey Metallic", price: 950, swatch: "#5A5E6B" },
  { name: "Sapphire Black Metallic", price: 950, swatch: "#0D1B2A" },
  { name: "BMW Individual Grigio Telesto", price: 3200, swatch: "#8C7B6B" },
  { name: "BMW Individual Frozen Black", price: 4500, swatch: "#111111" }
];
const ENGINES = [
  { name: "Stock S58 4.4L V8 (627 hp)", price: 0 },
  { name: "Stage 1 Tune (700 hp)", price: 4500 },
  { name: "Stage 2 Turbo Upgrade (780 hp)", price: 11e3 },
  { name: "Stage 3 Full Build (900+ hp)", price: 22e3 }
];
const WHEELS = [
  { name: 'Stock M 20" Forged', price: 0 },
  { name: 'Carbon Black 21" Forged', price: 3800 },
  { name: 'Gold Floret 20" Forged', price: 5200 },
  { name: "HRE Monoblock P101", price: 9e3 }
];
const BRAKES = [
  { name: "Stock M Compound Brakes", price: 0 },
  { name: "M Carbon Ceramic Brakes", price: 8500 },
  { name: "AP Racing Pro5000R Kit", price: 12e3 }
];
const EXHAUSTS = [
  { name: "Stock Exhaust", price: 0 },
  { name: "Akrapovic Slip-On", price: 3200 },
  { name: "Akrapovic Evolution Full Titanium", price: 6800 },
  { name: "Capristo Valvetronic", price: 5500 }
];
const INTERIORS = [
  { name: "Standard Merino Leather", price: 0 },
  { name: "Full Merino Leather (Extended)", price: 2200 },
  { name: "Alcantara Sport Package", price: 3500 },
  { name: "Nappa Leather Individual", price: 5e3 }
];
const CARBONS = [
  { name: "None", price: 0 },
  { name: "Interior Carbon Trim", price: 2800 },
  { name: "Exterior Carbon Aero Kit", price: 6500 },
  { name: "Full Carbon (Interior + Exterior)", price: 12e3 }
];
const TECH_OPTIONS = [
  { name: "M Track Package", price: 1900 },
  { name: "Driving Assistance Pro", price: 1700 },
  { name: "Head-Up Display", price: 900 },
  { name: "Bowers & Wilkins Diamond Sound", price: 3400 },
  { name: "Night Vision", price: 2200 },
  { name: "Wireless Charging + ConnectedDrive Pro", price: 600 }
];
const CATEGORIES = [
  { id: "color", label: "Exterior Color", emoji: "🎨" },
  { id: "engine", label: "Engine / Turbo", emoji: "⚙️" },
  { id: "wheels", label: "Wheels", emoji: "🔵" },
  { id: "brakes", label: "Brake Package", emoji: "🛑" },
  { id: "exhaust", label: "Exhaust System", emoji: "💨" },
  { id: "interior", label: "Interior Trim", emoji: "🪑" },
  { id: "carbon", label: "Carbon Fiber", emoji: "🖤" },
  { id: "tech", label: "Driver Tech", emoji: "📡" }
];
function fmt(n) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  });
}
const DEFAULT_SELECTIONS = {
  color: "Alpine White",
  engine: "Stock S58 4.4L V8 (627 hp)",
  wheels: 'Stock M 20" Forged',
  brakes: "Stock M Compound Brakes",
  exhaust: "Stock Exhaust",
  interior: "Standard Merino Leather",
  carbon: "None",
  tech: []
};
function getPerformanceStats(engine, exhaust) {
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
function calcOptionsTotal(sel) {
  var _a, _b, _c, _d, _e, _f, _g;
  const colorPrice = ((_a = COLORS.find((c) => c.name === sel.color)) == null ? void 0 : _a.price) ?? 0;
  const enginePrice = ((_b = ENGINES.find((e) => e.name === sel.engine)) == null ? void 0 : _b.price) ?? 0;
  const wheelsPrice = ((_c = WHEELS.find((w) => w.name === sel.wheels)) == null ? void 0 : _c.price) ?? 0;
  const brakesPrice = ((_d = BRAKES.find((b) => b.name === sel.brakes)) == null ? void 0 : _d.price) ?? 0;
  const exhaustPrice = ((_e = EXHAUSTS.find((e) => e.name === sel.exhaust)) == null ? void 0 : _e.price) ?? 0;
  const interiorPrice = ((_f = INTERIORS.find((i) => i.name === sel.interior)) == null ? void 0 : _f.price) ?? 0;
  const carbonPrice = ((_g = CARBONS.find((c) => c.name === sel.carbon)) == null ? void 0 : _g.price) ?? 0;
  const techPrice = sel.tech.reduce(
    (sum, t) => {
      var _a2;
      return sum + (((_a2 = TECH_OPTIONS.find((o) => o.name === t)) == null ? void 0 : _a2.price) ?? 0);
    },
    0
  );
  return colorPrice + enginePrice + wheelsPrice + brakesPrice + exhaustPrice + interiorPrice + carbonPrice + techPrice;
}
function buildSpec(sel, optionsTotal, perf) {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  const subtotal = BASE_PRICE + optionsTotal;
  const tax = subtotal * TAX_RATE;
  const grand = subtotal + tax;
  const lines = [
    "BMW M5 CS — Custom Build",
    "──────────────────────────",
    `Base Price: ${fmt(BASE_PRICE)}`,
    "",
    "SELECTED OPTIONS:"
  ];
  const addLine = (label, name, price) => {
    if (price > 0) lines.push(`• ${name} (${label}): ${fmt(price)}`);
  };
  addLine(
    "Exterior Color",
    sel.color,
    ((_a = COLORS.find((c) => c.name === sel.color)) == null ? void 0 : _a.price) ?? 0
  );
  addLine(
    "Engine",
    sel.engine,
    ((_b = ENGINES.find((e) => e.name === sel.engine)) == null ? void 0 : _b.price) ?? 0
  );
  addLine(
    "Wheels",
    sel.wheels,
    ((_c = WHEELS.find((w) => w.name === sel.wheels)) == null ? void 0 : _c.price) ?? 0
  );
  addLine(
    "Brakes",
    sel.brakes,
    ((_d = BRAKES.find((b) => b.name === sel.brakes)) == null ? void 0 : _d.price) ?? 0
  );
  addLine(
    "Exhaust",
    sel.exhaust,
    ((_e = EXHAUSTS.find((e) => e.name === sel.exhaust)) == null ? void 0 : _e.price) ?? 0
  );
  addLine(
    "Interior",
    sel.interior,
    ((_f = INTERIORS.find((i) => i.name === sel.interior)) == null ? void 0 : _f.price) ?? 0
  );
  addLine(
    "Carbon Fiber",
    sel.carbon,
    ((_g = CARBONS.find((c) => c.name === sel.carbon)) == null ? void 0 : _g.price) ?? 0
  );
  for (const t of sel.tech) {
    addLine("Tech", t, ((_h = TECH_OPTIONS.find((o) => o.name === t)) == null ? void 0 : _h.price) ?? 0);
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
function AnimatedPrice({ value }) {
  const [displayed, setDisplayed] = reactExports.useState(value);
  reactExports.useEffect(() => {
    const start = displayed;
    const end = value;
    if (start === end) return;
    const duration = 450;
    const startTime = performance.now();
    let raf;
    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setDisplayed(Math.round(start + (end - start) * eased));
      if (progress < 1) raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: fmt(displayed) });
}
function AnimatedStat({
  value,
  decimals = 0
}) {
  const [displayed, setDisplayed] = reactExports.useState(value);
  reactExports.useEffect(() => {
    const start = displayed;
    const end = value;
    if (start === end) return;
    const duration = 600;
    const startTime = performance.now();
    let raf;
    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      const current = start + (end - start) * eased;
      setDisplayed(
        decimals > 0 ? Math.round(current * 100) / 100 : Math.round(current)
      );
      if (progress < 1) raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: decimals > 0 ? displayed.toFixed(decimals) : displayed });
}
function OptionCard({
  label,
  price,
  selected,
  onClick,
  swatch
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.button,
    {
      type: "button",
      whileHover: { scale: 1.025, y: -2 },
      whileTap: { scale: 0.975 },
      onClick,
      className: "relative flex flex-col gap-2 rounded-xl p-4 text-left transition-all cursor-pointer",
      style: {
        background: selected ? "rgba(0,191,255,0.1)" : "rgba(255,255,255,0.03)",
        border: selected ? "1.5px solid rgba(0,191,255,0.7)" : "1px solid rgba(255,255,255,0.08)",
        boxShadow: selected ? "0 0 20px rgba(0,191,255,0.2), inset 0 0 12px rgba(0,191,255,0.05)" : "none"
      },
      "data-ocid": "config.option.button",
      children: [
        selected && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.span,
          {
            initial: { scale: 0 },
            animate: { scale: 1 },
            className: "absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center",
            style: { background: "#00BFFF" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3 h-3 text-black" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          swatch && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "w-5 h-5 rounded-full border border-white/20 flex-shrink-0",
              style: { background: swatch }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-sm font-semibold",
              style: { color: selected ? "#00BFFF" : "#E8ECF0" },
              children: label
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "text-xs font-bold tracking-wide",
            style: { color: price === 0 ? "rgba(255,255,255,0.35)" : "#FFD700" },
            children: price === 0 ? "Included" : `+${fmt(price)}`
          }
        )
      ]
    }
  );
}
function TechCard({
  label,
  price,
  selected,
  onClick
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.button,
    {
      type: "button",
      whileHover: { scale: 1.025, y: -2 },
      whileTap: { scale: 0.975 },
      onClick,
      className: "relative flex items-center gap-3 rounded-xl p-4 text-left transition-all cursor-pointer",
      style: {
        background: selected ? "rgba(0,191,255,0.08)" : "rgba(255,255,255,0.03)",
        border: selected ? "1.5px solid rgba(0,191,255,0.6)" : "1px solid rgba(255,255,255,0.08)",
        boxShadow: selected ? "0 0 16px rgba(0,191,255,0.18)" : "none"
      },
      "data-ocid": "config.tech.toggle",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-5 h-5 rounded flex items-center justify-center flex-shrink-0",
            style: {
              background: selected ? "#00BFFF" : "rgba(255,255,255,0.07)",
              border: selected ? "none" : "1px solid rgba(255,255,255,0.2)"
            },
            children: selected && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3 h-3 text-black" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "text-sm font-semibold",
              style: { color: selected ? "#00BFFF" : "#E8ECF0" },
              children: label
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs font-bold", style: { color: "#FFD700" }, children: [
            "+",
            fmt(price)
          ] })
        ] })
      ]
    }
  );
}
function CarCustomizationSection({
  onConfigChange
}) {
  const [selections, setSelections] = reactExports.useState(DEFAULT_SELECTIONS);
  const [activePreset, setActivePreset] = reactExports.useState(null);
  const [activeCategory, setActiveCategory] = reactExports.useState("color");
  const [openAccordions, setOpenAccordions] = reactExports.useState(
    /* @__PURE__ */ new Set(["color"])
  );
  const optionsTotal = calcOptionsTotal(selections);
  const subtotal = BASE_PRICE + optionsTotal;
  const tax = subtotal * TAX_RATE;
  const grand = subtotal + tax;
  const perfStats = getPerformanceStats(selections.engine, selections.exhaust);
  const isUnleashed = activePreset === "performance_unleashed";
  const perfAccent = isUnleashed ? "#FF6B00" : "#00BFFF";
  const perfGlow = isUnleashed ? "rgba(255,107,0,0.25)" : "rgba(0,191,255,0.15)";
  reactExports.useEffect(() => {
    const spec = buildSpec(selections, optionsTotal, perfStats);
    onConfigChange(spec, grand);
  }, [selections, optionsTotal, grand, onConfigChange, perfStats]);
  function applyPreset(preset) {
    if (activePreset === preset.id) {
      setActivePreset(null);
      setSelections(DEFAULT_SELECTIONS);
    } else {
      setActivePreset(preset.id);
      setSelections(preset.selections);
    }
  }
  function setRadio(field, value) {
    setActivePreset(null);
    setSelections((prev) => ({ ...prev, [field]: value }));
  }
  function toggleTech(name) {
    setActivePreset(null);
    setSelections((prev) => ({
      ...prev,
      tech: prev.tech.includes(name) ? prev.tech.filter((t) => t !== name) : [...prev.tech, name]
    }));
  }
  function toggleAccordion(id) {
    setOpenAccordions((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }
  function scrollToBooking() {
    var _a;
    (_a = document.getElementById("book-test-drive")) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
  }
  function handleReset() {
    setSelections(DEFAULT_SELECTIONS);
    setActivePreset(null);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      id: "car-configurator",
      className: "relative py-28 overflow-hidden",
      style: { backgroundColor: "#0B0F14" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden",
            style: { opacity: 0.022 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "font-black uppercase tracking-widest whitespace-nowrap",
                style: { fontSize: "clamp(50px, 14vw, 180px)", color: "#00BFFF" },
                children: "CONFIGURE"
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] rounded-full pointer-events-none",
            style: {
              background: "radial-gradient(ellipse, rgba(0,191,255,0.06) 0%, transparent 70%)",
              filter: "blur(60px)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 max-w-7xl mx-auto px-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 40 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true, amount: 0.3 },
              transition: { duration: 0.8, ease: "easeOut" },
              className: "text-center mb-16",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs font-semibold tracking-[0.45em] uppercase mb-3",
                    style: { color: "#00BFFF" },
                    children: "Personalize Your Legend"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h2",
                  {
                    className: "font-black uppercase leading-none",
                    style: {
                      fontSize: "clamp(2rem, 6vw, 4rem)",
                      background: "linear-gradient(135deg, #FFFFFF 0%, #00BFFF 55%, #FFFFFF 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text"
                    },
                    children: "Configure Your M5 CS"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "mt-4 text-sm tracking-wide",
                    style: { color: "rgba(255,255,255,0.4)" },
                    children: "Build your perfect machine — every option, every detail"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "mx-auto mt-4 h-[2px] w-24 rounded-full",
                    style: {
                      background: "linear-gradient(90deg, transparent, #00BFFF, transparent)"
                    }
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 30 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true, amount: 0.2 },
              transition: { duration: 0.7, ease: "easeOut" },
              className: "mb-16",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "p",
                  {
                    className: "text-xs font-bold tracking-[0.35em] uppercase mb-6 flex items-center gap-2",
                    style: { color: "rgba(255,255,255,0.4)" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3.5 h-3.5", style: { color: "#FFD700" } }),
                      "Special Packages"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5", children: PRESETS.map((preset, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.button,
                  {
                    type: "button",
                    initial: { opacity: 0, y: 30 },
                    whileInView: { opacity: 1, y: 0 },
                    viewport: { once: true },
                    transition: { duration: 0.5, delay: i * 0.1 },
                    whileHover: { scale: 1.03, y: -4 },
                    whileTap: { scale: 0.97 },
                    onClick: () => applyPreset(preset),
                    className: "relative flex flex-col gap-3 rounded-2xl p-6 text-left cursor-pointer overflow-hidden",
                    style: {
                      background: activePreset === preset.id ? "linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 100%)" : "rgba(255,255,255,0.03)",
                      border: activePreset === preset.id ? `1.5px solid ${preset.accent}` : "1px solid rgba(255,255,255,0.08)",
                      boxShadow: activePreset === preset.id ? `0 0 30px ${preset.glow}, 0 0 60px ${preset.glow.replace("0.35", "0.15")}` : "none",
                      backdropFilter: "blur(20px)"
                    },
                    "data-ocid": "config.preset.button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "absolute inset-0 pointer-events-none",
                          style: {
                            background: `radial-gradient(ellipse at 50% 0%, ${preset.glow.replace("0.35", "0.12")} 0%, transparent 70%)`
                          }
                        }
                      ),
                      activePreset === preset.id && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        motion.div,
                        {
                          initial: { scale: 0 },
                          animate: { scale: 1 },
                          className: "absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center",
                          style: { background: preset.accent },
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5 text-black" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "text-3xl leading-none",
                          style: { color: preset.accent },
                          children: preset.icon
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "font-black text-base uppercase tracking-wide",
                            style: { color: preset.accent },
                            children: preset.name
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "text-xs mt-0.5",
                            style: { color: "rgba(255,255,255,0.4)" },
                            children: preset.tagline
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "mt-auto pt-3 border-t",
                          style: { borderColor: "rgba(255,255,255,0.08)" },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "div",
                              {
                                className: "text-xl font-black",
                                style: { color: preset.accent },
                                children: [
                                  "+",
                                  fmt(preset.price)
                                ]
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                className: "text-[10px] tracking-widest uppercase mt-0.5",
                                style: { color: "rgba(255,255,255,0.3)" },
                                children: "Package add-on"
                              }
                            )
                          ]
                        }
                      )
                    ]
                  },
                  preset.id
                )) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col xl:flex-row gap-10 items-start", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:flex flex-wrap gap-2 mb-8", children: CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setActiveCategory(cat.id),
                  className: "px-4 py-2 rounded-full text-xs font-bold tracking-wide uppercase transition-all",
                  style: {
                    background: activeCategory === cat.id ? "rgba(0,191,255,0.18)" : "rgba(255,255,255,0.04)",
                    border: activeCategory === cat.id ? "1px solid rgba(0,191,255,0.6)" : "1px solid rgba(255,255,255,0.08)",
                    color: activeCategory === cat.id ? "#00BFFF" : "rgba(255,255,255,0.5)",
                    boxShadow: activeCategory === cat.id ? "0 0 16px rgba(0,191,255,0.2)" : "none"
                  },
                  "data-ocid": "config.category.tab",
                  children: [
                    cat.emoji,
                    " ",
                    cat.label
                  ]
                },
                cat.id
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:block", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                CategoryPanel,
                {
                  categoryId: activeCategory,
                  selections,
                  setRadio,
                  toggleTech
                },
                activeCategory
              ) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:hidden flex flex-col gap-3", children: CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "rounded-xl overflow-hidden",
                  style: { border: "1px solid rgba(255,255,255,0.08)" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        onClick: () => toggleAccordion(cat.id),
                        className: "w-full flex items-center justify-between px-5 py-4 text-left",
                        style: { background: "rgba(255,255,255,0.03)" },
                        "data-ocid": "config.accordion.button",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "span",
                            {
                              className: "text-sm font-bold tracking-wide",
                              style: {
                                color: openAccordions.has(cat.id) ? "#00BFFF" : "#E8ECF0"
                              },
                              children: [
                                cat.emoji,
                                " ",
                                cat.label
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            motion.span,
                            {
                              animate: { rotate: openAccordions.has(cat.id) ? 180 : 0 },
                              transition: { duration: 0.25 },
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                                ChevronDown,
                                {
                                  className: "w-4 h-4",
                                  style: { color: "rgba(255,255,255,0.5)" }
                                }
                              )
                            }
                          )
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: openAccordions.has(cat.id) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.div,
                      {
                        initial: { height: 0, opacity: 0 },
                        animate: { height: "auto", opacity: 1 },
                        exit: { height: 0, opacity: 0 },
                        transition: { duration: 0.3 },
                        className: "overflow-hidden",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          CategoryPanel,
                          {
                            categoryId: cat.id,
                            selections,
                            setRadio,
                            toggleTech
                          }
                        ) })
                      }
                    ) })
                  ]
                },
                cat.id
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "xl:sticky xl:top-24 w-full xl:w-[360px] flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, x: 30 },
                whileInView: { opacity: 1, x: 0 },
                viewport: { once: true },
                transition: { duration: 0.7, ease: "easeOut" },
                className: "rounded-2xl p-7",
                style: {
                  background: "rgba(0,191,255,0.04)",
                  border: "1px solid rgba(0,191,255,0.2)",
                  backdropFilter: "blur(24px)",
                  boxShadow: "0 0 50px rgba(0,191,255,0.1), 0 30px 60px rgba(0,0,0,0.5)"
                },
                "data-ocid": "config.panel",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-6", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4", style: { color: "#00BFFF" } }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "text-xs font-black uppercase tracking-[0.3em]",
                        style: { color: "#00BFFF" },
                        children: "Build Summary"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(PriceLine, { label: "Base Price", value: BASE_PRICE, dimColor: true }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      PriceLine,
                      {
                        label: "Options Total",
                        value: optionsTotal,
                        highlight: optionsTotal > 0
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "h-px my-1",
                        style: {
                          background: "linear-gradient(90deg, transparent, rgba(0,191,255,0.3), transparent)"
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(PriceLine, { label: "Subtotal", value: subtotal }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(PriceLine, { label: "Tax (10%)", value: tax, dimColor: true }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "h-px my-1",
                        style: {
                          background: "linear-gradient(90deg, transparent, rgba(0,191,255,0.5), transparent)"
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between mt-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "text-xs font-black uppercase tracking-[0.25em]",
                          style: { color: "rgba(255,255,255,0.6)" },
                          children: "Grand Total"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "text-2xl font-black",
                          style: {
                            background: "linear-gradient(135deg, #FFFFFF 0%, #00BFFF 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text"
                          },
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedPrice, { value: grand })
                        }
                      )
                    ] })
                  ] }),
                  optionsTotal > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.div,
                    {
                      initial: { opacity: 0, height: 0 },
                      animate: { opacity: 1, height: "auto" },
                      className: "mt-5 pt-5 overflow-hidden",
                      style: { borderTop: "1px solid rgba(255,255,255,0.06)" },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: "text-[10px] uppercase tracking-widest font-bold mb-3",
                            style: { color: "rgba(255,255,255,0.3)" },
                            children: "Selected Options"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "div",
                          {
                            className: "flex flex-col gap-1.5 max-h-52 overflow-y-auto pr-1",
                            style: {
                              scrollbarWidth: "thin",
                              scrollbarColor: "rgba(0,191,255,0.3) transparent"
                            },
                            children: [
                              [
                                { label: "Color", name: selections.color, list: COLORS },
                                {
                                  label: "Engine",
                                  name: selections.engine,
                                  list: ENGINES
                                },
                                {
                                  label: "Wheels",
                                  name: selections.wheels,
                                  list: WHEELS
                                },
                                {
                                  label: "Brakes",
                                  name: selections.brakes,
                                  list: BRAKES
                                },
                                {
                                  label: "Exhaust",
                                  name: selections.exhaust,
                                  list: EXHAUSTS
                                },
                                {
                                  label: "Interior",
                                  name: selections.interior,
                                  list: INTERIORS
                                },
                                {
                                  label: "Carbon",
                                  name: selections.carbon,
                                  list: CARBONS
                                }
                              ].map((row) => {
                                var _a;
                                const price = ((_a = row.list.find((i) => i.name === row.name)) == null ? void 0 : _a.price) ?? 0;
                                if (price === 0) return null;
                                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                  "div",
                                  {
                                    className: "flex justify-between items-start gap-2",
                                    children: [
                                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                                        "span",
                                        {
                                          className: "text-[11px] leading-tight",
                                          style: { color: "rgba(255,255,255,0.5)" },
                                          children: row.name
                                        }
                                      ),
                                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                        "span",
                                        {
                                          className: "text-[11px] font-bold whitespace-nowrap",
                                          style: { color: "#FFD700" },
                                          children: [
                                            "+",
                                            fmt(price)
                                          ]
                                        }
                                      )
                                    ]
                                  },
                                  row.label
                                );
                              }),
                              selections.tech.map((t) => {
                                var _a;
                                const p = ((_a = TECH_OPTIONS.find((o) => o.name === t)) == null ? void 0 : _a.price) ?? 0;
                                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                  "div",
                                  {
                                    className: "flex justify-between items-start gap-2",
                                    children: [
                                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                                        "span",
                                        {
                                          className: "text-[11px] leading-tight",
                                          style: { color: "rgba(255,255,255,0.5)" },
                                          children: t
                                        }
                                      ),
                                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                        "span",
                                        {
                                          className: "text-[11px] font-bold whitespace-nowrap",
                                          style: { color: "#FFD700" },
                                          children: [
                                            "+",
                                            fmt(p)
                                          ]
                                        }
                                      )
                                    ]
                                  },
                                  t
                                );
                              })
                            ]
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.div,
                    {
                      layout: true,
                      className: "mt-5 pt-5 rounded-xl p-4",
                      style: {
                        borderTop: "1px solid rgba(255,255,255,0.06)",
                        background: isUnleashed ? "rgba(255,107,0,0.06)" : "rgba(0,191,255,0.04)",
                        border: `1px solid ${isUnleashed ? "rgba(255,107,0,0.25)" : "rgba(0,191,255,0.15)"}`,
                        boxShadow: `0 0 20px ${perfGlow}`
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "p",
                          {
                            className: "text-[10px] uppercase tracking-widest font-bold mb-4 flex items-center gap-1.5",
                            style: { color: perfAccent },
                            children: [
                              isUnleashed ? "🔥" : "⚡",
                              " Performance Projection"
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            PerfStat,
                            {
                              label: "OUTPUT",
                              value: perfStats.hp,
                              unit: "hp",
                              accent: perfAccent,
                              glow: perfGlow
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            PerfStat,
                            {
                              label: "TORQUE",
                              value: perfStats.torque,
                              unit: "lb-ft",
                              accent: perfAccent,
                              glow: perfGlow
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            PerfStat,
                            {
                              label: "0-60 MPH",
                              value: perfStats.zeroToSixty,
                              unit: "s",
                              accent: perfAccent,
                              glow: perfGlow,
                              decimals: 2
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            PerfStat,
                            {
                              label: "TOP SPEED",
                              value: perfStats.topSpeed,
                              unit: "mph",
                              accent: perfAccent,
                              glow: perfGlow
                            }
                          )
                        ] })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.button,
                    {
                      type: "button",
                      whileHover: { scale: 1.02 },
                      whileTap: { scale: 0.98 },
                      onClick: scrollToBooking,
                      className: "mt-6 w-full py-4 rounded-full font-black text-sm tracking-[0.2em] uppercase transition-all",
                      style: {
                        background: "linear-gradient(135deg, rgba(0,191,255,0.35) 0%, rgba(0,191,255,0.2) 100%)",
                        border: "1px solid rgba(0,191,255,0.6)",
                        color: "#00BFFF",
                        boxShadow: "0 0 30px rgba(0,191,255,0.3)"
                      },
                      "data-ocid": "config.apply_button",
                      children: "Apply to Booking ↓"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.button,
                    {
                      type: "button",
                      whileHover: { scale: 1.01, opacity: 1 },
                      whileTap: { scale: 0.98 },
                      onClick: handleReset,
                      className: "mt-3 w-full py-3 rounded-full font-bold text-xs tracking-[0.2em] uppercase transition-all flex items-center justify-center gap-2",
                      style: {
                        background: "transparent",
                        border: "1px solid rgba(255,255,255,0.15)",
                        color: "rgba(255,255,255,0.4)",
                        opacity: 0.85
                      },
                      "data-ocid": "config.secondary_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-3 h-3" }),
                        "Reset Configuration"
                      ]
                    }
                  )
                ]
              }
            ) })
          ] })
        ] })
      ]
    }
  );
}
function PerfStat({
  label,
  value,
  unit,
  accent,
  glow,
  decimals = 0
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col gap-1 rounded-lg p-3",
      style: {
        background: "rgba(0,0,0,0.3)",
        border: `1px solid ${accent}22`,
        boxShadow: `0 0 12px ${glow}`
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "text-[9px] font-black uppercase tracking-widest",
            style: { color: "rgba(255,255,255,0.35)" },
            children: label
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-xl font-black leading-none tabular-nums",
              style: { color: accent },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedStat, { value, decimals })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-[10px] font-bold",
              style: { color: `${accent}99` },
              children: unit
            }
          )
        ] })
      ]
    }
  );
}
function CategoryPanel({
  categoryId,
  selections,
  setRadio,
  toggleTech
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -12 },
      transition: { duration: 0.25 },
      children: [
        categoryId === "color" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3", children: COLORS.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          OptionCard,
          {
            label: c.name,
            price: c.price,
            selected: selections.color === c.name,
            onClick: () => setRadio("color", c.name),
            swatch: c.swatch
          },
          c.name
        )) }),
        categoryId === "engine" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: ENGINES.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          OptionCard,
          {
            label: e.name,
            price: e.price,
            selected: selections.engine === e.name,
            onClick: () => setRadio("engine", e.name)
          },
          e.name
        )) }),
        categoryId === "wheels" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: WHEELS.map((w) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          OptionCard,
          {
            label: w.name,
            price: w.price,
            selected: selections.wheels === w.name,
            onClick: () => setRadio("wheels", w.name)
          },
          w.name
        )) }),
        categoryId === "brakes" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: BRAKES.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          OptionCard,
          {
            label: b.name,
            price: b.price,
            selected: selections.brakes === b.name,
            onClick: () => setRadio("brakes", b.name)
          },
          b.name
        )) }),
        categoryId === "exhaust" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: EXHAUSTS.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          OptionCard,
          {
            label: e.name,
            price: e.price,
            selected: selections.exhaust === e.name,
            onClick: () => setRadio("exhaust", e.name)
          },
          e.name
        )) }),
        categoryId === "interior" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: INTERIORS.map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          OptionCard,
          {
            label: i.name,
            price: i.price,
            selected: selections.interior === i.name,
            onClick: () => setRadio("interior", i.name)
          },
          i.name
        )) }),
        categoryId === "carbon" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: CARBONS.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          OptionCard,
          {
            label: c.name,
            price: c.price,
            selected: selections.carbon === c.name,
            onClick: () => setRadio("carbon", c.name)
          },
          c.name
        )) }),
        categoryId === "tech" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: TECH_OPTIONS.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          TechCard,
          {
            label: t.name,
            price: t.price,
            selected: selections.tech.includes(t.name),
            onClick: () => toggleTech(t.name)
          },
          t.name
        )) })
      ]
    }
  );
}
function PriceLine({
  label,
  value,
  dimColor,
  highlight
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: "text-xs font-semibold uppercase tracking-wide",
        style: {
          color: dimColor ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.6)"
        },
        children: label
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: "text-sm font-black",
        style: {
          color: highlight ? "#FFD700" : dimColor ? "rgba(255,255,255,0.4)" : "#E8ECF0"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedPrice, { value })
      }
    )
  ] });
}
export {
  CarCustomizationSection as default
};
