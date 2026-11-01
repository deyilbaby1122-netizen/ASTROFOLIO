import { ArrowUpRight, Github, Sparkles } from "lucide-react";
import { projects, type Project } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const statusStyles: Record<Project["status"], string> = {
  Concept: "border-amber-300/20 bg-amber-300/10 text-amber-200/80",
  "In progress": "border-sky-300/20 bg-sky-300/10 text-sky-200/80",
  Live: "border-emerald-300/20 bg-emerald-300/10 text-emerald-200/80",
  Personal: "border-violet-300/20 bg-violet-300/10 text-violet-200/80",
};

function ProjectVisual({ project, large }: { project: Project; large: boolean }) {
  return (
    <div
      className={`relative overflow-hidden border-b border-white/[0.07] ${
        large ? "h-56 sm:h-72" : "h-44"
      }`}
      style={{
        backgroundImage: `radial-gradient(120% 120% at 18% 0%, ${project.accent}2e, transparent 58%), linear-gradient(165deg, #080c1c 0%, #05070f 100%)`,
      }}
    >
      <div aria-hidden="true" className="absolute inset-0 grid-mask opacity-50" />

      <span
        aria-hidden="true"
        className={`absolute right-5 top-3 font-display font-bold leading-none text-white/[0.07] ${
          large ? "text-[7rem]" : "text-[5rem]"
        }`}
      >
        {project.index}
      </span>

      <div className="absolute inset-x-5 top-5 flex items-center gap-2">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.18em] ${statusStyles[project.status]}`}
        >
          <span className="h-1 w-1 rounded-full bg-current" />
          {project.status}
        </span>
        <span className="text-[9px] uppercase tracking-[0.22em] text-white/30">
          {project.category}
        </span>
      </div>

      <div
        aria-hidden="true"
        className={`absolute left-1/2 top-1/2 transition-transform duration-700 ease-out group-hover:scale-110 ${
          large ? "h-32 w-32 sm:h-36 sm:w-36" : "h-24 w-24"
        } -translate-x-1/2 -translate-y-1/2`}
      >
        <div
          className="h-full w-full rounded-full opacity-90"
          style={{
            background: `radial-gradient(circle at 32% 26%, rgba(255,255,255,0.85), ${project.accent} 30%, #0b1024 82%)`,
            boxShadow: `0 0 90px -12px ${project.accent}`,
          }}
        />
        <div className="absolute inset-[-16px] rounded-full border border-white/10" />
        <div className="absolute inset-[-34px] animate-spin-slow rounded-full border border-dashed border-white/[0.08]" />
        <div className="absolute inset-[-54px] rounded-full border border-white/[0.04]" />
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[#05070f] via-transparent to-transparent"
      />
    </div>
  );
}

function ProjectCard({ project, featured }: { project: Project; featured?: boolean }) {
  const hasLinks = Boolean(project.demoUrl || project.repoUrl);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-[#070a16]/70 backdrop-blur-xl transition-colors duration-500 hover:border-white/20">
      <ProjectVisual project={project} large={Boolean(featured)} />

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-xl font-medium text-white sm:text-2xl">
            {project.title}
          </h3>
          <span className="shrink-0 text-[10px] tracking-[0.2em] text-white/25">
            {project.year}
          </span>
        </div>

        <p className="mt-3 text-[13px] leading-relaxed text-white/45">{project.description}</p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[9px] uppercase tracking-[0.14em] text-white/45"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-4 border-t border-white/[0.06] pt-4 text-[11px]">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 text-white/70 transition-colors hover:text-aurora-cyan"
            >
              Live demo
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 text-white/70 transition-colors hover:text-aurora-cyan"
            >
              <Github className="h-3.5 w-3.5" aria-hidden="true" />
              Source
            </a>
          )}
          {!hasLinks && (
            <span className="text-white/30">
              {project.status === "Concept"
                ? "Concept — links shared on request"
                : "Details shared on request"}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section-pad">
      <div className="section-shell">
        <Reveal>
          <SectionHeading
            index="03"
            eyebrow="Projects"
            title={
              <>
                Selected <span className="text-gradient-accent">missions</span>.
              </>
            }
            description="Concepts, experiments and personal builds. Each one is a step deeper into code, design and 3D — live links are added as projects ship, nothing is rushed to look finished."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal
              key={project.slug}
              delay={(index % 3) * 0.06}
              className={index === 0 ? "md:col-span-2" : ""}
            >
              <ProjectCard project={project} featured={index === 0} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="glass mt-6 flex flex-col items-start justify-between gap-5 p-6 sm:flex-row sm:items-center sm:p-7">
            <div className="flex items-start gap-4">
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-aurora-cyan">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
              </span>
              <div>
                <p className="font-display text-base text-white">
                  More missions are being assembled.
                </p>
                <p className="mt-1 max-w-xl text-xs leading-relaxed text-white/40">
                  This portfolio grows as I learn. If you would like to see a concept in detail,
                  or collaborate on something new, let’s talk.
                </p>
              </div>
            </div>
            <a href="#contact" className="btn-ghost shrink-0">
              Start a conversation
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
