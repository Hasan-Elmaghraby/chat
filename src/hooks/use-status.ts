import { useEffect, useState } from "react";
import useChat from "./use-chat";

export const useStatusUser = () => {
  const { currentUser, users, chatPartner } = useChat();

  const [statusUser, setStatusUser] = useState<boolean>(false);
  const [statusPartner, setStatusPartner] = useState<boolean>(false);

  useEffect(() => {
    if (!currentUser || !users?.length) {
      setStatusUser(false);
      return;
    }
    const isUserOnline = users.some((user) => user.id === currentUser.id);
    const isPartnerOnline = chatPartner?.id === currentUser.id;

    setStatusUser(isUserOnline);
    setStatusPartner(isPartnerOnline);
  }, [chatPartner?.id, currentUser, users]);

  return { statusUser, statusPartner };
};
