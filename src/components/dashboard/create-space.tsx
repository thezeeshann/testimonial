"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import SpaceForm from "./space-form";
import { IoMdSettings } from "react-icons/io";
import PulsatingDots from "../loading";
import Link from "next/link";
import { Session } from "next-auth";
import { useGetSpace } from "@/lib/hooks/useGetReview";
import spaceImage from "../../../public/no-message.18de8749.svg";
import { useGetTestimonials } from "@/lib/hooks/useGetTestimonials";
import { deleteSpace } from "@/actions/space";
import DeleteSpace from "../modals/delete-space";
import { toast } from "sonner";

const CreateSpace = ({ user }: Session) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isSpaceId, setSpaceId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading, refetch } = useGetSpace(user.id);
  const { data: testimonials } = useGetTestimonials();

  const handleDeleteSpace = async (spaceId: string) => {
    const response = await deleteSpace(spaceId);
    toast.success(response.success);
    setIsDeleteOpen(false);
    refetch();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-10">
        <PulsatingDots />;
      </div>
    );
  }

  return (
    <section className="flex flex-col px-20 py-12 min-h-screen">
      <div className="w-full flex flex-row justify-between items-center ">
        <p className="text-neutral-200 font-bold text-2xl">🚀 Spaces</p>
        <Button
          onClick={() => setIsOpen(true)}
          className="flex flex-row items-center gap-x-2"
        >
          <Plus size={22} /> <span>Create a new space</span>
        </Button>
      </div>

      {data?.data?.length! > 0 ? (
        <div className="flex flex-row items-start justify-between flex-wrap ">
          {data!.data?.map((space) => (
            <div
              key={space?.id}
              className="bg-[#25282C]  w-[310px] h-[80px] border-2 border-neutral-700 my-16 rounded flex "
            >
              <Image
                src={
                  space.logo ||
                  "https://firebasestorage.googleapis.com/v0/b/testimonialto.appspot.com/o/spaces%2Fstuent-reviews%2Flogo?alt=media&token=9dec481d-6412-4fde-bd6e-e3270e2bb56b"
                }
                width={80}
                height={80}
                alt="space image"
                className=""
              />
              <div className="text-neutral-200 cursor-pointer flex flex-row items-center justify-between w-full p-3 hover:bg-[#33363b] ">
                <Link href={`/dashboard/products/${space?.name}`}>
                  <div>
                    <p className="font-semibold">{space?.name}</p>
                    <span className="text-sm text-neutral-400">
                      Text: {testimonials?.data?.length}
                    </span>
                  </div>
                </Link>
                <IoMdSettings
                  onClick={() => {
                    setIsDeleteOpen(true);
                    setSpaceId(space.id);
                  }}
                  size={22}
                  color="#a3a3a3"
                  className="cursor-pointer"
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-y-5 mt-24  ">
          <Image src={spaceImage} width={250} height={250} alt="space image" />
          <p className="text-neutral-400 text-lg">
            No space yet, add a new one?
          </p>
        </div>
      )}

      <SpaceForm id={user.id} isOpen={isOpen} setIsOpen={setIsOpen} />

      <DeleteSpace
        isDeleteOpen={isDeleteOpen}
        setIsDeleteOpen={setIsDeleteOpen}
        isSpaceId={isSpaceId}
        handleDeleteSpace={handleDeleteSpace}
      />
    </section>
  );
};

export default CreateSpace;
