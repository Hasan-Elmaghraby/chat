import { useEffect } from "react";
import { useMessage } from "../../../../hooks/use-message";

import TimeDifference from "../../../../shared/components/Clock";
import { UserImage } from "../../../Users/components/UserImage";
import { HighlightSearch } from "../../../../shared/components/HighlightSearch";
import { ChatPartner } from "../../../../shared/types/chat";
import { useUsersContext } from "../../../../hooks/use-users";
import placeholderImage from "../../../../../public/placeholder.jpg";
import placeholderImage2 from "../../../../../public/placeholder2.avif";

interface ChatMessageProps {
  chatPartner: ChatPartner | undefined | null;
  userImage: string | undefined;
  partnerUserImage: string | undefined;
  msgFiltered: string[];
  statusPartner: boolean;
  statusUser: boolean;
}

export const Messages: React.FC<ChatMessageProps> = ({
  chatPartner,
  userImage,
  partnerUserImage,
  msgFiltered,
  statusPartner,
  statusUser,
}) => {
  const { chatsData, fetchChats } = useMessage();
  const { currentUser } = useUsersContext();

  useEffect(() => {
    if (currentUser?.id && chatPartner?.id) {
      fetchChats(currentUser?.id, chatPartner?.id);
    }
  }, [currentUser?.id, chatPartner?.id, fetchChats]);

  if (!currentUser) return null;

  return (
    <div className="flex-1 overflow-hidden   ">
      <div className="h-full overflow-y-auto p-4">
        <div>
          {chatsData.map(({ id, message, userId, createdAt }) => {
            const isSender = userId === currentUser.id;

            return (
              <div
                key={id}
                className={`flex items-end space-x-2 max-w-xs  ${
                  isSender ? "ml-auto flex-row-reverse" : ""
                }`}
              >
                {!isSender ? (
                  <UserImage
                    status={statusPartner}
                    src={partnerUserImage || placeholderImage2}
                    alt="User"
                  />
                ) : (
                  <UserImage
                    status={statusUser}
                    src={userImage || placeholderImage}
                    alt="User"
                  />
                )}

                <div
                  className={`p-3 my-1 rounded-lg shadow-md w-fit max-w-xs flex flex-col ${
                    isSender
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  <HighlightSearch
                    msgFiltered={msgFiltered}
                    message={message}
                  />
                  <TimeDifference pastTime={createdAt} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
