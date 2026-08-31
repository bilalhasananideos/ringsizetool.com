#!/usr/bin/env python3
"""
Astro eats the newline between text and a following {expression} OR tag.
See STATUS.md. This sweep covers BOTH variants; the older one-liner in STATUS.md
covered only the first, because it replaced every tag with a space and so erased
the exact evidence it was looking for. That hole let "set Scale to100%" ship on
/printable-ring-sizer (found 31 Aug 2026 by eye, in a screenshot, not by script).

Usage: python3 scripts/sweep-astro-newline.py [dist]
Exit 1 if anything is found.
"""
import re, html, glob, sys, os

INLINE = r'(?:strong|em|b|i|u|a|code|span|abbr|small|sub|sup)'
dist = sys.argv[1] if len(sys.argv) > 1 else 'dist'
hits = []

for f in sorted(glob.glob(os.path.join(dist, '*.html'))):
    raw = open(f, encoding='utf-8').read()
    body = re.sub(r'<(script|style|head)\b.*?</\1>', '', raw, flags=re.S | re.I)

    # ── Variant 1: text runs straight into an {expression} result ──────────
    # Tags removed with a SPACE, so this only sees inside-one-text-node joins.
    t = html.unescape(re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', ' ', body)))
    for m in re.findall(r'\S{0,18}[a-z]\d[\d.]*\S{0,6}', t):
        if not re.search(r'(ISO|IEC|EN|JIS|BS|[A-Z]\d|4K|-\d|/\d|\d[a-z])', m):
            hits.append((f, 'expr', m))

    # ── Variant 2: text runs straight into an inline TAG ──────────────────
    # A word character hard against an inline tag boundary, with no space and no
    # punctuation, is the signature of an eaten newline. Real prose almost always
    # has a space or a comma there.
    for pat, label in ((r'[A-Za-z]<' + INLINE + r'\b[^>]*>[A-Za-z0-9]', 'open'),
                       (r'[A-Za-z0-9]</' + INLINE + r'>[A-Za-z0-9]', 'close')):
        for m in re.finditer(pat, body):
            frag = re.sub(r'\s+', ' ', body[max(0, m.start() - 45):m.end() + 45])
            hits.append((f, 'tag/' + label, frag))

if hits:
    print('ASTRO NEWLINE SWEEP — %d candidate(s):\n' % len(hits))
    for f, kind, frag in hits:
        print('  %-34s [%-9s] %s' % (os.path.basename(f), kind, frag))
    print('\nEach is a CANDIDATE. Confirm in a browser: select the text, or measure'
          '\nthe gap with a Range. An intentional join (co<em>operate</em>) is fine.')
    sys.exit(1)

print('Astro newline sweep: clean (%d pages)' % len(glob.glob(os.path.join(dist, '*.html'))))
