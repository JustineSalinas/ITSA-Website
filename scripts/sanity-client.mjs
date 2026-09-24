// Loads .env.local the same way scripts/firebase-admin-init.mjs does, then
// builds a write-capable Sanity client for CLI tooling only.
//
// This is deliberately separate from src/sanity/lib/client.ts, which is
// read-only and ships to the browser with no token. A write token must never
// reach client code -- it grants unrestricted write access to the dataset,
// the same way the Firebase service account key does for Firestore.
import { readFileSync } from "node:fs";
import { createClient } from "@sanity/client";

try {
  const env = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
  for (const line of env.split("\n")) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (!m) continue;
    const [, key, rawVal] = m;
    let val = rawVal.trim();
    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
    if (!(key in process.env)) process.env[key] = val;
  }
} catch {
  // no .env.local -- rely on ambient env
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-09-09";
const token = process.env.SANITY_API_TOKEN;

if (!projectId) {
  console.error(
    "NEXT_PUBLIC_SANITY_PROJECT_ID is not set. Add it to .env.local first.",
  );
  process.exit(1);
}

/**
 * True once a write token exists. Callers should check this before any
 * network call -- dry-run mode must work without it, since validating a
 * spreadsheet and a folder of photos needs no credentials at all.
 */
export const canWrite = Boolean(token);

export function requireWriteClient() {
  if (!token) {
    console.error(
      "SANITY_API_TOKEN is not set. Create one at sanity.io/manage -> API -> " +
        "Tokens -> Add API token, with Editor permissions, and add it to " +
        ".env.local. Never commit it or paste it anywhere outside that file.",
    );
    process.exit(1);
  }
  return createClient({ projectId, dataset, apiVersion, token, useCdn: false });
}
