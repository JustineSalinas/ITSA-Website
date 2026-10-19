import { EventForm } from "@/components/admin/event-form";

export default function NewEventPage() {
  return (
    <div>
      <h1 className="font-heading text-2xl font-extrabold tracking-tight">New event</h1>
      <div className="mt-6">
        <EventForm />
      </div>
    </div>
  );
}
