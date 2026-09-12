/**
 * Ask Perplexity's web-grounded Agent API a question from the command line.
 *
 * Dev-tool only — lives in scripts/, never imported by src/, never bundled
 * into the static build. This site is static-only (see CLAUDE.md: "No SSR,
 * no API routes, no server code"), so an API key that must stay secret has
 * no safe home in anything shipped to a visitor's browser. This script runs
 * on a developer's own machine instead, the same way verify-sizes.ts does.
 *
 * Run:   npm run perplexity -- "your question here"
 * Needs: PERPLEXITY_API_KEY in the environment (never hardcode it — create
 *        one at https://console.perplexity.ai/project/keys and export it in
 *        your own shell, the same way APIFY_API_TOKEN is set up).
 */
import Perplexity from '@perplexity-ai/perplexity_ai';
import type { ContentPart, OutputItem } from '@perplexity-ai/perplexity_ai/resources/responses';

if (!process.env.PERPLEXITY_API_KEY) {
  console.error(
    'PERPLEXITY_API_KEY is not set.\n' +
      'Create one at https://console.perplexity.ai/project/keys, then export it in your own shell — never paste it into a chat.',
  );
  process.exit(1);
}

const question = process.argv.slice(2).join(' ').trim();
if (!question) {
  console.error('Usage: npm run perplexity -- "your question here"');
  process.exit(1);
}

const client = new Perplexity(); // reads PERPLEXITY_API_KEY from the environment

const response = await client.responses.create({
  preset: 'low', // web_search + fetch_url(1), 5 max steps — enough for a research question
  input: question,
});

console.log(response.output_text);

/* Citations live in two places: inline annotations on message text, and the
 * dedicated search_results output item. Collect both so nothing is missed. */
const citations = new Map<string, string>(); // url -> title

for (const item of response.output as OutputItem[]) {
  if (item.type === 'message') {
    for (const part of item.content as ContentPart[]) {
      for (const a of part.annotations ?? []) {
        if (a.url) citations.set(a.url, a.title ?? a.url);
      }
    }
  }
  if (item.type === 'search_results') {
    for (const r of item.results) {
      citations.set(r.url, r.title);
    }
  }
}

if (citations.size > 0) {
  console.log('\nSources:');
  for (const [url, title] of citations) {
    console.log(` - ${title} — ${url}`);
  }
}

if (response.usage) {
  const { total_tokens, cost } = response.usage;
  const costStr = cost ? ` (~$${cost.total_cost.toFixed(4)})` : '';
  console.error(`\n[${total_tokens} tokens${costStr}]`);
}
