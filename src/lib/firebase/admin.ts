import "server-only";
import {
  cert,
  getApp,
  getApps,
  initializeApp,
  type App,
} from "firebase-admin/app";
import { getAuth, type Auth } from "firebase-admin/auth";
import { getFirestore, type Firestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
// Support both escaped "\n" (single-line env) and real newlines.
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
// The public bucket name doubles as the server one; the server-only variable
// exists so it can be overridden without touching the client bundle. `||`, not
// `??`: .env.example ships the override as an empty string.
const storageBucket =
  process.env.FIREBASE_STORAGE_BUCKET ||
  process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;

/** True when server-side Admin SDK credentials are present. */
export const isAdminConfigured = Boolean(projectId && clientEmail && privateKey);

/** True when the Admin SDK can also reach a Storage bucket. */
export const isStorageConfigured = isAdminConfigured && Boolean(storageBucket);

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
    });
  }
  return adminApp;
}

export function getAdminDb(): Firestore {
  return getFirestore(getAdminApp());
}

export function getAdminAuth(): Auth {
  return getAuth(getAdminApp());
}

/**
 * The default Storage bucket. The bucket name is passed explicitly rather than
 * via `initializeApp({ storageBucket })` because `getAdminApp()` reuses any app
 * that is already initialised.
 *
 * The Admin SDK bypasses storage.rules entirely, so callers must enforce admin,
 * type and size themselves -- see api/admin/upload.
 */
export function getAdminBucket() {
  if (!storageBucket) {
    throw new Error(
      "Firebase Storage is not configured. Add NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET (or FIREBASE_STORAGE_BUCKET) to .env.local.",
    );
  }
  return getStorage(getAdminApp()).bucket(storageBucket);
}
