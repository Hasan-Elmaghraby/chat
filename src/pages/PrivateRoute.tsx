import { Outlet, useNavigate, useLocation } from "react-router";
import { useEffect } from "react";

type User = {
  id: string;
};

export const PrivateRoute = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    const user: User | null = storedUser ? JSON.parse(storedUser) : null;

    if (!user) {
      navigate("/sign-in", { replace: true });
      return;
    }

    if (location.pathname === "/chat") {
      navigate(`/chat/${user.id}`, { replace: true });
    }
  }, [navigate, location.pathname]);

  return <Outlet />;
};
