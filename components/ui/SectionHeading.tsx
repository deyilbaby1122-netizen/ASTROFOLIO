import type { ReactNode } from "react";

type SectionHeadingProps = {
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export default function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  return (
    <div
      className={`${align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-3xl"} ${className}`}
    >
      <p className={`eyebrow ${align === "center" ? "justify-center" : ""}`}>
        <span className="text-aurora-cyan/80">{index}</span>
        <span>{eyebrow}</span>
      </p>

      <h2 className="mt-5 font-display text-3xl font-semibold leading-[1.08] tracking-[-0.02em] sm:text-4xl lg:text-5xl">
        {title}
      </h2>

      {description && (
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/50 sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}
