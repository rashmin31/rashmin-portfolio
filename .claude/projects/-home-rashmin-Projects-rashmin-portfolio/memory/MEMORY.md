# Rashmin Portfolio — Claude Memory

## Project Overview
Premium narrative 3D portfolio for Rashmin Bhanderi (Tech Lead / Full Stack Dev).
Single Three.js canvas + GSAP ScrollTrigger drives everything.

## Tech Stack
- Next.js 14.2.35 (App Router, NOT Next.js 15)
- TypeScript 5.x
- Three.js / React Three Fiber 8.x / Drei 9.x
- GSAP 3.12+ with ScrollTrigger
- Lenis smooth scroll
- Tailwind CSS 3.4+
- EmailJS 4.x (client-side)

## Key Files
- `src/styles/globals.css` — Global styles (NOT src/app/globals.css)
- `src/app/layout.tsx` — Root layout, fonts, metadata
- `src/app/page.tsx` — Main page
- `next.config.mjs` — Next.js config (Next.js 14 requires .mjs NOT .ts)
- `tailwind.config.ts` — Custom dark theme
- `src/lib/gsap.ts` — GSAP + plugins (client-side only)
- `src/lib/constants.ts` — Site-wide constants
- `src/lib/emailjs.ts` — EmailJS init

## Architectural Rules (DO NOT VIOLATE)
- SINGLE CANVAS: One R3F Canvas in Scene.tsx, never multiple
- SCROLL: All ScrollTrigger via central ScrollOrchestrator only
- CONTENT: All data in src/data/ only, never hardcode in components
- LENIS+GSAP: Connected in SmoothScrollProvider.tsx

## Folder Structure (per LLD)
src/components/canvas/, sections/, ui/, providers/
src/data/, hooks/, lib/, types/, styles/
public/models/, textures/, fonts/, images/skills/

## Completed Tasks (all EPICs)
- TASK-1.1.1 → 1.1.4, 1.2.1 → 1.2.2: Project init, types, data files, lib files, SmoothScrollProvider, layout
- TASK-2.1.1 → 2.1.4: Scene, Lights, ParticleField, CameraRig, page.tsx with all section stubs
- TASK-3.1.1 → 3.1.2: GeometryAssembly (forwardRef icosahedron), HeroSection (SplitText animation)
- TASK-4.1.1 → 4.2.1: AboutSection (floating image, ScrollTrigger), SkillsSection (chip design)
- TASK-5.1.1 → 5.2.2: ExperienceSection (alternating timeline), ProjectsSection + ProjectModal
- TASK-6.1.1 → 6.2.3: TestimonialsSection, contact API route, useEmailJS hook, ContactSection
- TASK-7.1.1 → 7.1.3: CustomCursor (dot+ring, mix-blend-difference), NavigationDots + useScrollProgress + lenis-store, Loader (useProgress + GSAP exit)
- TASK-8.1.1 → 8.1.2: next.config.mjs (security headers, webpack alias), OG image + full SEO metadata

## Gotchas
- create-next-app conflicts with existing files (CLAUDE.md, .claude/) — scaffold manually
- Next.js 14 uses next.config.mjs NOT next.config.ts (added in Next.js 15)
- emailjs-com@3.2.0 is deprecated (renamed @emailjs/browser) but still works

## Content Placeholders
All data files will have [PLACEHOLDER] markers for Rashmin to replace.
