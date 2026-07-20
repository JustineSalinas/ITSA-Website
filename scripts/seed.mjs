// Seeds Firestore with sample officers and events.
// Usage: node scripts/seed.mjs   (requires FIREBASE_* admin vars in .env.local)
import { readFileSync } from "node:fs";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore, Timestamp } from "firebase-admin/firestore";

// Minimal .env.local loader (no dependency).
try {
  const env = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
  for (const line of env.split("\n")) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && !process.env[m[1]]) {
      process.env[m[1]] = m[2].replace(/^"|"$/g, "");
    }
  }
} catch {
  // no .env.local — rely on ambient env
}

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

if (!projectId || !clientEmail || !privateKey) {
  console.error(
    "Missing FIREBASE_PROJECT_ID / FIREBASE_CLIENT_EMAIL / FIREBASE_PRIVATE_KEY. " +
      "Fill them in .env.local first.",
  );
  process.exit(1);
}

if (!getApps().length) {
  initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
}
const db = getFirestore();

const officers = [
  { name: "Juan Dela Cruz", position: "President", sortOrder: 1, bio: "Fourth-year IT student passionate about software engineering." },
  { name: "Maria Santos", position: "Vice President", sortOrder: 2, bio: "Leads internal affairs and mentorship programs." },
  { name: "Angelo Reyes", position: "Secretary", sortOrder: 3, bio: "Enjoys competitive programming and open source." },
  { name: "Bea Villanueva", position: "Treasurer", sortOrder: 4, bio: "Handles finances and sponsorships." },
  { name: "Carlo Mendoza", position: "Public Relations Officer", sortOrder: 5, bio: "Tells the ITSA story across social media." },
  { name: "Nicole Garcia", position: "Technical Head", sortOrder: 6, bio: "Organizes workshops on web dev and cybersecurity." },
];

function daysFromNow(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  d.setHours(13, 0, 0, 0);
  return d;
}

const events = [
  { title: "Tech Summit 2026", slug: "tech-summit-2026", location: "USA Arts & Sciences Auditorium", date: daysFromNow(21), description: "Our flagship annual summit with industry speakers, alumni, and students." },
  { title: "Intro to Web Development Workshop", slug: "intro-web-dev-workshop", location: "IT Laboratory 2", date: daysFromNow(7), description: "A hands-on beginner-friendly workshop covering HTML, CSS, and JavaScript." },
  { title: "Capture The Flag: Cybersecurity Night", slug: "ctf-cybersecurity-night", location: "Online / Discord", date: daysFromNow(35), description: "A friendly CTF competition. Teams of up to four. Prizes for the top three." },
  { title: "General Assembly & Orientation", slug: "general-assembly-orientation", location: "USA Gymnasium", date: daysFromNow(-14), description: "Kickoff assembly for the school year. Meet the officers." },
];

async function main() {
  console.log("Seeding officers...");
  for (const o of officers) {
    await db.collection("officers").add({ ...o, photoUrl: "", socials: {}, createdAt: Timestamp.now() });
  }
  console.log("Seeding events...");
  for (const e of events) {
    const { date, ...rest } = e;
    await db.collection("events").add({ ...rest, imageUrl: "", eventDate: Timestamp.fromDate(date), createdAt: Timestamp.now() });
  }
  console.log("Done. Seeded", officers.length, "officers and", events.length, "events.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
