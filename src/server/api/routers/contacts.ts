import z from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { CANT_MUTATE_ERRORS, NOT_FOUND } from "./organization";
import { contactsSchema } from "~/pages/contacts/new";

export const contacts = createTRPCRouter({
  create: protectedProcedure
    .input(
      contactsSchema.merge(
        z.object({
          organizationEmail: z.string(),
        }),
      ),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const organizationId = await ctx.db.organizations.findUnique({
          where: {
            email: input.organizationEmail,
          },
          select: {
            id: true,
          },
        });
        return await ctx.db.contacts.create({
          data: {
            fullName: input.fullName,
            phoneNumber: input.phoneNumber,
            organizationsId: organizationId?.id as unknown as string,
          },
        });
      } catch (cause) {
        console.log(cause);
        throw CANT_MUTATE_ERRORS;
      }
    }),

  fetchByOrganization: protectedProcedure
    .input(
      z.object({
        organizationEmail: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      try {
        // start by looking for the organizationid
        const organizationId = await ctx.db.organizations.findUnique({
          where: {
            email: input.organizationEmail,
          },
          select: {
            id: true,
          },
        });

        return await ctx.db.contacts.findMany({
          where: {
            organizationsId: organizationId?.id,
          },
        });
      } catch (cause) {
        console.log(cause);
        throw NOT_FOUND;
      }
    }),
});
