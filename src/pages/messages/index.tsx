import { useUser } from "@clerk/nextjs";
import Header from "~/components/Layout/Header";
import Button from "~/components/ui/Button";
import { Textarea } from "~/components/ui/TextArea";
import { ChangeEvent, useState } from "react";
import { Toaster } from "~/components/ui/toaster";
import { api } from "~/utils/api";
import { useToast } from "~/utils/hooks/useToast";
import z from "zod";
import OrganizationSelector from "~/components/ui/SelectOrganization";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const organizationSchema = z.object({
  messages: z.string().min(1),
  alphanumeric: z.string().min(1),
});

export type IOrganizationSchema = z.infer<typeof organizationSchema>;

export default function Page() {
  const { user } = useUser();
  const { toast } = useToast();
  const [messages, setMessages] = useState("");
  const [charactersCount, setCharactersCount] = useState(0);
  const { mutateAsync, isPending } = api.messages.sendMessage.useMutation({
    onSuccess: () => {
      toast({
        description: "Message Sent Succesfully",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        description: "Failed to send the messages",
      });
    },
  });

  const {
    control,
    register,
    formState: errors,
  } = useForm<IOrganizationSchema>({
    resolver: zodResolver(organizationSchema),
  });

  const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutateAsync({
      message: messages,
      organizationEmail: user?.primaryEmailAddress
        ?.emailAddress as unknown as string,
    });
    setMessages("");
  };
  return (
    <main className="pl-5">
      <Toaster />
      <Header
        caption={user?.username as unknown as string}
        link="/messages/"
        title="View All Messages"
      />
      <h3 className="text-xl font-medium">Sending New Message</h3>
      <p>{`Messages Available: `}</p>
      <p>{`Message characters Limit ${charactersCount}/160`}</p>

      <Controller
        control={control}
        name="alphanumeric"
        render={({ field }) => <OrganizationSelector field={field} />}
      />
      <form onSubmit={onSubmit}>
        <Textarea
          className="mt-5 max-w-xl"
          rows={10}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
            setMessages(e.target.value);
            setCharactersCount(messages.length);
          }}
          disabled={charactersCount >= 160}
        />
        <Button
          className="disabled:cursor-disabled mt-5"
          disabled={
            isPending || messages.length === 0 || charactersCount >= 160
          }
        >
          Send Message
        </Button>
      </form>
    </main>
  );
}
