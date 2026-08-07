// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// User site (Kstuart1992.github.io) serves from the domain root, so no `base` is needed.
// If this ever moves to a project repo, set `base: '/repo-name'` here.
export default defineConfig({
  site: 'https://kstuart1992.github.io',
  integrations: [sitemap()],
  build: {
    format: 'directory',
  },
});
