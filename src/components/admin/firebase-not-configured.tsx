import { AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function FirebaseNotConfigured() {
  return (
    <Card className="border-amber-500/40">
      <CardContent className="pt-6">
        <div className="flex items-start gap-3">
          <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-amber-500/15 text-amber-600 dark:text-amber-400">
            <AlertTriangle className="size-5" />
          </div>
          <div className="space-y-2 text-sm">
            <h2 className="text-base font-bold">Firebase isn&apos;t configured yet</h2>
            <p className="text-muted-foreground">
              The admin dashboard needs Firebase to sign in and manage content.
              Add your Firebase Web app credentials to{" "}
              <code className="rounded bg-muted px-1 py-0.5 text-xs">.env.local</code>{" "}
              (see{" "}
              <code className="rounded bg-muted px-1 py-0.5 text-xs">.env.example</code>
              ), then restart the dev server.
            </p>
            <p className="text-muted-foreground">
              Until then, the public site runs on placeholder content.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
