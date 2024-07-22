"use client";

import Image from "next/image";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGetSingleReview } from "@/lib/hooks/useGetSingleReview";
import PulsatingDots from "../loading";
import { useState } from "react";
import { Textarea } from "../ui/textarea";

type SpaceReviewProps = {
  slug: string;
};

const SpaceReview = ({ slug }: SpaceReviewProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading } = useGetSingleReview(slug);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-10">
        <PulsatingDots />;
      </div>
    );
  }
  return (
    <section className="flex flex-col gap-y-12 items-center px-20 py-12  ">
      <div className="flex flex-col gap-y-5 items-center justify-center">
        <Image
          width={120}
          height={120}
          className="rounded-md"
          src="https://firebasestorage.googleapis.com/v0/b/testimonialto.appspot.com/o/spaces%2Fstuent-reviews%2Flogo?alt=media&token=9dec481d-6412-4fde-bd6e-e3270e2bb56b"
          alt="review image"
        />
        <p className="text-neutral-200 font-extrabold text-5xl">
          {data?.data?.title}
        </p>
        <p className="text-neutral-400">{data?.data?.message}</p>
      </div>
      <div>
        <p className="font-semibold text-neutral-200 text-xl">QUESTIONS</p>
        <div className="bg-blue-500 max-w-12 h-1 mt-1" />
        <ul className="flex flex-col text-sm mt-2 gap-y-1 text-neutral-400">
          <li>{data?.data?.questionOne}</li>
          <li>{data?.data?.questionTwo}</li>
          <li>{data?.data?.questionThree}</li>
        </ul>
      </div>
      <div className=" w-[20%]">
        <Button className="bg-[#25282C] hover:bg-neutral-700 flex flex-row gap-x-2 w-full">
          {" "}
          <span className="dark:text-neutral-200">
            <Pencil size={20} />
          </span>{" "}
          <span
            onClick={() => setIsOpen(true)}
            className="dark:text-neutral-200"
          >
            Send in text
          </span>{" "}
        </Button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild></DialogTrigger>
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
            <div className="flex flex-col text-neutral-500 gap-y-3 mt-3">
              <ReactStars count={5} size={24} activeColor="#ffd700" />
              <Textarea rows={4} placeholder="Type your message here." />
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="picture">Attach Image(s)</Label>
                <Input id="picture" type="file" />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">
                  Your Name <span className="text-red-500">*</span>
                </Label>
                <Input type="email" id="email" />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">
                  Your Email <span className="text-red-500">*</span>
                </Label>
                <Input type="email" id="email" />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="picture">Upload Your Photo</Label>
                <Input id="picture" type="file" />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-xs text-neutral-400   peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I give permission to use this testimonial across social
                  channels and other marketing efforts
                </label>
              </div>
            </div>
          </div>

          <DialogFooter>
            <div className="space-x-2">
              <DialogClose asChild>
                <Button
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
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default SpaceReview;
