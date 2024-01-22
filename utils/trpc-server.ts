"use server";
import { appRouter } from "@/app/api/trpc/trpc-router";
import { httpBatchLink } from "@trpc/client";

export const trpcServer = appRouter.createCaller({
  links: [
    httpBatchLink({
      url: process.env.NEXT_PUBLIC_TRPC_URL as string,
    }),
  ],
});
