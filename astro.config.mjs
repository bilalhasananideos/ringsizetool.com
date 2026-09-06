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

  /* ⚠️ Do NOT "fix" the homepage's sitemap URL. Investigated 7 Sep 2026.
   *
   * The sitemap emits `https://ringsizetool.com` while the canonical tag on
   * that page reads `https://ringsizetool.com/`, and SEO-AUDIT.md §19 Day 28
   * listed that as a mismatch to correct. It is not a defect:
   *
   *   RFC 3986 §6.2.3 — "if the authority is defined and the path is empty,
   *   the path should be considered equivalent to a path of '/'."
   *
   * They are the same URL. Every other entry already matches its canonical
   * exactly, so this is the root and only the root.
   *
   * And it cannot be fixed cheaply anyway: `serialize` runs BEFORE the
   * integration applies `trailingSlash`, so the item arrives there already
   * carrying its slash and is stripped afterwards — verified by logging it,
   * not assumed. The remaining routes would be passing `trailingSlash: true`
   * to the integration, which contradicts the site's own `never` and would
   * put a slash on all nine URLs, creating eight REAL mismatches to remove
   * one imaginary one; or a post-build rewrite step, i.e. permanent
   * maintenance for a difference the URI standard defines as no difference.
   *
   * Closed as a verified non-issue. */
  integrations: [sitemap()],

  vite: {
    plugins: [tailwindcss()],
  },
});
