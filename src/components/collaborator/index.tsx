import Image from "next/image";
import { useState } from "react";
import UserTypeSelector from "../share-modal/user-type-selector";
import { Button } from "../ui/button";
import {
  removeCollaborator,
  updateDocumentAccess,
} from "@/lib/actions/room.actions";
import { revalidatePath } from "next/cache";

const Collaborator = ({
  collaborator,
  creatorId,
  email,
  roomId,
  user,
}: CollaboratorProps) => {
  const [userType, setUserType] = useState<UserType>(
    collaborator.userType || "viewer"
  );
  const [loading, setLoading] = useState<boolean>(false);

  const shareDocumentHandler = async (value: UserType) => {
    setLoading(true);

    await updateDocumentAccess({
      email,
      roomId,
      updatedBy: user,
      userType: value as UserType,
    });

    setLoading(false);
  };

  const removeCollaboratorHandler = async (email: string) => {
    setLoading(true);

    await removeCollaborator({ roomId, email });

    setLoading(false);
  };

  return (
    <li className="flex items-center justify-between gap-2 py-3">
      <div className="flex gap-2">
        {loading ? (
          <div className="w-[36px] h-[36px] border-t-[2px] border-l-[2px] animate-spin border-cyan-500 rounded-full" />
        ) : (
          <Image
            src={collaborator.avatar}
            alt={collaborator.name}
            width={36}
            height={36}
            className="size-9 rounded-full"
          />
        )}
        <div>
          <p className="line-clamp-1 leading-4 text-sm font-semibold text-white">
            {collaborator.name}
          </p>
          <p className="text-sm font-light text-blue-100">
            {collaborator.email}
          </p>
        </div>
      </div>
      {creatorId === collaborator.id ? (
        <p className="text-sm text-blue-100">Owner</p>
      ) : (
        <div className="flex items-center">
          <UserTypeSelector
            userType={userType}
            setUserType={setUserType}
            onClickHandler={shareDocumentHandler}
          />
          <Button
            type="button"
            onClick={() => removeCollaboratorHandler(collaborator.email)}
            className="bg-dark-400"
          >
            Remove
          </Button>
        </div>
      )}
    </li>
  );
};

export default Collaborator;
