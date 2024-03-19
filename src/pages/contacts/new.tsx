import React, { type ReactElement } from "react";
import { useRouter } from "next/router";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppRouter } from "~/server/api/root";
import { inferProcedureInput } from "@trpc/server";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { api } from "~/utils/api";
import Button from "~/components/ui/Button";
import Input from "~/components/ui/Input";
import { Textarea } from "~/components/ui/TextArea";
import { ToastAction } from "~/components/ui/Toast";
import { Toaster } from "~/components/ui/toaster";
import { useToast } from "~/utils/hooks/useToast";
import { ItemLayout } from "~/components/ui/ItemLayout";
import { AssetLabel } from "~/components/ui/ItemLayout";

export const contactsSchema = z.object({
  fullName: z.string(),
  phoneNumber: z.string(),
});

export type ValidationSchema = z.infer<typeof contactsSchema>;

export default function Page() {
  const router = useRouter();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({ resolver: zodResolver(contactsSchema) });

  const { mutateAsync } = api.contacts.create.useMutation({
    onSuccess: () => {
      router.push("/contacts");
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: ` ${error.message}`,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
        duration: 1500,
      });
    },
  });

  const [gender, setGender] = React.useState("");
  const { user } = useUser();

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => {
    type Input = inferProcedureInput<AppRouter["contacts"]["create"]>;
    const input: Input = {
      ...data,
      organizationEmail: user?.primaryEmailAddress
        ?.emailAddress as unknown as string,
    };

    try {
     
      mutateAsync(input);
    } catch (cause) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: `${cause}`,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
        duration: 3500,
      });
    }
  };
  return (
    <main className="mt-[40px] pl-[30px]">
      <h3 className="text-2xl font-medium ">New Contact</h3>
      <Toaster />
      <form
        className="relative mt-[50px] flex flex-col space-y-[30px] "
        onSubmit={handleSubmit(onSubmit)}
      >
        <ItemLayout>
          <AssetLabel label="Full Name" />
          <Input placeholder="John Doe" {...register("fullName")} />
        </ItemLayout>

        <ItemLayout>
          <AssetLabel label="Phone Number" />
          <Input placeholder="+260 780348912" {...register("phoneNumber")} />
        </ItemLayout>

        <Button className="mt-[50px] w-full" type="submit">
          {/* {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />} */}
          Save
        </Button>
      </form>
    </main>
  );
}
