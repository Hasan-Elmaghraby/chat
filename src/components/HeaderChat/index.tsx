import React from "react";
import UsersButton from "../Users/components/UsersButton";
import { Search } from "./components/Search";

interface HeaderSearchProps {
  open: boolean;
  onClick: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const HeaderChat: React.FC<HeaderSearchProps> = ({
  open,
  onClick,
  onChange,
}) => {
  return (
    <div className="bg-gray-500 w-full p-2 flex items-center justify-between">
      <UsersButton open={open} onClick={onClick} />
      <Search onChange={onChange} />
    </div>
  );
};
