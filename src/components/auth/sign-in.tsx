"use client";

import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { signIn } from "next-auth/react";

const SignIn = () => {
  return (
    <section className="flex flex-col items-center p-20 ">
      <p className="text-neutral-200 font-bold text-4xl">Welcome back 👋</p>

      <Card className="w-[420px] bg-[#25282C] mt-10 shadow-md border-[#25282C]">
        <CardHeader>
          <CardTitle>
            <div
              onClick={() =>
                signIn("google", {
                  callbackUrl: "/dashboard",
                })
              }
              className="bg-white py-[10px] gap-x-4 flex flex-row justify-center items-center cursor-pointer"
            >
              <FcGoogle className="w-5 h-5" />
              <p className="text-neutral-600">Sign in with Google</p>
            </div>
          </CardTitle>
          <CardDescription>
            <p className="text-center mt-3 text-lg ">
              {" "}
              ------ Or, sign in with your email ------{" "}
            </p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-5">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name" className="text-neutral-200">
                  Email
                </Label>
                <Input
                  id="name"
                  placeholder="Your Email"
                  className="bg-white"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name" className="text-neutral-200">
                  Password
                </Label>
                <Input id="name" placeholder="Password" className="bg-white" />
              </div>
            </div>
          </form>
          <div className="mt-3">
            <p className="text-blue-500 cursor-pointer hover:text-neutral-200 text-sm">
              <Link href={"/reset-password"}>Forgot Password?</Link>
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex flex-col w-full gap-y-4">
            <Button className=" w-full">Sign in</Button>

            <div className="flex flex-row justify-center items-center gap-x-1">
              <p className="text-neutral-400 text-sm">
                Don&apos;t have an account?{" "}
              </p>

              <span className="text-blue-500 cursor-pointer hover:text-neutral-200 text-sm">
                <Link href="/signup">Sign up</Link>
              </span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </section>
  );
};

export default SignIn;
