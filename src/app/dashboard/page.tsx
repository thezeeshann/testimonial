import React from "react";
import spaceImage from "../../../public/no-message.18de8749.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const dashboard = () => {
  return (
    <section className="flex flex-col items-center px-20 py-12">
      <div className="w-full flex flex-row justify-between items-center   ">
        <p className="text-neutral-200 font-bold text-2xl">Spaces</p>
        <Button className="flex flex-row items-center gap-x-2">
          <Plus size={22} /> <span>Create a new space</span>
        </Button>
      </div>

      <div className="flex flex-col gap-y-5 mt-24  ">
        <Image src={spaceImage} width={250} height={250} alt="space image" />
        <p className="text-neutral-400 text-lg">No space yet, add a new one?</p>
      </div>
    </section>
  );
};

export default dashboard;
