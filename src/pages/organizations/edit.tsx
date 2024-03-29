import { useRouter } from "next/router";
import LoadingSkeleton from "~/components/ui/LoadingSkeleton";
import { api } from "~/utils/api";
import { organizationSchema, type ValidationSchema } from "./new";
import { AssetLabel, ItemLayout } from "~/components/ui/ItemLayout";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import Input from "~/components/ui/Input";
import Button from "~/components/ui/Button";
import { useToast } from "~/utils/hooks/useToast";
import { Toaster } from "~/components/ui/toaster";

export default function Page() {
  const { query } = useRouter();
  const { isLoading, isError, data } = api.organization.fetchById.useQuery({
    organizationId: query.organizationId as unknown as string,
  });

  const { setValue, register, handleSubmit } = useForm<ValidationSchema>({
    resolver: zodResolver(organizationSchema),
  });

  const { toast } = useToast();
  const { isPending, mutateAsync } =
    api.organization.editOrganization.useMutation({
      onSuccess: () => {
        toast({
          description: "Organization Succsefully Edited",
        });
      },
      onError: () => {
        toast({
          variant: "destructive",
          description: "Failed to edit the organization ",
        });
      },
    });
  useEffect(() => {
    if (data) {
      setValue("email", data?.email);
      setValue("name", data?.name);
      setValue("alphaNumerics", data?.alphaNumerics);
      setValue("messageBalance", data?.messageBalance);
      setValue("phoneNumber", data?.phoneNumber);
    }
  }, [data, setValue]);

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => {
    mutateAsync({
      ...data,
      organizationId: query.organizationId as unknown as string,
    });
  };

  return (
    <main>
      <Toaster />
      {isLoading && <LoadingSkeleton />}
      {isError && <h3>Organization Not found</h3>}
      {data && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <section className="relative mt-[50px] flex flex-col space-y-[30px] ">
            <ItemLayout>
              <AssetLabel label="Organization Name" />
              <Input placeholder="BarberShop" {...register("name")} />
            </ItemLayout>

            <ItemLayout>
              <AssetLabel label="Alphanumeric" />
              <Input placeholder="BarberShop" {...register("alphaNumerics")} />
            </ItemLayout>

            <ItemLayout>
              <AssetLabel label="Email" />
              <Input {...register("email")} />
            </ItemLayout>

            <ItemLayout>
              <AssetLabel label="Phone Number" />
              <Input {...register("phoneNumber")} />
            </ItemLayout>

            <ItemLayout>
              <AssetLabel label="Message Balance" />
              <Input
                {...register("messageBalance", { valueAsNumber: true })}
                type="number"
              />
            </ItemLayout>
          </section>

          <Button disabled={isPending} className="mt-5">
            Edit Changes
          </Button>
        </form>
      )}
    </main>
  );
}
