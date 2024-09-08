"use client";

import {
  ArchiveRestore,
  CodeXml,
  Dot,
  FilePenLine,
  Heart,
  LinkIcon,
} from "lucide-react";
import Link from "next/link";

type ReviewSidebarProp = {
  slug: string;
  setIsTestimonialCradOpen: (value: boolean) => void;
  setIsWallOpen: (value: boolean) => void;
  setIsOpen: (value: boolean) => void;
  setIsSingleTestimonialOpen: (value: boolean) => void;
};

const ReviewSidebar = ({
  slug,
  setIsTestimonialCradOpen,
  setIsWallOpen,
  setIsOpen,
  setIsSingleTestimonialOpen,
}: ReviewSidebarProp) => {
  return (
    <div className=" text-neutral-200 w-[30%] flex flex-col gap-y-6">
      <div className="flex flex-col gap-y-2">
        <p className="text-neutral-400 font-bold">INBOX</p>
        <div
          onClick={() => {
            setIsTestimonialCradOpen(false);
            console.log("text is false");
          }}
          className="flex flex-row gap-x-1 items-center cursor-pointer hover:bg-neutral-700 rounded-md p-[2px]"
        >
          <span>
            <Dot color={"#a855f7"} size={32} />
          </span>
          <p className="text-neutral-200 font-medium">Text</p>
        </div>
        <div
          onClick={() => {
            setIsTestimonialCradOpen(true);
            console.log("like is true");
          }}
          className="flex flex-row gap-x-1 items-center cursor-pointer hover:bg-neutral-700 rounded-md p-[2px]"
        >
          <span>
            <Dot color={"#ef4444"} size={32} />
          </span>
          <p className="text-neutral-200 font-medium">Like</p>
        </div>
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
        <div
          onClick={() => setIsSingleTestimonialOpen(true)}
          className="flex flex-row gap-x-2 mt-1 items-center cursor-pointer hover:bg-neutral-700 rounded-md py-2 px-[10px]"
        >
          <span>
            {" "}
            <CodeXml size={18} />
          </span>
          <p className="text-neutral-200 font-medium">Single testimonial</p>
        </div>
        <div
          onClick={() => setIsOpen(true)}
          className="flex flex-row gap-x-2 mt-1 items-center cursor-pointer hover:bg-neutral-700 rounded-md py-2 px-[10px]"
        >
          <span>
            <ArchiveRestore size={18} />
          </span>
          <p className="text-neutral-200 font-medium">Collecting widget</p>
        </div>
        <Link href={`http://localhost:3000/dashboard/${slug}`} target="_blank">
          <div className="flex flex-row gap-x-2 mt-1 items-center cursor-pointer hover:bg-neutral-700 rounded-md py-2 px-[10px]">
            <span>
              {" "}
              <LinkIcon size={18} />
            </span>
            <p className="text-neutral-200 font-medium">Public landing page</p>
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
  );
};

export default ReviewSidebar;
