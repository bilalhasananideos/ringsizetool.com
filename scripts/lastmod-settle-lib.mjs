/**
 * Pure helpers for "move <lastmod> only when the page's visible content moved".
 * No I/O here, so scripts/check-sitemap.ts can test them on fixtures and
 * recompute exactly what scripts/settle-lastmod.ts decided.
 *
 * Why: the git rule alone (scripts/page-lastmod.mjs) dates a page by every
 * commit to any module it imports. One FAQ sentence edit in data/faq.ts moved
 * 9 of 11 URLs to the same day although 5 of those pages had zero changed
 * text (hub check, 4 Nov 2026). Google ignores lastmod that is not
 * consistently accurate, so the git date is now only a candidate: it is used
 * when the built page's text differs from the live page's, and the live
 * lastmod is carried over when the text is the same.
 */

import { createHash } from 'node:crypto';

/** Short stable hash of a page's visible text (used by the seed file). */
export const textHash = (t) => createHash('sha256').update(t).digest('hex').slice(0, 16);

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };

const decode = (s) =>
  s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e) => {
    if (e[0] === '#') {
      const n = e[1] === 'x' || e[1] === 'X' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
      return Number.isFinite(n) ? String.fromCodePoint(n) : m;
    }
    return ENTITIES[e.toLowerCase()] ?? m;
  });

/**
 * What a reader (or a search engine's snippet) sees of THIS page: <title>,
 * the meta description, and the text of <main>. Header, nav and footer are
 * shared chrome: a new footer link is not a change to eleven pages' content,
 * so it must not move eleven lastmods. (Falls back to <body> if a page ever
 * has no <main>.) Dropped: tags and their attributes (so
 * hashed /_astro/ file names never count), scripts (incl. JSON-LD and the
 * analytics beacon Cloudflare injects into the live HTML), styles, comments,
 * and all whitespace differences.
 */
export function visibleText(html) {
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? '';
  const desc =
    html.match(/<meta\s+[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i)?.[1] ??
    html.match(/<meta\s+[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i)?.[1] ?? '';
  const body = (html.match(/<main\b[^>]*>([\s\S]*)<\/main>/i)?.[1] ??
    html.match(/<body[^>]*>([\s\S]*)<\/body>/i)?.[1] ?? html)
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<(script|style|template)\b[\s\S]*?<\/\1\s*>/gi, ' ')
    .replace(/<[^>]+>/g, ' ');
  return [title, desc, body].map((s) => decode(s).replace(/\s+/g, ' ').trim()).join('\n');
}

/** ISO 8601 UTC without milliseconds, or undefined when not a real date. */
export const normDate = (s) => {
  if (!s) return undefined;
  const t = Date.parse(s);
  return Number.isNaN(t) ? undefined : new Date(t).toISOString().replace(/\.\d{3}Z$/, 'Z');
};

/**
 * The lastmod for one URL.
 *   gitDate     - scripts/page-lastmod.mjs (undefined: no page file -> none)
 *   headDate    - date of the commit being deployed
 *   builtText   - visibleText() of the built page
 *   live        - null when the live page/sitemap could not be read;
 *                 otherwise { text, lastmod } (lastmod may be undefined)
 *   seed        - optional { lastmod, text: textHash } from
 *                 scripts/lastmod-seed.json: when this exact text first
 *                 appeared on main. Used only if live has no lastmod yet.
 * Returns { lastmod, reason }.
 *
 * @param {{ gitDate?: string, headDate: string, builtText: string,
 *   live: { text?: string, lastmod?: string } | null,
 *   seed?: { lastmod: string, text: string } }} args
 * @returns {{ lastmod: string | undefined, reason: string }}
 */
export function decideLastmod({ gitDate, headDate, builtText, live, seed }) {
  if (!gitDate) return { lastmod: undefined, reason: 'no page source' };
  if (!live || live.text === undefined) return { lastmod: gitDate, reason: 'live unknown: git date' };
  const liveLastmod = normDate(live.lastmod);
  if (live.text === builtText) {
    if (liveLastmod && Date.parse(liveLastmod) <= Date.parse(headDate)) {
      return { lastmod: liveLastmod, reason: 'text unchanged: kept live' };
    }
    const seeded = normDate(seed?.lastmod);
    if (seeded && seed.text === textHash(builtText) && Date.parse(seeded) <= Date.parse(headDate)) {
      return { lastmod: seeded, reason: 'text unchanged, live had none: seed (text first on main)' };
    }
    return { lastmod: gitDate, reason: 'text unchanged, live had none: git date' };
  }
  // Text changed. The git date normally postdates the live one; if it does
  // not (the change came from outside the tracked sources, e.g. the layout),
  // the commit being deployed is the honest date.
  if (liveLastmod && Date.parse(gitDate) <= Date.parse(liveLastmod)) {
    return { lastmod: headDate, reason: 'text changed: deploy commit date' };
  }
  return { lastmod: gitDate, reason: 'text changed: git date' };
}

/** [{ loc, lastmod }] from sitemap XML. */
export const parseSitemap = (xml) =>
  [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => ({
    loc: m[1].match(/<loc>([^<]+)<\/loc>/)?.[1] ?? '',
    lastmod: m[1].match(/<lastmod>([^<]+)<\/lastmod>/)?.[1],
  }));

/** dist/ (or snapshot) file name for a URL path, with build.format 'file'. */
export const htmlFileFor = (pathname) => {
  const clean = pathname.replace(/\/+$/, '');
  return clean === '' ? 'index.html' : `${clean.slice(1)}.html`;
};
