"use client";

import { ClientSideSuspense, RoomProvider } from "@liveblocks/react/suspense";
import { Editor } from "@/components/editor/Editor";
import Header from "@/components/header";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import ActiveCollaborators from "@/components/active-collaborators";
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { updateDocument } from "@/lib/actions/room.actions";
import Loader from "@/components/loader";
import ShareModal from "@/components/share-modal";

const CollaborativeRoom = ({
  roomId,
  roomMetadata,
  users,
  currentUserType,
}: CollaborativeRoomProps) => {
  const [documentTitle, setDocumentTitle] = useState(roomMetadata.title);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const updateTitleHandler = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      setIsLoading(true);
      try {
        if (documentTitle !== roomMetadata.title) {
          const updatedDocument = await updateDocument({
            roomId,
            title: documentTitle,
          });
        }
      } catch (e) {}

      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node | null)
      ) {
        setIsEditing(false);
        updateDocument({
          roomId,
          title: documentTitle,
        });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [roomId, documentTitle]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <RoomProvider id={roomId}>
      <ClientSideSuspense fallback={<Loader />}>
        <Header>
          <div
            ref={containerRef}
            className="flex w-fit items-center justify-center gap-2"
          >
            {isEditing && !isLoading ? (
              <Input
                type="text"
                value={documentTitle}
                ref={inputRef}
                placeholder="Enter Title"
                onChange={(e) => setDocumentTitle(e.target.value)}
                onKeyDown={updateTitleHandler}
                disabled={!isEditing}
                className="document-title-input"
              />
            ) : (
              <>
                <p>{documentTitle}</p>
              </>
            )}

            {currentUserType === "editor" && !isEditing && (
              <Image
                src="/assets/icons/edit.svg"
                alt="edit"
                width={20}
                height={20}
                onClick={() => setIsEditing(true)}
                className="cursor-pointer"
              />
            )}

            {currentUserType !== "editor" && !isEditing && (
              <p className="view-only-tag">View Only</p>
            )}

            {isLoading && <p className="text-gray-400 text-sm">Saving ...</p>}
          </div>
          <div className="flex w-full flex-1 justify-end gap-2 sm:gap-3">
            <ActiveCollaborators />
            <ShareModal
              roomId={roomId}
              collaborators={users}
              creatorId={roomMetadata.creatorId}
              currentUserType={currentUserType}
            />
          </div>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Header>
        <Editor roomId={roomId} currentUserType={currentUserType} />
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default CollaborativeRoom;
