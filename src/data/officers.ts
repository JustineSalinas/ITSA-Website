import type { Officer, OrgNode } from "@/lib/types";

// The real ITSA organizational chart (AY 2026), transcribed from the official
// org-chart document. Names are given in natural order. This tree is the single
// source of truth: the flat `realOfficers` list below is derived from it, so the
// /officers cards and the visual chart never drift apart.
//
// Reporting lines: the two Vice Chairmen and the five department heads
// (Secretary + four VPs) are shown as direct reports of the Chairman. Each
// department carries its own leads. Adjust the nesting here if the real
// reporting lines differ.
export const orgChart: OrgNode = {
  name: "Robert A. Aguilar Jr.",
  position: "Adviser",
  children: [
    {
      name: "Gabriel Ferrera",
      position: "Chairman",
      children: [
        {
          name: "Charles Janryl Jemina",
          position: "Vice Chairman for Internal Affairs",
        },
        {
          name: "Theodore Samuel Navarro",
          position: "Vice Chairman for External Affairs",
        },
        {
          name: "Samantha Quinn D. Bretana",
          position: "Secretary",
          children: [
            { name: "Jhon Michael Mercado", position: "Assistant Secretary" },
          ],
        },
        {
          name: "Mhike Aleen Gacusan",
          position: "Vice President for Communications",
          children: [
            {
              name: "Cholo Rosales",
              position: "Creatives Lead",
              children: [
                { name: "Rovann Acevedo", position: "Documentation Lead" },
              ],
            },
          ],
        },
        {
          name: "John Kyle Amarante",
          position: "Vice President for Technology",
          children: [
            { name: "Adrian Justin J. Salinas", position: "Web Development Lead" },
            { name: "Ralph Danielle Delacruz", position: "Mobile Application Lead" },
            { name: "James Melliza", position: "IoT Hardware Lead" },
          ],
        },
        {
          name: "John Daniel Aboboto",
          position: "Vice President for Operations",
          children: [{ name: "Kevin Alcudia", position: "Events Lead" }],
        },
        {
          name: "Elah Marie Loyola",
          position: "Vice President for Finance",
          children: [
            {
              name: "Elyza Elizabeth Gumarin",
              position: "Assistant Finance Officer",
            },
          ],
        },
      ],
    },
  ],
};

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Depth-first (top-down) flattening so card order mirrors the chart's reading order.
function flatten(node: OrgNode, acc: Officer[] = []): Officer[] {
  acc.push({
    id: slugify(node.name),
    name: node.name,
    position: node.position,
    bio: "",
    photoUrl: "",
    socials: {},
    sortOrder: acc.length + 1,
  });
  node.children?.forEach((child) => flatten(child, acc));
  return acc;
}

export const realOfficers: Officer[] = flatten(orgChart);
