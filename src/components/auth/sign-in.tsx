"use client";

import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
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
import { z } from "zod";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validations/login";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/actions/login";
import { toast } from "sonner";

const SignIn = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: login,

    onSuccess: (data: any) => {
      if (data?.error) {
        return toast.error(`${data.error}`);
      }
      if (data?.success) {
        toast.success(data.success);
        router.push("/dashboard");
      }
    },

  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    mutate(values);
  };

  return (
    <section className="flex flex-col items-center p-20 ">
      <p className="text-neutral-200 font-bold text-4xl">Welcome back 👋</p>

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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email" className="text-neutral-200">
                      Email
                    </FormLabel>
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
                    <FormLabel htmlFor="password" className="text-neutral-200">
                      Password
                    </FormLabel>
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
                Sign in
              </Button>
            </form>
          </Form>
          <div className="mt-3">
            <p className="text-blue-500 cursor-pointer hover:text-neutral-200 text-sm">
              <Link href={"/reset-password"}>Forgot Password?</Link>
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex flex-row justify-center items-center gap-x-1">
            <p className="text-neutral-400 text-sm">
              Don&apos;t have an account?{" "}
            </p>

            <span className="text-blue-500 cursor-pointer hover:text-neutral-200 text-sm">
              <Link href="/signup">Sign up</Link>
            </span>
          </div>
          {/* </div> */}
        </CardFooter>
      </Card>
    </section>
  );
};

export default SignIn;
