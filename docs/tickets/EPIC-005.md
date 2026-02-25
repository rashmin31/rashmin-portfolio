# EPIC-5: Experience and Projects Sections
Phase: 1
Goal: Experience timeline tells Rashmin's career story with motion.
      Projects section showcases work with a modal detail view.
      Both are driven entirely by content data files.

---

## STORY-5.1: Build Experience Timeline
**User Story:** As a recruiter, I want to see Rashmin's career progression
as a clear narrative so that I understand his trajectory instantly.

**Acceptance Criteria:**
- [ ] Vertical timeline with entries in reverse chronological order
- [ ] Each entry reveals on scroll
- [ ] Shows company, role, dates, achievements
- [ ] Driven entirely by src/data/experience.ts

---

### TASK-5.1.1: Build ExperienceSection.tsx
**Agent:** ANTIGRAVITY
**Type:** Modify

**Context (read before starting):**
- docs/PRD.md (Work Experience Timeline acceptance criteria)
- src/data/experience.ts
- src/types/TExperience.ts

**Files to Modify:**
- `src/components/sections/ExperienceSection.tsx`

**Implementation Notes:**

Section layout (min-height: 100vh, centered):

Header:
- "EXPERIENCE" label (font-mono, text-accent, tracking-widest)
- Heading: "The journey so far." (text-4xl, font-display)

Timeline component:
- Vertical center line: 1px border-muted
- Each experience entry alternates left/right of the center line (desktop)
  or stacks on mobile
- Entry card: bg-surface, border border-muted, rounded-xl, p-6
- Entry contains:
  - Role title: text-xl, font-display, text-text-primary
  - Company name: text-accent, font-mono
  - Date range: text-text-secondary, font-mono, text-sm
  - Location: text-muted, text-xs
  - Description paragraph: text-text-secondary
  - Achievements: bulleted list, each item text-sm text-text-secondary
    with a small accent-colored dot
  - Tech stack chips: small, same style as Skills section chips

GSAP ScrollTrigger per entry:
- Each entry slides in from its side (left entries from left, right entries from right)
- opacity 0 → 1, x: ±60 → 0
- Trigger: "top 75%"

**Definition of Done:**
- [ ] Timeline renders for all entries in data file
- [ ] Alternating layout works on desktop
- [ ] Mobile stacks cleanly
- [ ] Scroll animations trigger per entry

---

## STORY-5.2: Build Projects Showcase and Modal
**User Story:** As a CTO, I want to explore Rashmin's projects in detail
so that I can assess the quality and scope of his delivery.

**Acceptance Criteria:**
- [ ] Project cards displayed in a grid
- [ ] Featured projects are visually prominent
- [ ] Clicking a card opens a full detail modal
- [ ] Modal shows all project fields
- [ ] Driven by src/data/projects.ts

---

### TASK-5.2.1: Build ProjectsSection.tsx
**Agent:** ANTIGRAVITY
**Type:** Modify

**Context (read before starting):**
- docs/PRD.md (Projects Showcase acceptance criteria)
- src/data/projects.ts
- src/types/TProject.ts

**Files to Modify:**
- `src/components/sections/ProjectsSection.tsx`

**Implementation Notes:**

Section layout:

Header:
- "PROJECTS" label (font-mono, text-accent)
- Heading: "Things I've built." (text-4xl, font-display)

Grid layout:
- Featured projects (featured: true): large cards, span 2 columns on desktop
- Non-featured: standard single-column cards
- CSS grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3, gap-6

Project card:
- bg-surface, border border-muted, rounded-xl, overflow-hidden
- Image: aspect-video, object-cover, bg-muted as fallback
- Card body: p-6
- Title: text-xl, font-display
- Tagline: text-text-secondary, text-sm
- Tech stack: small chips (same as skills)
- Role: text-accent, font-mono, text-xs
- "View Project" button: appears on hover
- onClick: opens ProjectModal with this project's data

GSAP: cards animate in on scroll, stagger 0.1s

---

### TASK-5.2.2: Build ProjectModal.tsx
**Agent:** ANTIGRAVITY
**Type:** Create

**Context (read before starting):**
- src/types/TProject.ts
- docs/PRD.md (Projects Showcase acceptance criteria)

**Files to Create:**
- `src/components/ui/ProjectModal.tsx`

**Implementation Notes:**

Modal component:
- Props: { project: TProject | null, onClose: () => void }
- Renders nothing if project is null
- Full-screen overlay: fixed inset-0, bg-background/90, backdrop-blur-md, z-50
- Modal panel: max-w-3xl, mx-auto, bg-surface, border border-muted, rounded-2xl,
  overflow-y-auto, max-h-[90vh], p-8 or p-10
- Close button: top-right corner, × icon, hover: text-accent

Modal content sections in order:
1. Project image (full width, aspect-video, rounded-xl)
2. Title (text-3xl, font-display) + Role badge (text-accent, font-mono)
3. Tech stack chips row
4. "The Problem" section: label + paragraph (problem field)
5. "The Solution" section: label + paragraph (solution field)
6. "The Outcome" section: label + paragraph (outcome field)
7. Full description paragraph
8. Links row: "View Live" button (if liveUrl) + "GitHub" button (if githubUrl)

Animation:
- GSAP: modal overlay fades in, panel scales from 0.95 to 1.0 + fades in
- On close: reverse animation then call onClose

Keyboard: close on Escape key press (useEffect event listener)
Scroll lock: add overflow-hidden to body when modal is open

**Definition of Done:**
- [ ] Modal opens and closes with animation
- [ ] All TProject fields displayed
- [ ] Escape key closes modal
- [ ] Body scroll locked when modal is open
- [ ] Links only shown when URLs exist