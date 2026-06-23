import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function ParticleSphere({ mouseRef }: { mouseRef: React.MutableRefObject<{ x: number; y: number }> }) {
  const points = useRef<THREE.Points>(null!);
  useThree();

  const count = 3000;
  const { positions, colors } = React.useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const r = 2.0 + (Math.random() - 0.5) * 0.4;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      // Purple to violet gradient color
      const t = Math.random();
      colors[i * 3] = 0.55 + t * 0.25;       // R
      colors[i * 3 + 1] = 0.36 + t * 0.15;   // G
      colors[i * 3 + 2] = 0.96 - t * 0.1;    // B
    }
    return { positions, colors };
  }, []);

  useFrame(({ clock }) => {
    if (!points.current) return;
    const t = clock.getElapsedTime();
    points.current.rotation.y = t * 0.12;
    points.current.rotation.x = Math.sin(t * 0.05) * 0.15;

    // Mouse influence
    const targetRotY = mouseRef.current.x * 0.3;
    const targetRotX = -mouseRef.current.y * 0.3;
    points.current.rotation.y += (targetRotY - points.current.rotation.y) * 0.02;
    points.current.rotation.x = t * 0.05 + (targetRotX - points.current.rotation.x) * 0.02;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function OrbitRing({ radius, speed, tilt }: { radius: number; speed: number; tilt: number }) {
  const ring = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    if (!ring.current) return;
    ring.current.rotation.z = clock.getElapsedTime() * speed;
  });

  return (
    <mesh ref={ring} rotation={[tilt, 0, 0]}>
      <torusGeometry args={[radius, 0.003, 8, 120]} />
      <meshBasicMaterial color="#8B5CF6" transparent opacity={0.3} />
    </mesh>
  );
}

function GlowCore() {
  const core = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    if (!core.current) return;
    const t = clock.getElapsedTime();
    const s = 1 + Math.sin(t * 2) * 0.05;
    core.current.scale.set(s, s, s);
  });
  return (
    <mesh ref={core}>
      <sphereGeometry args={[0.3, 32, 32]} />
      <meshBasicMaterial color="#A855F7" transparent opacity={0.4} />
    </mesh>
  );
}

function FloatingParticles() {
  const particles = useRef<THREE.Points>(null!);
  const count = 200;
  const positions = React.useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    if (!particles.current) return;
    particles.current.rotation.y = clock.getElapsedTime() * 0.02;
  });

  return (
    <points ref={particles}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#8B5CF6"
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

interface ThreeSphereProps {
  className?: string;
}

export default function ThreeSphere({ className }: ThreeSphereProps) {
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className={className} style={{ position: 'relative' }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true, toneMapping: THREE.NoToneMapping }}
      >
        <ambientLight intensity={0.3} color="#8B5CF6" />
        <pointLight position={[5, 5, 5]} intensity={2} color="#A855F7" />
        <pointLight position={[-5, -5, -5]} intensity={1} color="#6D28D9" />
        <ParticleSphere mouseRef={mouseRef} />
        <OrbitRing radius={2.5} speed={0.3} tilt={Math.PI / 4} />
        <OrbitRing radius={2.8} speed={-0.2} tilt={Math.PI / 6} />
        <OrbitRing radius={3.1} speed={0.15} tilt={Math.PI / 3} />
        <GlowCore />
        <FloatingParticles />
      </Canvas>
      {/* Glow overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
    </div>
  );
}
