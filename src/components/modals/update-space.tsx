"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { useGetSpace } from "@/lib/hooks/useGetReview";
import { editSpace } from "@/actions/space";
import { Flame, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { spaceSchema } from "@/lib/validations/space";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Textarea } from "../ui/textarea";
import { Input } from "@/components/ui/input";
import { Switch } from "@radix-ui/react-switch";
import { UploadButton } from "@uploadthing/react";
import { Button } from "@/components/ui/button";

type UpdateSpaceModalProp = {
  isEditOpen: boolean;
  setIsEditOpen: (value: boolean) => void;
};

const UpdateSpaceModal = ({
  isEditOpen,
  setIsEditOpen,
}: UpdateSpaceModalProp) => {
  const form = useForm<z.infer<typeof spaceSchema>>({
    resolver: zodResolver(spaceSchema),
    defaultValues: {
      name: "",
      logo: "",
      title: "",
      message: "",
      rating: false,
      theme: "Light",
      questionOne: undefined,
      questionTwo: undefined,
      questionThree: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof spaceSchema>) {
    console.log(values);
  }

  return (
    <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="max-w-[80%] h-[90%] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle className="text-center font-bold text-3xl">
            Edit Space
          </DialogTitle>
        </DialogHeader>
        <div className="flex w-full justify-between items-start flex-row ">
          <div className="w-[40%] p-4 relative">
            {/*  */}
            <DialogDescription>
              <DialogTitle asChild>
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
                  {/* {data?.data?.logo ? (
                    <Image
                      src={data.data.logo}
                      alt="Selected Logo"
                      width={100}
                      height={100}
                      className="rounded-full"
                    />
                  ) : (
                    <Flame size={55} color="#235BD5" strokeWidth={1.25} />
                  )} */}
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
            </Card>
          </div>

          {/* form */}
          <div className="w-[60%] p-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateSpaceModal;
