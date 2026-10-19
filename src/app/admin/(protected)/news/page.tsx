import Link from "next/link";
import { listNews } from "@/lib/admin/content";
import { Button } from "@/components/ui/button";
import { AdminDeleteButton } from "@/components/admin/delete-button";
import { deleteNewsAction } from "@/app/admin/(protected)/news/_actions";

export default async function AdminNewsListPage() {
  const items = await listNews();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-extrabold tracking-tight">News</h1>
        <Button render={<Link href="/admin/news/new" />}>New post</Button>
      </div>

      <div className="mt-6 divide-y-2 divide-foreground/10 rounded-xl border-2 border-foreground bg-card">
        {items.length === 0 && (
          <p className="p-5 text-sm text-muted-foreground">No posts yet.</p>
        )}
        {items.map((item) => (
          <div key={item.slug} className="flex items-center justify-between gap-4 p-4">
            <div className="min-w-0">
              <p className="truncate font-semibold">{item.title}</p>
              <p className="text-xs text-muted-foreground">
                {item.date} · {item.category ?? "Uncategorized"}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Button variant="outline" size="sm" render={<Link href={`/admin/news/${item.slug}/edit`} />}>
                Edit
              </Button>
              <AdminDeleteButton
                action={deleteNewsAction.bind(null, item.slug)}
                confirmLabel={`Delete "${item.title}"?`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
