import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

// ─── Helpers ──────────────────────────────────────────────────────────────────
function WireEdges({
  geometry,
  color = "#00f5ff",
}: { geometry: THREE.BufferGeometry; color?: string }) {
  const edgesGeo = useMemo(
    () => new THREE.EdgesGeometry(geometry, 15),
    [geometry],
  );
  return (
    <lineSegments geometry={edgesGeo}>
      <lineBasicMaterial color={color} />
    </lineSegments>
  );
}

function WireBox({
  args,
  position,
  rotation,
  color = "#00f5ff",
}: {
  args: [number, number, number];
  position?: [number, number, number];
  rotation?: [number, number, number];
  color?: string;
}) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const geo = useMemo(
    () => new THREE.BoxGeometry(...args),
    [args[0], args[1], args[2]],
  );
  const euler = rotation ? new THREE.Euler(...rotation) : undefined;
  return (
    <group position={position} rotation={euler}>
      <WireEdges geometry={geo} color={color} />
    </group>
  );
}

function WireCylinder({
  args,
  position,
  rotation,
  color = "#00f5ff",
}: {
  args: [number, number, number, number];
  position?: [number, number, number];
  rotation?: [number, number, number];
  color?: string;
}) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const geo = useMemo(
    () => new THREE.CylinderGeometry(...args),
    [args[0], args[1], args[2], args[3]],
  );
  const euler = rotation ? new THREE.Euler(...rotation) : undefined;
  return (
    <group position={position} rotation={euler}>
      <WireEdges geometry={geo} color={color} />
    </group>
  );
}

function WireWheel({ position }: { position: [number, number, number] }) {
  const CYAN = "#00f5ff";
  return (
    <group position={position}>
      <WireCylinder
        args={[0.36, 0.36, 0.26, 20]}
        rotation={[0, 0, Math.PI / 2]}
        color={CYAN}
      />
      <WireCylinder
        args={[0.22, 0.22, 0.28, 12]}
        rotation={[0, 0, Math.PI / 2]}
        color={CYAN}
      />
      {[0, 1, 2, 3, 4].map((i) => (
        <group key={i} rotation={[0, 0, (i * Math.PI * 2) / 5]}>
          <WireBox args={[0.36, 0.025, 0.025]} color={CYAN} />
        </group>
      ))}
      <WireCylinder
        args={[0.065, 0.065, 0.29, 8]}
        rotation={[0, 0, Math.PI / 2]}
        color={CYAN}
      />
    </group>
  );
}

function UnderglowRing() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (meshRef.current) {
      (meshRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.3 + Math.sin(clock.getElapsedTime() * 1.8) * 0.22;
    }
  });
  const geo = useMemo(() => new THREE.TorusGeometry(2.15, 0.022, 8, 80), []);
  return (
    <mesh
      ref={meshRef}
      geometry={geo}
      position={[0, -0.72, 0]}
      rotation={[Math.PI / 2, 0, 0]}
    >
      <meshBasicMaterial color="#00f5ff" transparent opacity={0.45} />
    </mesh>
  );
}

function ParticleField() {
  const COUNT = 180;
  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const r = 3.8 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.cos(phi) * 0.45;
      arr[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    return arr;
  }, []);
  const pointsRef = useRef<THREE.Points>(null);
  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.04;
      pointsRef.current.rotation.x =
        Math.sin(clock.getElapsedTime() * 0.1) * 0.05;
    }
  });
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, [positions]);
  return (
    <points ref={pointsRef} geometry={geo}>
      <pointsMaterial
        color="#00f5ff"
        size={0.028}
        sizeAttenuation
        transparent
        opacity={0.65}
      />
    </points>
  );
}

function HolographicBMW() {
  const groupRef = useRef<THREE.Group>(null);
  const [mounted, setMounted] = useState(false);
  const CYAN = "#00f5ff";
  const RED = "#ff2244";
  const WHITE = "#e8f8ff";
  const DIM_CYAN = "#007a8a";

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 200);
    return () => clearTimeout(t);
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.22;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.25, 0]} scale={mounted ? 1 : 0}>
      {/* ── Body ── */}
      {/* Lower body sill */}
      <WireBox
        args={[4.2, 0.18, 1.72]}
        position={[0, -0.28, 0]}
        color={DIM_CYAN}
      />
      {/* Main lower body */}
      <WireBox args={[3.8, 0.44, 1.72]} position={[0, -0.06, 0]} color={CYAN} />
      {/* Upper cabin */}
      <WireBox
        args={[2.1, 0.46, 1.58]}
        position={[0.08, 0.38, 0]}
        color={CYAN}
      />
      {/* Roof */}
      <WireBox
        args={[1.6, 0.08, 1.52]}
        position={[0.08, 0.62, 0]}
        color={DIM_CYAN}
      />
      {/* Hood — angled */}
      <WireBox
        args={[1.2, 0.07, 1.68]}
        position={[1.14, 0.14, 0]}
        rotation={[0, 0, -0.22]}
        color={CYAN}
      />
      {/* Hood front drop */}
      <WireBox
        args={[0.28, 0.22, 1.68]}
        position={[1.73, -0.04, 0]}
        color={CYAN}
      />
      {/* Trunk lid */}
      <WireBox
        args={[0.9, 0.07, 1.65]}
        position={[-1.05, 0.14, 0]}
        rotation={[0, 0, 0.14]}
        color={CYAN}
      />
      {/* Rear deck */}
      <WireBox
        args={[0.3, 0.18, 1.65]}
        position={[-1.72, 0.05, 0]}
        color={CYAN}
      />

      {/* ── Front Fascia ── */}
      {/* Front bumper lower */}
      <WireBox
        args={[0.15, 0.24, 1.78]}
        position={[1.93, -0.25, 0]}
        color={CYAN}
      />
      {/* Splitter */}
      <WireBox
        args={[0.22, 0.05, 1.72]}
        position={[2.04, -0.38, 0]}
        color={RED}
      />
      {/* Twin kidney grille left */}
      <WireBox
        args={[0.14, 0.28, 0.34]}
        position={[1.93, -0.02, 0.3]}
        color={RED}
      />
      {/* Twin kidney grille right */}
      <WireBox
        args={[0.14, 0.28, 0.34]}
        position={[1.93, -0.02, -0.3]}
        color={RED}
      />
      {/* Grille bridge */}
      <WireBox
        args={[0.06, 0.3, 0.08]}
        position={[1.93, -0.02, 0]}
        color={RED}
      />

      {/* ── Headlights ── */}
      {/* Left upper */}
      <WireBox
        args={[0.1, 0.1, 0.32]}
        position={[1.9, 0.17, 0.7]}
        color={WHITE}
      />
      {/* Left lower DRL */}
      <WireBox
        args={[0.08, 0.07, 0.28]}
        position={[1.9, 0.04, 0.7]}
        color={WHITE}
      />
      {/* Right upper */}
      <WireBox
        args={[0.1, 0.1, 0.32]}
        position={[1.9, 0.17, -0.7]}
        color={WHITE}
      />
      {/* Right lower DRL */}
      <WireBox
        args={[0.08, 0.07, 0.28]}
        position={[1.9, 0.04, -0.7]}
        color={WHITE}
      />

      {/* ── Rear ── */}
      {/* Rear bumper */}
      <WireBox
        args={[0.15, 0.26, 1.78]}
        position={[-1.93, -0.22, 0]}
        color={CYAN}
      />
      {/* M diffuser */}
      <WireBox
        args={[0.2, 0.1, 1.72]}
        position={[-2.05, -0.36, 0]}
        color={RED}
      />
      {/* Taillights left */}
      <WireBox
        args={[0.08, 0.12, 0.45]}
        position={[-1.9, 0.1, 0.66]}
        color={RED}
      />
      {/* Taillights right */}
      <WireBox
        args={[0.08, 0.12, 0.45]}
        position={[-1.9, 0.1, -0.66]}
        color={RED}
      />
      {/* Taillight center bar */}
      <WireBox
        args={[0.08, 0.04, 0.9]}
        position={[-1.9, 0.1, 0]}
        color={`${RED}88`}
      />

      {/* ── Quad Exhausts ── */}
      {([0.52, 0.3, -0.3, -0.52] as number[]).map((z) => (
        <WireCylinder
          key={`ex-${z}`}
          args={[0.065, 0.065, 0.1, 10]}
          position={[-1.99, -0.31, z]}
          rotation={[0, 0, Math.PI / 2]}
          color={RED}
        />
      ))}

      {/* ── Wheels ── */}
      <WireWheel position={[1.18, -0.46, 0.98]} />
      <WireWheel position={[1.18, -0.46, -0.98]} />
      <WireWheel position={[-1.18, -0.46, 0.98]} />
      <WireWheel position={[-1.18, -0.46, -0.98]} />

      {/* Wheel arches — subtle */}
      {([1.18, -1.18] as number[]).map((x) =>
        ([0.98, -0.98] as number[]).map((z) => (
          <WireCylinder
            key={`arch-${x}-${z}`}
            args={[0.52, 0.52, 0.04, 18]}
            position={[x, -0.46, z]}
            rotation={[0, 0, Math.PI / 2]}
            color={DIM_CYAN}
          />
        )),
      )}

      {/* ── Roof antenna ── */}
      <WireBox
        args={[0.035, 0.2, 0.035]}
        position={[0.25, 0.72, 0]}
        color={CYAN}
      />

      {/* Side mirrors */}
      <WireBox
        args={[0.14, 0.1, 0.06]}
        position={[0.85, 0.34, 0.9]}
        color={DIM_CYAN}
      />
      <WireBox
        args={[0.14, 0.1, 0.06]}
        position={[0.85, 0.34, -0.9]}
        color={DIM_CYAN}
      />

      {/* Door handles */}
      <WireBox
        args={[0.22, 0.04, 0.04]}
        position={[0.2, 0.08, 0.92]}
        color={DIM_CYAN}
      />
      <WireBox
        args={[0.22, 0.04, 0.04]}
        position={[-0.4, 0.08, 0.92]}
        color={DIM_CYAN}
      />
      <WireBox
        args={[0.22, 0.04, 0.04]}
        position={[0.2, 0.08, -0.92]}
        color={DIM_CYAN}
      />
      <WireBox
        args={[0.22, 0.04, 0.04]}
        position={[-0.4, 0.08, -0.92]}
        color={DIM_CYAN}
      />

      {/* M badge front */}
      <WireBox
        args={[0.14, 0.06, 0.06]}
        position={[1.92, 0.0, 0]}
        color={WHITE}
      />

      {/* Underglow ring */}
      <UnderglowRing />
    </group>
  );
}

function GridFloor() {
  return (
    <group position={[0, -0.88, 0]}>
      <gridHelper args={[22, 22, "#00f5ff", "#001a1f"]} />
      {/* Subtle ground plane glow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <planeGeometry args={[22, 22]} />
        <meshBasicMaterial color="#00f5ff" transparent opacity={0.015} />
      </mesh>
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.08} />
      <pointLight
        position={[0, 6, 0]}
        color="#00f5ff"
        intensity={4}
        distance={12}
      />
      <pointLight
        position={[5, 2, -5]}
        color="#ff2244"
        intensity={2.5}
        distance={10}
      />
      <pointLight
        position={[-5, 1, 5]}
        color="#00f5ff"
        intensity={1.5}
        distance={10}
      />
      <GridFloor />
      <ParticleField />
      <HolographicBMW />
    </>
  );
}

// ─── Live HUD data ──────────────────────────────────────────────────────────
const HUD_DATA = [
  { key: "HP", from: 0, to: 627, unit: "HP", decimals: 0 },
  { key: "TORQUE", from: 0, to: 750, unit: "Nm", decimals: 0 },
  { key: "0-100", from: 5.0, to: 3.0, unit: "s", decimals: 1, down: true },
  { key: "TOP", from: 0, to: 305, unit: "km/h", decimals: 0 },
];

function HUDOverlay() {
  const [blink, setBlink] = useState(true);
  const [vals, setVals] = useState(HUD_DATA.map((d) => d.from));
  const [scanY, setScanY] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setBlink((b) => !b), 550);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const start = performance.now();
    const duration = 2800;
    let raf: number;
    const animate = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - (1 - t) ** 3;
      setVals(
        HUD_DATA.map((d) =>
          d.down
            ? d.from - ease * (d.from - d.to)
            : d.from + ease * (d.to - d.from),
        ),
      );
      if (t < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    let raf: number;
    const animate = () => {
      setScanY((prev) => (prev >= 100 ? 0 : prev + 0.3));
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      className="absolute inset-0 pointer-events-none font-mono"
      style={{ zIndex: 10 }}
    >
      {/* Corner brackets */}
      {(
        [
          { id: "tl", top: 3, left: 3, borderTop: true, borderLeft: true },
          { id: "tr", top: 3, right: 3, borderTop: true, borderRight: true },
          {
            id: "bl",
            bottom: 3,
            left: 3,
            borderBottom: true,
            borderLeft: true,
          },
          {
            id: "br",
            bottom: 3,
            right: 3,
            borderBottom: true,
            borderRight: true,
          },
        ] as Array<Record<string, unknown>>
      ).map((c) => (
        <div
          key={c.id as string}
          className="absolute"
          style={{
            width: 28,
            height: 28,
            top: c.top as number | undefined,
            left: c.left as number | undefined,
            right: c.right as number | undefined,
            bottom: c.bottom as number | undefined,
            borderTop: c.borderTop ? "1.5px solid #00f5ff" : undefined,
            borderLeft: c.borderLeft ? "1.5px solid #00f5ff" : undefined,
            borderRight: c.borderRight ? "1.5px solid #00f5ff" : undefined,
            borderBottom: c.borderBottom ? "1.5px solid #00f5ff" : undefined,
          }}
        />
      ))}

      {/* Top-left */}
      <div
        className="absolute top-4 left-10"
        style={{
          background: "rgba(0,8,14,0.65)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(0,245,255,0.2)",
          padding: "6px 12px",
          borderRadius: 4,
        }}
      >
        <div className="text-xs tracking-widest" style={{ color: "#00f5ff" }}>
          BMW M5 CS
        </div>
        <div
          className="text-xs tracking-widest mt-0.5"
          style={{ color: "rgba(0,245,255,0.55)" }}
        >
          HOLOGRAPHIC SCAN
        </div>
        <div
          className="text-xs tracking-widest mt-0.5"
          style={{ color: "rgba(0,245,255,0.35)" }}
        >
          [M DIVISION — 2024]
        </div>
      </div>

      {/* Top-right */}
      <div
        className="absolute top-4 right-10 text-right"
        style={{
          background: "rgba(0,8,14,0.65)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(0,245,255,0.2)",
          padding: "6px 12px",
          borderRadius: 4,
        }}
      >
        <div className="text-xs tracking-widest" style={{ color: "#00f5ff" }}>
          SCAN: 100%
          <span style={{ opacity: blink ? 1 : 0, marginLeft: 2 }}>▌</span>
        </div>
        <div
          className="text-xs tracking-widest mt-0.5"
          style={{ color: "rgba(0,245,255,0.5)" }}
        >
          STATUS: ACTIVE
        </div>
        <div
          className="text-xs tracking-widest mt-0.5"
          style={{ color: "rgba(0,245,255,0.35)" }}
        >
          NODES: 2,048
        </div>
      </div>

      {/* Live data bar — bottom left */}
      <div
        className="absolute bottom-10 left-10 flex gap-5"
        style={{
          background: "rgba(0,8,14,0.65)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,34,68,0.22)",
          padding: "6px 14px",
          borderRadius: 4,
        }}
      >
        {HUD_DATA.map((d, i) => (
          <div key={d.key} className="text-center">
            <div
              className="text-xs tracking-widest"
              style={{ color: "rgba(255,34,68,0.5)" }}
            >
              {d.key}
            </div>
            <div
              className="text-sm font-bold tracking-wider"
              style={{ color: "#ff2244" }}
            >
              {d.decimals === 0
                ? Math.round(vals[i])
                : vals[i].toFixed(d.decimals)}
              <span
                className="text-xs ml-0.5"
                style={{ color: "rgba(255,34,68,0.6)" }}
              >
                {d.unit}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom-right hint */}
      <div
        className="absolute bottom-10 right-10 text-right text-xs tracking-widest"
        style={{ color: "rgba(0,245,255,0.4)" }}
      >
        DRAG · ROTATE &nbsp;|&nbsp; SCROLL · ZOOM
      </div>

      {/* Scanline sweep */}
      <div
        style={{
          position: "absolute",
          top: `${scanY}%`,
          left: 0,
          right: 0,
          height: 2,
          background:
            "linear-gradient(90deg, transparent 0%, #00f5ff 40%, #00f5ff 60%, transparent 100%)",
          opacity: 0.18,
          pointerEvents: "none",
        }}
      />

      {/* Secondary faint scanline */}
      <div
        style={{
          position: "absolute",
          top: `${(scanY + 15) % 100}%`,
          left: 0,
          right: 0,
          height: 1,
          background:
            "linear-gradient(90deg, transparent 0%, #00f5ff 50%, transparent 100%)",
          opacity: 0.07,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

export default function ThreeDSection() {
  return (
    <section
      id="viewer"
      className="relative py-20 overflow-hidden"
      style={{ backgroundColor: "#09090F", minHeight: "100vh" }}
    >
      {/* Background radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          width: 800,
          height: 800,
          background:
            "radial-gradient(circle, rgba(0,245,255,0.065) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 pointer-events-none"
        style={{
          width: 500,
          height: 500,
          background:
            "radial-gradient(circle, rgba(255,34,68,0.04) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <div
              className="h-px flex-1 max-w-16"
              style={{
                background: "linear-gradient(90deg, transparent, #00f5ff)",
              }}
            />
            <span
              className="text-xs tracking-[0.4em] font-semibold font-mono eyebrow-dot eyebrow-dot-cyan"
              style={{ color: "#00f5ff" }}
            >
              EXPERIENCE
            </span>
            <div
              className="h-px flex-1 max-w-16"
              style={{
                background: "linear-gradient(90deg, #00f5ff, transparent)",
              }}
            />
          </div>
          <h2
            className="font-rajdhani font-bold text-5xl md:text-6xl tracking-wider"
            style={{ color: "#F2F5F7" }}
          >
            3D PROTOTYPE VIEWER
          </h2>
          <p
            className="mt-3 text-sm tracking-[0.2em] uppercase font-mono"
            style={{ color: "rgba(0,245,255,0.6)" }}
          >
            BMW M5 CS · HOLOGRAPHIC SCAN PROTOTYPE
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative rounded-xl overflow-hidden"
          style={{
            height: "68vh",
            border: "1px solid rgba(0,245,255,0.22)",
            boxShadow:
              "0 0 80px rgba(0,245,255,0.1), 0 0 20px rgba(0,245,255,0.07), inset 0 0 60px rgba(0,0,0,0.7)",
          }}
        >
          <Canvas
            camera={{ position: [5, 2.5, 5], fov: 44 }}
            style={{ background: "#09090F" }}
            gl={{ antialias: true }}
          >
            <Scene />
            <OrbitControls
              enablePan={false}
              minDistance={3.5}
              maxDistance={14}
              maxPolarAngle={Math.PI / 2 - 0.04}
              minPolarAngle={0.08}
              autoRotate={false}
            />
          </Canvas>
          <HUDOverlay />
        </motion.div>

        {/* Spec strip below canvas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5"
        >
          {[
            { label: "ENGINE", value: "S63 V8 Biturbo" },
            { label: "DISPLACEMENT", value: "4,395 cc" },
            { label: "GEARBOX", value: "8-Speed M DCT" },
            { label: "DRIVE", value: "M xDrive AWD" },
          ].map((s) => (
            <div
              key={s.label}
              className="px-4 py-3 rounded-lg text-center"
              style={{
                background: "rgba(0,245,255,0.04)",
                border: "1px solid rgba(0,245,255,0.12)",
              }}
            >
              <div
                className="text-xs tracking-widest mb-1 font-mono"
                style={{ color: "rgba(0,245,255,0.5)" }}
              >
                {s.label}
              </div>
              <div
                className="text-sm font-semibold font-rajdhani tracking-wider"
                style={{ color: "#F2F5F7" }}
              >
                {s.value}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
