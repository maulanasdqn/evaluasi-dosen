import NextAuth, { NextAuthConfig } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/server/connection";
import { authOptions } from "./auth.config";
import { getUserById } from "@/server/action";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authOptions,

  callbacks: {
    //@ts-ignore
    async session({ token, session }) {
      session.user = token;
      return session;
    },

    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      console.log("Exisiting User", existingUser);

      token.fullname = existingUser.fullname;
      token.email = existingUser.email;
      token.permissions = existingUser?.permissions;

      console.log("Token", token);
      return token;
    },
  },

  adapter: DrizzleAdapter(db),
} satisfies NextAuthConfig);
