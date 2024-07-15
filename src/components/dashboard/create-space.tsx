"use client";

import spaceImage from "../../../public/no-message.18de8749.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CirclePlus, Flame, Pencil, Plus, Trash2 } from "lucide-react";
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
import { useEffect, useState } from "react";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useTheme } from "next-themes";

const CreateSpace = () => {
  const [isOpen, setIsOPen] = useState(false);
  const { setTheme, theme } = useTheme();
  const [header, setHeader] = useState("Header goes here...");
  const [message, setMessage] = useState("Your custom message goes here...");
  const [questions, setQuestions] = useState({
    questionOne: "Who are you / what are you working on?",
    questionTwo: "How has [our product / service] helped you?",
    questionThree: " What is the best thing about [our product / service]",
  });

  const { questionOne, questionTwo, questionThree } = questions;

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setQuestions((prevQuestions) => ({
      ...prevQuestions,
      [name]: value,
    }));
  };

  const handleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  useEffect(() => {
    if (header === "") {
      setHeader("Header goes here...");
    }
    if (message === "") {
      setMessage("Your custom message goes here...");
    }
    
  }, [header, message]);

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
            <div
              className={`"w-[40%] p-4 relative ${
                theme === "dark" ? "dark" : ""
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
                    <Flame size={55} color="#235BD5" strokeWidth={1.25} />
                  </CardTitle>
                  <CardDescription>
                    <div className="gap-y-4 mt-5 flex flex-col justify-center items-center">
                      <p className="text-3xl font-bold dark:text-neutral-200">
                        {header}
                      </p>
                      <p className="dark:text-neutral-200">{message}</p>
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
                      {/* <li>Who are you / what are you working on?</li>
                      <li>How has [our product / service] helped you?</li>
                      <li>
                        What is the best thing about [our product / service]
                      </li> */}
                      <li>{questionOne}</li>
                      <li>{questionTwo}</li>
                      <li>{questionThree}</li>
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
                    onChange={(e) => setHeader(e.target.value)}
                    id="name"
                    placeholder="would you like to give a shoutout of xyz?"
                    className="bg-white rounded-md"
                  />
                </div>
                <div className="space-y-1">
                  <Label>
                    Your custom message <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    placeholder="Write a wram message to you customer, and give them simple direaction on how to make the best testimonial."
                    id="message"
                  />
                </div>
                <div className="flex flex-col gap-y-2">
                  <p>Questions</p>
                  <div className="flex flex-col gap-y-2 ">
                    <div className="flex flex-row gap-x-2 items-center">
                      <Input
                        defaultValue="Who are you / what are you working on?"
                        name="questionOne"
                        value={questionOne}
                        onChange={handleChange}
                      />
                      <Trash2 className="text-neutral-200 cursor-pointer" />
                    </div>
                    <div className="flex items-center flex-row gap-x-2">
                      <Input
                        defaultValue="How has [out product / service] helped you?"
                        value={questionTwo}
                        onChange={handleChange}
                        name="questionTwo"
                      />
                      <Trash2 className="text-neutral-200 cursor-pointer" />
                    </div>
                    <div className="flex flex-row gap-x-2 items-center">
                      <Input
                        defaultValue="What is the best thing [our product / service]"
                        value={questionThree}
                        name="questionThree"
                        onChange={handleChange}
                      />
                      <Trash2 className="text-neutral-200 cursor-pointer" />
                    </div>
                  </div>
                  <div className="flex items-center flex-row gap-x-1">
                    <CirclePlus
                      className="text-neutral-400 cursor-pointer "
                      size={18}
                    />
                    <p className="text-sm">Add one (upto to 5) </p>
                  </div>
                </div>
                <div className="flex flex-row justify-between gap-x-7 items-center mt-2">
                  <div className="flex flex-col items-center gap-y-2">
                    <Label htmlFor="airplane-mode">Collect star ratings</Label>
                    <Switch id="airplane-mode" />
                  </div>
                  {theme && (
                    <div className="flex flex-col items-center gap-y-2">
                      <Label htmlFor="airplane-mode">Choose a theme</Label>
                      <Switch onCheckedChange={handleTheme} />
                    </div>
                  )}
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
