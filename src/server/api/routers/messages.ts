import z from "zod";
import { protectedProcedure, createTRPCRouter } from "../trpc";

interface Recipients {
  statusCode: string;
  number: string;
  status: string;
  cost: string;
  messageId: string;
}
interface smsMessageData {
  message: string;
  Recipients: Array<Recipients>;
}
interface AfricasTalkingResponse {
  smsMessageData: smsMessageData;
}

export const messages = createTRPCRouter({
  sendMessage: protectedProcedure
    .input(
      z.object({
        message: z.string(),
        organizationEmail: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        // this is a multitenant app, we have to initialize the sdk that is unique for every vendor
        const credentials = {
          apiKey:
            "36abe29f15ce787814a53a2f961dd1d5276a9742ed308367d367e99929cb56ef",
          username: "shamba_data_info",
        };

        // Initialize the SDK
        const AfricasTalking = require("africastalking")(credentials);
        const options = {
          message: input.message,
          from: "Barbershop",
        };

        const sms = AfricasTalking.SMS;
        const organizationsId = await ctx.db.organizations.findUnique({
          where: {
            email: input.organizationEmail,
          },
          select: {
            id: true,
            messageBalance: true,
          },
        });
        const recipients = await ctx.db.contacts.findMany({
          where: {
            organizationsId: organizationsId?.id,
          },
          select: {
            id: true,
            phoneNumber: true,
          },
        });

        // for (const phoneNumber of recipients) {
        //   const res = await sms.send({
        //     ...options,
        //     to: phoneNumber.phoneNumber,
        //   });
        // }
        const smsPromises = recipients.map(async (recipient) => {
          const res = await sms.send({
            ...options,
            to: recipient.phoneNumber,
          });
        });

        const res = await Promise.all(smsPromises)
        console.log(res, "This should work pretty fast");
        const totalCost = recipients.length * 50;
        const totalMessagesSent = recipients.length;

        // reduce the totalMessages sent
        const messagesSent = await ctx.db.organizations.update({
          where: {
            id: organizationsId?.id,
          },
          data: {
            messageBalance:
              organizationsId?.messageBalance! - totalMessagesSent,
          },
        });

        console.log("Total Messages sent", messagesSent);

        // const res = await sms.send({ ...options });

        // processing the res from the api
        // console.log(res.SMSMessageData.Recipients);
      } catch (cause) {
        console.log(cause);
      }
    }),
});
