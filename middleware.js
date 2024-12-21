// app/middleware.js
import { NextResponse } from "next/server";

export function middleware(req) {
  // Allow all static resources (CSS, images, etc.)
  if (req.url.endsWith('.css') || req.url.endsWith('.js') || req.url.endsWith('.png') || req.url.endsWith('.jpg')) {
    return NextResponse.next();
  }

  // Allow Next.js internal routes (_next/*)
  if (req.nextUrl.pathname.startsWith("/_next")) {
    return NextResponse.next();
  }

  // Allow the /register and /login pages, as well as their APIs
  if (req.nextUrl.pathname.startsWith("/register") || req.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.next();
  }

  // Allow API routes related to /register and /login
  if (req.nextUrl.pathname.startsWith("/api/register") || req.nextUrl.pathname.startsWith("/api/login")) {
    return NextResponse.next();
  }

  // Check if the userId cookie exists
  const userId = req.cookies.get("userid");

  // If no userId cookie, redirect to the register page
  if (!userId) {
    return NextResponse.redirect(new URL("/register", req.url));
  }

  // If userId exists, allow the request to continue
  return NextResponse.next();
}

export const config = {
  // The matcher ensures middleware applies to all routes except '/register', '/login', and their APIs
  matcher: [
    "/((?!register|Signin|api/register|api/login).*)", // Excludes register, login, and their API routes
  ],
};
