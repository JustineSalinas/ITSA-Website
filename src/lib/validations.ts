import { z } from "zod";

/**
 * Collapses anything that could act as a line break into a single space.
 *
 * Values from these forms are interpolated into email headers (the subject
 * line), and a raw CR/LF there is the classic header-injection primitive.
 * Sanitising in the schema means every consumer — route handler, admin UI,
 * future export script — gets clean values without having to remember.
 *
 * Covers CR, LF, NEL (U+0085), and the Unicode line/paragraph separators
 * (U+2028/U+2029), which some parsers also treat as line terminators.
 */
const singleLine = (s: string) =>
  s.replace(/[\r\n\u0085\u2028\u2029]+/g, " ").replace(/\s{2,}/g, " ").trim();

/** Free text keeps its paragraphs, but is normalised to plain \n. */
const multiLine = (s: string) =>
  s.replace(/\r\n?/g, "\n").replace(/[\u0085\u2028\u2029]/g, "\n").trim();

const line = (min: number, max: number) =>
  z.string().trim().min(min).max(max).transform(singleLine);

const httpUrl = z.url({ protocol: /^https?$/ }).max(2048);

/**
 * Hosts permitted to serve officer photos and event images.
 *
 * Without this, any stored image URL turns every page view into a request to a
 * third-party server — a referrer/IP leak for visitors and an easy exfiltration
 * channel. Keep in sync with `images.remotePatterns` in next.config.ts and the
 * `img-src` directive of the CSP; this schema check is the one that also covers
 * the Avatar primitive, which renders a plain <img>.
 */
const ALLOWED_IMAGE_HOSTS = [
  "firebasestorage.googleapis.com",
  "lh3.googleusercontent.com",
];

const imageUrl = z
  .url({ protocol: /^https$/ })
  .max(2048)
  .refine(
    (value) => {
      try {
        return ALLOWED_IMAGE_HOSTS.includes(new URL(value).hostname);
      } catch {
        return false;
      }
    },
    { message: "Upload the image to ITSA storage and use that link." },
  );

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(120)
    .transform(singleLine),
  email: z.email("Enter a valid email address.").max(254),
  studentId: line(0, 40).optional().or(z.literal("")),
  yearLevel: line(0, 40).optional().or(z.literal("")),
  interest: z.enum(["membership", "volunteer", "partnership", "general"], {
    message: "Select what your message is about.",
  }),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more (min 10 characters).")
    .max(2000)
    .transform(multiLine),
  // Honeypot. Hidden from people, irresistible to form-filling bots; any value
  // here means the submission is discarded server-side.
  website: z.string().max(200).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const officerSchema = z.object({
  name: line(2, 120),
  position: line(2, 120),
  bio: z.string().trim().max(1000).transform(multiLine).optional().or(z.literal("")),
  photoUrl: imageUrl.optional().or(z.literal("")),
  sortOrder: z.number().int().min(0).max(9999),
  facebook: httpUrl.optional().or(z.literal("")),
  instagram: httpUrl.optional().or(z.literal("")),
  linkedin: httpUrl.optional().or(z.literal("")),
  github: httpUrl.optional().or(z.literal("")),
});

export type OfficerInput = z.infer<typeof officerSchema>;

export const eventSchema = z.object({
  title: line(2, 160),
  slug: z
    .string()
    .trim()
    .min(2)
    .max(160)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens."),
  description: z.string().trim().min(10).max(4000).transform(multiLine),
  eventDate: z.string().min(1, "Pick a date and time."),
  location: line(2, 200),
  imageUrl: imageUrl.optional().or(z.literal("")),
});

export type EventInput = z.infer<typeof eventSchema>;
