// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Replace SITE_URL per project. Required for sitemap + canonical URLs.
const SITE_URL = 'https://ringsizetool.com';

export default defineConfig({
  site: SITE_URL,

  // Static only. Never change this to 'server' — see CLAUDE.md.
  output: 'static',

  // Clean URLs: /ring-size-chart, not /ring-size-chart/
  trailingSlash: 'never',
  build: { format: 'file' },

  // i18n plumbing is configured from day one so locales are cheap to add later,
  // but only 'en' is active at launch. See playbook — never bulk auto-translate.
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
    routing: { prefixDefaultLocale: false },
  },

  integrations: [sitemap()],

  vite: {
    plugins: [tailwindcss()],
  },
});
