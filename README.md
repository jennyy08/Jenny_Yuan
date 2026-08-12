# Portfolio — base scaffold

Next.js 15 + React 19 + TypeScript + Tailwind. Font is Geist (Sans + Mono),
matching the inspo sites you sent.

## Structure

```
app/
  layout.tsx      — root layout, font setup, metadata (edit the <title>/description)
  page.tsx         — assembles the sections below, in order
  globals.css      — base styles, hairline dividers, reduced-motion handling
components/
  Hero.tsx         — name, status line, school link
  NowDone.tsx      — "what i'm doing" / "what i've done" bullet lists
  Projects.tsx     — project rows (year, tag, title, description, link)
  Interests.tsx    — the scrolling strip of interests/hobbies (the "texture" layer)
  Footer.tsx        — contact links
lib/
  data.ts          — ALL your real content lives here. Start by editing this file.
public/
  images/          — drop project screenshots + photos here, referenced from data.ts
```

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## What to edit first

1. **`lib/data.ts`** — your name, school link, status, projects, interests, photos.
   This is 90% of what makes the site yours.
2. **`public/images/`** — drop in project screenshots and photos, point `data.ts`
   entries at them (e.g. `/images/project-1.png`).
3. **`app/layout.tsx`** — update the page `<title>` and `description`.
4. **Colors** — in `tailwind.config.ts` under `theme.extend.colors`. Currently:
   - `paper` — background
   - `ink` — text
   - `accent` — links/hover/tags (cobalt blue)
   - `pitch` — the interests strip background (muted olive green, a quiet nod
     to soccer without making the whole site soccer-themed)

## Notes on the design choices

- The interests strip is deliberately texture, not a full theme — a subtle
  colored band with your hobbies in it, not a soccer-pitch-styled site.
  This keeps it feeling like personality rather than a gimmick.
- No shadows/cards — sections are separated with hairline dividers (`.hr-line`),
  matching the clean, minimal feel of your inspo.
- Add a `/photos` page later (like `matthewhamilton.dev/photos`) once you have
  travel/friends photos to show — happy to help scaffold that next.

## Deploying

Push to GitHub, then import the repo on [vercel.com](https://vercel.com) —
zero-config for Next.js.
