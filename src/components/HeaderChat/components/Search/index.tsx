import { useRef } from "react";
import { Search as SearchIcon } from "lucide-react";

interface SearchProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Search: React.FC<SearchProps> = ({ onChange }) => {
  const refInput = useRef<HTMLInputElement>(null);

  const handleSearchClick = () => {
    refInput.current?.focus();
  };

  return (
    <div className="p-4  flex flex-row items-center ">
      <input
        ref={refInput}
        type="search"
        placeholder="Search"
        onChange={onChange}
        className="p-2 focus:outline-none border-none  "
      />
      <SearchIcon onClick={handleSearchClick} />
    </div>
  );
};
