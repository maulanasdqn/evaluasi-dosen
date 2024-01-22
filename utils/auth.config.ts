import { NextAuthConfig } from "next-auth";
import { credentialProvider } from "./credentials";
import { getUserById } from "@/server/action";

export const authOptions = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [credentialProvider],
} satisfies NextAuthConfig;
