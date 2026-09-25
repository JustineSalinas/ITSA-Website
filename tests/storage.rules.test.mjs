// Security rules tests for storage.rules (M1).
//
//   npm run test:rules
//
// The upload route (api/admin/upload) writes through the Admin SDK, which
// bypasses these rules entirely. They are the second, independent gate: they
// decide what a *browser* holding a Firebase token may do to the bucket, and
// they must keep agreeing with the checks the route repeats in code.
import { test, before, after, beforeEach, describe } from "node:test";
import { readFileSync } from "node:fs";
import {
  initializeTestEnvironment,
  assertFails,
  assertSucceeds,
} from "@firebase/rules-unit-testing";
import { ref, uploadBytes, getBytes } from "firebase/storage";

let testEnv;

const MiB = 1024 * 1024;
const bytes = (n) => new Uint8Array(n);

const asAdmin = () =>
  testEnv.authenticatedContext("officer-uid", { admin: true }).storage();
const asSignedIn = () => testEnv.authenticatedContext("visitor-uid").storage();
const asNotAdmin = () =>
  testEnv.authenticatedContext("visitor-uid", { admin: false }).storage();
const asAnon = () => testEnv.unauthenticatedContext().storage();

const put = (storage, path, size = 1024, contentType = "image/png") =>
  uploadBytes(ref(storage, path), bytes(size), { contentType });

before(async () => {
  testEnv = await initializeTestEnvironment({
    projectId: "itsa-rules-test",
    storage: {
      rules: readFileSync("storage.rules", "utf8"),
      host: "127.0.0.1",
      port: 8572,
    },
  });
});

after(async () => {
  await testEnv?.cleanup();
});

beforeEach(async () => {
  await testEnv.clearStorage();
  // Seed one public object and one private one, bypassing rules the way the
  // Admin SDK does in production.
  await testEnv.withSecurityRulesDisabled(async (ctx) => {
    await put(ctx.storage(), "media/officers/existing.png");
    await put(ctx.storage(), "private/secret.png");
  });
});

describe("read access", () => {
  test("anyone can read media/", async () => {
    await assertSucceeds(getBytes(ref(asAnon(), "media/officers/existing.png")));
  });

  test("nothing outside media/ is readable, even by an admin", async () => {
    await assertFails(getBytes(ref(asAnon(), "private/secret.png")));
    await assertFails(getBytes(ref(asAdmin(), "private/secret.png")));
  });
});

describe("who may write to media/", () => {
  test("unauthenticated visitors cannot upload", async () => {
    await assertFails(put(asAnon(), "media/events/x.png"));
  });

  test("a merely signed-in user cannot upload", async () => {
    await assertFails(put(asSignedIn(), "media/events/x.png"));
  });

  test("an explicit admin:false claim cannot upload", async () => {
    await assertFails(put(asNotAdmin(), "media/events/x.png"));
  });

  test("an admin can upload", async () => {
    await assertSucceeds(put(asAdmin(), "media/events/x.png"));
  });

  test("an admin cannot overwrite outside media/", async () => {
    await assertFails(put(asAdmin(), "private/x.png"));
    await assertFails(put(asAdmin(), "x.png"));
  });

  // Documents a known gap rather than a desired behaviour: Storage rules cannot
  // read Firestore, so unlike firestore.rules there is no /admins/{uid} check.
  // A token whose claim has not yet been refreshed after revocation still
  // passes. This is why the upload route is meant to be the only writer.
  test("the claim alone is the gate (no /admins/{uid} check is possible)", async () => {
    const claimOnly = testEnv.authenticatedContext("revoked-uid", { admin: true });
    await assertSucceeds(put(claimOnly.storage(), "media/misc/x.png"));
  });
});

describe("what may be uploaded", () => {
  for (const type of ["png", "jpeg", "webp", "gif", "avif"]) {
    test(`allows image/${type}`, async () => {
      await assertSucceeds(put(asAdmin(), `media/misc/x.${type}`, 1024, `image/${type}`));
    });
  }

  for (const type of ["image/svg+xml", "text/html", "application/pdf", "video/mp4"]) {
    test(`rejects ${type}`, async () => {
      await assertFails(put(asAdmin(), "media/misc/x.bin", 1024, type));
    });
  }

  test("accepts a file just under 5 MiB", async () => {
    await assertSucceeds(put(asAdmin(), "media/misc/big.png", 5 * MiB - 1));
  });

  test("rejects a file of exactly 5 MiB (the cap is strict)", async () => {
    await assertFails(put(asAdmin(), "media/misc/big.png", 5 * MiB));
  });

  test("rejects a file over 5 MiB", async () => {
    await assertFails(put(asAdmin(), "media/misc/huge.png", 6 * MiB));
  });
});
