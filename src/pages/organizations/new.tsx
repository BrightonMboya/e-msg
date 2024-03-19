import React, { type ReactElement } from "react";
import { useRouter } from "next/router";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "~/utils/api";
import Button from "~/components/ui/Button";
import Input from "~/components/ui/Input";
import { Toaster } from "~/components/ui/toaster";
import { useToast } from "~/utils/hooks/useToast";

export const organizationSchema = z.object({
  name: z.string(),
  phoneNumber: z.string(),
  messageBalance: z.number(),
  email: z.string(),
});

export type ValidationSchema = z.infer<typeof organizationSchema>;

export function AssetLabel({
  label,
  caption,
}: {
  label: string;
  caption?: string;
}) {
  return (
    <div className="max-w-[400px] ">
      <h3 className="text-base font-medium">{label}</h3>
      <h3 className="text-sm">{caption}</h3>
    </div>
  );
}

export function ItemLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-2 items-center gap-[50px]">{children}</div>
  );
}

export default function Page() {
  const router = useRouter();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ValidationSchema>({ resolver: zodResolver(organizationSchema) });

  const { mutateAsync, isPending } = api.organization.create.useMutation({
    onSuccess: () => {
      toast({
        description: "Organization Added Succesfully",
      });
    },
    onError: () => {
      toast({
        description: "There was error perfoming this request",
        variant: "destructive",
      });
    },
  });

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => {
    try {
      mutateAsync(data);
      reset();
    } catch (cause) {
      console.log(cause);
    }
  };
  return (
    <main className="mt-[40px] pl-[30px]">
      <h3 className="text-2xl font-medium ">New Organization</h3>
      <Toaster />
      <form
        className="relative mt-[50px] flex flex-col space-y-[30px] "
        onSubmit={handleSubmit(onSubmit)}
      >
        <ItemLayout>
          <AssetLabel label="Organization Name" />
          <Input placeholder="Jay Barber Shop" {...register("name")} />
        </ItemLayout>

        <ItemLayout>
          <AssetLabel label="Phone Number" />
          <Input placeholder="+260 780348912" {...register("phoneNumber")} />
        </ItemLayout>

        <ItemLayout>
          <AssetLabel label="Email" />
          <Input placeholder="joe@gmail.com" {...register("email")} />
        </ItemLayout>

        <ItemLayout>
          <AssetLabel label="Message Balance" />
          <Input
            placeholder="12"
            {...register("messageBalance", { valueAsNumber: true })}
            type="number"
          />
        </ItemLayout>

        <Button className="mt-[50px] w-full" type="submit">
          Save
        </Button>
      </form>
    </main>
  );
}
