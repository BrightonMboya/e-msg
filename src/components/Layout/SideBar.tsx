import Link from "next/link";
import { PersonIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/router";
import Button from "../ui/Button";
import { UserButton, useClerk } from "@clerk/nextjs";

import { Send, LogOutIcon, CreditCard } from "lucide-react";

export default function SideBar() {
  const router = useRouter();
  const { signOut } = useClerk();

  return (
    <section className="fixed min-h-screen bg-lightest">
      <div className="spac flex w-[250px] flex-col  justify-start px-5 pt-5 ">
        <UserButton
          appearance={{
            variables: {},
          }}
        />

        <Link href="/organizations" className="mt-5">
          <div
            className={`flex space-x-2
              ${
                router.pathname.startsWith("/organizations")
                  ? "text-dark"
                  : "text-gray-500"
              }
          `}
          >
            <PersonIcon width={20} height={20} />

            <h3>Organizations</h3>
          </div>
        </Link>

        <Link href="/messages" className="mt-5">
          <div
            className={`flex space-x-2
              ${
                router.pathname.startsWith("/messages")
                  ? "text-dark"
                  : "text-gray-500"
              }
          `}
          >
            <Send width={20} height={20} />

            <h3>Send Messages</h3>
          </div>
        </Link>

        <Link href="/contacts" className="mt-5">
          <div
            className={`flex space-x-2
              ${
                router.pathname.startsWith("/contacts")
                  ? "text-dark"
                  : "text-gray-500"
              }
          `}
          >
            <PersonIcon width={20} height={20} />

            <h3>Contacts</h3>
          </div>
        </Link>

        <Link href="/payments" className="mt-5">
          <div
            className={`flex space-x-2
              ${
                router.pathname.startsWith("/payments")
                  ? "text-dark"
                  : "text-gray-500"
              }
          `}
          >
            <CreditCard />
            <h3>Payments</h3>
          </div>
        </Link>

        <Button
          className="fixed bottom-10 w-[150px] space-x-2"
          variant="destructive"
          onClick={() => signOut(() => router.push("/auth/login"))}
        >
          <LogOutIcon />
          <span>Log out</span>
        </Button>
      </div>
    </section>
  );
}
