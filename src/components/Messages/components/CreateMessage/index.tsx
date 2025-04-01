import { Send } from "lucide-react";
import { useState } from "react";
import useMessage from "../../hooks/use-message";
import { useUsers } from "../../../Users/hooks/use-users";

interface ChatPartner {
  id: string;
  name: string;
}

interface CreateMessageProps {
  chatPartner: ChatPartner | undefined | null;
}

export const CreateMessage: React.FC<CreateMessageProps> = ({
  chatPartner,
}) => {
  const [text, setText] = useState("");
  const { createMessage } = useMessage();
  const { currentUser } = useUsers();
  const currentTime = new Date().toISOString();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentUser || !chatPartner || !text.trim()) return;
    createMessage(currentUser?.id ?? "", chatPartner.id, text, currentTime);
    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 flex flex-end mt-auto bg-gray-500"
    >
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
