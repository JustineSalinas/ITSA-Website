import { notFound } from "next/navigation";
import { getProjectDoc } from "@/lib/admin/content";
import { ProjectForm } from "@/components/admin/project-form";

export default async function EditProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const existing = await getProjectDoc(slug);
  if (!existing) notFound();

  return (
    <div>
      <h1 className="font-heading text-2xl font-extrabold tracking-tight">Edit project</h1>
      <div className="mt-6">
        <ProjectForm existing={existing} />
      </div>
    </div>
  );
}
