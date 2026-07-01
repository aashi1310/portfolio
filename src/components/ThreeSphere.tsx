import { useRef, Suspense, useState, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';

function IcosahedronMesh() {
  const meshRef = useRef(null);
  const wireRef = useRef(null);
  const glowRef = useRef(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (!meshRef.current) return;

    meshRef.current.rotation.x = t * 0.12;
    meshRef.current.rotation.y = t * 0.18;

    if (wireRef.current) {
      wireRef.current.rotation.x = -t * 0.08;
      wireRef.current.rotation.y = t * 0.14;
    }

    if (glowRef.current) {
      glowRef.current.scale.setScalar(2.4 + Math.sin(t * 0.8) * 0.08);
    }
  });

  return (
    <>
      <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.6}>
        {/* Main solid icosahedron — using standard material for reliability */}
        <mesh ref={meshRef} scale={2.2}>
          <icosahedronGeometry args={[1, 1]} />
          <meshPhysicalMaterial
            color="#7c3aed"
            metalness={0.1}
            roughness={0.08}
            clearcoat={1}
            clearcoatRoughness={0.05}
            transmission={0.92}
            ior={1.45}
            thickness={0.6}
            envMapIntensity={1.5}
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* Wireframe overlay */}
        <mesh ref={wireRef} scale={2.38}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial color="#a78bfa" wireframe transparent opacity={0.15} />
        </mesh>

        {/* Inner glow sphere */}
        <mesh ref={glowRef} scale={2.4}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial color="#7c3aed" transparent opacity={0.05} />
        </mesh>
      </Float>

      {/* Orbital ring 1 */}
      <Float speed={0.8} floatIntensity={0.2}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[3.2, 0.02, 8, 80]} />
          <meshBasicMaterial color="#7c3aed" transparent opacity={0.35} />
        </mesh>
      </Float>

      {/* Orbital ring 2 */}
      <Float speed={0.5} floatIntensity={0.15}>
        <mesh rotation={[Math.PI / 3, Math.PI / 5, 0]}>
          <torusGeometry args={[3.7, 0.012, 8, 80]} />
          <meshBasicMaterial color="#a78bfa" transparent opacity={0.2} />
        </mesh>
      </Float>

      {/* Lighting */}
      <pointLight position={[4, 4, 4]}   intensity={2.5} color="#7c3aed" />
      <pointLight position={[-4, -4, 2]} intensity={1.8} color="#a78bfa" />
      <pointLight position={[0, 4, -4]}  intensity={1.2} color="#ddd6fe" />
    </>
  );
}

// CSS fallback sphere shown when WebGL isn't available or during load
function CSSFallbackSphere() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      {/* Outer glow ring */}
      <div
        style={{
          position: 'absolute',
          width: '65%',
          aspectRatio: '1',
          borderRadius: '50%',
          border: '1px solid rgba(124,58,237,0.15)',
          animation: 'spin-slow 18s linear infinite',
        }}
      />
      {/* Inner sphere */}
      <div
        style={{
          width: '50%',
          aspectRatio: '1',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 35%, rgba(139,92,246,0.25), rgba(124,58,237,0.08) 50%, rgba(124,58,237,0.02))',
          boxShadow: '0 0 60px rgba(124,58,237,0.25), 0 0 120px rgba(124,58,237,0.1)',
          animation: 'pulse-violet 4s ease-in-out infinite',
          border: '1px solid rgba(124,58,237,0.2)',
        }}
      />
    </div>
  );
}

export default function ThreeSphere() {
  const [webglFailed, setWebglFailed] = useState(false);

  const handleCreated = useCallback((state) => {
    // Listen for context loss
    const canvas = state.gl.domElement;
    canvas.addEventListener('webglcontextlost', () => {
      setWebglFailed(true);
    });
  }, []);

  // If WebGL has already failed, just show the CSS fallback
  if (webglFailed) {
    return (
      <div style={{ width: '100%', height: '100%', position: 'relative', cursor: 'none' }}>
        <CSSFallbackSphere />
      </div>
    );
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        cursor: 'none',
      }}
    >
      {/* Ambient halo behind the 3D object */}
      <div
        style={{
          position: 'absolute',
          inset: '10%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.18) 0%, rgba(124,58,237,0.04) 50%, transparent 70%)',
          filter: 'blur(30px)',
          animation: 'pulse-violet 5s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      />

      <Suspense fallback={<CSSFallbackSphere />}>
        <Canvas
          camera={{ position: [0, 0, 7], fov: 42 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            failIfMajorPerformanceCaveat: false,
          }}
          style={{ background: 'transparent' }}
          dpr={[1, 1.5]}
          frameloop="always"
          onCreated={handleCreated}
        >
          <ambientLight intensity={0.5} />
          <Environment preset="city" />
          <IcosahedronMesh />
        </Canvas>
      </Suspense>
    </div>
  );
}
