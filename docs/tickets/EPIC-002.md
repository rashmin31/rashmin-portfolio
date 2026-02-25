# EPIC-2: Three.js Canvas Foundation
Phase: 0
Goal: A single persistent R3F canvas rendering behind all content,
      with camera rig, lighting, and a basic particle field — ready
      for the scroll narrative to be wired in Phase 1.

---

## STORY-2.1: Build the Persistent 3D Scene
**User Story:** As a visitor, I want to see a living 3D environment
behind all content so that the site feels like a world, not a page.

**Acceptance Criteria:**
- [ ] Single R3F Canvas renders full-screen, fixed behind all content
- [ ] Canvas has correct z-index (behind HTML content)
- [ ] Scene includes ambient + directional lighting
- [ ] Particle field renders 2000+ particles
- [ ] 60fps on mid-range GPU

---

### TASK-2.1.1: Build Scene.tsx — Root Canvas Component
**Agent:** ANTIGRAVITY
**Type:** Create

**Context (read before starting):**
- docs/CLAUDE.md (SINGLE CANVAS decision)
- docs/HLD.md (SceneManager section)

**Files to Create:**
- `src/components/canvas/Scene.tsx`
- `src/components/canvas/Lights.tsx`

**Implementation Notes:**

Scene.tsx must:
1. Use R3F's Canvas component
2. Be positioned FIXED, full viewport, z-index 0 (behind content)
3. Use `gl={{ antialias: true, alpha: true }}` for smooth edges
4. Use `camera={{ position: [0, 0, 5], fov: 75 }}`
5. Include Suspense boundary with null fallback for async loading
6. Render: Lights, ParticleField, CameraRig (all created in subsequent tasks)
7. The canvas div should have: `className="fixed inset-0 z-0"`

Lights.tsx:
- ambientLight intensity={0.1}
- directionalLight position={[10, 10, 5]} intensity={0.5} color="#6366f1"
- pointLight position={[-10, -10, -10]} intensity={0.3} color="#f59e0b"

**Definition of Done:**
- [ ] Canvas renders full-screen
- [ ] Canvas is visually behind HTML content (z-index correct)
- [ ] Lights produce visible effect in scene
- [ ] No R3F/Three.js console errors

---

### TASK-2.1.2: Build ParticleField.tsx
**Agent:** ANTIGRAVITY
**Type:** Create

**Context (read before starting):**
- docs/CLAUDE.md
- src/components/canvas/Scene.tsx

**Files to Create:**
- `src/components/canvas/ParticleField.tsx`

**Implementation Notes:**

Create a field of 3000 particles distributed in a sphere/cloud formation:

1. Use useMemo to generate particle positions once (BufferGeometry approach for performance)
2. Generate positions: random distribution in a cube from -15 to 15 on all axes
3. Use Points + PointsMaterial (not instanced mesh — simpler for particles)
4. Particle color: #6366f1 (accent indigo) with opacity 0.6
5. Particle size: 0.02
6. Add gentle rotation animation using useFrame: rotate Y by 0.0003 per frame
7. The particle field should feel like floating code fragments / data points in space

Performance notes:
- Use Float32Array for positions
- Set frustumCulled={false} on the Points object
- Keep under 5000 particles total

**Definition of Done:**
- [ ] 3000 particles visible in scene
- [ ] Gentle rotation animation running
- [ ] 60fps maintained (check with stats)
- [ ] Particles feel like floating in deep space

---

### TASK-2.1.3: Build CameraRig.tsx
**Agent:** CLAUDE CODE
**Type:** Create

**Context (read before starting):**
- docs/CLAUDE.md (SCROLL ORCHESTRATION decision)
- docs/LLD.md (ScrollOrchestrator section)

**Files to Create:**
- `src/components/canvas/CameraRig.tsx`

**Implementation Notes:**

The CameraRig component:
1. Uses useRef to get access to the Three.js camera via useThree()
2. Exposes camera ref upward so ScrollOrchestrator can animate it
3. Adds subtle mouse parallax effect: on mousemove, gently shift camera X/Y
   by a small amount (max ±0.3 units) for depth illusion
4. The parallax should be smooth — lerp toward target position using useFrame
```typescript
// Parallax target
const mouse = useRef({ x: 0, y: 0 })
const target = useRef({ x: 0, y: 0 })

// In useFrame:
// target.x = lerp(target.x, mouse.x * 0.3, 0.05)
// target.y = lerp(target.y, mouse.y * 0.15, 0.05)
// camera.position.x = target.x
// camera.position.y = target.y
```

5. Listen for mousemove on window in useEffect, clean up on unmount
6. Do NOT override camera.position.z — that is controlled by ScrollTrigger

**Definition of Done:**
- [ ] Camera subtly follows mouse movement
- [ ] Parallax feels smooth and premium, not jumpy
- [ ] Camera Z position is not affected (reserved for scroll)
- [ ] No memory leaks (event listener cleaned up)

---

### TASK-2.1.4: Build Main page.tsx with Canvas + Section Layout
**Agent:** CLAUDE CODE
**Type:** Modify

**Context (read before starting):**
- docs/CLAUDE.md
- All canvas components
- src/lib/constants.ts (NAV_SECTIONS)

**Files to Modify:**
- `src/app/page.tsx` — Replace with production layout

**Implementation Notes:**

page.tsx structure:
1. Import Scene (canvas layer) — renders fixed full-screen at z-0
2. Import all section components (stubs for now — created in Epic 3+)
3. Main content div: `className="relative z-10"` — sits above canvas
4. Each section gets its id attribute matching NAV_SECTIONS ids
5. Import and render NavigationDots and CustomCursor (stubs for now)
6. Import and render Loader component (stub for now)

The HTML structure should be:
```
<main>
  <Scene />  {/* fixed, z-0 */}
  <Loader /> {/* fixed, z-50, hides until 3D loads */}
  <CustomCursor /> {/* fixed, z-40 */}
  <div className="relative z-10">
    <HeroSection />
    <AboutSection />
    <SkillsSection />
    <ExperienceSection />
    <ProjectsSection />
    <TestimonialsSection />
    <ContactSection />
  </div>
  <NavigationDots /> {/* fixed, z-30 */}
</main>
```

Create stub components for all sections and UI components that just render
a div with the section id and a placeholder text so the page compiles.

**Definition of Done:**
- [ ] Page compiles and renders without errors
- [ ] Canvas visible in background
- [ ] All section stubs visible as you scroll
- [ ] NavigationDots and CustomCursor stubs rendered