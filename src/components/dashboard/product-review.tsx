"use client";
import {  Pencil } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";

type SingleReviewProp = {
  slug: string;
};

const SingleReview = ({ slug }: SingleReviewProp) => {
  return (
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
                <Link href={`http://localhost:3000/dashboard/${slug}`} target="_blank">
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
    </section>
  );
};

export default SingleReview;
