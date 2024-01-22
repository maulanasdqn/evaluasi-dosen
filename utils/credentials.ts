import CredentialsProvider from "next-auth/providers/credentials";
import { users } from "@/drizzle/schema";
import { db } from "@/server/connection";
import { eq } from "drizzle-orm";
import * as bs from "bcryptjs";

export const credentialProvider = CredentialsProvider({
  id: "login",
  name: "credentials",
  credentials: {
    email: { label: "Email", type: "text" },
    password: { label: "Password", type: "password" },
  },

  async authorize(credentials) {
    if (!credentials?.email || !credentials.password) {
      throw new Error("Email dan Password wajib diisi");
    }

    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, credentials.email as string))
      .then((res) => res.at(0));

    const isPasswordCorrect = await bs.compare(
      credentials.password as string,
      user?.password as string,
    );

    if (!user || !isPasswordCorrect) {
      throw new Error("Email atau Password salah");
    }

    return {
      id: user?.id,
      email: user?.email,
      fullname: user?.fullname,
      image: user?.image,
      permissions: user?.permissions,
    };
  },
});
