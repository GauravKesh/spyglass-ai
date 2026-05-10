import { NextRequest, NextResponse } from "next/server";

export function middleware(
  request: NextRequest
) {
  const token =
    request.cookies.get("token")?.value;

  const isAuthPage =
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/register";

  const isProtectedRoute =
    request.nextUrl.pathname.startsWith(
      "/dashboard"
    ) ||
    request.nextUrl.pathname.startsWith(
      "/analyze"
    ) ||
    request.nextUrl.pathname.startsWith(
      "/companies"
    );

  if (token && isAuthPage) {
    return NextResponse.redirect(
      new URL("/dashboard", request.url)
    );
  }

  if (isProtectedRoute) {
    if (!token) {
      return NextResponse.redirect(
        new URL("/login", request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/analyze/:path*",
    "/companies/:path*",
    "/login",
    "/register",
  ],
};