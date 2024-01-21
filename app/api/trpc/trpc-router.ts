import { lectures, questions } from "@/drizzle/schema";
import { db } from "@/server/connection";
import { initTRPC } from "@trpc/server";
import superjson from "superjson";

const t = initTRPC.create({
  transformer: superjson,
});

export const appRouter = t.router({
  getQuestions: t.procedure.query(async () => {
    const questionData = await db.select().from(questions);
    return questionData;
  }),

  getLecturer: t.procedure.query(async () => {
    const lectureData = await db.select().from(lectures);
    return lectureData;
  }),
});

export type AppRouter = typeof appRouter;
