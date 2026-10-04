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
  photoUrl: "/officers/2x2/robert-aguilar.jpg",
  children: [
    {
      name: "Gabriel Ferrera",
      position: "Chairman",
      section: "BSIT 4A",
      photoUrl: "/officers/2x2/gabriel-ferrera.jpg",
      socials: {
        website: "https://itsa-usa.org",
      },
      children: [
        {
          name: "Charles Janryl Jemina",
          position: "Vice Chairman for Internal Affairs",
          section: "BSIT 2A",
          photoUrl: "/officers/2x2/charles-janryl-jemina.jpg",
        },
        {
          name: "Theodore Samuel Navarro",
          position: "Vice Chairman for External Affairs",
          section: "BSIT 3C",
          photoUrl: "/officers/2x2/theodore-samuel-navarro.jpg",
        },
        {
          name: "Samantha Quinn Bretaña",
          position: "Secretary",
          section: "BSIT 2A",
          photoUrl: "/officers/2x2/samantha-quinn-d-bretana.jpg",
          children: [
            {
              name: "Jhon Michael Mercado",
              position: "Assistant Secretary",
              section: "BSIT 3C",
              photoUrl: "/officers/2x2/jhon-michael-mercado.jpg",
            },
          ],
        },
        {
          name: "Mhike Aleen Gacusan",
          position: "Communication Officer",
          section: "BSIT 4A",
          photoUrl: "/officers/2x2/mhike-aleen-gacusan.jpg",
          children: [
            {
              name: "Rovann Acevedo",
              position: "Documentation Lead",
              section: "BSIT 4A",
              photoUrl: "/officers/ay2026/rovann-acevedo.png",
              socials: {
                instagram: "https://instagram.com/rba_0315",
              },
              children: [
                {
                  name: "Aiderson Abapo",
                  position: "Documentation Officer",
                  section: "BSIT 4B",
                  socials: {
                    instagram: "https://instagram.com/a.aiderson",
                  },
                },
                {
                  name: "Edrian Jed Fiesta",
                  position: "Documentation",
                  section: "BSIT 4A",
                  photoUrl: "/officers/2x2/edrian-jed-fiesta.jpg",
                  socials: {
                    instagram: "https://instagram.com/edri6n.___",
                    facebook: "https://www.facebook.com/edrianjed.fiesta",
                  },
                },
              ],
            },
            {
              name: "Cholo Rosales",
              position: "Creatives Lead",
              section: "BSIT 4A",
              photoUrl: "/officers/2x2/cholo-rosales.png",
              socials: {
                instagram: "https://instagram.com/definitelynotchao",
              },
              children: [
                {
                  name: "Tim Gabriel Nuñal",
                  position: "Creatives",
                  section: "BSIT 3C",
                  photoUrl: "/officers/2x2/tim-gabriel-nunal.png",
                  socials: {
                    instagram: "https://instagram.com/tg.gabrielkingston",
                    facebook: "https://www.facebook.com/share/1BxYQoESGA/?mibextid=wwXIfr",
                  },
                },
                {
                  name: "Denise Rae Baldisimo",
                  position: "Creatives",
                  section: "BSIT 1C",
                  photoUrl: "/officers/2x2/denise-rae-baldisimo.jpg",
                  socials: {
                    instagram: "https://instagram.com/denise_rea18",
                  },
                },
                {
                  name: "Hannah Nicole Tuer",
                  position: "Creatives",
                  section: "BSIT 1C",
                  photoUrl: "/officers/2x2/hannah-nicole-tuer.png",
                  socials: {
                    instagram: "https://instagram.com/nnicsvz",
                    facebook: "https://www.facebook.com/hannicoletuer",
                  },
                },
              ],
            },
          ],
        },
        {
          name: "John Kyle Amarante",
          position: "Technology Officer",
          section: "BSIT 3A",
          photoUrl: "/officers/2x2/john-kyle-amarante.jpg",
          children: [
            {
              name: "Adrian Justin J. Salinas",
              position: "Web Development Lead",
              section: "BSIT 3C",
              photoUrl: "/officers/2x2/adrian-justin-salinas.jpg",
              socials: {
                linkedin: "https://www.linkedin.com/in/adrian-justin-salinas-a4768b226/",
                instagram: "https://www.instagram.com/a.jsalinas/",
                github: "https://github.com/JustineSalinas",
                website: "https://ajsalinas.vercel.app/",
              },
              children: [
                {
                  name: "Alexander Michael Tolosa",
                  position: "Front-End Developer",
                  section: "BSIT 3C",
                  photoUrl: "/officers/2x2/alexander-michael-tolosa.jpg",
                },
                {
                  name: "Aziel Guerrero Misola",
                  position: "Front-End Developer",
                  section: "BSIT 3C",
                  photoUrl: "/officers/2x2/aziel-guerrero-misola.jpg",
                },
                {
                  name: "Deghne Gabriel Agana",
                  position: "Front-End Developer",
                  section: "BSIT 3C",
                  photoUrl: "/officers/2x2/deghne-gabriel-agana.jpg",
                },
              ],
            },
            {
              name: "Ryan Carlo Cruzada",
              position: "Cybersecurity Lead",
              section: "BSIT 4A",
              photoUrl: "/officers/ay2026/ryan-carlo-cruzada.png",
              children: [
                {
                  name: "Matthew Tabat",
                  position: "IT Security",
                  section: "BSIT 3C",
                  photoUrl: "/officers/2x2/matthew-tabat.png",
                },
              ],
            },
            {
              name: "Ralph Danielle Dela Cruz",
              position: "Mobile Application Lead",
              section: "BSIT 4A",
              photoUrl: "/officers/2x2/ralph-danielle-delacruz.jpg",
            },
            {
              name: "Dale Misajon",
              position: "IoT Hardware Lead",
              section: "BSIT 3A",
              photoUrl: "/officers/2x2/dale-misajon.jpg",
              socials: {
                linkedin: "http://www.linkedin.com/in/dale-misajon-761a59189",
                instagram: "https://instagram.com/dalemisajon",
                github: "https://github.com/dalemisajon-cmd",
                facebook: "https://www.facebook.com/misajon.dale",
              },
            },
          ],
        },
        {
          name: "John Daniel Aboboto",
          position: "Operation Officer",
          section: "BSIT 2A",
          photoUrl: "/officers/2x2/john-daniel-aboboto.png",
          children: [
            {
              name: "Janseen Azares",
              position: "Events Lead",
              section: "BSIT 4A",
              photoUrl: "/officers/2x2/janseen-azares.jpg",
              socials: {
                instagram: "https://instagram.com/janejs_azr",
              },
            },
          ],
        },
        {
          name: "Elah Marie Loyola",
          position: "Finance Officer",
          section: "BSIT 4A",
          photoUrl: "/officers/2x2/elah-marie-loyola.jpg",
          children: [
            {
              name: "Elyza Elizabeth Gumarin",
              position: "Assistant Finance Officer",
              section: "BSIT 4B",
              photoUrl: "/officers/ay2026/elyza-elizabeth-gumarin.jpg",
              socials: {
                instagram: "https://instagram.com/eli._elise",
              },
            },
            {
              name: "Nizon Jeorgie I. Pison II",
              position: "Assistant Finance Officer",
              section: "BSIT 3C",
              photoUrl: "/officers/ay2026/nizon-jeorgie-i-pison-ii.jpg",
              socials: {
                linkedin: "https://www.linkedin.com/in/njpison/",
                instagram: "https://instagram.com/iinosipjn",
                github: "https://github.com/jpnj05",
                facebook: "https://www.facebook.com/IInosiPJN/",
              },
            },
          ],
        },
      ],
    },
  ],
};


const shootPhotos: Record<string, string> = {
  "Gabriel Ferrera": "/officers/ay2026/gabriel-ferrera.jpg",
  "Charles Janryl Jemina": "/officers/ay2026/charles-janryl-jemina.jpg",
  "Theodore Samuel Navarro": "/officers/ay2026/theodore-samuel-navarro.jpg",
  "Samantha Quinn Bretaña": "/officers/ay2026/samantha-quinn-d-bretana.jpg",
  "Jhon Michael Mercado": "/officers/ay2026/jhon-michael-mercado.jpg",
  "Cholo Rosales": "/officers/ay2026/cholo-rosales.jpg",
  "Tim Gabriel Nuñal": "/officers/ay2026/tim-gabriel-nunal.jpg",
  "Denise Rae Baldisimo": "/officers/ay2026/denise-rae-baldisimo.jpg",
  "John Kyle Amarante": "/officers/ay2026/john-kyle-amarante.jpg",
  "Adrian Justin J. Salinas": "/officers/ay2026/adrian-justin-salinas.jpg",
  "Alexander Michael Tolosa": "/officers/ay2026/alexander-michael-tolosa.jpg",
  "Deghne Gabriel Agana": "/officers/ay2026/deghne-gabriel-agana.jpg",
  "Ralph Danielle Dela Cruz": "/officers/ay2026/ralph-danielle-delacruz.jpg",
  "Dale Misajon": "/officers/ay2026/dale-misajon.jpg",
  "John Daniel Aboboto": "/officers/ay2026/john-daniel-aboboto.jpg",
  "Janseen Azares": "/officers/ay2026/janseen-azares.jpg",
  "Elah Marie Loyola": "/officers/ay2026/elah-marie-loyola.jpg",
  "Elyza Elizabeth Gumarin": "/officers/ay2026/elyza-elizabeth-gumarin.jpg",
  "Nizon Jeorgie I. Pison II": "/officers/ay2026/nizon-jeorgie-i-pison-ii.jpg",
  "Ryan Carlo Cruzada": "/officers/ay2026/ryan-carlo-cruzada.png",
  "Rovann Acevedo": "/officers/ay2026/rovann-acevedo.png",
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
    photoUrl: shootPhotos[node.name] ?? node.photoUrl ?? "",
    socials: node.socials ?? {},
    sortOrder: acc.length + 1,
  });
  node.children?.forEach((child) => flatten(child, currentSection, acc));
  return acc;
}

export const realOfficers: Officer[] = flatten(orgChart);
