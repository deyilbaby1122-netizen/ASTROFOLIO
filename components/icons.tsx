import type { SVGProps } from "react";
import {
  Box,
  Brain,
  Clapperboard,
  Code,
  Gamepad2,
  Github,
  LayoutDashboard,
  Linkedin,
  Palette,
  Rocket,
  Sparkles,
} from "lucide-react";

type StrokeProps = SVGProps<SVGSVGElement>;

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

function Html(props: StrokeProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <g {...stroke}>
        <path d="M4 3h16l-1.5 17L12 22l-6.5-2L4 3Z" />
        <path d="M8.6 8h6.8l-.4 4H9.2m.2 3.4.5 3.6 2.1.6 2.1-.6.2-2.2" />
      </g>
    </svg>
  );
}

function Css(props: StrokeProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <g {...stroke}>
        <path d="M4 3h16l-1.5 17L12 22l-6.5-2L4 3Z" />
        <path d="M15.6 7.5H8.4l.3 3.6h6.4l-.4 4-2.7.9-2.7-.9-.15-1.7" />
      </g>
    </svg>
  );
}

function Javascript(props: StrokeProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <g {...stroke}>
        <rect x="3" y="3" width="18" height="18" rx="4" />
        <path d="M10 9v5.3c0 1.2-.7 1.9-1.9 1.9-.9 0-1.4-.4-1.8-1.1" />
        <path d="M14.4 15.3c.5.6 1.3.9 2.1.9 1.1 0 1.9-.6 1.9-1.5 0-.8-.5-1.3-1.7-1.8l-.5-.2c-1.2-.5-1.9-1.2-1.9-2.4 0-1.4 1.1-2.3 2.7-2.3.8 0 1.5.2 2 .7" />
      </g>
    </svg>
  );
}

function ReactIcon(props: StrokeProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <g {...stroke}>
        <circle cx="12" cy="12" r="1.8" />
        <ellipse cx="12" cy="12" rx="9.4" ry="3.9" />
        <ellipse cx="12" cy="12" rx="9.4" ry="3.9" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="9.4" ry="3.9" transform="rotate(120 12 12)" />
      </g>
    </svg>
  );
}

function Nextjs(props: StrokeProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <g {...stroke}>
        <circle cx="12" cy="12" r="9.3" />
        <path d="M8.6 16.4V7.6l7.1 9" />
        <path d="M15.4 7.6v4.4" />
      </g>
    </svg>
  );
}

function Threejs(props: StrokeProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <g {...stroke}>
        <path d="M12 2.6 21 19H3l9-16.4Z" />
        <path d="M12 8.2 7.2 16.4h9.6L12 8.2Z" />
        <path d="M12 2.6v5.6M3 19l4.2-2.6M21 19l-4.2-2.6" />
      </g>
    </svg>
  );
}

const iconMap = {
  Html,
  Css,
  Javascript,
  React: ReactIcon,
  Nextjs,
  Threejs,
  Layout: LayoutDashboard,
  Palette,
  Clapperboard,
  Code,
  Box,
  Brain,
  Rocket,
  Gamepad: Gamepad2,
  Sparkles,
  Github,
  Linkedin,
} satisfies Record<string, React.ComponentType<SVGProps<SVGSVGElement>>>;

export type IconName = keyof typeof iconMap;

export function Icon({
  name,
  className,
  ...props
}: { name: IconName } & SVGProps<SVGSVGElement>) {
  const Component = iconMap[name];
  return <Component className={className} {...props} />;
}
