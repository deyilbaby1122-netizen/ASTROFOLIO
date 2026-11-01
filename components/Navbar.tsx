"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navLinks, site } from "@/lib/data";
import { Icon } from "@/components/icons";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="section-shell">
        <nav
          aria-label="Primary"
          className={`mt-3 flex items-center justify-between gap-3 rounded-full border px-3 py-2.5 transition-all duration-500 sm:mt-4 sm:px-4 ${
            scrolled || open
              ? "border-white/12 bg-[#05070f]/80 shadow-[0_24px_60px_-40px_rgba(56,189,248,0.8)] backdrop-blur-2xl"
              : "border-white/[0.07] bg-white/[0.02] backdrop-blur-md"
          }`}
        >
          <a
            href="#home"
            className="group flex shrink-0 items-center gap-2.5 rounded-full py-1 pl-1 pr-2"
            aria-label="ASTROFOLIO — back to top"
          >
            <span className="relative flex h-8 w-8 items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-gradient-to-br from-aurora-cyan via-aurora-sky to-aurora-violet opacity-90 transition-transform duration-500 group-hover:scale-105" />
              <span className="absolute inset-[3px] rounded-full bg-[#04050d]" />
              <span className="relative h-2 w-2 rounded-full bg-aurora-cyan shadow-[0_0_10px_2px_rgba(94,234,212,0.7)]" />
            </span>
            <span className="font-display text-[12px] font-semibold tracking-[0.3em] text-white sm:text-[13px]">
              ASTROFOLIO
            </span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const isActive = active === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    aria-current={isActive ? "location" : undefined}
                    className={`relative flex items-center rounded-full px-4 py-2 text-[12px] font-medium tracking-[0.12em] uppercase transition-colors duration-300 ${
                      isActive ? "text-white" : "text-white/55 hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.06]"
                        transition={{ type: "spring", stiffness: 320, damping: 30 }}
                      />
                    )}
                    <span className="relative">{link.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="hidden items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-[12px] font-medium tracking-wide text-white transition-colors duration-300 hover:border-aurora-cyan/40 hover:bg-aurora-cyan/10 sm:inline-flex"
            >
              Let&apos;s talk
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition-colors hover:bg-white/10 lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="section-shell lg:hidden"
          >
            <div className="mt-3 overflow-hidden rounded-3xl border border-white/10 bg-[#05070f]/95 p-6 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)] backdrop-blur-2xl">
              <ul className="flex flex-col">
                {navLinks.map((link, index) => (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between border-b border-white/[0.06] py-4 text-lg text-white/80 transition-colors hover:text-aurora-cyan"
                    >
                      <span className="font-display">{link.label}</span>
                      <span className="text-[10px] tracking-[0.3em] text-white/30">
                        0{index + 1}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                {site.socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-white/70 transition-colors hover:text-white"
                  >
                    <Icon name={social.icon} className="h-3.5 w-3.5" />
                    {social.label}
                  </a>
                ))}
              </div>

              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="btn-primary mt-6 w-full"
              >
                Open a channel
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
