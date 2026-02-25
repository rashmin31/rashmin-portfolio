# RASHMIN-PORTFOLIO — CLAUDE.md
# AI Agent Context File — READ THIS FIRST BEFORE MAKING ANY CHANGES

## What This Project Is
A premium, narrative-driven 3D portfolio website for Rashmin Bhanderi, Tech Lead
and Full Stack Developer. This is NOT a standard portfolio. It is an immersive
storytelling experience where a single Three.js canvas persists across the entire
page, and GSAP ScrollTrigger drives both the 3D scene and HTML content in perfect
synchronization as the user scrolls — like watching a system architect's universe
assemble itself. The visual metaphor: dark, fragmented data/code that assembles
into order and structure as you journey through Rashmin's story.

## Tech Stack
- Framework: Next.js 14 (App Router)
- Language: TypeScript 5.x
- 3D: Three.js 0.161+ via React Three Fiber 8.x + Drei 9.x
- Animation: GSAP 3.12+ with ScrollTrigger plugin + Lenis smooth scroll
- Styling: Tailwind CSS 3.4+
- Email: EmailJS 4.x (client-side send, server-side validation only)
- Hosting: Vercel (auto-deploy from main branch)

## Project Structure
```
rashmin-portfolio/
├── public/
│   ├── models/          — GLTF/GLB 3D model files
│   ├── textures/        — Three.js texture maps
│   ├── fonts/           — Local font files
│   └── images/          — Project screenshots, profile photo, skill icons
├── src/
│   ├── app/
│   │   ├── layout.tsx           — Root layout, metadata, font loading
│   │   ├── page.tsx             — Main page, assembles all sections
│   │   └── api/contact/route.ts — Contact form server-side validation
│   ├── components/
│   │   ├── canvas/              — All Three.js / R3F components
│   │   ├── sections/            — All HTML content sections
│   │   ├── ui/                  — Shared UI (cursor, modal, loader, nav dots)
│   │   └── providers/           — GSAP context, Lenis smooth scroll
│   ├── data/                    — ALL CONTENT LIVES HERE (edit these files)
│   ├── hooks/                   — Custom React hooks
│   ├── lib/                     — GSAP init, EmailJS init, constants
│   ├── types/                   — TypeScript type definitions
│   └── styles/globals.css       — Global styles, CSS variables
└── docs/                        — All documentation files
```

## Naming Conventions
- Files: kebab-case (hero-section.tsx → but we use PascalCase for components: HeroSection.tsx)
- Components: PascalCase (HeroSection, ProjectModal)
- Functions: camelCase (sendContactEmail, initScrollTimeline)
- CSS classes: Tailwind utility classes only; custom classes in globals.css use kebab-case
- Types: PascalCase with T prefix (TProject, TExperience, TSkill)
- Data constants: SCREAMING_SNAKE_CASE (PROJECTS, EXPERIENCE, SKILLS)
- Hooks: camelCase with use prefix (useScrollProgress, useGSAPTimeline)

## How to Run
```bash
npm install
cp .env.local.example .env.local
# Fill in EmailJS values in .env.local
npm run dev
```

## How to Build and Deploy
```bash
npm run build    # verify no build errors before pushing
git push origin main    # Vercel auto-deploys
```

## Environment Variables Needed
```
NEXT_PUBLIC_EMAILJS_SERVICE_ID      — EmailJS service ID from dashboard
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID     — Template ID for outbound email to Rashmin
NEXT_PUBLIC_EMAILJS_AUTOREPLY_TEMPLATE_ID — Template ID for auto-reply to sender
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY      — EmailJS public key (safe to expose, by design)
```

## Key Architectural Decisions
- SINGLE CANVAS: One R3F Canvas component mounts once and never unmounts.
  All 3D transitions happen within this single scene. Do not create multiple canvases.
- SCROLL ORCHESTRATION: All animations (3D + HTML) are coordinated from a single
  ScrollOrchestrator. Do not create independent ScrollTrigger instances in individual
  section components — register them through the central orchestrator.
- CONTENT SEPARATION: All content (projects, experience, skills, testimonials) lives
  exclusively in src/data/. Section components import from data files only.
  Never hardcode content strings inside components.
- LENIS + GSAP: Lenis handles smooth scroll inertia. GSAP ScrollTrigger uses Lenis's
  scroll position. They must be connected via Lenis's ScrollTrigger integration.
  See SmoothScrollProvider.tsx for the connection pattern.
- PERFORMANCE: Use R3F's Suspense boundaries for all model/texture loading.
  Use drei's useGLTF preloading. Keep draw calls under 100 for mid-range GPU targets.

## What NOT to Change
- The single-canvas architecture in Scene.tsx — adding multiple canvases breaks the narrative
- The central scroll timeline in ScrollOrchestrator — add to it, never bypass it
- The TypeScript types in src/types/ — changes here cascade everywhere
- The Lenis + GSAP connection in SmoothScrollProvider.tsx

## Content Files — Rashmin Edits These
- src/data/projects.ts — Add/edit projects here
- src/data/experience.ts — Add/edit work history here
- src/data/skills.ts — Add/edit tech stack here
- src/data/testimonials.ts — Add/edit testimonials here

## Links to Other Docs
- BRD: docs/BRD.md
- PRD: docs/PRD.md
- System Architecture: docs/ARCHITECTURE.md
- HLD: docs/HLD.md
- LLD: docs/LLD.md
- DB Schema: docs/DATABASE-SCHEMA.md
- API Spec: docs/API-SPEC.md
```

---
```
═══════════════════════════════════════
All 8 documents generated. ✅

  1. BRD ✅
  2. PRD ✅
  3. System Architecture ✅
  4. HLD ✅
  5. LLD ✅
  6. Database Schema ✅
  7. API Specification ✅
  8. CLAUDE.md ✅

Reply YES to proceed to ticket generation.
Or ask me to revise any document first.
═══════════════════════════════════════