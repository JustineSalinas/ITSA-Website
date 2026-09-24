import { defineField, defineType } from "sanity";

/**
 * Partner / sponsor logo.
 *
 * Modelled to match the existing Partner type in src/data/partners.ts. That
 * file's own comment is worth repeating here: a fabricated sponsor is worse
 * than none at all, because a visitor who recognises the deception stops
 * trusting everything else on the page. Only add a partner here once the
 * relationship and the logo use are actually confirmed.
 */
export const partnerType = defineType({
  name: "partner",
  title: "Partner / Sponsor",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Organisation name",
      type: "string",
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      description:
        "Prefer a transparent-background SVG or PNG. Roughly 220x72 works well in the carousel -- upload the original size, it is resized automatically.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Logo description",
          type: "string",
          description: 'Usually just the organisation name, e.g. "DevCon Iloilo logo".',
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "href",
      title: "Website link (optional)",
      type: "url",
      description: "If set, the logo becomes a clickable link to the partner's site.",
    }),
    defineField({
      name: "sortOrder",
      title: "Display order",
      type: "number",
      description: "Lower numbers appear first in the carousel. Leave gaps (10, 20, 30...).",
      validation: (rule) => rule.integer(),
    }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "sortOrderAsc",
      by: [{ field: "sortOrder", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", media: "logo" },
  },
});
