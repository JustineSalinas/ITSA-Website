import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { getEvents, getNews } from "@/lib/data";
import { getProjects } from "@/data/projects";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  // Static public routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/events`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects/awards`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/officers`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/join`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // Dynamic event routes
  let eventRoutes: MetadataRoute.Sitemap = [];
  try {
    const events = await getEvents();
    eventRoutes = events.map((event) => ({
      url: `${baseUrl}/events/${event.slug}`,
      lastModified: event.eventDate ? new Date(event.eventDate) : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error("[sitemap] Failed to load events:", error);
  }

  // Dynamic project routes
  let projectRoutes: MetadataRoute.Sitemap = [];
  try {
    const projects = await getProjects();
    projectRoutes = projects.map((project) => ({
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error("[sitemap] Failed to load projects:", error);
  }

  // News routes (anchored or direct)
  let newsRoutes: MetadataRoute.Sitemap = [];
  try {
    const news = await getNews();
    newsRoutes = news.map((item) => ({
      url: `${baseUrl}/news#${item.slug}`,
      lastModified: item.date ? new Date(item.date) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error("[sitemap] Failed to load news:", error);
  }

  return [...staticRoutes, ...eventRoutes, ...projectRoutes, ...newsRoutes];
}
