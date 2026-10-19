"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AdminDeleteButton({
  action,
  confirmLabel,
}: {
  action: () => Promise<void>;
  confirmLabel: string;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <Button
      type="button"
      variant="destructive"
      size="icon-sm"
      disabled={pending}
      aria-label="Delete"
      onClick={() => {
        if (!window.confirm(confirmLabel)) return;
        startTransition(() => {
          action();
        });
      }}
    >
      <Trash2 className="size-3.5" />
    </Button>
  );
}
