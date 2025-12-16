import { createContext } from "react";

export interface ChatMessage {
  id: string;
  message: string;
  userId: string;
  receiverId: string;
  createdAt: string;
  isRead: boolean;
  updatedAt: string;
}

export interface Conversation {
  id: string;
  user1Id: string;
  user2Id: string;
  lastMessage: string | null;
  lastMessageAt: string;
  createdAt: string;
  updatedAt: string;
  user1?: {
    id: string;
    name: string;
    email: string;
    image?: string;
  };
  user2?: {
    id: string;
    name: string;
    email: string;
    image?: string;
  };
}

export interface MessageContextType {
  chatsData: ChatMessage[];
  conversations: Conversation[];
  loading: boolean;
  error: string | null;
  fetchChats: (userId: string, chatPartnerId: string) => Promise<void>;
  fetchConversations: (userId: string) => Promise<void>;
  createMessage: (
    senderId: string,
    receiverId: string,
    message: string
  ) => Promise<ChatMessage | null>;
  markAsRead: (userId: string, senderId: string) => Promise<void>;
  getUnreadCount: (userId: string, senderId: string) => number;
  deleteMessage: (messageId: string) => Promise<void>;
  clearError: () => void;
}

export const MessageContext = createContext<MessageContextType | undefined>(
  undefined
);
