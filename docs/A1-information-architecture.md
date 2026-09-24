# A1 — Information Architecture

**Owner:** Alexander Tolosa · **Status:** Draft for review · **Unblocks:** clarity for officers publishing content, and anyone building on News/Events/Projects going forward

This isn't a pre-planning document written before the system existed — Z2
through Z6 already shipped, and S2's schemas are already live in Sanity. This
documents the distinctions that model actually settled into, so the "where
does this go" confusion the original issue named has a real, grounded answer
rather than a speculative one.

---

## 1. The three types, in one line each

| Type | What it answers | Tied to a date? |
|---|---|---|
| **Event** | "Something is happening, or happened, at a specific place and time." | Yes — `eventDate` drives everything |
| **News** | "Here's an announcement or story." | Loosely — `date` is when it was *published*, not necessarily when anything happened |
| **Project** | "Here's something we built." | No — no date field at all. It exists once, and stays |

## 2. The test that actually resolves the overlap

Ask, in order:

1. **Does it have a specific place and time someone could show up to?** → **Event.** A workshop, a general assembly, a hackathon. If it's cancelled or the date passes, it automatically moves from Upcoming to Past — nothing to maintain by hand.
2. **Is it a finished thing someone built — code, a game, a design?** → **Project.** It doesn't matter when it was built. What matters is that it's a discrete, showable artifact with a GitHub link, a live URL, or both.
3. **Otherwise, is it worth telling people about?** → **News.** This is the catch-all for everything that isn't a scheduled happening or a built artifact: officer announcements, achievements, partnership news, and — this is the one that actually resolves most of the confusion — **recaps of events that already happened.**

## 3. The relationship that was causing the confusion

The awkward case was always: *"We ran Tech Summit. Is the writeup about it an Event or News?"*

**Both, at different times, and that's fine:**

- **Before it happens:** it's an **Event** — `eventDate` in the future, shows under Upcoming, visitors can see when/where.
- **After it happens:** the event itself just moves to Past automatically. If it's worth writing up — photos, a summary, "300 people came" — that write-up is a **separate News post**, tagged with the category **"Event recap."**

This isn't a proposal — the News schema already has this option built in (`category: "Event"` → labelled "Event recap" in Sanity Studio). The system was already built assuming this split; this document just makes it explicit so a future officer doesn't have to guess.

**A project that came out of an event** (say, a hackathon-winning app) works the same way: the *event* is the hackathon, the *news* might be "we won," and the *project* is the actual app, published independently with its own award info, tags and links. Three documents, three types, no overlap.

## 4. Quick reference for officers

| If you're publishing… | Use… |
|---|---|
| A workshop, competition, or general assembly with a date | **Event** |
| A recap, announcement, achievement, or partnership shout-out | **News** |
| Something a student or team built — code, a game, a design | **Project** |
| A recap of an event that already happened | **News**, category "Event recap" — leave the Event alone, it already moved to Past on its own |

## 5. What this doesn't cover

- **Officers** and **Partners** are a different kind of content entirely — they're not "things that happened," they're standing records (who's currently an officer, who currently sponsors ITSA) that get *updated* over time rather than published as a stream. No overlap with the three types above.
- **FAQs** are answers, not announcements. Also no overlap.

---

*Written after Z2–Z6 and S2 shipped, grounded in the schemas as built (`src/sanity/schemas/`) rather than proposed ahead of them. If a future case doesn't fit cleanly into the test in section 2, that's worth a team conversation, not a forced fit.*
