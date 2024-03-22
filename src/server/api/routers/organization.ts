import { TRPCClientError } from "@trpc/client";
import { protectedProcedure, createTRPCRouter } from "../trpc";
import { TRPCError } from "@trpc/server";
import { organizationSchema } from "~/pages/organizations/new";
import z from "zod";

export const CANT_MUTATE_ERRORS = new TRPCError({
  code: "NOT_FOUND",
  message: "Failed to perform this operation",
});

export const NOT_FOUND = new TRPCError({
  code: "NOT_FOUND",
  message: "Failed to Fetch",
});

export const organization = createTRPCRouter({
  create: protectedProcedure
    .input(organizationSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.db.organizations.create({
          data: input,
        });
      } catch (cause) {
        console.log(cause);
        throw CANT_MUTATE_ERRORS;
      }
    }),

  editOrganization: protectedProcedure
    .input(organizationSchema.merge(z.object({ organizationId: z.string() })))
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.db.organizations.update({
          where: {
            id: input.organizationId,
          },
          data: {
            name: input.name,
            email: input.email,
            phoneNumber: input.phoneNumber,
            messageBalance: input.messageBalance,
          },
        });
      } catch (cause) {
        console.log(cause);
        throw CANT_MUTATE_ERRORS;
      }
    }),

  fetchByOrganization: protectedProcedure.query(async ({ ctx, input }) => {
    try {
      return await ctx.db.organizations.findMany();
    } catch (cause) {
      console.log(cause);
      throw NOT_FOUND;
    }
  }),

  all: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.organizations.findMany();
  }),

  fetchById: protectedProcedure
    .input(
      z.object({
        organizationId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.db.organizations.findUnique({
          where: {
            id: input.organizationId,
          },
        });
      } catch (cause) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Organization not found",
        });
      }
    }),
});
