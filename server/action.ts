"use server";
import { users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { db } from "./connection";

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
