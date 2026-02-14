import { useNavigate } from "react-router-dom";

const ProfileSidebar = ({ onClose }) => {
  const navigate = useNavigate();

  const role = localStorage.getItem("role"); // User | Admin | TheatreManager

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        height: "100vh",
        width: "300px",
        background: "#fff",
        boxShadow: "-2px 0 10px rgba(0,0,0,0.2)",
        zIndex: 1000,
        padding: "20px",
      }}
    >
      <button onClick={onClose}>✖</button>

      {/* PROFILE */}
      <div
        style={menuItem}
        onClick={() => navigate("/profile")}
      >
        View Profile
      </div>

      {/* BOOKINGS */}
      <div
        style={menuItem}
        onClick={() => navigate("/my-bookings")}
      >
        My Bookings
      </div>

      {/* THEATRE MANAGER REQUEST (ONLY FOR USERS) */}
      {role === "User" && (
        <div
          style={menuItem}
          onClick={() => navigate("/theaterManagerRequest")}
        >
          Theatre Manager Request
        </div>
      )}

      {/* LOGOUT */}
      <div
        style={{ ...menuItem, color: "red" }}
        onClick={logout}
      >
        Logout
      </div>
    </div>
  );
};

export default ProfileSidebar;

/* ================= STYLES ================= */
const menuItem = {
  marginTop: "20px",
  cursor: "pointer",
  fontWeight: 500,
};