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
          to: "+255788323254",
          message: input.message,
          from: "Shamba Data",
        };

        const sms = AfricasTalking.SMS;

        const res = await sms.send({ ...options });

        // processing the res from the api
        const correctStatusCode = ["100", "101", "102"];
        if (res.SMSMessageData.Recipients.status in correctStatusCode) {
          console.log("Yes Honey");
        }
        console.log(res);
        console.log(res.SMSMessageData.Recipients);
      } catch (cause) {
        console.log(cause);
      }
    }),
});
