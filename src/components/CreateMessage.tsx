import { Send } from "lucide-react";
import { useState } from "react";
import useMessage from "../hooks/use-message";
import { useUsers } from "../hooks/use-users";

export const CreateMessage = ({ chatPartner }: { chatPartner: any }) => {
  const [text, setText] = useState("");
  const { createMessage } = useMessage();
  const { currentUser } = useUsers();
  const currentTime = new Date().toISOString();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentUser || !chatPartner || !text.trim()) return;
    createMessage(currentUser?.id, chatPartner.id, text, currentTime);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 flex flex-end mt-auto">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 p-2 border rounded"
        placeholder="Type a message..."
      />
      <button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded">
        <Send />
      </button>
    </form>
  );
};
