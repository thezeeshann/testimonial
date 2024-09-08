"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import singleTestimonial from "../../../public/single-text-testimonial.png";
import Link from "next/link";

type SingleTestimonialProp = {
  isSingleTestimonialOpen: boolean;
  setIsSingleTestimonialOpen: (value: boolean) => void;
};

const SingleTestimonialModal = ({
  isSingleTestimonialOpen,
  setIsSingleTestimonialOpen,
}: SingleTestimonialProp) => {
  return (
    <Dialog
      open={isSingleTestimonialOpen}
      onOpenChange={setIsSingleTestimonialOpen}
    >
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-center">
            Embed a single testimonial
          </DialogTitle>
          <DialogDescription className="text-center">
            Aside from Wall of Love, you have the option to easily embed a video
            or text testimonial to your website. Read our instructions here.
          </DialogDescription>
        </DialogHeader>
        <Link
          href={
            "https://help.testimonial.to/en/articles/6939051-embed-a-single-text-testimonial"
          }
          target="_blank"
        >
          <div className="cursor-pointer hover:shadow-lg w-[350px] mx-auto rounded-md flex flex-col items-center justify-center border-[1px] gap-y-4 ">
            <Image
              src={singleTestimonial}
              alt="Testimonial Image"
              width={350}
              height={350}
            />
            <p className="font-semibold mb-1">Text Testimonial</p>
          </div>
        </Link>
      </DialogContent>
    </Dialog>
  );
};

export default SingleTestimonialModal;
