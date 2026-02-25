# EPIC-009: Meeting Scheduler
Phase: 3 — Post Launch
Goal: Replace the contact section with a premium booking experience
that lets visitors schedule a Google Meet call with Rashmin directly
from the portfolio — without leaving the site.

---

## STORY-9.1: Cal.com Setup (Manual — Rashmin does this)
Before any code is written, complete these steps:

1. Go to cal.com → create free account
2. Connect your Google Calendar:
   Settings → Calendars → Connect Google Calendar
3. Enable Google Meet:
   Settings → Conferencing → Google Meet → Enable
4. Create an event type:
   - Name: "Quick Chat with Rashmin" (or similar)
   - Duration: 30 minutes
   - Description: "[PLACEHOLDER: What this call is for]"
5. Customize appearance:
   Settings → Appearance
   - Brand color: #6366f1 (matches your accent)
   - Theme: Dark
6. Get your Cal.com username — you'll need it for the code.
   Your booking URL will be: cal.com/[your-username]/quick-chat

---

## STORY-9.2: Replace Contact Section with Scheduler
**User Story:** As a recruiter or CTO, I want to book a call with
Rashmin directly from his portfolio so that I can have a real
conversation without back-and-forth emails.

**Acceptance Criteria:**
- [ ] Contact section replaced with scheduler section
- [ ] "Book a Call" button triggers a modal
- [ ] Cal.com embed loads inside the modal themed to match site
- [ ] Modal closes on Escape key and overlay click
- [ ] EmailJS contact form removed cleanly
- [ ] NavigationDots label updated from "Contact" to "Schedule"
- [ ] CLAUDE.md updated to reflect removal of EmailJS

---

### TASK-9.2.1: Install Cal.com Embed and Remove EmailJS
**Agent:** CLAUDE CODE
**Type:** Modify

**Context (read before starting):**
- docs/CLAUDE.md
- src/components/sections/ContactSection.tsx
- src/hooks/useEmailJS.ts
- src/app/api/contact/route.ts

**Files to Delete:**
- `src/hooks/useEmailJS.ts` — no longer needed
- `src/app/api/contact/route.ts` — no longer needed

**Implementation Notes:**

1. Install Cal.com embed package:
   npm install @calcom/embed-react

2. Remove emailjs-com from dependencies:
   npm uninstall emailjs-com

3. Remove src/lib/emailjs.ts

4. Remove from .env.local.example:
   All 4 EMAILJS variables

5. Update src/lib/constants.ts:
   Change NAV_SECTIONS entry from:
   { id: 'contact', label: 'Contact' }
   to:
   { id: 'contact', label: 'Schedule' }

**Definition of Done:**
- [ ] @calcom/embed-react installed
- [ ] emailjs-com uninstalled
- [ ] useEmailJS hook deleted
- [ ] API contact route deleted
- [ ] emailjs.ts lib file deleted
- [ ] No broken imports anywhere
- [ ] npm run build passes with no errors

---

### TASK-9.2.2: Build SchedulerModal.tsx
**Agent:** CLAUDE CODE
**Type:** Create

**Context (read before starting):**
- docs/CLAUDE.md
- src/components/ui/ProjectModal.tsx (reference for modal pattern)

**Files to Create:**
- `src/components/ui/SchedulerModal.tsx`

**Implementation Notes:**

Use @calcom/embed-react to embed the scheduler:
```typescript
'use client'
import Cal, { getCalApi } from '@calcom/embed-react'
import { useEffect } from 'react'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export function SchedulerModal({ isOpen, onClose }: Props) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi()
      cal('ui', {
        theme: 'dark',
        styles: {
          branding: { brandColor: '#6366f1' }
        },
        hideEventTypeDetails: false,
      })
    })()
  }, [])

  if (!isOpen) return null

  return (
    // Overlay: fixed inset-0, bg-background/90, backdrop-blur-md, z-50
    // Click overlay to close
    // Modal panel: max-w-3xl, mx-auto, bg-surface, border border-muted,
    //   rounded-2xl, overflow-hidden, max-h-[90vh]
    // Close button: top-right corner
    // Cal embed fills the panel:
    <Cal
      calLink="[PLACEHOLDER: your-cal-username/quick-chat]"
      style={{ width: '100%', height: '100%', minHeight: '600px' }}
      config={{ layout: 'month_view' }}
    />
    // Escape key closes modal — useEffect keyboard listener
    // Body scroll lock when open
  )
}
```

PLACEHOLDER note: Rashmin must replace
[PLACEHOLDER: your-cal-username/quick-chat]
with his actual Cal.com link before this works.

**Definition of Done:**
- [ ] Modal opens and closes with GSAP animation
- [ ] Cal.com embed renders inside modal
- [ ] Dark theme applied to Cal embed
- [ ] Escape key closes modal
- [ ] Overlay click closes modal
- [ ] Body scroll locked when open

---

### TASK-9.2.3: Build New ContactSection.tsx (Scheduler Version)
**Agent:** CLAUDE CODE
**Type:** Modify

**Context (read before starting):**
- docs/CLAUDE.md
- src/components/ui/SchedulerModal.tsx

**Files to Modify:**
- `src/components/sections/ContactSection.tsx`
  — Replace entire form implementation with scheduler CTA

**Implementation Notes:**

New section layout (min-height: 100vh, centered):

Remove entirely:
- All react-hook-form imports and usage
- All EmailJS references
- Form fields (Name, Email, Subject, Message)
- Submit button and form states

Replace with:

Left side (same as before):
- "LET'S WORK TOGETHER" label (font-mono, text-accent)
- Heading: "Have a project in mind?" (text-4xl, font-display)
- Paragraph: "[PLACEHOLDER: Brief invite — what kind of calls
  you're open to, e.g. 'I'm open to discussing new opportunities,
  technical consultations, and interesting projects.']"
- Direct email as fallback:
  "[PLACEHOLDER: your@email.com]" (text-accent, text-sm)
  with label: "or reach out directly"

Right side:
- Large centered CTA card:
  bg-surface, border border-muted, rounded-2xl, p-10
  - Icon: calendar icon (lucide-react CalendarDays)
  - Heading: "Book a 30-min call"
  - Subtext: "Pick a time that works for you.
    We'll meet on Google Meet."
  - Button: "Schedule a Meeting"
    bg-accent, text-white, px-8 py-4, rounded-xl, font-mono
    onClick: setModalOpen(true)
  - Small note below button:
    "Free · 30 minutes · Google Meet"
    font-mono, text-xs, text-muted

State:
- const [modalOpen, setModalOpen] = useState(false)
- Render SchedulerModal with isOpen and onClose props

GSAP ScrollTrigger:
- Left side slides from left on scroll entry
- Right CTA card fades up with slight scale from 0.95 to 1.0

**Definition of Done:**
- [ ] Old form completely removed
- [ ] CTA card renders correctly
- [ ] Button opens SchedulerModal
- [ ] GSAP scroll animation triggers correctly
- [ ] No EmailJS imports remaining anywhere in this file

---

### TASK-9.2.4: Update CLAUDE.md
**Agent:** CLAUDE CODE
**Type:** Modify

**Context (read before starting):**
- docs/CLAUDE.md

**Files to Modify:**
- `docs/CLAUDE.md`

**Implementation Notes:**

Update these sections in CLAUDE.md:

1. Tech Stack section:
   Remove: "Email: EmailJS 4.x"
   Add: "Scheduler: Cal.com embed (@calcom/embed-react)"

2. Environment Variables section:
   Remove all 4 EMAILJS variables
   Add:
   CAL_USERNAME — your Cal.com username (used in SchedulerModal.tsx)
   Note: This is not a secret — safe to hardcode in component
   but kept here for easy reference

3. Key Architectural Decisions:
   Add entry:
   "Contact form replaced with Cal.com embed modal.
   EmailJS and /api/contact route removed entirely.
   Scheduling handled client-side via @calcom/embed-react.
   Google Meet links generated automatically by Cal.com."

4. What NOT to Change:
   Remove any reference to EmailJS or contact API route

**Definition of Done:**
- [ ] CLAUDE.md reflects current stack accurately
- [ ] No EmailJS references remain in CLAUDE.md
- [ ] Cal.com approach documented clearly
```
