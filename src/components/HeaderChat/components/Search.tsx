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
  };

  return (
    <div className="relative flex items-center space-x-2 p-2">
      <motion.div
        className="overflow-hidden rounded-md"
        initial={{ width: 0 }}
        animate={{ width: isVisible ? 150 : 0 }}
        transition={{ duration: 0.3 }}
        onAnimationComplete={() => {
          if (isVisible) refInput.current?.focus();
        }}
      >
        <input
          ref={refInput}
          type="search"
          placeholder="Search"
          onChange={onChange}
          className="
    w-full
    p-2
    border
    border-white/30
    bg-white/10
    text-white
    placeholder-white/50
    rounded-md
    focus:outline-none
    focus:border-white
    focus:ring-2
    focus:ring-white/30
    transition
  "
        />
      </motion.div>

      <SearchIcon
        className="
    cursor-pointer
    text-white/70
    hover:text-white
    focus:ring-2
    focus:ring-white/30
    rounded
    transition-colors
  "
        onClick={handleSearchClick}
        size={20}
      />
    </div>
  );
};
