import { expect, test } from "@playwright/test";

/**
 * The six posts that were renamed are indexed under their old addresses. A
 * redirect whose destination is misspelled still answers 308, so each one is
 * followed to the post it should land on.
 */
const MOVED = {
  "ai-customer-service": "after-hours-calls",
  "ai-implementation-guide": "automate-one-job",
  "ai-roi-business-case": "is-it-worth-automating",
  "data-preparation-for-ai": "messy-records",
  "future-of-generative-ai": "which-ai-is-for-you",
  "ai-ethics-guide": "who-is-answerable",
} as const;

for (const [from, to] of Object.entries(MOVED)) {
  test(`/blog/${from} moves permanently to /blog/${to}`, async ({ request }) => {
    const hop = await request.get(`/blog/${from}`, { maxRedirects: 0 });
    expect(hop.status()).toBe(308);
    expect(hop.headers().location).toBe(`/blog/${to}`);

    const post = await request.get(`/blog/${to}`);
    expect(post.status()).toBe(200);
  });
}
