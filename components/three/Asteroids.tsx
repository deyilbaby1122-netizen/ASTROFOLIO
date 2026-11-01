"use client";

import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  DodecahedronGeometry,
  Group,
  InstancedMesh,
  MeshStandardMaterial,
  Object3D,
} from "three";

const COUNT = 72;

/** Deterministic pseudo-random so the belt is stable between mounts. */
function seededRandom(seed: number) {
  let value = seed;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

/** A slow, drifting asteroid belt for depth and parallax. */
export default function Asteroids() {
  const belt = useRef<Group>(null);
  const mesh = useRef<InstancedMesh>(null);

  const geometry = useMemo(() => new DodecahedronGeometry(1, 0), []);
  const material = useMemo(
    () =>
      new MeshStandardMaterial({
        color: "#9aa6bd",
        roughness: 0.95,
        metalness: 0.12,
        flatShading: true,
      }),
    [],
  );

  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material],
  );

  useLayoutEffect(() => {
    const instance = mesh.current;
    if (!instance) return;

    const dummy = new Object3D();
    const random = seededRandom(7331);

    for (let index = 0; index < COUNT; index += 1) {
      const angle = random() * Math.PI * 2;
      const distance = 4.5 + random() * 9;
      const height = (random() - 0.5) * 7.5;

      dummy.position.set(
        Math.cos(angle) * distance,
        height,
        Math.sin(angle) * distance * 0.55 - 6,
      );
      dummy.scale.setScalar(0.045 + random() * 0.13);
      dummy.rotation.set(random() * Math.PI, random() * Math.PI, random() * Math.PI);
      dummy.updateMatrix();
      instance.setMatrixAt(index, dummy.matrix);
    }

    instance.instanceMatrix.needsUpdate = true;
  }, []);

  useFrame((state, delta) => {
    if (belt.current) belt.current.rotation.y += delta * 0.014;
    if (mesh.current) {
      mesh.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.12) * 0.02;
    }
  });

  return (
    <group ref={belt} rotation={[0.2, 0, 0.1]}>
      <instancedMesh ref={mesh} args={[geometry, material, COUNT]} />
    </group>
  );
}
