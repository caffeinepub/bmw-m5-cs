import { motion } from "motion/react";
import { SiInstagram } from "react-icons/si";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        backgroundColor: "#080b10",
        borderTop: "1px solid rgba(32,224,230,0.2)",
      }}
    >
      {/* Top neon line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, #20E0E6, transparent)",
          boxShadow: "0 0 20px rgba(32,224,230,0.4)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold font-rajdhani text-base"
                style={{ border: "1.5px solid #20E0E6", color: "#20E0E6" }}
              >
                M
              </div>
              <span
                className="font-rajdhani font-bold text-xl tracking-[0.15em]"
                style={{ color: "#F2F5F7" }}
              >
                BMW M5 CS
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "#7C8796" }}>
              The pinnacle of M engineering. Where motorsport meets luxury.
              Built for those who demand the absolute best.
            </p>
          </div>

          {/* Specs */}
          <div>
            <h4
              className="font-rajdhani font-bold text-sm tracking-[0.3em] mb-6"
              style={{ color: "#20E0E6" }}
            >
              KEY SPECIFICATIONS
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Power", value: "627 HP" },
                { label: "Torque", value: "750 Nm" },
                { label: "0–100", value: "3.0 sec" },
                { label: "Top Speed", value: "305 km/h" },
                { label: "Engine", value: "S63 V8" },
                { label: "Weight", value: "1,510 kg" },
              ].map((s) => (
                <div key={s.label}>
                  <div
                    className="text-xs tracking-wider"
                    style={{ color: "#7C8796" }}
                  >
                    {s.label}
                  </div>
                  <div
                    className="font-rajdhani font-semibold text-sm"
                    style={{ color: "#F2F5F7" }}
                  >
                    {s.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Developer */}
          <div>
            <h4
              className="font-rajdhani font-bold text-sm tracking-[0.3em] mb-6"
              style={{ color: "#20E0E6" }}
            >
              DEVELOPED BY
            </h4>
            <p
              className="font-rajdhani font-bold text-xl mb-4"
              style={{ color: "#F2F5F7" }}
            >
              ISHANT VISHNU PADOLE
            </p>
            <motion.a
              href="https://www.instagram.com/ishant_padole/?utm_source=ig_web_button_share_sheet"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300"
              style={{
                background:
                  "linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)",
                color: "#fff",
                boxShadow: "0 4px 15px rgba(253,29,29,0.3)",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <SiInstagram size={16} />
              @ishant_padole
            </motion.a>
          </div>
        </div>

        {/* Divider */}
        <div
          className="h-px mb-8"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(32,224,230,0.15), transparent)",
          }}
        />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs tracking-wider" style={{ color: "#7C8796" }}>
            © {year} BMW M5 CS. All performance specs from official BMW M GmbH
            documentation.
          </p>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-wider transition-colors duration-200 hover:opacity-80"
            style={{ color: "#7C8796" }}
          >
            Built with ❤️ using{" "}
            <span style={{ color: "#20E0E6" }}>caffeine.ai</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
