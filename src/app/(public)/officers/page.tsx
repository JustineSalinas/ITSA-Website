import type { Metadata } from "next";
import { getOfficers } from "@/lib/data";
import { PageHeader } from "@/components/layout/page-header";
import { OfficerCard } from "@/components/officers/officer-card";

export const metadata: Metadata = {
  title: "Officers",
  description: "Meet the student leaders who guide ITSA this academic year.",
};

export default async function OfficersPage() {
  const officers = await getOfficers();

  return (
    <>
      <PageHeader
        eyebrow="Our team"
        title="Meet the officers"
        description="The dedicated student leaders steering ITSA this academic year."
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        {officers.length === 0 ? (
          <p className="text-center text-muted-foreground">
            Officer profiles will be published soon.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {officers.map((officer) => (
              <OfficerCard key={officer.id} officer={officer} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
