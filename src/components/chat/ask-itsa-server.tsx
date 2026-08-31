import { getEvents, splitEvents } from "@/lib/data";
import { formatEventDate, formatEventTime } from "@/lib/format";
import { AskItsa, type NextEvent } from "@/components/chat/ask-itsa";

/**
 * Feeds the panel the one answer that goes out of date: the next event.
 *
 * Reading it here, on the server, means the panel uses exactly the same source
 * as the Events page. There is no second copy of the schedule to forget to
 * update — the failure mode that kills most chatbots at a student org, where
 * whoever maintained the answers graduates.
 */
export async function AskItsaPanel() {
  let nextEvent: NextEvent = null;

  try {
    const { upcoming } = splitEvents(await getEvents());
    const next = upcoming[0];
    if (next) {
      nextEvent = {
        title: next.title,
        slug: next.slug,
        dateLabel: `${formatEventDate(next.eventDate)} · ${formatEventTime(next.eventDate)}`,
        location: next.location,
      };
    }
  } catch {
    // If events cannot be read, the panel still answers everything else and
    // points visitors at the Events page. A help widget must never take the
    // site down with it.
    nextEvent = null;
  }

  return <AskItsa nextEvent={nextEvent} />;
}
