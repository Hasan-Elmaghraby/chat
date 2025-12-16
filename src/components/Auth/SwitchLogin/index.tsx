import React from "react";
import { Link } from "react-router-dom";

interface Props {
  to: string;
  text: string;
  question: string;
}

export const SwitchLogin: React.FC<Props> = ({ to, question, text }) => {
  return (
    <p className="mb-6">
      {question}
      <Link
        to={to}
        className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1"
      >
        {text}
      </Link>
    </p>
  );
};
