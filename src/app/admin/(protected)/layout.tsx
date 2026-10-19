import type { ReactNode } from "react";
import Link from "next/link";
import { requireAdminSession } from "@/lib/admin/session";
import { LogoMark } from "@/components/layout/logo";
import { AdminSignOutButton } from "@/components/admin/sign-out-button";

/**
 * Every /admin/* page runs through this layout, and requireAdminSession()
 * redirects to /admin/login when there's no valid, allowlisted session --
 * this is the Next.js-recommended "auth check close to the data" pattern,
 * not a Proxy/middleware-only gate (Proxy can only do an optimistic cookie
 * check; it can't verify the cookie against Firebase, so it's not a
 * substitute for this check on every single admin request).
 */
export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await requireAdminSession();

  return (
    <div className="min-h-screen bg-secondary/20">
      <header className="border-b-2 border-foreground bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="flex items-center gap-2">
              <span className="size-7"><LogoMark /></span>
              <span className="font-heading text-sm font-extrabold tracking-tight">ITSA Admin</span>
            </Link>
            <nav className="hidden items-center gap-4 text-sm font-semibold sm:flex">
              <Link href="/admin/news" className="text-muted-foreground transition-colors hover:text-foreground">
                News
              </Link>
              <Link href="/admin/events" className="text-muted-foreground transition-colors hover:text-foreground">
                Events
              </Link>
              <Link href="/admin/projects" className="text-muted-foreground transition-colors hover:text-foreground">
                Projects
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-xs text-muted-foreground sm:inline">{session.email}</span>
            <AdminSignOutButton />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}
