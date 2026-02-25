# High-Level Design — Rashmin Bhanderi Portfolio

## Module Breakdown
| Module | Responsibility | Tech |
|---|---|---|
| SceneManager | Owns the Three.js canvas, camera, lighting, and all 3D objects | Three.js, R3F |
| ScrollOrchestrator | Maps scroll progress to all animations (3D + HTML) | GSAP ScrollTrigger |
| HeroSection | First impression — 3D title reveal, particle/geometry intro scene | R3F, GSAP |
| AboutSection | Personal story reveal with supporting 3D elements | React, GSAP |
| SkillsSection | Animated tech stack display | React, GSAP |
| ExperienceSection | Scroll-driven career timeline | React, GSAP |
| ProjectsSection | Project card grid + detail modal | React, GSAP |
| TestimonialsSection | Testimonial carousel/display | React, GSAP |
| ContactSection | Form with EmailJS integration | React, EmailJS |
| UIOverlay | Navigation dots, progress indicator, cursor | React |
| ContentData | All placeholder content (projects, skills, experience, etc.) | TypeScript data files |

## Module Interactions
- ScrollOrchestrator is the central coordinator. It imports refs from SceneManager
  (camera, 3D objects) and refs from each HTML section, then creates unified
  GSAP timelines that animate both simultaneously.
- SceneManager provides a React context that exposes camera and scene refs
  to ScrollOrchestrator and individual section components that need 3D awareness.
- ContentData is a pure TypeScript module — no React, no Three.js. It exports
  typed arrays of projects, skills, experience entries, and testimonials.
  All section components import from ContentData only. Rashmin edits only this file.
- ContactSection calls EmailJS directly from the client after the Next.js API
  route validates the payload.

## API Design Overview
| Endpoint | Purpose |
|---|---|
| POST /api/contact | Server-side validation of contact form before EmailJS send |

## Database Ownership
No database. All content lives in TypeScript data files under /src/data/.

## Authentication Flow
No authentication required. This is a public portfolio site.

## Key Technical Decisions
| Decision | Options Considered | Chosen | Reason |
|---|---|---|---|
| Single canvas vs per-section canvas | Per-section Three.js instances | Single persistent canvas | Enables continuous narrative; camera flies between "worlds" |
| R3F vs vanilla Three.js | Both viable | R3F + Drei | React component model makes complex scene more maintainable |
| Scroll library | Locomotive Scroll, Lenis, native | Lenis + GSAP ScrollTrigger | Lenis provides smooth scroll inertia; ScrollTrigger handles all animation triggers |
| Content management | CMS, MDX, hardcoded | TypeScript data files | Zero complexity; single source of truth; easy for owner to edit |
| Email approach | Backend API + nodemailer, EmailJS | EmailJS with API validation | No email server to maintain; EmailJS free tier sufficient |
| Animation approach | CSS animations, Framer Motion, GSAP | GSAP | GSAP is the only library powerful enough for synchronized 3D + HTML narrative |