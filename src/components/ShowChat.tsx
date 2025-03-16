import { useMemo } from "react";
import useMessage from "../hooks/use-message";
import { useUsers } from "../hooks/use-users";
import TimeDifference from "./Clock";
import { UserImage } from "./UserImage";
import { HighlightSearch } from "./HighlightSearch";

interface ChatMessageProps {
  chatPartner: string[] | undefined | null;
  userImage: string | undefined;
  partnerUserImage: string;
  msgFiltered: string[];
  statusPartner: boolean;
  statusUser: boolean;
}

export const ShowChat: React.FC<ChatMessageProps> = ({
  chatPartner,
  userImage,
  partnerUserImage,
  msgFiltered,
  statusPartner,
  statusUser,
}) => {
  const { chatsData } = useMessage();
  const { currentUser } = useUsers();

  const filteredMessages = useMemo(
    () =>
      chatsData.filter(
        (msg) =>
          (msg.userId === currentUser?.id &&
            msg.receiverId === chatPartner?.id) ||
          (msg.userId === chatPartner?.id && msg.receiverId === currentUser?.id)
      ),
    [chatsData, currentUser, chatPartner]
  );

  if (!currentUser) return null;

  return (
    <div className="flex-1 overflow-hidden mt-10">
      <div className="h-full overflow-y-auto p-4">
        <div>
          {filteredMessages.map(({ id, message, userId, createdAt }) => {
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
                    src={partnerUserImage}
                    alt="User"
                  />
                ) : (
                  <UserImage status={statusUser} src={userImage} alt="User" />
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
