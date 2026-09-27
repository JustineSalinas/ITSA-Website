"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader2, Mail } from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";
import { fetchApplications, updateApplicationStatus } from "@/lib/firebase/db-client";
import type { Application, ApplicationStatus } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const STATUS_LABEL: Record<ApplicationStatus, string> = {
  new: "New",
  contacted: "Contacted",
  accepted: "Accepted",
};

const STATUS_VARIANT: Record<ApplicationStatus, "default" | "secondary" | "outline"> = {
  new: "default",
  contacted: "secondary",
  accepted: "outline",
};

const INTEREST_LABEL: Record<string, string> = {
  membership: "Become a member",
  volunteer: "Volunteer / join a committee",
  partnership: "Partnership / sponsorship",
  general: "General inquiry",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-PH", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function AdminApplicationsPage() {
  return (
    <AdminShell>
      <ApplicationsManager />
    </AdminShell>
  );
}

function ApplicationsManager() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewing, setViewing] = useState<Application | null>(null);
  // Tracks the one row currently saving, so its own buttons show a spinner
  // without disabling the whole table.
  const [savingId, setSavingId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    try {
      setApplications(await fetchApplications());
    } catch (err) {
      console.error(err);
      toast.error("Failed to load applications.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function setStatus(app: Application, status: ApplicationStatus) {
    setSavingId(app.id);
    try {
      await updateApplicationStatus(app.id, status);
      setApplications((prev) => prev.map((a) => (a.id === app.id ? { ...a, status } : a)));
      toast.success(`Marked as ${STATUS_LABEL[status].toLowerCase()}.`);
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Failed to update status.");
    } finally {
      setSavingId(null);
    }
  }

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Membership enquiries</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Everyone who has filled in the Join form. Mark each one as you follow up.
        </p>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-border bg-card">
        {loading ? (
          <div className="space-y-3 p-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        ) : applications.length === 0 ? (
          <p className="p-8 text-center text-sm text-muted-foreground">
            No enquiries yet.
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden sm:table-cell">Interest</TableHead>
                <TableHead className="hidden md:table-cell">Received</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[220px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell className="font-medium">
                    <button
                      type="button"
                      onClick={() => setViewing(app)}
                      className="text-left outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {app.name}
                    </button>
                  </TableCell>
                  <TableCell className="hidden text-muted-foreground sm:table-cell">
                    {INTEREST_LABEL[app.interest] ?? app.interest}
                  </TableCell>
                  <TableCell className="hidden text-muted-foreground md:table-cell">
                    {formatDate(app.createdAt)}
                  </TableCell>
                  <TableCell>
                    <Badge variant={STATUS_VARIANT[app.status]}>{STATUS_LABEL[app.status]}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      {savingId === app.id ? (
                        <Loader2 className="size-4 animate-spin text-muted-foreground" />
                      ) : (
                        (["new", "contacted", "accepted"] as const)
                          .filter((s) => s !== app.status)
                          .map((s) => (
                            <Button
                              key={s}
                              variant="ghost"
                              size="sm"
                              onClick={() => setStatus(app, s)}
                              className="text-xs"
                            >
                              Mark {STATUS_LABEL[s].toLowerCase()}
                            </Button>
                          ))
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <Dialog open={!!viewing} onOpenChange={(o) => !o && setViewing(null)}>
        <DialogContent className="sm:max-w-lg">
          {viewing && (
            <>
              <DialogHeader>
                <DialogTitle>{viewing.name}</DialogTitle>
                <DialogDescription className="flex items-center gap-1.5">
                  <Mail className="size-3.5" />
                  {viewing.email}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-3 text-sm">
                <p>
                  <span className="font-semibold">Interest:</span>{" "}
                  {INTEREST_LABEL[viewing.interest] ?? viewing.interest}
                </p>
                {viewing.studentId && (
                  <p>
                    <span className="font-semibold">Student ID:</span> {viewing.studentId}
                  </p>
                )}
                {viewing.yearLevel && (
                  <p>
                    <span className="font-semibold">Year & program:</span> {viewing.yearLevel}
                  </p>
                )}
                <p className="whitespace-pre-wrap rounded-lg bg-muted/50 p-3">{viewing.message}</p>
                <p className="text-xs text-muted-foreground">
                  Received {formatDate(viewing.createdAt)}
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
