import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * With skipTrailingSlashRedirect enabled (so legacy SEO redirects can 301
 * in a single hop), restore default behavior: strip trailing slashes on
 * normal app routes. Paths that already have an explicit next.config
 * redirect are matched there first and never reach this proxy.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/" || !pathname.endsWith("/")) {
    return NextResponse.next();
  }

  // Skip file-like paths (e.g. /file.css)
  if (pathname.match(/[^/]+\.[a-zA-Z0-9]+$/)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = pathname.replace(/\/+$/, "") || "/";
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: [
    /*
     * Match paths that end with a trailing slash, excluding Next internals
     * and common static assets.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)/",
  ],
};
