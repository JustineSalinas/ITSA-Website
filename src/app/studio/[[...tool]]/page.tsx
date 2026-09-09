import { NextStudio } from "next-sanity/studio";
import { isSanityConfigured } from "@/sanity/env";
import config from "../../../../sanity.config";

/**
 * The officer-facing content editor.
 *
 * Sanity Studio is a single-page app that owns its own routing, so this is a
 * catch-all route and must be fully dynamic -- prerendering it would freeze
 * the editor at build time.
 */
export const dynamic = "force-dynamic";

export const metadata = {
  title: "ITSA Content Studio",
  // Never let an editing surface into search results.
  robots: { index: false, follow: false },
};

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <main style={{ maxWidth: "36rem", margin: "4rem auto", padding: "0 1.5rem", fontFamily: "system-ui, sans-serif", lineHeight: 1.6 }}>
        <h1 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>Content Studio is not configured</h1>
        <p style={{ color: "#555" }}>
          Set <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> in <code>.env.local</code>
          {" "}(and in the hosting environment) to enable it. See{" "}
          <code>.env.example</code> for the full list.
        </p>
        <p style={{ color: "#555" }}>
          The public site is unaffected and continues to serve its bundled content.
        </p>
      </main>
    );
  }
  return <NextStudio config={config} />;
}
