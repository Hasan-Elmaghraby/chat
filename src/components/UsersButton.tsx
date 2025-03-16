interface UsersButtonProps {
  open: boolean;
  onClick: () => void;
}

const UsersButton: React.FC<UsersButtonProps> = ({ open, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute top-4 left-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md cursor-pointer"
    >
      {open ? "Hide" : "Show"}
    </button>
  );
};

export default UsersButton;
