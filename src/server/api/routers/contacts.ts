import z from "zod"
import { createTRPCRouter, protectedProcedure } from "../trpc"
import { NOT_FOUND } from "./organization"


export const contacts = createTRPCRouter({
    // create: protectedProcedure
    // .input()
    // .mutation(async ({ctx, input}) => {
    //     try {
    //         return await ctx.db.contacts.create({
    //             data: {
    //                 fullName: 
    //             }
    //         })
    //     }
    // }),


    fetchByOrganization: protectedProcedure
    .input(z.object({
        organizationEmail: z.string()
    }))
    .query(async ({ctx, input}) => {
        try {
            // start by looking for the organizationid
            const organizationId = await ctx.db.organizations.findUnique({
                where: {
                    email: input.organizationEmail
                },
                select: {
                    id: true
                }
            })

            return await ctx.db.contacts.findMany({
                where: {
                    organizationsId: organizationId?.id
                }
            })
        }
        catch(cause){
            console.log(cause)
            throw NOT_FOUND
        }
    })
})