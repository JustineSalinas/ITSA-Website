import "server-only";
import {
  cert,
  getApp,
  getApps,
  initializeApp,
  type App,
} from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
// Support both escaped "\n" (single-line env) and real newlines.
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

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
    });
  }
  return adminApp;
}

/**
 * Server-only Firestore access. The officer admin dashboard, its
 * session/auth, Storage uploads, and the Ask ITSA tally were all removed;
 * this now backs only api/health's Firestore reachability check.
 */
export function getAdminDb(): Firestore {
  return getFirestore(getAdminApp());
}
