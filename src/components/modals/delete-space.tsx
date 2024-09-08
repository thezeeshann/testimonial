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

type DeleteSpaceProp = {
  isDeleteOpen: boolean;
  setIsDeleteOpen: (value: boolean) => void;
  isSpaceId: string;
  handleDeleteSpace: (spaceId: string) => void;
};

const DeleteSpace = ({
  isDeleteOpen,
  setIsDeleteOpen,
  isSpaceId,
  handleDeleteSpace,
}: DeleteSpaceProp) => {
  return (
    <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-center">
            Delete this space
          </DialogTitle>
          <DialogDescription className="text-center">
            Once deleted, all testimonials in this space will be gone forever.
            Please be certain!
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
          className="w-full"
            onClick={() => handleDeleteSpace(isSpaceId)}
            variant={"destructive"}
            type="submit"
          >
            Confirm delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteSpace;
