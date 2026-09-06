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

# Adjacency that CSS already prevents, which this script cannot see.
# Variant 3 flags `</span><span>` with nothing between, and that is the right
# signal — but a neighbour set to display:block does not run together however
# little whitespace there is, and no amount of regex will know that. Declare
# those here rather than letting the gate cry wolf: nine standing false
# positives is how a CI check gets switched off, and this codebase already has
# the lesson written down in calibration.ts — "a warning that fires when
# nothing is wrong is worse than no warning".
#
# Each entry is a substring of the offending fragment, and each needs a reason.
ADJACENT_OK = (
    # /printable-ring-sizer gauge labels. `.ps-gauge-label strong` is
    # display:block, so "US 6" sits on its own line above the sub-label.
    'ps-gauge-sub',
    # RingSizer's slider end labels. Their parent is display:flex, which
    # BLOCKIFIES both spans — a flex item is never inline, whatever the span
    # said. Confirmed in a browser: innerText reads "12.90 mm\n24.34 mm".
    'data-max-label',
)
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

    # ── Variant 3: one inline tag runs straight into the NEXT one ─────────
    # `</span><span>` with nothing between. Both variants above are blind to
    # this: variant 1 turns every tag into a space and so erases the join it is
    # hunting, and variant 2 wants a word character straight after `</span>`,
    # where this shape has `<`. It shipped a screen-reader defect in
    # RingSizer.astro's sr-only block on 6 Sep 2026 — five adjacent <span>s that
    # assistive tech read as one run of digits — and neither variant said a word.
    #
    # Whitespace of any kind between the two tags is the fix and is accepted
    # here, so this only fires on a genuinely eaten separator.
    #
    # <nav> is excluded, and that is the difference between a signal and 17
    # false positives. A nav is a list of discrete labels laid out by flex, so
    # `</a><a href>` with no space between them is how every nav on this site is
    # built and means nothing is wrong; each link is its own node to a reader.
    # A sentence is not like that. Everything outside a nav is fair game.
    prose = re.sub(r'<nav\b.*?</nav>', '', body, flags=re.S | re.I)
    adjacent = (r'[A-Za-z0-9]</' + INLINE + r'><' + INLINE + r'\b[^>]*>[A-Za-z0-9]')
    for m in re.finditer(adjacent, prose):
        frag = re.sub(r'\s+', ' ', prose[max(0, m.start() - 45):m.end() + 45])
        if any(ok in frag for ok in ADJACENT_OK):
            continue
        hits.append((f, 'tag/adjacent', frag))

if hits:
    print('ASTRO NEWLINE SWEEP — %d candidate(s):\n' % len(hits))
    for f, kind, frag in hits:
        print('  %-34s [%-9s] %s' % (os.path.basename(f), kind, frag))
    print('\nEach is a CANDIDATE. Confirm in a browser: select the text, or measure'
          '\nthe gap with a Range. An intentional join (co<em>operate</em>) is fine.')
    sys.exit(1)

print('Astro newline sweep: clean (%d pages)' % len(glob.glob(os.path.join(dist, '*.html'))))
