// Shared between proxy.ts, the server session helpers, and the login client.
// Deliberately free of `server-only` and of any Node-only import so that
// proxy.ts can use it on any runtime.

export const SESSION_COOKIE = "itsa_session";

/** Officer sessions last one school day, then require a fresh sign-in. */
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8;

export const LOGIN_PATH = "/admin/login";
