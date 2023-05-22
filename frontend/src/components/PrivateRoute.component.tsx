import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

const PrivateRouteComponent = () => {
  const { userInfo } = useAppSelector((state) => state.auth);
  const location = useLocation();

  return userInfo ? (
    <Outlet />
  ) : (
    <Navigate to={`/login?redirect=${location.pathname}`} replace />
  );
};

export default PrivateRouteComponent;
