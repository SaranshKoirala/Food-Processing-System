import { Navigate, Outlet } from "react-router-dom";
import PermissionDenied from "./PermissionDenied";

export default function ProtectedAdminRoute() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user?.token || (user?.role !== "admin" && user?.role !== "employee")) {
    return <PermissionDenied />;
  }

  return <Outlet />;
}
