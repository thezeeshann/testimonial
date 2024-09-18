"use client";

import Image from "next/image";
import spaceImage from "../../../../public/no-message.18de8749.svg";
import { Heart, Trash2 } from "lucide-react";
import ReactStars from "react-rating-stars-component";
import { FaHeart } from "react-icons/fa";
import { toast } from "sonner";
import { useEffect } from "react";
import { Testimonial } from "@/types";

type TestimonialData = {
  data?: Testimonial[];
};

type TestimonialCardProps = {
  data: TestimonialData;
  isLiked: boolean;
  setIsLiked: (value: boolean) => void;
  setIsDeleteOpen: (value: boolean) => void;
  setDeleteId: (value: string) => void;
};

const TestimonialCard = ({
  data = { data: [] },
  isLiked,
  setIsLiked,
  setIsDeleteOpen,
  setDeleteId,
}: TestimonialCardProps) => {
  useEffect(() => {
    const storedLikes = JSON.parse(localStorage.getItem("likes")) || {};
    setIsLiked(storedLikes);
  }, []);

  // Function to handle like/unlike actions
  const handleLikeClick = (id) => {
    setIsLiked((prevLikes) => {
      const updatedLikes = { ...prevLikes, [id]: !prevLikes[id] };
      localStorage.setItem("likes", JSON.stringify(updatedLikes)); // Save to localStorage
      return updatedLikes;
    });
  };

  return (
    <>
      {data?.data?.length! > 0 ? (
        <>
          {data?.data?.map((testimonial) => (
            <aside
              key={testimonial.id}
              className="text-neutral-200 bg-neutral-800  hover:bg-neutral-700 h-[450px] py-[16px] px-[24px]  rounded-lg"
            >
              <div className=" flex flex-row items-center justify-between">
                <div className="bg-[#DBEAFE] rounded-full w-[70px] flex items-center justify-center px-2 py-[3px]">
                  <span className="text-blue-500 font-semibold text-center">
                    Text
                  </span>
                </div>

                {isLiked[testimonial.id] ? (
                  <FaHeart
                    className="cursor-pointer"
                    onClick={() => {
                      handleLikeClick(testimonial.id);
                      toast.success("Removed from wall of love");
                    }}
                    color="#ef4444"
                    size={25}
                  />
                ) : (
                  <Heart
                    className="cursor-pointer"
                    onClick={() => {
                      handleLikeClick(testimonial.id);
                      toast.success("Added to the wall of love");
                    }}
                    size={25}
                    color="#ef4444"
                  />
                )}
              </div>
              <div className="flex flex-col gap-y-3">
                <ReactStars
                  edit={false}
                  size={24}
                  value={testimonial.rating}
                  activeColor="#ffd700"
                />
                <p className="text-neutral-200">{testimonial.message}</p>
                <Image
                  width={120}
                  height={120}
                  className="rounded-md"
                  src={
                    testimonial.image! ||
                    "https://firebasestorage.googleapis.com/v0/b/testimonialto.appspot.com/o/spaces%2Fstuent-reviews%2Flogo?alt=media&token=9dec481d-6412-4fde-bd6e-e3270e2bb56b"
                  }
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
                        src={
                          testimonial.photo! ||
                          "https://firebasestorage.googleapis.com/v0/b/testimonialto.appspot.com/o/spaces%2Fstuent-reviews%2Flogo?alt=media&token=9dec481d-6412-4fde-bd6e-e3270e2bb56b"
                        }
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
                <div className="flex flex-row items-center justify-between ">
                  <div>
                    <span className="text-neutral-200 font-medium">
                      Submitted At
                    </span>
                    <p className="text-neutral-200 font-medium">
                      {new Date(testimonial.createdAt).toLocaleDateString(
                        "en-Us",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </p>
                  </div>
                  <span>
                    <Trash2
                      onClick={() => {
                        setIsDeleteOpen(true);
                        setDeleteId(testimonial.id);
                      }}
                      className="cursor-pointer"
                    />
                  </span>
                </div>
              </div>
            </aside>
          ))}
        </>
      ) : (
        <div className="flex flex-col items-center gap-y-5 mt-24  ">
          <Image src={spaceImage} width={250} height={250} alt="space image" />
          <p className="text-neutral-400 text-lg">No testimonial yet</p>
        </div>
      )}
    </>
  );
};

export default TestimonialCard;
