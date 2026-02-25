# Low-Level Design — Rashmin Bhanderi Portfolio

## Folder Structure
```
rashmin-portfolio/
├── public/
│   ├── models/          — GLTF/GLB 3D model files
│   ├── textures/        — Three.js texture maps
│   ├── fonts/           — Local font files
│   └── images/          — Project screenshots, profile photo
├── src/
│   ├── app/
│   │   ├── layout.tsx           — Root layout, font loading, metadata
│   │   ├── page.tsx             — Main page, composes all sections
│   │   └── api/
│   │       └── contact/
│   │           └── route.ts     — Contact form validation API route
│   ├── components/
│   │   ├── canvas/
│   │   │   ├── Scene.tsx            — Root R3F Canvas component
│   │   │   ├── CameraRig.tsx        — Camera that responds to scroll
│   │   │   ├── ParticleField.tsx    — Background particle system
│   │   │   ├── GeometryAssembly.tsx — Core narrative 3D object
│   │   │   └── Lights.tsx           — Scene lighting setup
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   ├── SkillsSection.tsx
│   │   │   ├── ExperienceSection.tsx
│   │   │   ├── ProjectsSection.tsx
│   │   │   ├── TestimonialsSection.tsx
│   │   │   └── ContactSection.tsx
│   │   ├── ui/
│   │   │   ├── NavigationDots.tsx   — Section progress indicator
│   │   │   ├── CustomCursor.tsx     — Custom cursor for desktop
│   │   │   ├── ProjectModal.tsx     — Project detail modal
│   │   │   ├── Loader.tsx           — Initial load screen
│   │   │   └── NoiseOverlay.tsx     — Subtle film grain texture overlay
│   │   └── providers/
│   │       ├── SmoothScrollProvider.tsx  — Lenis smooth scroll setup
│   │       └── GSAPProvider.tsx          — GSAP context and ScrollTrigger setup
│   ├── data/
│   │   ├── projects.ts      — Project entries (RASHMIN EDITS THIS)
│   │   ├── experience.ts    — Work history entries (RASHMIN EDITS THIS)
│   │   ├── skills.ts        — Tech stack entries (RASHMIN EDITS THIS)
│   │   └── testimonials.ts  — Testimonial entries (RASHMIN EDITS THIS)
│   ├── hooks/
│   │   ├── useScrollProgress.ts  — Returns normalized scroll position 0-1
│   │   ├── useGSAPTimeline.ts    — Creates and registers GSAP timelines
│   │   └── useEmailJS.ts         — EmailJS send hook with loading/error state
│   ├── lib/
│   │   ├── gsap.ts          — GSAP instance with all plugins registered
│   │   ├── emailjs.ts       — EmailJS initialization
│   │   └── constants.ts     — Site-wide constants (colors, breakpoints, timing)
│   ├── types/
│   │   ├── index.ts         — Barrel export for all types
│   │   ├── TProject.ts      — Project type definition
│   │   ├── TExperience.ts   — Experience type definition
│   │   ├── TSkill.ts        — Skill type definition
│   │   └── TTestimonial.ts  — Testimonial type definition
│   └── styles/
│       └── globals.css      — Tailwind base, custom CSS variables, scrollbar styling
├── docs/
│   ├── CLAUDE.md
│   ├── BRD.md
│   ├── PRD.md
│   ├── HLD.md
│   ├── LLD.md
│   ├── DATABASE-SCHEMA.md
│   └── API-SPEC.md
├── .env.local.example       — Template for environment variables
├── next.config.js           — Next.js config with CSP headers
├── tailwind.config.ts       — Tailwind config with custom theme
└── tsconfig.json            — TypeScript config
```

## Module: ContentData

### Files to Create
| File | Purpose | Key Exports |
|---|---|---|
| src/data/projects.ts | All project data | PROJECTS: TProject[] |
| src/data/experience.ts | Work history | EXPERIENCE: TExperience[] |
| src/data/skills.ts | Tech stack | SKILLS: TSkillGroup[] |
| src/data/testimonials.ts | Testimonials | TESTIMONIALS: TTestimonial[] |

### Key Types

#### TProject
- id: string — unique slug
- title: string — project name
- tagline: string — one-line description
- description: string — full paragraph
- role: string — Rashmin's role on the project
- techStack: string[] — technologies used
- problem: string — what problem it solved
- solution: string — how it was solved
- outcome: string — result/impact
- imageUrl: string — path to screenshot in /public/images
- liveUrl?: string — optional live link
- githubUrl?: string — optional GitHub link
- featured: boolean — show in primary showcase

#### TExperience
- id: string
- company: string
- role: string
- startDate: string — "Jan 2021"
- endDate: string — "Present" or "Dec 2023"
- location: string
- description: string — paragraph summary
- achievements: string[] — bullet points of key wins
- techStack: string[]

#### TSkillGroup
- category: string — "Frontend", "Backend", "DevOps", etc.
- skills: TSkill[]

#### TSkill
- name: string
- icon?: string — path to icon in /public/images/skills

#### TTestimonial
- id: string
- name: string
- role: string
- company: string
- text: string
- avatarUrl?: string

## Module: ScrollOrchestrator

### Key Functions

#### initScrollTimeline(refs: TScrollRefs): void
- Purpose: Creates the master GSAP timeline that drives the entire narrative
- Parameters: refs — object containing React refs for camera, all 3D objects, and all HTML sections
- Returns: void (registers timeline with ScrollTrigger globally)
- Business logic:
  1. Create a GSAP master timeline pinned to the body
  2. Map scroll 0-15%: Hero intro — camera starts far back, flies forward, title assembles
  3. Map scroll 15-30%: About — camera rotates, particles reorganize, about text fades in
  4. Map scroll 30-45%: Skills — geometry transforms, skill groups animate in sequentially
  5. Map scroll 45-60%: Experience — timeline entries reveal one by one with camera drift
  6. Map scroll 60-75%: Projects — 3D cards emerge from scene, hover states enabled
  7. Map scroll 75-85%: Testimonials — soft light shift, testimonials fade in
  8. Map scroll 85-100%: Contact — scene dims to near black, contact form glows in

## Module: ContactSection

### Key Functions

#### sendContactEmail(formData: TContactForm): Promise<TEmailResult>
- Purpose: Validates and sends contact form via EmailJS
- Parameters: formData — { name, email, subject, message }
- Returns: Promise resolving to { success: boolean, error?: string }
- Business logic:
  1. Call /api/contact to validate payload server-side
  2. If validation passes, call EmailJS.send() with service/template IDs from env
  3. On success: return { success: true }, trigger success UI state
  4. On failure: return { success: false, error: message }, trigger error UI state