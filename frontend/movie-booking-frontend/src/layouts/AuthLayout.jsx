import { Outlet } from "react-router-dom";
import "../styles/globals.css";

const AuthLayout = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Outlet />
    </div>
  );
};

export default AuthLayout;
