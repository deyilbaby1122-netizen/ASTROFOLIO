"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useProgress } from "@react-three/drei";

const MIN_DURATION = 1200;

/** Brand boot screen that waits for the 3D assets (with a hard timeout). */
export default function Preloader() {
  const { progress, active } = useProgress();
  const [minElapsed, setMinElapsed] = useState(false);
  const [expired, setExpired] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const min = window.setTimeout(() => setMinElapsed(true), MIN_DURATION);
    const max = window.setTimeout(() => setExpired(true), 7000);
    return () => {
      window.clearTimeout(min);
      window.clearTimeout(max);
    };
  }, []);

  useEffect(() => {
    if (active || progress > 0) setStarted(true);
  }, [active, progress]);

  useEffect(() => {
    const assetsReady = started && (progress >= 100 || !active);
    if (minElapsed && (assetsReady || expired)) {
      const timer = window.setTimeout(() => setDismissed(true), 250);
      return () => window.clearTimeout(timer);
    }
  }, [minElapsed, started, progress, active, expired]);

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[90] flex flex-col items-center justify-center gap-8 bg-void"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
        >
          <div className="relative flex h-32 w-32 items-center justify-center">
            <motion.span
              className="absolute inset-0 rounded-full border border-white/10"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 9, ease: "linear" }}
            >
              <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-aurora-cyan shadow-[0_0_16px_4px_rgba(94,234,212,0.6)]" />
            </motion.span>
            <motion.span
              className="absolute inset-4 rounded-full border border-white/10"
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
            >
              <span className="absolute -bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-aurora-violet shadow-[0_0_14px_4px_rgba(167,139,250,0.55)]" />
            </motion.span>
            <span className="h-16 w-16 rounded-full bg-[radial-gradient(circle_at_30%_30%,#5eead4,#38bdf8_45%,#312e81_100%)] shadow-[0_0_60px_-10px_rgba(56,189,248,0.9)]" />
          </div>

          <div className="flex flex-col items-center gap-4 text-center">
            <p className="font-display text-sm tracking-[0.5em] text-white/90">ASTROFOLIO</p>
            <p className="text-[10px] uppercase tracking-[0.35em] text-white/40">
              Preparing your universe
            </p>
            <div className="h-px w-48 overflow-hidden bg-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-aurora-cyan via-aurora-sky to-aurora-violet"
                initial={{ width: "0%" }}
                animate={{ width: `${started ? Math.max(progress, 8) : 8}%` }}
                transition={{ ease: "easeOut", duration: 0.5 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
