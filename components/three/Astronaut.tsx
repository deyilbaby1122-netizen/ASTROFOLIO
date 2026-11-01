"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Box3, MathUtils, Mesh, Object3D, Vector3 } from "three";
import type { Material } from "three";
import { pointerState, scrollState } from "./state";

const MODEL_URL = "/models/astronaut.glb";
const TARGET_HEIGHT = 3.05;

/**
 * The real GLB astronaut. The model is normalised to a fixed height,
 * centred on its own origin and then animated with a floating idle,
 * pointer parallax and a scroll-driven exit.
 */
export default function Astronaut() {
  const group = useRef<Object3D>(null);
  const opacityRef = useRef(1);
  const { scene } = useGLTF(MODEL_URL);
  const { size } = useThree();

  const { model, materials } = useMemo(() => {
    const clone = scene.clone(true);
    const box = new Box3().setFromObject(clone);
    const dimensions = box.getSize(new Vector3());
    const scale = TARGET_HEIGHT / Math.max(dimensions.y, 0.0001);

    clone.scale.setScalar(scale);
    box.setFromObject(clone);
    clone.position.sub(box.getCenter(new Vector3()));

    const collected: Material[] = [];
    clone.traverse((child) => {
      if (!(child instanceof Mesh)) return;
      child.castShadow = true;
      child.receiveShadow = true;
      const list = Array.isArray(child.material) ? child.material : [child.material];
      list.forEach((material) => {
        material.transparent = true;
        collected.push(material);
      });
    });

    return { model: clone, materials: collected };
  }, [scene]);

  const isMobile = size.width < 768;
  const isTablet = size.width < 1180;

  useFrame((state, delta) => {
    const node = group.current;
    if (!node) return;

    const time = state.clock.elapsedTime;
    const hero = Math.min(scrollState.hero, 1);
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const baseX = isMobile ? 0.55 : isTablet ? 1.55 : 2.15;
    const baseY = isMobile ? 1.05 : 0.12;
    const baseScale = isMobile ? 0.44 : isTablet ? 0.78 : 1;

    const targetX = baseX + (reduceMotion ? 0 : pointerState.x * 0.28);
    const targetY =
      baseY +
      (reduceMotion ? 0 : Math.sin(time * 0.72) * 0.1 + pointerState.y * 0.14) +
      hero * 2.6;
    const targetZ = -hero * 1.2;
    const targetRotationY =
      -0.32 + (reduceMotion ? 0 : Math.sin(time * 0.32) * 0.16 + pointerState.x * 0.32);
    const targetRotationZ = reduceMotion ? 0 : Math.sin(time * 0.45) * 0.035;
    const targetRotationX = reduceMotion ? 0 : pointerState.y * 0.06;

    node.position.x = MathUtils.damp(node.position.x, targetX, 4, delta);
    node.position.y = MathUtils.damp(node.position.y, targetY, 4, delta);
    node.position.z = MathUtils.damp(node.position.z, targetZ, 4, delta);
    node.rotation.y = MathUtils.damp(node.rotation.y, targetRotationY, 4, delta);
    node.rotation.z = MathUtils.damp(node.rotation.z, targetRotationZ, 4, delta);
    node.rotation.x = MathUtils.damp(node.rotation.x, targetRotationX, 4, delta);

    const scale = MathUtils.damp(node.scale.x, baseScale * (1 - hero * 0.15), 4, delta);
    node.scale.setScalar(scale);

    opacityRef.current = MathUtils.damp(
      opacityRef.current,
      MathUtils.clamp(1 - hero * 1.9, 0, 1),
      6,
      delta,
    );
    const opacity = opacityRef.current;
    materials.forEach((material) => {
      material.opacity = opacity;
      material.depthWrite = opacity > 0.9;
    });
    node.visible = opacity > 0.02;
  });

  return (
    <group ref={group} position={[isMobile ? 0.55 : 2.15, isMobile ? 1.05 : 0.12, 0]}>
      <primitive object={model} />
      {/* A faint halo so the astronaut reads against the dark sky. */}
      <mesh position={[0, -0.1, -1.6]} scale={2.1}>
        <circleGeometry args={[1, 48]} />
        <meshBasicMaterial color="#1d4ed8" transparent opacity={0.16} depthWrite={false} />
      </mesh>
    </group>
  );
}

useGLTF.preload(MODEL_URL);
