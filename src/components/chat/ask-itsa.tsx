"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { MessageSquareText, X, ArrowRight, CalendarDays } from "lucide-react";
import { answeredFaqs, type FaqEntry } from "@/data/faq";
import { cn } from "@/lib/utils";

/**
 * "Ask ITSA" — a guided answer panel, deliberately not an AI chatbot.
 *
 * Every answer is written by an officer and lives in src/data/faq.ts, so the
 * panel cannot invent an eligibility rule or a membership fee. The one
 * time-sensitive answer — the next event — is passed in from the server, which
 * means it reads the same data the Events page does and cannot drift stale.
 *
 * Questions are tapped rather than typed. That covers the intents the join form
 * already tells us people arrive with, costs nothing to run, and records which
 * questions people actually pick — so the team can decide later, on evidence,
 * whether free-text answering is worth the cost and the risk.
 */

export type NextEvent = {
  title: string;
  slug: string;
  dateLabel: string;
  location: string;
} | null;

type Turn = { question: string; entry: FaqEntry | null; isEvent?: boolean };

/** Fire-and-forget: logging must never block or break the panel. */
function logQuestion(id: string) {
  try {
    const body = JSON.stringify({ questionId: id });
    // sendBeacon survives the visitor navigating away mid-click.
    if (typeof navigator !== "undefined" && navigator.sendBeacon) {
      navigator.sendBeacon(
        "/api/ask-log",
        new Blob([body], { type: "application/json" }),
      );
      return;
    }
    void fetch("/api/ask-log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {});
  } catch {
    // A logging failure must never surface to a visitor.
  }
}

export function AskItsa({ nextEvent }: { nextEvent: NextEvent }) {
  const [open, setOpen] = useState(false);
  const [turns, setTurns] = useState<Turn[]>([]);
  const panelId = useId();
  const launcherRef = useRef<HTMLButtonElement>(null);
  const logRef = useRef<HTMLDivElement>(null);

  // Escape closes the panel and returns focus to the launcher, so keyboard
  // users are never stranded inside it.
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        launcherRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Keep the newest answer in view as the conversation grows.
  useEffect(() => {
    if (turns.length) {
      logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
    }
  }, [turns]);

  function ask(entry: FaqEntry) {
    setTurns((t) => [...t, { question: entry.label, entry }]);
    logQuestion(entry.id);
  }

  function askNextEvent() {
    setTurns((t) => [
      ...t,
      { question: "When is the next event?", entry: null, isEvent: true },
    ]);
    logQuestion("next-event");
  }

  const asked = new Set(turns.map((t) => t.entry?.id).filter(Boolean));
  const remaining = answeredFaqs.filter((f) => !asked.has(f.id));
  const eventAsked = turns.some((t) => t.isEvent);

  return (
    <>
      {/* A labelled pill rather than a generic chat bubble: it says what it is,
          and stays small enough not to cover content on a phone. */}
      <button
        ref={launcherRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className={cn(
          "fixed bottom-4 right-4 z-40 inline-flex items-center gap-2 rounded-full border border-border",
          "bg-card/95 px-4 py-2.5 text-sm font-semibold shadow-lg backdrop-blur",
          "transition-colors hover:border-primary/50 hover:bg-accent",
          "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
          "motion-safe:transition-transform motion-safe:hover:-translate-y-0.5",
          open && "hidden",
        )}
      >
        <MessageSquareText className="size-4 text-primary" aria-hidden="true" />
        Ask ITSA
      </button>

      {open && (
        <div
          id={panelId}
          role="dialog"
          aria-label="Ask ITSA"
          className={cn(
            "fixed bottom-4 right-4 z-50 flex w-[calc(100vw-2rem)] max-w-sm flex-col",
            "max-h-[min(32rem,calc(100dvh-2rem))] overflow-hidden rounded-2xl",
            "border border-border bg-card shadow-2xl",
          )}
        >
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div>
              <p className="text-sm font-bold leading-none">Ask ITSA</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Quick answers from the officers
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                launcherRef.current?.focus();
              }}
              aria-label="Close"
              className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <X className="size-4" />
            </button>
          </div>

          <div
            ref={logRef}
            className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-4"
          >
            {turns.length === 0 && (
              <p className="text-sm text-muted-foreground">
                Pick a question below and we&apos;ll answer it right away.
              </p>
            )}

            {/* aria-live so screen readers hear each new answer. */}
            <div aria-live="polite" className="space-y-4">
              {turns.map((turn, i) => (
                <div key={i} className="space-y-2">
                  <p className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground">
                    {turn.question}
                  </p>

                  <div className="w-fit max-w-[92%] rounded-2xl rounded-bl-sm bg-muted px-3.5 py-2.5 text-sm">
                    {turn.isEvent ? (
                      nextEvent ? (
                        <>
                          <p className="font-semibold">{nextEvent.title}</p>
                          <p className="mt-1 flex items-start gap-1.5 text-muted-foreground">
                            <CalendarDays
                              className="mt-0.5 size-3.5 shrink-0 text-primary"
                              aria-hidden="true"
                            />
                            <span>
                              {nextEvent.dateLabel}
                              {nextEvent.location ? ` · ${nextEvent.location}` : ""}
                            </span>
                          </p>
                          <Link
                            href={`/events/${nextEvent.slug}`}
                            className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                          >
                            See details
                            <ArrowRight className="size-3.5" aria-hidden="true" />
                          </Link>
                        </>
                      ) : (
                        <>
                          <p>
                            No upcoming events are posted right now. Past events are on
                            the Events page, and new ones go up as soon as they are
                            scheduled.
                          </p>
                          <Link
                            href="/events"
                            className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                          >
                            View events
                            <ArrowRight className="size-3.5" aria-hidden="true" />
                          </Link>
                        </>
                      )
                    ) : (
                      <>
                        <p>{turn.entry?.a}</p>
                        {turn.entry?.cta && (
                          <Link
                            href={turn.entry.cta.href}
                            className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                          >
                            {turn.entry.cta.label}
                            <ArrowRight className="size-3.5" aria-hidden="true" />
                          </Link>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-border bg-muted/40 px-4 py-3">
            {remaining.length === 0 && eventAsked ? (
              <p className="text-xs text-muted-foreground">
                That&apos;s everything we have here.{" "}
                <Link href="/join" className="font-semibold text-primary hover:underline">
                  Send us a message
                </Link>{" "}
                and an officer will reply.
              </p>
            ) : (
              <>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {turns.length ? "Ask something else" : "Common questions"}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {!eventAsked && (
                    <button
                      type="button"
                      onClick={askNextEvent}
                      className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium transition-colors hover:border-primary/50 hover:bg-accent focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                    >
                      When is the next event?
                    </button>
                  )}
                  {remaining.map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => ask(f)}
                      className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium transition-colors hover:border-primary/50 hover:bg-accent focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
