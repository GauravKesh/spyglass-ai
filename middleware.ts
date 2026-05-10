import { NextRequest, NextResponse } from "next/server";

import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

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

    try {
      jwt.verify(token, JWT_SECRET);
    } catch {
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
    "/login",
    "/register",
  ],
};