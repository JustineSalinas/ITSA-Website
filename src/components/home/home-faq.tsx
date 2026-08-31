import Link from "next/link";
import { HelpCircle, ChevronDown, ArrowRight } from "lucide-react";
import { answeredFaqs } from "@/data/faq";

/**
 * Homepage FAQ.
 *
 * Built on native <details>/<summary>. That gives keyboard operation, screen
 * reader semantics, and open/close state for free — no JavaScript, no state,
 * and it works before hydration, which matters on a slow phone.
 *
 * Questions come from src/data/faq.ts, the same source as the Join page FAQ
 * and the Ask ITSA panel, so an answer is written once. Entries with no
 * written answer stay hidden everywhere.
 */
export function HomeFaq() {
  if (answeredFaqs.length === 0) return null;

  return (
    <section className="border-t border-border/60 bg-muted/20 py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-mono text-xs font-semibold text-primary">
            <HelpCircle className="size-3.5" aria-hidden="true" />
            FAQS
          </div>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
            Questions students ask us
          </h2>
        </div>

        <div className="mt-10 divide-y divide-border/70 overflow-hidden rounded-2xl border border-border/70 bg-card">
          {answeredFaqs.map((faq) => (
            <details key={faq.id} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left font-semibold transition-colors hover:bg-accent/60 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 sm:px-6">
                <span className="text-sm sm:text-base">{faq.q}</span>
                <ChevronDown
                  className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
                  aria-hidden="true"
                />
              </summary>
              <div className="px-5 pb-5 sm:px-6">
                <p className="text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
                {faq.cta && (
                  <Link
                    href={faq.cta.href}
                    className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                  >
                    {faq.cta.label}
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </Link>
                )}
              </div>
            </details>
          ))}
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Still have a question?{" "}
          <Link href="/join" className="font-semibold text-primary hover:underline">
            Send us a message
          </Link>{" "}
          and an officer will reply.
        </p>
      </div>
    </section>
  );
}
