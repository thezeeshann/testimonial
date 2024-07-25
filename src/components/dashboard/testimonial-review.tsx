"use client";

import Image from "next/image";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetSingleReview } from "@/lib/hooks/useGetSingleReview";
import PulsatingDots from "../loading";
import { useState } from "react";
import TestimonialForm from "./testimonial-form";

type SpaceReviewProps = {
  slug: string;
};

const TestimonialReview = ({ slug }: SpaceReviewProps) => {
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

      <TestimonialForm isOpen={isOpen} setIsOpen={setIsOpen} data={data} />
    </section>
  );
};

export default TestimonialReview;
