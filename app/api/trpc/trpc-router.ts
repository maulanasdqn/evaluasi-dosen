import { lectures, questions, users } from "@/drizzle/schema";
import { db } from "@/server/connection";
import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { VSMetaRequest } from "@/entities";
import { calculateTotalPages, metaResponsePrefix } from "@/utils";
import { asc, ilike, or, and } from "drizzle-orm";
import { eq } from "drizzle-orm";
import { z } from "zod";

const t = initTRPC.create({
  transformer: superjson,
});

export const createQuestionSchema = z.object({
  question: z.string(),
  dimension: z.string(),
  indicator: z.string(),
  id: z.string().optional(),
});

export const appRouter = t.router({
  getUserByEmail: t.procedure.input(z.string()).query(async ({ input }) => {
    const data = await db
      .select()
      .from(users)
      .where(eq(users.email, input))
      .then((res) => res[0]);
    console.log("Data from middleware", data);
    return data;
  }),

  createQuestion: t.procedure
    .input(createQuestionSchema)
    .mutation(async ({ input }) => {
      const data = await db
        .insert(questions)
        .values({
          question: input.question,
          dimension: input.dimension,
          indicator: input.indicator,
        })
        .returning();
      return data;
    }),

  updateQuestion: t.procedure
    .input(createQuestionSchema)
    .mutation(async ({ input }) => {
      const data = await db
        .update(questions)
        .set({
          question: input.question,
          dimension: input.dimension,
          indicator: input.indicator,
        })
        .where(eq(questions.id, input.id as string))
        .returning();
      return data;
    }),

  deleteQuestion: t.procedure.input(z.string()).mutation(async ({ input }) => {
    const data = await db
      .delete(questions)
      .where(eq(questions.id, input))
      .returning();
    return data;
  }),

  getLecturers: t.procedure.input(VSMetaRequest).query(async ({ input }) => {
    try {
      const page = input?.page || 1;
      const perPage = input?.perPage || 8;
      const offset = (page - 1) * perPage;

      const data = await db
        .select()
        .from(lectures)
        .where(and(or(ilike(lectures.fullname, `%${input?.search || ""}%`))))
        .limit(perPage)
        .offset(input?.search ? 0 : offset)
        .orderBy(lectures.createdAt, asc(lectures.createdAt));

      const count = await db
        .select({ id: lectures.id })
        .from(lectures)
        .then((res) => res.length);

      const totalPage = calculateTotalPages(count, perPage);
      const nextPage = page < totalPage ? page + 1 : null;
      const prevPage = page > 1 ? page - 1 : null;

      const metaPrefix = {
        data,
        meta: {
          code: 200,
          status: "success",
          message: "Berhasil menampilkan order",
          page,
          perPage,
          totalPage,
          nextPage,
          prevPage,
        },
      };
      return metaResponsePrefix(metaPrefix);
    } catch (err) {
      throw new Error(err as string);
    }
  }),

  getQuestions: t.procedure.input(VSMetaRequest).query(async ({ input }) => {
    try {
      const page = input?.page || 1;
      const perPage = input?.perPage || 10;
      const offset = (page - 1) * perPage;

      const data = await db
        .select()
        .from(questions)
        .where(
          and(
            or(
              ilike(questions.question, `%${input?.search || ""}%`),
              ilike(questions.dimension, `%${input?.search || ""}%`),
              ilike(questions.indicator, `%${input?.search || ""}%`),
            ),
          ),
        )
        .limit(perPage)
        .offset(input?.search ? 0 : offset)
        .orderBy(questions.createdAt, asc(questions.createdAt));

      const count = await db
        .select({ id: questions.id })
        .from(questions)
        .then((res) => res.length);

      const totalPage = calculateTotalPages(count, perPage);
      const nextPage = page < totalPage ? page + 1 : null;
      const prevPage = page > 1 ? page - 1 : null;

      const metaPrefix = {
        data,
        meta: {
          code: 200,
          status: "success",
          message: "Berhasil menampilkan order",
          page,
          perPage,
          totalPage,
          nextPage,
          prevPage,
        },
      };
      return metaResponsePrefix(metaPrefix);
    } catch (err) {
      throw new Error(err as string);
    }
  }),
});

export type AppRouter = typeof appRouter;
