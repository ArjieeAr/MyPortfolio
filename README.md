# Rj Dela Cruz – Portfolio

My personal portfolio website: a single-page site with an about section, skills, projects, a Markdown-powered blog and contact links.

Built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com), and deployed on [Vercel](https://vercel.com).

## Features

- Single-page layout with Hero, About, Skills, Projects, Blog and Contact sections
- Blog posts written as Markdown files
- Dark mode by default, with a light mode toggle that remembers your choice
- Responsive layout, built for phones first
- Keyboard-friendly navigation, visible focus styles and a skip-to-content link
- Sections hide themselves when they have nothing to show

## Getting started

Requires [Node.js](https://nodejs.org) 22.12 or newer.

```bash
npm install
npm run dev
```

Then open http://localhost:4321.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the local development server with live reload |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Serve the production build locally to check it |

## Updating the content

Most content lives in data files, so you rarely need to edit the components.

- **Personal details** (name, role, tagline, about text, skills, contact links): [`src/data/site.json`](src/data/site.json)
- **Projects:** [`src/data/projects.json`](src/data/projects.json). Each entry has `title`, `description` and `tech`, with optional `repo` and `live` links. If the list is empty, the Projects section is hidden.
- **Blog posts:** add a Markdown file to [`src/content/blog/`](src/content/blog/). The file name becomes the URL, and the frontmatter fields are `title`, `description`, `pubDate` and an optional `draft`. The schema is defined in [`src/content.config.ts`](src/content.config.ts).

## Project structure

```
src/
├─ components/   Page sections and UI pieces (Hero, Projects, ThemeToggle, ...)
├─ content/blog/ Blog posts (Markdown)
├─ data/         Personal details and project list (JSON)
├─ layouts/      Shared page layout (head, header, footer)
├─ lib/          Helpers for loading projects and blog posts
├─ pages/        Routes: the home page and the blog
└─ styles/       Global styles and Tailwind setup
```

## Deployment

The site builds to static files, so it can be hosted on any static host. To deploy on Vercel, import the GitHub repository at [vercel.com](https://vercel.com). Vercel detects Astro automatically and needs no extra configuration.
