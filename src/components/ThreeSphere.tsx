import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Float, Environment } from '@react-three/drei';

function IcosahedronMesh() {
  const meshRef = useRef(null);
  const wireRef = useRef(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (!meshRef.current) return;

    meshRef.current.rotation.x = t * 0.12;
    meshRef.current.rotation.y = t * 0.18;

    if (wireRef.current) {
      wireRef.current.rotation.x = -t * 0.08;
      wireRef.current.rotation.y = t * 0.14;
    }
  });

  return (
    <>
      <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.6}>
        <mesh ref={meshRef} scale={2.2}>
          <icosahedronGeometry args={[1, 1]} />
          <MeshTransmissionMaterial
            samples={8}
            resolution={256}
            thickness={0.4}
            roughness={0.05}
            clearcoat={1}
            clearcoatRoughness={0.05}
            transmission={1}
            ior={1.5}
            color="#8b5cf6"
            distortion={0.35}
            distortionScale={0.6}
            temporalDistortion={0.12}
            chromaticAberration={0.05}
          />
        </mesh>

        {/* Wireframe overlay */}
        <mesh ref={wireRef} scale={2.35}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial color="#a78bfa" wireframe transparent opacity={0.12} />
        </mesh>
      </Float>

      {/* Orbiting rings */}
      <Float speed={0.8} floatIntensity={0.2}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[3.2, 0.025, 8, 80]} />
          <meshBasicMaterial color="#7c3aed" transparent opacity={0.35} />
        </mesh>
      </Float>

      <Float speed={0.5} floatIntensity={0.15}>
        <mesh rotation={[Math.PI / 3, Math.PI / 5, 0]}>
          <torusGeometry args={[3.7, 0.016, 8, 80]} />
          <meshBasicMaterial color="#a78bfa" transparent opacity={0.2} />
        </mesh>
      </Float>

      <pointLight position={[4, 4, 4]}   intensity={2.5} color="#7c3aed" />
      <pointLight position={[-4, -4, 2]} intensity={1.8} color="#a78bfa" />
      <pointLight position={[0, 4, -4]}  intensity={1.2} color="#ddd6fe" />
    </>
  );
}

// Fallback shown while Three.js initializes
function SphereFallback() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: '220px',
          height: '220px',
          borderRadius: '50%',
          border: '1px solid rgba(124,58,237,0.3)',
          background: 'radial-gradient(circle at 35% 35%, rgba(139,92,246,0.2), rgba(124,58,237,0.04))',
          boxShadow: '0 0 60px rgba(124,58,237,0.2)',
          animation: 'pulse-violet 3s ease-in-out infinite',
        }}
      />
    </div>
  );
}

export default function ThreeSphere() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        cursor: 'none',
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: 'absolute',
          inset: '10%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.2) 0%, rgba(124,58,237,0.05) 50%, transparent 70%)',
          filter: 'blur(30px)',
          animation: 'pulse-violet 4s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      />

      <Suspense fallback={<SphereFallback />}>
        <Canvas
          camera={{ position: [0, 0, 7], fov: 42 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            preserveDrawingBuffer: false,
          }}
          style={{ background: 'transparent' }}
          dpr={[1, 1.5]}
          frameloop="always"
        >
          <ambientLight intensity={0.4} />
          <Environment preset="city" />
          <IcosahedronMesh />
        </Canvas>
      </Suspense>
    </div>
  );
}
