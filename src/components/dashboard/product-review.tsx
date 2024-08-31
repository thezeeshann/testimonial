"use client";

import {
  Dot,
  Pencil,
  Link as LinkIcon,
  Heart,
  CodeXml,
  ArchiveRestore,
  FilePenLine,
  Copy,
  MoveLeft,
  Flame,
} from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import ReactStars from "react-rating-stars-component";
import { FaHeart } from "react-icons/fa";
import Link from "next/link";
import { inboxs } from "@/lib/data";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import TestimonialReview from "./testimonial-review";
import { useGetTestimonials } from "@/lib/hooks/useGetTestimonials";
import GenerateScript from "./generate-script";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { Checkbox } from "@/components/ui/checkbox";
import { useGetSingleReview } from "@/lib/hooks/useGetSingleReview";
import spaceImage from "../../../public/no-message.18de8749.svg";
import PulsatingDots from "../loading";

type SingleReviewProp = {
  slug: string;
};

const SingleReview = ({ slug }: SingleReviewProp) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isWallOpen, setIsWallOpen] = useState(false);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [like, setLike] = useState(0);
  const [steps, setSteps] = useState(false);
  const { data, isLoading } = useGetTestimonials();
  const { data: singleSpace } = useGetSingleReview(slug);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-10">
        <PulsatingDots />
      </div>
    );
  }

  return (
    <>
      <section className="flex flex-col gap-y-12 items-center px-20 py-6 min-h-screen">
        <div className="flex flex-col gap-y-6 w-full">
          <hr className=" w-full border-neutral-800" />
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row items-center gap-x-3">
              <Image
                width={80}
                height={80}
                className="rounded-md"
                src="https://firebasestorage.googleapis.com/v0/b/testimonialto.appspot.com/o/spaces%2Fstuent-reviews%2Flogo?alt=media&token=9dec481d-6412-4fde-bd6e-e3270e2bb56b"
                alt="review image"
              />
              <div>
                <p className="text-neutral-200 font-bold text-3xl">{slug} </p>
                <span className="text-neutral-400 text-sm">
                  Space public URL:{" "}
                  <Link
                    href={`http://localhost:3000/dashboard/${slug}`}
                    target="_blank"
                  >
                    <span className="text-neutral-400 text-sm underline cursor-pointer">
                      {`http://localhost:300/dashboard/${slug}`}
                    </span>
                  </Link>
                </span>
              </div>
            </div>
            <div className="">
              <Button className="flex text-black flex-row gap-x-2 bg-white rounded-sm">
                {" "}
                <Pencil size={20} /> Edit space
              </Button>
            </div>
          </div>
          <hr className=" w-full border-neutral-800" />
        </div>
        <div className="flex flex-row justify-between gap-x-8 mt-5 w-full">
          <div className=" text-neutral-200 w-[30%] flex flex-col gap-y-6 ">
            <div className="flex flex-col gap-y-2">
              <p className="text-neutral-400 font-bold">INBOX</p>
              {inboxs.map((inbox) => (
                <div
                  key={inbox.id}
                  className="flex flex-row gap-x-1 items-center cursor-pointer hover:bg-neutral-700 rounded-md p-[2px]"
                >
                  <span>
                    <Dot color={inbox.color} size={32} />
                  </span>
                  <p className="text-neutral-200 font-medium"> {inbox.name}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-y-1">
              <p className="text-neutral-400 font-bold">SPACE SETTINGS</p>
              <div
                onClick={() => setIsWallOpen(true)}
                className="flex flex-row gap-x-2 mt-1 items-center cursor-pointer hover:bg-neutral-700 rounded-md py-2 px-[10px]"
              >
                <span>
                  <Heart size={18} />
                </span>
                <p className="text-neutral-200 font-medium">Wall of Love</p>
              </div>
              <div className="flex flex-row gap-x-2 mt-1 items-center cursor-pointer hover:bg-neutral-700 rounded-md py-2 px-[10px]">
                <span>
                  {" "}
                  <CodeXml size={18} />
                </span>
                <p className="text-neutral-200 font-medium">
                  Single testimonial
                </p>
              </div>
              <div
                onClick={() => setIsOpen(true)}
                className="flex flex-row gap-x-2 mt-1 items-center cursor-pointer hover:bg-neutral-700 rounded-md py-2 px-[10px]"
              >
                <span>
                  <ArchiveRestore size={18} />
                </span>
                <p className="text-neutral-200 font-medium">
                  Collecting widget
                </p>
              </div>
              <Link
                href={`http://localhost:3000/dashboard/${slug}`}
                target="_blank"
              >
                <div className="flex flex-row gap-x-2 mt-1 items-center cursor-pointer hover:bg-neutral-700 rounded-md py-2 px-[10px]">
                  <span>
                    {" "}
                    <LinkIcon size={18} />
                  </span>
                  <p className="text-neutral-200 font-medium">
                    Public landing page
                  </p>
                </div>
              </Link>
              <div className="flex flex-row gap-x-2 mt-1 items-center cursor-pointer hover:bg-neutral-700 rounded-md py-2 px-[10px]">
                <span>
                  {" "}
                  <FilePenLine size={18} />
                </span>
                <p className="text-neutral-200 font-medium">Edit the space</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col  w-[70%] gap-y-6 ">
            {data?.data?.length! > 0 ? (
              <>
                {data?.data?.map((testimonial) => (
                  <aside
                    key={testimonial.id}
                    className="  text-neutral-200 bg-neutral-800 cursor-pointer hover:bg-neutral-700 h-[420px] py-[16px] px-[24px]  rounded-lg"
                  >
                    <div className=" flex flex-row items-center justify-between">
                      <div className="bg-[#DBEAFE] rounded-full w-[70px] flex items-center justify-center px-2 py-[3px]">
                        <span className="text-blue-500 font-semibold text-center">
                          Text
                        </span>
                      </div>

                      {like === 1 ? (
                        <FaHeart color="#ef4444" size={25} />
                      ) : (
                        <Heart
                          onClick={() => setLike(like + 1)}
                          size={25}
                          color="#ef4444"
                        />
                      )}
                    </div>
                    <div className="flex flex-col gap-y-3">
                      <ReactStars
                        size={24}
                        value={testimonial.rating}
                        activeColor="#ffd700"
                      />
                      <p className="text-neutral-200">{testimonial.message}</p>
                      <Image
                        width={120}
                        height={120}
                        className="rounded-md"
                        src="https://firebasestorage.googleapis.com/v0/b/testimonialto.appspot.com/o/spaces%2Fstuent-reviews%2Flogo?alt=media&token=9dec481d-6412-4fde-bd6e-e3270e2bb56b"
                        alt="review image"
                      />
                      <div className="flex flex-row items-center justify-between">
                        <div className="">
                          <span className="text-neutral-200 font-medium">
                            Name
                          </span>
                          <div className="flex flex-row items-center gap-x-2 mt-2">
                            <Image
                              width={30}
                              height={30}
                              className="rounded-md"
                              src="https://firebasestorage.googleapis.com/v0/b/testimonialto.appspot.com/o/spaces%2Fstuent-reviews%2Flogo?alt=media&token=9dec481d-6412-4fde-bd6e-e3270e2bb56b"
                              alt="review image"
                            />
                            <p className="text-neutral-200 font-medium">
                              {testimonial.name}
                            </p>
                          </div>
                        </div>
                        <div className="text-neutral-200 font-medium">
                          <span>Email</span>
                          <p>{testimonial.email}</p>
                        </div>
                        <div></div>
                      </div>
                      <div>
                        <span className="text-neutral-200 font-medium">
                          Submitted At
                        </span>
                        <p className="text-neutral-200 font-medium">
                          Jul 14,2024, 8:47:01 PM
                        </p>
                      </div>
                    </div>
                  </aside>
                ))}
              </>
            ) : (
              <div className="flex flex-col items-center gap-y-5 mt-24  ">
                <Image
                  src={spaceImage}
                  width={250}
                  height={250}
                  alt="space image"
                />
                <p className="text-neutral-400 text-lg">No testimonial yet</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Dialog open={isWallOpen} onOpenChange={setIsWallOpen}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="max-w-[65%] h-[90%] overflow-y-scroll overflow-x-hidden">
          <DialogHeader>
            <DialogTitle
              className={`${
                steps === true ? "w-[50%]" : ""
              } flex flex-row items-center justify-center gap-x-4`}
            >
              {steps && (
                <MoveLeft
                  className="cursor-pointer"
                  onClick={() => setSteps(false)}
                />
              )}
              <p className="text-center text-3xl font-bold">
                {" "}
                Embed a Wall of Love
              </p>
            </DialogTitle>
            <DialogDescription>
              {steps === true ? (
                <div className=" w-[50%]">
                  <div className="flex justify-center mt-5 flex-row items-center gap-x-3 ">
                    <p className="text-blue-800 font-semibold bg-neutral-100 px-3 py-1 rounded-full">
                      Step 2
                    </p>
                    <p className="font-semibold text-lg">
                      Customize your Wall of Love
                    </p>
                  </div>
                  <div className="flex flex-row items-center justify-center mt-3">
                    <p>Masonry - fixed</p>
                  </div>
                  <GenerateScript
                    theme="light"
                    spaceName={singleSpace?.data?.name!}
                  />
                  <div className="flex flex-col mt-5 gap-y-4">
                    <Button
                      variant={"secondary"}
                      className="rounded max-w-max border-[1px]"
                    >
                      Basic
                    </Button>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <label
                        htmlFor="terms"
                        className="text-sm text-black font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Enable show more button for long text
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <label
                        htmlFor="terms"
                        className="text-sm text-black font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Hide the date
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <label
                        htmlFor="terms"
                        className="text-sm text-black font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Hide source icons
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <label
                        htmlFor="terms"
                        className="text-sm text-black font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Randomize the order on page refresh
                      </label>
                    </div>
                  </div>
                  <div className="flex flex-row items-center justify-between mt-5 ">
                    <p className="font-semibold text-lg text-black">
                      Live preview
                    </p>
                    {isCardOpen === true ? (
                      <IoMdArrowDropup
                        onClick={() => setIsCardOpen(false)}
                        size={32}
                        className="cursor-pointer"
                      />
                    ) : (
                      <IoMdArrowDropdown
                        onClick={() => setIsCardOpen(true)}
                        size={32}
                        className="cursor-pointer"
                      />
                    )}
                  </div>

                  {isCardOpen && (
                    <>
                      <div className="mt-5 border-[1px] w-[350px] mx-auto p-4 rounded-lg ">
                        <div className="flex flex-row items-center gap-x-3">
                          <Image
                            width={80}
                            height={80}
                            className="rounded-md"
                            src="https://firebasestorage.googleapis.com/v0/b/testimonialto.appspot.com/o/spaces%2Fstuent-reviews%2Flogo?alt=media&token=9dec481d-6412-4fde-bd6e-e3270e2bb56b"
                            alt="review image"
                          />
                          <p className="font-semibold text-black">Jhon Doe</p>
                        </div>
                        <div className="flex flex-col mt-3 gap-y-2">
                          <ReactStars
                            size={24}
                            value={4}
                            activeColor="#ffd700"
                          />
                          <Image
                            width={1000}
                            height={1000}
                            className="rounded-md"
                            src="https://firebasestorage.googleapis.com/v0/b/testimonialto.appspot.com/o/spaces%2Fstuent-reviews%2Flogo?alt=media&token=9dec481d-6412-4fde-bd6e-e3270e2bb56b"
                            alt="review image"
                          />
                          <p>
                            In publishing and graphic design, Lorem ipsum is a
                            placeholder text In publishing and graphic desi In
                            publishing and graphic design, Lorem ipsum is a
                            placeholder text commonly us
                          </p>
                          <p>Jul 14, 2024</p>
                        </div>
                      </div>
                      <div className="flex flex-row gap-x-1 cursor-pointer justify-center items-center mt-5">
                        <p className="font-semibold text-xl text-black">
                          Testimonial
                        </p>
                        <Flame size={28} color="#235BD5" strokeWidth={2.25} />
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <>
                  <div className="flex justify-center mt-5 flex-row items-center gap-x-3 ">
                    <p className="text-blue-800 font-semibold bg-neutral-100 px-3 py-1 rounded-full">
                      Step 1
                    </p>
                    <p className="font-semibold text-lg">Choose a layout </p>
                  </div>
                  <div
                    onClick={() => setSteps(true)}
                    className=" mt-5 cursor-pointer mx-auto flex flex-col items-center justify-center gap-y-2 border-[1px] w-[250px]  rounded "
                  >
                    <Image
                      width={250}
                      height={250}
                      src="https://firebasestorage.googleapis.com/v0/b/testimonialto.appspot.com/o/assets%2Ffixed-masonry-grid.png?alt=media&token=c75b8785-344a-4bd8-96dd-79592466d78e"
                      alt="testimonial image"
                    />
                    <p>Masonry - fixed</p>
                  </div>
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          {steps && (
            <DialogFooter className="w-[50%]  mt-10 ">
              <DialogClose asChild>
                <Button
                  className="w-[50%] rounded border-[1px]"
                  variant={"secondary"}
                >
                  Close
                </Button>
              </DialogClose>
              <Button className="w-[50%] rounded">Copy</Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-[65%] h-[90%] overflow-y-scroll">
          <DialogHeader>
            <DialogTitle className="text-center text-3xl font-bold">
              Add collecting widget to your own website
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div>
            <TestimonialReview slug={slug} />
          </div>
          <DialogFooter className="">
            <div className="flex flex-row items-center justify-between">
              <Button className="w-[50%]" variant={"secondary"}>
                Close
              </Button>
              <Button
                type="submit"
                className="flex flex-row w-[50% items-center gap-x-1"
              >
                <span>
                  <Copy size={16} />
                </span>
                <span>Copy Code</span>
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SingleReview;
