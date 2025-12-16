import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useUsersContext } from "../hooks/use-users";
import { Loader } from "../shared/components/Loader";

export const PrivateRoute = () => {
  const { currentUser, loading } = useUsersContext();
  const location = useLocation();

  if (loading) {
    return <Loader />;
  }

  if (!currentUser) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  if (location.pathname === "/chat" || location.pathname === "/chat/") {
    return <Navigate to={`/chat/${currentUser.id}`} replace />;
  }

  return <Outlet />;
};
