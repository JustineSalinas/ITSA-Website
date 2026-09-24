// Bulk import for the Google Drive archive -- a spreadsheet plus a folder of
// photos in, published Sanity documents out.
//
// Usage:
//   node scripts/sanity-import.mjs <spreadsheet.csv> <photos-folder>
//   node scripts/sanity-import.mjs <spreadsheet.csv> <photos-folder> --commit
//
// Without --commit this only reports what WOULD be created -- no network
// calls, no credentials needed. Real Drive exports are messy; always run
// the dry-run first and read the report before committing anything.
//
// The spreadsheet needs these columns (export a Google Sheet to CSV to get
// this format):
//
//   type         required. "event", "news", or "project".
//   title        required.
//   date         required for event/news. Any format JavaScript's Date can
//                parse, e.g. 2026-03-14 or "March 14, 2026".
//   description  required for event/news (used as the event description or
//                news excerpt). Optional for project (falls back to title).
//   location     event only.
//   category     news only. Announcement / Event / Achievement / Partnership.
//   author       project only.
//   image        optional. A filename that must exist in the photos folder
//                passed as the second argument.
//
// Column order does not matter; the header row picks it up by name. Extra
// columns are ignored.
import { readFileSync, existsSync } from "node:fs";
import { basename, join } from "node:path";
import { canWrite, requireWriteClient } from "./sanity-client.mjs";

const [, , csvPath, photosDir, ...rest] = process.argv;
const commit = rest.includes("--commit");

if (!csvPath || !photosDir) {
  console.error(
    "Usage: node scripts/sanity-import.mjs <spreadsheet.csv> <photos-folder> [--commit]",
  );
  process.exit(1);
}

// --- Minimal CSV parsing -----------------------------------------------
// Handles the common Google Sheets export shape: comma-separated,
// double-quoted fields when a value itself contains a comma or quote. Not a
// general-purpose CSV parser -- if a real export needs more than this,
// that's a sign to reach for a library rather than extend this by hand.
function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"' && text[i + 1] === '"') {
        field += '"';
        i++;
      } else if (c === '"') {
        inQuotes = false;
      } else {
        field += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field);
      if (row.some((v) => v.trim() !== "")) rows.push(row);
      row = [];
      field = "";
    } else {
      field += c;
    }
  }
  if (field !== "" || row.length > 0) {
    row.push(field);
    if (row.some((v) => v.trim() !== "")) rows.push(row);
  }

  const [header, ...body] = rows;
  const cols = header.map((h) => h.trim().toLowerCase());
  return body.map((r) => {
    const record = {};
    cols.forEach((col, idx) => (record[col] = (r[idx] ?? "").trim()));
    return record;
  });
}

function slugify(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 96);
}

// --- Load and validate ---------------------------------------------------
if (!existsSync(csvPath)) {
  console.error(`Spreadsheet not found: ${csvPath}`);
  process.exit(1);
}
if (!existsSync(photosDir)) {
  console.error(`Photos folder not found: ${photosDir}`);
  process.exit(1);
}

const rows = parseCsv(readFileSync(csvPath, "utf8"));
const VALID_TYPES = new Set(["event", "news", "project"]);
const errors = [];
const planned = [];

rows.forEach((row, i) => {
  const line = i + 2; // header is line 1
  const type = row.type?.toLowerCase();

  if (!VALID_TYPES.has(type)) {
    errors.push(`Line ${line}: type must be event, news, or project (got "${row.type || ""}")`);
    return;
  }
  if (!row.title) {
    errors.push(`Line ${line}: title is required`);
    return;
  }
  if ((type === "event" || type === "news") && !row.date) {
    errors.push(`Line ${line}: date is required for ${type}`);
    return;
  }
  if (row.date && Number.isNaN(new Date(row.date).getTime())) {
    errors.push(`Line ${line}: "${row.date}" is not a date I can read`);
    return;
  }
  if (row.image) {
    const imagePath = join(photosDir, row.image);
    if (!existsSync(imagePath)) {
      errors.push(`Line ${line}: image "${row.image}" not found in ${photosDir}`);
      return;
    }
  }

  planned.push({ line, type, row, slug: slugify(row.title) });
});

// Duplicate slugs within the same import would silently overwrite one
// another in Sanity (slugs are meant to be unique per type). The first
// occurrence stays in `planned`; every later one is an error and is removed
// from the ready-to-import list, so the two sections of the report never
// contradict each other.
const seen = new Map();
const duplicateLines = new Set();
for (const p of planned) {
  const key = `${p.type}:${p.slug}`;
  if (seen.has(key)) {
    errors.push(
      `Line ${p.line}: slug "${p.slug}" duplicates line ${seen.get(key)} -- rename one of the titles`,
    );
    duplicateLines.add(p.line);
  } else {
    seen.set(key, p.line);
  }
}
const readyToImport = planned.filter((p) => !duplicateLines.has(p.line));

console.log(`Read ${rows.length} row(s) from ${csvPath}.\n`);

if (errors.length > 0) {
  console.log(`${errors.length} problem(s) found -- fix these before importing:\n`);
  errors.forEach((e) => console.log(`  - ${e}`));
  console.log("");
}

const LISTING_PATH = { event: "events", news: "news", project: "projects" };

console.log(`${readyToImport.length} row(s) ready to import:\n`);
for (const p of readyToImport) {
  const img = p.row.image ? ` [+ photo: ${basename(p.row.image)}]` : "";
  console.log(`  [${p.type}] ${p.row.title} -> /${LISTING_PATH[p.type]}/${p.slug}${img}`);
}

if (!commit) {
  console.log(
    `\nDry run only -- nothing was written. Re-run with --commit once this report looks right.`,
  );
  process.exit(errors.length > 0 ? 1 : 0);
}

if (errors.length > 0) {
  console.error("\nRefusing to commit: fix the problems above first.");
  process.exit(1);
}

if (!canWrite) {
  console.error(
    "\n--commit was passed but SANITY_API_TOKEN is not set. See the message above for how to create one.",
  );
  process.exit(1);
}

console.log("\nWriting to Sanity...\n");
const client = requireWriteClient();

for (const p of readyToImport) {
  const { type, row, slug, line } = p;
  const doc = { _type: type, title: row.title, slug: { _type: "slug", current: slug } };

  if (type === "event") {
    doc.eventDate = new Date(row.date).toISOString();
    doc.location = row.location || "";
    doc.description = row.description || "";
  } else if (type === "news") {
    doc.date = new Date(row.date).toISOString();
    doc.excerpt = row.description || "";
    if (row.category) doc.category = row.category;
  } else if (type === "project") {
    doc.description = row.description || row.title;
    doc.author = row.author || "";
  }

  if (row.image) {
    const imagePath = join(photosDir, row.image);
    const asset = await client.assets.upload("image", readFileSync(imagePath), {
      filename: basename(imagePath),
    });
    doc.coverImage = { _type: "image", asset: { _type: "reference", _ref: asset._id } };
  }

  const created = await client.create(doc);
  console.log(`  line ${line}: created ${type} "${row.title}" (${created._id})`);
}

console.log(`\nDone -- ${readyToImport.length} document(s) created.`);
