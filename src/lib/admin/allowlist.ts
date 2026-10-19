/**
 * Officers allowed to sign in to /admin and edit site content.
 *
 * This is the actual authorization boundary, not Firebase Auth alone:
 * anyone could in principle have a Firebase account on this project, but
 * only an email on this list can create a session or touch a Server
 * Action under /admin. Add/remove officers here; nothing else to update.
 */
export const ADMIN_EMAIL_ALLOWLIST: string[] = [
  // "someone@usa.edu.ph",
];

export function isAllowedAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return ADMIN_EMAIL_ALLOWLIST.some(
    (allowed) => allowed.toLowerCase() === email.toLowerCase(),
  );
}
