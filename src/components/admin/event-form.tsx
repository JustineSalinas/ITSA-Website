"use client";

import { useActionState } from "react";
import Image from "next/image";
import { saveEvent, type EventFormState } from "@/app/admin/(protected)/events/_actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { EventItem } from "@/lib/types";

export function EventForm({ existing }: { existing?: EventItem }) {
  const action = saveEvent.bind(null, existing?.slug ?? null);
  const [state, formAction, pending] = useActionState<EventFormState, FormData>(action, undefined);

  // datetime-local wants "YYYY-MM-DDTHH:mm"; eventDate is stored as full ISO.
  const defaultDateTime = existing?.eventDate ? existing.eventDate.slice(0, 16) : undefined;

  return (
    <form action={formAction} className="max-w-2xl space-y-5">
      <div className="space-y-1.5">
        <Label htmlFor="title">Event name</Label>
        <Input id="title" name="title" required defaultValue={existing?.title} />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="slug">Web address (slug)</Label>
        <Input
          id="slug"
          name="slug"
          placeholder="auto-generated from the name if left blank"
          defaultValue={existing?.slug}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="eventDate">Date & time</Label>
          <Input id="eventDate" name="eventDate" type="datetime-local" required defaultValue={defaultDateTime} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="location">Location</Label>
          <Input id="location" name="location" required defaultValue={existing?.location} />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" required rows={6} defaultValue={existing?.description} />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="image">Cover photo</Label>
        {existing?.imageUrl && (
          <div className="relative mb-2 h-40 w-full max-w-xs overflow-hidden rounded-lg border-2 border-foreground">
            <Image src={existing.imageUrl} alt="" fill className="object-cover" />
          </div>
        )}
        <Input id="image" name="image" type="file" accept="image/*" required={!existing} />
        <input type="hidden" name="existingImageUrl" value={existing?.imageUrl ?? ""} />
        <p className="text-xs text-muted-foreground">Under 4MB. Required.</p>
      </div>

      {state?.error && (
        <p className="text-sm font-medium text-destructive" role="alert">{state.error}</p>
      )}

      <Button type="submit" disabled={pending}>
        {pending ? "Saving…" : existing ? "Save changes" : "Publish"}
      </Button>
    </form>
  );
}
