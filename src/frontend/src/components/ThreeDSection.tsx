import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "motion/react";
import {
  Component,
  type ReactNode,
  Suspense,
  useEffect,
  useRef,
  useState,
} from "react";
import * as THREE from "three";

// Direct raw URL – no redirect, CORS-friendly
const MODEL_URL =
  "https://cdn.jsdelivr.net/gh/ishantpadole96-oss/ISHANT_@main/fff-v1%20(2).glb";

useGLTF.preload(MODEL_URL);

// ─── Error boundary so a failed fetch falls back to holographic viewer ───────
class ModelErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

// ─── Real GLB car model ───────────────────────────────────────────────────────
function CarModel() {
  const { scene } = useGLTF(MODEL_URL);
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 4.5 / maxDim;
    scene.scale.setScalar(scale);
    scene.position.set(
      -center.x * scale,
      -center.y * scale + 0.1,
      -center.z * scale,
    );
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        if (mesh.material) {
          const mat = mesh.material as THREE.MeshStandardMaterial;
          if (mat.isMeshStandardMaterial) mat.envMapIntensity = 1.5;
        }
      }
    });
  }, [scene]);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.2;
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
}

// ─── Holographic fallback (shown while loading OR on error) ──────────────────
function HolographicCar() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = clock.getElapsedTime() * 0.25;
  });

  const neonBlue = "#00aaff";
  const neonRed = "#ff2244";

  return (
    <group ref={groupRef}>
      {/* Body */}
      <mesh position={[0, 0.18, 0]}>
        <boxGeometry args={[3.6, 0.52, 1.55]} />
        <meshBasicMaterial color={neonBlue} wireframe />
      </mesh>
      {/* Cabin */}
      <mesh position={[0.15, 0.64, 0]}>
        <boxGeometry args={[1.7, 0.5, 1.28]} />
        <meshBasicMaterial color={neonBlue} wireframe />
      </mesh>
      {/* Front bumper */}
      <mesh position={[1.88, 0.08, 0]}>
        <boxGeometry args={[0.18, 0.38, 1.45]} />
        <meshBasicMaterial color={neonRed} wireframe />
      </mesh>
      {/* Rear bumper */}
      <mesh position={[-1.88, 0.08, 0]}>
        <boxGeometry args={[0.18, 0.38, 1.45]} />
        <meshBasicMaterial color={neonRed} wireframe />
      </mesh>
      {/* Grille */}
      <mesh position={[1.82, 0.22, 0]}>
        <boxGeometry args={[0.04, 0.28, 0.76]} />
        <meshBasicMaterial color={neonBlue} wireframe />
      </mesh>
      {/* Wheels */}
      {(
        [
          [1.15, -0.28, 0.88],
          [-1.15, -0.28, 0.88],
          [1.15, -0.28, -0.88],
          [-1.15, -0.28, -0.88],
        ] as [number, number, number][]
      ).map((pos) => (
        <mesh
          key={`w-${pos[0]}-${pos[2]}`}
          position={pos}
          rotation={[0, 0, Math.PI / 2]}
        >
          <cylinderGeometry args={[0.38, 0.38, 0.26, 18]} />
          <meshBasicMaterial color={neonRed} wireframe />
        </mesh>
      ))}
      {/* Exhausts */}
      {(
        [
          [-1.82, -0.12, 0.44],
          [-1.82, -0.12, 0.2],
          [-1.82, -0.12, -0.2],
          [-1.82, -0.12, -0.44],
        ] as [number, number, number][]
      ).map((pos) => (
        <mesh key={`e-${pos[2]}`} position={pos} rotation={[0, Math.PI / 2, 0]}>
          <cylinderGeometry args={[0.045, 0.045, 0.18, 8]} />
          <meshBasicMaterial color={neonRed} wireframe />
        </mesh>
      ))}
      {/* Neon underglow */}
      <pointLight
        position={[0, -0.55, 0]}
        color={neonBlue}
        intensity={1.4}
        distance={4}
      />
    </group>
  );
}

// ─── Spinner shown during Suspense ───────────────────────────────────────────
function Spinner() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 1.1;
      ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.6) * 0.4;
    }
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.2, 1]} />
      <meshBasicMaterial color="#00aaff" wireframe />
    </mesh>
  );
}

function ParticleField() {
  const COUNT = 180;
  const positions = (() => {
    const arr = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const r = 4.5 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.cos(phi) * 0.45;
      arr[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    return arr;
  })();
  const ref = useRef<THREE.Points>(null);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.04;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#00aaff"
        size={0.028}
        sizeAttenuation
        transparent
        opacity={0.5}
      />
    </points>
  );
}

function GridFloor() {
  return (
    <group position={[0, -1.2, 0]}>
      <gridHelper args={[22, 22, "#00aaff", "#001a2f"]} />
    </group>
  );
}

function Scene({ useRealModel }: { useRealModel: boolean }) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />
      <directionalLight
        position={[-5, 5, -5]}
        intensity={0.8}
        color="#aaddff"
      />
      <pointLight
        position={[0, 6, 0]}
        color="#ffffff"
        intensity={2}
        distance={15}
      />
      <pointLight
        position={[6, 2, -4]}
        color="#ffddaa"
        intensity={1.2}
        distance={12}
      />
      <pointLight
        position={[-6, 1, 4]}
        color="#aaccff"
        intensity={1}
        distance={12}
      />
      <Environment preset="city" />
      <GridFloor />
      <ParticleField />
      {useRealModel ? (
        <ModelErrorBoundary fallback={<HolographicCar />}>
          <Suspense fallback={<Spinner />}>
            <CarModel />
          </Suspense>
        </ModelErrorBoundary>
      ) : (
        <HolographicCar />
      )}
    </>
  );
}

// ─── HUD overlay ─────────────────────────────────────────────────────────────
const HUD_DATA = [
  { key: "HP", from: 0, to: 627, unit: "HP", decimals: 0 },
  { key: "TORQUE", from: 0, to: 750, unit: "Nm", decimals: 0 },
  { key: "0-100", from: 5.0, to: 3.0, unit: "s", decimals: 1, down: true },
  { key: "TOP", from: 0, to: 305, unit: "km/h", decimals: 0 },
];

function HUDOverlay({ modelStatus }: { modelStatus: string }) {
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
      setScanY((p) => (p >= 100 ? 0 : p + 0.25));
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  const statusColor =
    modelStatus === "loaded"
      ? "#00ff88"
      : modelStatus === "error"
        ? "#ff2244"
        : "#ffaa00";

  return (
    <div
      className="absolute inset-0 pointer-events-none font-mono"
      style={{ zIndex: 10 }}
    >
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
            borderTop: c.borderTop ? "1.5px solid #00aaff" : undefined,
            borderLeft: c.borderLeft ? "1.5px solid #00aaff" : undefined,
            borderRight: c.borderRight ? "1.5px solid #00aaff" : undefined,
            borderBottom: c.borderBottom ? "1.5px solid #00aaff" : undefined,
          }}
        />
      ))}

      <div
        className="absolute top-4 left-10"
        style={{
          background: "rgba(0,8,14,0.75)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(0,170,255,0.25)",
          padding: "6px 12px",
          borderRadius: 4,
        }}
      >
        <div className="text-xs tracking-widest" style={{ color: "#00aaff" }}>
          BMW M5 CS
        </div>
        <div
          className="text-xs tracking-widest mt-0.5"
          style={{ color: "rgba(0,170,255,0.55)" }}
        >
          3D MODEL VIEWER
        </div>
        <div
          className="text-xs tracking-widest mt-0.5"
          style={{ color: "rgba(0,170,255,0.35)" }}
        >
          [M DIVISION — 2024]
        </div>
      </div>

      <div
        className="absolute top-4 right-10 text-right"
        style={{
          background: "rgba(0,8,14,0.75)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(0,170,255,0.25)",
          padding: "6px 12px",
          borderRadius: 4,
        }}
      >
        <div className="text-xs tracking-widest" style={{ color: "#00aaff" }}>
          LIVE SCAN <span style={{ opacity: blink ? 1 : 0 }}>▌</span>
        </div>
        <div
          className="text-xs tracking-widest mt-0.5"
          style={{ color: statusColor }}
        >
          {modelStatus === "loaded"
            ? "MODEL: LOADED"
            : modelStatus === "error"
              ? "MODEL: HOLOGRAM"
              : "MODEL: LOADING…"}
        </div>
        <div
          className="text-xs tracking-widest mt-0.5"
          style={{ color: "rgba(0,170,255,0.35)" }}
        >
          DRAG · ROTATE
        </div>
      </div>

      <div
        className="absolute bottom-10 left-10 flex gap-5"
        style={{
          background: "rgba(0,8,14,0.75)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,34,68,0.25)",
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

      <div
        className="absolute bottom-10 right-10 text-right text-xs tracking-widest"
        style={{ color: "rgba(0,170,255,0.4)" }}
      >
        DRAG · ROTATE &nbsp;|&nbsp; SCROLL · ZOOM
      </div>

      <div
        style={{
          position: "absolute",
          top: `${scanY}%`,
          left: 0,
          right: 0,
          height: 2,
          background:
            "linear-gradient(90deg, transparent 0%, #00aaff 40%, #00aaff 60%, transparent 100%)",
          opacity: 0.12,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

// ─── Main export ─────────────────────────────────────────────────────────────
export default function ThreeDSection() {
  const [modelStatus, setModelStatus] = useState<
    "loading" | "loaded" | "error"
  >("loading");

  // Attempt a HEAD fetch to check if the model URL is reachable
  useEffect(() => {
    const controller = new AbortController();
    fetch(MODEL_URL, { method: "HEAD", signal: controller.signal })
      .then((r) => {
        if (r.ok) setModelStatus("loaded");
        else setModelStatus("error");
      })
      .catch(() => setModelStatus("error"));
    return () => controller.abort();
  }, []);

  const useRealModel = modelStatus !== "error";

  return (
    <section
      id="viewer"
      className="relative py-20 overflow-hidden"
      style={{ backgroundColor: "#09090F", minHeight: "100vh" }}
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          width: 800,
          height: 800,
          background:
            "radial-gradient(circle, rgba(0,170,255,0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
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
                background: "linear-gradient(90deg, transparent, #00aaff)",
              }}
            />
            <span
              className="text-xs tracking-[0.4em] font-semibold font-mono"
              style={{ color: "#00aaff" }}
            >
              EXPERIENCE
            </span>
            <div
              className="h-px flex-1 max-w-16"
              style={{
                background: "linear-gradient(90deg, #00aaff, transparent)",
              }}
            />
          </div>
          <h2
            className="font-rajdhani font-bold text-5xl md:text-6xl tracking-wider"
            style={{ color: "#F2F5F7" }}
          >
            3D MODEL VIEWER
          </h2>
          <p
            className="mt-3 text-sm tracking-[0.2em] uppercase font-mono"
            style={{ color: "rgba(0,170,255,0.6)" }}
          >
            BMW M5 CS · INTERACTIVE 3D MODEL · DRAG TO ROTATE
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
            border: "1px solid rgba(0,170,255,0.22)",
            boxShadow:
              "0 0 80px rgba(0,170,255,0.1), 0 0 20px rgba(0,170,255,0.07), inset 0 0 60px rgba(0,0,0,0.7)",
          }}
        >
          <Canvas
            camera={{ position: [5, 2.5, 5], fov: 44 }}
            style={{ background: "#09090F" }}
            gl={{ antialias: true }}
            shadows
          >
            <Scene useRealModel={useRealModel} />
            <OrbitControls
              enablePan={false}
              minDistance={3}
              maxDistance={14}
              maxPolarAngle={Math.PI / 2 - 0.04}
              minPolarAngle={0.08}
              autoRotate={false}
            />
          </Canvas>
          <HUDOverlay modelStatus={modelStatus} />
        </motion.div>

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
                background: "rgba(0,170,255,0.04)",
                border: "1px solid rgba(0,170,255,0.12)",
              }}
            >
              <div
                className="text-xs tracking-widest mb-1 font-mono"
                style={{ color: "rgba(0,170,255,0.5)" }}
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
