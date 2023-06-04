import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

const AdminRouteComponent = () => {
  const { userInfo } = useAppSelector((state) => state.auth);

  return userInfo && userInfo.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default AdminRouteComponent;
