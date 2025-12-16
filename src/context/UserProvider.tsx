import { useState, useEffect, ReactNode } from "react";
import { supabase } from "../lib/supabase";
import { UsersContext } from "./UsersContext";
import { toast } from "react-toastify";

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  isAdmin?: boolean;
  created_at?: string;
}

export const UsersProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserById = async (id: string) => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  };

  const getUsers = async () => {
    const { data, error } = await supabase.from("users").select("*");
    if (error) throw error;
    setUsers(data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const signup = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      if (!data.user) throw new Error("No user returned");

      const { data: userRow, error: insertError } = await supabase
        .from("users")
        .upsert({ id: data.user.id, name, email }, { onConflict: "id" })
        .select()
        .single();

      if (insertError) throw insertError;
      if (data) toast.success("You successfully signed up");
      await supabase.auth.signInWithPassword({ email, password });

      setCurrentUser(userRow);
      setUsers((prev) => [...prev, userRow]);

      return userRow;
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const signin = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error || !data.user) throw error;
      if (data) toast.success("You successfully logged in");

      const user = await fetchUserById(data.user.id);

      setCurrentUser(user);
      return user;
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();

    setCurrentUser(null);
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        const { data: user, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", session.user.id)
          .single();

        if (error) {
          console.error("Failed to fetch current user:", error.message);
        } else {
          setCurrentUser(user);
        }
      }

      setLoading(false);
    };

    init();
  }, []);

  return (
    <UsersContext.Provider
      value={{
        currentUser,
        users,
        loading,
        error,
        signup,
        signin,
        logout,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
