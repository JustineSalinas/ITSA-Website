"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";
import {
  createOfficer,
  deleteOfficer,
  fetchOfficers,
  updateOfficer,
} from "@/lib/firebase/db-client";
import { officerSchema, type OfficerInput } from "@/lib/validations";
import { initials } from "@/lib/format";
import type { Officer } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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

export default function AdminOfficersPage() {
  return (
    <AdminShell>
      <OfficersManager />
    </AdminShell>
  );
}

function OfficersManager() {
  const [officers, setOfficers] = useState<Officer[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Officer | null>(null);
  const [deleting, setDeleting] = useState<Officer | null>(null);

  async function load() {
    setLoading(true);
    try {
      setOfficers(await fetchOfficers());
    } catch (err) {
      console.error(err);
      toast.error("Failed to load officers.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function confirmDelete() {
    if (!deleting) return;
    try {
      await deleteOfficer(deleting.id);
      toast.success("Officer removed.");
      setDeleting(null);
      load();
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove officer.");
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Officers</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage the officer profiles shown on the website.
          </p>
        </div>
        <Button
          onClick={() => {
            setEditing(null);
            setDialogOpen(true);
          }}
        >
          <Plus className="size-4" />
          Add officer
        </Button>
      </div>

      <div className="mt-6 rounded-xl border border-border bg-card">
        {loading ? (
          <div className="space-y-3 p-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        ) : officers.length === 0 ? (
          <p className="p-8 text-center text-sm text-muted-foreground">
            No officers yet. Click &ldquo;Add officer&rdquo; to create one.
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden sm:table-cell">Position</TableHead>
                <TableHead className="hidden md:table-cell w-[80px]">Order</TableHead>
                <TableHead className="w-[100px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {officers.map((officer) => (
                <TableRow key={officer.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="size-8">
                        {officer.photoUrl ? (
                          <AvatarImage src={officer.photoUrl} alt={officer.name} />
                        ) : null}
                        <AvatarFallback className="bg-primary/10 text-xs text-primary">
                          {initials(officer.name)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{officer.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-muted-foreground">
                    {officer.position}
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">
                    {officer.sortOrder}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setEditing(officer);
                          setDialogOpen(true);
                        }}
                        aria-label="Edit"
                      >
                        <Pencil className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleting(officer)}
                        aria-label="Delete"
                      >
                        <Trash2 className="size-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <OfficerDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        officer={editing}
        onSaved={load}
      />

      <Dialog open={!!deleting} onOpenChange={(o) => !o && setDeleting(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove officer?</DialogTitle>
            <DialogDescription>
              This will permanently remove &ldquo;{deleting?.name}&rdquo; from the
              website. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleting(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Remove
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function OfficerDialog({
  open,
  onOpenChange,
  officer,
  onSaved,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  officer: Officer | null;
  onSaved: () => void;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<OfficerInput>({ resolver: zodResolver(officerSchema) });

  useEffect(() => {
    if (open) {
      reset(
        officer
          ? {
              name: officer.name,
              position: officer.position,
              bio: officer.bio,
              photoUrl: officer.photoUrl,
              sortOrder: officer.sortOrder,
              facebook: officer.socials.facebook ?? "",
              instagram: officer.socials.instagram ?? "",
              linkedin: officer.socials.linkedin ?? "",
              github: officer.socials.github ?? "",
            }
          : {
              name: "",
              position: "",
              bio: "",
              photoUrl: "",
              sortOrder: 0,
              facebook: "",
              instagram: "",
              linkedin: "",
              github: "",
            },
      );
    }
  }, [open, officer, reset]);

  async function onSubmit(values: OfficerInput) {
    try {
      if (officer) {
        await updateOfficer(officer.id, values);
        toast.success("Officer updated.");
      } else {
        await createOfficer(values);
        toast.success("Officer added.");
      }
      onOpenChange(false);
      onSaved();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save officer.");
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{officer ? "Edit officer" : "Add officer"}</DialogTitle>
          <DialogDescription>
            Officer profiles are shown on the public Officers page.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...register("name")} />
              {errors.name && (
                <p className="text-xs text-destructive">{errors.name.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">Position</Label>
              <Input id="position" {...register("position")} />
              {errors.position && (
                <p className="text-xs text-destructive">{errors.position.message}</p>
              )}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="photoUrl">Photo URL (optional)</Label>
              <Input id="photoUrl" placeholder="https://..." {...register("photoUrl")} />
              {errors.photoUrl && (
                <p className="text-xs text-destructive">{errors.photoUrl.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="sortOrder">Display order</Label>
              <Input
                id="sortOrder"
                type="number"
                {...register("sortOrder", { valueAsNumber: true })}
              />
              {errors.sortOrder && (
                <p className="text-xs text-destructive">{errors.sortOrder.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio (optional)</Label>
            <Textarea id="bio" rows={3} {...register("bio")} />
            {errors.bio && (
              <p className="text-xs text-destructive">{errors.bio.message}</p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="facebook">Facebook (optional)</Label>
              <Input id="facebook" placeholder="https://..." {...register("facebook")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instagram">Instagram (optional)</Label>
              <Input id="instagram" placeholder="https://..." {...register("instagram")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn (optional)</Label>
              <Input id="linkedin" placeholder="https://..." {...register("linkedin")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="github">GitHub (optional)</Label>
              <Input id="github" placeholder="https://..." {...register("github")} />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="size-4 animate-spin" />}
              {officer ? "Save changes" : "Add officer"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
