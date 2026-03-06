import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float, Sphere, Stars } from "@react-three/drei";

const AnimatedOrb = () => {
  const meshRef = useRef(null);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.35;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.25;
  });

  return (
    <Float speed={1.6} rotationIntensity={0.8} floatIntensity={1.4}>
      <Sphere ref={meshRef} args={[1.3, 64, 64]}>
        <MeshDistortMaterial color="#37e2ff" distort={0.35} speed={2.2} roughness={0} metalness={0.6} />
      </Sphere>
    </Float>
  );
};

const Particles = () => {
  const starConfig = useMemo(
    () => ({
      radius: 70,
      depth: 25,
      count: 1400,
      factor: 4,
      saturation: 0,
      fade: true,
      speed: 0.7,
    }),
    []
  );

  return <Stars {...starConfig} />;
};

const HeroScene = () => (
  <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 4.2], fov: 58 }}>
    <ambientLight intensity={0.7} />
    <directionalLight position={[3, 2, 2]} intensity={2} color="#8fe0ff" />
    <directionalLight position={[-2, -1, -2]} intensity={1.2} color="#7f7dff" />
    <Particles />
    <AnimatedOrb />
  </Canvas>
);

export default HeroScene;


