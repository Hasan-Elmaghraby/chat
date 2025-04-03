import { useState, useRef } from "react";
import { Search as SearchIcon } from "lucide-react";
import { motion } from "framer-motion";

interface SearchProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Search: React.FC<SearchProps> = ({ onChange }) => {
  const [isVisible, setIsVisible] = useState(false);
  const refInput = useRef<HTMLInputElement>(null);

  const handleSearchClick = () => {
    setIsVisible(!isVisible);
    setTimeout(() => refInput.current?.focus(), 100);
  };

  return (
    <div className="relative flex items-center space-x-2 p-2">
      <motion.input
        ref={refInput}
        type="search"
        placeholder="Search"
        onChange={onChange}
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: isVisible ? 150 : 0, opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="p-2 border rounded-md focus:outline-none"
        style={{ overflow: "hidden" }}
      />
      <SearchIcon className="cursor-pointer" onClick={handleSearchClick} />
    </div>
  );
};
