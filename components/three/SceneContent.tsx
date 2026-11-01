"use client";

import { Suspense } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Sparkles, Stars } from "@react-three/drei";
import { MathUtils } from "three";
import Astronaut from "./Astronaut";
import Planets from "./Planets";
import Asteroids from "./Asteroids";
import { pointerState } from "./state";

/** Subtle camera parallax that follows the pointer. */
function CameraRig() {
  const { camera } = useThree();

  useFrame((_, delta) => {
    camera.position.x = MathUtils.damp(camera.position.x, pointerState.x * 0.45, 2.2, delta);
    camera.position.y = MathUtils.damp(
      camera.position.y,
      0.15 - pointerState.y * 0.28,
      2.2,
      delta,
    );
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function SceneContent() {
  return (
    <>
      <ambientLight intensity={0.55} />
      <hemisphereLight args={["#8de9ff", "#1b1440", 0.85]} />

      <directionalLight
        position={[4.5, 6, 6]}
        intensity={2.6}
        color="#e6f6ff"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={0.5}
        shadow-camera-far={30}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
        shadow-bias={-0.0004}
      />
      <pointLight position={[-5.5, 2.4, 3]} intensity={38} distance={22} color="#a78bfa" />
      <pointLight position={[5, -3.2, 2.5]} intensity={26} distance={20} color="#5eead4" />
      <pointLight position={[0, 4.5, -4]} intensity={22} distance={20} color="#38bdf8" />

      <Suspense fallback={null}>
        <Astronaut />
      </Suspense>

      <Planets />
      <Asteroids />

      <Stars radius={70} depth={45} count={4200} factor={4} saturation={0} fade speed={0.7} />
      <Sparkles
        count={90}
        scale={[16, 10, 8]}
        size={2.4}
        speed={0.25}
        opacity={0.55}
        color="#bfe9ff"
      />

      <CameraRig />
    </>
  );
}
