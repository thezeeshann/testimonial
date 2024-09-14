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
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Textarea } from "../ui/textarea";
import { Input } from "@/components/ui/input";
import { Switch } from "@radix-ui/react-switch";
import { UploadButton } from "@/app/api/uploadthing/uploadthing";
import { Button } from "@/components/ui/button";
import { useGetSingleReview } from "@/lib/hooks/useGetSingleReview";
import { useCallback, useEffect } from "react";
import PulsatingDots from "../loading";
import { useTheme } from "next-themes";

type UpdateSpaceModalProp = {
  isEditOpen: boolean;
  setIsEditOpen: (value: boolean) => void;
  slug: string;
};

const UpdateSpaceModal = ({
  isEditOpen,
  setIsEditOpen,
  slug,
}: UpdateSpaceModalProp) => {
  const queryClient = useQueryClient();
  const { setTheme, theme: cardTheme } = useTheme();
  const { data, refetch } = useGetSingleReview(slug);
  const form = useForm<z.infer<typeof spaceSchema>>({
    resolver: zodResolver(spaceSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: ({
      spaceId,
      values,
    }: {
      spaceId: string;
      values: z.infer<typeof spaceSchema>;
    }) => editSpace(spaceId, values),
    onSuccess: (data) => {
      if (data?.error) {
        return toast.error(`${data.error}`);
      }

      if (data?.success) {
        form.reset();
        toast.success(`${data.success}`);
        setIsEditOpen(false);
      }
    },
    onError: () => {
      toast.error("Somethig went wrong");
    },
  });

  function onSubmit(values: z.infer<typeof spaceSchema>) {
    const spaceId = data?.data?.id;
    if (spaceId) {
      mutate({ spaceId, values });
    } else {
      toast.error("Space ID is missing.");
    }
  }

  const handleReset = useCallback(() => {
    form.reset({
      name: data?.data?.name || undefined,
      logo: data?.data?.logo || undefined,
      title: data?.data?.title || undefined,
      message: data?.data?.message || undefined,
      rating: data?.data?.rating || false,
      theme: data?.data?.theme || "Light",
      questionOne: data?.data?.questionOne || undefined,
      questionTwo: data?.data?.questionTwo || undefined,
      questionThree: data?.data?.questionThree || undefined,
    });
  }, [
    data?.data?.name,
    data?.data?.logo,
    data?.data?.title,
    data?.data?.message,
    data?.data?.rating,
    data?.data?.theme,
    data?.data?.questionOne,
    data?.data?.questionTwo,
    data?.data?.questionThree,
  ]);

  useEffect(() => {
    handleReset();
  }, [handleReset, refetch]);

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
            <div
              className={`"w-[40%] p-4 relative ${
                cardTheme === "dark" ? "dark" : "bg-white"
              }`}
            >
              <DialogDescription>
                <DialogTitle asChild>
                  <Badge
                    variant="primary"
                    className="absolute left-14 top-1 z-10 text-sm"
                  >
                    Live preview - Testimonial page
                  </Badge>
                </DialogTitle>
              </DialogDescription>
              <Card className="w-[360px] py-5 px-2 relative">
                <CardHeader>
                  <CardTitle className=" w-ful mx-auto">
                    {data?.data?.logo ? (
                      <Image
                        src={data.data.logo}
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
              </Card>
            </div>
          </div>

          {/* form */}
          <div className="w-[60%] p-4">
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
                          placeholder="Public URL is: localhost:3000/your-space"
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

                      <UploadButton
                        appearance={{
                          container: {
                            display: "flex",
                            alignItems: "flex-start",
                            marginTop: "0.5rem",
                          },
                        }}
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                          form.setValue("logo", res[0].url!);
                          console.log("Files: ", res);
                        }}
                        onUploadError={(error: Error) => {
                          form.setError("logo", {
                            type: "validate",
                            message: error.message,
                          });
                        }}
                      />

                      <FormControl>
                        <Input {...field} type="hidden" className="bg-white" />
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
                      <Label>
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
                      <Label>
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
                          <Label>Collect star ratings</Label>
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
                              <Label>Choose a theme</Label>
                              <FormControl>
                                <Switch
                                  checked={field.value === "Dark"}
                                  onCheckedChange={(checked: boolean) => {
                                    handleTheme(checked);
                                    field.onChange(checked ? "Dark" : "Light");
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
                <Button disabled={isPending} type="submit" className=" w-full">
                  {isPending ? <PulsatingDots /> : "Update Space"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateSpaceModal;
