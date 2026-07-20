import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your full name.").max(120),
  email: z.string().email("Enter a valid email address."),
  studentId: z.string().max(40).optional().or(z.literal("")),
  yearLevel: z.string().max(40).optional().or(z.literal("")),
  interest: z.enum(["membership", "volunteer", "partnership", "general"], {
    message: "Select what your message is about.",
  }),
  message: z.string().min(10, "Tell us a little more (min 10 characters).").max(2000),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const officerSchema = z.object({
  name: z.string().min(2).max(120),
  position: z.string().min(2).max(120),
  bio: z.string().max(1000).optional().or(z.literal("")),
  photoUrl: z.string().url().optional().or(z.literal("")),
  sortOrder: z.number().int().min(0),
  facebook: z.string().url().optional().or(z.literal("")),
  instagram: z.string().url().optional().or(z.literal("")),
  linkedin: z.string().url().optional().or(z.literal("")),
  github: z.string().url().optional().or(z.literal("")),
});

export type OfficerInput = z.infer<typeof officerSchema>;

export const eventSchema = z.object({
  title: z.string().min(2).max(160),
  slug: z
    .string()
    .min(2)
    .max(160)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens."),
  description: z.string().min(10).max(4000),
  eventDate: z.string().min(1, "Pick a date and time."),
  location: z.string().min(2).max(200),
  imageUrl: z.string().url().optional().or(z.literal("")),
});

export type EventInput = z.infer<typeof eventSchema>;
