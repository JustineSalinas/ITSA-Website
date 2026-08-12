import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, LOGIN_PATH } from "@/lib/auth/constants";

/**
 * First gate on the admin surface: no session cookie, no admin HTML.
 *
 * This is an optimistic check, and deliberately nothing more — it cannot tell a
 * real cookie from a fabricated one, and the Next.js docs are explicit that
 * proxy is not a session-management or authorization layer. The authoritative
 * check runs in src/app/admin/(protected)/layout.tsx via getAdminSession(),
 * which verifies the cookie against Firebase. Keeping both means an
 * unauthenticated visitor never receives the admin markup at all.
 */
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === LOGIN_PATH) return NextResponse.next();

  if (!req.cookies.get(SESSION_COOKIE)?.value) {
    const url = req.nextUrl.clone();
    url.pathname = LOGIN_PATH;
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
