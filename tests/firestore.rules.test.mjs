// Security rules tests for firestore.rules.
//
//   npm run test:rules
//
// The app has no client read/write path left at all -- the officer admin
// dashboard, the contact form, and the Ask ITSA tally were all removed, and
// content now lives in Sanity. This asserts no client, signed in or not, can
// read or write anything; the Admin SDK (api/health) bypasses these rules.
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

describe("no client read/write path exists", () => {
  test("nobody may read or write any collection", async () => {
    for (const ctx of [asSignedIn, asAnon]) {
      await assertFails(getDoc(doc(ctx(), "officers/anything")));
      await assertFails(setDoc(doc(ctx(), "officers/anything"), { name: "x" }));
      await assertFails(getDoc(doc(ctx(), "anything/anything")));
      await assertFails(setDoc(doc(ctx(), "anything/anything"), { a: 1 }));
    }
  });
});
