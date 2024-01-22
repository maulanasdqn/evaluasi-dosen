import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import * as z from "zod";
import axios from "axios";
import { TUser } from "@/entities";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const credentialProvider = CredentialsProvider({
  async authorize(credentials) {
    const validatedFields = LoginSchema.safeParse(credentials);

    if (validatedFields.success) {
      const { email, password } = validatedFields.data;

      const { data: user } = await axios.get<TUser & { password: string }>(
        process.env.NEXT_PUBLIC_API_URL + "/user/" + email,
      );

      console.log("User", user);

      if (!user || !user?.password) return null;

      const passwordsMatch = await bcrypt.compare(password, user.password);

      if (passwordsMatch) return user;
    }

    return null;
  },
});
