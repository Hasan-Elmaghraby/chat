import React from "react";
import { useNavigate } from "react-router";
const Logout: React.FC = () => {
  const navigate = useNavigate();
  const onLogout = () => {
    localStorage.setItem("currentUser", "");
    navigate("/");
  };
  return (
    <button
      onClick={onLogout}
      className="
        px-4 py-2
        bg-red-500
        text-white
        rounded-md
        hover:bg-red-600
        active:scale-95
        transition
        focus:outline-none
        focus:ring-2
        focus:ring-red-300
        cursor-pointer
      "
    >
      Logout
    </button>
  );
};

export default Logout;
