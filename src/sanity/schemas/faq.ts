import { defineField, defineType } from "sanity";

/**
 * FAQ entry.
 *
 * Modelled to match the existing FaqEntry type in src/data/faq.ts, which
 * feeds the homepage FAQ explorer. An answer is written once and can never
 * disagree with itself in two places.
 *
 * Leaving `answer` empty is deliberate, not a mistake: the current code
 * hides any FAQ with no answer everywhere, because a wrong answer about
 * fees or eligibility costs more trust than no answer at all. This schema
 * keeps that behaviour -- do not make `answer` required.
 */
export const faqType = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({
      name: "key",
      title: "Reference ID",
      type: "slug",
      description: "A short, stable identifier, e.g. \"membership-fee\".",
      options: { source: "question", maxLength: 60 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "question",
      title: "Full question",
      type: "string",
      description: "Shown on the homepage FAQ explorer.",
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "text",
      rows: 4,
      description:
        "Leave this blank until you have a confirmed answer. An FAQ with no answer stays hidden everywhere, on purpose -- it will not show a blank or broken-looking entry.",
    }),
    defineField({
      name: "cta",
      title: "Follow-up link (optional)",
      type: "object",
      description: "An optional button shown under the answer, e.g. pointing to the Join page.",
      fields: [
        defineField({ name: "label", title: "Button text", type: "string" }),
        defineField({ name: "href", title: "Link", type: "string", description: 'e.g. "/join"' }),
      ],
    }),
  ],
  preview: {
    select: { title: "question", subtitle: "answer" },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: subtitle ? subtitle.slice(0, 60) : "Not answered yet",
      };
    },
  },
});
