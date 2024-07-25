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
import { Link } from "lucide-react";
import { useState } from "react";

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
      email: "",
      image: "",
      message: "",
      name: "",
      permission: false,
      photo: "",
      rating: 0,
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
    console.log(values);
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
                src="https://firebasestorage.googleapis.com/v0/b/testimonialto.appspot.com/o/spaces%2Fstuent-reviews%2Flogo?alt=media&token=9dec481d-6412-4fde-bd6e-e3270e2bb56b"
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

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col text-neutral-500 mt-3">
                  <div className="text-lg">
                    <ReactStars count={5} size={24} activeColor="#ffd700" />
                  </div>
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
                        <Label htmlFor="title">Attach Image(s)</Label>
                        <FormControl>
                          <Input
                            type="file"
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
                          <Input {...field} className="bg-white" />
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
                        <FormControl>
                          <Input
                            type="file"
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
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" {...form.register("permission")} />
                    <label
                      htmlFor="terms"
                      className="text-xs text-neutral-400   peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I give permission to use this testimonial across social
                      channels and other marketing efforts
                    </label>
                  </div>
                </div>
              </form>
            </Form>
          </div>

          <DialogFooter>
            <div className="space-x-2">
              <DialogClose asChild>
                <Button
                  disabled={isPending}
                  type="submit"
                  variant={"secondary"}
                  className="rounded border-[1px]"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" className="rounded">
                Save
              </Button>
            </div>
          </DialogFooter>

                    {/* form submit checking remaining */}

        </DialogContent>
      </Dialog>
    </>
  );
};

export default TestimonialForm;
