import { User } from "../../shared/types/user";
import { ChatPartner } from "../../shared/types/chat";

interface UsersProps {
  users: User[];
  onSelect: (user: ChatPartner) => void;
  onClick: () => void;
  currentUser: User | null | undefined;
}

export const Users: React.FC<UsersProps> = ({
  users,
  onSelect,
  onClick,
  currentUser,
}) => {
  return (
    <div className="p-4 bg-gray-500">
      <img
        src={currentUser?.image}
        onClick={onClick}
        alt={currentUser?.name}
        className="w-16 h-16 rounded-full mx-auto mt-3 cursor-pointer"
      />
      <h1 className="text-3xl font-bold text-center mt-6">Users</h1>

      <div className="overflow-y-auto h-[80%]">
        {users.map((user) => (
          <div
            key={user.id}
            className="p-4 border-b border-gray-300 flex items-center space-x-4"
          >
            <img
              onClick={() => onSelect(user as ChatPartner)}
              src={user.image}
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
