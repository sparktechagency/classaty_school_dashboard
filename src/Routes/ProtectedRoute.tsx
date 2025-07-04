import { Navigate } from "react-router-dom";
import useUserData from "../hooks/useUserData";

interface ProtectedRouteProps {
  children: React.ReactNode;
  role: string;
}

function ProtectedRoute({ children, role }: ProtectedRouteProps) {
  const user = useUserData();

  const modifyRole = role === "admin" ? "supperAdmin" : role;

  if (!user || user.role !== modifyRole) {
    return <Navigate to="/sign-in" replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
