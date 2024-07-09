"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const ForgotPassword = () => {
  return (
    <section className="flex flex-col items-center p-20 ">
      <div className="flex flex-col gap-y-5">
        <p className="text-neutral-200 text-[52px] leading-none font-extrabold text-center">
          Forgot your password?
        </p>
        <p className="text-neutral-400 text-center text-xl">
          We&apos;ll email you a link to reset it.
        </p>
      </div>
      <div className="500 w-[400px] mt-8 flex flex-col gap-y-5">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="name" className="text-neutral-200">
            Email
          </Label>
          <Input id="name" placeholder="Your Email" className="bg-white" />
        </div>
        <div>
          <Button className=" w-full">Reset Password</Button>
        </div>
        <p className="text-blue-500 text-center cursor-pointer hover:text-neutral-200 text-sm">
          Go to sign-in page
        </p>
      </div>
    </section>
  );
};

export default ForgotPassword;

// border-2 border-red-
