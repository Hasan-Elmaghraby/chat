import React from "react";
import { Messages } from "../Messages";
import { Users } from "../Users";
import { useStatusUser } from "../../hooks/use-status";
import { useEffect, useState } from "react";
import { Loader } from "../../shared/components/Loader";
import { User } from "../../shared/types/user";
import { ChatPartner } from "../../shared/types/chat";

interface BodyChatProps {
  open: boolean;
  users: User[];
  currentUser: User | undefined | null;
  onSelect: (user: ChatPartner) => void;
  onClick: () => void;
  chatPartner: User | undefined;
  userImage: string | undefined;
  partnerUserImage: string | undefined;
  msgFiltered: string[];
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export const BodyChat: React.FC<BodyChatProps> = ({
  open,
  users,
  currentUser,
  onSelect,
  onClick,
  chatPartner,
  userImage,
  partnerUserImage,
  msgFiltered,
  messagesEndRef,
}) => {
  const { statusPartner, statusUser } = useStatusUser();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return (
    <div className="flex flex-1 overflow-hidden">
      <div
        className={`bg-white shadow-lg transition-all duration-700 ${
          open ? "w-1/4" : "w-0"
        }`}
      >
        {open && (
          <Users
            users={users}
            currentUser={currentUser}
            onSelect={onSelect}
            onClick={onClick}
          />
        )}
      </div>
      <div
        className={`flex flex-col flex-1 bg-gray-600 transition-all duration-700`}
      >
        {loading ? (
          <Loader />
        ) : (
          <div className="flex-1 overflow-y-auto p-2">
            <Messages
              chatPartner={chatPartner as ChatPartner | null | undefined}
              userImage={userImage}
              partnerUserImage={partnerUserImage}
              msgFiltered={msgFiltered}
              statusPartner={statusPartner}
              statusUser={statusUser}
            />
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
    </div>
  );
};
