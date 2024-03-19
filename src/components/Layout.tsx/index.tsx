import * as React from "react";
import { SignedIn, SignedOut, SignIn } from "@clerk/nextjs";
import SignUpForm from "~/components/auth/SignUpPage";
import LoginForm from "~/components/auth/LoginPage";

import SideBar from "./SideBar";
type Props = {
  children: React.ReactNode;
};
export default function Layout({ children }: Props) {
  return (
    <>
      {/* <section>
        <div className="font- flex space-x-[300px] ">
          <SideBar />
          <main className="">{children}</main>
        </div>
      </section> */}
      <SignedIn>
        <section>
          <div className="flex space-x-[300px] ">
            <SideBar />
            <main className="">{children}</main>
          </div>
        </section>
      </SignedIn>

      <SignedOut>
        <LoginForm />
      </SignedOut>
    </>
  );
}
