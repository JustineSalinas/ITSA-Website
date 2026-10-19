import { notFound } from "next/navigation";
import { getNewsDoc } from "@/lib/admin/content";
import { NewsForm } from "@/components/admin/news-form";

export default async function EditNewsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const existing = await getNewsDoc(slug);
  if (!existing) notFound();

  return (
    <div>
      <h1 className="font-heading text-2xl font-extrabold tracking-tight">Edit post</h1>
      <div className="mt-6">
        <NewsForm existing={existing} />
      </div>
    </div>
  );
}
