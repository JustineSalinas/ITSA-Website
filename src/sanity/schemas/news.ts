import { defineField, defineType } from "sanity";

/**
 * News article.
 *
 * The spike content type: one schema, modelled to match the existing NewsItem
 * in src/lib/types.ts so the public pages need no changes to consume it.
 *
 * Field descriptions are written for officers, not developers. They are the
 * only instructions most editors will ever read, so they say what the field is
 * FOR rather than what it is called.
 */
export const newsType = defineType({
  name: "news",
  title: "News",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Headline",
      type: "string",
      description: "Keep it under about 70 characters so it does not wrap awkwardly on a phone.",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "slug",
      title: "Web address",
      type: "slug",
      description:
        "The end of the link, e.g. itsa-usa.org/news/YOUR-SLUG. Press Generate. Do not change it after publishing -- old links would break.",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "date",
      title: "Date published",
      type: "datetime",
      description: "Controls the ordering on the news page. Newest first.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Summary",
      type: "text",
      rows: 3,
      description:
        "One or two sentences, shown on the news listing and when the link is shared. Write it as a teaser, not a first paragraph.",
      validation: (rule) => rule.required().max(300),
    }),
    defineField({
      name: "coverImage",
      title: "Cover photo",
      type: "image",
      description:
        "Upload the original, full-size file. It is resized and compressed automatically -- do not shrink it first.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Photo description",
          type: "string",
          description:
            "What is happening in the photo, for people using a screen reader. Required.",
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Announcement", value: "Announcement" },
          { title: "Event recap", value: "Event" },
          { title: "Achievement", value: "Achievement" },
          { title: "Partnership", value: "Partnership" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "content",
      title: "Article",
      type: "array",
      of: [{ type: "block" }],
      description: "The full story. Use headings to break up anything longer than a few paragraphs.",
    }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", date: "date", media: "coverImage" },
    prepare({ title, date, media }) {
      return {
        title,
        subtitle: date ? new Date(date).toLocaleDateString("en-PH", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }) : "No date",
        media,
      };
    },
  },
});
