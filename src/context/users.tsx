import axios from "axios";
import { createContext, useEffect, useState } from "react";

interface User {
  image?: string;
  id?: string;
  name: string;
  email: string;
  password?: string;
  isAdmin?: boolean;
}

interface UserContextType {
  users: User[];
  setUsers: (users: User[]) => void;
  currentUser: User | null;
  getUsers: () => Promise<void>;
  setCurrentUser: (user: User | null) => void;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const UsersContext = createContext<UserContextType | undefined>(undefined);

const UsersProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3001/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const signup = async (
    name: string,
    email: string,
    password: string,
    image: string
  ): Promise<User | false> => {
    try {
      const res = await axios.get("http://localhost:3001/users");
      const existingUser = res.data.find((user: User) => user.email === email);

      if (existingUser) {
        console.log("User already exists. Signing in instead.");
        setCurrentUser(existingUser);
        localStorage.setItem("currentUser", JSON.stringify(existingUser));
        return existingUser;
      }

      const newUser: User = { name, email, password, image };
      const userRes = await axios.post("http://localhost:3001/users", newUser);

      setUsers([...users, userRes.data]);
      setCurrentUser(userRes.data);
      localStorage.setItem("currentUser", JSON.stringify(userRes.data));
      return userRes.data;
    } catch (err) {
      console.error("Error during signup:", err);
      return false;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    getUsers();
  }, []);

  return (
    <UsersContext.Provider
      value={{
        users,
        currentUser,
        setCurrentUser,
        getUsers,
        signup,
        logout,
        setUsers,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export { UsersContext, UsersProvider };
