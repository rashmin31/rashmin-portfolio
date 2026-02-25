# EPIC-3: Hero Section
Phase: 1
Goal: A full-screen immersive hero that captivates in 5 seconds —
      Rashmin's name assembles itself from fragments, camera flies in,
      and a clear scroll invitation appears.

---

## STORY-3.1: Build the Hero Experience
**User Story:** As a visitor, I want an unforgettable first impression
so that I immediately know this person is exceptional.

**Acceptance Criteria:**
- [ ] Full-screen hero occupies 100vh
- [ ] Name "Rashmin Bhanderi" animates in with character-level animation
- [ ] Title "Tech Lead & Full Stack Developer" appears after name
- [ ] 3D scene reacts to hero section (camera position, special 3D object)
- [ ] Scroll indicator animates to invite exploration
- [ ] Hero loads and plays within 3 seconds

---

### TASK-3.1.1: Build GeometryAssembly.tsx — Hero 3D Object
**Agent:** ANTIGRAVITY
**Type:** Create

**Context (read before starting):**
- docs/CLAUDE.md (visual concept: fragmented data assembling into order)
- src/components/canvas/Scene.tsx

**Files to Create:**
- `src/components/canvas/GeometryAssembly.tsx`

**Implementation Notes:**

This is the central narrative 3D object. It represents Rashmin's story:
chaos assembling into structure. For the hero section, it should appear
as a fragmented icosahedron or abstract geometric shape.

1. Create a wireframe icosahedron geometry (IcosahedronGeometry, radius 2, detail 1)
2. Use MeshBasicMaterial with wireframe: true, color: #6366f1
3. Add a second inner solid icosahedron with MeshStandardMaterial,
   color: #050505, slightly smaller (scale 0.95) — creates depth effect
4. Animate: slow rotation on Y and X axes using useFrame
5. On hero: geometry is slightly "exploded" — vertices offset outward
   (this will animate to assembled state as user scrolls — set up the ref
   for this but the actual scroll animation comes in Epic 5's scroll orchestration)
6. Add a ref prop so ScrollOrchestrator can control it

Export a ref for: meshRef (the group containing both geometries)

**Definition of Done:**
- [ ] Geometric shape visible in center of scene on hero
- [ ] Subtle rotation animation running
- [ ] Wireframe aesthetic looks premium
- [ ] ref is accessible for scroll control

---

### TASK-3.1.2: Build HeroSection.tsx
**Agent:** ANTIGRAVITY
**Type:** Modify

**Context (read before starting):**
- docs/PRD.md (Hero Section user story and acceptance criteria)
- src/lib/constants.ts
- src/lib/gsap.ts

**Files to Modify:**
- `src/components/sections/HeroSection.tsx` — Replace stub with full implementation

**Implementation Notes:**

Hero section layout:
- Full screen: `className="h-screen flex flex-col items-center justify-center relative"`
- The canvas renders behind — hero HTML just needs positioning

Content to animate in (GSAP timeline, plays on mount):
1. Split "Rashmin Bhanderi" into individual characters using GSAP SplitText
   or manual span wrapping. Animate each character from: opacity 0, y: 40, 
   rotateX: 90 → to: opacity 1, y: 0, rotateX: 0. Stagger: 0.05s. Ease: power3.out
2. After name completes: fade in "Tech Lead & Full Stack Developer" from opacity 0, y: 20
3. After title: fade in a subtle tagline: "[PLACEHOLDER: Your one-line value proposition]"
4. After tagline: animate in scroll indicator (animated arrow/chevron)

Typography:
- Name: font-display (if loaded), text-6xl md:text-8xl, font-bold, text-text-primary
- Title: font-mono, text-xl md:text-2xl, text-accent
- Tagline: font-sans, text-base, text-text-secondary

Scroll indicator:
- "scroll to explore" text (text-xs, text-muted, tracking-widest, uppercase)
- Animated line or chevron below it (CSS animation: bounce or fade up/down loop)
- Position: absolute bottom-8, centered

**Definition of Done:**
- [ ] Character-by-character name animation plays on load
- [ ] All text elements appear in sequence
- [ ] Scroll indicator visible and animated
- [ ] Responsive (looks good at 768px and 1440px)
- [ ] No layout overflow