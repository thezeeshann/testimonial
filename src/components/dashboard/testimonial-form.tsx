"use client";

import { Checkbox } from "@/components/ui/checkbox";
import successImg from "../../../public/8Iv5lqKwKsZ2g.webp";
import ReactStars from "react-rating-stars-component";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Textarea } from "../ui/textarea";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { testimonialSchema } from "@/lib/validations/testimonial";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { testimonials } from "@/actions/testimonial";
import { useState } from "react";
import { UploadButton } from "@/app/api/uploadthing/uploadthing";
import PulsatingDots from "../loading";

type TestimonialFormProsp = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  data: any;
};

const TestimonialForm = ({ isOpen, setIsOpen, data }: TestimonialFormProsp) => {
  const [formSuccess, setFormSucess] = useState(false);

  const form = useForm<z.infer<typeof testimonialSchema>>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      name: "",
      message: "",
      email: "",
      image: "",
      rating: 5,
      photo: "",
      permission: false,
      spaceId: data.data.id,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: testimonials,
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

  const onSubmit = (values: z.infer<typeof testimonialSchema>) => {
    mutate(values);
    console.log(values, "testimonials form response");
  };

  return (
    <>
      <Dialog open={formSuccess} onOpenChange={setFormSucess}>
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
              Thank you!
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center">
            <p className="text-[12px]">
              Thank you so much for your shoutout! it means a ton for us
            </p>
            <span>🙏</span>
          </div>
          <DialogFooter className="px-2">
            <DialogClose asChild>
              <Button variant={"secondary"} className="w-full  rounded">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[450px] h-[90%] overflow-y-scroll">
          <DialogHeader>
            <DialogTitle>Write text testimonial to</DialogTitle>
            <DialogDescription>
              <Image
                width={70}
                height={70}
                className="rounded-md mt-2"
                src={data?.data?.logo}
                alt="review image"
              />
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col p-2">
            <ul className="text-sm text-neutral-500 list-disc">
              <li className="">{data?.data?.questionOne}</li>
              <li>{data?.data?.questionTwo}</li>
              <li>{data?.data?.questionThree}</li>
            </ul>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {/* <div className="flex flex-col text-neutral-500 mt-3"> */}
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ReactStars
                        value={field.value}
                        onChange={field.onChange}
                        count={5}
                        size={24}
                        activeColor="#ffd700"
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
                    <FormControl>
                      <Textarea
                        rows={4}
                        {...field}
                        placeholder="Type your message here."
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
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="title">Attach Image</Label>
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
                        form.setValue("image", res[0].url);
                        console.log("Files: ", res);
                      }}
                      onUploadError={(error: Error) => {
                        form.setError("image", {
                          type: "validate",
                          message: error.message,
                        });
                      }}
                    />
                    <FormControl>
                      <Input
                        type="hidden"
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="title">
                      Your Name <span className="text-red-500">*</span>
                    </Label>
                    <FormControl>
                      <Input {...field} className="bg-white" />
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
                    <Label htmlFor="title">
                      Your Email <span className="text-red-500">*</span>
                    </Label>
                    <FormControl>
                      <Input {...field} type="email" className="bg-white" />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="photo"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="title">Upload Your Photo</Label>

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
                        form.setValue("photo", res[0].url);
                        console.log("Files: ", res);
                      }}
                      onUploadError={(error: Error) => {
                        form.setError("photo", {
                          type: "validate",
                          message: error.message,
                        });
                      }}
                    />

                    <FormControl>
                      <Input
                        type="hidden"
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
                name="permission"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex flex-row items-start gap-x-3 ">
                        <Checkbox
                          id="terms"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <p className="text-xs text-neutral-400 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          I give permission to use this testimonial across
                          social channels and other marketing efforts
                        </p>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-x-2 mt-3 flex justify-end items-end">
                <DialogClose asChild>
                  <Button
                    variant={"secondary"}
                    className="rounded border-[1px]"
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button disabled={isPending} type="submit" className="rounded">
                  {isPending ? <PulsatingDots /> : "Send"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TestimonialForm;
