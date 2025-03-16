import React from "react";

interface Props {
  msgFiltered: string[];
  message: string;
}

export const HighlightSearch: React.FC<Props> = ({ msgFiltered, message }) => {
  const highlightText = (text: string) => {
    if (!msgFiltered || msgFiltered.length === 0) return text;

    const regex = new RegExp(`(${msgFiltered.join("|")})`, "gi");

    return text.split(regex).map((char, index) =>
      char.match(regex) ? (
        <span key={index} className="bg-yellow-300 text-black px-1 rounded">
          {char}
        </span>
      ) : (
        char
      )
    );
  };
  return <p className={"mb-2"}>{highlightText(message)}</p>;
};
