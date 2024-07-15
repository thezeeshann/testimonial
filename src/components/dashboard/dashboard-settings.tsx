"use client";

import React from "react";
import { settingsSchema } from "@/lib/validations/setting";
import { useForm } from "react-hook-form";
import Image from "next/image";
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
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Session } from "next-auth";

const DashboardSettings = ({ user }: Session) => {
  const form = useForm<z.infer<typeof settingsSchema>>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      name: user.name || undefined,
      image: user.image || undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof settingsSchema>) => {};

  return (
    <section className="flex flex-col px-20 min-h-screen py-14">
      <div>
        <p className="text-neutral-200 font-bold text-2xl">⚙️ Settings</p>
        <div className="w-[100%] h-[1px] bg-neutral-500 mt-2" />
      </div>

      <div className=" flex flex-col mt-8 w-[50%] mx-auto"> 
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 ">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name" className="text-neutral-200">
                    Your Name <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Your Name"
                      className="bg-neutral-800 text-neutral-200"
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="image" className="text-neutral-200">
                    Avatar <span className="text-red-500">*</span>
                  </FormLabel>

                  {!form.getValues("image") && (
                    <div className="font-bold text-neutral-200 text-3xl border-2 p-2 w-[40px] text-start rounded-full">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  {form.getValues("image") && (
                    <Image
                      src={form.getValues("image")!}
                      width={42}
                      height={42}
                      className="rounded-full"
                      alt="User Image"
                    />
                  )}

                  <FormControl>
                    <Input
                      type="hidden"
                      {...field}
                      placeholder="Image"
                      className="bg-white"
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-[35%]">
              Save my profile
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default DashboardSettings;