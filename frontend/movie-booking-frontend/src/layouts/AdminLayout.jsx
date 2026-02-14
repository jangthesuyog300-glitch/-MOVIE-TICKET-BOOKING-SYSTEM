import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

const AdminLayout = () => {
  return (
    <>
      <Navbar isAdmin />
      <main
        style={{
          minHeight: "calc(100vh - 120px)",
          backgroundColor: "#f5f5f5",
          padding: "20px",
        }}
      >
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default AdminLayout;
