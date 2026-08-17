"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CalendarDays, Users, ArrowRight } from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";
import { fetchEvents, fetchOfficers } from "@/lib/firebase/db-client";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function StatCard({
  label,
  value,
  href,
  Icon,
  loading,
}: {
  label: string;
  value: number;
  href: string;
  Icon: typeof Users;
  loading: boolean;
}) {
  return (
    <Link href={href}>
      <Card className="transition-shadow hover:shadow-md">
        <CardContent className="flex items-center gap-4 pt-6">
          <div className="grid size-12 place-items-center rounded-lg bg-primary/10 text-primary">
            <Icon className="size-6" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">{label}</p>
            {loading ? (
              <Skeleton className="mt-1 h-7 w-10" />
            ) : (
              <p className="text-2xl font-bold">{value}</p>
            )}
          </div>
          <ArrowRight className="size-4 text-muted-foreground" />
        </CardContent>
      </Card>
    </Link>
  );
}

export default function AdminDashboardPage() {
  return (
    <AdminShell>
      <DashboardContent />
    </AdminShell>
  );
}

function DashboardContent() {
  const [counts, setCounts] = useState({ events: 0, officers: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [events, officers] = await Promise.all([
          fetchEvents(),
          fetchOfficers(),
        ]);
        setCounts({ events: events.length, officers: officers.length });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Manage the content that appears on the ITSA website.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <StatCard
          label="Events"
          value={counts.events}
          href="/admin/events"
          Icon={CalendarDays}
          loading={loading}
        />
        <StatCard
          label="Officers"
          value={counts.officers}
          href="/admin/officers"
          Icon={Users}
          loading={loading}
        />
      </div>
    </div>
  );
}
