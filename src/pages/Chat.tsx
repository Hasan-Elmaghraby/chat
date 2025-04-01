import useChat from "../hooks/use-chat";
import { HeaderChat } from "../components/HeaderChat";
import { BodyChat } from "../components/BodyChat";
import { FooterChat } from "../components/FooterChat";
import { useEffect, useRef } from "react";
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

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgFiltered]);

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
        messagesEndRef={messagesEndRef}
      />

      <FooterChat chatPartner={chatPartner} />
    </div>
  );
};

export default Chat;
