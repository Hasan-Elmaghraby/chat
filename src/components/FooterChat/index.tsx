import React from "react";
import { CreateMessage } from "./components/CreateMessage";

interface ChatPartner {
  id: string;
  name: string;
}

interface ChatPartnerProps {
  chatPartner: ChatPartner | undefined | null;
}

export const FooterChat: React.FC<ChatPartnerProps> = ({ chatPartner }) => {
  return <CreateMessage chatPartner={chatPartner} />;
};
