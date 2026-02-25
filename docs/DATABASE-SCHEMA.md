# Database Schema — Rashmin Bhanderi Portfolio

## No Database Required

This portfolio is a fully static site. There is no database.
All content is stored in TypeScript data files under src/data/.

Content is managed by editing these files directly:
- src/data/projects.ts
- src/data/experience.ts
- src/data/skills.ts
- src/data/testimonials.ts

## Why No Database
- Content changes infrequently (projects added every few weeks/months)
- No user accounts or sessions
- No dynamic content that requires server-side data fetching
- TypeScript data files give full type safety and IDE autocomplete
- Zero infrastructure cost and complexity

## Future Database Consideration
If a CMS or admin panel is added in a future version, the recommended approach
would be PlanetScale (MySQL) or Supabase (Postgres) with Prisma ORM,
as these integrate natively with Vercel's deployment model.