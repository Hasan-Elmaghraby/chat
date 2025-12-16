import { Send } from "lucide-react";
import { useState } from "react";
import { useMessage } from "../../../../hooks/use-message";
import { useUsersContext } from "../../../../hooks/use-users";

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
  const { currentUser } = useUsersContext();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentUser || !chatPartner || !text.trim()) return;
    createMessage(currentUser?.id ?? "", chatPartner.id, text);
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
        placeholder="Type a message..."
        className="flex-1 p-2 rounded
    bg-transparent
    text-white
    border
    border-white/30
    placeholder-white/50
    focus:outline-none
    focus:border-white
    focus:ring-2
    focus:ring-white/30
    transition
  "
      />

      <button
        type="submit"
        className="
    ml-2
    p-2
    bg-blue-500
    text-white
    rounded
    cursor-pointer
    transition
    active:scale-95
    hover:bg-blue-600
    focus:outline-none
    focus:ring-2
    focus:ring-blue-400
  "
      >
        <Send />
      </button>
    </form>
  );
};
