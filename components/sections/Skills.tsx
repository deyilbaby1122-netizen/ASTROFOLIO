"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { skills, type SkillCategory } from "@/lib/data";
import { Icon } from "@/components/icons";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const filters = ["All", "Development", "Design"] as const;
type Filter = (typeof filters)[number];

export default function Skills() {
  const [filter, setFilter] = useState<Filter>("All");

  const visible = skills.filter(
    (skill) => filter === "All" || skill.category === (filter as SkillCategory),
  );

  return (
    <section id="skills" className="section-pad">
      <div className="section-shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <SectionHeading
              index="02"
              eyebrow="Skills & tools"
              title={
                <>
                  Tools for building
                  <br />
                  <span className="text-gradient-accent">worlds</span>.
                </>
              }
              description="The stack behind the code, the pixels and the motion — chosen for craft, speed and possibility."
            />
          </Reveal>

          <Reveal delay={0.1}>
            <div
              aria-label="Filter skills by category"
              className="flex w-fit items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1 backdrop-blur-md"
            >
              {filters.map((item) => {
                const isActive = filter === item;
                return (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setFilter(item)}
                    className={`relative rounded-full px-4 py-2 text-[11px] font-medium uppercase tracking-[0.16em] transition-colors duration-300 ${
                      isActive ? "text-[#050816]" : "text-white/50 hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="skill-filter"
                        className="absolute inset-0 rounded-full bg-white"
                        transition={{ type: "spring", stiffness: 340, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">{item}</span>
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>

        <motion.div layout className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((skill) => (
              <motion.article
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.96, y: 14 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -8 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -5 }}
                className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.025] p-5 backdrop-blur-xl transition-colors duration-500 hover:border-white/20 sm:p-6"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-10 -top-12 h-40 w-40 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    backgroundImage: `radial-gradient(circle, ${skill.accent}40, transparent 68%)`,
                  }}
                />

                <div className="relative flex items-start justify-between">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-2xl border transition-transform duration-500 group-hover:scale-105"
                    style={{
                      color: skill.accent,
                      borderColor: `${skill.accent}33`,
                      backgroundColor: `${skill.accent}14`,
                      boxShadow: `0 0 32px -16px ${skill.accent}aa`,
                    }}
                  >
                    <Icon name={skill.icon} className="h-6 w-6" />
                  </div>
                  <span className="text-[9px] uppercase tracking-[0.28em] text-white/25">
                    {skill.category === "Design" ? "Design" : "Dev"}
                  </span>
                </div>

                <h3 className="relative mt-5 font-display text-lg font-medium text-white">
                  {skill.name}
                </h3>
                <p className="relative mt-2 text-[12.5px] leading-relaxed text-white/40">
                  {skill.blurb}
                </p>

                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-6 right-6 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-500 group-hover:scale-x-100"
                />
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        <Reveal delay={0.1}>
          <p className="mt-8 flex items-center gap-2 text-[11px] text-white/30">
            <span className="h-1 w-1 rounded-full bg-aurora-cyan/70" />
            Always expanding the stack — currently going deeper into 3D, motion and AI interfaces.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
