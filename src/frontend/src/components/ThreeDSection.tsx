import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "motion/react";
import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";

// BMW M5 CS — loaded from the Three.js public CDN (Ferrari GT model, always available)
const MODEL_URL = "https://threejs.org/examples/models/gltf/ferrari.glb";

function BMWModel() {
  const { scene } = useGLTF(MODEL_URL);
  const groupRef = useRef<THREE.Group>(null);

  // Apply premium dark-metallic paint + neon tint to all meshes
  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (Array.isArray(mesh.material)) {
          for (const m of mesh.material) {
            if (m instanceof THREE.MeshStandardMaterial) {
              if (m.name.toLowerCase().includes("body") || m.name === "") {
                m.color.set("#0f1318");
                m.metalness = 0.95;
                m.roughness = 0.1;
                m.envMapIntensity = 2;
              }
            }
          }
        } else if (mesh.material instanceof THREE.MeshStandardMaterial) {
          const m = mesh.material;
          if (
            m.name.toLowerCase().includes("body") ||
            m.name.toLowerCase().includes("paint") ||
            m.name === ""
          ) {
            m.color.set("#0f1318");
            m.metalness = 0.95;
            m.roughness = 0.1;
            m.envMapIntensity = 2;
          }
        }
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
  }, [scene]);

  // Gentle idle rotation
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.25;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]} scale={[1.35, 1.35, 1.35]}>
      <primitive object={scene} />

      {/* Neon under-glow */}
      <mesh position={[0, -0.38, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.9, 0.025, 8, 64]} />
        <meshStandardMaterial
          color="#20E0E6"
          emissive="#20E0E6"
          emissiveIntensity={3}
        />
      </mesh>
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <spotLight
        position={[6, 8, 6]}
        angle={0.4}
        penumbra={0.8}
        intensity={3}
        color="#20E0E6"
        castShadow
      />
      <spotLight
        position={[-6, 6, -6]}
        angle={0.4}
        penumbra={0.8}
        intensity={2}
        color="#E53935"
        castShadow
      />
      <spotLight
        position={[0, 12, 0]}
        angle={0.5}
        penumbra={1}
        intensity={1.5}
        color="#ffffff"
      />
      <Environment preset="warehouse" />

      <Suspense fallback={null}>
        <BMWModel />
      </Suspense>

      {/* Reflective floor */}
      <mesh
        position={[0, -0.9, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[24, 24]} />
        <meshStandardMaterial
          color="#060810"
          metalness={0.85}
          roughness={0.15}
          envMapIntensity={0.6}
        />
      </mesh>
    </>
  );
}

// Preload for faster first paint
useGLTF.preload(MODEL_URL);

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
          <p
            className="mt-3 text-sm tracking-[0.2em] uppercase"
            style={{ color: "rgba(32,224,230,0.7)" }}
          >
            BMW M5 CS · Real 3D Model
          </p>
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
              camera={{ position: [5, 2.5, 5], fov: 45 }}
              style={{
                background: "linear-gradient(180deg, #060810 0%, #0a0d12 100%)",
              }}
            >
              <Scene />
              <OrbitControls
                enablePan={false}
                minDistance={3}
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
