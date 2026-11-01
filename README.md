# ASTROFOLIO — Ashraf's 3D Portfolio

An immersive, outer-space portfolio for **Ashraf**, creative web developer and graphic designer based in Ras Al Khaimah, UAE.

Built with Next.js, React, TypeScript, Tailwind CSS, Three.js, React Three Fiber, Drei, GSAP and Framer Motion.

## What's inside

- **Real 3D astronaut** — a GLB model (`public/models/astronaut.glb`) rendered with React Three Fiber, normalised, lit, self-shadowed and animated with a floating idle, pointer parallax and a scroll-driven exit. No static image substitutes.
- **Living universe** — procedural starfield, floating planets with an atmospheric rim and ring, a drifting instanced asteroid belt, sparkle particles, neon rim lighting and a cursor-reactive camera.
- **Cinematic UI** — glassmorphic panels, gradient typography, GSAP hero timeline, a GSAP ScrollTrigger progress line, Framer Motion reveals, hover states and a branded boot screen.
- **Sections** — Home, About (with interests), Skills (filterable), Projects (5 concepts), My Journey (learning phases + goals), Contact.
- **Responsive & accessible** — mobile navigation, reduced-motion support, semantic landmarks, visible focus states, skip link.
- **SEO** — metadata, Open Graph/Twitter tags, JSON-LD (Person + ProfilePage + WebSite), `robots.txt` and `sitemap.xml`.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Production build:

```bash
npm run build
npm start
```

## Configure before deploying

Create `.env.local` (copy `.env.example`):

```env
# Where contact-form messages should be sent when the form is submitted.
NEXT_PUBLIC_CONTACT_EMAIL=your@email.com

# Public URL of the deployed site (used for SEO metadata, sitemap, robots).
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

The contact form opens the visitor's email app with the message pre-filled. Until
`NEXT_PUBLIC_CONTACT_EMAIL` is set, the form shows a note pointing visitors to the social
links instead of pretending a message was delivered.

### Placeholders to replace

In `lib/data.ts`:

- `site.socials` — currently `github.com` / `linkedin.com` homepages with example handles. Point them at your real profiles.
- `projects[].demoUrl` / `projects[].repoUrl` — all `null` on purpose. Nothing is presented as launched; links and project details appear automatically once you fill them in.
- `projects[].description`, `tags`, `status`, `year` — editable copy for each project.

No surname, employer, qualification, testimonial or email address is invented anywhere in the site.

## Project structure

```
app/
  layout.tsx          fonts, metadata, chrome, global scene
  page.tsx            sections + JSON-LD
  globals.css         design tokens, glass utilities, atmosphere
  robots.ts, sitemap.ts, icon.svg
components/
  Navbar.tsx, Footer.tsx, Preloader.tsx, ScrollProgress.tsx
  icons.tsx           brand + UI icon registry
  sections/           Hero, About, Skills, Projects, Journey, Contact
  three/              Canvas, astronaut, planets, asteroids, scene lighting
  ui/                 Reveal, SectionHeading, Magnetic
lib/data.ts           all editable content
public/models/        astronaut.glb
```

## 3D model credit

`public/models/astronaut.glb` is the Astronaut shared asset from Google's
[model-viewer](https://github.com/google/model-viewer/tree/master/packages/shared-assets/models)
project. Review that repository's asset licensing before commercial use, and replace the file
(or point `MODEL_URL` in `components/three/Astronaut.tsx` at another `.glb`) if you prefer a
different model. The loader normalises any humanoid GLB to the same height automatically.

## Deploy

The project is Vercel-ready: import the repository, add the two environment variables, and
deploy. No server or database is required.
