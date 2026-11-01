import { ArrowUp } from "lucide-react";
import { Icon } from "@/components/icons";
import { navLinks, site } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 overflow-hidden border-t border-white/[0.06] bg-[#04050d]/70 backdrop-blur-xl">
      <div className="section-shell py-14 sm:py-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-md">
            <a
              href="#home"
              className="font-display text-sm font-semibold tracking-[0.35em] text-white"
            >
              ASTROFOLIO
            </a>
            <p className="mt-4 font-display text-lg leading-relaxed text-white/60">
              {site.tagline}
            </p>
            <p className="mt-2 text-sm text-white/35">
              {site.profession} · {site.location}
            </p>
          </div>

          <div className="flex flex-wrap gap-12 sm:gap-16">
            <nav aria-label="Footer">
              <p className="text-[10px] uppercase tracking-[0.35em] text-white/30">Navigate</p>
              <ul className="mt-4 grid grid-cols-2 gap-x-10 gap-y-2.5 text-sm">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      className="text-white/55 transition-colors hover:text-aurora-cyan"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="text-[10px] uppercase tracking-[0.35em] text-white/30">Connect</p>
              <ul className="mt-4 space-y-2.5 text-sm">
                {site.socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="flex items-center gap-2 text-white/55 transition-colors hover:text-aurora-cyan"
                    >
                      <Icon name={social.icon} className="h-4 w-4" />
                      {social.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="#contact"
                    className="text-white/55 transition-colors hover:text-aurora-cyan"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 overflow-hidden">
          <p
            aria-hidden="true"
            className="select-none bg-gradient-to-b from-white/[0.09] to-transparent bg-clip-text text-center font-display text-[16vw] font-bold leading-[0.85] tracking-tight text-transparent"
          >
            ASTROFOLIO
          </p>
        </div>

        <div className="hairline mt-8" />

        <div className="mt-6 flex flex-col items-center justify-between gap-4 text-[11px] text-white/35 sm:flex-row">
          <p>
            © {year} Ashraf · ASTROFOLIO. Designed &amp; built with code, design and curiosity.
          </p>
          <div className="flex items-center gap-5">
            <span className="hidden items-center gap-2 sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-aurora-cyan shadow-[0_0_8px_1px_rgba(94,234,212,0.8)]" />
              Based in Ras Al Khaimah, UAE
            </span>
            <a
              href="#home"
              className="flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-white/60 transition-colors hover:border-white/25 hover:text-white"
            >
              Back to orbit
              <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
