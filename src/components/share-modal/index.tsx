"use client";

import { useSelf } from "@liveblocks/react/suspense";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import Image from "next/image";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import UserTypeSelector from "./user-type-selector";
import Collaborator from "../collaborator";
import { updateDocumentAccess } from "@/lib/actions/room.actions";

const ShareModal = ({
  collaborators,
  creatorId,
  currentUserType,
  roomId,
}: ShareDocumentDialogProps) => {
  const user = useSelf();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState<UserType>("viewer");

  const shareDocumentHandler = async () => {
    setLoading(true);

    await updateDocumentAccess({
      email,
      roomId,
      updatedBy: user.info,
      userType: userType as UserType,
    });

    setLoading(false);
  };

  const creator = collaborators.find(
    (collaborator) => collaborator.id === creatorId
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button
          className="gradient-blue flex h-9 gap-1 px-4"
          disabled={currentUserType !== "editor"}
        >
          <Image
            src="/assets/icons/share.svg"
            alt="Share"
            width={20}
            height={20}
            className="min-w-4 md:size-5"
          />
          <p className="mr-1 hidden sm:block">Share</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog">
        <DialogHeader>
          <DialogTitle>Manage Contributors And Viewers</DialogTitle>
          <DialogDescription>
            Select Which Users Can Manage And Edit This Document
          </DialogDescription>
        </DialogHeader>
        <Label htmlFor="email" className="mt-6 text-blue-100">
          Email Address
        </Label>
        <div className="flex items-center gap-3">
          <div className="flex flex-1 items-center rounded-md bg-dark-400">
            <Input
              id="email"
              placeholder="Enter Email Adress"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="share-input"
            />
            <UserTypeSelector setUserType={setUserType} userType={userType} />
          </div>
          <Button
            type="submit"
            onClick={shareDocumentHandler}
            className="gradient-blue flex h-full gap-1 px-5"
            disabled={loading}
          >
            {loading ? "Sending ..." : "Invite"}
          </Button>
        </div>
        <div className="my-2 space-y-2">
          <ul className="flex flex-col">
            {creator && (
              <Collaborator
                key={creator.id}
                roomId={roomId}
                creatorId={creatorId}
                email={creator.email}
                collaborator={creator}
                user={user.info}
              />
            )}
            {collaborators
              .filter((c) => c.id !== creatorId)
              .map((collaborator) => (
                <Collaborator
                  key={collaborator.id}
                  roomId={roomId}
                  creatorId={creatorId}
                  email={collaborator.email}
                  collaborator={collaborator}
                  user={user.info}
                />
              ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
