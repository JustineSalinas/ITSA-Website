import type { Metadata } from "next";
import { Mail, MapPin, HelpCircle } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { JoinForm } from "@/components/forms/join-form";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { siteConfig } from "@/data/site";
import { joinPageFaqs } from "@/data/faq";

export const metadata: Metadata = {
  title: "Join",
  description: `Become a member of ${siteConfig.name} or get in touch with the ${siteConfig.fullName}.`,
};

export default function JoinPage() {
  return (
    <>
      <PageHeader
        title="Become an ITSA member."
        description="Ready to level up your technical skills, build real projects, and join a passionate student dev community?"
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Info column (5 cols) */}
          <div className="space-y-8 lg:col-span-5">
            {/* Direct Contact Glass Card */}
            <SpotlightCard spotlightColor="rgba(52, 169, 224, 0.15)" className="p-6">
              <h3 className="font-heading text-base font-bold">Need direct assistance?</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Have questions regarding sponsorship, partnerships, or department inquiries?
              </p>
              <div className="mt-4 space-y-2.5 font-mono text-xs">
                <p className="flex items-center gap-2.5 text-muted-foreground">
                  <Mail className="size-4 text-brand" />
                  <a href={`mailto:${siteConfig.contactEmail}`} className="hover:text-foreground hover:underline">
                    {siteConfig.contactEmail}
                  </a>
                </p>
                <p className="flex items-center gap-2.5 text-muted-foreground">
                  <MapPin className="size-4 text-brand-orange" />
                  <span>{siteConfig.location}</span>
                </p>
              </div>
            </SpotlightCard>
          </div>

          {/* Form column (7 cols) */}
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-card/70 p-6 shadow-xl backdrop-blur-xl sm:p-10 dark:bg-card/40">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-brand via-blue-500 to-brand-orange" />
              <div className="mb-6">
                <h2 className="text-2xl font-bold tracking-tight">Member Registration</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Fill out the form below and our team will get in touch with your onboarding details.
                </p>
              </div>
              <JoinForm />
            </div>
          </div>
        </div>

        {/* Quick FAQ Section */}
        <div className="mt-24 rounded-3xl border border-border/60 bg-muted/20 p-8 sm:p-12">
          <div className="flex items-center gap-2 font-mono text-xs font-semibold text-primary">
            <HelpCircle className="size-4" /> FREQUENTLY ASKED QUESTIONS
          </div>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
            Everything you need to know
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {joinPageFaqs.map((faq) => (
              <div key={faq.q} className="rounded-2xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm">
                <h3 className="font-bold text-base">{faq.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
