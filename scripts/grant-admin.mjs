// Grants or revokes ITSA officer (admin) access.
//
//   node scripts/grant-admin.mjs grant  officer@usa.edu.ph  "Juan Dela Cruz"
//   node scripts/grant-admin.mjs revoke officer@usa.edu.ph
//   node scripts/grant-admin.mjs list
//
// Admin rights are enforced by TWO gates, both required by firestore.rules:
//   1. the `admin: true` custom claim on the ID token, and
//   2. an /admins/{uid} document.
// Revoking clears both, so access ends as soon as the next request is made
// rather than whenever the token happens to expire.
import { auth, db } from "./firebase-admin-init.mjs";
import { Timestamp } from "firebase-admin/firestore";

const [, , command, email, displayName] = process.argv;

async function requireUser(addr) {
  if (!addr) {
    console.error("Provide the officer's email address.");
    process.exit(1);
  }
  try {
    return await auth.getUserByEmail(addr);
  } catch {
    console.error(
      `No Firebase Auth user with email ${addr}.\n` +
        "Create the account in the Firebase console first (Authentication → Users → Add user).",
    );
    process.exit(1);
  }
}

async function grant() {
  const user = await requireUser(email);
  await auth.setCustomUserClaims(user.uid, { admin: true });
  await db.collection("admins").doc(user.uid).set(
    {
      email: user.email,
      name: displayName ?? user.displayName ?? "",
      grantedAt: Timestamp.now(),
    },
    { merge: true },
  );
  // Existing sessions keep a stale token until it expires; this ends them now.
  await auth.revokeRefreshTokens(user.uid);
  console.log(`Granted admin to ${user.email} (${user.uid}). They must sign in again.`);
}

async function revoke() {
  const user = await requireUser(email);
  await auth.setCustomUserClaims(user.uid, { admin: false });
  await db.collection("admins").doc(user.uid).delete();
  await auth.revokeRefreshTokens(user.uid);
  console.log(`Revoked admin from ${user.email} (${user.uid}). Active sessions ended.`);
}

async function list() {
  const snap = await db.collection("admins").get();
  if (snap.empty) {
    console.log("No admins yet. Run: node scripts/grant-admin.mjs grant <email>");
    return;
  }
  console.log(`${snap.size} admin(s):`);
  for (const doc of snap.docs) {
    const d = doc.data();
    console.log(`  ${d.email ?? "(unknown email)"}  ${d.name ?? ""}  [${doc.id}]`);
  }
}

const commands = { grant, revoke, list };

if (!commands[command]) {
  console.error("Usage: node scripts/grant-admin.mjs <grant|revoke|list> [email] [name]");
  process.exit(1);
}

commands[command]().catch((err) => {
  console.error(err);
  process.exit(1);
});
