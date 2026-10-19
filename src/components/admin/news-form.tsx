"use client";

import { useActionState } from "react";
import Image from "next/image";
import { saveNews, type NewsFormState } from "@/app/admin/(protected)/news/_actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { NewsItem } from "@/lib/types";

const CATEGORIES = ["Announcement", "Event", "Achievement", "Partnership"];

export function NewsForm({ existing }: { existing?: NewsItem }) {
  const action = saveNews.bind(null, existing?.slug ?? null);
  const [state, formAction, pending] = useActionState<NewsFormState, FormData>(action, undefined);

  return (
    <form action={formAction} className="max-w-2xl space-y-5">
      <div className="space-y-1.5">
        <Label htmlFor="title">Headline</Label>
        <Input id="title" name="title" required defaultValue={existing?.title} maxLength={120} />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="slug">Web address (slug)</Label>
        <Input
          id="slug"
          name="slug"
          placeholder="auto-generated from the headline if left blank"
          defaultValue={existing?.slug}
        />
        <p className="text-xs text-muted-foreground">
          itsa-usa.org/news/<span className="font-mono">your-slug</span>. Changing this on an
          existing post breaks its old link.
        </p>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="date">Date published</Label>
        <Input id="date" name="date" type="date" required defaultValue={existing?.date} />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="category">Category</Label>
        <select
          id="category"
          name="category"
          defaultValue={existing?.category ?? "Announcement"}
          className="flex h-10 w-full rounded-lg border-2 border-foreground bg-background px-3 text-sm shadow-[2px_2px_0_0_var(--foreground)]"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="excerpt">Summary</Label>
        <Textarea id="excerpt" name="excerpt" required rows={2} maxLength={300} defaultValue={existing?.excerpt} />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="content">Article</Label>
        <Textarea
          id="content"
          name="content"
          required
          rows={10}
          defaultValue={existing?.content}
          placeholder="Separate paragraphs with a blank line."
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="image">Cover photo</Label>
        {existing?.imageUrl && (
          <div className="relative mb-2 h-40 w-full max-w-xs overflow-hidden rounded-lg border-2 border-foreground">
            <Image src={existing.imageUrl} alt="" fill className="object-cover" />
          </div>
        )}
        <Input id="image" name="image" type="file" accept="image/*" />
        <input type="hidden" name="existingImageUrl" value={existing?.imageUrl ?? ""} />
        <p className="text-xs text-muted-foreground">Under 4MB. Leave blank to keep the current photo.</p>
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
