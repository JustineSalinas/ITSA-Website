import "server-only";
import {
  cert,
  getApp,
  getApps,
  initializeApp,
  type App,
} from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";
import { getAuth, type Auth } from "firebase-admin/auth";
import { getStorage, type Storage } from "firebase-admin/storage";

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
// Support both escaped "\n" (single-line env) and real newlines.
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;

/** True when server-side Admin SDK credentials are present. */
export const isAdminConfigured = Boolean(projectId && clientEmail && privateKey);

let adminApp: App | undefined;

function getAdminApp(): App {
  if (!isAdminConfigured) {
    throw new Error(
      "Firebase Admin is not configured. Add FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY to .env.local.",
    );
  }
  if (getApps().length) {
    adminApp = getApp();
  } else {
    adminApp = initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey,
      }),
      storageBucket,
    });
  }
  return adminApp;
}

/**
 * Server-only Firestore access. Backs api/health's reachability check and,
 * since the /admin CMS, the News/Events/Projects content collections --
 * always through the Admin SDK (bypasses firestore.rules), never from the
 * client, so the rules can stay "deny everything" and still be accurate.
 */
export function getAdminDb(): Firestore {
  return getFirestore(getAdminApp());
}

/** Server-only Auth access: verifying ID tokens and session cookies for /admin. */
export function getAdminAuth(): Auth {
  return getAuth(getAdminApp());
}

/** Server-only Storage access: image uploads from the /admin content editor. */
export function getAdminStorage(): Storage {
  return getStorage(getAdminApp());
}
