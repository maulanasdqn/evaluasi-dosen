import { lectures, questions } from "@/drizzle/schema";
import { db } from "@/server/connection";
import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { VSMetaRequest } from "@/entities";
import { calculateTotalPages, metaResponsePrefix } from "@/utils";
import { asc, ilike, or, and } from "drizzle-orm";

const t = initTRPC.create({
  transformer: superjson,
});

export const appRouter = t.router({
  getLecturers: t.procedure.input(VSMetaRequest).query(async ({ input }) => {
    try {
      const page = input?.page || 1;
      const perPage = input?.perPage || 10;
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
