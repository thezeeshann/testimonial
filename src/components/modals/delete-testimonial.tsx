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

type DeleteTestimonialsModalProps = {
  isDeleteOpen: boolean;
  setIsDeleteOpen: (value: boolean) => void;
  deleteId: string;
  handleDeleteTestimonial: (testimonialId: string) => void;
};

const DeleteTestimonialsModal = ({
  isDeleteOpen,
  setIsDeleteOpen,
  deleteId,
  handleDeleteTestimonial,
}: DeleteTestimonialsModalProps) => {
  return (
    <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Delete this testimonial</DialogTitle>
          <DialogDescription>
            Once confirmed, this testimonial will be permanently removed.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={() => handleDeleteTestimonial(deleteId)}
            variant={"destructive"}
            type="submit"
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteTestimonialsModal;
