"use client";

import spaceImage from "../../../public/no-message.18de8749.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Flame, Pencil, Plus } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
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

const CreateSpace = () => {
  const [isOpen, setIsOPen] = useState(false);

  return (
    <section className="flex flex-col items-center px-20 py-12">
      <div className="w-full flex flex-row justify-between items-center ">
        <p className="text-neutral-200 font-bold text-2xl">🚀 Spaces</p>
        <Button
          onClick={() => setIsOPen(true)}
          className="flex flex-row items-center gap-x-2"
        >
          <Plus size={22} /> <span>Create a new space</span>
        </Button>
      </div>

      <div className="flex flex-col gap-y-5 mt-24  ">
        <Image src={spaceImage} width={250} height={250} alt="space image" />
        <p className="text-neutral-400 text-lg">No space yet, add a new one?</p>
      </div>

      <Dialog onOpenChange={setIsOPen} open={isOpen}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="max-w-[80%] h-[90%] overflow-y-scroll">
          <div className="flex w-full justify-between items-start flex-row ">
            <div className="w-[40%] p-4 relative">
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
                    <Flame size={55} color="#235BD5" strokeWidth={1.25} />
                  </CardTitle>
                  <CardDescription>
                    <div className="gap-y-4 mt-5 flex flex-col justify-center items-center">
                      <p className="text-3xl font-bold">asdfasdf</p>
                      <p>Your custom message goes here...</p>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <p className="font-semibold text-xl">QUESTIONS</p>
                    <div className="bg-blue-500 max-w-12 h-1 mt-1" />
                    <ul className="flex flex-col text-sm mt-2 gap-y-1">
                      <li>Who are you / what are you working on?</li>
                      <li>How has [our product / service] helped you?</li>
                      <li>
                        What is the best thing about [our product / service]
                      </li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button className="bg-black flex flex-row gap-x-2 w-full">
                    {" "}
                    <span>
                      <Pencil size={20} />
                    </span>{" "}
                    <span>Send in text</span>{" "}
                  </Button>
                </CardFooter>
              </Card>
            </div>
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
              <div className="flex flex-col gap-y-3">
                <div className="space-y-1">
                  <Label>
                    Space name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    placeholder="Public URL is: testimonial.to/your-space"
                    className="bg-white rounded-md"
                  />
                </div>
                <div className="space-y-1">
                  <Label>
                    Space logo <span className="text-red-500">*</span>
                  </Label>

                  <Input id="picture" type="file" />
                </div>
                <div className="space-y-1">
                  <Label>
                    Header title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    placeholder="Public URL is: testimonial.to/your-space"
                    className="bg-white rounded-md"
                  />
                </div>
                <div className="space-y-1">
                  <Label>
                    Your custom message <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    rows={4}
                    placeholder="Write a wram message to you customer, and give them simple direaction on how to make the best testimonial."
                    id="message"
                  />
                </div>
                <div>
                  <p>Questions</p>
                </div>
                <div className="flex flex-row justify-between gap-x-7 items-center">
                  <div className="flex flex-col items-center gap-y-2">
                    <Label htmlFor="airplane-mode">Collect star ratings</Label>
                    <Switch id="airplane-mode" />
                  </div>
                  <div className="flex flex-col items-center gap-y-2">
                    <Label htmlFor="airplane-mode">Choose a theme</Label>
                    <Switch id="airplane-mode" />
                  </div>
                  <div></div>
                </div>

                <DialogFooter>
                  <Button className="text-center w-full" type="submit">
                    Create new Space
                  </Button>
                </DialogFooter>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default CreateSpace;
