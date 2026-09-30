// Security rules tests for firestore.rules.
//
//   npm run test:rules
//
// The app has no auth flow left -- the officer admin dashboard was removed --
// so every collection is server-only: reachable exclusively through the
// Admin SDK, which bypasses these rules entirely. These tests assert that no
// client, signed in or not, can read or write any of them.
import { test, before, after, beforeEach, describe } from "node:test";
import { readFileSync } from "node:fs";
import {
  initializeTestEnvironment,
  assertFails,
} from "@firebase/rules-unit-testing";
import { doc, getDoc, setDoc } from "firebase/firestore";

let testEnv;

before(async () => {
  testEnv = await initializeTestEnvironment({
    projectId: "itsa-rules-test",
    firestore: {
      rules: readFileSync("firestore.rules", "utf8"),
      host: "127.0.0.1",
      port: 8571,
    },
  });
});

after(async () => {
  await testEnv?.cleanup();
});

beforeEach(async () => {
  await testEnv.clearFirestore();
});

const asSignedIn = () => testEnv.authenticatedContext("random-uid").firestore();
const asAnon = () => testEnv.unauthenticatedContext().firestore();

describe("server-only collections are sealed", () => {
  test("nobody may read or write the mail queue", async () => {
    for (const ctx of [asSignedIn, asAnon]) {
      await assertFails(getDoc(doc(ctx(), "mail/anything")));
      await assertFails(setDoc(doc(ctx(), "mail/anything"), { to: "x@y.z" }));
    }
  });

  test("nobody may read or write rate limit counters", async () => {
    for (const ctx of [asSignedIn, asAnon]) {
      await assertFails(getDoc(doc(ctx(), "rate_limits/anything")));
      await assertFails(setDoc(doc(ctx(), "rate_limits/anything"), { count: 0 }));
    }
  });

  test("nobody may read or write the Ask ITSA tally", async () => {
    for (const ctx of [asSignedIn, asAnon]) {
      await assertFails(getDoc(doc(ctx(), "ask_log/who-can-join")));
      await assertFails(setDoc(doc(ctx(), "ask_log/who-can-join"), { count: 999 }));
    }
  });
});
