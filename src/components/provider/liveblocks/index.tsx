"use client";

import Loader from "@/components/loader";
import { getClerkUsers, getDocumentusers } from "@/lib/actions/user.actions";
import { useUser } from "@clerk/nextjs";
import {
  LiveblocksProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";

const LiveBlocksProvider = ({ children }: { children: React.ReactNode }) => {
  const { user: clerkUser } = useUser();

  return (
    <LiveblocksProvider
      authEndpoint={"/api/liveblocks-auth"}
      resolveUsers={async ({ userIds }) => {
        const users = await getClerkUsers({ userIds });

        return users;
      }}
      resolveMentionSuggestions={async ({ text, roomId }) => {
        const roomUsers = await getDocumentusers({
          text,
          roomId,
          currentUser: clerkUser?.emailAddresses[0].emailAddress!,
        });

        return roomUsers;
      }}
    >
      <ClientSideSuspense fallback={<Loader />}>{children}</ClientSideSuspense>
    </LiveblocksProvider>
  );
};

export default LiveBlocksProvider;
