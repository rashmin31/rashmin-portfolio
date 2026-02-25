# Product Requirements Document — Rashmin Bhanderi Portfolio
Version 1.0 | February 2026

## Product Vision
A narrative-driven, fully immersive 3D portfolio that takes visitors on a journey
through Rashmin's world — not a page they scroll through, but a space they move
through. Every section transition, every animation, every interaction reinforces
a single message: this is someone who builds things that work, beautifully.

## User Personas

### Persona 1: The Recruiter (Priya)
- Goal: Quickly assess if Rashmin fits a senior/lead engineering role
- Pain point: Hundreds of identical LinkedIn profiles and CVs with no signal
- Usage pattern: Lands on site, spends 2-4 minutes, either contacts or bounces

### Persona 2: The Startup CTO (Marcus)
- Goal: Find a Tech Lead who can own architecture and delivery end-to-end
- Pain point: Can't tell from a CV if someone actually leads or just codes
- Usage pattern: Deep dives into projects, reads experience timeline carefully,
  then contacts directly

### Persona 3: The Fellow Developer (Aryan)
- Goal: See what Rashmin builds and how he thinks
- Pain point: Portfolios that show screenshots but no technical depth
- Usage pattern: Checks tech stack, looks at project details, may share with others

## Feature List
| Feature | Priority | Description | Persona |
|---|---|---|---|
| 3D Hero Section | P0 | Full-screen immersive 3D scene with name/title reveal | All |
| Narrative Scroll Journey | P0 | GSAP ScrollTrigger drives story progression through all sections | All |
| About Me Section | P0 | Personal story with animated reveal | Priya, Marcus |
| Skills / Tech Stack | P0 | Animated display of technologies with visual hierarchy | All |
| Work Experience Timeline | P0 | Chronological career story with scroll-triggered animations | Priya, Marcus |
| Projects Showcase | P0 | Curated project cards with modal detail view | Marcus, Aryan |
| Testimonials Section | P1 | Social proof from colleagues/clients | Priya, Marcus |
| Contact Form | P0 | EmailJS-powered form with validation and confirmation | All |
| Smooth Page Transitions | P0 | GSAP-powered transitions between sections | All |
| Performance Optimization | P0 | Fast load, lazy 3D loading, WebGL fallback | All |

## User Stories

### Feature: Hero Section
- As a visitor, I want to be immediately captivated by the landing experience
  so that I know this person is exceptional before reading a single word.
- Acceptance Criteria:
  - [ ] 3D scene loads within 3 seconds on a standard connection
  - [ ] Rashmin's name and title animate into view with impact
  - [ ] A clear visual cue invites the visitor to scroll/explore
  - [ ] Scene is interactive (responds to mouse movement or scroll)

### Feature: Narrative Scroll Journey
- As a visitor, I want the site to guide me through a story as I scroll
  so that I experience Rashmin's journey rather than just reading about it.
- Acceptance Criteria:
  - [ ] Each section transition is driven by scroll position via GSAP ScrollTrigger
  - [ ] 3D elements in the scene evolve as the user scrolls through sections
  - [ ] No jarring cuts — all transitions feel continuous and intentional
  - [ ] Progress indicator shows where the visitor is in the journey

### Feature: Projects Showcase
- As a CTO, I want to see detailed information about Rashmin's projects
  so that I can assess the scope and quality of his delivery.
- Acceptance Criteria:
  - [ ] At least project cards visible in the showcase grid/carousel
  - [ ] Each card shows: title, tech stack used, brief description, role
  - [ ] Clicking a card opens a modal with full project detail
  - [ ] Modal includes: problem, solution, tech decisions, outcome/impact
  - [ ] External link to live project or GitHub where available

### Feature: Contact Form
- As a recruiter, I want to contact Rashmin directly from the site
  so that I don't have to leave and find his email separately.
- Acceptance Criteria:
  - [ ] Form fields: Name, Email, Subject, Message
  - [ ] Client-side validation before submission
  - [ ] EmailJS sends email to Rashmin's inbox on submission
  - [ ] Auto-reply confirmation sent to the person who submitted
  - [ ] Success and error states are clearly communicated to the user
  - [ ] Form resets after successful submission

### Feature: Work Experience Timeline
- As a recruiter, I want to see Rashmin's career progression clearly
  so that I can quickly understand his seniority and trajectory.
- Acceptance Criteria:
  - [ ] Timeline entries reveal on scroll via GSAP animation
  - [ ] Each entry shows: Company, Role, Duration, Key achievements
  - [ ] Visual hierarchy makes it clear this is a progression upward
  - [ ] Most recent experience is most prominent

### Feature: Skills / Tech Stack
- As a developer peer, I want to see what technologies Rashmin works with
  so that I can assess fit for collaboration or referral.
- Acceptance Criteria:
  - [ ] Skills are grouped by category (Frontend, Backend, DevOps, etc.)
  - [ ] Each skill/technology is visually represented
  - [ ] Animation reveals skills on scroll entry
  - [ ] No generic "proficiency bars" — visual treatment must feel premium

## Non-Functional Requirements
- Performance: Initial load < 3s on standard broadband; Lighthouse score > 85
- 3D Performance: Maintain 60fps on mid-range laptops with dedicated GPU
- Security: No sensitive data stored; EmailJS keys stored in environment variables
- Scalability: Static site — Vercel CDN handles any traffic spike automatically
- Availability: 99.9% uptime via Vercel
- Accessibility: Keyboard navigable; reduced-motion media query respected
- SEO: Proper meta tags, OpenGraph, structured data for Rashmin's name/role

## Out of Scope (v1)
- Blog / Medium integration
- Custom domain
- Analytics
- CMS
- Mobile-first 3D experience (desktop primary, mobile graceful degradation)