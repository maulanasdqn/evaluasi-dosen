import { users } from "@/drizzle/schema";
import { db } from "@/server/connection";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function GET(_req: NextRequest, params: any) {
  const id = params.params.id;
  const data = await db
    .select()
    .from(users)
    .where(eq(users.email, id))
    .then((data) => data[0]);
  return new Response(JSON.stringify(data));
}
