import { Navigate , Outlet } from "react-router-dom";
import { isAuthenticated, getUserRole } from "../app/authUtils";

const ManagerRoute = () => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (getUserRole() !== "TheatreManager") {
    return <Navigate to="/error?status=FORBIDDEN&message=Access Denied" />;
  }

  return <Outlet></Outlet>;
};

export default ManagerRoute;
