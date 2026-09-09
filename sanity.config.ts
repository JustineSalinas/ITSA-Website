"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { apiVersion, dataset, projectId } from "@/sanity/env";
import { newsType } from "@/sanity/schemas/news";

/**
 * Sanity Studio -- the editing interface officers use, served at /studio.
 *
 * Embedded in this app rather than deployed separately: one repository, one
 * deployment, one URL to hand over. A student organisation should not have to
 * maintain two hosting accounts to publish a news post.
 *
 * projectId falls back to an empty string so `next build` succeeds with no
 * Sanity credentials -- the route guards on isSanityConfigured and renders a
 * setup notice instead. See src/sanity/env.ts.
 */
export default defineConfig({
  name: "itsa",
  title: "ITSA Content",
  basePath: "/studio",
  projectId: projectId ?? "",
  dataset,
  schema: { types: [newsType] },
  plugins: [
    structureTool(),
    // GROQ playground. Useful while developing queries; harmless in production
    // because it can only read what the signed-in user could already read.
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
