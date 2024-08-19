"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { resetPassword } from "@/actions/reset-password";
import { resetSchema } from "@/lib/validations/reset";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import PulsatingDots from "../loading";
import Link from "next/link";

const ForgotPassword = () => {
  const form = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: resetPassword,
    onError: (error) => {
      toast.error("Something went wrong");
    },

    onSuccess: (data) => {
      form.reset({
        email: "",
      });
      toast.success(`${data.success}`);
    },
  });

  function onSubmit(values: z.infer<typeof resetSchema>) {
    mutate(values);
  }

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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="500 w-[400px] mt-8 flex flex-col gap-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-neutral-200"> Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your Email"
                      {...field}
                      className="bg-white"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <Button className=" w-full" disabled={isPending}>
                {isPending ? <PulsatingDots /> : "Forgot your password"}
              </Button>
            </div>
            <Link href="/signin">
              <p className="text-blue-500 text-center cursor-pointer hover:text-neutral-200 text-sm">
                Go to sign-in page
              </p>
            </Link>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default ForgotPassword;
