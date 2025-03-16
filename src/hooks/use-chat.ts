import { useEffect, useState } from "react";
import useMessage from "../hooks/use-message";
import { useNavigate } from "react-router";
import { useUsers } from "../hooks/use-users";

const useChat = () => {
  const navigate = useNavigate();
  const { fetchChats, chatsData } = useMessage();
  const { currentUser, users } = useUsers();
  const [chatPartner, setChatPartner] = useState<string[] | undefined | null>(
    null
  );
  const [open, setOpen] = useState(false);
  const [msgFiltered, setMsgFiltered] = useState([]);

  const handleToggleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (currentUser?.id && users.length > 1) {
      const defaultPartner = users.find((u) => u.id !== currentUser.id);
      if (defaultPartner) {
        setChatPartner(defaultPartner);
        fetchChats(currentUser?.id, defaultPartner?.id);
      }
    }
  }, [currentUser, users, fetchChats]);

  const handleSelectChat = (user) => {
    setChatPartner(user);
    fetchChats(currentUser?.id, user.id);
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
