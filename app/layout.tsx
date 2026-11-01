import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import ScrollProgress from "@/components/ScrollProgress";
import SceneMount from "@/components/three/SceneMount";
import { site } from "@/lib/data";

const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sora",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const description =
  "ASTROFOLIO — the immersive 3D portfolio of Ashraf, a creative web developer and graphic designer based in Ras Al Khaimah, UAE. Modern websites, bold visual design and futuristic digital experiences.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ashraf — Creative Web Developer & Graphic Designer | ASTROFOLIO",
    template: "%s | ASTROFOLIO",
  },
  description,
  applicationName: "ASTROFOLIO",
  authors: [{ name: "Ashraf" }],
  creator: "Ashraf",
  keywords: [
    "Ashraf",
    "ASTROFOLIO",
    "web developer",
    "graphic designer",
    "portfolio",
    "3D portfolio",
    "React developer",
    "Next.js developer",
    "Three.js",
    "UI/UX design",
    "Ras Al Khaimah",
    "United Arab Emirates",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "ASTROFOLIO",
    title: "Ashraf — Creative Web Developer & Graphic Designer",
    description,
  },
  twitter: {
    card: "summary",
    title: "Ashraf — Creative Web Developer & Graphic Designer",
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#04050d",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>

        <div className="atmosphere" aria-hidden="true">
          <div className="absolute -left-[22%] top-[6%] h-[68vmax] w-[68vmax] rounded-full bg-[radial-gradient(circle,rgba(88,28,135,0.34),transparent_62%)] blur-[70px]" />
          <div className="absolute -right-[12%] -top-[8%] h-[58vmax] w-[58vmax] rounded-full bg-[radial-gradient(circle,rgba(14,116,144,0.3),transparent_60%)] blur-[80px]" />
          <div className="absolute -bottom-[24%] left-[22%] h-[62vmax] w-[62vmax] rounded-full bg-[radial-gradient(circle,rgba(190,24,93,0.16),transparent_65%)] blur-[90px]" />
          <div className="absolute inset-0 grid-mask opacity-40" />
        </div>

        <SceneMount />
        <ScrollProgress />
        <Preloader />
        <Navbar />

        <main id="main" className="relative z-10">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
