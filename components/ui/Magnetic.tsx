"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";

/** Wraps content with a subtle, GSAP-driven magnetic pointer follow. */
export default function Magnetic({
  children,
  className,
  strength = 0.22,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const moveX = gsap.quickTo(element, "x", { duration: 0.5, ease: "power3.out" });
    const moveY = gsap.quickTo(element, "y", { duration: 0.5, ease: "power3.out" });

    const onMove = (event: MouseEvent) => {
      const bounds = element.getBoundingClientRect();
      moveX((event.clientX - (bounds.left + bounds.width / 2)) * strength);
      moveY((event.clientY - (bounds.top + bounds.height / 2)) * strength);
    };

    const onLeave = () => {
      moveX(0);
      moveY(0);
    };

    element.addEventListener("mousemove", onMove);
    element.addEventListener("mouseleave", onLeave);

    return () => {
      element.removeEventListener("mousemove", onMove);
      element.removeEventListener("mouseleave", onLeave);
      gsap.killTweensOf(element);
    };
  }, [strength]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
