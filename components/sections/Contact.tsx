"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, Mail, MapPin, Send } from "lucide-react";
import { site } from "@/lib/data";
import { Icon } from "@/components/icons";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

type FormState = { name: string; email: string; message: string };
type FormErrors = Partial<Record<keyof FormState, string>>;
type Status = "idle" | "opened" | "unconfigured";

const emptyForm: FormState = { name: "", email: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  const update = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setStatus("idle");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: FormErrors = {};
    if (form.name.trim().length < 2) nextErrors.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (form.message.trim().length < 10) {
      nextErrors.message = "Tell me a little more — at least 10 characters.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    if (!site.email) {
      setStatus("unconfigured");
      return;
    }

    const subject = encodeURIComponent(`ASTROFOLIO — message from ${form.name.trim()}`);
    const body = encodeURIComponent(
      `${form.message.trim()}\n\n— ${form.name.trim()}\n${form.email.trim()}`,
    );

    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setStatus("opened");
  };

  const inputClass =
    "w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none transition-colors duration-300 focus:border-aurora-cyan/50 focus:bg-white/[0.05]";

  return (
    <section id="contact" className="section-pad pb-24 sm:pb-28">
      <div className="section-shell">
        <Reveal>
          <SectionHeading
            index="05"
            eyebrow="Contact"
            title={
              <>
                Open a <span className="text-gradient-accent">channel</span>.
              </>
            }
            description="Have a project, an idea or just want to say hello? Send a signal — I’m always happy to talk design, code and new possibilities."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-12">
          <Reveal className="lg:col-span-5" delay={0.05}>
            <div className="flex h-full flex-col gap-5">
              <div className="glass-strong p-6 sm:p-7">
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-aurora-cyan">
                    <Mail className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.28em] text-white/35">
                      Direct
                    </p>
                    {site.email ? (
                      <a
                        href={`mailto:${site.email}`}
                        className="mt-1 block break-all text-sm text-white/80 transition-colors hover:text-aurora-cyan"
                      >
                        {site.email}
                      </a>
                    ) : (
                      <p className="mt-1 text-sm text-white/55">
                        Reach out through the social links below.
                      </p>
                    )}
                  </div>
                </div>

                <div className="hairline my-6" />

                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-aurora-violet">
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.28em] text-white/35">
                      Based in
                    </p>
                    <p className="mt-1 text-sm text-white/80">{site.location}</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {site.socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group glass card-hover flex items-center justify-between gap-3 p-4"
                  >
                    <span className="flex items-center gap-3">
                      <Icon
                        name={social.icon}
                        className="h-4 w-4 text-white/60 transition-colors group-hover:text-aurora-cyan"
                      />
                      <span>
                        <span className="block text-sm text-white/85">{social.label}</span>
                        <span className="block text-[10px] text-white/30">{social.handle}</span>
                      </span>
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-4 w-4 text-white/25 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white/70"
                    />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={0.1}>
            <form onSubmit={handleSubmit} noValidate className="glass-strong h-full p-6 sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-2 block text-[10px] uppercase tracking-[0.25em] text-white/40"
                  >
                    Your name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Ada Lovelace"
                    value={form.name}
                    onChange={(event) => update("name", event.target.value)}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "contact-name-error" : undefined}
                    className={inputClass}
                  />
                  {errors.name && (
                    <p id="contact-name-error" className="mt-2 text-[11px] text-rose-300/90">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-2 block text-[10px] uppercase tracking-[0.25em] text-white/40"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(event) => update("email", event.target.value)}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "contact-email-error" : undefined}
                    className={inputClass}
                  />
                  {errors.email && (
                    <p id="contact-email-error" className="mt-2 text-[11px] text-rose-300/90">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="contact-message"
                  className="mb-2 block text-[10px] uppercase tracking-[0.25em] text-white/40"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={6}
                  placeholder="Tell me about your idea, project or collaboration…"
                  value={form.message}
                  onChange={(event) => update("message", event.target.value)}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "contact-message-error" : undefined}
                  className={`${inputClass} resize-none`}
                />
                {errors.message && (
                  <p id="contact-message-error" className="mt-2 text-[11px] text-rose-300/90">
                    {errors.message}
                  </p>
                )}
              </div>

              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[11px] leading-relaxed text-white/30">
                  Your details are used only to reply to your message.
                </p>
                <button type="submit" className="btn-primary shrink-0">
                  Send signal
                  <Send className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              <div aria-live="polite" className="min-h-[20px]">
                {status === "opened" && (
                  <p className="mt-4 rounded-2xl border border-emerald-300/20 bg-emerald-300/[0.07] px-4 py-3 text-[11px] text-emerald-200/90">
                    Your email app should open with the message ready to send.
                  </p>
                )}
                {status === "unconfigured" && (
                  <p className="mt-4 rounded-2xl border border-amber-300/20 bg-amber-300/[0.07] px-4 py-3 text-[11px] text-amber-200/90">
                    Direct email isn’t connected yet. Please reach out through{" "}
                    <a
                      href={site.socials[0]?.href ?? "#contact"}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="underline decoration-amber-200/40 underline-offset-2 hover:text-amber-100"
                    >
                      GitHub
                    </a>{" "}
                    or{" "}
                    <a
                      href={site.socials[1]?.href ?? "#contact"}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="underline decoration-amber-200/40 underline-offset-2 hover:text-amber-100"
                    >
                      LinkedIn
                    </a>{" "}
                    in the meantime.
                  </p>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
