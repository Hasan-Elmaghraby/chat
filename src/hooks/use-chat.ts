import { useEffect, useState } from "react";
import { useMessage } from "./use-message";
import { useNavigate } from "react-router-dom";
import { ChatPartner } from "../shared/types/chat";
import { useUsersContext } from "./use-users";

const useChat = () => {
  const navigate = useNavigate();
  const { fetchChats, chatsData } = useMessage();
  const { currentUser, users } = useUsersContext();
  const [chatPartner, setChatPartner] = useState<
    ChatPartner | undefined | null
  >(null);
  const [open, setOpen] = useState(false);
  const [msgFiltered, setMsgFiltered] = useState<string[]>([]);

  const handleToggleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (currentUser?.id && users.length > 1) {
      const defaultPartner = users.find((u) => u.id !== currentUser.id);
      if (defaultPartner) {
        setChatPartner(defaultPartner as ChatPartner);
        fetchChats(currentUser?.id, defaultPartner?.id as string);
      }
    }
  }, [currentUser, users, fetchChats]);

  const handleSelectChat = (user: ChatPartner) => {
    setChatPartner(user);
    fetchChats(currentUser?.id ?? "", user.id);
  };

  const handleClickProfile = () => {
    navigate("/profile");
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    const queryChats = chatsData.map((chat) => {
      return chat.message;
    });
    const filteredMessages = queryChats.filter((message) => {
      return message.toLowerCase().includes(query);
    });

    setMsgFiltered(filteredMessages);

    if (e.target.value === "") setMsgFiltered([]);
  };

  return {
    chatsData,
    currentUser,
    users,
    open,
    handleToggleClick,
    chatPartner,
    handleSelectChat,
    handleClickProfile,
    handleSearch,
    msgFiltered,
  };
};

export default useChat;
