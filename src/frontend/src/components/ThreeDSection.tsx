import { Environment, Float, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "motion/react";
import { Suspense, useRef } from "react";
import type * as THREE from "three";

function CarBody() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  const bodyMat = (
    <meshStandardMaterial
      color="#050510"
      metalness={0.95}
      roughness={0.08}
      envMapIntensity={1.5}
    />
  );

  const glassMat = (
    <meshStandardMaterial
      color="#0a1a2e"
      metalness={0.2}
      roughness={0.0}
      transparent
      opacity={0.7}
    />
  );

  const wheelMat = (
    <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.3} />
  );

  const rimMat = (
    <meshStandardMaterial color="#888888" metalness={1.0} roughness={0.1} />
  );

  return (
    <group ref={groupRef}>
      {/* Car body - main lower */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[4, 0.5, 2]} />
        {bodyMat}
      </mesh>

      {/* Car body - upper cabin */}
      <mesh position={[0, 0.55, 0.1]} castShadow>
        <boxGeometry args={[2.4, 0.6, 1.7]} />
        {bodyMat}
      </mesh>

      {/* Front hood slope */}
      <mesh position={[1.0, 0.22, 0.1]} rotation={[0, 0, -0.2]} castShadow>
        <boxGeometry args={[1.2, 0.12, 1.8]} />
        {bodyMat}
      </mesh>

      {/* Rear trunk slope */}
      <mesh position={[-0.9, 0.28, 0.1]} rotation={[0, 0, 0.15]} castShadow>
        <boxGeometry args={[0.9, 0.12, 1.8]} />
        {bodyMat}
      </mesh>

      {/* Windshield */}
      <mesh position={[0.7, 0.65, 0.1]} rotation={[0, 0, -0.35]}>
        <boxGeometry args={[0.6, 0.55, 1.65]} />
        {glassMat}
      </mesh>

      {/* Rear window */}
      <mesh position={[-0.7, 0.65, 0.1]} rotation={[0, 0, 0.3]}>
        <boxGeometry args={[0.5, 0.5, 1.65]} />
        {glassMat}
      </mesh>

      {/* Wheels - front left */}
      <mesh position={[1.35, -0.3, 1.05]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.42, 0.42, 0.28, 24]} />
        {wheelMat}
      </mesh>
      <mesh position={[1.35, -0.3, 1.05]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.28, 0.28, 0.3, 8]} />
        {rimMat}
      </mesh>

      {/* Wheels - front right */}
      <mesh position={[1.35, -0.3, -1.05]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.42, 0.42, 0.28, 24]} />
        {wheelMat}
      </mesh>
      <mesh position={[1.35, -0.3, -1.05]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.28, 0.28, 0.3, 8]} />
        {rimMat}
      </mesh>

      {/* Wheels - rear left */}
      <mesh position={[-1.3, -0.3, 1.05]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.42, 0.42, 0.28, 24]} />
        {wheelMat}
      </mesh>
      <mesh position={[-1.3, -0.3, 1.05]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.28, 0.28, 0.3, 8]} />
        {rimMat}
      </mesh>

      {/* Wheels - rear right */}
      <mesh position={[-1.3, -0.3, -1.05]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.42, 0.42, 0.28, 24]} />
        {wheelMat}
      </mesh>
      <mesh position={[-1.3, -0.3, -1.05]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.28, 0.28, 0.3, 8]} />
        {rimMat}
      </mesh>

      {/* Spoiler */}
      <mesh position={[-1.8, 0.35, 0]} castShadow>
        <boxGeometry args={[0.15, 0.08, 1.8]} />
        {bodyMat}
      </mesh>
      <mesh position={[-1.8, 0.18, 0.8]} castShadow>
        <boxGeometry args={[0.08, 0.35, 0.08]} />
        {bodyMat}
      </mesh>
      <mesh position={[-1.8, 0.18, -0.8]} castShadow>
        <boxGeometry args={[0.08, 0.35, 0.08]} />
        {bodyMat}
      </mesh>

      {/* Neon under-glow ring */}
      <mesh position={[0, -0.56, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.2, 0.03, 8, 64]} />
        <meshStandardMaterial
          color="#20E0E6"
          emissive="#20E0E6"
          emissiveIntensity={2}
        />
      </mesh>

      {/* Headlights */}
      <mesh position={[2.0, 0.1, 0.7]}>
        <boxGeometry args={[0.05, 0.12, 0.35]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#20E0E6"
          emissiveIntensity={3}
        />
      </mesh>
      <mesh position={[2.0, 0.1, -0.7]}>
        <boxGeometry args={[0.05, 0.12, 0.35]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#20E0E6"
          emissiveIntensity={3}
        />
      </mesh>

      {/* Tail lights */}
      <mesh position={[-2.0, 0.1, 0.6]}>
        <boxGeometry args={[0.05, 0.1, 0.4]} />
        <meshStandardMaterial
          color="#E53935"
          emissive="#E53935"
          emissiveIntensity={2}
        />
      </mesh>
      <mesh position={[-2.0, 0.1, -0.6]}>
        <boxGeometry args={[0.05, 0.1, 0.4]} />
        <meshStandardMaterial
          color="#E53935"
          emissive="#E53935"
          emissiveIntensity={2}
        />
      </mesh>
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <spotLight
        position={[5, 8, 5]}
        angle={0.4}
        penumbra={0.8}
        intensity={2}
        color="#20E0E6"
        castShadow
      />
      <spotLight
        position={[-5, 6, -5]}
        angle={0.4}
        penumbra={0.8}
        intensity={1.5}
        color="#E53935"
        castShadow
      />
      <spotLight
        position={[0, 10, 0]}
        angle={0.5}
        penumbra={1}
        intensity={1}
        color="#ffffff"
      />
      <Environment preset="warehouse" />

      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.1}>
        <CarBody />
      </Float>

      {/* Reflective floor */}
      <mesh
        position={[0, -0.75, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial
          color="#060810"
          metalness={0.8}
          roughness={0.2}
          envMapIntensity={0.5}
        />
      </mesh>
    </>
  );
}

export default function ThreeDSection() {
  return (
    <section
      id="viewer"
      className="relative py-20 overflow-hidden"
      style={{ backgroundColor: "#0a0d12", minHeight: "100vh" }}
    >
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10 pointer-events-none"
        style={{
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, #20E0E6 0%, transparent 70%)",
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
                background: "linear-gradient(90deg, transparent, #20E0E6)",
              }}
            />
            <span
              className="text-xs tracking-[0.4em] font-semibold"
              style={{ color: "#20E0E6" }}
            >
              EXPERIENCE
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
            3D INTERACTIVE VIEWER
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative rounded-lg overflow-hidden"
          style={{
            height: "65vh",
            border: "1px solid rgba(32,224,230,0.2)",
            boxShadow:
              "0 0 40px rgba(32,224,230,0.1), inset 0 0 40px rgba(0,0,0,0.5)",
          }}
        >
          <Suspense
            fallback={
              <div
                className="w-full h-full flex items-center justify-center"
                style={{ backgroundColor: "#080b10" }}
              >
                <div className="text-center">
                  <div
                    className="w-12 h-12 rounded-full border-2 border-t-transparent animate-spin mx-auto mb-4"
                    style={{
                      borderColor: "#20E0E6",
                      borderTopColor: "transparent",
                    }}
                  />
                  <p
                    className="text-sm tracking-widest"
                    style={{ color: "#7C8796" }}
                  >
                    LOADING 3D MODEL
                  </p>
                </div>
              </div>
            }
          >
            <Canvas
              shadows
              camera={{ position: [6, 3, 6], fov: 45 }}
              style={{
                background: "linear-gradient(180deg, #060810 0%, #0a0d12 100%)",
              }}
            >
              <Scene />
              <OrbitControls
                enablePan={false}
                minDistance={4}
                maxDistance={14}
                maxPolarAngle={Math.PI / 2 - 0.05}
                minPolarAngle={0.1}
                autoRotate={false}
              />
            </Canvas>
          </Suspense>

          {/* Hint */}
          <div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs tracking-[0.25em] font-semibold"
            style={{ color: "rgba(32,224,230,0.6)" }}
          >
            DRAG TO ROTATE · SCROLL TO ZOOM
          </div>
        </motion.div>
      </div>
    </section>
  );
}
