import { useUser } from "@clerk/nextjs";
import Header from "~/components/Layout/Header";
import Button from "~/components/ui/Button";
import { Textarea } from "~/components/ui/TextArea";
import { ChangeEvent, useState } from "react";
import { Toaster } from "~/components/ui/toaster";
import { api } from "~/utils/api";
import { useToast } from "~/utils/hooks/useToast";

export default function Page() {
  const { user } = useUser();
  const { toast } = useToast();
  const [messages, setMessages] = useState("");
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

  const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutateAsync({ message: messages });
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
      <form onSubmit={onSubmit}>
        <Textarea
          className="mt-5 max-w-xl"
          rows={10}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
            setMessages(e.target.value);
          }}
        />
        <Button className="mt-5 disabled:cursor-disabled" disabled={isPending || messages.length === 0}>
          Send Message
        </Button>
      </form>
    </main>
  );
}
