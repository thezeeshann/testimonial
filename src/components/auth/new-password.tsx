"use client";

import { z } from "zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { newPassword } from "@/actions/new-password";
import { newPasswordSchema } from "@/lib/validations/new-password";
import PulsatingDots from "../loading";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

const NewPassword = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  console.log("new-password file token", token);

  const form = useForm<z.infer<typeof newPasswordSchema>>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const { isPending, mutate } = useMutation({
    mutationFn: newPassword,
    onError: () => {
      toast.error("Something went wrong");
    },

    onSuccess: (data) => {
      form.reset({
        password: "",
      });
      toast.success(`${data.success}`);
    },
  });

  const onSubmit = (values: z.infer<typeof newPasswordSchema>) => {
    mutate({ ...values, token });
  };

  return (
    <section className="flex flex-col items-center p-20 ">
      <div className="flex flex-col gap-y-5">
        <p className="text-neutral-200 text-[52px] leading-none font-extrabold text-center">
          Reset your password?
        </p>
        <p className="text-neutral-400 text-center text-xl">
          We&apos;ll email you a link to reset it.
        </p>
      </div>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="500 w-[400px] mt-8 flex flex-col gap-y-5">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutral-200">Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Password"
                        {...field}
                        type="text"
                        className="bg-white"
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <Button className=" w-full" disabled={isPending}>
                  {isPending ? <PulsatingDots /> : "Reset Password"}
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
      </div>
    </section>
  );
};

export default NewPassword;
