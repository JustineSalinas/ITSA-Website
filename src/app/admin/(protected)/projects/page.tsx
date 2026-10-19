import Link from "next/link";
import { listProjectDocs } from "@/lib/admin/content";
import { Button } from "@/components/ui/button";
import { AdminDeleteButton } from "@/components/admin/delete-button";
import { deleteProjectAction } from "@/app/admin/(protected)/projects/_actions";

export default async function AdminProjectsListPage() {
  const items = await listProjectDocs();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-extrabold tracking-tight">Projects</h1>
        <Button render={<Link href="/admin/projects/new" />}>New project</Button>
      </div>

      <div className="mt-6 divide-y-2 divide-foreground/10 rounded-xl border-2 border-foreground bg-card">
        {items.length === 0 && (
          <p className="p-5 text-sm text-muted-foreground">No projects yet.</p>
        )}
        {items.map((item) => (
          <div key={item.slug} className="flex items-center justify-between gap-4 p-4">
            <div className="min-w-0">
              <p className="truncate font-semibold">{item.title}</p>
              <p className="truncate text-xs text-muted-foreground">
                {item.author} · {item.tags.join(", ")}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Button variant="outline" size="sm" render={<Link href={`/admin/projects/${item.slug}/edit`} />}>
                Edit
              </Button>
              <AdminDeleteButton
                action={deleteProjectAction.bind(null, item.slug)}
                confirmLabel={`Delete "${item.title}"?`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
