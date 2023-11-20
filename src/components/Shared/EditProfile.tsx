"use client";
import { Button } from "@/components/ui/button";
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
import { FiEdit } from "react-icons/fi";
import EditForm from "./ProfileEditForm";
import { useRef } from "react";

const EditProfile = () => {
  const closeModal = useRef<HTMLButtonElement>(null);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="self-start text-3xl ">
          <FiEdit className="cursor-pointer " />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click Update Profile when
            you&rsquo;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 ">
          <DialogClose ref={closeModal} className="hidden"></DialogClose>
          <EditForm ref={closeModal} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;
