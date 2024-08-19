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
} from "@/components/ui/dialog";
import { useState } from "react";
import TestimonialReview from "./testimonial-review";

type SingleReviewProp = {
  slug: string;
};

const SingleReview = ({ slug }: SingleReviewProp) => {
  const [isOpen, setIsOpen] = useState(false);
  const [like, setLike] = useState(0);

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
              <div className="flex flex-row gap-x-2 mt-1 items-center cursor-pointer hover:bg-neutral-700 rounded-md py-2 px-[10px]">
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
          <div className="flex flex-col  w-[70%] gap-y-6">
            <aside className="border-2 border-red-500 text-neutral-200 bg-neutral-800 cursor-pointer hover:bg-neutral-700 h-[420px] py-[16px] px-[24px]  rounded-lg">
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
                  count={5}
                  size={24}
                  value={5}
                  activeColor="#ffd700"
                />
                <p className="text-neutral-200">
                  In publishing and graphic design, Lorem ipsum is a placeholder
                  text In publishing and graphic desi In publishing and graphic
                  design, Lorem ipsum is a placeholder text commonly us
                </p>
                <Image
                  width={120}
                  height={120}
                  className="rounded-md"
                  src="https://firebasestorage.googleapis.com/v0/b/testimonialto.appspot.com/o/spaces%2Fstuent-reviews%2Flogo?alt=media&token=9dec481d-6412-4fde-bd6e-e3270e2bb56b"
                  alt="review image"
                />
                <div className="flex flex-row items-center justify-between">
                  <div className="">
                    <span className="text-neutral-200 font-medium">Name</span>
                    <div className="flex flex-row items-center gap-x-2 mt-2">
                      <Image
                        width={30}
                        height={30}
                        className="rounded-md"
                        src="https://firebasestorage.googleapis.com/v0/b/testimonialto.appspot.com/o/spaces%2Fstuent-reviews%2Flogo?alt=media&token=9dec481d-6412-4fde-bd6e-e3270e2bb56b"
                        alt="review image"
                      />
                      <p className="text-neutral-200 font-medium">Jhondoe</p>
                    </div>
                  </div>
                  <div className="text-neutral-200 font-medium">
                    <span>Email</span>
                    <p>jhondoe@gmail.com</p>
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
          </div>
        </div>
      </section>
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
          <DialogFooter className="boder-2 border-red-500">
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
