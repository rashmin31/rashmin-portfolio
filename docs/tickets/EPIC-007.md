# EPIC-7: UI Polish and Navigation
Phase: 2
Goal: Custom cursor, navigation dots, loader screen, and noise overlay
      make the portfolio feel like a premium product, not a website.

---

## STORY-7.1: Build Premium UI Components
**User Story:** As a visitor, I want every micro-interaction to feel
intentional so that the premium quality is felt, not just seen.

**Acceptance Criteria:**
- [ ] Custom cursor replaces default OS cursor
- [ ] Navigation dots show current section
- [ ] Loader screen hides until 3D scene is ready
- [ ] Noise overlay adds subtle film grain texture

---

### TASK-7.1.1: Build CustomCursor.tsx
**Agent:** CLAUDE CODE
**Type:** Modify

**Context (read before starting):**
- src/lib/gsap.ts

**Files to Modify:**
- `src/components/ui/CustomCursor.tsx`

**Implementation Notes:**

Two-element cursor:
1. Small dot (6px circle): follows mouse exactly, no lag
2. Larger ring (32px circle): follows with slight lag (lerp 0.15)

Implementation:
- Both elements: fixed positioning, pointer-events-none, z-50
- Both: mix-blend-mode: difference (inverts over content — premium look)
- Dot: bg-white, rounded-full, 6px × 6px
- Ring: border border-white, rounded-full, 32px × 32px
- Hide default cursor: cursor-none on body (add to globals.css)

GSAP for lag on ring:
```
// In useFrame-like pattern using requestAnimationFrame:
// ringX = lerp(ringX, mouseX - 16, 0.15)
// ringY = lerp(ringY, mouseY - 16, 0.15)
```

Hover state (add to interactive elements):
- When mouse enters a button/link: scale dot to 2x, scale ring to 1.5x
- Add 'data-cursor-hover' attribute to buttons/links
- In cursor: listen for mouseenter/mouseleave on [data-cursor-hover] elements

Hide cursor on mobile (useMediaQuery or CSS).

**Definition of Done:**
- [ ] Custom cursor visible on desktop
- [ ] Ring follows with smooth lag
- [ ] Hover state triggers on interactive elements
- [ ] Default cursor hidden
- [ ] Not visible on mobile

---

### TASK-7.1.2: Build NavigationDots.tsx
**Agent:** CLAUDE CODE
**Type:** Modify

**Context (read before starting):**
- src/lib/constants.ts (NAV_SECTIONS)
- src/hooks/useScrollProgress.ts

**Files to Create (first):**
- `src/hooks/useScrollProgress.ts`

**Files to Modify:**
- `src/components/ui/NavigationDots.tsx`

**Implementation Notes:**

useScrollProgress.ts:
- Returns: { activeSection: string, scrollProgress: number }
- Uses IntersectionObserver on each section id from NAV_SECTIONS
- Sets activeSection to the id of the section most in view
- scrollProgress: window.scrollY / (document.body.scrollHeight - window.innerHeight)

NavigationDots.tsx:
- Fixed right side: right-6, top-1/2, -translate-y-1/2
- Vertical stack of dots, one per section in NAV_SECTIONS
- Dot: 8px circle, bg-muted, rounded-full
- Active dot: bg-accent, scale 1.5, with GSAP transition
- On hover: show section label as tooltip (absolute, right-full, mr-3)
- On click: smooth scroll to that section using Lenis

**Definition of Done:**
- [ ] Dots visible on right side
- [ ] Active dot highlights correctly as user scrolls
- [ ] Clicking a dot scrolls to that section
- [ ] Tooltips show on hover

---

### TASK-7.1.3: Build Loader.tsx
**Agent:** CLAUDE CODE
**Type:** Modify

**Context (read before starting):**
- src/lib/gsap.ts

**Files to Modify:**
- `src/components/ui/Loader.tsx`

**Implementation Notes:**

Loader covers the entire screen while the 3D scene initializes:
- Fixed inset-0, bg-background, z-50
- Center content: animated logo or loading indicator
- Show: "RB" monogram in large font-display text, text-accent
- Below: loading bar that fills over ~2 seconds
- After loading bar completes: GSAP animates loader out (y: -100%, duration 0.8, ease: power3.inOut)
- Reveal content beneath

Implementation:
- useEffect: after 2.5s, trigger exit animation then set mounted: false
- Or: accept an isLoaded prop from Scene.tsx that uses R3F's useProgress hook

Use R3F's useProgress from drei to get actual load progress:
```typescript
import { useProgress } from '@react-three/drei'
const { progress } = useProgress()
// When progress === 100, trigger exit
```

**Definition of Done:**
- [ ] Loader covers screen on initial load
- [ ] Loading bar fills as 3D assets load
- [ ] Smooth exit animation when loading complete
- [ ] Does not show on subsequent navigation