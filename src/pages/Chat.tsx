import useChat from "../hooks/use-chat";
import { HeaderChat } from "../components/HeaderChat";
import { BodyChat } from "../components/BodyChat";
import { FooterChat } from "../components/FooterChat";
import { User } from "../shared/types/user";

const Chat = () => {
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

  return (
    <div className="h-screen flex flex-col">
      <HeaderChat
        open={open}
        onClick={handleToggleClick}
        onChange={handleSearch}
      />

      <BodyChat
        open={open}
        users={users}
        currentUser={currentUser}
        onSelect={handleSelectChat}
        onClick={handleClickProfile}
        chatPartner={chatPartner as User | undefined}
        userImage={currentUser?.image}
        partnerUserImage={chatPartner?.image}
        msgFiltered={msgFiltered}
      />

      <FooterChat chatPartner={chatPartner} />
    </div>
  );
};

export default Chat;
