import type { Officer, OrgNode } from "@/lib/types";

// The real ITSA organizational chart (AY 2026), transcribed from the official
// org-chart document. Names are given in natural order. This tree is the single
// source of truth: the flat `realOfficers` list below is derived from it, so the
// /officers cards and the visual chart never drift apart.
//
// Reporting lines: the two Vice Chairmen and the five department heads
// (Secretary + four department Officers) are shown as direct reports of the
// Chairman. Each department carries its own leads.
export const orgChart: OrgNode = {
  name: "Robert A. Aguilar Jr.",
  position: "IT Academic Supervisor",
  section: "Faculty",
  photoUrl: "/officers/ay2026/robert-aguilar.jpg",
  children: [
    {
      name: "Gabriel Ferrera",
      position: "Chairman",
      section: "BSIT 4A",
      photoUrl: "/officers/ay2026/gabriel-ferrera.jpg",
      socials: {
        linkedin: "https://linkedin.com",
        instagram: "https://instagram.com",
        website: "https://itsa-usa.org",
      },
      children: [
        {
          name: "Charles Janryl Jemina",
          position: "Vice Chairman for Internal Affairs",
          section: "BSIT 2A",
          photoUrl: "/officers/ay2026/charles-janryl-jemina.jpg",
          socials: {
            linkedin: "https://linkedin.com",
            instagram: "https://instagram.com",
          },
        },
        {
          name: "Theodore Samuel Navarro",
          position: "Vice Chairman for External Affairs",
          section: "BSIT 3C",
          photoUrl: "/officers/ay2026/theodore-samuel-navarro.jpg",
          socials: {
            linkedin: "https://linkedin.com",
            instagram: "https://instagram.com",
          },
        },
        {
          name: "Samantha Quinn Bretaña",
          position: "Secretary",
          section: "BSIT 2A",
          photoUrl: "/officers/ay2026/samantha-quinn-d-bretana.jpg",
          socials: {
            linkedin: "https://linkedin.com",
            instagram: "https://instagram.com",
          },
          children: [
            {
              name: "Jhon Michael Mercado",
              position: "Assistant Secretary",
              section: "BSIT 3C",
              photoUrl: "/officers/ay2026/jhon-michael-mercado.jpg",
            },
          ],
        },
        {
          name: "Mhike Aleen Gacusan",
          position: "Communication Officer",
          section: "BSIT 4A",
          photoUrl: "/officers/ay2026/mhike-aleen-gacusan.jpg",
          socials: {
            linkedin: "https://linkedin.com",
            instagram: "https://instagram.com",
          },
          children: [
            {
              name: "Cholo Rosales",
              position: "Creatives Lead",
              section: "BSIT 4A",
              photoUrl: "/officers/ay2026/cholo-rosales.png",
              children: [
                {
                  name: "Tim Gabriel Nuñal",
                  position: "Creatives",
                  section: "BSIT 3C",
                  photoUrl: "/officers/ay2026/tim-gabriel-nunal.png",
                },
                {
                  name: "Denise Rae Baldisimo",
                  position: "Creatives",
                  section: "BSIT 1C",
                  photoUrl: "/officers/ay2026/denise-rae-baldisimo.jpg",
                },
                {
                  name: "Hannah Nicole Tuer",
                  position: "Creatives",
                  section: "BSIT 1C",
                  photoUrl: "/officers/ay2026/hannah-nicole-tuer.png",
                },
              ],
            },
          ],
        },
        {
          name: "Aiderson Abapo",
          position: "Documentation Officer",
          section: "BSIT 4B",
          children: [
            {
              name: "Rovann Acevedo",
              position: "Documentation Lead",
              section: "BSIT 4A",
              children: [
                {
                  name: "Edrian Jed Fiesta",
                  position: "Documentation",
                  section: "BSIT 4A",
                  photoUrl: "/officers/ay2026/edrian-jed-fiesta.jpg",
                },
              ],
            },
          ],
        },
        {
          name: "John Kyle Amarante",
          position: "Technology Officer",
          section: "BSIT 3A",
          photoUrl: "/officers/ay2026/john-kyle-amarante.jpg",
          socials: {
            linkedin: "https://linkedin.com",
            instagram: "https://instagram.com",
          },
          children: [
            {
              name: "Adrian Justin J. Salinas",
              position: "IT Project Manager",
              section: "BSIT 3C",
              photoUrl: "/officers/ay2026/adrian-justin-salinas.jpg",
              socials: {
                linkedin: "https://www.linkedin.com/in/adrian-justin-salinas-a4768b226/",
                instagram: "https://www.instagram.com/a.jsalinas/",
                github: "https://github.com/JustineSalinas",
                website: "https://ajsalinas.vercel.app/",
              },
            },
            {
              name: "Alexander Michael Tolosa",
              position: "Web Development Lead",
              section: "BSIT 3C",
              photoUrl: "/officers/ay2026/alexander-michael-tolosa.jpg",
              children: [
                {
                  name: "Aziel Guerrero Misola",
                  position: "Front-End Developer",
                  section: "BSIT 3C",
                  photoUrl: "/officers/ay2026/aziel-guerrero-misola.jpg",
                },
                {
                  name: "Deghne Gabriel Agana",
                  position: "Front-End Developer",
                  section: "BSIT 3C",
                  photoUrl: "/officers/ay2026/deghne-gabriel-agana.jpg",
                },
              ],
            },
            {
              name: "Ryan Carlo Cruzada",
              position: "Cybersecurity Lead",
              section: "BSIT 4A",
              children: [
                {
                  name: "Matthew Tabat",
                  position: "IT Security",
                  section: "BSIT 3C",
                  photoUrl: "/officers/ay2026/matthew-tabat.png",
                },
              ],
            },
            {
              name: "Ralph Danielle Dela Cruz",
              position: "Mobile Application Lead",
              section: "BSIT 4A",
              photoUrl: "/officers/ay2026/ralph-danielle-delacruz.jpg",
            },
            {
              name: "Dale Misajon",
              position: "IoT Hardware Lead",
              section: "BSIT 3A",
              photoUrl: "/officers/ay2026/dale-misajon.jpg",
            },
          ],
        },
        {
          name: "John Daniel Aboboto",
          position: "Operation Officer",
          section: "BSIT 2A",
          photoUrl: "/officers/ay2026/john-daniel-aboboto.png",
          socials: {
            linkedin: "https://linkedin.com",
            instagram: "https://instagram.com",
          },
          children: [
            {
              name: "Janseen Azares",
              position: "Events Lead",
              section: "BSIT 4A",
              photoUrl: "/officers/ay2026/janseen-azares.jpg",
            },
          ],
        },
        {
          name: "Elah Marie Loyola",
          position: "Finance Officer",
          section: "BSIT 4A",
          photoUrl: "/officers/ay2026/elah-marie-loyola.jpg",
          socials: {
            linkedin: "https://linkedin.com",
            instagram: "https://instagram.com",
          },
          children: [
            {
              name: "Elyza Elizabeth Gumarin",
              position: "Assistant Finance Officer",
              section: "BSIT 4B",
              photoUrl: "/officers/ay2026/elyza-elizabeth-gumarin.jpg",
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
function flatten(node: OrgNode, parentSection: string = "", acc: Officer[] = []): Officer[] {
  const currentSection = node.section ?? parentSection;
  acc.push({
    id: slugify(node.name),
    name: node.name,
    position: node.position,
    section: currentSection,
    bio: "",
    photoUrl: node.photoUrl ?? "",
    socials: node.socials ?? {},
    sortOrder: acc.length + 1,
  });
  node.children?.forEach((child) => flatten(child, currentSection, acc));
  return acc;
}

export const realOfficers: Officer[] = flatten(orgChart);
