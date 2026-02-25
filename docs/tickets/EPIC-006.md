# EPIC-6: Testimonials and Contact Sections
Phase: 2
Goal: Testimonials provide social proof. Contact form works end-to-end
      with EmailJS — sends real emails and shows clear success/error states.

---

## STORY-6.1: Build Testimonials Section
**User Story:** As a recruiter, I want to see what others say about
Rashmin so that I have third-party validation of his abilities.

**Acceptance Criteria:**
- [ ] Testimonials displayed from src/data/testimonials.ts
- [ ] Premium card design
- [ ] Scroll animations

---

### TASK-6.1.1: Build TestimonialsSection.tsx
**Agent:** ANTIGRAVITY
**Type:** Modify

**Context (read before starting):**
- src/data/testimonials.ts
- src/types/TTestimonial.ts

**Files to Modify:**
- `src/components/sections/TestimonialsSection.tsx`

**Implementation Notes:**

Section layout:

Header:
- "TESTIMONIALS" label
- Heading: "What people say." (text-4xl, font-display)

Testimonial cards:
- Display in a grid: grid-cols-1 md:grid-cols-2, gap-6
- Card: bg-surface, border border-muted, rounded-2xl, p-8
- Large opening quote mark: text-6xl text-accent opacity-30, font-display, mb-4
- Quote text: text-text-secondary, text-lg, italic, leading-relaxed
- Attribution row: avatar (circular, 40x40, with initials fallback if no avatarUrl) + name + role + company
- Name: text-text-primary, font-display
- Role + Company: text-text-secondary, font-mono, text-sm

GSAP: cards fade up on scroll entry, stagger 0.2s

---

## STORY-6.2: Build Contact Form with EmailJS
**User Story:** As a recruiter or CTO, I want to contact Rashmin directly
from the site so that outreach is frictionless.

**Acceptance Criteria:**
- [ ] Form fields: Name, Email, Subject, Message
- [ ] Client-side validation before submission
- [ ] Server-side validation via /api/contact
- [ ] EmailJS sends email to Rashmin on success
- [ ] Auto-reply sent to the person who submitted
- [ ] Success and error states shown clearly
- [ ] Form resets on success

---

### TASK-6.2.1: Build Contact API Route
**Agent:** CLAUDE CODE
**Type:** Create

**Context (read before starting):**
- docs/API-SPEC.md (POST /contact specification)

**Files to Create:**
- `src/app/api/contact/route.ts`

**Implementation Notes:**

Next.js App Router API route:

1. Only accept POST — return 405 for anything else
2. Parse request body as JSON
3. Validate using this logic:
   - name: required, string, 2-100 chars
   - email: required, valid email regex
   - subject: required, string, 5-150 chars
   - message: required, string, 20-2000 chars
   - Strip any HTML tags from all string fields
4. If validation fails: return 400 with errors object (per API spec)
5. If validation passes: return 200 with success: true
6. Wrap in try/catch: return 500 on unexpected error

Use Zod for validation schema:
```typescript
import { z } from 'zod'
const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  subject: z.string().min(5).max(150),
  message: z.string().min(20).max(2000),
})
```

**Definition of Done:**
- [ ] POST with valid data returns 200
- [ ] POST with invalid data returns 400 with field-level errors
- [ ] GET request returns 405
- [ ] HTML tags stripped from all string inputs
- [ ] No TypeScript errors

---

### TASK-6.2.2: Build useEmailJS Hook
**Agent:** CLAUDE CODE
**Type:** Create

**Context (read before starting):**
- src/lib/emailjs.ts
- src/types/TContactForm.ts

**Files to Create:**
- `src/hooks/useEmailJS.ts`

**Implementation Notes:**
```typescript
export function useEmailJS() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<TEmailResult | null>(null)

  const sendEmail = async (formData: TContactForm): Promise<TEmailResult> => {
    setIsLoading(true)
    setResult(null)

    try {
      // Step 1: Server-side validation
      const validationRes = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!validationRes.ok) {
        const error = await validationRes.json()
        const result = { success: false, error: 'Validation failed' }
        setResult(result)
        return result
      }

      // Step 2: Send via EmailJS
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { from_name: formData.name, from_email: formData.email,
          subject: formData.subject, message: formData.message }
      )

      // Step 3: Send auto-reply
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_AUTOREPLY_TEMPLATE_ID,
        { to_name: formData.name, to_email: formData.email }
      )

      const result = { success: true }
      setResult(result)
      return result
    } catch (err) {
      const result = { success: false, error: 'Failed to send. Please try again.' }
      setResult(result)
      return result
    } finally {
      setIsLoading(false)
    }
  }

  return { sendEmail, isLoading, result }
}
```

**Definition of Done:**
- [ ] Hook handles loading, success, and error states
- [ ] Calls API validation before EmailJS
- [ ] Sends both outbound and auto-reply emails
- [ ] TypeScript types correct throughout

---

### TASK-6.2.3: Build ContactSection.tsx
**Agent:** ANTIGRAVITY
**Type:** Modify

**Context (read before starting):**
- docs/PRD.md (Contact Form acceptance criteria)
- src/hooks/useEmailJS.ts
- src/types/TContactForm.ts

**Files to Modify:**
- `src/components/sections/ContactSection.tsx`

**Implementation Notes:**

Section layout (min-height: 100vh):

Left side (40%):
- "LET'S WORK TOGETHER" label (font-mono, text-accent)
- Heading: "Have a project in mind?" (text-4xl, font-display)
- Paragraph: "[PLACEHOLDER: Brief invite to reach out]"
- Direct email link: "[PLACEHOLDER: rashmin@email.com]" (text-accent, underline on hover)
- LinkedIn icon link

Right side (60%): The form

Form fields (use react-hook-form):
- Name: text input
- Email: email input
- Subject: text input
- Message: textarea, 5 rows

Input styles: w-full, bg-surface, border border-muted, rounded-xl, px-4 py-3,
font-mono, text-text-primary, focus:border-accent, focus:outline-none, transition

Label styles: block, font-mono, text-sm, text-text-secondary, mb-2

Submit button:
- Default: "Send Message" — bg-accent, text-white, px-8 py-4, rounded-xl, font-mono
- Loading: "Sending..." with spinner icon, disabled
- Hover: bg-accent/80, scale-105, transition

Success state: Replace form with a success message — animated check icon,
"Message sent! I'll get back to you soon." — use GSAP fade in

Error state: Red error message below submit button — "Something went wrong. Please try again."

Validation errors: Show inline below each field in red, font-mono, text-xs

**Definition of Done:**
- [ ] All 4 fields present with correct validation
- [ ] Submit calls useEmailJS hook
- [ ] Loading state disables form and shows spinner
- [ ] Success state shows after send
- [ ] Error state shows on failure
- [ ] Form resets after successful submission