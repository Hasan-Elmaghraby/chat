import axios from "axios";
import { useCallback, useState } from "react";

interface ChatMessage {
  id: string;
  message: string;
  userId: string;
  receiverId: string;
  createdAt: string;
}

const useMessage = () => {
  const [chatsData, setChatsData] = useState<ChatMessage[]>([]);

  const createMessage = async (
    senderId: string,
    receiverId: string,
    message: string,
    createdAt: string
  ) => {
    try {
      const newMessage = {
        message,
        userId: senderId,
        receiverId: receiverId,
        createdAt,
      };

      const res = await axios.post("http://localhost:3001/chats", newMessage);

      setChatsData((prevChats) => [...prevChats, res.data]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const fetchChats = useCallback(
    async (userId: string, chatPartnerId: string) => {
      try {
        const response = await axios.get("http://localhost:3001/chats");

        const userMessages = response.data.filter(
          (msg: ChatMessage) =>
            (msg.userId === userId && msg.receiverId === chatPartnerId) ||
            (msg.userId === chatPartnerId && msg.receiverId === userId)
        );

        setChatsData(userMessages);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    },
    []
  );
  return { chatsData, fetchChats, createMessage };
};

export default useMessage;
