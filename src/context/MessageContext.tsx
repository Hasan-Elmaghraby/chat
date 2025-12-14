// contexts/MessageContext.tsx

import { createContext } from "react";

interface ChatMessage {
  id: string;
  message: string;
  userId: string;
  receiverId: string;
  createdAt: string;
}

interface MessageContextType {
  chatsData: ChatMessage[];
  fetchChats: (userId: string, chatPartnerId: string) => Promise<void>;
  createMessage: (
    senderId: string,
    receiverId: string,
    message: string,
    createdAt: string
  ) => Promise<void>;
}

export const MessageContext = createContext<MessageContextType | undefined>(
  undefined
);
