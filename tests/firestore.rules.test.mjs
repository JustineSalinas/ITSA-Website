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
  deleteDoc,
  updateDoc,
  collection,
  addDoc,
} from "firebase/firestore";

let testEnv;

const validOfficer = {
  name: "Juan Dela Cruz",
  position: "President",
  sortOrder: 1,
  bio: "",
  photoUrl: "",
  socials: {},
  deletedAt: null,
};

const validEvent = {
  title: "Tech Summit 2026",
  slug: "tech-summit-2026",
  description: "Our flagship annual summit with speakers and alumni.",
  location: "USA Auditorium",
  imageUrl: "",
  deletedAt: null,
};

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
  // Seed an admin grant document and one existing record of each kind,
  // bypassing rules the way the Admin SDK does in production.
  await testEnv.withSecurityRulesDisabled(async (ctx) => {
    const db = ctx.firestore();
    await setDoc(doc(db, "admins/officer-uid"), { email: "officer@usa.edu.ph" });
    await setDoc(doc(db, "officers/existing"), validOfficer);
    await setDoc(doc(db, "events/existing"), validEvent);
  });
});

/** A verified officer: admin claim AND an /admins/{uid} document. */
const asAdmin = () =>
  testEnv.authenticatedContext("officer-uid", { admin: true }).firestore();

/** Signed in, but holds no officer grant — the old bypass. */
const asSignedIn = () => testEnv.authenticatedContext("random-uid").firestore();

/** Signed in and *claiming* admin, but with no /admins document. */
const asRevoked = () =>
  testEnv.authenticatedContext("revoked-uid", { admin: true }).firestore();

const asAnon = () => testEnv.unauthenticatedContext().firestore();

describe("public reads", () => {
  test("anyone may read officers and events", async () => {
    const db = asAnon();
    await assertSucceeds(getDoc(doc(db, "officers/existing")));
    await assertSucceeds(getDoc(doc(db, "events/existing")));
  });
});

describe("SEC-01: signed in is not enough to write", () => {
  for (const [label, ctx] of [
    ["an ordinary signed-in user", asSignedIn],
    ["an anonymous visitor", asAnon],
    ["a revoked officer (claim but no /admins doc)", asRevoked],
  ]) {
    test(`${label} cannot create an officer`, async () => {
      await assertFails(addDoc(collection(ctx(), "officers"), validOfficer));
    });

    test(`${label} cannot edit an existing officer`, async () => {
      await assertFails(
        updateDoc(doc(ctx(), "officers/existing"), { name: "Defaced" }),
      );
    });

    test(`${label} cannot edit an existing event`, async () => {
      await assertFails(
        updateDoc(doc(ctx(), "events/existing"), { title: "Defaced" }),
      );
    });
  }
});

describe("verified officers may manage content", () => {
  test("an admin can create and edit an officer", async () => {
    const db = asAdmin();
    await assertSucceeds(addDoc(collection(db, "officers"), validOfficer));
    await assertSucceeds(
      updateDoc(doc(db, "officers/existing"), { position: "Vice President" }),
    );
  });

  test("an admin can create and edit an event", async () => {
    const db = asAdmin();
    await assertSucceeds(addDoc(collection(db, "events"), validEvent));
    await assertSucceeds(
      updateDoc(doc(db, "events/existing"), { location: "IT Lab 2" }),
    );
  });

  test("an admin can soft-delete by stamping deletedAt", async () => {
    await assertSucceeds(
      updateDoc(doc(asAdmin(), "events/existing"), { deletedAt: new Date() }),
    );
  });
});

describe("SEC-09: hard deletes are impossible for everyone", () => {
  test("even a verified admin cannot delete an officer", async () => {
    await assertFails(deleteDoc(doc(asAdmin(), "officers/existing")));
  });

  test("even a verified admin cannot delete an event", async () => {
    await assertFails(deleteDoc(doc(asAdmin(), "events/existing")));
  });
});

describe("schema validation is enforced in the rules", () => {
  test("an officer without a name is rejected", async () => {
    const noName = { ...validOfficer };
    delete noName.name;
    await assertFails(addDoc(collection(asAdmin(), "officers"), noName));
  });

  test("an event with a malformed slug is rejected", async () => {
    await assertFails(
      addDoc(collection(asAdmin(), "events"), {
        ...validEvent,
        slug: "Not A Valid Slug!",
      }),
    );
  });
});

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

  test("only verified admins may read applications", async () => {
    await assertSucceeds(getDoc(doc(asAdmin(), "applications/anything")));
    await assertFails(getDoc(doc(asSignedIn(), "applications/anything")));
    await assertFails(getDoc(doc(asAnon(), "applications/anything")));
  });
});
