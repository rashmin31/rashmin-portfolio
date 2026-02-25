# System Architecture — Rashmin Bhanderi Portfolio

## Architecture Style
Static Site with Serverless API Routes — chosen because:
- Portfolio content is static; no database needed
- Next.js API routes handle contact form without a separate backend
- Vercel deploys both static assets and API routes seamlessly
- Maximum performance via CDN edge delivery of all static assets

## Tech Stack
| Layer | Technology | Version | Why |
|---|---|---|---|
| Framework | Next.js | 14 (App Router) | SSG + API routes + Vercel-native |
| Language | TypeScript | 5.x | Type safety, better DX, self-documenting |
| 3D Engine | Three.js | 0.161+ | Industry standard WebGL library |
| 3D React Layer | React Three Fiber | 8.x | React-idiomatic Three.js integration |
| 3D Helpers | Drei | 9.x | Pre-built R3F helpers (cameras, loaders, etc.) |
| Animation | GSAP | 3.12+ | Industry gold standard for scroll + timeline animation |
| Scroll Animation | GSAP ScrollTrigger | 3.12+ | Plugin for scroll-driven narrative |
| Styling | Tailwind CSS | 3.4+ | Utility-first, fast iteration |
| Email | EmailJS | 4.x | Client-side email without backend complexity |
| Hosting | Vercel | - | Zero-config Next.js deployment, free tier sufficient |
| CI/CD | Vercel Git Integration | - | Auto-deploy on push to main |

## System Components

### 1. Canvas Layer (Three.js / R3F)
The persistent 3D scene that lives behind all content. It is a single continuous
Three.js canvas that spans the full viewport. As the user scrolls, GSAP ScrollTrigger
drives camera movement, object transformations, and material changes within this canvas.
The canvas never unmounts — it morphs continuously throughout the journey.

### 2. Content Layer (React / Next.js)
HTML/CSS sections that sit on top of the canvas using CSS z-index. Each section
(Hero, About, Skills, Experience, Projects, Testimonials, Contact) is a React component
positioned absolutely or via scroll snapping. GSAP animates both the 3D canvas AND
these HTML elements in sync.

### 3. Scroll Orchestrator (GSAP ScrollTrigger)
The brain of the narrative. A central ScrollTrigger configuration maps scroll progress
(0% to 100%) to specific animations in both the canvas layer and content layer.
This is what creates the "story" — the camera flies, elements assemble, text reveals
all happen in choreographed sequence driven by scroll position.

### 4. Contact API Route (Next.js API)
A lightweight /api/contact route that validates the form payload server-side
before EmailJS sends. This prevents spam and keeps validation logic off the client.

### 5. Asset Pipeline
3D models (GLTF/GLB), textures, and fonts are stored in /public and loaded
lazily using R3F's useLoader and Suspense boundaries to prevent blocking render.

## Data Flow
1. User lands on site → Next.js serves static HTML shell instantly from Vercel CDN
2. React hydrates → Three.js canvas initializes → 3D scene loads (lazy, behind Suspense)
3. User scrolls → ScrollTrigger fires → GSAP timelines advance →
   camera moves + HTML sections animate simultaneously
4. User submits contact form → client validation → EmailJS sends email directly →
   success/error state shown to user

## External Integrations
| Integration | Purpose | Auth Method |
|---|---|---|
| EmailJS | Send contact form emails to Rashmin + auto-reply to sender | Public Key + Service ID + Template ID stored in .env |
| Vercel | Hosting and CI/CD | Git integration, auto-deploy on push |
| Google Fonts / local fonts | Typography | No auth, loaded via Next.js font optimization |

## Security Considerations
- EmailJS public key is safe to expose client-side (EmailJS is designed this way)
  but Service ID and Template ID should be in environment variables
- No user data is stored anywhere — form data is transient
- Next.js API route adds server-side validation layer before email dispatch
- All dependencies pinned to specific versions to prevent supply chain issues
- Content Security Policy headers configured in next.config.js