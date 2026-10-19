import { NewsForm } from "@/components/admin/news-form";

export default function NewNewsPage() {
  return (
    <div>
      <h1 className="font-heading text-2xl font-extrabold tracking-tight">New post</h1>
      <div className="mt-6">
        <NewsForm />
      </div>
    </div>
  );
}
