"use server";
import { signIn } from "@/utils/auth";
import { AuthError } from "next-auth";

export const AuthLogin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Email atau kata sandi tidak valid" };
        default:
          return { error: "Terjadi kesalahan" };
      }
    }

    throw error;
  }
};
