"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { createDocument } from "@/lib/actions/room.actions";
import { useRouter } from "next/navigation";

const AddDocumentButton = ({ email, userId }: AddDocumentBtnProps) => {
  const router = useRouter();
  const onAddDocumentButtonClicked = async () => {
    try {
      const room = await createDocument({ email, userId });

      if (room && room) router.push(`/documents/${room.id}`);
    } catch (err) {
      console.log("Error:Creating:Document:Client", err);
    }
  };
  return (
    <Button
      type="submit"
      className="gradient-blue flex gap-1 shadow-md"
      onClick={onAddDocumentButtonClicked}
    >
      <Image
        src="/assets/icons/add.svg"
        alt="Add Button Image"
        width={24}
        height={24}
      />
      <p className="hidden sm:block">Create A Blank Document</p>
    </Button>
  );
};

export default AddDocumentButton;
