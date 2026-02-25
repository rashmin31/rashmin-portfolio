# EPIC-1: Project Foundation & Setup
Phase: 0
Goal: A running Next.js 14 project with all dependencies installed,
      TypeScript configured, Tailwind working, folder structure created,
      and all content data files scaffolded with placeholder data.

---

## STORY-1.1: Initialize Project and Install Dependencies
**User Story:** As a developer, I want a fully configured Next.js project
so that I can start building immediately without setup friction.

**Acceptance Criteria:**
- [ ] Next.js 14 app created with TypeScript and App Router
- [ ] All required dependencies installed (see task for full list)
- [ ] Tailwind CSS configured with custom dark theme
- [ ] Folder structure matches LLD exactly
- [ ] Project runs on localhost:3000 without errors

---

### TASK-1.1.1: Initialize Next.js Project and Install All Dependencies
**Agent:** CLAUDE CODE
**Type:** Create

**Context (read before starting):**
- docs/CLAUDE.md (full file)
- docs/LLD.md (Folder Structure section)

**Implementation Notes:**

1. Create Next.js 14 project:
```bash
npx create-next-app@latest rashmin-portfolio \
  --typescript --tailwind --eslint --app \
  --src-dir --import-alias "@/*"
```

2. Install all dependencies:
```bash
npm install three @react-three/fiber @react-three/drei
npm install gsap @gsap/react
npm install lenis
npm install emailjs-com
npm install @types/three
npm install clsx tailwind-merge
npm install react-hook-form
npm install zod
```

3. Create the complete folder structure from LLD exactly:
- src/components/canvas/
- src/components/sections/
- src/components/ui/
- src/components/providers/
- src/data/
- src/hooks/
- src/lib/
- src/types/
- public/models/
- public/textures/
- public/fonts/
- public/images/skills/
- docs/

4. Create .env.local.example with all 4 EmailJS variables (no values, just keys with descriptions as comments)

5. Configure tailwind.config.ts with this custom theme extension:
```typescript
extend: {
  colors: {
    background: '#050505',
    surface: '#0a0a0a',
    accent: '#6366f1',      // indigo — primary accent
    'accent-warm': '#f59e0b', // amber — secondary accent
    muted: '#374151',
    'text-primary': '#f9fafb',
    'text-secondary': '#9ca3af',
  },
  fontFamily: {
    sans: ['var(--font-inter)', 'sans-serif'],
    mono: ['var(--font-jetbrains-mono)', 'monospace'],
    display: ['var(--font-cal-sans)', 'sans-serif'],
  }
}
```

6. Update globals.css:
- Set html, body background to #050505
- Set default text color to #f9fafb
- Add custom scrollbar styles (thin, dark)
- Add CSS variables for all colors
- Add ::selection styles with accent color
- Import Tailwind directives

**Definition of Done:**
- [ ] npm run dev starts without errors
- [ ] localhost:3000 shows default page on dark background
- [ ] No TypeScript errors
- [ ] All folders exist as specified

---

### TASK-1.1.2: Create All TypeScript Types
**Agent:** CLAUDE CODE
**Type:** Create

**Context (read before starting):**
- docs/CLAUDE.md
- docs/LLD.md (Key Types section)

**Files to Create:**
- `src/types/TProject.ts`
- `src/types/TExperience.ts`
- `src/types/TSkill.ts`
- `src/types/TTestimonial.ts`
- `src/types/TContactForm.ts`
- `src/types/index.ts`

**Implementation Notes:**

TProject.ts:
```typescript
export type TProject = {
  id: string
  title: string
  tagline: string
  description: string
  role: string
  techStack: string[]
  problem: string
  solution: string
  outcome: string
  imageUrl: string
  liveUrl?: string
  githubUrl?: string
  featured: boolean
}
```

TExperience.ts:
```typescript
export type TExperience = {
  id: string
  company: string
  role: string
  startDate: string
  endDate: string
  location: string
  description: string
  achievements: string[]
  techStack: string[]
}
```

TSkill.ts:
```typescript
export type TSkillGroup = {
  category: string
  skills: TSkill[]
}

export type TSkill = {
  name: string
  icon?: string
}
```

TTestimonial.ts:
```typescript
export type TTestimonial = {
  id: string
  name: string
  role: string
  company: string
  text: string
  avatarUrl?: string
}
```

TContactForm.ts:
```typescript
export type TContactForm = {
  name: string
  email: string
  subject: string
  message: string
}

export type TEmailResult = {
  success: boolean
  error?: string
}
```

index.ts: barrel export all types from all files above.

**Definition of Done:**
- [ ] All 5 type files created
- [ ] index.ts exports everything
- [ ] No TypeScript errors
- [ ] Types match LLD specification exactly

---

### TASK-1.1.3: Create All Content Data Files with Placeholder Data
**Agent:** CLAUDE CODE
**Type:** Create

**Context (read before starting):**
- docs/CLAUDE.md
- src/types/index.ts (types just created)

**Files to Create:**
- `src/data/projects.ts`
- `src/data/experience.ts`
- `src/data/skills.ts`
- `src/data/testimonials.ts`

**Implementation Notes:**

Each file should:
1. Import the relevant type from @/types
2. Export a typed constant array
3. Include 2-3 realistic placeholder entries with clear [PLACEHOLDER] markers
   so Rashmin knows exactly what to replace

projects.ts — include 3 placeholder projects. Each should have all TProject fields
filled with placeholder text like:
- title: "[PROJECT NAME]"
- tagline: "[ONE LINE DESCRIPTION]"
- techStack: ["React", "Node.js", "PostgreSQL"] (use real tech, Rashmin replaces)
- featured: true for first 2, false for third
- imageUrl: "/images/project-placeholder.png"

experience.ts — include 3 placeholder experience entries in reverse chronological
order (most recent first). Use realistic role names:
- "Tech Lead" at "[COMPANY NAME]", "Present"
- "Senior Full Stack Developer" at "[COMPANY NAME]", previous dates
- "Full Stack Developer" at "[COMPANY NAME]", earlier dates

skills.ts — include realistic TSkillGroup entries that a Full Stack Tech Lead
would actually have:
- Frontend: React, Next.js, TypeScript, Three.js, Tailwind CSS
- Backend: Node.js, Express, NestJS, GraphQL, REST APIs
- Database: PostgreSQL, MongoDB, Redis, Prisma
- DevOps: Docker, AWS, CI/CD, Git
- Tools: VS Code, Figma, Postman
(These are realistic — Rashmin removes ones that don't apply)

testimonials.ts — include 2 placeholder testimonials with [PLACEHOLDER] markers.

**Definition of Done:**
- [ ] All 4 data files created
- [ ] TypeScript types enforced on all exports
- [ ] Placeholder markers are clear and consistent
- [ ] No TypeScript errors

---

### TASK-1.1.4: Create GSAP and EmailJS Library Files
**Agent:** CLAUDE CODE
**Type:** Create

**Context (read before starting):**
- docs/CLAUDE.md (Key Architectural Decisions section)
- docs/LLD.md (lib/ folder)

**Files to Create:**
- `src/lib/gsap.ts`
- `src/lib/emailjs.ts`
- `src/lib/constants.ts`

**Implementation Notes:**

gsap.ts — Initialize GSAP with all plugins registered:
```typescript
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'
import { SplitText } from 'gsap/SplitText'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, TextPlugin, SplitText)
}

export { gsap, ScrollTrigger }
export default gsap
```

emailjs.ts — EmailJS initialization:
```typescript
import emailjs from 'emailjs-com'

export const initEmailJS = () => {
  emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!)
}

export const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!
export const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!
export const EMAILJS_AUTOREPLY_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_AUTOREPLY_TEMPLATE_ID!
```

constants.ts — site-wide constants:
```typescript
export const SITE_NAME = 'Rashmin Bhanderi'
export const SITE_TITLE = 'Rashmin Bhanderi — Tech Lead & Full Stack Developer'
export const SITE_DESCRIPTION = '[PLACEHOLDER: Write 1-2 sentence site description]'
export const SITE_URL = 'https://rashmin.vercel.app'

export const NAV_SECTIONS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'contact', label: 'Contact' },
] as const

export const SCROLL_DURATION = 1.2 // seconds for programmatic scroll
export const ANIMATION_EASE = 'power3.out'
```

**Definition of Done:**
- [ ] All 3 lib files created
- [ ] GSAP plugins registered correctly (only on client side)
- [ ] No TypeScript errors
- [ ] Constants are typed correctly

---

## STORY-1.2: Create Root Layout and Providers
**User Story:** As a visitor, I want smooth scrolling and consistent layout
so that the experience feels fluid from the first interaction.

**Acceptance Criteria:**
- [ ] Lenis smooth scroll active on all pages
- [ ] GSAP connected to Lenis scroll position
- [ ] Root layout sets correct metadata for SEO
- [ ] Custom fonts loaded via Next.js font optimization

---

### TASK-1.2.1: Build SmoothScrollProvider
**Agent:** CLAUDE CODE
**Type:** Create

**Context (read before starting):**
- docs/CLAUDE.md (LENIS + GSAP section under Key Architectural Decisions)
- src/lib/gsap.ts

**Files to Create:**
- `src/components/providers/SmoothScrollProvider.tsx`

**Implementation Notes:**

This is the most critical provider. It must:
1. Initialize Lenis on mount
2. Connect Lenis to GSAP's ticker (so ScrollTrigger uses Lenis position)
3. Run the Lenis animation frame loop via GSAP's ticker
4. Clean up on unmount
```typescript
'use client'
import { useEffect, ReactNode } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    // Connect Lenis to ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Use GSAP ticker for the animation loop
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove((time) => lenis.raf(time * 1000))
    }
  }, [])

  return <>{children}</>
}
```

**Definition of Done:**
- [ ] Lenis initializes without errors
- [ ] Smooth scroll feels natural (test by scrolling)
- [ ] No console errors
- [ ] Cleanup runs correctly on unmount

---

### TASK-1.2.2: Build Root Layout with Metadata and Fonts
**Agent:** CLAUDE CODE
**Type:** Modify

**Context (read before starting):**
- docs/CLAUDE.md
- src/lib/constants.ts
- src/components/providers/SmoothScrollProvider.tsx

**Files to Modify:**
- `src/app/layout.tsx` — Replace default with production layout

**Implementation Notes:**

1. Load fonts via next/font/google:
   - Inter (sans-serif body font)
   - JetBrains Mono (monospace for code elements)
   Apply as CSS variables: --font-inter, --font-jetbrains-mono

2. Set metadata:
```typescript
export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
  },
}
```

3. Wrap children in SmoothScrollProvider
4. Apply font CSS variables to html element
5. Set background color via className to match Tailwind config

**Definition of Done:**
- [ ] Fonts load correctly (inspect Network tab)
- [ ] Metadata appears correctly in page source
- [ ] SmoothScrollProvider wraps the app
- [ ] No layout shift on load