import { createTRPCRouter } from "~/server/api/trpc";
import { organization } from "./routers/organization";
import { contacts } from "./routers/contacts";
import { messages } from "./routers/messages";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  organization,
  contacts,
  messages,
});

// export type definition of API
export type AppRouter = typeof appRouter;
