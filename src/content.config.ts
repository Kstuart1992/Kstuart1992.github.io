import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    /** Shown on the card and as the page lede. Keep to one or two sentences. */
    summary: z.string(),
    /** Context line on the card, e.g. "Holman Enterprises · 2023–present". */
    context: z.string(),
    /** Lower sorts first on the landing page. */
    order: z.number().default(99),
    tags: z.array(z.string()).default([]),
    /** Optional external links surfaced as buttons on the detail page. */
    repo: z.string().url().optional(),
    demo: z.string().url().optional(),
    demoLabel: z.string().optional(),
    /** Set false to keep a draft out of the build. */
    published: z.boolean().default(true),
  }),
});

export const collections = { projects };
