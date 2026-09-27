import { defineField, defineType } from "sanity";

/**
 * Officer.
 *
 * Modelled to match the existing Officer type in src/lib/types.ts.
 *
 * sortOrder decides display order everywhere -- the officers grid and the
 * org chart both read it. The org chart itself is not stored separately: it
 * is built by matching each officer's position text (see
 * src/components/officers/org-chart.tsx), which is why position wording
 * matters and is called out below.
 */
export const officerType = defineType({
  name: "officer",
  title: "Officer",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Full name",
      type: "string",
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: "position",
      title: "Position",
      type: "string",
      description:
        'Exact title, e.g. "Vice President - Internal" or "VP for Technology". The org chart places people by matching words in this field, so keep the wording consistent with previous terms -- ask a developer before renaming a position outright.',
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: "sortOrder",
      title: "Display order",
      type: "number",
      description:
        "Lower numbers show first. Leave gaps (10, 20, 30...) so it is easy to insert someone later without renumbering everyone.",
      validation: (rule) => rule.required().integer(),
    }),
    defineField({
      name: "bio",
      title: "Short bio",
      type: "text",
      rows: 3,
      description: "A sentence or two. Shown on the officer's card.",
      validation: (rule) => rule.max(400),
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      description: "A clear headshot. Square photos crop most predictably.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Photo description",
          type: "string",
          description: "Usually just the officer's name, for people using a screen reader.",
        }),
      ],
    }),
    defineField({
      name: "socials",
      title: "Social links",
      type: "object",
      description: "All optional. Leave any of these blank if the officer does not want it shown.",
      fields: [
        defineField({ name: "facebook", title: "Facebook", type: "url" }),
        defineField({ name: "instagram", title: "Instagram", type: "url" }),
        defineField({ name: "linkedin", title: "LinkedIn", type: "url" }),
        defineField({ name: "github", title: "GitHub", type: "url" }),
      ],
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
    select: { title: "name", subtitle: "position", media: "photo" },
  },
});
