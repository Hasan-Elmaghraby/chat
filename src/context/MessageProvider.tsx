import { useState, useCallback, useEffect, ReactNode } from "react";
import { ChatMessage, Conversation, MessageContext } from "./MessageContext";
import { supabase } from "../lib/supabase";
import { RealtimeChannel } from "@supabase/supabase-js";

export const MessageProvider = ({ children }: { children: ReactNode }) => {
  const [chatsData, setChatsData] = useState<ChatMessage[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // CREATE MESSAGE
  const createMessage = async (
    senderId: string,
    receiverId: string,
    message: string
  ): Promise<ChatMessage | null> => {
    setError(null);

    try {
      const { data, error } = await supabase
        .from("chats")
        .insert({
          message: message.trim(),
          userId: senderId,
          receiverId,
          isRead: false,
        })
        .select()
        .single();

      if (error) throw error;

      // Optimistic update
      setChatsData((prev) => [...prev, data]);

      return data;
    } catch (err) {
      console.error("Error creating message:", err);
      setError(err instanceof Error ? err.message : "Failed to send message");
      return null;
    }
  };

  // FETCH MESSAGES FOR A SPECIFIC CONVERSATION
  const fetchChats = useCallback(
    async (userId: string, chatPartnerId: string) => {
      setLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from("chats")
          .select("*")
          .or(
            `and(userId.eq.${userId},receiverId.eq.${chatPartnerId}),and(userId.eq.${chatPartnerId},receiverId.eq.${userId})`
          )
          .order("createdAt", { ascending: true });

        if (error) throw error;

        setChatsData(data || []);
      } catch (err) {
        console.error("Error fetching chats:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load messages"
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // FETCH ALL CONVERSATIONS FOR A USER
  const fetchConversations = useCallback(async (userId: string) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from("conversations")
        .select(
          `
  *,
  user1:users!conversations_user1_id_fkey(id, name, email, image),
  user2:users!conversations_user2_id_fkey(id, name, email, image)
`
        )
        .or(`user1_id.eq.${userId},user2_id.eq.${userId}`)
        .order("last_message_at", { ascending: false });

      if (error) throw error;

      setConversations(data || []);
    } catch (err) {
      console.error("Error fetching conversations:", err);
      setError(
        err instanceof Error ? err.message : "Failed to load conversations"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // MARK MESSAGES AS READ
  const markAsRead = async (userId: string, senderId: string) => {
    try {
      const { error } = await supabase
        .from("chats")
        .update({ isRead: true })
        .eq("receiverId", userId)
        .eq("userId", senderId)
        .eq("isRead", false);

      if (error) throw error;

      // Update local state
      setChatsData((prev) =>
        prev.map((msg) =>
          msg.receiverId === userId && msg.userId === senderId
            ? { ...msg, isRead: true }
            : msg
        )
      );
    } catch (err) {
      console.error("Error marking messages as read:", err);
    }
  };

  // GET UNREAD COUNT
  const getUnreadCount = (userId: string, senderId: string): number => {
    return chatsData.filter(
      (msg) =>
        msg.receiverId === userId && msg.userId === senderId && !msg.isRead
    ).length;
  };

  // DELETE MESSAGE
  const deleteMessage = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from("chats")
        .delete()
        .eq("id", messageId);

      if (error) throw error;

      setChatsData((prev) => prev.filter((msg) => msg.id !== messageId));
    } catch (err) {
      console.error("Error deleting message:", err);
      setError(err instanceof Error ? err.message : "Failed to delete message");
    }
  };

  // SETUP REALTIME SUBSCRIPTION
  useEffect(() => {
    let channel: RealtimeChannel;

    const setupRealtimeSubscription = () => {
      channel = supabase
        .channel("chats-changes")
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "chats",
          },
          (payload) => {
            const newMessage = payload.new as ChatMessage;

            setChatsData((prev) => {
              const exists = prev.some((msg) => msg.id === newMessage.id);
              return exists ? prev : [...prev, newMessage];
            });
          }
        )
        .on(
          "postgres_changes",
          {
            event: "UPDATE",
            schema: "public",
            table: "chats",
          },
          (payload) => {
            const updatedMessage = payload.new as ChatMessage;

            setChatsData((prev) =>
              prev.map((msg) =>
                msg.id === updatedMessage.id ? updatedMessage : msg
              )
            );
          }
        )
        .on(
          "postgres_changes",
          {
            event: "DELETE",
            schema: "public",
            table: "chats",
          },
          (payload) => {
            const deletedMessage = payload.old as ChatMessage;

            setChatsData((prev) =>
              prev.filter((msg) => msg.id !== deletedMessage.id)
            );
          }
        )
        .subscribe();
    };

    setupRealtimeSubscription();

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, []);

  const clearError = () => setError(null);

  return (
    <MessageContext.Provider
      value={{
        chatsData,
        conversations,
        loading,
        error,
        fetchChats,
        fetchConversations,
        createMessage,
        markAsRead,
        getUnreadCount,
        deleteMessage,
        clearError,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};
