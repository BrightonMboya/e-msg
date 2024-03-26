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
  const [contacts, setContacts] = useState<
    Array<{ phoneNumber: string; organizationsId: string }>
  >([]);
  const { mutateAsync, isPending } = api.contacts.addMany.useMutation({
    onSuccess: () => {
      toast({
        description: "Contacts created Succesfully",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        description: "Failed to create the contacts",
      });
    },
  });

  const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutateAsync(contacts);
    setContacts([]);
  };

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;
    const parsedContacts = inputValue.split("\n").map((line) => {
      const [phoneNumber, _] = line.split(" ");
      return {
        phoneNumber: phoneNumber || "",
        organizationsId: "cltyjdse50000vhrvx09npjfr",
      };
    });
    setContacts(parsedContacts);
  };
  return (
    <main className="pl-5">
      <Toaster />
      <Header
        caption={user?.username as unknown as string}
        link="/contacts/"
        title="View All Contacts"
      />
      <h3 className="text-xl font-medium">Creating many contacts at once</h3>
      <form onSubmit={onSubmit}>
        <Textarea
          className="mt-5 max-w-xl"
          rows={10}
          onChange={handleTextAreaChange}
        />
        <Button
          className="disabled:cursor-disabled mt-5"
          //   disabled={isPending || contacts.length === 0}
        >
          Send Message
        </Button>
      </form>
    </main>
  );
}

//
// ```json
// [
//   {
//     "phoneNumber": "+255759661646",
//     "organizationsId": "cltyjdse50000vhrvx09npjfr"
//   },
//   {
//     "phoneNumber": "+255629203685",
//     "organizationsId": "cltyjdse50000vhrvx09npjfr"
//   },
//   {
//     "phoneNumber": "+255715240480",
//     "organizationsId": "cltyjdse50000vhrvx09npjfr"
//   },
//   {
//     "phoneNumber": "+255683228671",
//     "organizationsId": "cltyjdse50000vhrvx09npjfr"
//   },
//   {
//     "phoneNumber": "+255754053020",
//     "organizationsId": "cltyjdse50000vhrvx09npjfr"
//   },
//   {
//     "phoneNumber": "+255673223903",
//     "organizationsId": "cltyjdse50000vhrvx09npjfr"
//   },
//   {
//     "phoneNumber": "+255719188383",
//     "organizationsId": "cltyjdse50000vhrvx09npjfr"
//   },
//   {
//     "phoneNumber": "+255765942538",
//     "organizationsId": "cltyjdse50000vhrvx09npjfr"
//   },
//   {
//     "phoneNumber": "+255689429302",
//     "organizationsId": "cltyjdse50000vhrvx09npjfr"
//   },
//   {
//     "phoneNumber": "+255692855966",
//     "organizationsId": "cltyjdse50000vhrvx09npjfr"
//   },
//   {
//     "phoneNumber": "+255694422744",
//     "organizationsId": "cltyjdse50000vhrvx09npjfr"
//   },
//   {
//     "phoneNumber": "+255713471700",
//     "organizationsId": "cltyjdse50000vhrvx09npjfr"
//   },
//   {
//     "phoneNumber": "+255713655212",
//     "organizationsId": "cltyjdse50000vhrvx09npjfr"
//   },
//   {
//     "phoneNumber": "+255715304749",
//     "organizationsId": "cltyjdse50000vhrvx09npjfr"
//   },
//   {
//     "phoneNumber": "+255717763447",
//     "organizationsId": "cltyjdse50000vhrvx09npjfr"
//   },
//   {
//     "phoneNumber": "+255745554357",
//     "organizationsId": "cltyjdse50000vhrvx09npjfr"
//   },
//   {
//     "phoneNumber": "+255745938837",
//     "organizationsId": "cltyjdse50000vhrvx09npjfr"
//   },
//   {
//     "phoneNumber": "+255746875741",
//     "organizationsId": "cltyjdse50000vhrvx09npjfr"
//   },
//   {
//     "phoneNumber": "+255747911414",
//     "organizationsId": "cltyjdse50000vhrvx09npjfr"
//   },
//   {
//     "phoneNumber": "+255752466848",
//     "organizationsId": "cltyjdse50000vhrvx09npjfr"
//   },
//   {
//     "phoneNumber": "+255752749344",
//     "organizationsId": "cltyjdse50000vhrvx09npjfr"
//   },
//   {
//     "phoneNumber": "+255754296292",
//     "organizationsId": "cltyjdse50000vhrvx09npjfr"
//   },
//   {
//     "phoneNumber": "+255754367186",
//     "organizationsId": "cltyjdse50000vhrvx09npjfr"
//   },
//   {
//     "phoneNumber": "+255754639267",
//     "organizationsId": "cltyjdse50000vhrvx09npjfr"
//   },
//   {
//     "phoneNumber": "+255754685893",
//     "organizationsId": "cltyjdse50000vhrvx09npjfr"
//   },
//   {
//     "phoneNumber": "+255755540916",
//     "organizationsId": "cltyjdse50000vhrvx09npjfr"
//   },
//   {
//     "phoneNumber": "+255755544150",
//     "organizationsId": "cltyjdse50000vhrvx09npjfr"
//   },
//   {
//     "phoneNumber": "+255756272275",
//     "organizationsId": "cltyjdse50000vhrvx09npjfr"
//   },
//   {
//     "phoneNumber": "+255756313263",
//     "organizationsId": "cltyjdse50000vhrvx09npjfr"
//   },
//   {
//     "phoneNumber": "+255756428019",
//     "organizationsId": "cltyjdse50000vhrvx09npjfr"
//   },
//   {
//     "phoneNumber": "+255756605520",
//     "organizationsId": "cltyjdse50000vhrvx09npjfr"
//   },
//   {
//     "phoneNumber": "+255757097097",
//     "organizationsId": "cltyjdse50000vhrvx09npjfr"
//   },
//   {
//     "phoneNumber": "+255757760777",
//     "organizationsId": "cltyjdse50000vhrvx09npjfr"
//   },
//   {
//     "phoneNumber": "+255758490924",
//     "organizationsId": "cltyjdse50000vhrvx09npjfr"
//   },
//   {
//     "phoneNumber": "+255759202175",
//     "organizationsId": "cltyjdse50000vhrvx09npjfr"
// }
// ]
