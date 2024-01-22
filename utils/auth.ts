import NextAuth from "next-auth";
import { credentialProvider } from "./credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/server/connection";

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  pages: {
    signIn: "/login",
  },
  providers: [credentialProvider],
  adapter: DrizzleAdapter(db),
});
