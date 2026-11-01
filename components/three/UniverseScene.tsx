"use client";

import { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { ACESFilmicToneMapping } from "three";
import SceneContent from "./SceneContent";
import { pointerState, scrollState } from "./state";

/**
 * Fixed, full-viewport WebGL universe that sits behind the content.
 * The pointer and scroll values are captured here (in the DOM layer)
 * and read inside three's render loop.
 */
export default function UniverseScene() {
  useEffect(() => {
    let frame = 0;

    const readScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollState.hero = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1);
      scrollState.page = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      frame = 0;
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(readScroll);
    };

    const onPointerMove = (event: PointerEvent) => {
      pointerState.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointerState.y = -((event.clientY / window.innerHeight) * 2 - 1);
    };

    readScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[1]" aria-hidden="true">
      <Canvas
        shadows
        dpr={[1, 1.75]}
        camera={{ position: [0, 0.15, 7], fov: 45, near: 0.1, far: 120 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        onCreated={({ gl }) => {
          gl.toneMapping = ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.15;
        }}
        style={{ pointerEvents: "none" }}
      >
        <SceneContent />
      </Canvas>
    </div>
  );
}
