import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import classNames from "classnames";
import { useUsers } from "./use-users";

const useAuth = () => {
  const { signup, setCurrentUser, users } = useUsers();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formData;

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    if (storedUser?.email) {
      setCurrentUser(storedUser);
    }
  }, []);

  useEffect(() => {
    if (email) {
      const foundUser = users.find((user) => user.email === email);
      if (foundUser) {
        localStorage.setItem("currentUser", JSON.stringify(foundUser));
        setCurrentUser(foundUser);
      }
    }
  }, [users, email]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) return;

    try {
      const user = await signup(name, email, password);

      if (!user) {
        console.error("Signup/Login failed.");
        return;
      }

      localStorage.setItem("currentUser", JSON.stringify(user));
      setCurrentUser(user);
      navigate(`/chat/${user.id}`);
    } catch (err) {
      console.error("Error signing up/logging in:", err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const inputClassName = classNames(
    "mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
  );

  const submitClassName = classNames(
    "w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg transition duration-150 ease-in-out cursor-pointer active:bg-blue-800"
  );

  const pswIconClassName = classNames(
    "absolute right-3 top-3 text-xl cursor-pointer"
  );

  const handlePassword = () => {
    setShowPassword(!showPassword);
  };
  return {
    handleSubmit,
    handleChange,
    handlePassword,
    name,
    email,
    password,
    showPassword,
    inputClassName,
    submitClassName,
    pswIconClassName,
  };
};

export default useAuth;
