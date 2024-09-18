"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import TestimonialReview from "../dashboard/testimonial-review";
import { Copy } from "lucide-react";

type CollectingWidgetModalProp = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  slug: string;
};

const CollectingWidgetModal = ({
  isOpen,
  setIsOpen,
  slug,
}: CollectingWidgetModalProp) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-[65%] h-[90%] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle className="text-center text-3xl font-bold">
            Add collecting widget to your own website
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="border-[1px] ">
          <TestimonialReview slug={slug} />
        </div>
        <DialogFooter className="">
          <div className="flex flex-row items-center gap-x-3 justify-between w-full ">
            <Button className="w-[50%]" variant={"secondary"}>
              Close
            </Button>
            <Button
              type="submit"
              className="flex flex-row w-[50%] rounded items-center gap-x-1"
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
  );
};

export default CollectingWidgetModal;
