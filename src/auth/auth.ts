import { connectDB, getUserDB, handleNewUsers } from "@/app/server/mongodb/connection";
import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authConfig = {
  providers: [GoogleProvider],
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt", maxAge: 4 * 60 * 60 },

  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const redirectUrl = new URL("/signin", nextUrl.origin);
      redirectUrl.searchParams.append("callbackUrl", nextUrl.href);

      if (!isLoggedIn && nextUrl.pathname.startsWith("/signin")) {
        return true;
      }

      if (!isLoggedIn) {
        return Response.redirect(redirectUrl);
      }

      if (isLoggedIn && nextUrl.pathname.startsWith("/signin")) {
        const redirectUrl = new URL("/", nextUrl.origin);
        return Response.redirect(redirectUrl);
      }

      return true;
    },
    async session({ session }) {
      try {
        await connectDB();
        const user = await getUserDB(session.user.email as string);
        session.user.credits = user?.credits as number;
      } catch {}
      return session;
    },
    async signIn(params) {
      try {
        await connectDB();
        await handleNewUsers(params.user);
        return true;
      } catch {
        return false;
      }
    },
  },
  pages: { signIn: "/signin" },
} satisfies NextAuthConfig;

export const { handlers, auth } = NextAuth(authConfig);
