"use client";

import Image from "next/image";
import { Pencil } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SpaceReview = () => {
  const [isOPen, setIsOpen] = useState(false);

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
        <p className="text-neutral-200 font-extrabold text-5xl">Testimonals</p>
        <p className="text-neutral-400">testimonial message</p>
      </div>
      <div>
        <p className="font-semibold text-neutral-200 text-xl">QUESTIONS</p>
        <div className="bg-blue-500 max-w-12 h-1 mt-1" />
        <ul className="flex flex-col text-sm mt-2 gap-y-1 text-neutral-400">
          <li>Who are you / what are you working on?</li>
          <li>How has [our product / service] helped you?</li>
          <li>What is the best thing about [our product / service]</li>
        </ul>
      </div>
      <div className=" w-[20%]">
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-[#25282C] hover:bg-neutral-700 flex flex-row gap-x-2 w-full"
        >
          {" "}
          <span className="dark:text-neutral-200">
            <Pencil size={20} />
          </span>{" "}
          <span className="dark:text-neutral-200">Send in text</span>{" "}
        </Button>
      </div>

      <Dialog open={isOPen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>Write text testimonial to</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" value="Pedro Duarte" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input id="username" value="@peduarte" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default SpaceReview;
