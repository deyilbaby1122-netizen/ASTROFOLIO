/**
 * ASTROFOLIO content
 * ------------------------------------------------------------------
 * Everything on the site is driven from this file so Ashraf can edit
 * copy, skills, projects and links without touching component code.
 *
 * Replace the placeholder URLs marked PLACEHOLDER with your own links.
 */

import type { IconName } from "@/components/icons";

export const site = {
  name: "Ashraf",
  brand: "ASTROFOLIO",
  location: "Ras Al Khaimah, United Arab Emirates",
  profession: "Web Developer & Graphic Designer",
  headline: "Creative Developer | Digital Designer | Future Innovator",
  tagline: "Turning Imagination Into Digital Reality.",
  intro:
    "Hi, I’m Ashraf. I’m a passionate Web Developer and Graphic Designer who loves creating modern websites, designing beautiful visuals and exploring futuristic technologies. I enjoy turning creative ideas into reality through code, design and innovation. I’m constantly learning, experimenting and building exciting digital experiences.",
  shortIntro:
    "A web developer and graphic designer crafting modern interfaces, striking visuals and immersive digital experiences — always learning, always building.",
  /** Set NEXT_PUBLIC_CONTACT_EMAIL in .env.local to activate the contact form. */
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  socials: [
    // PLACEHOLDER — point these at your own profiles.
    { label: "GitHub", handle: "@your-handle", href: "https://github.com/", icon: "Github" as IconName },
    { label: "LinkedIn", handle: "/in/your-handle", href: "https://www.linkedin.com/", icon: "Linkedin" as IconName },
  ],
} as const;

export const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "journey", label: "Journey" },
  { id: "contact", label: "Contact" },
] as const;

export type SkillCategory = "Development" | "Design";

export type Skill = {
  name: string;
  category: SkillCategory;
  icon: IconName;
  blurb: string;
  accent: string;
};

export const skills: Skill[] = [
  {
    name: "HTML",
    category: "Development",
    icon: "Html",
    blurb: "Semantic, accessible structure that search engines and screen readers both understand.",
    accent: "#fb923c",
  },
  {
    name: "CSS",
    category: "Development",
    icon: "Css",
    blurb: "Layout systems, responsive design, animation and polished glassmorphic surfaces.",
    accent: "#38bdf8",
  },
  {
    name: "JavaScript",
    category: "Development",
    icon: "Javascript",
    blurb: "Interactive behaviour, clean logic and modern ES features in the browser.",
    accent: "#facc15",
  },
  {
    name: "React",
    category: "Development",
    icon: "React",
    blurb: "Component-driven interfaces with reusable state, hooks and smooth interactions.",
    accent: "#61dafb",
  },
  {
    name: "Next.js",
    category: "Development",
    icon: "Nextjs",
    blurb: "Production-ready React apps with routing, rendering strategies and performance in mind.",
    accent: "#e2e8f0",
  },
  {
    name: "Three.js",
    category: "Development",
    icon: "Threejs",
    blurb: "Real-time 3D scenes, lighting and shaders — the layer where the universe comes alive.",
    accent: "#a78bfa",
  },
  {
    name: "UI/UX Design",
    category: "Design",
    icon: "Layout",
    blurb: "Interfaces designed for clarity first, then elevated with motion and detail.",
    accent: "#5eead4",
  },
  {
    name: "Graphic Design",
    category: "Design",
    icon: "Palette",
    blurb: "Visual identity, typography and composition that give ideas a distinctive look.",
    accent: "#f472b6",
  },
  {
    name: "Video Editing",
    category: "Design",
    icon: "Clapperboard",
    blurb: "Rhythm, pacing and motion storytelling for short-form digital content.",
    accent: "#c084fc",
  },
];

export type Interest = { title: string; icon: IconName; note: string };

export const interests: Interest[] = [
  { title: "Website Development", icon: "Code", note: "Building fast, modern web experiences" },
  { title: "3D Web Experiences", icon: "Box", note: "Three.js & real-time immersive scenes" },
  { title: "Artificial Intelligence", icon: "Brain", note: "Exploring AI-powered interfaces" },
  { title: "Futuristic Technology", icon: "Rocket", note: "Where design meets tomorrow" },
  { title: "Graphic Design", icon: "Palette", note: "Visual systems and brand craft" },
  { title: "Gaming", icon: "Gamepad", note: "Playful mechanics and game UI" },
  { title: "Creative Animations", icon: "Sparkles", note: "Motion that guides and delights" },
  { title: "Modern UI/UX", icon: "Layout", note: "Clear, human-centred product design" },
];

export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  status: "Concept" | "In progress" | "Live" | "Personal";
  summary: string;
  description: string;
  tags: string[];
  /** Add real URLs when they exist — nothing is invented here. */
  demoUrl: string | null;
  repoUrl: string | null;
  accent: string;
  index: string;
};

export const projects: Project[] = [
  {
    slug: "futuretech-marketplace",
    title: "FutureTech Marketplace",
    category: "Platform Concept",
    year: "2026",
    status: "Concept",
    summary:
      "A marketplace concept for futuristic AI technology — robots, AI machines and next-generation vehicles.",
    description:
      "An exploration of how a premium technology marketplace could feel: cinematic product reveals, an AI-assisted browsing flow and a clean system for comparing specs across robotics, AI hardware and autonomous vehicles.",
    tags: ["Next.js", "TypeScript", "UI/UX", "3D", "E-commerce"],
    demoUrl: null,
    repoUrl: null,
    accent: "#38bdf8",
    index: "01",
  },
  {
    slug: "ai-chatbot",
    title: "AI Chatbot",
    category: "Product Idea",
    year: "2026",
    status: "In progress",
    summary:
      "An interactive AI assistant concept designed to make conversation feel natural, fast and useful.",
    description:
      "A concept for an AI assistant with a focused chat interface: streaming answers, conversation memory, clear empty states and a calm visual language that keeps attention on the content instead of the chrome.",
    tags: ["React", "AI", "API", "Conversation UI"],
    demoUrl: null,
    repoUrl: null,
    accent: "#a78bfa",
    index: "02",
  },
  {
    slug: "gaming-website",
    title: "Gaming Website",
    category: "Web Platform",
    year: "2026",
    status: "In progress",
    summary:
      "A platform concept featuring browser-based games and a vibrant, high-energy interface.",
    description:
      "A hub concept for browser games: quick loading, playful navigation and a bold visual identity. The focus is on instant play — no downloads, no friction, just a library that feels alive.",
    tags: ["Next.js", "Games", "Motion", "UI/UX"],
    demoUrl: null,
    repoUrl: null,
    accent: "#f472b6",
    index: "03",
  },
  {
    slug: "graphic-design",
    title: "Graphic Design",
    category: "Visual Design",
    year: "2025 — 2026",
    status: "Personal",
    summary:
      "A personal collection of visual design work — posters, compositions, branding and digital artwork.",
    description:
      "A growing body of design experiments built around typography, colour and composition. Each piece is a study in how a simple layout can carry a strong idea, from poster-style graphics to digital brand visuals.",
    tags: ["Branding", "Typography", "Posters", "Visual Identity"],
    demoUrl: null,
    repoUrl: null,
    accent: "#5eead4",
    index: "04",
  },
  {
    slug: "astrofolio",
    title: "ASTROFOLIO",
    category: "3D Portfolio",
    year: "2026",
    status: "Live",
    summary:
      "The site you are looking at — an immersive 3D portfolio set in a living digital universe.",
    description:
      "A personal portfolio built as an experience: a real GLB astronaut rendered with React Three Fiber, cinematic lighting, floating planets, drifting asteroids and glassmorphic interface layers over a deep-space backdrop.",
    tags: ["Next.js", "React Three Fiber", "GSAP", "Tailwind CSS", "3D"],
    demoUrl: null,
    repoUrl: null,
    accent: "#c084fc",
    index: "05",
  },
];

export type JourneyStage = {
  phase: string;
  title: string;
  description: string;
  tags: string[];
};

export const journey: JourneyStage[] = [
  {
    phase: "Phase 01 — Foundation",
    title: "Design first, then code",
    description:
      "Building a foundation in visual design and front-end fundamentals — semantic HTML, modern CSS layout and JavaScript — while turning every idea into something you can actually click.",
    tags: ["HTML", "CSS", "JavaScript", "Graphic Design"],
  },
  {
    phase: "Phase 02 — Expansion",
    title: "From pages to products",
    description:
      "Moving into component architecture with React and Next.js: reusable systems, clean state, accessible interfaces and websites that feel considered from the first pixel to the last.",
    tags: ["React", "Next.js", "TypeScript", "UI/UX"],
  },
  {
    phase: "Phase 03 — Immersion",
    title: "Building worlds in the browser",
    description:
      "Mastering interactive 3D development with Three.js and React Three Fiber — models, lighting, particles and motion, brought together into experiences that are memorable, not just functional.",
    tags: ["Three.js", "React Three Fiber", "GSAP", "Shaders"],
  },
  {
    phase: "Phase 04 — Vision",
    title: "AI, products and creative clients",
    description:
      "Exploring artificial intelligence and emerging technology, then shaping those ideas into innovative digital products and a professional portfolio that opens the door to real client work.",
    tags: ["AI", "Product", "3D", "Client Work"],
  },
];

export const goals: string[] = [
  "Become an excellent web developer",
  "Build professional websites",
  "Master interactive 3D development",
  "Explore AI and emerging technology",
  "Create innovative digital products",
  "Build a strong professional portfolio",
  "Work with clients and grow my creative career",
];

export const stats = [
  { label: "Based in", value: "Ras Al Khaimah, UAE" },
  { label: "Focus", value: "Web + 3D + Design" },
  { label: "Currently", value: "Learning & building daily" },
];
