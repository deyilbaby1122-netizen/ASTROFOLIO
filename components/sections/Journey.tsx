"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Target } from "lucide-react";
import { goals, journey } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Journey() {
  const root = useRef<HTMLDivElement>(null);
  const line = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      if (!line.current) return;
      gsap.fromTo(
        line.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 72%",
            end: "bottom 72%",
            scrub: 0.6,
          },
        },
      );
    }, root);

    return () => context.revert();
  }, []);

  return (
    <section id="journey" className="section-pad">
      <div className="section-shell">
        <Reveal>
          <SectionHeading
            index="04"
            eyebrow="My journey"
            title={
              <>
                The <span className="text-gradient-accent">trajectory</span>.
              </>
            }
            description="A learning path measured in curiosity, not milestones — from design fundamentals to interactive 3D and beyond."
          />
        </Reveal>

        <div ref={root} className="relative mt-14 pl-10 sm:pl-12">
          <div className="absolute bottom-2 left-[11px] top-2 w-px bg-white/[0.08]">
            <div
              ref={line}
              className="h-full w-full origin-top bg-gradient-to-b from-aurora-cyan via-aurora-sky to-aurora-violet shadow-[0_0_12px_1px_rgba(56,189,248,0.4)]"
            />
          </div>

          <ol className="space-y-5">
            {journey.map((stage, index) => (
              <li key={stage.phase} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-10 top-7 flex h-[22px] w-[22px] items-center justify-center rounded-full border border-white/15 bg-[#060913] sm:-left-12"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-aurora-cyan shadow-[0_0_10px_2px_rgba(94,234,212,0.7)]" />
                </span>

                <Reveal delay={index * 0.05}>
                  <div className="group glass card-hover overflow-hidden p-5 sm:p-7">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="text-[10px] uppercase tracking-[0.28em] text-aurora-cyan/70">
                        {stage.phase}
                      </p>
                      <span className="font-display text-[10px] tracking-[0.3em] text-white/20">
                        0{index + 1}
                      </span>
                    </div>

                    <h3 className="mt-3 font-display text-lg text-white sm:text-xl">
                      {stage.title}
                    </h3>
                    <p className="mt-2.5 max-w-2xl text-[13px] leading-relaxed text-white/45">
                      {stage.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {stage.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[9px] uppercase tracking-[0.14em] text-white/40"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        <Reveal className="mt-14">
          <div className="glass-strong relative overflow-hidden p-6 sm:p-9">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-20 -top-24 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.2),transparent_65%)] blur-2xl"
            />

            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow">Flight plan</p>
                <h3 className="mt-4 font-display text-xl text-white sm:text-2xl">
                  Where this is heading
                </h3>
              </div>
              <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-white/45">
                <Target className="h-3.5 w-3.5 text-aurora-cyan" aria-hidden="true" />
                Long-term goals
              </span>
            </div>

            <ol className="mt-7 grid gap-x-10 sm:grid-cols-2">
              {goals.map((goal, index) => (
                <li
                  key={goal}
                  className="group flex items-center gap-4 border-b border-white/[0.06] py-3.5 last:border-b-0"
                >
                  <span className="font-display text-[10px] tracking-[0.2em] text-white/25">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[13px] text-white/65 transition-colors duration-300 group-hover:text-white">
                    {goal}
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="ml-auto h-3.5 w-3.5 text-white/15 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-aurora-cyan/70"
                  />
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
