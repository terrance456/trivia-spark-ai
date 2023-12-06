import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authConfig = {
  providers: [GoogleProvider],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const redirectUrl = new URL("/signin", nextUrl.origin);
      redirectUrl.searchParams.append("callbackUrl", nextUrl.href);

      if (!isLoggedIn) {
        return Response.redirect(redirectUrl);
      }

      return true;
    },
  },
  pages: { signIn: "/signin" },
} satisfies NextAuthConfig;

export const { handlers, auth } = NextAuth(authConfig);
