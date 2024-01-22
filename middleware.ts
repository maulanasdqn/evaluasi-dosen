import NextAuth from "next-auth";

import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  apiTrpcPrefix,
  authRoutes,
  publicRoutes,
} from "@/utils/route";
import { authOptions } from "./utils/auth.config";

const { auth } = NextAuth(authOptions);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isTrpcRoute = nextUrl.pathname.startsWith(apiTrpcPrefix);
  const isUserApiRoute = nextUrl.pathname.startsWith("/api/user");

  if (isApiAuthRoute) {
    return null;
  }

  if (isTrpcRoute) {
    return null;
  }

  if (isUserApiRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(
      new URL(`/login?callbackUrl=${encodedCallbackUrl}`, nextUrl),
    );
  }

  return null;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};