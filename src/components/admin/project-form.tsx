"use client";

import { useActionState } from "react";
import Image from "next/image";
import { saveProject, type ProjectFormState } from "@/app/admin/(protected)/projects/_actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { ProjectItem } from "@/data/projects";

function linesOf(items: { title: string; description: string }[] | undefined): string {
  return (items ?? []).map((i) => `${i.title} | ${i.description}`).join("\n");
}
function teamLinesOf(items: { name: string; role: string }[] | undefined): string {
  return (items ?? []).map((i) => `${i.name} | ${i.role}`).join("\n");
}

export function ProjectForm({ existing }: { existing?: ProjectItem }) {
  const action = saveProject.bind(null, existing?.slug ?? null);
  const [state, formAction, pending] = useActionState<ProjectFormState, FormData>(action, undefined);

  return (
    <form action={formAction} className="max-w-2xl space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="title">Project name</Label>
          <Input id="title" name="title" required defaultValue={existing?.title} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="slug">Web address (slug)</Label>
          <Input id="slug" name="slug" placeholder="auto-generated if left blank" defaultValue={existing?.slug} />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="description">Short description</Label>
        <Textarea id="description" name="description" required rows={2} defaultValue={existing?.description} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="author">Author / lead</Label>
          <Input id="author" name="author" required defaultValue={existing?.author} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="role">Author&apos;s role (optional)</Label>
          <Input id="role" name="role" defaultValue={existing?.role} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="teamName">Team name (optional)</Label>
          <Input id="teamName" name="teamName" defaultValue={existing?.teamName} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="teamMembers">Team members (optional)</Label>
          <Textarea
            id="teamMembers"
            name="teamMembers"
            rows={3}
            placeholder={"One per line: Name | Role"}
            defaultValue={teamLinesOf(existing?.teamMembers)}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="tags">Tags</Label>
        <Input id="tags" name="tags" required placeholder="Web App, Hackathon, Award" defaultValue={existing?.tags.join(", ")} />
        <p className="text-xs text-muted-foreground">
          Comma-separated. Include &quot;Award&quot; (or &quot;Winner&quot;/&quot;Prize&quot;) to list it on the Awards page.
        </p>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="techStack">Tech stack (optional)</Label>
        <Input id="techStack" name="techStack" placeholder="Next.js, TypeScript, Firebase" defaultValue={existing?.techStack?.join(", ")} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="githubUrl">GitHub URL (optional)</Label>
          <Input id="githubUrl" name="githubUrl" type="url" defaultValue={existing?.githubUrl} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="liveUrl">Live URL (optional)</Label>
          <Input id="liveUrl" name="liveUrl" type="url" defaultValue={existing?.liveUrl} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div className="space-y-1.5">
          <Label htmlFor="awardName">Award name (optional)</Label>
          <Input id="awardName" name="awardName" placeholder="Top 10 Finalist" defaultValue={existing?.awardName} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="awardHost">Award host (optional)</Label>
          <Input id="awardHost" name="awardHost" defaultValue={existing?.awardHost} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="awardDate">Award date (optional)</Label>
          <Input id="awardDate" name="awardDate" type="date" defaultValue={existing?.awardDate} />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="content">What it does</Label>
        <Textarea id="content" name="content" required rows={5} defaultValue={existing?.content} />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="features">Features (optional)</Label>
        <Textarea
          id="features"
          name="features"
          rows={5}
          placeholder={"One per line: Feature title | Short description"}
          defaultValue={linesOf(existing?.features)}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="impact">Impact (optional)</Label>
        <Textarea
          id="impact"
          name="impact"
          rows={4}
          placeholder={"One documented outcome per line. Never invented numbers."}
          defaultValue={(existing?.impact ?? []).join("\n")}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="image">Screenshot (optional)</Label>
        {existing?.imageUrl && (
          <div className="relative mb-2 h-40 w-full max-w-xs overflow-hidden rounded-lg border-2 border-foreground">
            <Image src={existing.imageUrl} alt="" fill className="object-cover" />
          </div>
        )}
        <Input id="image" name="image" type="file" accept="image/*" />
        <input type="hidden" name="existingImageUrl" value={existing?.imageUrl ?? ""} />
        <p className="text-xs text-muted-foreground">Under 4MB. Leave blank to keep the current image, or no image at all.</p>
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
