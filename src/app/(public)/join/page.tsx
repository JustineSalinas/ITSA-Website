import type { Metadata } from "next";
import { CheckCircle2, Mail, MapPin } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { JoinForm } from "@/components/forms/join-form";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Join",
  description: `Become a member of ${siteConfig.name} or get in touch with the ${siteConfig.fullName}.`,
};

const perks = [
  "Access to workshops, seminars, and exclusive events",
  "Mentorship from peers, alumni, and industry pros",
  "Networking with fellow IT students and companies",
  "Opportunities to lead projects and committees",
];

export default function JoinPage() {
  return (
    <>
      <PageHeader
        title="Join ITSA"
        description="Ready to be part of the community? Fill out the form and we'll reach out with next steps."
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Info column */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold">Why become a member?</h2>
            <ul className="mt-5 space-y-3">
              {perks.map((perk) => (
                <li key={perk} className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                  <span className="text-muted-foreground">{perk}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 space-y-3 rounded-xl border border-border bg-muted/30 p-6 text-sm">
              <h3 className="font-semibold">Prefer to reach us directly?</h3>
              <p className="flex items-center gap-2.5 text-muted-foreground">
                <Mail className="size-4 text-primary" />
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="hover:text-primary"
                >
                  {siteConfig.contactEmail}
                </a>
              </p>
              <p className="flex items-center gap-2.5 text-muted-foreground">
                <MapPin className="size-4 text-primary" />
                {siteConfig.location}
              </p>
            </div>
          </div>

          {/* Form column */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
              <JoinForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
