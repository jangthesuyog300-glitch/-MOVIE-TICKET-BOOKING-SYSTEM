import { Navigate , Outlet} from "react-router-dom";
import { isAuthenticated, getUserRole } from "../app/authUtils";

const AdminRoute = () => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (getUserRole()!== "Admin") {
    return <Navigate to="/error?status=FORBIDDEN&message=Access Denied" />;
  }

  return <Outlet/>;
};

export default AdminRoute;
