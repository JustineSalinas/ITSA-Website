import { defineField, defineType } from "sanity";

/**
 * FAQ entry.
 *
 * Modelled to match the existing FaqEntry type in src/data/faq.ts. Both the
 * Join page FAQ and the "Ask ITSA" panel read from the same source, so an
 * answer is written once and can never disagree with itself in two places.
 *
 * `key` stands in for the hand-written `id` the current data file uses --
 * Sanity's own document ID is a random string, but api/ask-log/route.ts
 * builds its allowed-question list from this field directly, so it has to
 * stay a short, stable, human-chosen value, not an opaque one.
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
      description:
        'A short, stable identifier, e.g. "membership-fee". Used internally to track which questions visitors tap on the "Ask ITSA" panel -- once set, avoid changing it, or that question\'s history starts over.',
      options: { source: "question", maxLength: 60 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "label",
      title: "Short label",
      type: "string",
      description: 'The button text on the "Ask ITSA" panel, e.g. "Membership fee?". Keep it brief.',
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: "question",
      title: "Full question",
      type: "string",
      description: "Shown on the Join page FAQ list.",
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
    defineField({
      name: "showOnJoinPage",
      title: "Show on the Join page",
      type: "boolean",
      description: "If off, this only appears in the Ask ITSA panel, not the Join page's own FAQ list.",
      initialValue: true,
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
