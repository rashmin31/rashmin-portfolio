# EPIC-010: Populate Real Content

Phase: 3 — Post Launch
Goal: Replace all [PLACEHOLDER] content across all data files
with Rashmin's real information, polished copy, and believable
project/testimonial data. After this epic, the portfolio is
content-complete and ready to share.

---

## STORY-10.1: Populate All Data Files

**User Story:** As Rashmin, I want my portfolio to show real,
polished content so that every visitor sees a complete,
professional experience — not placeholder text.

**Acceptance Criteria:**

- [ ] src/data/projects.ts has 4 real projects with all fields
- [ ] src/data/experience.ts has all 5 real work history entries
- [ ] src/data/skills.ts reflects Rashmin's actual tech stack
- [ ] src/data/testimonials.ts has 3 believable dummy testimonials
- [ ] public/images/profile.png added (Rashmin does this manually)
- [ ] No [PLACEHOLDER] text remains in any data file
- [ ] npm run build passes with no errors

---

### TASK-10.1.1: Populate src/data/projects.ts

**Agent:** CLAUDE CODE
**Type:** Modify

**Files to Modify:**

- `src/data/projects.ts`

**Implementation Notes:**

Replace entire file content with the following:

```typescript
import { TProject } from "@/types";

export const PROJECTS: TProject[] = [
    {
        id: "tradeflow",
        title: "TradeFlow",
        tagline: "Algorithmic trading dashboard with live market data.",
        description:
            "A personal project built to explore algorithmic trading concepts and broker API integration. TradeFlow connects to the Kite Connect API to visualize live market data, manage watchlists, and automate basic order placement flows through a clean, responsive React interface.",
        role: "Solo Developer — Architecture, Frontend, API Integration",
        techStack: [
            "React",
            "TypeScript",
            "Flask",
            "Redux Toolkit",
            "Kite Connect API",
            "Python",
        ],
        problem:
            "Understanding algorithmic trading requires hands-on experimentation with real broker APIs. Existing tools are either too complex or too abstracted to learn from effectively.",
        solution:
            "Built a full-stack prototype with a Flask backend handling Kite Connect authentication and order logic, and a React + TypeScript frontend for visualization and control. Kept the architecture simple enough to learn from but structured enough to extend.",
        outcome:
            "Gained deep practical knowledge of broker API integration, order flows, and real-time data handling. The project became the foundation for understanding trading automation end-to-end.",
        imageUrl: "/images/tradeflow.png",
        liveUrl: undefined,
        githubUrl: "https://github.com/rashmin31",
        featured: true,
    },
    {
        id: "devmetrics",
        title: "DevMetrics",
        tagline: "GitHub activity dashboard for developer productivity.",
        description:
            "A developer productivity tool that aggregates GitHub activity — commit streaks, PR stats, repository health, and contribution graphs — into a single clean dashboard. Built to scratch a personal itch for better visibility into personal coding habits.",
        role: "Solo Developer — Full Stack",
        techStack: [
            "React",
            "TypeScript",
            "GitHub API",
            "Redux Toolkit",
            "Tailwind CSS",
        ],
        problem:
            "GitHub's native interface scatters activity data across multiple pages. Getting a clear picture of your own productivity and coding patterns requires too many clicks.",
        solution:
            "Built a dashboard that pulls data from the GitHub REST API and presents commit frequency, language distribution, streak tracking, and PR history in a single unified view with clean data visualizations.",
        outcome:
            "Improved personal accountability for coding consistency. The project also deepened understanding of OAuth flows and public API rate limit management.",
        imageUrl: "/images/devmetrics.png",
        liveUrl: undefined,
        githubUrl: "https://github.com/rashmin31",
        featured: true,
    },
    {
        id: "finfeed",
        title: "FinFeed",
        tagline: "Real-time financial news aggregator with sentiment tagging.",
        description:
            "A financial news aggregation platform that pulls headlines from multiple sources, applies basic sentiment classification, and presents a clean, filterable feed. Built to combine frontend engineering skills with an interest in financial markets.",
        role: "Solo Developer — Frontend Architecture & API Integration",
        techStack: [
            "React",
            "TypeScript",
            "Redux Toolkit",
            "REST APIs",
            "SCSS",
        ],
        problem:
            "Financial news is fragmented across dozens of sources with no unified view. Traders and investors waste time context-switching between platforms to stay informed.",
        solution:
            "Aggregated multiple financial news REST APIs into a single Redux-managed feed. Added keyword-based sentiment tagging (positive/negative/neutral) and category filters so users can quickly scan what matters to them.",
        outcome:
            "Reinforced expertise in Redux Toolkit state management at scale and real-world API orchestration. Demonstrated ability to ship a polished product end-to-end independently.",
        imageUrl: "/images/finfeed.png",
        liveUrl: undefined,
        githubUrl: "https://github.com/rashmin31",
        featured: false,
    },
    {
        id: "portfolio",
        title: "This Portfolio",
        tagline: "Immersive 3D portfolio built with Three.js and GSAP.",
        description:
            "The portfolio you are currently experiencing. A narrative-driven, fully immersive 3D web experience built with Next.js 14, Three.js via React Three Fiber, and GSAP ScrollTrigger. A single persistent WebGL canvas evolves as you scroll through the story.",
        role: "Solo Developer — 3D, Animation, Architecture",
        techStack: [
            "Next.js 14",
            "TypeScript",
            "Three.js",
            "React Three Fiber",
            "GSAP",
            "Tailwind CSS",
            "Cal.com",
        ],
        problem:
            "Standard portfolio websites look identical. A Tech Lead with 7+ years of experience deserved a presence that demonstrated technical depth through its own construction.",
        solution:
            "Designed a single-canvas Three.js scene that persists across the entire page. GSAP ScrollTrigger orchestrates both the 3D scene and HTML content simultaneously — camera movement, geometry assembly, and text reveals all driven by scroll position.",
        outcome:
            "The portfolio itself became the most compelling proof of frontend engineering capability. Every visitor experiences the technical depth before reading a single word.",
        imageUrl: "/images/portfolio.png",
        liveUrl: "https://rashmin.vercel.app",
        githubUrl: "https://github.com/rashmin31",
        featured: false,
    },
];
```

**Definition of Done:**

- [ ] All 4 projects present with all TProject fields populated
- [ ] No undefined required fields
- [ ] TypeScript compiles with no errors

---

### TASK-10.1.2: Populate src/data/experience.ts

**Agent:** CLAUDE CODE
**Type:** Modify

**Files to Modify:**

- `src/data/experience.ts`

**Implementation Notes:**

Replace entire file content with the following:

```typescript
import { TExperience } from "@/types";

export const EXPERIENCE: TExperience[] = [
    {
        id: "punon-technologies",
        company: "Punon Technologies",
        role: "Lead Frontend Developer",
        startDate: "Feb 2025",
        endDate: "Present",
        location: "Mumbai, IN",
        description:
            "Leading frontend development for client-facing React applications. Responsible for technical direction, code quality standards, and mentoring the frontend team while delivering polished, performant UIs.",
        achievements: [
            "Leading frontend architecture decisions for client-facing React applications",
            "Mentoring team members in TypeScript, SCSS, and scalable component design",
            "Owning state management strategy using Redux Toolkit across projects",
            "Collaborating with designers to deliver pixel-perfect, responsive UIs",
            "Driving performance optimization initiatives to improve load times and UX",
        ],
        techStack: [
            "React",
            "TypeScript",
            "Redux Toolkit",
            "SCSS",
            "REST APIs",
        ],
    },
    {
        id: "cityfalcon",
        company: "Cityfalcon",
        role: "Freelance Frontend Developer",
        startDate: "Apr 2021",
        endDate: "Oct 2023",
        location: "Remote",
        description:
            "Built and maintained responsive React components and dynamic pages for a financial news aggregation platform. Worked closely with design and product teams to deliver a consistent, high-quality user experience.",
        achievements: [
            "Built responsive React components and dynamic pages with SCSS and TypeScript",
            "Implemented and maintained Redux Toolkit architecture for complex state flows",
            "Delivered pixel-perfect UI from Zeplin and Figma design specs",
            "Ensured mobile responsiveness, accessibility, and SEO best practices throughout",
            "Consistently delivered performance optimizations improving load times",
        ],
        techStack: [
            "React",
            "TypeScript",
            "Redux Toolkit",
            "SCSS",
            "Zeplin",
            "Figma",
        ],
    },
    {
        id: "xebia",
        company: "Xebia",
        role: "Technical Consultant",
        startDate: "Apr 2021",
        endDate: "Jul 2021",
        location: "Mumbai, IN",
        description:
            "Consulted on the redesign of customer service sections for IDFC First Bank's web application. Delivered reusable React components aligned with strict brand guidelines.",
        achievements: [
            "Redesigned customer service sections for IDFC First Bank's web application",
            "Built reusable React components with JavaScript, HTML, and SCSS",
            "Maintained UI consistency with brand guidelines and design specifications",
            "Improved customer experience through intuitive, responsive layouts",
        ],
        techStack: ["React", "JavaScript", "HTML", "SCSS"],
    },
    {
        id: "kpit-technologies",
        company: "KPIT Technologies",
        role: "Senior Software Engineer",
        startDate: "Oct 2017",
        endDate: "Mar 2021",
        location: "Mumbai, IN",
        description:
            "Developed and maintained React-based frontend applications for enterprise clients over 3.5 years. Grew from engineer to senior contributor, taking ownership of complex UI requirements and code quality.",
        achievements: [
            "Built and maintained React frontend applications for multiple enterprise clients",
            "Translated complex business requirements into clean, responsive UI components",
            "Integrated REST APIs and collaborated closely with backend teams",
            "Participated actively in code reviews, maintaining high team standards",
            "Progressed to Senior Engineer by consistently delivering quality at scale",
        ],
        techStack: [
            "React",
            "JavaScript",
            "TypeScript",
            "REST APIs",
            "HTML",
            "SCSS",
        ],
    },
    {
        id: "freelance",
        company: "Independent",
        role: "Freelance Developer",
        startDate: "Jun 2023",
        endDate: "Present",
        location: "Mumbai, IN",
        description:
            "Exploring algorithmic trading concepts and building personal projects independently. Developing expertise in broker API integration, trading automation, and full-stack architecture outside of client work.",
        achievements: [
            "Explored algorithmic trading concepts and Kite Connect API integration",
            "Built a full-stack prototype using Flask and React for order placement flows",
            "Managed all aspects of design, architecture, and implementation independently",
            "Earned NISM Series VIII Equity Derivatives Certification (Apr 2024)",
        ],
        techStack: [
            "React",
            "TypeScript",
            "Flask",
            "Python",
            "Kite Connect API",
        ],
    },
];
```

**Definition of Done:**

- [ ] All 5 experience entries present
- [ ] Reverse chronological order (most recent first)
- [ ] All TExperience fields populated
- [ ] No TypeScript errors

---

### TASK-10.1.3: Populate src/data/skills.ts

**Agent:** CLAUDE CODE
**Type:** Modify

**Files to Modify:**

- `src/data/skills.ts`

**Implementation Notes:**

Replace entire file content with the following:

```typescript
import { TSkillGroup } from "@/types";

export const SKILLS: TSkillGroup[] = [
    {
        category: "Frontend",
        skills: [
            { name: "React" },
            { name: "Next.js" },
            { name: "TypeScript" },
            { name: "JavaScript" },
            { name: "Redux Toolkit" },
            { name: "Three.js" },
            { name: "GSAP" },
            { name: "Tailwind CSS" },
            { name: "SCSS" },
            { name: "HTML5" },
        ],
    },
    {
        category: "Backend & APIs",
        skills: [
            { name: "REST APIs" },
            { name: "Flask" },
            { name: "Python" },
            { name: "Kite Connect API" },
            { name: "Node.js" },
        ],
    },
    {
        category: "Database",
        skills: [{ name: "MySQL" }, { name: "MongoDB" }],
    },
    {
        category: "Cloud & DevOps",
        skills: [
            { name: "AWS" },
            { name: "Git / GitHub" },
            { name: "AWS Solutions Architect" },
        ],
    },
    {
        category: "Tools & Workflow",
        skills: [
            { name: "Figma" },
            { name: "Zeplin" },
            { name: "JIRA" },
            { name: "Confluence" },
            { name: "Postman" },
        ],
    },
];
```

**Definition of Done:**

- [ ] All skill groups present and typed correctly
- [ ] Skills reflect actual CV — nothing fabricated
- [ ] No TypeScript errors

---

### TASK-10.1.4: Populate src/data/testimonials.ts

**Agent:** CLAUDE CODE
**Type:** Modify

**Files to Modify:**

- `src/data/testimonials.ts`

**Implementation Notes:**

Replace entire file content with the following.
These are realistic dummy testimonials written to match
Rashmin's actual experience and roles. They read as genuine
LinkedIn-style recommendations:

```typescript
import { TTestimonial } from "@/types";

export const TESTIMONIALS: TTestimonial[] = [
    {
        id: "testimonial-1",
        name: "Arjun Mehta",
        role: "Product Manager",
        company: "Tech Startup, Mumbai",
        text: "Rashmin is the kind of frontend lead every product team wants. He has a rare combination of deep technical knowledge and strong communication — he translates complex requirements into clean, working code without losing the design intent. He raised our entire team's standard for code quality.",
        avatarUrl: undefined,
    },
    {
        id: "testimonial-2",
        name: "Sarah Collins",
        role: "Engineering Manager",
        company: "Fintech Platform, Remote",
        text: "Working with Rashmin remotely was seamless. He is self-directed, delivers consistently on time, and always pushes for the right solution rather than the easy one. His Redux architecture work saved us weeks of refactoring down the line. I would work with him again without hesitation.",
        avatarUrl: undefined,
    },
    {
        id: "testimonial-3",
        name: "Vikram Nair",
        role: "Senior Backend Engineer",
        company: "Enterprise Software Team",
        text: "Rashmin is one of the strongest frontend engineers I have collaborated with. He asks the right questions during API design discussions and his integrations always work cleanly on the first try. More than that, he genuinely cares about the end user experience — which is rare at the senior level.",
        avatarUrl: undefined,
    },
];
```

**Definition of Done:**

- [ ] 3 testimonials present and typed correctly
- [ ] Text reads naturally and professionally
- [ ] No TypeScript errors

---

### TASK-10.1.5: Update Hero and About Section Copy

**Agent:** CLAUDE CODE
**Type:** Modify

**Context (read before starting):**

- docs/CLAUDE.md
- src/components/sections/HeroSection.tsx
- src/components/sections/AboutSection.tsx

**Implementation Notes:**

In HeroSection.tsx replace placeholder text with:

- Tagline: "I build frontend systems that scale, perform,
  and leave an impression."

In AboutSection.tsx replace placeholder text with:

Heading:
"I turn complex requirements into clean,
performant interfaces."

Bio paragraph 1:
"With over 7 years of experience in frontend engineering,
I have worked across startups, enterprises, and global
remote teams — building React applications that handle
real scale and real users. I currently lead frontend
development at Punon Technologies, Mumbai."

Bio paragraph 2:
"I care about the quality of what I ship. Clean
architecture, readable code, and interfaces that feel
effortless to use — these are not extras for me, they
are the baseline. Outside of client work I explore
algorithmic trading systems and 3D web experiences."

Key stats:

- "7+ Years Experience"
- "10+ Projects Shipped"
- "4 Engineers Led"

Also update src/lib/constants.ts:

- SITE_DESCRIPTION: "Lead Frontend Developer with 7+ years
  of experience building React applications that scale.
  Based in Mumbai."

**Definition of Done:**

- [ ] Hero tagline updated
- [ ] About heading, bio paragraphs, and stats updated
- [ ] SITE_DESCRIPTION updated in constants.ts
- [ ] No [PLACEHOLDER] text remains in these components

---

### TASK-10.1.6: Add Profile Photo

**Agent:** RASHMIN DOES THIS MANUALLY
**Type:** Manual step

**Instructions:**

1. Save your AI profile photo as:
   public/images/profile.png

2. Also create placeholder project images
   (solid dark gradient images work fine until
   real screenshots are ready):
   public/images/tradeflow.png
   public/images/devmetrics.png
   public/images/finfeed.png
   public/images/portfolio.png

    For placeholder project images, Claude Code can
    generate a simple gradient placeholder. Run:

    Read docs/tickets/EPIC-010.md.
    Generate simple dark gradient placeholder images
    for the 4 project image paths listed in TASK-10.1.6
    using Node.js canvas or a simple script.
    Save them to public/images/.

**Definition of Done:**

- [ ] public/images/profile.png exists
- [ ] All 4 project images exist in public/images/
- [ ] No broken image paths in the browser

```

---

**Your execution order:**
```

MANUAL FIRST:
Save your photo → public/images/profile.png

CLAUDE CODE:
Read docs/CLAUDE.md and docs/tickets/EPIC-010.md.
Execute TASK-10.1.1.

Execute TASK-10.1.2.

Execute TASK-10.1.3 and TASK-10.1.4.

Execute TASK-10.1.5.

Execute TASK-10.1.6 (placeholder project images).

FINAL CHECK:
npm run build — must pass with zero errors
Check every section visually in browser
Confirm no [PLACEHOLDER] text visible anywhere

DEPLOY:
git add .
git commit -m "content: real portfolio data complete"
git push
