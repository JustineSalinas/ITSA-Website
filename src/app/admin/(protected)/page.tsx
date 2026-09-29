"use client";

import Link from "next/link";
import { Mail, ArrowRight } from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";
import { Card, CardContent } from "@/components/ui/card";

export default function AdminDashboardPage() {
  return (
    <AdminShell>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage the content that appears on the ITSA website.
        </p>
        <div className="mt-6">
          <Link href="/admin/applications">
            <Card className="transition-shadow hover:shadow-md">
              <CardContent className="flex items-center gap-4 pt-6">
                <div className="grid size-12 place-items-center rounded-lg bg-primary/10 text-primary">
                  <Mail className="size-6" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Membership Enquiries</p>
                  <p className="mt-1 text-sm font-medium">
                    View and manage all membership applications
                  </p>
                </div>
                <ArrowRight className="size-4 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </AdminShell>
  );
}
