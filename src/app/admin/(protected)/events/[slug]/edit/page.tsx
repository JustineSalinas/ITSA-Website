import { notFound } from "next/navigation";
import { getEventDoc } from "@/lib/admin/content";
import { EventForm } from "@/components/admin/event-form";

export default async function EditEventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const existing = await getEventDoc(slug);
  if (!existing) notFound();

  return (
    <div>
      <h1 className="font-heading text-2xl font-extrabold tracking-tight">Edit event</h1>
      <div className="mt-6">
        <EventForm existing={existing} />
      </div>
    </div>
  );
}
