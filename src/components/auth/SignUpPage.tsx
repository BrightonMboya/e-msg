import { SignUp } from "@clerk/nextjs";
import Image from "next/legacy/image";

import { Toaster } from "~/components/ui/toaster";

export default function Page() {
  return (
    <>
      <Toaster />
      <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="bg-muted relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900 " />
          <Image
            src="https://images.unsplash.com/photo-1616587894417-b93dfd1f700a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fHNhbGVzfGVufDB8MXwwfHx8MA%3D%3D"
            alt="hero"
            layout="fill"
            className="object-cover opacity-40"
          />
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This software has streamlined every process of my
                company.&rdquo;
              </p>
              <footer className="text-sm">Sofia Davis</footer>
            </blockquote>
          </div>
        </div>
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="grid gap-6">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Thank you for choosing smas
              </h1>
              <p className="text-muted-foreground text-sm">
                Create an account to get started
              </p>
            </div>
            <SignUp
              path="/auth/sign-up"
              routing="path"
              signInUrl="/auth/sign-in"
            />
          </div>
        </div>
      </div>
    </>
  );
}
