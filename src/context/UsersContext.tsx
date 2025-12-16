import { createContext } from "react";
import { User } from "./UserProvider";

export interface UsersContextType {
  currentUser: User | null;
  users: User[];
  loading: boolean;
  error: string | null;
  signup: (
    name: string,
    email: string,
    password: string
  ) => Promise<User | false>;
  signin: (email: string, password: string) => Promise<User | false>;
  logout: () => Promise<void>;
}

export const UsersContext = createContext<UsersContextType | null>(null);
