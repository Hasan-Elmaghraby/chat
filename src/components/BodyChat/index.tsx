import { Messages } from "./components/Messages";
import { Users } from "../Users";
import { useStatusUser } from "../../hooks/use-status";
import { useEffect, useRef, useState } from "react";
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
}) => {
  const { statusPartner, statusUser } = useStatusUser();
  const [loading, setLoading] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgFiltered]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="flex flex-1 overflow-hidden">
      <div
        className={`bg-white shadow-lg transition-all duration-700 ${
          open ? "w-full sm:w-1/4" : "w-0"
        } overflow-hidden`}
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
          <div
            className={`flex-1 overflow-y-auto p-2 transition-all duration-700 sm:w-full ${
              open && "w-0"
            } `}
          >
            <Messages
              chatPartner={chatPartner as ChatPartner | null | undefined}
              userImage={userImage}
              partnerUserImage={partnerUserImage}
              msgFiltered={msgFiltered}
              statusPartner={statusPartner}
              statusUser={statusUser}
            />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};
