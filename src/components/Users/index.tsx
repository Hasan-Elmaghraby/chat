import { User } from "../../shared/types/user";
import { ChatPartner } from "../../shared/types/chat";
import { useUsersContext } from "../../hooks/use-users";
import placeholderImage from "../../../public/placeholder.jpg";
import placeholderImage3 from "../../../public/placeholder3.jpg";

interface UsersProps {
  onSelect: (user: ChatPartner) => void;
  onClick: () => void;
  currentUser: User | null | undefined;
}

export const Users: React.FC<UsersProps> = ({
  onSelect,
  onClick,
  currentUser,
}) => {
  const { users } = useUsersContext();
  return (
    <div className="p-4 bg-gray-500">
      <img
        src={currentUser?.image || placeholderImage}
        onClick={onClick}
        alt={currentUser?.name}
        className="w-16 h-16 rounded-full mx-auto mt-3 cursor-pointer"
      />
      <h1 className="text-3xl font-bold text-center mt-6">Users</h1>

      <div className="overflow-y-auto min-h-screen bg-gray-500">
        {users.map((user) => (
          <div
            key={user.id}
            className="p-4 border-b border-gray-300 flex items-center space-x-4"
          >
            <img
              onClick={() => onSelect(user as ChatPartner)}
              src={user.image || placeholderImage3}
              alt={user.name}
              className="w-12 h-12 rounded-full cursor-pointer"
            />
            <p className="text-lg">{user.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
