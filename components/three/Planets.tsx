"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { DoubleSide, Mesh } from "three";

type PlanetProps = {
  position: [number, number, number];
  radius: number;
  color: string;
  glow: string;
  tilt?: number;
  ring?: boolean;
  spin?: number;
};

function Planet({
  position,
  radius,
  color,
  glow,
  tilt = 0,
  ring = false,
  spin = 0.05,
}: PlanetProps) {
  const body = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (body.current) body.current.rotation.y += delta * spin;
  });

  return (
    <group position={position} rotation={[0, 0, tilt]}>
      <mesh ref={body}>
        <sphereGeometry args={[radius, 48, 48]} />
        <meshStandardMaterial
          color={color}
          emissive={glow}
          emissiveIntensity={0.38}
          roughness={0.82}
          metalness={0.18}
        />
      </mesh>

      {/* Atmospheric rim */}
      <mesh scale={1.06}>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshBasicMaterial
          color={glow}
          transparent
          opacity={0.12}
          side={DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {ring && (
        <mesh rotation={[Math.PI / 2.15, 0.18, 0]}>
          <ringGeometry args={[radius * 1.4, radius * 2.05, 96]} />
          <meshBasicMaterial
            color={glow}
            transparent
            opacity={0.26}
            side={DoubleSide}
            depthWrite={false}
          />
        </mesh>
      )}
    </group>
  );
}

/** Floating planets placed far behind the astronaut. */
export default function Planets() {
  const drift = useRef<Mesh>(null);
  const { size } = useThree();
  const compact = size.width < 768;

  useFrame((state) => {
    if (!drift.current) return;
    drift.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.15) * 0.04;
  });

  return (
    <group ref={drift}>
      <Planet
        position={compact ? [-2.6, 3.6, -10] : [-6.1, 3.2, -9]}
        radius={compact ? 0.9 : 1.55}
        color="#1e2a6b"
        glow="#7c9dff"
        tilt={0.28}
        ring
        spin={0.04}
      />
      <Planet
        position={compact ? [2.8, -3.4, -9] : [5.6, -2.7, -7]}
        radius={compact ? 0.55 : 0.72}
        color="#0f5f6b"
        glow="#5eead4"
        spin={0.09}
      />
      <Planet
        position={compact ? [-3.6, -1.2, -16] : [-4.4, 0.9, -16]}
        radius={0.62}
        color="#3b1d5e"
        glow="#c084fc"
        spin={0.06}
      />
      <Planet
        position={compact ? [3.2, 3.9, -18] : [7.2, 4.2, -18]}
        radius={0.4}
        color="#5b4a1f"
        glow="#fcd34d"
        spin={0.12}
      />
    </group>
  );
}
