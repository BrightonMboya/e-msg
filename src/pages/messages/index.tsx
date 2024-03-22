import Header from "~/components/Layout/Header";
import { useUser } from "@clerk/nextjs";

export default function Page() {
  const { user } = useUser();
  return (
    <main className="pl-5">
      <Header
        caption={user?.username as unknown as string}
        link="/messages/new"
        title="Send New Message"
      />
    </main>
  );
}
