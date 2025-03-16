import { ShowChat } from "../components/ShowChat";
import { CreateMessage } from "../components/CreateMessage";
import useChat from "../hooks/use-chat";
import { Search } from "../components/Search";
import { Users } from "../components/Users";
import { User } from "../types/user";
import UsersButton from "../components/UsersButton";
import { useStatusUser } from "../hooks/use-status";
import { useEffect, useState } from "react";
import { Loader } from "../components/Loader";

interface ChatProps {
  open: boolean;
  handleToggleClick: () => void;
  chatPartner: string[];
  handleSelectChat: (user: string) => void;
  handleClickProfile: () => void;
  msgFiltered: string[];
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  users: User[];
  currentUser: string[];
}

const Chat: React.FC<ChatProps> = () => {
  const {
    currentUser,
    users,
    open,
    handleToggleClick,
    chatPartner,
    handleSelectChat,
    handleClickProfile,
    msgFiltered,
    handleSearch,
  } = useChat();

  const { statusPartner, statusUser } = useStatusUser();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      <Search onChange={handleSearch} />
      <div className="h-screen flex bg-gray-100 overflow-hidden transition-all duration-700">
        <div
          className={`h-screen bg-white shadow-lg transition-all duration-700 ${
            open ? "w-1/4" : "w-0"
          }`}
        >
          {open && (
            <Users
              users={users}
              currentUser={currentUser}
              onSelect={handleSelectChat}
              onClick={handleClickProfile}
            />
          )}
        </div>

        <div
          className={`h-screen flex flex-col bg-gray-100 transition-all duration-700   ${
            open ? "ml-1/4 w-3/4" : "ml-0 w-full"
          }`}
        >
          {loading ? (
            <Loader />
          ) : (
            <ShowChat
              chatPartner={chatPartner}
              userImage={currentUser?.image}
              partnerUserImage={chatPartner?.image}
              msgFiltered={msgFiltered}
              statusPartner={statusPartner}
              statusUser={statusUser}
            />
          )}
          <CreateMessage chatPartner={chatPartner} />
        </div>

        <UsersButton open={open} onClick={handleToggleClick} />
      </div>
    </>
  );
};
export default Chat;
