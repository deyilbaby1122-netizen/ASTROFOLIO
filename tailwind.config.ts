import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#04050d",
        midnight: "#070a18",
        aurora: {
          cyan: "#5eead4",
          sky: "#38bdf8",
          violet: "#a78bfa",
          pink: "#f472b6",
        },
      },
      fontFamily: {
        display: ["var(--font-sora)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        widest: "0.28em",
      },
      // Full 0–100 opacity scale so every /N colour modifier works.
      opacity: Object.fromEntries(
        Array.from({ length: 101 }, (_, index) => [String(index), String(index / 100)]),
      ),
      boxShadow: {
        glass: "0 24px 80px -32px rgba(56, 189, 248, 0.45)",
        glow: "0 0 40px -8px rgba(94, 234, 212, 0.55)",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)",
      },
      animation: {
        float: "float 9s ease-in-out infinite",
        "spin-slow": "spin 32s linear infinite",
        shimmer: "shimmer 3.5s linear infinite",
        "pulse-soft": "pulseSoft 4s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -14px, 0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.45" },
          "50%": { opacity: "0.9" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
