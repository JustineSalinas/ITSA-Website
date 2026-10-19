import Link from "next/link";
import { listEvents } from "@/lib/admin/content";
import { Button } from "@/components/ui/button";
import { AdminDeleteButton } from "@/components/admin/delete-button";
import { deleteEventAction } from "@/app/admin/(protected)/events/_actions";

export default async function AdminEventsListPage() {
  const items = await listEvents();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-extrabold tracking-tight">Events</h1>
        <Button render={<Link href="/admin/events/new" />}>New event</Button>
      </div>

      <div className="mt-6 divide-y-2 divide-foreground/10 rounded-xl border-2 border-foreground bg-card">
        {items.length === 0 && (
          <p className="p-5 text-sm text-muted-foreground">No events yet.</p>
        )}
        {items.map((item) => (
          <div key={item.slug} className="flex items-center justify-between gap-4 p-4">
            <div className="min-w-0">
              <p className="truncate font-semibold">{item.title}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(item.eventDate).toLocaleString("en-PH")} · {item.location}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Button variant="outline" size="sm" render={<Link href={`/admin/events/${item.slug}/edit`} />}>
                Edit
              </Button>
              <AdminDeleteButton
                action={deleteEventAction.bind(null, item.slug)}
                confirmLabel={`Delete "${item.title}"?`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
