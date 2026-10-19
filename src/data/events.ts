import type { EventItem } from "@/lib/types";

// Real ITSA events only -- no invented workshops, dates, or locations.
// Newest/soonest first; add new events here. Empty until officers have a
// real event to publish; the events page already renders an honest empty
// state rather than showing placeholder content.
export const localEvents: EventItem[] = [];
