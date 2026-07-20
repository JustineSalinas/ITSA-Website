"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { signOut } from "firebase/auth";
import {
  CalendarDays,
  LayoutDashboard,
  LogOut,
  Users,
  Loader2,
  ExternalLink,
} from "lucide-react";
import { getFirebaseAuth } from "@/lib/firebase/client";
import { useAuth } from "@/components/admin/auth-provider";
import { FirebaseNotConfigured } from "@/components/admin/firebase-not-configured";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const adminNav = [
  { href: "/admin", label: "Dashboard", Icon: LayoutDashboard },
  { href: "/admin/events", label: "Events", Icon: CalendarDays },
  { href: "/admin/officers", label: "Officers", Icon: Users },
];

/** Wraps admin dashboard pages: enforces auth and renders the nav shell. */
export function AdminShell({ children }: { children: React.ReactNode }) {
  const { user, loading, configured } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (configured && !loading && !user) {
      router.replace("/admin/login");
    }
  }, [configured, loading, user, router]);

  if (!configured) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20">
        <FirebaseNotConfigured />
      </div>
    );
  }

  if (loading || !user) {
    return (
      <div className="grid min-h-[60vh] place-items-center">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 lg:flex-row">
      <aside className="lg:w-60 lg:shrink-0">
        <div className="rounded-xl border border-border bg-card p-3">
          <div className="px-3 py-2">
            <p className="text-sm font-bold">ITSA Admin</p>
            <p className="truncate text-xs text-muted-foreground">{user.email}</p>
          </div>
          <nav className="mt-2 flex gap-1 lg:flex-col">
            {adminNav.map(({ href, label, Icon }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive(href)
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent",
                )}
              >
                <Icon className="size-4" />
                {label}
              </Link>
            ))}
          </nav>
          <div className="mt-2 border-t border-border pt-2">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent"
            >
              <ExternalLink className="size-4" />
              View site
            </Link>
            <button
              onClick={() => signOut(getFirebaseAuth())}
              className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent"
            >
              <LogOut className="size-4" />
              Sign out
            </button>
          </div>
        </div>
      </aside>

      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}
