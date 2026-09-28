// Security rules tests for firestore.rules.
//
//   npm run test:rules
//
// These assert the property the whole admin model depends on: being signed in
// is NOT enough to write anything. Before the security pass, every one of the
// "ordinary signed-in user" cases below succeeded.
import { test, before, after, beforeEach, describe } from "node:test";
import { readFileSync } from "node:fs";
import {
  initializeTestEnvironment,
  assertFails,
  assertSucceeds,
} from "@firebase/rules-unit-testing";
import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

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
  await testEnv.withSecurityRulesDisabled(async (ctx) => {
    const db = ctx.firestore();
    await setDoc(doc(db, "admins/officer-uid"), { email: "officer@usa.edu.ph" });
  });
});

const asAdmin = () =>
  testEnv.authenticatedContext("officer-uid", { admin: true }).firestore();
const asSignedIn = () => testEnv.authenticatedContext("random-uid").firestore();
const asAnon = () => testEnv.unauthenticatedContext().firestore();

describe("server-only collections are sealed", () => {
  test("nobody may read or write the mail queue", async () => {
    for (const ctx of [asAdmin, asSignedIn, asAnon]) {
      await assertFails(getDoc(doc(ctx(), "mail/anything")));
      await assertFails(setDoc(doc(ctx(), "mail/anything"), { to: "x@y.z" }));
    }
  });

  test("nobody may read or write rate limit counters", async () => {
    for (const ctx of [asAdmin, asSignedIn, asAnon]) {
      await assertFails(getDoc(doc(ctx(), "rate_limits/anything")));
      await assertFails(setDoc(doc(ctx(), "rate_limits/anything"), { count: 0 }));
    }
  });

  test("admin grants cannot be self-issued", async () => {
    await assertFails(setDoc(doc(asSignedIn(), "admins/random-uid"), { email: "me" }));
    await assertFails(setDoc(doc(asAdmin(), "admins/officer-uid"), { email: "me" }));
  });

  test("nobody may write the Ask ITSA tally, and only admins may read it", async () => {
    for (const ctx of [asAdmin, asSignedIn, asAnon]) {
      await assertFails(setDoc(doc(ctx(), "ask_log/who-can-join"), { count: 999 }));
    }
    await assertSucceeds(getDoc(doc(asAdmin(), "ask_log/who-can-join")));
    await assertFails(getDoc(doc(asSignedIn(), "ask_log/who-can-join")));
    await assertFails(getDoc(doc(asAnon(), "ask_log/who-can-join")));
  });

  test("only verified admins may read applications", async () => {
    await assertSucceeds(getDoc(doc(asAdmin(), "applications/anything")));
    await assertFails(getDoc(doc(asSignedIn(), "applications/anything")));
    await assertFails(getDoc(doc(asAnon(), "applications/anything")));
  });
});
