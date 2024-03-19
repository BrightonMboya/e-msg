import z from "zod"
import { createTRPCRouter, protectedProcedure } from "../trpc"


export const contacts = createTRPCRouter({
    create: protectedProcedure
    .input()
    .mutation(async ({ctx, input}) => {
        try {
            return await ctx.db.contacts.create({
                data: {
                    fullName: 
                }
            })
        }
    })
})