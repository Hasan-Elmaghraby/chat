import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsersContext } from "../../../hooks/use-users";
import { isUser } from "../../../utils/checkUser";

const useAuth = () => {
  const { signup, signin } = useUsersContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handlePassword = () => setShowPassword((p) => !p);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, password } = formData;
    if (!name || !email || !password) return;

    const user = await signup(name.trim(), email.trim(), password.trim());
    if (isUser(user)) navigate(`/chat/${user.id}`);
  };

  const handleSignin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!email || !password) return;

    const user = await signin(email.trim(), password.trim());
    if (isUser(user)) {
      navigate(`/chat/${user.id}`);
    }
  };

  return {
    formData,
    handleChange,
    handleSignup,
    handleSignin,
    showPassword,
    handlePassword,
  };
};

export default useAuth;
