# Portfolio Website

Personal portfolio for Rj, an aspiring software engineer. Audience is recruiters
and potential clients. Projects will be added over time.

## Tech stack
- Astro + Tailwind CSS
- Deployed on Vercel

## Commands
- `npm run dev` – start dev server
- `npm run build` – production build
- `npm run preview` – preview the build

## Structure
- Projects are stored in `src/data/projects.json`. Add new projects there,
  never hardcode them in components.
- Personal details (name, role, tagline, about, skills, contact links) are in
  `src/data/site.json`; components read from it rather than hardcoding text.
- Blog posts are Markdown files in `src/content/blog/`. Frontmatter schema
  (title, description, pubDate, draft) is in `src/content.config.ts`.
- The Projects section, its nav link and the blog preview hide themselves
  when there's nothing to show.
- Astro 7: import `z` from `astro/zod` (not `astro:content`).

## Design rules
- Based on the GSAP style from Refero
  (https://styles.refero.design/style/00537a20-e99e-4ef2-b119-c6f532c44cc9):
  near-black canvas, warm cream text, big tight headlines, `{ }` bracket
  annotations (`Annotation.astro`), outlined pill buttons (`.btn`, `.btn-primary`)
- Dark mode default with light mode toggle
- One accent color: green. Highlighter colors (orange, pink, lilac, blue) are
  only for category labels like skill groups
- Use the color tokens in `src/styles/global.css` (`text-ink`, `bg-canvas`,
  `border-line`, `text-accent`...), not raw Tailwind colors
- Font: Inter Tight (Google Fonts)
- Motion (see "Motion" in `global.css`): `.intro` for on-load entrances,
  `data-reveal` (+ `--i` for stagger) for scroll reveals. GSAP is used only
  for the hero's pinned scroll effect in `Hero.astro`. All motion must switch
  off under `prefers-reduced-motion`
- Mobile-first and fully responsive
- Accessible: semantic HTML, alt text, keyboard navigation

## Working preferences
- I'm still learning, so briefly explain significant changes and why.
- Propose a plan before large changes and wait for my approval.
- Keep dependencies minimal; ask before adding new packages.
- Run `npm run build` after changes to check nothing is broken.
- Never add placeholder or fake project content.