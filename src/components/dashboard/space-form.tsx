"use client";

import spaceImage from "../../../public/no-message.18de8749.svg";
import Image from "next/image";
import successImg from "../../../public/8Iv5lqKwKsZ2g.webp";
import { Button } from "@/components/ui/button";
import { CirclePlus, Flame, Pencil, Plus, Trash2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogClose,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useTheme } from "next-themes";
import { UploadButton } from "@/app/api/uploadthing/uploadthing";
import { spaceSchema } from "@/lib/validations/space";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { space } from "@/actions/space";
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
import React, { ChangeEvent } from "react";
import Link from "next/link";

type SpaceFormProp = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

const SpaceForm: React.FC<SpaceFormProp> = ({ isOpen, setIsOpen }) => {
  const [formSuccess, setFormSucess] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const { setTheme, theme: cardTheme } = useTheme();
  const form = useForm<z.infer<typeof spaceSchema>>({
    resolver: zodResolver(spaceSchema),
    defaultValues: {
      name: "",
      logo: "",
      title: "",
      message: "",
      rating: false,
      theme: "Light",
      questionOne: "Who are you / what are you working on?",
      questionTwo: "How has [out product / service] helped you?",
      questionThree: "What is the best thing [our product / service]",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: space,

    onSuccess: (data) => {
      if (data?.error) {
        return toast.error(`${data.error}`);
      }

      if (data?.success) {
        form.reset();
        setIsOpen(false);
        setFormSucess(true);
        toast.success(`${data.success}`);
      }
    },

    onError: () => {
      toast.error("Somethig went wrong");
    },
  });

  const onSubmit = (values: z.infer<typeof spaceSchema>) => {
    mutate(values);
    console.log(values);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader: any = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTheme = (checked: boolean) => {
    if (cardTheme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
    const newTheme = checked ? "Dark" : "Light";
    form.setValue("theme", newTheme);
  };

  return (
    <>
      {/* success dialog */}
      <Dialog open={formSuccess} onOpenChange={setFormSucess}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="sm:max-w-[425px] ">
          <DialogHeader>
            <DialogTitle className="p-2">
              <Image
                src={successImg}
                width={0}
                height={0}
                className="w-[350px] mx-auto h-[180px]"
                alt="space image"
              />
            </DialogTitle>
            <DialogDescription className="font-semibold text-lg text-center">
              Added student-review successfully 🥳
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-y-1  text-sm items-center justify-center">
            <p>Here is the link for your customers</p>
            <Link
              href={"http://localhost:3000/dashboard/zeeshan"}
              className="text-blue-500 cursor-pointer"
              target="_blank"
            >
              <p>http://localhost:3000/dashboard/zeeshan</p>
            </Link>
          </div>
          <DialogFooter className="px-2">
            <DialogClose asChild>
              <Button className="w-full  rounded">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* form dialog */}
      <Dialog onOpenChange={setIsOpen} open={isOpen}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="max-w-[80%] h-[90%] overflow-y-scroll">
          <div className="flex w-full justify-between items-start flex-row ">
            <div
              className={`"w-[40%] p-4 relative ${
                cardTheme === "dark" ? "dark" : "bg-white"
              }`}
            >
              {/*  */}
              <DialogDescription>
                <DialogTitle>
                  <Badge
                    variant="primary"
                    className="absolute left-14 top-1 z-10"
                  >
                    Live preview - Testimonial page
                  </Badge>
                </DialogTitle>
              </DialogDescription>
              <Card className="w-[360px] py-5 px-2 relative">
                <CardHeader>
                  <CardTitle className=" w-ful mx-auto">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt="Selected Logo"
                        width={100}
                        height={100}
                        className="rounded-full"
                      />
                    ) : (
                      <Flame size={55} color="#235BD5" strokeWidth={1.25} />
                    )}
                  </CardTitle>
                  <CardDescription>
                    <div className="gap-y-4 mt-5 flex flex-col justify-center items-center">
                      <p className="text-3xl font-bold dark:text-neutral-200">
                        {`${
                          form.watch("title")
                            ? `${form.watch("title")}`
                            : "Header goes here..."
                        }`}
                      </p>
                      <p className="dark:text-neutral-200">
                        {`${
                          form.watch("message")
                            ? `${form.watch("message")}`
                            : "Your custom message goes here..."
                        }`}
                      </p>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <p className="font-semibold dark:text-neutral-200 text-xl">
                      QUESTIONS
                    </p>
                    <div className="bg-blue-500 max-w-12 h-1 mt-1" />
                    <ul className="flex flex-col text-sm mt-2 gap-y-1">
                      <li>{form.watch("questionOne")}</li>
                      <li>{form.watch("questionTwo")}</li>
                      <li>{form.watch("questionThree")}</li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button className="bg-black dark:bg-[#25282C] flex flex-row gap-x-2 w-full">
                    {" "}
                    <span className="dark:text-neutral-200">
                      <Pencil size={20} />
                    </span>{" "}
                    <span className="dark:text-neutral-200">Send in text</span>{" "}
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* form */}
            <div className="w-[60%] p-4 ">
              <div className="flex flex-col justify-center items-center gap-y-3">
                <p className="text-center font-bold text-3xl">
                  Create a new Space
                </p>
                <p className="text-center">
                  After the Space is created, it will generate a dedicated page
                  for collecting <br /> testimonials.
                </p>
              </div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-2"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="space">
                          Space name <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Public URL is: testimonial.to/your-space"
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
                    name="logo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="space">Space logo</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="file"
                            className="bg-white"
                            onChange={(e) => {
                              field.onChange(e);
                              handleImageChange(e);
                            }}
                          />
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <Label htmlFor="title">
                          Header title <span className="text-red-500">*</span>
                        </Label>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="would you like to give a shoutout of xyz?"
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
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <Label htmlFor="password">
                          Your custom message{" "}
                          <span className="text-red-500">*</span>
                        </Label>
                        <FormControl>
                          <Textarea
                            rows={4}
                            {...field}
                            placeholder="Write a wram message to you customer, and give them simple direaction on how to make the best testimonial."
                            className="bg-white"
                          />
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-col gap-y-2">
                    <p>Questions</p>

                    <div className="flex flex-col gap-y-2 ">
                      <div className="">
                        <FormField
                          control={form.control}
                          name="questionOne"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input {...field} className="bg-white w-full" />
                              </FormControl>
                              <FormDescription />
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {/* <Trash2 className="text-neutral-200 cursor-pointer" /> */}
                      </div>
                      <div className="">
                        <FormField
                          control={form.control}
                          name="questionTwo"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input {...field} className="bg-white w-full" />
                              </FormControl>
                              <FormDescription />
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {/* <Trash2 className="text-neutral-200 cursor-pointer" /> */}
                      </div>
                      <div className="">
                        <FormField
                          control={form.control}
                          name="questionThree"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input {...field} className="bg-white" />
                              </FormControl>
                              <FormDescription />
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {/* <Trash2 className="text-neutral-200 cursor-pointer" /> */}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row justify-between gap-x-7 items-center pt-3">
                    <FormField
                      control={form.control}
                      name="rating"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex flex-col items-center gap-y-2">
                            <Label htmlFor="password">
                              Collect star ratings
                            </Label>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </div>
                          <FormDescription />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {cardTheme && (
                      <div>
                        <FormField
                          control={form.control}
                          name="theme"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex flex-col items-center gap-y-2">
                                <Label htmlFor="password">Choose a theme</Label>
                                <FormControl>
                                  <Switch
                                    checked={field.value === "Dark"}
                                    onCheckedChange={(checked: boolean) => {
                                      handleTheme(checked);
                                      field.onChange(
                                        checked ? "Dark" : "Light"
                                      );
                                    }}
                                  />
                                </FormControl>
                              </div>
                              <FormDescription />
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                    <div></div>
                  </div>



                  <Button
                    disabled={isPending}
                    type="submit"
                    className=" w-full"
                  >
                    Create new Space
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SpaceForm;
