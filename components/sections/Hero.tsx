"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";
import { site, stats } from "@/lib/data";
import Magnetic from "@/components/ui/Magnetic";

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const context = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const timeline = gsap.timeline({
        delay: 1.05,
        defaults: { ease: "power3.out" },
      });

      timeline
        .from("[data-hero='eyebrow']", { y: 18, opacity: 0, duration: 0.7 })
        .from(
          "[data-hero='line']",
          { yPercent: 112, opacity: 0, duration: 1, stagger: 0.11 },
          "-=0.4",
        )
        .from(
          "[data-hero='fade']",
          { y: 22, opacity: 0, duration: 0.8, stagger: 0.09 },
          "-=0.6",
        )
        .from("[data-hero='cue']", { opacity: 0, duration: 0.8 }, "-=0.4");
    }, root);

    return () => context.revert();
  }, []);

  return (
    <section
      id="home"
      ref={root}
      className="relative flex min-h-[100svh] flex-col justify-end pb-16 pt-[48svh] sm:justify-center sm:pb-24 sm:pt-32 lg:pb-28"
    >
      <div className="section-shell relative w-full">
        <div className="max-w-2xl">
          <div
            data-hero="eyebrow"
            className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] py-1.5 pl-2.5 pr-4 backdrop-blur-md"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-aurora-cyan opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-aurora-cyan" />
            </span>
            <span className="text-[9px] font-medium uppercase tracking-[0.3em] text-white/55 sm:text-[10px]">
              ASTROFOLIO · Digital Universe
            </span>
          </div>

          <h1 className="mt-6 font-display text-[clamp(2.75rem,8.4vw,5.75rem)] font-bold leading-[0.92] tracking-[-0.035em]">
            <span className="block overflow-hidden pb-1">
              <span data-hero="line" className="block">
                HI, I&apos;M
              </span>
            </span>
            <span className="block overflow-hidden pb-2">
              <span data-hero="line" className="text-gradient block">
                ASHRAF.
              </span>
            </span>
          </h1>

          <p
            data-hero="fade"
            className="mt-5 max-w-xl font-display text-lg font-medium text-white/85 sm:text-2xl"
          >
            Creative Web Developer &amp; Graphic Designer.
          </p>

          <p
            data-hero="fade"
            className="mt-3 max-w-xl text-sm leading-relaxed text-white/45 sm:text-base"
          >
            {site.shortIntro}
          </p>

          <div data-hero="fade" className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Magnetic className="w-full sm:w-auto">
              <a href="#about" className="btn-primary w-full sm:w-auto">
                Explore My Universe
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </a>
            </Magnetic>
            <Magnetic className="w-full sm:w-auto">
              <a href="#projects" className="btn-ghost w-full sm:w-auto">
                View My Projects
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </Magnetic>
          </div>

          <div data-hero="fade" className="mt-10 hidden max-w-lg gap-6 border-t border-white/10 pt-5 sm:grid sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="text-[9px] uppercase tracking-[0.25em] text-white/30">
                  {stat.label}
                </dt>
                <dd className="mt-1.5 text-xs font-medium leading-snug text-white/70">
                  {stat.value}
                </dd>
              </div>
            ))}
          </div>
        </div>

        <a
          data-hero="cue"
          href="#about"
          className="absolute bottom-10 right-8 hidden flex-col items-center gap-3 text-[9px] uppercase tracking-[0.35em] text-white/30 transition-colors hover:text-white/70 lg:flex"
        >
          Scroll
          <span className="relative h-14 w-px overflow-hidden bg-white/15">
            <span className="absolute inset-x-0 top-0 h-1/2 animate-[float_2.6s_ease-in-out_infinite] bg-aurora-cyan/80" />
          </span>
        </a>
      </div>

      <div className="section-shell mt-10 hidden w-full items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/25 lg:flex">
        <Sparkles className="h-3 w-3 text-aurora-cyan/60" aria-hidden="true" />
        {site.tagline}
      </div>
    </section>
  );
}
