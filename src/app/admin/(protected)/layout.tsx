import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth/session";
import { isAdminConfigured } from "@/lib/firebase/admin";
import { FirebaseNotConfigured } from "@/components/admin/firebase-not-configured";
import { LOGIN_PATH } from "@/lib/auth/constants";

// Reads the session cookie, so this subtree is always rendered per-request.
export const dynamic = "force-dynamic";

/**
 * The real gate on the admin surface. Middleware only checks that a cookie is
 * present; this verifies it against Firebase and confirms the officer still
 * holds admin rights before any page below is rendered.
 */
export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!isAdminConfigured) {
    // In development, explain what is missing. In production, a missing service
    // account is a deployment fault, not something to publish setup hints
    // about — fail closed and send the visitor to the login screen.
    if (process.env.NODE_ENV === "production") redirect(LOGIN_PATH);
    return (
      <div className="mx-auto max-w-2xl px-4 py-20">
        <FirebaseNotConfigured />
      </div>
    );
  }

  const session = await getAdminSession();
  if (!session) redirect(LOGIN_PATH);

  return <>{children}</>;
}
