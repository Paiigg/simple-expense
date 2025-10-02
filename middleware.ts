import { NextRequest, NextResponse } from "next/server";
import authConfig from "./auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

export default auth(async function middleware(req) {
  const session = req.auth;
  const { pathname } = req.nextUrl;

  // If user is logged in and tries to access /login, redirect to /dashboard
  if (session && pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // If user is not logged in and tries to access /dashboard, redirect to /login
  if (!session && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/login", "/dashboard", "/dashboard/income", "/dashboard/expense"],
};
