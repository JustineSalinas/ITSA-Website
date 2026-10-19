import Link from "next/link";
import { Newspaper, CalendarDays, FolderGit2 } from "lucide-react";

const sections = [
  { href: "/admin/news", label: "News", description: "Announcements, event recaps, achievements, partnerships.", Icon: Newspaper },
  { href: "/admin/events", label: "Events", description: "Workshops, CTFs, and other ITSA events.", Icon: CalendarDays },
  { href: "/admin/projects", label: "Projects", description: "Student projects shown on the Projects page.", Icon: FolderGit2 },
];

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="font-heading text-2xl font-extrabold tracking-tight">Dashboard</h1>
      <p className="mt-1 text-sm text-muted-foreground">What do you want to edit?</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {sections.map(({ href, label, description, Icon }) => (
          <Link
            key={href}
            href={href}
            className="rounded-xl border-2 border-foreground bg-card p-5 shadow-[3px_3px_0_0_var(--foreground)] transition-all hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_var(--foreground)]"
          >
            <Icon className="size-6 text-primary" />
            <h2 className="mt-3 font-heading text-lg font-bold">{label}</h2>
            <p className="mt-1 text-xs text-muted-foreground">{description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
