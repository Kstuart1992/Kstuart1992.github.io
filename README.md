# kstuart1992.github.io

Personal site — [kstuart1992.github.io](https://kstuart1992.github.io)

Built with [Astro](https://astro.build). Static output, no client-side JavaScript,
deployed to GitHub Pages by GitHub Actions on every push to `main`.

## Local development

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output to dist/
npm run preview  # serve the built output
```

## Where to edit what

| I want to change… | Edit |
| --- | --- |
| Name, links, email, résumé path | `src/data/site.ts` |
| The stack table | `stack` in `src/data/site.ts` |
| Job history | `experience` in `src/data/site.ts` |
| Education, business domains | `education` / `domains` in `src/data/site.ts` |
| Hero copy, "What I do" pillars | `src/pages/index.astro` |
| Colors, typography, spacing | `src/styles/global.css` (tokens at the top) |
| A case study | `src/content/projects/*.md` |
| The résumé PDF | replace `public/kyle-stuart-resume.pdf` |

## Adding a case study

Drop a new Markdown file into `src/content/projects/`. The filename becomes the URL
(`my-project.md` → `/projects/my-project/`). Frontmatter:

```yaml
---
title: 'Project title'
summary: 'One or two sentences. Shown on the card and as the page lede.'
context: 'Employer or context · 2024'
order: 5           # lower sorts first on the landing page
tags: ['dbt', 'Snowflake']
repo: 'https://github.com/...'    # optional, renders a button
demo: 'https://...'               # optional, renders a button
demoLabel: 'View live'            # optional button text
published: true                   # set false to keep it out of the build
---

Markdown body goes here.
```

The schema is enforced at build time in `src/content.config.ts` — a typo in the
frontmatter fails the build rather than shipping a broken page.

## Deployment

`.github/workflows/deploy.yml` builds and deploys on push to `main`.

One-time setup in the repo: **Settings → Pages → Source: GitHub Actions**.

### Custom domain

1. Add a `CNAME` file to `public/` containing just the domain (e.g. `kylestuart.dev`).
2. DNS: `CNAME` record for `www` → `kstuart1992.github.io`, plus `ALIAS`/`ANAME` at the
   apex, or the four GitHub Pages `A` records if your registrar has no ALIAS support.
3. Settings → Pages → set the custom domain and tick **Enforce HTTPS**.
4. Update `site` in `astro.config.mjs` and `url` in `src/data/site.ts` to the new domain
   so canonical URLs and the sitemap stay correct.
