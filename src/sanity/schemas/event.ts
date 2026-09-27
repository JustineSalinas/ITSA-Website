import { defineField, defineType } from "sanity";

/**
 * Event.
 *
 * Modelled to match the existing EventItem in src/lib/types.ts. Upcoming vs
 * past is computed from eventDate at read time (see src/lib/format.ts's
 * splitEvents) -- there is deliberately no separate "status" field to keep
 * in sync by hand.
 */
export const eventType = defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Event name",
      type: "string",
      description: "Shown on the events page and in the calendar card.",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "slug",
      title: "Web address",
      type: "slug",
      description:
        "The end of the link, e.g. itsa-usa.org/events/YOUR-SLUG. Press Generate. Do not change it after publishing -- old links would break.",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "eventDate",
      title: "Date and time",
      type: "datetime",
      description:
        "Whether this shows under Upcoming or Past is worked out automatically from this date -- there is nothing else to set.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: 'Where it happens, e.g. "USA Gym" or "Room 402, IT Building".',
      validation: (rule) => rule.required().max(160),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      description: "What the event is about. Shown on the event's own page.",
      validation: (rule) => rule.required().max(600),
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
          description: "What the photo shows, for people using a screen reader. Required.",
          validation: (rule) => rule.required(),
        }),
      ],
    }),
  ],
  orderings: [
    {
      title: "Soonest first",
      name: "eventDateAsc",
      by: [{ field: "eventDate", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", eventDate: "eventDate", media: "coverImage" },
    prepare({ title, eventDate, media }) {
      return {
        title,
        subtitle: eventDate
          ? new Date(eventDate).toLocaleDateString("en-PH", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })
          : "No date",
        media,
      };
    },
  },
});
