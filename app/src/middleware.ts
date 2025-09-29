// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get("user-agent") || "";
  const isMobile = /mobile/i.test(userAgent);
  const categoryFromUrl = request.nextUrl.searchParams.get("category");
  const audioFromUrl = request.nextUrl.searchParams.get("audio");
  const localeFromUrl = request.nextUrl.searchParams.get('locale')

  const protocol = request.nextUrl.protocol;
  const host = request.nextUrl.host;
  const desktopLink =
    protocol +
    "//" +
    host +
    (localeFromUrl === "ru" ? "" : "/en") +
    `/lectures-and-kirtans?category=${categoryFromUrl}&audio=${audioFromUrl}`;

  const mobileLink =
    protocol +
    "//" +
    host +
    (localeFromUrl === "ru" ? "" : "/en") +
    `/playlist/${categoryFromUrl}?audio=${audioFromUrl}`;

  if (isMobile) {          
    return NextResponse.redirect(new URL(mobileLink, request.url));
  } else {
    return NextResponse.redirect(new URL(desktopLink, request.url));
  }

}

export const config = {
  matcher: ["/playlist/router"], // Matches /playlist/123, /playlist/abc, etc.
};
