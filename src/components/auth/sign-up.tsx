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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { register } from "@/actions/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { registerSchema } from "@/lib/validations/register";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import PulsatingDots from "@/components/loading";

const SignUp = () => {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: register,

    onError: (error) => {
      toast.error("Something went wrong");
    },

    onSuccess: (data) => {
      form.reset({
        name: "",
        email: "",
        password: "",
      });
      toast.success(`${data.success}`);
    },
  });

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    mutate(values);
  };

  return (
    <section className="flex flex-col items-center p-20 ">
      <p className="text-neutral-200 font-bold text-4xl">Sign up for free 🤗</p>

      <Card className="w-[420px] bg-[#25282C] mt-10 shadow-md border-[#25282C]">
        <CardHeader>
          <CardTitle>
            <div
              onClick={() => {
                signIn("google", {
                  callbackUrl: "/dashboard",
                });
              }}
              className="bg-white py-[10px] gap-x-4 flex flex-row justify-center items-center cursor-pointer"
            >
              <FcGoogle className="w-5 h-5" />
              <p className="text-neutral-600">Sign up with Google</p>
            </div>
          </CardTitle>
          <CardDescription>
            <p className="text-center mt-3 text-lg ">
              {" "}
              Or, register with your email 
            </p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="name" className="text-neutral-200">
                      First Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Your First Name"
                        className="bg-white"
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="email" className="text-neutral-200">
                      Email
                    </Label>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Your Email"
                        className="bg-white"
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="password" className="text-neutral-200">
                      Password
                    </Label>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Password"
                        className="bg-white"
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isPending} type="submit" className=" w-full">
                {isPending ? <PulsatingDots /> : "Sign up"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <div className="flex flex-row justify-center w-full items-center gap-x-1">
            <p className="text-neutral-400 text-sm">
              Don&apos;t have an account?{" "}
            </p>

            <span className="text-blue-500 cursor-pointer hover:text-neutral-200 text-sm">
              <Link href={"/signin"}>Sign in</Link>
            </span>
          </div>
        </CardFooter>
      </Card>
    </section>
  );
};

export default SignUp;
