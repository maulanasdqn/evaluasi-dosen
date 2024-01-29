import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import * as z from "zod";
import { getApiUserByEmail } from "@/server/action";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const credentialProvider = CredentialsProvider({
  async authorize(credentials) {
    const validatedFields = LoginSchema.safeParse(credentials);

    if (validatedFields.success) {
      const { email, password } = validatedFields.data;

      const user = await getApiUserByEmail(email);

      if (!user || !user?.password) return null;

      const passwordsMatch = await bcrypt.compare(password, user.password);

      if (passwordsMatch) return user;
    }

    return null;
  },
});
