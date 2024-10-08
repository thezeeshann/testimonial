"use client";

import { Pencil, Copy, MoveLeft, Flame } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import ReactStars from "react-rating-stars-component";
import Link from "next/link";
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
import { useState } from "react";
import TestimonialReview from "./testimonial-review";
import { useGetTestimonials } from "@/lib/hooks/useGetTestimonials";
import GenerateScript from "./generate-script";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { Checkbox } from "@/components/ui/checkbox";
import { useGetSingleReview } from "@/lib/hooks/useGetSingleReview";
import spaceImage from "../../../public/no-message.18de8749.svg";
import PulsatingDots from "../loading";
import { deleteTestimonials } from "@/actions/testimonial";
import { toast } from "sonner";
import DeleteTestimonialsModal from "../modals/delete-testimonial";
import SingleTestimonialModal from "../modals/single-testimonial";
import ReviewSidebar from "./_components/review-sidebar";
import TestimonialCard from "./_components/testimonial-card";
import UpdateSpaceModal from "../modals/update-space";
import CollectingWidgetModal from "../modals/collecting-widget";

type SingleReviewProp = {
  slug: string;
};

const SingleReview = ({ slug }: SingleReviewProp) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isWallOpen, setIsWallOpen] = useState(false);
  console.log("wall", isWallOpen);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isSingleTestimonialOpen, setIsSingleTestimonialOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [isLiked, setIsLiked] = useState({});
  const [steps, setSteps] = useState(false);
  const { data, isLoading } = useGetTestimonials();
  const { data: singleSpace, refetch } = useGetSingleReview(slug);
  const [isTestimonialCradOpen, setIsTestimonialCradOpen] = useState(false);

  const hasLikedTestimonials = Object.values(isLiked).some(
    (like) => like === true
  );

  const handleDeleteTestimonial = async (testimonialId: string) => {
    const response = await deleteTestimonials(testimonialId);
    toast.success(response.success);
    setIsDeleteOpen(false);
    refetch();
  };

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
                src={
                  singleSpace?.data?.logo ||
                  "https://firebasestorage.googleapis.com/v0/b/testimonialto.appspot.com/o/spaces%2Fstuent-reviews%2Flogo?alt=media&token=9dec481d-6412-4fde-bd6e-e3270e2bb56b"
                }
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
              <Button
                onClick={() => setIsEditOpen(true)}
                variant={"secondary"}
                className="flex text-black flex-row gap-x-2 rounded-sm"
              >
                {" "}
                <Pencil size={20} /> Edit space
              </Button>
            </div>
          </div>
          <hr className=" w-full border-neutral-800" />
        </div>
        <div className="flex flex-row justify-between gap-x-8 mt-5 w-full">
          <ReviewSidebar
            slug={slug}
            setIsTestimonialCradOpen={setIsTestimonialCradOpen}
            setIsWallOpen={setIsWallOpen}
            setIsOpen={setIsOpen}
            setIsSingleTestimonialOpen={setIsSingleTestimonialOpen}
            setIsEditOpen={setIsEditOpen}
          />
          <div className="flex flex-col w-[70%] gap-y-6 ">
            {isTestimonialCradOpen === true && !hasLikedTestimonials ? (
              <>
                <div className="flex flex-col items-center gap-y-5  ">
                  <Image
                    src={spaceImage}
                    width={280}
                    height={280}
                    alt="space image"
                  />
                  <p className="text-neutral-400 text-lg">
                    No liked testimonial
                  </p>
                </div>
              </>
            ) : (
              <>
                <TestimonialCard
                  data={data || undefined} // Providing a default value when data is undefined
                  isLiked={isLiked}
                  setIsLiked={setIsLiked}
                  setIsDeleteOpen={setIsDeleteOpen}
                  setDeleteId={setDeleteId}
                />
              </>
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

                  {isCardOpen &&
                    (isLiked === true ? (
                      <>
                        {data?.data?.map((testimonial) => (
                          <div
                            key={testimonial.id}
                            className="mt-5 border-[1px] w-[350px] mx-auto p-4 rounded-lg "
                          >
                            <div className="flex flex-row items-center gap-x-3">
                              <Image
                                width={50}
                                height={50}
                                className="rounded-full"
                                src={testimonial.photo!}
                                alt="review image"
                              />
                              <p className="font-semibold text-black">
                                {testimonial.name}
                              </p>
                            </div>
                            <div className="flex flex-col mt-3 gap-y-2">
                              <ReactStars
                                size={24}
                                value={testimonial.rating}
                                activeColor="#ffd700"
                              />
                              <Image
                                width={1000}
                                height={1000}
                                className="rounded-md"
                                src={testimonial.image!}
                                alt="review image"
                              />
                              <p>{testimonial.message}</p>
                              <p>
                                {new Date(
                                  testimonial.createdAt
                                ).toLocaleDateString("en-Us", {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                })}
                              </p>
                            </div>
                          </div>
                        ))}
                        <div className="flex flex-row gap-x-1 cursor-pointer justify-center items-center mt-5">
                          <p className="font-semibold text-xl text-black">
                            Testimonial
                          </p>
                          <Flame size={28} color="#235BD5" strokeWidth={2.25} />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex mt-5 flex-col items-center gap-y-5  ">
                          <Image
                            src={spaceImage}
                            width={230}
                            height={230}
                            alt="space image"
                          />
                          <p className=" font-semibold text-lg">
                            No testimonials found
                          </p>
                        </div>
                      </>
                    ))}
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
              <Button className="w-[50%] rounded flex flex-row  items-center gap-x-1">
                <span>
                  <Copy size={16} />
                </span>
                Copy
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>

      <CollectingWidgetModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        slug={slug}
      />

      <SingleTestimonialModal
        isSingleTestimonialOpen={isSingleTestimonialOpen}
        setIsSingleTestimonialOpen={setIsSingleTestimonialOpen}
      />

      <DeleteTestimonialsModal
        isDeleteOpen={isDeleteOpen}
        setIsDeleteOpen={setIsDeleteOpen}
        deleteId={deleteId}
        handleDeleteTestimonial={handleDeleteTestimonial}
      />

      <UpdateSpaceModal
        isEditOpen={isEditOpen}
        setIsEditOpen={setIsEditOpen}
        slug={slug}
      />
    </>
  );
};

export default SingleReview;
