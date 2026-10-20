/**
 * JSON.stringify doesn't escape "</script>" inside string values, so a
 * title or description containing it could break out of the <script
 * type="application/ld+json"> tag it's embedded in. Content for these
 * blocks now includes officer-entered CMS fields (event/news titles),
 * not just static site copy, so this is a real boundary to guard, not a
 * theoretical one.
 */
export function safeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
