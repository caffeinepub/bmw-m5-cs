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
      itemScope
      itemType="https://schema.org/WPFooter"
      aria-label="BMW M5 CS footer – specifications, developer info, and site links"
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
          <div itemScope itemType="https://schema.org/Organization">
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold font-rajdhani text-base"
                style={{ border: "1.5px solid #20E0E6", color: "#20E0E6" }}
                aria-hidden="true"
              >
                M
              </div>
              <span
                className="font-rajdhani font-bold text-xl tracking-[0.15em]"
                style={{ color: "#F2F5F7" }}
                itemProp="name"
              >
                BMW M5 CS
              </span>
            </div>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "#7C8796" }}
              itemProp="description"
            >
              The pinnacle of M engineering. Where motorsport meets luxury.
              Built for those who demand the absolute best. Book your BMW test
              drive and experience 627 HP of pure BMW M performance.
            </p>
            {/* SEO keyword tags – visually hidden, crawlable */}
            <div className="sr-only" aria-hidden="true">
              <span>BMW M5 CS</span>
              <span>BMW booking</span>
              <span>BMW test drive</span>
              <span>BMW M5 CS price</span>
              <span>BMW performance car</span>
              <span>BMW luxury sedan</span>
              <span>BMW M5 CS 627HP</span>
              <span>BMW M5 CS specs</span>
              <span>BMW M5 CS 0-60</span>
              <span>BMW M5 CS top speed</span>
              <span>book BMW test drive</span>
              <span>BMW M5 CS customization</span>
              <span>BMW M5 CS modifications</span>
              <span>BMW M5 CS review</span>
              <span>BMW M5 CS horsepower</span>
              <span>BMW M5 CS engine</span>
              <span>BMW M5 CS competition</span>
              <span>BMW ultimate driving machine</span>
              <span>BMW M series</span>
              <span>BMW M GmbH</span>
              <span>BMW M5 CS 2024</span>
              <span>S63 V8 BMW</span>
              <span>BMW M5 CS carbon fiber</span>
              <span>BMW M5 CS exhaust upgrade</span>
              <span>BMW M5 CS turbo</span>
              <span>BMW M5 CS wheels</span>
              <span>BMW M5 CS interior</span>
              <span>BMW M5 CS exterior</span>
              <span>BMW M5 CS for sale</span>
              <span>buy BMW M5 CS</span>
              <span>BMW car booking online</span>
              <span>BMW M5 CS launch control</span>
              <span>BMW M5 CS drag race</span>
              <span>BMW M5 CS burnout</span>
              <span>BMW M5 CS track day</span>
              <span>BMW M5 CS gold edition</span>
              <span>BMW M5 CS diamond edition</span>
              <span>BMW M5 CS racing edition</span>
              <span>BMW M5 CS stealth edition</span>
              <span>BMW M5 CS performance unleashed</span>
            </div>
          </div>

          {/* Specs */}
          <div
            itemScope
            itemType="https://schema.org/Car"
            aria-label="BMW M5 CS key specifications"
          >
            <h2
              className="font-rajdhani font-bold text-sm tracking-[0.3em] mb-6"
              style={{ color: "#20E0E6" }}
            >
              BMW M5 CS KEY SPECIFICATIONS
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Power", value: "627 HP", prop: "enginePower" },
                { label: "Torque", value: "750 Nm", prop: "torque" },
                { label: "0–100", value: "3.0 sec", prop: "speed" },
                { label: "Top Speed", value: "305 km/h", prop: "speed" },
                { label: "Engine", value: "S63 V8", prop: "vehicleEngine" },
                { label: "Weight", value: "1,510 kg", prop: "weight" },
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
                    itemProp={s.prop}
                  >
                    {s.value}
                  </div>
                </div>
              ))}
            </div>
            {/* Additional SEO keywords */}
            <div className="mt-4 text-xs" style={{ color: "#4a5060" }}>
              <p>
                BMW M5 CS – S63 Twin-Turbo V8 – M xDrive AWD – 8-speed M
                Steptronic
              </p>
              <p>Book BMW test drive – BMW M5 CS booking available online</p>
            </div>
          </div>

          {/* Developer */}
          <div aria-label="Site developer information">
            <h3
              className="font-rajdhani font-bold text-sm tracking-[0.3em] mb-6"
              style={{ color: "#20E0E6" }}
            >
              DEVELOPED BY
            </h3>
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
              aria-label="Visit Ishant Vishnu Padole on Instagram"
            >
              <SiInstagram size={16} aria-hidden="true" />
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
            documentation. BMW, M5, M5 CS are registered trademarks of BMW AG.
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
