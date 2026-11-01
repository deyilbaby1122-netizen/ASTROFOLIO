import { Compass, MapPin, Orbit, Sparkles } from "lucide-react";
import { interests, site, stats } from "@/lib/data";
import { Icon } from "@/components/icons";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

export default function About() {
  return (
    <section id="about" className="section-pad">
      <div className="section-shell">
        <Reveal>
          <SectionHeading
            index="01"
            eyebrow="About me"
            title={
              <>
                A creative mind
                <br />
                in <span className="text-gradient-accent">orbit</span>.
              </>
            }
            description="Part developer, part designer — I live where clean code meets strong visual storytelling."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 lg:mt-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-7" delay={0.05}>
            <div className="glass-strong h-full p-6 sm:p-9">
              <p className="text-base leading-relaxed text-white/65 sm:text-lg sm:leading-relaxed">
                {site.intro}
              </p>

              <figure className="mt-8 border-l-2 border-aurora-cyan/60 pl-5">
                <blockquote className="font-display text-xl leading-snug text-white sm:text-2xl">
                  “{site.tagline}”
                </blockquote>
                <figcaption className="mt-3 text-[11px] uppercase tracking-[0.3em] text-white/35">
                  Ashraf — Creative Developer
                </figcaption>
              </figure>

              <div className="mt-8 flex flex-wrap gap-2">
                {["Web Development", "Graphic Design", "3D Web", "UI/UX"].map((interest) => (
                  <span key={interest} className="tag">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-5" delay={0.12}>
            <div className="glass relative h-full overflow-hidden p-6 sm:p-7">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.22),transparent_65%)] blur-2xl"
              />

              <div className="flex items-center justify-between">
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                  Mission profile
                </p>
                <Orbit className="h-4 w-4 text-aurora-cyan/70" aria-hidden="true" />
              </div>

              <dl className="mt-6 space-y-5">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white/35" aria-hidden="true" />
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.25em] text-white/30">
                      Based in
                    </dt>
                    <dd className="mt-1 text-sm text-white/75">{site.location}</dd>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-white/35" aria-hidden="true" />
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.25em] text-white/30">
                      Focus
                    </dt>
                    <dd className="mt-1 text-sm text-white/75">{site.headline}</dd>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Compass className="mt-0.5 h-4 w-4 shrink-0 text-white/35" aria-hidden="true" />
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.25em] text-white/30">
                      Right now
                    </dt>
                    <dd className="mt-1 text-sm text-white/75">
                      Learning, experimenting and building something new every week.
                    </dd>
                  </div>
                </div>
              </dl>

              <div className="hairline my-6" />

              <ul className="grid grid-cols-1 gap-3">
                {stats.slice(0, 2).map((stat) => (
                  <li key={stat.label} className="flex items-baseline justify-between gap-4">
                    <span className="text-[10px] uppercase tracking-[0.22em] text-white/30">
                      {stat.label}
                    </span>
                    <span className="text-right text-xs text-white/65">{stat.value}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-center gap-2 rounded-2xl border border-aurora-cyan/15 bg-aurora-cyan/[0.06] px-4 py-3">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-aurora-cyan" />
                <p className="text-[11px] text-white/55">Open to creative collaborations</p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-16 sm:mt-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h3 className="font-display text-xl font-medium text-white sm:text-2xl">
              Signals I follow
            </h3>
            <p className="max-w-sm text-xs leading-relaxed text-white/35">
              The ideas and disciplines that keep me curious — and shape what I build next.
            </p>
          </div>
        </Reveal>

        <div className="mt-7 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {interests.map((interest, index) => (
            <Reveal key={interest.title} delay={index * 0.04}>
              <div className="group glass card-hover h-full p-4 sm:p-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/60 transition-colors duration-300 group-hover:border-aurora-cyan/30 group-hover:text-aurora-cyan">
                  <Icon name={interest.icon} className="h-4 w-4" />
                </div>
                <p className="mt-4 text-sm font-medium text-white/85">{interest.title}</p>
                <p className="mt-1 text-[11px] leading-relaxed text-white/35">{interest.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
