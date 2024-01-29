"use server";
import { users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { db } from "./connection";
import axios, { AxiosRequestConfig } from "axios";
import { TUser } from "@/entities";

type TUserWithPassword = TUser & {
  password: string;
};

const config: AxiosRequestConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
};

const api = axios.create(config);

export const getUserByEmail = async (email: string) =>
  await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .then((data) => data[0]);

export const getUserById = async (id: string) =>
  await db
    .select()
    .from(users)
    .where(eq(users.id, id))
    .then((data) => data[0]);

export const getApiUserByEmail = async (
  email: string,
): Promise<TUserWithPassword> => {
  const { data } = await api<TUserWithPassword>({
    url: `/users/${email}`,
    method: "GET",
  });
  return data;
};
