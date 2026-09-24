import { defineField, defineType } from "sanity";

/**
 * Student project.
 *
 * Modelled to match the existing ProjectItem type in src/data/projects.ts.
 * Most fields beyond the basics are optional -- a project someone built
 * solo, with no award and no live link, is still worth showcasing.
 */
export const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Project name",
      type: "string",
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: "slug",
      title: "Web address",
      type: "slug",
      description:
        "The end of the link, e.g. itsa-usa.org/projects/YOUR-SLUG. Press Generate. Do not change it after publishing -- old links would break.",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "One-line description",
      type: "text",
      rows: 2,
      description: "Shown on the projects listing page, under the title.",
      validation: (rule) => rule.required().max(280),
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Image description",
          type: "string",
          description: "For people using a screen reader.",
        }),
      ],
    }),
    defineField({
      name: "author",
      title: "Author name",
      type: "string",
      description: "Whoever built it, or the team lead if it was a group project.",
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: "role",
      title: "Author's role (optional)",
      type: "string",
      description: 'e.g. "Lead Developer", "Game Designer".',
    }),
    defineField({
      name: "teamName",
      title: "Team name (optional)",
      type: "string",
    }),
    defineField({
      name: "teamMembers",
      title: "Team members (optional)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name", title: "Name", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "role", title: "Role", type: "string", validation: (rule) => rule.required() }),
          ],
        },
      ],
    }),
    defineField({
      name: "award",
      title: "Award (optional)",
      type: "object",
      description: "Leave every field blank if this project has not won anything -- that is the normal case.",
      fields: [
        defineField({ name: "name", title: "Award name", type: "string" }),
        defineField({ name: "date", title: "Date awarded", type: "date" }),
        defineField({ name: "host", title: "Awarded by", type: "string" }),
      ],
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      description:
        'Short labels shown as chips, e.g. "Winner", "Game", "Mobile". The Awards page finds winners by checking for the words "winner", "award" or "prize" in these tags.',
      options: { layout: "tags" },
    }),
    defineField({
      name: "techStack",
      title: "Technologies used (optional)",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "githubUrl",
      title: "Source code link (optional)",
      type: "url",
    }),
    defineField({
      name: "liveUrl",
      title: "Live demo link (optional)",
      type: "url",
    }),
    defineField({
      name: "content",
      title: "Full write-up",
      type: "array",
      of: [{ type: "block" }],
      description: "The main story on the project's own page.",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "author", media: "coverImage" },
  },
});
