import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Journey from "@/components/sections/Journey";
import Contact from "@/components/sections/Contact";
import { site, skills } from "@/lib/data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "ASTROFOLIO",
      description:
        "The immersive 3D portfolio of Ashraf, a creative web developer and graphic designer.",
      inLanguage: "en",
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}/#profile`,
      url: siteUrl,
      name: "Ashraf — Creative Web Developer & Graphic Designer",
      isPartOf: { "@id": `${siteUrl}/#website` },
      mainEntity: {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: "Ashraf",
        jobTitle: "Web Developer & Graphic Designer",
        description: site.shortIntro,
        url: siteUrl,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Ras Al Khaimah",
          addressCountry: "AE",
        },
        knowsAbout: skills.map((skill) => skill.name),
      },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Journey />
      <Contact />
    </>
  );
}
