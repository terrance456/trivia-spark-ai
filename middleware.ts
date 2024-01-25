import NextAuth from "next-auth";
import { authConfig } from "@/src/auth/auth";

export default NextAuth(authConfig).auth;

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ["/((?!api/auth|api/public|api-doc|_next/static|_next/image|.png|favicon.ico).*)"],
};
