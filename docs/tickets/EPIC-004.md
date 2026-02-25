# EPIC-4: About, Skills Sections

Phase: 1
Goal: About and Skills sections feel like natural continuations of the
hero narrative — personal story revealed with motion, skills
displayed with visual hierarchy and premium treatment.

---

## STORY-4.1: Build About Section

**User Story:** As a recruiter, I want to quickly understand who Rashmin is
as a person and professional so that I can assess cultural fit.

**Acceptance Criteria:**

- [ ] Section reveals on scroll entry via GSAP
- [ ] Contains photo placeholder, personal bio, and key facts
- [ ] Text animates in line by line
- [ ] Consistent with dark premium aesthetic

---

### TASK-4.1.1: Build AboutSection.tsx

**Agent:** ANTIGRAVITY
**Type:** Modify

**Context (read before starting):**

- docs/PRD.md (About Me feature)
- src/lib/gsap.ts

**Files to Modify:**

- `src/components/sections/AboutSection.tsx`

**Implementation Notes:**

Section structure (min-height: 100vh, centered content, max-width container):

Left column (40%):

- Circular image placeholder: 300x300, border with accent color glow
- Image path: "/images/profile.png" — placeholder until Rashmin adds photo
- Subtle floating animation on the image (GSAP: y: -10 → y: 10, yoyo, repeat -1, duration 3)

Right column (60%):

- Section label: "ABOUT ME" — uppercase, font-mono, text-accent, text-sm, tracking-widest
- Heading: "[PLACEHOLDER: Rashmin's personal headline — e.g. 'I build systems that scale and teams that ship.']"
  Style: text-4xl, font-display, text-text-primary
- Bio paragraph 1: "[PLACEHOLDER: 2-3 sentences about background and approach to engineering]"
- Bio paragraph 2: "[PLACEHOLDER: 2-3 sentences about what drives you, what you value in your work]"
- Key facts row (3 stats side by side):
    - "[X]+ Years Experience"
    - "[X]+ Projects Shipped"
    - "[X]+ Engineers Led"
      (These are visual stats — Rashmin fills numbers)

GSAP ScrollTrigger animation:

- Trigger: when section enters viewport (start: "top 80%")
- Left column: fade in from left (x: -60 → x: 0, opacity 0 → 1)
- Right column elements: staggered fade in from bottom (y: 30 → y: 0, opacity 0 → 1, stagger: 0.15)

**Definition of Done:**

- [ ] Section renders correctly with two-column layout
- [ ] Scroll-triggered animations fire correctly
- [ ] Responsive layout (stacks on mobile)
- [ ] All placeholder text clearly marked for Rashmin

---

## STORY-4.2: Build Skills Section

**User Story:** As a developer peer, I want to see Rashmin's tech stack
displayed in a way that communicates depth and range clearly.

**Acceptance Criteria:**

- [ ] Skills grouped by category
- [ ] No generic proficiency bars
- [ ] Premium visual treatment with scroll animations
- [ ] All skills from src/data/skills.ts rendered dynamically

---

### TASK-4.2.1: Build SkillsSection.tsx

**Agent:** ANTIGRAVITY
**Type:** Modify

**Context (read before starting):**

- docs/PRD.md (Skills section acceptance criteria)
- src/data/skills.ts
- src/types/TSkill.ts

**Files to Modify:**

- `src/components/sections/SkillsSection.tsx`

**Implementation Notes:**

Section layout (min-height: 100vh):

Header:

- "SKILLS & EXPERTISE" label (font-mono, text-accent, tracking-widest)
- Heading: "The tools I build with." (text-4xl, font-display)

Skills display — NO BARS. Instead, use a tag/chip design:

- For each TSkillGroup, render a category heading and a flex-wrap row of skill chips
- Skill chip style: px-4 py-2, border border-muted, rounded-full, font-mono text-sm,
  text-text-secondary, hover: border-accent hover: text-accent, transition-all
- Chips should feel like code tags / terminal commands

GSAP ScrollTrigger:

- Each category group fades and slides up on scroll entry
- Stagger between categories: 0.2s
- Individual chips within each group stagger at 0.05s

Import SKILLS from src/data/skills.ts and map over it dynamically.
Never hardcode skill names in the component.

**Definition of Done:**

- [ ] All skill groups from data file render correctly
- [ ] Chip design looks premium (no bars anywhere)
- [ ] Scroll animations trigger correctly
- [ ] Hover states work on all chips
