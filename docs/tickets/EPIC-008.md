# EPIC-8: Deployment and SEO
Phase: 2
Goal: Site is live on Vercel, SEO optimized, performance verified,
      and ready for Rashmin to share with the world.

---

## STORY-8.1: Deploy to Vercel and Optimize
**User Story:** As Rashmin, I want my portfolio live at rashmin.vercel.app
so that I can start sharing it immediately.

**Acceptance Criteria:**
- [ ] Site deploys successfully to Vercel
- [ ] No build errors
- [ ] Lighthouse score > 85 on desktop
- [ ] All environment variables set in Vercel dashboard
- [ ] Open Graph image set for social sharing

---

### TASK-8.1.1: Configure next.config.js for Production
**Agent:** CLAUDE CODE
**Type:** Create

**Context (read before starting):**
- docs/ARCHITECTURE.md (Security Considerations)

**Files to Create/Modify:**
- `next.config.js`

**Implementation Notes:**
```javascript
const nextConfig = {
  // Allow Three.js WASM if needed
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      three: require.resolve('three'),
    }
    return config
  },
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ]
  },
  // Image domains if needed
  images: {
    domains: [],
  },
}
module.exports = nextConfig
```

---

### TASK-8.1.2: Create OG Image and Final SEO Pass
**Agent:** CLAUDE CODE
**Type:** Create

**Context (read before starting):**
- src/lib/constants.ts
- src/app/layout.tsx

**Files to Create:**
- `src/app/opengraph-image.tsx` — Next.js auto-generates OG image

**Implementation Notes:**

Use Next.js built-in OG image generation:
```typescript
import { ImageResponse } from 'next/og'
export const runtime = 'edge'
export const size = { width: 1200, height: 630 }

export default async function Image() {
  return new ImageResponse(
    <div style={{ background: '#050505', width: '100%', height: '100%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexDirection: 'column' }}>
      <div style={{ color: '#6366f1', fontSize: 24, fontFamily: 'monospace',
        marginBottom: 16 }}>rashmin.vercel.app</div>
      <div style={{ color: '#f9fafb', fontSize: 72, fontWeight: 'bold' }}>
        Rashmin Bhanderi
      </div>
      <div style={{ color: '#9ca3af', fontSize: 32, marginTop: 16 }}>
        Tech Lead & Full Stack Developer
      </div>
    </div>
  )
}
```

Also add to layout.tsx metadata: robots, canonical URL, and verify
all meta tags are complete.

**Definition of Done:**
- [ ] OG image generates at /opengraph-image
- [ ] Looks correct when pasted in social share debugger
- [ ] All meta tags complete in page source
- [ ] Build completes with no warnings
```

---
```