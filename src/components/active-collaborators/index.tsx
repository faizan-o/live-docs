import { cn } from "@/lib/utils";
import { useOthers } from "@liveblocks/react/suspense";
import Image from "next/image";

const ActiveCollaborators = () => {
  const others = useOthers();

  const collaborators = others.map((other) => other.info);
  return (
    <ul className="collaborators-list">
      {collaborators.map(({ id, avatar, name, color }) => (
        <li key={id}>
          <Image src={avatar} alt={name} width={100} height={100} className={cn("inline-block size-8 rounded-full ring-2 ring-dark-100 border-[3px] border-solid", `border-[${color}]`)} />
        </li>
      ))}
    </ul>
  );
};

export default ActiveCollaborators;
