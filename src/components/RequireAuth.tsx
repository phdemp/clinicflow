import { Navigate, Outlet } from "react-router-dom";
import { useClinic } from "../state/store";

export function RequireAuth() {
  const { isAuthenticated } = useClinic();
  if (!isAuthenticated) return <Navigate to="/" replace />;
  return <Outlet />;
}
