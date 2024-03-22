import z from "zod";
import { protectedProcedure, createTRPCRouter } from "../trpc";

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
          to: "+255758670017",
          message: input.message,
          from: "Shamba Data",
        };

        const sms = AfricasTalking.SMS;

        const res = await sms.send({ ...options });
        console.log(res);
      } catch (cause) {
        console.log(cause);
      }
    }),
});
