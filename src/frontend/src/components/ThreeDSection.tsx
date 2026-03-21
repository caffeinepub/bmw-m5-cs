import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

// ─── Neon Wireframe BMW ────────────────────────────────────────────────────────
function WireEdges({
  geometry,
  color = "#00f5ff",
  lineWidth = 1,
}: {
  geometry: THREE.BufferGeometry;
  color?: string;
  lineWidth?: number;
}) {
  const edgesGeo = useMemo(() => new THREE.EdgesGeometry(geometry), [geometry]);
  return (
    <lineSegments geometry={edgesGeo}>
      <lineBasicMaterial color={color} linewidth={lineWidth} />
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
  const spokePositions = useMemo(
    () =>
      [0, 1, 2, 3, 4].map((i) => ({
        rotation: [0, 0, (i * Math.PI * 2) / 5] as [number, number, number],
      })),
    [],
  );
  return (
    <group position={position}>
      {/* Tire outer */}
      <WireCylinder
        args={[0.38, 0.38, 0.28, 16]}
        rotation={[0, 0, Math.PI / 2]}
        color={CYAN}
      />
      {/* Rim */}
      <WireCylinder
        args={[0.22, 0.22, 0.3, 12]}
        rotation={[0, 0, Math.PI / 2]}
        color={CYAN}
      />
      {/* Spokes */}
      {spokePositions.map((s) => (
        <group key={`spoke-${s.rotation[2].toFixed(4)}`} rotation={s.rotation}>
          <WireBox args={[0.38, 0.03, 0.03]} color={CYAN} />
        </group>
      ))}
    </group>
  );
}

function UnderglowRing() {
  const meshRef =
    useRef<THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>>(null);
  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.getElapsedTime();
      (meshRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.35 + Math.sin(t * 1.5) * 0.25;
    }
  });
  const geo = useMemo(() => new THREE.TorusGeometry(2.1, 0.025, 8, 80), []);
  return (
    <mesh
      ref={meshRef}
      geometry={geo}
      position={[0, -0.72, 0]}
      rotation={[Math.PI / 2, 0, 0]}
    >
      <meshBasicMaterial color="#00f5ff" transparent opacity={0.5} />
    </mesh>
  );
}

function ParticleField() {
  const COUNT = 120;
  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const r = 3.5 + Math.random() * 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.cos(phi) * 0.5;
      arr[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    return arr;
  }, []);
  const pointsRef = useRef<THREE.Points>(null);
  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.05;
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
        size={0.03}
        sizeAttenuation
        transparent
        opacity={0.7}
      />
    </points>
  );
}

function HolographicBMW() {
  const groupRef = useRef<THREE.Group>(null);
  const CYAN = "#00f5ff";
  const RED = "#ff2244";
  const WHITE = "#e0f8ff";

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.3, 0]}>
      {/* Main lower body */}
      <WireBox args={[3.6, 0.5, 1.65]} position={[0, -0.1, 0]} color={CYAN} />
      {/* Upper cabin */}
      <WireBox args={[2.0, 0.5, 1.55]} position={[0, 0.42, 0]} color={CYAN} />
      {/* Hood slope */}
      <WireBox
        args={[1.1, 0.08, 1.6]}
        position={[1.1, 0.16, 0]}
        rotation={[0, 0, -0.18]}
        color={CYAN}
      />
      {/* Trunk slope */}
      <WireBox
        args={[1.1, 0.08, 1.6]}
        position={[-1.1, 0.16, 0]}
        rotation={[0, 0, 0.18]}
        color={CYAN}
      />
      {/* Front bumper */}
      <WireBox
        args={[0.18, 0.32, 1.7]}
        position={[1.83, -0.22, 0]}
        color={CYAN}
      />
      {/* Rear bumper */}
      <WireBox
        args={[0.18, 0.32, 1.7]}
        position={[-1.83, -0.22, 0]}
        color={CYAN}
      />

      {/* Twin kidney grilles — RED accent */}
      <WireBox
        args={[0.14, 0.24, 0.3]}
        position={[1.84, -0.05, 0.28]}
        color={RED}
      />
      <WireBox
        args={[0.14, 0.24, 0.3]}
        position={[1.84, -0.05, -0.28]}
        color={RED}
      />
      {/* Grille center bridge */}
      <WireBox
        args={[0.06, 0.28, 0.76]}
        position={[1.84, -0.05, 0]}
        color={RED}
      />

      {/* Headlights — left upper/lower */}
      <WireBox
        args={[0.1, 0.1, 0.28]}
        position={[1.82, 0.13, 0.62]}
        color={WHITE}
      />
      <WireBox
        args={[0.1, 0.08, 0.22]}
        position={[1.82, -0.02, 0.62]}
        color={WHITE}
      />
      {/* Headlights — right upper/lower */}
      <WireBox
        args={[0.1, 0.1, 0.28]}
        position={[1.82, 0.13, -0.62]}
        color={WHITE}
      />
      <WireBox
        args={[0.1, 0.08, 0.22]}
        position={[1.82, -0.02, -0.62]}
        color={WHITE}
      />

      {/* Taillights — RED */}
      <WireBox
        args={[0.08, 0.1, 0.35]}
        position={[-1.83, 0.05, 0.58]}
        color={RED}
      />
      <WireBox
        args={[0.08, 0.1, 0.35]}
        position={[-1.83, 0.05, -0.58]}
        color={RED}
      />

      {/* Wheels */}
      <WireWheel position={[1.1, -0.42, 0.95]} />
      <WireWheel position={[1.1, -0.42, -0.95]} />
      <WireWheel position={[-1.1, -0.42, 0.95]} />
      <WireWheel position={[-1.1, -0.42, -0.95]} />

      {/* Quad exhausts */}
      {([0.45, 0.28, -0.28, -0.45] as number[]).map((z) => (
        <WireCylinder
          key={`exhaust-${z}`}
          args={[0.06, 0.06, 0.1, 8]}
          position={[-1.88, -0.3, z]}
          rotation={[0, 0, Math.PI / 2]}
          color={RED}
        />
      ))}

      {/* Roof antenna */}
      <WireBox
        args={[0.04, 0.18, 0.04]}
        position={[0.2, 0.72, 0]}
        color={CYAN}
      />

      {/* Underglow ring */}
      <UnderglowRing />
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight position={[0, 5, 0]} color="#00f5ff" intensity={3} />
      <pointLight position={[4, 2, -4]} color="#ff2244" intensity={2} />
      <gridHelper
        args={[20, 20, "#00f5ff", "#001a1f"]}
        position={[0, -0.95, 0]}
      />
      <ParticleField />
      <HolographicBMW />
    </>
  );
}

// ─── HUD Overlay ──────────────────────────────────────────────────────────────
function HUDOverlay() {
  const [blink, setBlink] = useState(true);
  useEffect(() => {
    const id = setInterval(() => setBlink((b) => !b), 600);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="absolute inset-0 pointer-events-none font-mono"
      style={{ zIndex: 10 }}
    >
      {/* Corner brackets */}
      {/* TL */}
      <div
        className="absolute top-3 left-3"
        style={{
          width: 28,
          height: 28,
          borderTop: "2px solid #00f5ff",
          borderLeft: "2px solid #00f5ff",
        }}
      />
      {/* TR */}
      <div
        className="absolute top-3 right-3"
        style={{
          width: 28,
          height: 28,
          borderTop: "2px solid #00f5ff",
          borderRight: "2px solid #00f5ff",
        }}
      />
      {/* BL */}
      <div
        className="absolute bottom-3 left-3"
        style={{
          width: 28,
          height: 28,
          borderBottom: "2px solid #00f5ff",
          borderLeft: "2px solid #00f5ff",
        }}
      />
      {/* BR */}
      <div
        className="absolute bottom-3 right-3"
        style={{
          width: 28,
          height: 28,
          borderBottom: "2px solid #00f5ff",
          borderRight: "2px solid #00f5ff",
        }}
      />

      {/* Top-left info */}
      <div
        className="absolute top-5 left-10 text-left"
        style={{
          background: "rgba(0,10,15,0.55)",
          backdropFilter: "blur(6px)",
          border: "1px solid rgba(0,245,255,0.2)",
          padding: "6px 10px",
          borderRadius: 4,
        }}
      >
        <div className="text-xs tracking-widest" style={{ color: "#00f5ff" }}>
          BMW M5 CS
        </div>
        <div
          className="text-xs tracking-widest mt-0.5"
          style={{ color: "rgba(0,245,255,0.6)" }}
        >
          PROTOTYPE SCAN
        </div>
        <div
          className="text-xs tracking-widest mt-0.5"
          style={{ color: "rgba(0,245,255,0.4)" }}
        >
          [M DIVISION]
        </div>
      </div>

      {/* Top-right scan progress */}
      <div
        className="absolute top-5 right-10 text-right"
        style={{
          background: "rgba(0,10,15,0.55)",
          backdropFilter: "blur(6px)",
          border: "1px solid rgba(0,245,255,0.2)",
          padding: "6px 10px",
          borderRadius: 4,
        }}
      >
        <div className="text-xs tracking-widest" style={{ color: "#00f5ff" }}>
          SCAN: 100%
          <span
            style={{ opacity: blink ? 1 : 0, marginLeft: 2, color: "#00f5ff" }}
          >
            ▌
          </span>
        </div>
        <div
          className="text-xs tracking-widest mt-0.5"
          style={{ color: "rgba(0,245,255,0.5)" }}
        >
          STATUS: ACTIVE
        </div>
      </div>

      {/* Bottom-left specs */}
      <div
        className="absolute bottom-10 left-10"
        style={{
          background: "rgba(0,10,15,0.55)",
          backdropFilter: "blur(6px)",
          border: "1px solid rgba(255,34,68,0.25)",
          padding: "5px 10px",
          borderRadius: 4,
          display: "flex",
          gap: 12,
        }}
      >
        {["627 HP", "0–100: 3.0s", "V8 BITURBO"].map((tag) => (
          <span
            key={tag}
            className="text-xs tracking-wider"
            style={{ color: "#ff2244" }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Bottom-right hint */}
      <div
        className="absolute bottom-10 right-10 text-right text-xs tracking-widest"
        style={{ color: "rgba(0,245,255,0.45)" }}
      >
        DRAG · ROTATE &nbsp;|&nbsp; SCROLL · ZOOM
      </div>

      {/* Horizontal scanline sweep */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          height: 2,
          background:
            "linear-gradient(90deg, transparent, #00f5ff, transparent)",
          opacity: 0.28,
          animation: "scan-line 4s linear infinite",
        }}
      />
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function ThreeDSection() {
  return (
    <section
      id="viewer"
      className="relative py-20 overflow-hidden"
      style={{ backgroundColor: "#0a0d12", minHeight: "100vh" }}
    >
      {/* Background radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          width: 700,
          height: 700,
          background:
            "radial-gradient(circle, rgba(0,245,255,0.07) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
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
              className="text-xs tracking-[0.4em] font-semibold font-mono"
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
            style={{ color: "rgba(0,245,255,0.65)" }}
          >
            BMW M5 CS · HOLOGRAPHIC SCAN PROTOTYPE
          </p>
        </motion.div>

        {/* Canvas wrapper */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative rounded-lg overflow-hidden"
          style={{
            height: "65vh",
            border: "1px solid rgba(0,245,255,0.25)",
            boxShadow:
              "0 0 60px rgba(0,245,255,0.12), 0 0 20px rgba(0,245,255,0.08), inset 0 0 40px rgba(0,0,0,0.6)",
          }}
        >
          <Canvas
            camera={{ position: [5, 2.5, 5], fov: 45 }}
            style={{ background: "#0a0d12" }}
            gl={{ antialias: true }}
          >
            <Scene />
            <OrbitControls
              enablePan={false}
              minDistance={3}
              maxDistance={14}
              maxPolarAngle={Math.PI / 2 - 0.05}
              minPolarAngle={0.1}
            />
          </Canvas>

          <HUDOverlay />
        </motion.div>
      </div>
    </section>
  );
}
