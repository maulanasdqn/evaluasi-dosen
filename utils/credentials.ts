import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import * as z from "zod";
import axios, { AxiosRequestConfig } from "axios";
import { TUser } from "@/entities";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type TUserWithPassword = TUser & {
  password: string;
};

const config: AxiosRequestConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
};

const api = axios.create(config);

export const getApiUserByEmail = async (
  email: string,
): Promise<TUserWithPassword> => {
  const { data } = await api<TUserWithPassword>({
    url: `/users/${email}`,
    method: "GET",
  });
  return data;
};

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
