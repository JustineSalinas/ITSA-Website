import type { Officer, OrgNode } from "@/lib/types";

// The real ITSA organizational chart (AY 2026), transcribed from the official
// org-chart document. Names are given in natural order. This tree is the single
// source of truth: the flat `realOfficers` list below is derived from it, so the
// /officers cards and the visual chart never drift apart.
//
// Reporting lines: the two Vice Chairmen and the five department heads
// (Secretary + four department Officers) are shown as direct reports of the
// Chairman. Each department carries its own leads. Adjust the nesting here
// if the real reporting lines differ.
export const orgChart: OrgNode = {
  name: "Robert A. Aguilar Jr.",
  position: "IT Academic Supervisor",
  photoUrl: "/officers/robert-aguilar.jpg",
  children: [
    {
      name: "Gabriel Ferrera",
      position: "Chairman",
      photoUrl: "/officers/gabriel-ferrera.jpg",
      children: [
        {
          name: "Charles Janryl Jemina",
          position: "Vice Chairman for Internal Affairs",
          photoUrl: "/officers/charles-janryl-jemina.jpg",
        },
        {
          name: "Theodore Samuel Navarro",
          position: "Vice Chairman for External Affairs",
          photoUrl: "/officers/theodore-samuel-navarro.jpg",
        },
        {
          name: "Samantha Quinn Bretaña",
          position: "Secretary",
          photoUrl: "/officers/samantha-quinn-d-bretana.jpg",
          children: [
            {
              name: "Jhon Michael Mercado",
              position: "Assistant Secretary",
              photoUrl: "/officers/jhon-michael-mercado.jpg",
            },
          ],
        },
        {
          name: "Mhike Aleen Gacusan",
          position: "Communication Officer",
          photoUrl: "/officers/mhike-aleen-gacusan.jpg",
          children: [
            {
              name: "Cholo Rosales",
              position: "Creatives Lead",
              photoUrl: "/officers/cholo-rosales.png",
              children: [
                { name: "Tim Gabriel Nuñal", position: "Creatives", photoUrl: "/officers/tim-gabriel-nunal.png" },
                { name: "Denise Rae Baldisimo", position: "Creatives", photoUrl: "/officers/denise-rae-baldisimo.jpg" },
                { name: "Hannah Nicole Tuer", position: "Creatives", photoUrl: "/officers/hannah-nicole-tuer.png" },
              ],
            },
          ],
        },
        {
          name: "Aiderson Abapo",
          position: "Documentation Officer",
          children: [
            {
              name: "Rovann Acevedo",
              position: "Documentation Lead",
              children: [
                { name: "Edrian Jed Fiesta", position: "Documentation", photoUrl: "/officers/edrian-jed-fiesta.jpg" },
              ],
            },
          ],
        },
        {
          name: "John Kyle Amarante",
          position: "Technology Officer",
          photoUrl: "/officers/john-kyle-amarante.jpg",
          children: [
            {
              name: "Adrian Justin J. Salinas",
              position: "Web Development Lead",
              photoUrl: "/officers/adrian-justin-salinas.jpg",
              children: [
                { name: "Matthew Tabat", position: "IT Security" },
                { name: "Alexander Michael Tolosa", position: "Back-End Developer", photoUrl: "/officers/alexander-michael-tolosa.jpg" },
                { name: "Aziel Guerrero Misola", position: "Front-End Developer", photoUrl: "/officers/aziel-guerrero-misola.jpg" },
                { name: "Deghne Gabriel Agana", position: "Front-End Developer" },
              ],
            },
            {
              name: "Ralph Danielle Dela Cruz",
              position: "Mobile Application Lead",
              photoUrl: "/officers/ralph-danielle-delacruz.jpg",
            },
            { name: "Dale Misajon", position: "IoT Hardware Lead", photoUrl: "/officers/dale-misajon.jpg" },
          ],
        },
        {
          name: "John Daniel Aboboto",
          position: "Operation Officer",
          photoUrl: "/officers/john-daniel-aboboto.png",
          children: [
            {
              name: "Janseen Azares",
              position: "Events Lead",
              photoUrl: "/officers/janseen-azares.jpg",
            },
          ],
        },
        {
          name: "Elah Marie Loyola",
          position: "Finance Officer",
          photoUrl: "/officers/elah-marie-loyola.jpg",
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
    photoUrl: node.photoUrl ?? "",
    socials: {},
    sortOrder: acc.length + 1,
  });
  node.children?.forEach((child) => flatten(child, acc));
  return acc;
}

export const realOfficers: Officer[] = flatten(orgChart);
